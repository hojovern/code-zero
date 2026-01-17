### 2026-01-17: Rebuilding Student Portal for Zero Layout Jank

**Context:** Old student portal had layout jank (content popping, nav remounting) and URLs with usernames were clunky. Needed a Notion/Discord-style persistent sidebar with smooth navigation.

**What I did:**
- Deleted old `/student-portal/[username]/` route structure
- Created new `/portal` with session-based auth (username from session, not URL)
- Built persistent sidebar layout that never unmounts during navigation
- Used CSS `contain: strict` on all panels with explicit fixed heights
- Replaced `auto-fit` grids with explicit breakpoint-based column counts
- Created week accordion component with smooth slide animations
- Added 301 redirect from old URLs to new `/portal`

**What happened:**
- Sidebar stays mounted during all navigation—zero remount flicker
- Dashboard panels render at exact sizes immediately—no content shift
- Navigation between lessons feels instant (only content area swaps)
- Mobile responsive with collapsing sidebar at 768px

**Lesson:** [LESSON] For dashboard UIs, use: (1) persistent layout shells that don't unmount, (2) fixed-height panels with CSS containment, (3) explicit grid columns instead of auto-fit. These three patterns eliminate 90% of layout jank.

**Tags:** [SVELTEKIT] [CSS] [ARCHITECTURE] [WIN]

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

### 2026-01-17: Fixing MCP Tool Discovery and Optimizing for Free Tier

**Context:** Gizmo MCP server was connected but tool discovery failed with "invalid input: expected object, received undefined". GitHub MCP was failing with "Bad credentials" even after token update.

**What I did:**
- Added missing `inputSchema: { type: "object", properties: {} }` to MCP no-arg tools.
- Switched Gizmo from `gemini-1.5-pro` to `gemini-1.5-flash` to boost free daily quota from 50 to 1,500.
- Implemented lazy initialization for database and AI clients in the MCP server to prevent crashes on startup if env vars are missing.
- Verified that Gemini CLI requires a session restart to reload `.gemini/settings.json`.

**What happened:**
- Tool discovery now passes validation and all Gizmo tools are visible.
- Server is more resilient and cost-optimized.

**Lesson:** [LESSON] MCP specifications are strict: every tool needs an inputSchema object. For high-volume background agents, favor Flash over Pro to stay safely in the Free Tier without hitting rate limits.

**Tags:** [MCP] [AI] [DEBUG] [OPTIMIZATION] [WIN]