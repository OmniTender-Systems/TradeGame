# TradeGame — Ideation Backlog: Wave 2 (LD-W7–W12)

**Status:** Ideation — docs-only, no implementation yet
**Supersedes:** LD-W1–W6 (live drills, shipped in IDE-W1)
**Posture:** Education-not-advice. Process-only predicates. No PnL-ranked output.

---

## Wave 2 Theme: Advanced-Tier Lesson Authoring (Batch 1)

Wave 2 targets the first authored lessons for the Advanced tier across all three
pillars. The CURRICULUM.md registry defines C-A01–C-A03, S-A01–S-A03, and
X-A01–X-A03 with objectives, paired drills, and process checks — but none of
these have source text in `docs/lessons/`. This wave fills four of those slots
with full lesson-concept outlines.

The long-term plan is to author two batches of three lessons each (one per
pillar). Batch 1 picks the highest-leverage advanced concept from each pillar
plus one extra that builds on the cross-pillar Intermediate theme of
strategy-mechanics literacy.

---

## LD-W7 — C-A01: AI and Algorithmic Tools — Capabilities

| Field | Value |
|---|---|
| **Lesson ID** | C-A01 |
| **Track** | Crypto / Advanced |
| **Rank gate** | Strategist |
| **Prerequisite** | C-I04 (Volatility Regimes) — learner must already read regime from chart |
| **Harvest slot** | — |

### Learning Objective

Distinguish what algorithmic trading tools realistically do (execution
automation, parameter sweeps, regime detection) from what they cannot do
(regardless of marketing claims: predict direction, eliminate risk, replace
process discipline) — and articulate a falsifiable claim for any bot track
record before treating it as evidence.

### Target Audience

- Strategist-rank learners who have completed the Crypto Intermediate track
- Learners who have seen grid-bots work in ranging markets and fail in trends
  (C-B04/C-B05) and now face marketing for "AI-powered" tools that claim to
  solve the regime-matching problem
- Motivation: AI tool marketing targets exactly this audience — traders who
  understand enough to know what they don't know, and are looking for leverage

### Rough Outline

1. **What bots actually do well**
   - Execution automation: placing orders faster and more consistently than a
     human, without emotion
   - Parameter sweeps: running a strategy across hundreds of grid spacings or
     MA windows to map sensitivity (not to "find the best" but to understand
     the failure surface)
   - Regime labeling: mechanical classification of range vs. trend using
     predefined rules (not prediction — classification of what has already
     happened)

2. **What bots cannot do**
   - Predict direction: no bot has a reliable directional edge that persists
     across regime shifts without human re-calibration
   - Eliminate risk: a bot executes your thesis faster; if the thesis is wrong,
     it fails faster
   - Replace process: a bot that runs a grid does not tell you when to turn the
     grid off (C-B05 lesson)

3. **The marketing gap**
   - "AI-powered" as a label: what it usually means (parameter optimization or
     simple classification) vs. what it implies (magical prediction)
   - Backtest theater: a strategy that looks perfect on historical data because
     it was optimized to that specific data — the overfitting trap
   - Survivorship visibility: you see the bot that worked this month, not the
     fifty that blew up

