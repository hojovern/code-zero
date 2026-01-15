# Day 2: Users Are Real

> "Today your app learns who's using it."

## The Challenge

**By end of day, users can create accounts on YOUR app.**

Real email addresses. Real passwords. Real users. Your product stops being a demo and starts being software.

---

## What Changes Today

Yesterday you had a website. Today you have an **app**.

| Website | App |
|---------|-----|
| Same for everyone | Personalized to each user |
| No memory | Remembers who you are |
| Static content | Dynamic data |
| Viewer | User |

---

## Schedule

### Morning Block (9:00 - 12:00)

| Time | Activity | Outcome |
|------|----------|---------|
| 9:00 - 9:15 | Standup: Show your live site | Day 1 wins |
| 9:15 - 10:15 | Supabase Setup | Project created + connected |
| 10:15 - 10:30 | Break | |
| 10:30 - 11:30 | Build Auth Pages | Sign up + login working |
| 11:30 - 12:00 | Protected Routes | Dashboard only for logged-in users |

### Lunch (12:00 - 13:00)

### Afternoon Block (13:00 - 17:30)

| Time | Activity | Outcome |
|------|----------|---------|
| 13:00 - 13:30 | Standup: Auth working? | Troubleshoot blockers |
| 13:30 - 14:30 | Database Fundamentals | Tables, queries, RLS |
| 14:30 - 14:45 | Break | |
| 14:45 - 16:00 | User Profiles Table | Store + display user data |
| 16:00 - 17:00 | Create Auth Skill | Reusable pattern |
| 17:00 - 17:30 | Ship Check | Deploy with auth |

---

## Morning: Authentication

### 1. Supabase Setup (60 min)

**Tell Claude what you need:**
```
You: Set up Supabase for this project. Create a new project, install the
packages, and configure the environment variables. Follow the tech stack
in CLAUDE.md.
```

