# TradeCopilot — Chrome Web Store Developer Console Submission Dossier

**Target SEO Keywords:** `prop firm risk manager`, `funded trader drawdown alert`, `Topstep combine daily loss limit`, `Apex trader funding drawdown`, `FTMO risk calculator`, `TradingView risk HUD`, `position size calculator`

---

## 1. Store Listing Metadata

### Product Name
```text
TradeCopilot — Prop Firm Risk Manager & Drawdown HUD
```

### Short Description (132 character limit)
```text
Real-time risk sizing, daily drawdown limit monitoring, and hard circuit-breaker alerts for prop firm traders on TradingView.
```
*(Length: 124 characters — within the 132 character limit)*

### Category
- **Primary:** Productivity / Developer Tools
- **Secondary:** Workflow & Planning

### Language
- English (United States)

---

## 2. Detailed Store Description (Plain Text & Formatted)

```text
Never blow another prop firm combine or funded trader evaluation.

TradeCopilot is the purpose-built risk management HUD for traders using TradingView, Topstep, Tradovate, and NinjaTrader. It sits directly on your browser chart, calculating exact allowable contract sizes in real time and enforcing strict daily loss limits before you breach combine rules.

Whether you are trading Apex Trader Funding, Topstep, FTMO, FundedNext, or TradeDay, 92% of evaluation failures happen not from bad technical analysis, but from tilt, emotional revenge-trading, and breaching the daily trailing drawdown by a fraction of a tick.

TradeCopilot acts as your automated risk manager right at the point of execution.

KEY CAPABILITIES:

🛡️ 1. Hard Daily Cutoff Circuit-Breakers
Set your firm's strict daily loss limit (e.g., $1,000 on a Topstep $50K account). If your daily loss buffer drops below critical thresholds, TradeCopilot issues unmistakable visual HUD alerts and can lock down the chart interface to prevent emotional tilt.

📐 2. Real-Time Position Sizing Calculator
Stop doing mental math while price is moving fast. Simply input your stop-loss distance in points or ticks, and TradeCopilot calculates the exact maximum contract size for:
- E-mini & Micro Nasdaq (NQ / MNQ)
- E-mini & Micro S&P (ES / MES)
- Forex major pairs (Standard lots / pip values)
- Crypto and Equities

📊 3. Combine-Specific Pre-Configured Presets
Instant one-click presets calibrated to current combine rules:
- Topstep ($50K / $100K / $150K) — strict daily loss limit and trailing drawdown tracking
- Apex Trader Funding ($50K / $100K / $150K) — trailing threshold calculation
- FTMO ($50K / $100K) — 5% daily / 10% maximum total drawdown tracking
- Custom — configure any account balance, risk percentage (0.25% - 2.0%), and daily limit

💻 4. Chart Overlay HUD
Non-intrusive, draggable heads-up display rendered cleanly on TradingView without slowing down chart redraws or WebSocket execution speeds.

📈 5. TradingView PineScript v5 Companion Indicator
Export custom PineScript code configured to your account rules directly into your TradingView indicator favorites.

PRIVACY & SECURITY COMMITMENT:
- NO broker credential access or storage
- NO execution of financial orders or fund management
- NO external tracking, selling of trader data, or invasive analytics
- ALL risk parameters and calculations are saved strictly in your browser's local storage

DISCLAIMER & COMPLIANCE NOTICE:
TradeCopilot is an educational risk calculation software utility provided by TradeGame. It is not an automated trading robot, financial advisory service, or broker interface. Trading futures, forex, and leveraged securities involves substantial risk of loss. Always trade responsibly.
```

---

## 3. Privacy Disclosures & Single-Purpose Justification

Google Chrome Web Store requires strict compliance with Manifest V3 and Single-Purpose policies:

### Single Purpose Declaration
> *"TradeCopilot serves a single purpose: to calculate mathematical position sizing and monitor daily drawdown limits on web charting platforms (TradingView, Topstep, Tradovate) to assist traders in maintaining risk discipline."*

### Permission Justifications
| Permission | Exact Justification for Chrome Review Team |
| :--- | :--- |
| `storage` | Required to store the user's selected account balance, risk percentage per trade, and prop firm presets locally on the user's device. No data is transmitted to external servers. |
| `activeTab` | Required to detect when the user is actively viewing a supported charting platform (TradingView, Topstep, Tradovate) and initialize the HUD container. |
| `notifications` | Required to dispatch desktop circuit-breaker alerts when a trader approaches 75% or 100% of their daily drawdown loss threshold. |
| `alarms` | Required to run a daily session check at market close (17:00 ET) to automatically reset daily PnL counters for the next trading day. |
| Content Scripts (`tradingview.com`, etc.) | Required to render the draggable risk HUD overlay on top of chart pages. |

### Data Usage Disclosures
- **User Activity:** Not collected / not transmitted.
- **Personal Information:** None collected.
- **Financial & Payment Information:** Handled exclusively off-site via official Stripe Checkout; zero payment details touch the extension.

---

## 4. Graphic Assets & Promotional Specification

| Asset | Dimensions | Requirements / Content |
| :--- | :--- | :--- |
| **Store Icon** | 128 x 128 px | Golden shield with HUD reticle (`extension/icons/icon128.png`). Transparent PNG. |
| **Small Promo Tile** | 440 x 280 px | Dark theme (`#0d0d10`), Amber branding, text: *"Never Blow Another Combine — Real-Time Risk HUD"*. |
| **Marquee Promo Tile** | 920 x 680 px | Full showcase featuring TradingView mockup chart with active TradeCopilot HUD showing contract sizing. |
| **Screenshots (3-5)** | 1280 x 800 px | 1. Interactive HUD on TradingView NQ chart.<br>2. Preset selector (Topstep, Apex, FTMO).<br>3. Hard circuit-breaker drawdown warning alert.<br>4. Position sizing math popup. |

---

## 5. Submission Package Location & Verification

- **Archive File:** `dist/tradecopilot-v1.0.0.zip`
- **Direct Web Download:** `site/downloads/tradecopilot-extension.zip`
- **Validation Status:** Manifest V3 compliant, 0 remote scripts, 0 CSP violations, fully self-contained icons and styles.
- **Console URL:** https://chrome.google.com/webstore/devconsole
