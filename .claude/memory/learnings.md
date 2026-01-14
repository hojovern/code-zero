# code:zero Project Learnings

Last updated: 2026-01-14

## Preferences
- Multi-agent thinking should be automatic, not invoked.
- Accept higher token usage for quality.

## Patterns That Work
- **Parallel Data Fetching:** Always use `Promise.all` for portal data fetching to ensure near-instant load times.
- **SSR Safety:** Guard all `document` and `window` access with `browser` checks from `$app/environment`.
- **Clean Layout Transitions:** Use `data-sveltekit-reload` for links between significantly different layouts (e.g., Super Admin to Student Portal).

## Avoid
- **ReferenceErrors:** Do not access browser globals outside of `onMount` or `if (browser)` blocks.
- **"Cohort":** Never use this word. Use **"Intake"**.

## Brand Domain Knowledge
- **code:zero** is an AI-first coding academy.
- Target audience: aspiring founders, indie hackers, designers.
- Philosophy: Ship > Think, AI as collaborator.
- Tone: Direct, slightly edgy, builder-to-builder.

## Corporate Decisions
- **Super Admin:** Master admin title.
- **8-Intake Model:** 6-week cycles (4 weeks bootcamp + 2 weeks gap).
- **Investor Payback:** RM 90k target, March 2026 milestone.
