---
title: "The 90-Day Cookie: Fixing Auth & Redesigning the Student Portal"
date: "2026-01-16"
author: "Code Zero Team"
description: "How we redesigned our learning experience and debugged a persistent SvelteKit + Supabase auth issue in one sprint."
tags: ["SvelteKit", "Supabase", "Auth", "UX Design", "Debugging"]
---

# The 90-Day Cookie: Fixing Auth & Redesigning the Student Portal

"I'm still getting logged out."

It's the message every developer dreads after deploying a "fix." We had just spent the morning completely overhauling our student portal, moving from a generic dashboard to a custom, immersive learning experience. But the auth system wasn't cooperating.

Here's how we redesigned the portal and hunted down a persistent session bug that was forcing students to log in every time they clicked "Home."

## Part 1: The Redesign

Our original student portal was functional but uninspired. It was a standard admin dashboard: sidebar on the left, content in a box. It felt like work, not learning.

We wanted something that felt like a "command center"—dark mode, immersive, and focused.

### The Split-Screen Approach

We looked at platforms like Codedex and Hyperskill for inspiration. The common pattern? **Split screen.**

- **Left Panel (Navigation):** A fixed, narrow timeline showing your progress.
- **Right Panel (Content):** A wide, scrolling area for the lesson itself.

We rewrote our `+layout.svelte` to support this structure using CSS Grid and fixed positioning. We also swapped our fonts to **Quicksand** (headings) and **Mulish** (body) for that clean, modern aesthetic.

```svelte
<div class="portal-layout">
  <!-- Fixed Left Sidebar -->
  <aside class="lesson-tree-panel">
    <!-- Timeline & Progress -->
  </aside>

  <!-- Scrolling Content -->
  <main class="content-panel">
    {@render children()}
  </main>
</div>
```

It looked great. But then came the bug.

## Part 2: The "Logout" Bug

The symptom was simple:
1. Log in.
2. Go to the dashboard.
3. Navigate back to the homepage.
4. Click "Student Portal" again.
5. **Prompted to log in.**

Why? I clearly just logged in.

### The Investigation

We started by adding server-side logging to our `hooks.server.ts`.

```typescript
// hooks.server.ts
const { session } = await event.locals.getSession();
console.log(`[Hooks] Session: ${session ? 'Found' : 'Missing'}`);
```

The logs showed the session was **found**. So the server knew who we were.

If the server knows we're logged in, why is the UI acting like we aren't?

### Culprit #1: The Missing Username

Our `Navbar.svelte` component had this logic:

```javascript
function handleStudentPortal() {
  if ($page.data.isLoggedIn && $page.data.user?.username) {
    goto(`/student-portal/${$page.data.user.username}`);
  } else {
    openLoginModal(); // <--- It was hitting this
  }
}
```

It checks for `isLoggedIn` AND `username`.

We checked our root `+layout.server.ts`. It was returning `user.email` and `user.id`, but **not** `user.username`.

**The Fix:** We updated the root layout to fetch the username from our `users` table and return it globally.

### Culprit #2: The Secure Cookie on Localhost

Even after fixing the username, we noticed inconsistent behavior on `localhost`. Sometimes the cookie would stick, sometimes it wouldn't.

Supabase's default cookie settings often include `Secure: true`. Modern browsers (like Chrome) will **reject** a `Secure` cookie if the connection is HTTP (like `http://localhost`).

We had to explicitly override this in our `createSupabaseServerClient` helper:

```typescript
// src/lib/supabase/server.ts
export function createSupabaseServerClient(cookies: Cookies) {
  return createServerClient(URL, KEY, {
    cookies: {
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookies.set(name, value, {
            ...options,
            path: '/',
            maxAge: 90 * 24 * 60 * 60, // 90 Days
            secure: false, // <--- CRITICAL for localhost
          });
        });
      }
    }
  });
}
```

By forcing `secure: false` (in development) and setting a 90-day `maxAge`, we ensured the browser actually accepted and persisted the session.

### Culprit #3: Client-Side Routing

Finally, we noticed `Navbar.svelte` was using `window.location.href = ...`. This forces a full page reload.

In a Single Page App (SPA) like SvelteKit, you want to avoid full reloads. They wipe the client-side state and force a full re-hydration. If there's any latency in syncing the client-side session with the server-side cookie, you get a flash of "logged out."

**The Fix:** We switched to SvelteKit's `goto`:

```javascript
import { goto } from '$app/navigation';

// ...
goto(`/student-portal/${username}`);
```

## The Result

Now, the flow is seamless.
1. You log in once.
2. The cookie stays for 90 days.
3. You can navigate between the marketing site and the portal without friction.
4. The portal looks like a serious tool for builders.

Auth is rarely the exciting part of a project, but it's the foundation of trust. If your users can't stay logged in, it doesn't matter how pretty your dashboard is.

*Code Zero is a coding academy for builders. We ship real products.*
