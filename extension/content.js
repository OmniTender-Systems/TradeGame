/**
 * TradeCopilot - Content Script
 * Injected into TradingView, Tradovate, and supported web broker charts.
 * Renders a lightweight, high-performance HUD for position sizing and drawdown protection.
 */

(function () {
  if (document.getElementById('tradecopilot-hud-root')) return;

  const root = document.createElement('div');
  root.id = 'tradecopilot-hud-root';
  document.body.appendChild(root);

  let state = {
    accountBalance: 50000,
    riskPct: 1.0,
    dollarRiskPerTrade: 500,
    maxDailyLossCutoff: 2000,
    currentDailyPnL: 0,
    remainingDailyBuffer: 2000,
    consecutiveLossesLeft: 4,
    isLockedOut: false,
    trialDaysRemaining: 14,
    isMinimized: false
  };

  function render() {
    if (state.isMinimized) {
      root.innerHTML = `
        <div class="tc-hud-panel" style="width: auto; padding: 6px 12px; cursor: pointer;" id="tc-unminimize-btn">
          <div class="tc-hud-brand">
            <span>🛡️ TC HUD</span> | Buffer: <strong>$${state.remainingDailyBuffer.toFixed(0)}</strong>
          </div>
        </div>
      `;
      document.getElementById('tc-unminimize-btn').addEventListener('click', () => {
        state.isMinimized = false;
        render();
      });
      return;
    }

    const pnlColor = state.currentDailyPnL > 0 ? '#10b981' : state.currentDailyPnL < 0 ? '#ef4444' : '#f0f1f3';
    const statusClass = state.isLockedOut ? 'tc-status-locked' : state.remainingDailyBuffer < state.maxDailyLossCutoff * 0.25 ? 'tc-status-warn' : 'tc-status-safe';
    const statusText = state.isLockedOut ? 'LOCKED OUT' : state.remainingDailyBuffer < state.maxDailyLossCutoff * 0.25 ? 'CAUTION' : 'ACTIVE';
    const bufferPct = Math.max(0, Math.min(100, (state.remainingDailyBuffer / (state.maxDailyLossCutoff || 1)) * 100));

    root.innerHTML = `
      <div class="tc-hud-panel" id="tc-panel">
        <div class="tc-hud-header" id="tc-drag-header">
          <div class="tc-hud-brand">
            <span>🛡️ TradeCopilot</span>
            <span class="tc-status-pill ${statusClass}">${statusText}</span>
          </div>
          <div class="tc-hud-controls">
            <button id="tc-min-btn" title="Minimize">_</button>
          </div>
        </div>

        <div class="tc-hud-body">
          <div class="tc-metric-grid">
            <div class="tc-metric-box">
              <div class="tc-metric-label">Max Risk / Trade</div>
              <div class="tc-metric-val">$${state.dollarRiskPerTrade.toFixed(2)} <span style="font-size: 11px; color: #8a8d96;">(${state.riskPct}%)</span></div>
            </div>
            <div class="tc-metric-box">
              <div class="tc-metric-label">Today's PnL</div>
              <div class="tc-metric-val" style="color: ${pnlColor};">${state.currentDailyPnL >= 0 ? '+' : ''}$${state.currentDailyPnL.toFixed(2)}</div>
            </div>
          </div>

          <div class="tc-buffer-bar-wrap">
            <div class="tc-buffer-bar-labels">
              <span style="color: #8a8d96;">Daily Headroom:</span>
              <strong>$${state.remainingDailyBuffer.toFixed(2)}</strong>
            </div>
            <div class="tc-buffer-bar-bg">
              <div class="tc-buffer-bar-fill" style="width: ${bufferPct}%;"></div>
            </div>
            <div style="font-size: 10px; color: #8a8d96; margin-top: 4px; text-align: right;">
              ${state.consecutiveLossesLeft} consecutive stop-outs before limit
            </div>
          </div>

          <!-- Position Sizer Calculator -->
          <div class="tc-quick-calc">
            <div class="tc-calc-row">
              <span style="color: #d4d6db; font-weight: 600;">Stop Distance (pts/ticks):</span>
              <input type="number" id="tc-stop-distance" class="tc-calc-input" value="10" step="0.25">
            </div>
            <div class="tc-calc-row">
              <span style="color: #d4d6db; font-weight: 600;">Point Value ($):</span>
              <input type="number" id="tc-point-val" class="tc-calc-input" value="20" step="1" title="ES=$50, NQ=$20, MES=$5, MNQ=$2">
            </div>
            <div class="tc-calc-row" style="border-top: 1px solid #242630; padding-top: 6px; margin-top: 6px;">
              <span style="color: #e8a020; font-weight: 700;">Max Position:</span>
              <span id="tc-calc-contracts" style="font-weight: 800; font-size: 13px; color: #10b981;">2.5 Contracts</span>
            </div>
          </div>
        </div>

        <div class="tc-hud-footer">
          <span class="tc-trial-tag">14-Day Trial (${state.trialDaysRemaining}d left)</span>
          <a href="https://buy.stripe.com/3cI6oz6o9ap44IMgM893y00" target="_blank" style="color: #e8a020; text-decoration: none; font-weight: 600;">Upgrade ⚡</a>
        </div>
      </div>
    `;

    setupInteractions();
  }

  function calculatePosition() {
    const stopDist = parseFloat(document.getElementById('tc-stop-distance')?.value || 10);
    const pointVal = parseFloat(document.getElementById('tc-point-val')?.value || 20);
    const out = document.getElementById('tc-calc-contracts');
    if (!out) return;

    if (stopDist <= 0 || pointVal <= 0) {
      out.textContent = 'Invalid Input';
      return;
    }

    const lossPerContract = stopDist * pointVal;
    const contracts = state.dollarRiskPerTrade / lossPerContract;
    out.textContent = `${contracts.toFixed(2)} Contracts`;
  }

  function setupInteractions() {
    const minBtn = document.getElementById('tc-min-btn');
    if (minBtn) {
      minBtn.addEventListener('click', () => {
        state.isMinimized = true;
        render();
      });
    }

    const stopInput = document.getElementById('tc-stop-distance');
    const pointInput = document.getElementById('tc-point-val');
    if (stopInput) stopInput.addEventListener('input', calculatePosition);
    if (pointInput) pointInput.addEventListener('input', calculatePosition);

    calculatePosition();
    makeDraggable(document.getElementById('tc-panel'), document.getElementById('tc-drag-header'));
  }

  function makeDraggable(element, handle) {
    if (!element || !handle) return;
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    handle.onmousedown = function (e) {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDrag;
      document.onmousemove = elementDrag;
    };

    function elementDrag(e) {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      root.style.top = (root.offsetTop - pos2) + "px";
      root.style.left = (root.offsetLeft - pos1) + "px";
      root.style.right = 'auto';
    }

    function closeDrag() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  // Fetch initial risk profile from background
  try {
    if (chrome && chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage({ type: 'GET_RISK_PROFILE' }, (res) => {
        if (res && res.data) {
          state = { ...state, ...res.data };
          render();
        }
      });
    } else {
      render();
    }
  } catch (err) {
    render();
  }
})();
