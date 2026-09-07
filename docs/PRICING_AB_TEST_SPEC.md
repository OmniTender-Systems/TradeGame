# TradeCopilot Pricing A/B Test Specification: $29/mo Recurring vs. $199 Lifetime Pass

**Hypothesis:** Traders evaluating prop firm combines face recurring subscription fatigue (paying monthly platform fees, data feeds, and combine resets). Offering an upfront Lifetime Pass ($199) alongside the standard monthly subscription ($29/mo) will increase overall conversion value while accelerating cash flow, without depressing the 30-day target of 25 active subscribers ($725 MRR).

---

## 1. Test Architecture & Parameter Setup

### Variants
- **Variant A (Recurring Monthly Focus):**
  - **Hero Offer:** 14-Day Free Trial, then $29/month.
  - **Positioning:** Low barrier to entry, cancel anytime, zero commitment, managed via Stripe Customer Portal.
  - **Stripe Tag:** `client_reference_id=tradecopilot_monthly`
  - **Target Metric:** 25 active recurring subscribers = **$725 MRR** ($8,700 ARR).

- **Variant B (Lifetime Founder Pass Focus):**
  - **Hero Offer:** Founder Lifetime Pass ($199 one-time).
  - **Positioning:** "Pay once, protected forever" — eliminate monthly fees forever. Includes all future prop firm presets and founder AMA badge.
  - **Stripe Tag:** `client_reference_id=tradecopilot_lifetime`
  - **Target Metric:** 10 lifetime passes = **$1,990 upfront cash**, or blended with monthly subscribers.

---

## 2. Allocation & Telemetry Mechanism

### URL & Storage Routing
1. **URL Override:** Direct linking with query parameter:
   - `?v=a` forces Variant A (Monthly prioritized).
   - `?v=b` forces Variant B (Lifetime prioritized).
2. **Persistence:** First-time organic visitors without a query param are randomly assigned (50% / 50% split) via `Math.random() < 0.5`.
3. **Storage:** Variant is saved in `localStorage.setItem('tc_pricing_variant', variant)` to guarantee consistent presentation across repeat visits.
4. **Manual Switcher:** An interactive pill toggle (`#toggle-variant-a` / `#toggle-variant-b`) allows prospects to toggle between views at will.

### Event Logging & Telemetry
The landing page script logs:
- `tc_ab_imp_a` / `tc_ab_imp_b`: Impression counters per variant.
- `tc_ab_conv_a` / `tc_ab_conv_b`: Checkout button clicks.
- **Console Inspector:** Executing `window.tcGetAnalytics()` in the browser developer console prints a formatted table of impressions, conversions, and conversion rates.

---

## 3. Stripe Checkout & Customer Portal Integration

### Checkout URLs
- **Monthly Subscription ($29/mo with 14-day trial):**
  ```text
  https://buy.stripe.com/3cI6oz6o9ap44IMgM893y00?client_reference_id=tradecopilot_monthly
  ```
- **Lifetime Founder Pass ($199 one-time):**
  ```text
  https://buy.stripe.com/3cI6oz6o9ap44IMgM893y00?client_reference_id=tradecopilot_lifetime
  ```
- **Stripe Customer Portal (Self-serve cancellations & upgrades):**
  ```text
  https://billing.stripe.com/p/login/test_4gw28D6a25fO5qg6oo
  ```

---

## 4. Evaluation Criteria & Decision Framework (After 30 Days)

| Metric | Variant A ($29/mo) | Variant B ($199 Lifetime) | Decision Rule |
| :--- | :--- | :--- | :--- |
| **Target Volume** | 25 active subscribers | 10 lifetime passes | If A yields > 25 subscribers ($725 MRR), retain monthly as primary default. |
| **Total 30-Day Cash** | $725 (Month 1) | $1,990 (Immediate) | If B generates > 2.5x upfront cash with equal conversion rate, maintain dual-tier model. |
| **Churn Projection** | ~8-12% monthly combine churn | 0% churn (perpetual) | High combine churn favors lifetime pass monetization up front. |

### Recommended Default Winner:
The hybrid presentation implemented on `site/tradecopilot.html` displays both cards side-by-side with the active variant highlighted and the primary hero CTA dynamically updated. This captures both price-sensitive combine testers (starting with the $29/mo trial) and committed futures day-traders (who prefer the $199 lifetime pass).
