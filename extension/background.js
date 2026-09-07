/**
 * TradeCopilot - Chrome Extension Background Service Worker (Manifest V3)
 * Manages risk limits, daily drawdown tracking, 14-day trial lifecycle, and desktop alerts.
 */

const DEFAULT_SETTINGS = {
  accountBalance: 50000.0,
  riskPct: 1.0,
  maxDailyLossPct: 4.0,       // $2,000 on 50k
  maxTrailingLossPct: 5.0,    // $2,500 on 50k
  currentDailyPnL: 0.0,
  tradesToday: 0,
  propFirmPreset: 'topstep50k',
  trialStartedAt: Date.now(),
  trialDays: 14,
  licenseKey: null,
  isLockedOut: false
};

// Initialize settings on installation
chrome.runtime.onInstalled.addListener(async () => {
  const existing = await chrome.storage.local.get(null);
  const initial = { ...DEFAULT_SETTINGS, ...existing };
  await chrome.storage.local.set(initial);
  console.log('[TradeCopilot] Background service worker installed and initialized.');
  
  // Set up daily reset alarm (runs every 24h, or checks 17:00 EST session close)
  chrome.alarms.create('sessionResetCheck', { periodInMinutes: 60 });
});

// Periodic session check
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'sessionResetCheck') {
    const now = new Date();
    // Daily futures roll at 17:00 ET (21:00 or 22:00 UTC)
    const hours = now.getUTCHours();
    if (hours === 22) {
      await chrome.storage.local.set({
        currentDailyPnL: 0.0,
        tradesToday: 0,
        isLockedOut: false
      });
      console.log('[TradeCopilot] Daily session reset completed.');
    }
  }
});

// Messaging hub
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_RISK_PROFILE') {
    chrome.storage.local.get(null).then((state) => {
      const math = calculateRiskMath(state);
      sendResponse({ status: 'ok', data: { ...state, ...math } });
    });
    return true; // Keep channel open for async response
  }

  if (message.type === 'UPDATE_SETTINGS') {
    chrome.storage.local.set(message.payload).then(async () => {
      const state = await chrome.storage.local.get(null);
      const math = calculateRiskMath(state);
      sendResponse({ status: 'ok', data: { ...state, ...math } });
    });
    return true;
  }

  if (message.type === 'RECORD_SIM_TRADE') {
    chrome.storage.local.get(null).then(async (state) => {
      const delta = parseFloat(message.pnlDelta || 0);
      const newPnL = Math.round((state.currentDailyPnL + delta) * 100) / 100;
      const tradesCount = state.tradesToday + 1;
      const dailyCutoff = state.accountBalance * (state.maxDailyLossPct / 100.0);
      const isLocked = newPnL <= -dailyCutoff;

      const updated = {
        currentDailyPnL: newPnL,
        tradesToday: tradesCount,
        isLockedOut: isLocked
      };

      await chrome.storage.local.set(updated);

      // Check alerts
      if (isLocked) {
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icons/icon128.png',
          title: '🚨 HARD CIRCUIT BREAKER ACTIVATED',
          message: `Daily loss limit of -$${dailyCutoff.toFixed(2)} reached (Current: -$${Math.abs(newPnL).toFixed(2)}). Step away to protect your funded account!`,
          priority: 2
        });
      } else if (newPnL <= -(dailyCutoff * 0.75)) {
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icons/icon128.png',
          title: '⚠️ 75% Daily Drawdown Warning',
          message: `Approaching daily limit. Buffer remaining: $${(dailyCutoff - Math.abs(newPnL)).toFixed(2)}. Consider sizing down.`,
          priority: 1
        });
      }

      const math = calculateRiskMath({ ...state, ...updated });
      sendResponse({ status: 'ok', data: { ...state, ...updated, ...math } });
    });
    return true;
  }
});

function calculateRiskMath(state) {
  const balance = state.accountBalance || 50000;
  const riskPct = state.riskPct || 1.0;
  const maxDailyLossPct = state.maxDailyLossPct || 4.0;
  const currentPnL = state.currentDailyPnL || 0.0;

  const dollarRiskPerTrade = balance * (riskPct / 100.0);
  const maxDailyLossCutoff = balance * (maxDailyLossPct / 100.0);
  const remainingDailyBuffer = Math.max(0, maxDailyLossCutoff + currentPnL);
  const consecutiveLossesLeft = Math.floor(remainingDailyBuffer / (dollarRiskPerTrade || 1));

  // Trial status calculation
  const elapsedDays = (Date.now() - (state.trialStartedAt || Date.now())) / (1000 * 60 * 60 * 24);
  const trialDaysRemaining = Math.max(0, Math.ceil((state.trialDays || 14) - elapsedDays));
  const isTrialActive = trialDaysRemaining > 0 || !!state.licenseKey;

  return {
    dollarRiskPerTrade: Math.round(dollarRiskPerTrade * 100) / 100,
    maxDailyLossCutoff: Math.round(maxDailyLossCutoff * 100) / 100,
    remainingDailyBuffer: Math.round(remainingDailyBuffer * 100) / 100,
    consecutiveLossesLeft,
    trialDaysRemaining,
    isTrialActive
  };
}
