### 2026-01-16: Persistent Auth with 90-Day Cookies

**Context:** Users were getting logged out on every homepage visit. Localhost testing was failing due to secure cookie flags.

**What I did:**
- Configured cookies: `secure: false` (localhost) + `maxAge: 90 days`.
- Debugged `hooks.server.ts` type error with session handling.
- Updated `Navbar` to use client-side `goto` navigation to prevent state loss.
- Fixed root layout data loading to include `username` for proper routing checks.

**What happened:**
- Auth state persists correctly across 90 days and page navigations.
- Users no longer prompted to log in when returning from homepage.

**Lesson:** [LESSON] In SvelteKit + Supabase, consistency between server cookies and client state is critical. Browsers silently reject `Secure` cookies on HTTP localhost—always use environment-aware flags.

**Tags:** [AUTH] [BUGFIX] [WIN]