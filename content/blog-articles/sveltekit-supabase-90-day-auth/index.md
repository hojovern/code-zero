---
title: "The 90-Day Login: Persistent Sessions with SvelteKit & Supabase"
date: "2026-01-16"
author: "Code Zero Team"
description: "How to configure Supabase SSR to remember your users for 90 days and fix common 'logout' bugs on localhost."
tags: ["SvelteKit", "Supabase", "Auth", "Security", "Indie Hacking"]
---

# The 90-Day Login: Persistent Sessions with SvelteKit & Supabase

Nothing kills user retention like an unexpected logout. For builders and power users, staying logged in isn't a luxury—it's the baseline. 

By default, many auth providers set short-lived session cookies that expire when the browser closes or after a few days of inactivity. If you're building a tool that people use daily, you want a "Remember Me" that actually works.

Here is how we implemented 90-day persistent sessions using the `@supabase/ssr` package in SvelteKit.

## The Strategy: Customizing the SSR Helper

Supabase's SSR package provides a `createServerClient` helper that manages cookie storage. To extend the session life, you need to tap into the `setAll` callback.

### 1. Server-Side Cookie Overrides

In your server-side Supabase client initialization (usually `src/lib/supabase/server.ts`), you can manually specify the `maxAge` for every cookie Supabase sets.

```typescript
// src/lib/supabase/server.ts
export function createSupabaseServerClient(cookies: Cookies) {
  return createServerClient(URL, KEY, {
    cookies: {
      getAll() { return cookies.getAll(); },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookies.set(name, value, {
            ...options,
            path: '/',
            // 90 days in seconds (90 * 24 * 60 * 60)
            maxAge: 90 * 24 * 60 * 60,
            sameSite: 'lax',
            // Disable 'secure' on localhost or the browser will reject it
            secure: process.env.NODE_ENV === 'production',
          });
        });
      }
    }
  });
}
```

### 2. The Localhost "Secure" Gotcha

If you are testing on `http://localhost`, browsers like Chrome will **silently reject** cookies that have the `Secure: true` flag. Supabase sometimes defaults to `secure: true` if it detects an HTTPS request (even through a proxy) or based on environment config.

If your session keeps disappearing the moment you refresh the page or go back to `/`, check your cookie flags. By setting `secure: process.env.NODE_ENV === 'production'`, you ensure your localhost environment stays in sync.

## Part 2: Client-Side Persistence

The server handles the initial session creation and refresh, but the client-side Supabase client (the browser client) also needs to know how to handle these cookies.

In `src/lib/supabase/client.ts`, mirror the `maxAge` settings to ensure consistency during client-side token refreshes.

```typescript
// src/lib/supabase/client.ts
export function createSupabaseBrowserClient() {
  return createBrowserClient(URL, KEY, {
    cookies: {
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          const maxAge = 90 * 24 * 60 * 60; // Match the 90 days
          document.cookie = `${name}=${value}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
        });
      }
    }
  });
}
```

## Troubleshooting: Why am I still logged out?

If you've set the cookies to 90 days and you're *still* getting redirected to login, check these three areas:

1.  **Layout Data Shadowing:** Ensure your root `+layout.server.ts` is actually passing the `session` or `user` object to the UI. If the UI logic checks for a `username` that isn't returned by the server, it might trigger a client-side redirect to the login modal even if the cookie is present.
2.  **Auth State Change Race Conditions:** Supabase's `onAuthStateChange` listener can fire a `SIGNED_OUT` event if it fails to initialize the session from cookies. Adding logging here is essential to see what the client-side thinks is happening.
3.  **Client-Side Navigation vs. Full Reload:** If you use `window.location.href` to move between pages, you are destroying and re-initializing the Supabase client every time. Use SvelteKit's `goto` to maintain the SPA state and session continuity.

## Summary

Auth is the foundation of your app's user experience. By setting a 90-day `maxAge` and ensuring your `secure` flags are environment-aware, you can create a "set it and forget it" login experience that keeps builders focused on building.

*Code Zero builds tools and academies for the AI-first generation.*