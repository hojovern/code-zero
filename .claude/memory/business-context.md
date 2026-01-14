# code:zero Business Context

**Last updated**: 2026-01-13
**Status**: Active - updated with 2026 high-efficiency operational model

This is the master file for understanding the code:zero business. All agents and skills reference this file for business context.

---

## 1. Product & Offering

### Primary Course Offerings

| | **Full Stack Web Development** | **CEO AI Command Center** | **Enterprise AI Sprint** |
|--|---------------------|----------------------|----------------------|
| **Target** | Builders & Entrepreneurs | High-level Executives | Corporate Teams |
| **Duration** | 4 weeks (6-week cycle) | 1 day intensive | 3 days |
| **Price** | RM 14,800/person | RM 7,800/person | RM 38,000/intake |
| **Intake size** | 6-12 people | 1-3 people | 8-12 people |
| **Format** | Hybrid (live afternoons) | Live 5-hour session | On-site or virtual |

---

### Course 1: Full Stack Web Development (4 Weeks)

**Positioning:** The ultimate forcing function for builders. "Bought courses but never finished? join 12 builders in Penang. You WILL ship."

**High-Efficiency Model (2026):**
- **Cycle**: 6 weeks total (4 weeks instruction + 2 weeks gap).
- **Frequency**: 8 intakes per year.
- **FS Intake**: 6 students minimum per intake.
- **Revenue per Intake**: RM 88,800 (6 pax).

---

### Course 2: CEO AI Command Center (The Weekend Intensive)

**Positioning:** Saturday to Sunday. From AI-curious to AI-capable. Build your company's permanent AI infrastructure in 48 hours.
- **Pricing**: RM 7,800 per person.
- **Duration**: 2 Days (Sat/Sun).
- **Format**: Live Mastermind in George Town Heritage Zone.
- **Core Syllabus**:
    - **Day 1 (The Brain):** Local SQLite databases, `/.claude` memory architecture, and **MCP (Model Context Protocol)** integration.
    - **Day 2 (The Machine):** **n8n** automation triggers, Multi-Agent pipelines, and a custom **Streamlit CEO Dashboard**.
- **Outcome:** A private, autonomous business machine that manages data and admin tasks while the CEO focuses on strategy.
- **Frequency**: 1 session sold per intake cycle.
- **Strategic value**: High-margin booster with near-zero incremental overhead.

---

## 2. Business Model & Financials

### Investment & Debt Payback
- **Initial Investment**: RM 60,000 (RM 30k founder + RM 30k investor).
- **Payback Target**: RM 90,000 (Investor gets RM 60k, Founder gets RM 30k).
- **Founder Sacrifice**: Founder draw is **RM 0** until the RM 90k debt is fully cleared.
- **Clearance Milestone**: Under the 8-intake model, debt is projected to be fully repaid by **March 2026**.

### 2026 Projections (High-Efficiency Baseline)
- **Annual Revenue**: RM 772,800.
- **Annual Net Profit**: RM 476,800.
- **Net Margin**: 62%.
- **Safe Founder Draw**: RM 20,000/mo (post-debt).

### Expense Structure (Monthly)
| Category | Cost (RM) | Notes |
|----------|-----------|-------|
| **Fixed Burn** | **18,000** | |
| Mentors (2) | 8,000 | Daily instructional delivery |
| Facility Rent | 5,000 | Boutique space in Georgetown |
| Marketing | 3,000 | Always-on lead gen |
| Software/Tech | 2,000 | SaaS & APIs |
| **Variable Cost** | **10,000** | *Only during active intakes* |

---

## 3. Operational Standards

### Terminology
- **DO NOT USE "COHORT"**. Use **"Intake"** consistently across all internal and external communications.
- **Admin Role**: Designated as **"Super Admin"**.

### Tech Stack & Performance
- **Stack**: SvelteKit + Supabase (SSR) + Drizzle ORM.
- **SSR Standards**: Guard all `document` and `window` access with `browser` checks from `$app/environment`.
- **Snappiness**: All portal data fetching must be parallelized (Promise.all) to ensure near-instant load times.
- **Navigation**: Admin-to-Portal links must use `data-sveltekit-reload` to ensure clean layout transitions.

---

## 4. Competitive Differentiation

**We think like business people, not coding monkeys.**

| Them | Us |
|------|-----|
| Textbook concepts | Battle-tested workflows |
| University fresh grads | Working engineers & entrepreneurs |
| Theory first | Build something usable immediately |
| Become a coder | Become a builder who ships |

---

## 5. Goals & Priorities (2026)

### Strategic Priorities
1. **Aggressive Ad Spend**: Reinvest surplus into scaling beyond the 6-student minimum.
2. **Pricing Tests**: Increase Early Bird to RM 16,800 to test the ceiling.
3. **Delegated Instruction**: Utilize the 2-mentor model to free up founder time for growth and positioning.
4. **Starter Kit**: Launch a self-paced digital product to cover fixed burn during gap weeks.

---

## Notes & Updates
- 2026-01-13: Updated to 8-intake model and mentor-led burn rate.
- 2026-01-13: Integrated Investor Payback logic (RM 90k target).
- 2026-01-13: Confirmed term change: Cohort -> Intake.
- 2026-01-13: Recalculated annual profit to RM 476k based on RM 5k rent and mentor delegation.