**Manual steps (Claude will guide you):**
1. Go to [supabase.com](https://supabase.com)
2. Create new project (name it after your product)
3. Wait for provisioning (~2 min)
4. Copy Project URL and anon key from Settings → API

**Claude will:**
- Install `@supabase/supabase-js` and `@supabase/ssr`
- Create `src/lib/supabase.ts` with client setup
- Create `.env` file with your credentials
- Add `.env` to `.gitignore`

**Test the connection:**
```
You: Add a simple test to verify Supabase is connected. Log something
to the console when the app loads.
```

### 2. Build Auth Pages (60 min)

**Tell Claude to build auth:**
```
You: Create signup and login pages for our app. Use Supabase auth.
Include:
- /signup route with email + password form
- /login route with email + password form
- Proper error handling
- Redirect to /dashboard on success
- Links between signup and login pages

Use our brand styling from CLAUDE.md and the existing Tailwind setup.
```

Claude creates both pages with:
- Form components
- Supabase auth calls
- Error states
- Loading states
- Redirects

**Test the flow:**
1. Go to `/signup`
2. Create an account with real email
3. Check Supabase dashboard → Users should appear
4. Try `/login` with same credentials

### 3. Protected Routes (30 min)

**Create the dashboard:**
```
You: Create a protected /dashboard page that:
- Redirects to /login if not authenticated
- Shows the user's email when logged in
- Has a logout button
- Uses a clean layout

Also add navigation to the main layout that shows:
- "Login" and "Sign Up" when logged out
- "Dashboard" and "Logout" when logged in
```

**Test protection:**
1. Log out
2. Try to visit `/dashboard` directly
3. Should redirect to `/login`
4. Log in
5. Should reach `/dashboard`
6. See your email displayed

---

## Afternoon: Database

### 4. Database Fundamentals (60 min)

**Key concepts:**

| Concept | What It Is | Example |
|---------|------------|---------|
| Table | Collection of related data | `profiles`, `posts` |
| Row | One record | One user's profile |
| Column | A field | `email`, `name`, `bio` |
| Primary Key | Unique identifier | `id` (UUID) |
| Foreign Key | Links to another table | `user_id` → `auth.users.id` |
| RLS | Row Level Security | Users only see their own data |

**Why RLS matters:**
Without RLS, any user can read/write any data. With RLS, users only access their own data. Supabase makes this easy.

**Explore Supabase dashboard:**
- Table Editor: Visual way to see data
- SQL Editor: Run custom queries
- Auth: See your users
- API: Auto-generated endpoints

### 5. User Profiles Table (75 min)

**Tell Claude to create profiles:**
```
You: Create a profiles table in Supabase with:
- id (references auth.users)
- email
- full_name
- bio
- avatar_url
- created_at

Include:
- RLS policies so users can only see/edit their own profile
- A trigger that creates a profile when a user signs up
- TypeScript types for the profile

Then update the dashboard to:
- Fetch and display the user's profile
- Allow editing name and bio
- Save changes to the database
```

Claude will:
1. Generate SQL for the table
2. Create RLS policies
3. Create the signup trigger
4. Update dashboard with profile form
5. Add save functionality

**Test it:**
1. Sign up with a new account
2. Go to dashboard
3. See profile fields (empty)
4. Edit and save
5. Refresh page — changes persist
6. Sign up with ANOTHER account
7. Verify you can't see the first user's data (RLS working)

### 6. Create Auth Skill (60 min)

**Codify what you learned:**
```
You: Create an auth-setup skill in .claude/skills/auth-setup/
It should document how to:
- Set up Supabase auth in a SvelteKit project
- Create signup/login pages
- Protect routes
- Create user profiles table with RLS

This way we can reuse this pattern for future projects.
```

**Your skill structure:**
```
.claude/
└── skills/
    ├── blog-writer/
    └── auth-setup/
        ├── SKILL.md
        └── templates/
            ├── signup-page.svelte
            ├── login-page.svelte
            └── profiles-table.sql
```

### 7. Ship Check (30 min)

**Add environment variables to Vercel:**
1. Go to Vercel → Your Project → Settings → Environment Variables
2. Add `VITE_SUPABASE_URL`
3. Add `VITE_SUPABASE_ANON_KEY`

**Deploy:**
```
You: Commit all changes with message "Day 2: Auth + profiles" and push to GitHub
```

**Test in production:**
- [ ] Can sign up on live site
- [ ] Can log in
- [ ] Dashboard shows profile
- [ ] Can edit and save profile
- [ ] Another user can't see my data

---

## What You Built Today

| Feature | How |
|---------|-----|
| User authentication | Supabase auth + SvelteKit pages |
| Protected routes | Session checks + redirects |
| User profiles | Database table + RLS |
| Profile editing | Forms + Supabase updates |
| Auth skill | Reusable pattern for future |

**Your app now has users.** Real people with real accounts. This is software, not a brochure.

---

## Day 2 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Invalid API key" | Check `.env` values match Supabase dashboard |
| Sign up works but no profile | Check trigger was created correctly |
| RLS blocks all queries | Policy needs `auth.uid() = id` |
| Can see other users' data | RLS not enabled on table |
| Works locally, fails on Vercel | Add env vars to Vercel |

---

## Deep Dive: Supabase Connection Debugging

**When database connections fail, it's NEVER obvious.** Here's the complete debugging guide:

### The Debugging Flowchart

```
1. Can you ping the host?
   └─ NO → DNS issue
   └─ YES ↓

2. Can you connect with psql?
   └─ NO → Connection string issue
   └─ YES ↓

3. Does your app connect?
   └─ NO → Check .env loading
   └─ YES → You're done!
```

### Common Errors and Fixes

**Error: `DATABASE_URL is not set`**
- Your `.env` file is malformed (literal `\n` instead of newlines)
- Check the file has actual line breaks, not `\n` strings

**Error: `ENOTFOUND db.xxx.supabase.co`**
- DNS can't resolve the hostname
- Try: `ping db.YOUR_PROJECT.supabase.co`
- Fix: Use Google DNS (`8.8.8.8`) or try mobile hotspot

**Error: `Tenant or user not found`**
- Pooler authentication failed
- Check username format: `postgres.PROJECT_REF` (not just `postgres`)
- Verify password is correct

**Error: `Circuit breaker open`**
- Too many failed attempts triggered protection
- **Wait 5 minutes**, then try again

### Connection String Formats

```bash
# Direct connection (migrations only)
postgresql://postgres:PASSWORD@db.PROJECT.supabase.co:5432/postgres

# Transaction pooler (recommended for apps)
postgresql://postgres.PROJECT:PASSWORD@aws-X-REGION.pooler.supabase.com:6543/postgres
```

### Password Rules

- **Avoid special characters** (`$`, `@`, `#`) in passwords
- Or URL-encode them: `$` → `%24`
- Use Supabase's "Generate" button for safe passwords

### The Debug Script

Add this to trace connection issues:

```typescript
// src/lib/server/db/index.ts
console.log('DB Host:', env.DATABASE_URL.split('@')[1]?.split('/')[0]);
```

```typescript
// +layout.server.ts
console.log('=== DEBUG ===');
console.log('Auth user:', user?.id, user?.email);
console.log('Querying database...');
// ... your query
console.log('DB result:', result);
```

### Test Before Debugging Code

Always test with psql first:
```bash
psql "YOUR_CONNECTION_STRING" -c "SELECT 1"
```

If psql works but your app doesn't, the issue is in your code.
If psql fails, the issue is the connection string or network.

### Multiple .env Files Warning

In monorepos, check ALL `.env` files:
```bash
find . -name ".env" -type f
```

Root `.env` and project `.env` can have different values!

---

## The Pattern

Notice what happened today:
1. You told Claude what you needed
2. Claude wrote the code
3. You reviewed and tested
4. You asked for changes
5. Claude iterated

This is AI-first development. You're not writing code from scratch—you're directing AI to build what you need.

**And you created a skill.** Next time you need auth, you have a template.

---

## Practice Exercise

Complete this exercise to solidify today's skills:

**[Add User Authentication](exercises/02-supabase-auth.md)** (45 min)
- Connect Supabase to your project
- Build signup/login pages
- Create protected routes
- Test the complete auth flow

---

## Homework (Optional)

Tonight:
1. **Invite a friend to sign up** — Have someone else create an account
2. **Add another profile field** — Try adding "location" or "website"
3. **Style the auth pages** — Make them match your brand better
4. **Read your auth-setup skill** — Make sure it's complete

---

*Tomorrow: Build the core feature that makes your product unique.*
