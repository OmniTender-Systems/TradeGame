#!/usr/bin/env python3
"""
TradeCopilot Risk Engine & TradingView Indicator Generator
Calculates exact mathematical position sizing, maximum daily drawdown thresholds,
and exports TradingView PineScript v5 indicator overlays.
"""

import sys
import json

def calculate_trade_risk(balance, risk_pct, entry_price, stop_loss_price, max_daily_drawdown_pct=4.0):
    if entry_price == stop_loss_price:
        raise ValueError("Entry price and Stop Loss cannot be identical.")

    dollar_risk = balance * (risk_pct / 100.0)
    risk_per_unit = abs(entry_price - stop_loss_price)
    position_units = dollar_risk / risk_per_unit
    max_daily_loss = balance * (max_daily_drawdown_pct / 100.0)
    max_trades_before_daily_stop = int(max_daily_loss / dollar_risk)

    return {
        "account_balance": balance,
        "risk_percentage": risk_pct,
        "max_dollar_risk_per_trade": round(dollar_risk, 2),
        "position_size_units": round(position_units, 4),
        "max_daily_loss_cutoff": round(max_daily_loss, 2),
        "circuit_breaker_buffer_trades": max_trades_before_daily_stop
    }

def generate_tradingview_pinescript(risk_pct=1.0, max_daily_dd=4.0):
    pine = f"""//@version=5
indicator("TradeCopilot Risk HUD [OmniTender]", overlay=true)

// Input Settings
accountBalance = input.float(50000.0, "Account Size (USD)", group="Risk Parameters")
riskPerTrade = input.float({risk_pct}, "Risk Per Trade (%)", group="Risk Parameters")
maxDailyDD = input.float({max_daily_dd}, "Max Daily Drawdown (%)", group="Prop Firm Rules")

// Calculations
dollarRisk = accountBalance * (riskPerTrade / 100.0)
maxDailyLoss = accountBalance * (maxDailyDD / 100.0)

// Visual HUD Table
var table hud = table.new(position.top_right, 2, 4, bgcolor=color.new(color.black, 20), border_color=color.orange, border_width=1)
if barstate.islast
    table.cell(hud, 0, 0, "TradeCopilot Status", text_color=color.orange, text_size=size.small)
    table.cell(hud, 1, 0, "ACTIVE", text_color=color.green, text_size=size.small)
    table.cell(hud, 0, 1, "Max Risk / Trade", text_color=color.white, text_size=size.small)
    table.cell(hud, 1, 1, "$" + str.tostring(dollarRisk, "#.##"), text_color=color.yellow, text_size=size.small)
    table.cell(hud, 0, 2, "Daily Cutoff (4%)", text_color=color.white, text_size=size.small)
    table.cell(hud, 1, 2, "$" + str.tostring(maxDailyLoss, "#.##"), text_color=color.red, text_size=size.small)
"""
    return pine

def main():
    risk_data = calculate_trade_risk(50000.0, 1.0, 1.0850, 1.0820)
    print("=" * 60)
    print("  TRADECOPILOT QUANTITATIVE RISK PROFILE")
    print("=" * 60)
    for k, v in risk_data.items():
        print(f"  {k:30}: {v}")
    print("=" * 60)

    pinescript = generate_tradingview_pinescript()
    with open("tradecopilot_indicator.pine", "w", encoding="utf-8") as f:
        f.write(pinescript)
    print("[OK] Exported TradingView PineScript v5 indicator: tradecopilot_indicator.pine")

if __name__ == "__main__":
    main()
