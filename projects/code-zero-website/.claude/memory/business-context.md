# code:zero Website - Business Context

## Terminology
- **DO NOT USE "COHORT"**. Use **"Intake"** consistently.
- **Admin Role**: Designated as **"Super Admin"**.

## Tech Stack & Performance
- **Stack**: SvelteKit + Supabase (SSR) + Drizzle ORM.
- **SSR Standards**: Guard all `document` and `window` access with `browser` checks from `$app/environment`.
- **Snappiness**: All portal data fetching must be parallelized (`Promise.all`).
- **Navigation**: Admin-to-Portal links must use `data-sveltekit-reload`.

## Financial Milestones (for Dashboard)
- **Investment**: RM 60,000.
- **Payback Target**: RM 90,000.
- **Projected Debt Clearance**: March 2026.
