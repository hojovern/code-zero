# Exercise: Add User Authentication

**Type**: Solo
**Duration**: 45 minutes
**Difficulty**: Beginner

## Overview

Transform your website into an app by adding Supabase authentication. Users will be able to create accounts, log in, and access protected pages.

## Learning Objective

After completing this exercise, you will be able to:
- Connect a SvelteKit app to Supabase
- Implement email/password authentication
- Create protected routes that require login
- Store auth credentials securely

## Prerequisites

- Completed Day 1 (live website deployed)
- Supabase account (free tier)
- Basic understanding of forms

---

## Starter Code

Your project should have this structure before starting:

```
your-project/
├── CLAUDE.md
├── .env                    # Will add Supabase credentials here
├── src/
│   ├── lib/
│   │   └── supabase.ts     # Will create this
│   └── routes/
│       ├── +page.svelte    # Your landing page
│       ├── signup/
│       │   └── +page.svelte  # Will create
│       ├── login/
│       │   └── +page.svelte  # Will create
│       └── dashboard/
│           └── +page.svelte  # Will create (protected)
```

---

## Instructions

### Task
Add complete authentication flow: signup, login, logout, and a protected dashboard.

### Requirements
- [ ] Supabase project connected via environment variables
- [ ] Users can create accounts at `/signup`
- [ ] Users can log in at `/login`
- [ ] `/dashboard` redirects to login if not authenticated
- [ ] Dashboard shows current user's email
- [ ] Logout button works

### Steps

**Step 1: Set up Supabase**
1. Create project at supabase.com
2. Copy Project URL and anon key from Settings > API
3. Create `.env` file (don't commit this!)

**Step 2: Tell Claude to connect Supabase**
```
You: Set up Supabase authentication for this SvelteKit project.
My Supabase URL is: [your-url]
My anon key is: [your-key]
```

**Step 3: Build auth pages**
```
You: Create signup and login pages with email/password forms.
After successful auth, redirect to /dashboard.
```

**Step 4: Create protected dashboard**
```
You: Create a dashboard page that:
- Redirects to /login if not authenticated
- Shows the user's email when logged in
- Has a logout button
```

**Step 5: Test the complete flow**
- Sign up with a real email
- Check Supabase dashboard for user
- Log out and log back in
- Try accessing /dashboard while logged out

---

## Hints

<details>
<summary>Hint 1: Environment variables not working</summary>

In SvelteKit, client-side env vars must start with `VITE_`:
```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbG...
```

Restart the dev server after changing `.env`

</details>

<details>
<summary>Hint 2: Signup works but can't login</summary>

Check if email confirmation is required in Supabase:
1. Go to Authentication > Settings
2. Toggle off "Enable email confirmations" for testing

</details>

<details>
<summary>Hint 3: Protected route not redirecting</summary>

Make sure you're checking the session on the server side, not just client side. Ask Claude to create a `+page.server.ts` file for the dashboard that checks auth.

</details>

---

## Expected Output

After completing this exercise:

1. **Signup flow**: User enters email/password > Account created > Redirected to dashboard
2. **Login flow**: User enters credentials > Session created > Sees dashboard
3. **Protected route**: Logged-out user visits /dashboard > Redirected to /login
4. **Logout**: User clicks logout > Session destroyed > Redirected to home

---

## Self-Check

- [ ] Can create a new account (check Supabase dashboard)
- [ ] Can log in with created account
- [ ] Dashboard shows my email address
- [ ] Logout button works
- [ ] `/dashboard` redirects when logged out
- [ ] `.env` is in `.gitignore`

---

## Solution

<details>
<summary>Reveal Solution</summary>

**src/lib/supabase.ts**
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

**src/routes/signup/+page.svelte** (key parts)
```svelte
<script>
  import { supabase } from '$lib/supabase'
  import { goto } from '$app/navigation'

  let email = ''
  let password = ''
  let error = ''

  async function handleSignup() {
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password
    })

    if (signUpError) {
      error = signUpError.message
    } else {
      goto('/dashboard')
    }
  }
</script>
```

**src/routes/dashboard/+page.server.ts**
```typescript
import { redirect } from '@sveltejs/kit'
import { supabase } from '$lib/supabase'

export async function load({ cookies }) {
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    throw redirect(303, '/login')
  }

  return {
    user: session.user
  }
}
```

</details>

---

## Common Mistakes

| Mistake | Symptom | Fix |
|---------|---------|-----|
| Env vars exposed | Keys visible in browser console | Use server-side routes for sensitive operations |
| Session not persisting | Logged out on refresh | Use @supabase/ssr for proper session handling |
| CORS errors | API calls fail | Check Supabase URL is correct, no trailing slash |
| "Invalid API key" | All calls fail | Verify .env values match Supabase dashboard exactly |

---

## Stretch Goals (Optional)

1. **Add "Forgot Password"** flow using Supabase's password reset
2. **Add social login** (Google or GitHub)
3. **Show loading state** during auth operations
4. **Add form validation** (password length, email format)
