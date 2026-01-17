### 2026-01-17: Standardizing UI Consistency Across All Pages

**Context:** After rebuilding the student portal, noticed inconsistent padding and styling across interior pages (blog, prompts, instructors) and landing pages (homepage, enterprise, full-stack). Each page had different navbar offsets and title section styles.

**What I did:**
- Standardized all pages to use `calc(80px + var(--space-12))` for navbar offset padding
- Created consistent page title pattern: breadcrumb → h1 (2.5rem, 700 weight, text-primary) → intro paragraph (text-muted, no italic)
- Replaced hardcoded colors (e.g., `#0f1115`) with CSS variables (`var(--bg-base)`) for consistency
- Updated 8 pages: blog, blog/[slug], instructors, enterprise, full-stack-web-development, ship-sprint, homepage (.hero and .hero-stunning)

**What happened:**
- All pages now have identical spacing from navbar
- Title sections look consistent across blog, prompts, and setup pages
- Easier to maintain—change one CSS variable, all pages update

**Lesson:** [LESSON] When building multi-page sites: (1) Use CSS variables for ALL colors, even if you think they're unique, (2) Establish a standard page header pattern early (breadcrumb → title → intro), (3) Document the padding formula (80px navbar + space-12) so future pages match automatically.

**Tags:** [CSS] [DESIGN-SYSTEM] [CONSISTENCY] [WIN]

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