4. **A framework for evaluating claims**
   - Can the seller state the failure mode? (if not, they're selling, not
     teaching)
   - Is the claim falsifiable? (what evidence would prove the bot doesn't work?)
   - Does the track record include drawdown periods, or only cherry-picked wins?

5. **Worked example — a parameter sweep on a grid**
   - You run a grid-bot parameter sweep across 50 spacing values on two
     synthetic periods (one ranging, one trending)
   - The sweep shows: wide spacing wins in trends but underperforms in ranges;
     tight spacing wins in ranges but bleeds in trends
   - The insight is not "which spacing is best" — it's "the best spacing
     depends on the regime, and I cannot know the regime in advance"

### Paired Sim Drill

Strategy sandbox — run a parameter sweep on a synthetic grid across a
range-period and a trend-period. Log: which parameter won on each period, and
what that tells you about the regime-dependence of the strategy.

### Process Check

Can you name two things a bot cannot do regardless of how it is marketed —
and explain why that limitation matters for your own process?

---

## LD-W8 — S-A01: Reading a Stock Screener

| Field | Value |
|---|---|
| **Lesson ID** | S-A01 |
| **Track** | Stocks / Advanced |
| **Rank gate** | Strategist |
| **Prerequisite** | S-I03 (Sector Rotation) — learner must already think in baskets and relative strength |
| **Harvest slot** | — |

### Learning Objective

Define at least five common stock-screener metrics (e.g., P/E, market cap,
beta, volume, dividend yield, 52-week range), explain what each metric actually
measures and what it conceals, and articulate the failure mode of relying on any
single metric as a decision filter.

### Target Audience

- Strategist-rank learners who have completed the Stocks Intermediate track
- Learners who understand earnings, sector rotation, and passive fund flows and
  are now ready to evaluate individual names — and will inevitably encounter
  screeners as a discovery tool
- Motivation: screeners are the gateway to stock-picking; without understanding
  what the filters actually mean, learners will build portfolios based on
  decontextualized numbers

### Rough Outline

1. **What a screener is — and isn't**
   - A screener is a filtering tool, not a recommendation engine
   - It answers "which stocks match these criteria?" — not "which stocks should
     I buy?"
   - The output is only as meaningful as the criteria you set

2. **Five common metrics — what they measure and what they hide**
   - **P/E ratio:** price relative to earnings — but earnings are backward-
     lagged, and a low P/E can mean the market expects earnings to collapse
   - **Market cap:** size of the company — but says nothing about valuation,
     growth rate, or financial health
   - **Beta:** historical sensitivity to the index — but beta is regime-
     dependent and unstable over time
   - **Average volume:** liquidity — but a single average masks intraday
     variation and the difference between peak and off-peak depth
   - **52-week range:** where price has been — but a stock at its 52-week high
     may be trending or may be about to reverse; the metric doesn't distinguish

3. **The failure mode of single-metric screening**
   - Screening for low P/E alone → basket of value traps and declining companies
   - Screening for high beta alone → basket of volatile names with no thesis
   - Screening for high volume alone → liquid names with no common fundamental
     thread
   - The lesson: metrics are inputs to a thesis, not a thesis themselves

4. **Combining metrics responsibly**
   - Use screener output as a starting list, then apply the S-I01/S-I02
     earnings and gap framework to each candidate
   - Screen for setup, not for outcome — e.g., "names near support on above-
     average volume" is a setup filter; "names up 20% this month" is a
     performance chase

5. **Worked example — interpreting screener output**
   - Screener returns 12 names matching: P/E < 15, market cap > $1B, volume >
     500k/day
   - Two names are there because earnings just crashed (P/E dropped on the
     denominator, not a buying opportunity)
   - Three names are there because price rallied on index-inclusion flow
     (S-I05) — the mechanical demand is exhausted
   - One name has a thesis you can articulate: held support through a sector
     rotation, volume declining on the pullback — a setup, not just a screen

### Paired Sim Drill

Conceptual — structured worksheet. Given a synthetic screener output table with
8 fictional names and 6 metrics each, the learner must: (a) name one metric
that is being used in a way that conceals risk for 3 of the names, (b) pick
one name that has a thesis they can articulate and write the thesis, (c) explain
why the screener alone is insufficient to act on any name.

### Process Check

Can you name three screener criteria and the failure mode of relying on each
alone — without using the phrase "past performance doesn't guarantee future
results"?

---

## LD-W9 — X-A01: Session-Breakout Strategies and Their Failure Modes

| Field | Value |
|---|---|
| **Lesson ID** | X-A01 |
| **Track** | Forex / Advanced |
| **Rank gate** | Strategist |
| **Prerequisite** | X-I01 (Session Open Liquidity Sweeps) — learner already understands why obvious levels get hunted |
| **Harvest slot** | — |

### Learning Objective

Describe the mechanical structure of a range-then-breakout in forex sessions,
anatomy of a false breakout (whipsaw), the cost of repeated false-breakout
entries, and the minimum evidence required before concluding a breakout has
positive expectancy — as distinct from a liquidity sweep that revisits the prior
range.

### Target Audience

- Strategist-rank learners who have completed the Forex Intermediate track
- Learners comfortable with sessions, liquidity sweeps, carry mechanics, and
  the structural disadvantages of retail forex (X-I01–X-I04) — and are now
  ready to think about directional session-edge without being destroyed by false
  breaks
- Motivation: breakouts are the most chased and least understood pattern in
  forex; this lesson teaches the difference between a breakout with a mechanical
  driver and a whipsaw that stops out retail

### Rough Outline

1. **The range-then-break structure**
   - A session range forms: high and low established over N hours
   - The range is a reference zone, not a prediction — price can break above,
     break below, or remain inside
   - The breakout is only meaningful in context: what is the driver? (news
     release, session overlap flow, institutional order stacking?)

2. **False breakouts — anatomy of a whipsaw**
   - Price breaks above the session high by 5–10 pips, triggering breakout
   - Reverses back through the range within 10–20 minutes
   - Stops out breakout longs; if shorted on the reversal, stops out shorts too
   - Cause: liquidity sweep (X-I01) followed by genuine rejection — the breakout
     was stop-hunting, not directional

3. **The cost of chasing every break**
   - If 60% of session-break attempts fail, a strategy that enters every break
     with a 1:2 R:R and 40% win rate has negative expectancy
   - Three consecutive false breaks at 1% risk each = 3% drawdown before a
     single successful break
   - The lesson: selectivity is not optional; entering every breakout is a
     slow-bleed strategy

4. **Distinguishing a genuine breakout from a whipsaw**
   - **Volume/participation:** genuine break moves through the level with
     sustained interest (volume declining on pullbacks into the break level);
     whipsaws spike through and die
   - **Reclaim behavior:** after a break, does price return to test the level
     and hold (genuine), or pass straight back through (whipsaw)?
   - **Driver presence:** is there a known mechanical flow behind the move
     (passive buying, news event), or is price breaking on no catalyst?

5. **Defining a breakout edge**
   - A positive-expectancy breakout strategy names: the session window, the
     range confirmation criteria (minimum N hours), the entry trigger (close
     beyond level, or first retest-and-hold), the stop placement (below the
     range midpoint or below the break level after reclaim), and the minimum R:R
   - Without these rules, you are not trading breakouts — you are reacting to
     them

### Paired Sim Drill

Scenario replay — session whipsaw scenario (GDD §5.2). The learner observes
three session-break attempts on ANDU/HarborUSD. For each break, they write
before acting: is this a genuine breakout or likely a liquidity sweep? What is
the evidence? After the scenario, compare their reads to the actual outcome and
log the pattern of their accuracy.

### Process Check

Can you describe the condition under which a breakout entry has a negative
expectancy — and state at least two pieces of evidence you would require before
concluding a breakout has a positive one?

---

## LD-W10 — S-A02: Fundamental vs Technical Literacy

| Field | Value |
|---|---|
| **Lesson ID** | S-A02 |
| **Track** | Stocks / Advanced |
| **Rank gate** | Strategist |
| **Prerequisite** | S-A01 (Reading a Stock Screener) — learner already knows what metrics conceal |
| **Harvest slot** | — |

### Learning Objective

Define what fundamental analysis reads (business financials, earnings, guidance,
balance-sheet health), what technical analysis reads (price structure, volume,
relative strength), explain why the two are not mutually exclusive, and identify
the specific failure mode each approach has when used in isolation — then apply
both lenses to a single fictional company to produce a multi-factor read.

### Target Audience

- Strategist-rank learners completing the Stocks Advanced track
- Learners who have studied earnings mechanics (S-I01/S-I02), sector rotation
  (S-I03), and passive fund flow (S-I05) — and now need to integrate those
      fragments into a coherent research process
- Motivation: the "fundamental vs technical" debate is a false dichotomy that
  traps beginners; this lesson teaches both as complementary lenses with
  different blind spots, not competing religions

### Rough Outline

1. **What fundamental analysis reads**
   - Business financials: revenue, margins, earnings, cash flow, debt
   - Forward guidance and management quality
   - Valuation context: what the market is pricing in vs. what the business is
     delivering
   - **Failure mode:** fundamental analysis is backward-lagged (last quarter's
     numbers) and cannot tell you when the market will reprice — a cheap stock
     can get cheaper for months before it's recognized

2. **What technical analysis reads**
   - Price structure: support, resistance, trend, swing sequence
   - Volume: participation behind moves (confirming or diverging)
   - Relative strength vs. sector/index
   - **Failure mode:** technical analysis reads the chart, not the business — a
     stock in a beautiful uptrend can gap down 30% on an earnings miss, and the
     technical pattern gave no warning because the information was not yet public

3. **Why they're not mutually exclusive**
   - Fundamental identifies *what* to watch (a company with improving earnings
     and a reasonable valuation)
   - Technical identifies *when* to act (the stock is holding support after a
     sector rotation, volume declining on the pullback — a setup from S-I03)
   - The strongest trades have both: a fundamental thesis AND a technical setup

4. **The isolation failure modes**
   - **Fundamental-only:** buys a stock because it's "cheap" and holds through a
     40% decline because the thesis hasn't changed — but the market is telling
     you something the financials haven't caught yet
   - **Technical-only:** enters a breakout in a company that's about to report
     earnings — the chart says go, but the event risk (S-I01) makes the entry a
     coin flip with a bad stop

5. **Worked example — multi-factor read on VLDI**
   - Fundamental lens: VLDI was added to the NMX 100 (S-I05) — passive funds
     must buy, which is a mechanical tailwind, but the business itself is sound:
     earnings growing, no debt concerns
   - Technical lens: post-inclusion the price faded from the auction spike to
     pre-announcement levels — the mechanical flow is exhausted, and the chart
     is now forming a base
   - Integrated read: the fundamental case says VLDI is worth owning at the
     pre-announcement price; the technical case says wait for the base to form
     and a volume-confirmed breakout before entering — and size to account for
     the gap risk through the next earnings report

### Paired Sim Drill

Scenario replay — earnings gap scenario (GDD §5.2) revisited with both lenses.
Before the replay, write: (a) the fundamental read (what do you know about this
company's earnings and guidance?), (b) the technical read (what is the chart
telling you about supply/demand?), (c) your integrated thesis — what would you
need to see to act, and what would invalidate the trade?

### Process Check

Do you know which information each approach *cannot* give you — and does your
trading process include both lenses, or are you relying on one while ignoring
what the other would have warned you about?

---

## Wave 2 Summary

| Slot | Lesson | Pillar | Theme |
|---|---|---|---|
| LD-W7 | C-A01 | Crypto Advanced | AI/algorithmic tool capabilities and limitations |
| LD-W8 | S-A01 | Stocks Advanced | Screener literacy and metric failure modes |
| LD-W9 | X-A01 | Forex Advanced | Breakout strategy mechanics and whipsaw cost |
| LD-W10 | S-A02 | Stocks Advanced | Fundamental vs. technical integration |

**Batch 2 candidates (LD-W11–W12 and beyond):** C-A02 (AI hype detection),
C-A03 (crypto-in-games economies), S-A03 (rebalance mechanics), X-A02
(correlation in crisis), X-A03 (trading plan construction).

---

*Internal design document. Education-not-advice. Last updated: 2026-09-19 (IDE-W2).*
