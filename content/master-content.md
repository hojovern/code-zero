### 2026-01-16: Student Portal Redesign & Persistent Auth Fix

**Context:** Student portal felt like a generic dashboard. Also, users were getting logged out on every homepage visit. Needed to fix UX and Auth simultaneously.

**What I did:**
- Redesigned `+layout.svelte` for a split-screen "Codedex-style" immersive layout.
- Added `Quicksand` (Headings) and `Mulish` (Body) fonts.
- Debugged `hooks.server.ts` type error with session handling.
- Configured cookies: `secure: false` (localhost) + `maxAge: 90 days`.
- Updated `Navbar` to use client-side `goto` navigation to prevent state loss.
- Fixed root layout data loading to include `username`.

**What happened:**
- Portal now feels premium and focused.
- Auth state persists correctly across 90 days and page navigations.
- Users no longer prompted to log in when returning from homepage.

**Lesson:** [LESSON] In SvelteKit + Supabase, consistency between server cookies and client state is critical. Missing data in a root layout (like `username`) can look like an auth failure to the UI logic.

**Tags:** [UX] [AUTH] [BUGFIX] [WIN]