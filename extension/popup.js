/**
 * TradeCopilot - Popup Logic
 */

const PRESETS = {
  topstep50k: { balance: 50000, riskPct: 1.0, dailyLimit: 2.0 },     // $1,000 daily
  apex50k: { balance: 50000, riskPct: 1.0, dailyLimit: 5.0 },        // $2,500 trailing
  ftmo50k: { balance: 50000, riskPct: 1.0, dailyLimit: 5.0 },        // $2,500 daily
  fundednext50k: { balance: 50000, riskPct: 1.0, dailyLimit: 5.0 },   // $2,500 daily
  custom: null
};

document.addEventListener('DOMContentLoaded', async () => {
  const presetSelect = document.getElementById('preset-select');
  const inputBalance = document.getElementById('input-balance');
  const inputRiskPct = document.getElementById('input-risk-pct');
  const inputDailyLimit = document.getElementById('input-daily-limit');
  const statRiskDollar = document.getElementById('stat-risk-dollar');
  const statDailyDollar = document.getElementById('stat-daily-dollar');
  const statBuffer = document.getElementById('stat-buffer');
  const statMaxLosses = document.getElementById('stat-max-losses');
  const trialDaysLabel = document.getElementById('trial-days-label');
  const saveBtn = document.getElementById('save-btn');

  function calculate() {
    const bal = parseFloat(inputBalance.value) || 50000;
    const rPct = parseFloat(inputRiskPct.value) || 1.0;
    const dPct = parseFloat(inputDailyLimit.value) || 4.0;

    const dollarRisk = bal * (rPct / 100.0);
    const dailyDollar = bal * (dPct / 100.0);
    const consecutive = Math.floor(dailyDollar / (dollarRisk || 1));

    statRiskDollar.textContent = `$${dollarRisk.toFixed(2)}`;
    statDailyDollar.textContent = `-$${dailyDollar.toFixed(2)}`;
    statBuffer.textContent = `$${dailyDollar.toFixed(2)}`;
    statMaxLosses.textContent = `${consecutive} Stop-Outs`;
  }

  presetSelect.addEventListener('change', () => {
    const val = presetSelect.value;
    if (PRESETS[val]) {
      inputBalance.value = PRESETS[val].balance;
      inputRiskPct.value = PRESETS[val].riskPct;
      inputDailyLimit.value = PRESETS[val].dailyLimit;
      calculate();
    }
  });

  inputBalance.addEventListener('input', calculate);
  inputRiskPct.addEventListener('input', calculate);
  inputDailyLimit.addEventListener('input', calculate);

  // Load stored state
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(null, (state) => {
      if (state.accountBalance) inputBalance.value = state.accountBalance;
      if (state.riskPct) inputRiskPct.value = state.riskPct;
      if (state.maxDailyLossPct) inputDailyLimit.value = state.maxDailyLossPct;
      if (state.propFirmPreset) presetSelect.value = state.propFirmPreset;

      const days = state.trialDaysRemaining !== undefined ? state.trialDaysRemaining : 14;
      trialDaysLabel.textContent = `${days} days left in trial`;
      calculate();
    });
  } else {
    calculate();
  }

  saveBtn.addEventListener('click', () => {
    const payload = {
      accountBalance: parseFloat(inputBalance.value) || 50000,
      riskPct: parseFloat(inputRiskPct.value) || 1.0,
      maxDailyLossPct: parseFloat(inputDailyLimit.value) || 4.0,
      propFirmPreset: presetSelect.value
    };

    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage({ type: 'UPDATE_SETTINGS', payload }, (res) => {
        saveBtn.textContent = '✓ Saved to HUD!';
        setTimeout(() => { saveBtn.textContent = 'Save & Sync to Chart HUD'; }, 1500);
      });
    } else {
      saveBtn.textContent = '✓ Saved!';
      setTimeout(() => { saveBtn.textContent = 'Save & Sync to Chart HUD'; }, 1500);
    }
  });
});
