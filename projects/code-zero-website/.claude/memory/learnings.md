# code:zero Project Learnings

Last updated: 2026-01-14

## Patterns That Work
- **Parallel Data Fetching:** Always use `Promise.all` for portal data fetching to ensure near-instant load times.
- **SSR Safety:** Guard all `document` and `window` access with `browser` checks from `$app/environment`.
- **Clean Layout Transitions:** Use `data-sveltekit-reload` for links between significantly different layouts (e.g., Super Admin to Student Portal).

## Avoid
- **ReferenceErrors:** Do not access browser globals outside of `onMount` or `if (browser)` blocks.

## Project Conventions
- **Terminology:** Use **"Intake"** instead of "Cohort".
- **Super Admin:** Use this title for platform administrators.
- **Stack:** SvelteKit + Supabase SSR + Drizzle ORM.
