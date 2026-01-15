# Why Your Supabase Connection Fails (And How to Fix It in 5 Minutes)

*The complete debugging guide for SvelteKit + Supabase + Drizzle ORM*

---

You deploy your SvelteKit app. Everything works locally. You push to production and... **500 Internal Server Error**. The database won't connect.

Or worse: it worked yesterday. You didn't change anything. Now it's broken.

I spent 3 hours debugging this exact problem. Here's everything I learned so you don't have to.

## The Symptoms

You might see one of these errors:

```
Error: DATABASE_URL is not set
```

```
Failed query: select "username" from "user" where "user"."id" = $1
```

```
ENOTFOUND db.xxxxx.supabase.co
```

```
FATAL: Tenant or user not found
```

```
FATAL: Circuit breaker open
```

Each error has a different cause. Let's fix them all.

---

## Problem 1: DATABASE_URL is Not Set

**Symptom:**
```
Error: DATABASE_URL is not set
```

**Cause:** Your `.env` file is malformed or missing.

**The Fix:**

Check your `.env` file. A common issue is literal `\n` characters instead of actual newlines:

```bash
# WRONG - This won't parse correctly
PUBLIC_SUPABASE_URL=xxx\n\nDATABASE_URL=yyy
```

```bash
# CORRECT - Actual newlines
PUBLIC_SUPABASE_URL=xxx

DATABASE_URL=yyy
```

This happens when you copy-paste from certain sources or edit the file programmatically.

---

## Problem 2: Special Characters in Password

**Symptom:**
```
Failed query: ...
```
Connection fails silently or with vague errors.

**Cause:** Your database password contains `$`, `@`, `#`, or other special characters.

**The Fix:**

URL-encode special characters in your connection string:

| Character | Encoded |
|-----------|---------|
| `$` | `%24` |
| `@` | `%40` |
| `#` | `%23` |
| `!` | `%21` |
| `&` | `%26` |

Example:
```bash
# Password: MyPass$123
# WRONG
DATABASE_URL="postgresql://postgres:MyPass$123@db.xxx.supabase.co:5432/postgres"

# CORRECT
DATABASE_URL="postgresql://postgres:MyPass%24123@db.xxx.supabase.co:5432/postgres"
```

**Pro tip:** Use passwords without special characters. Supabase's "Generate" button creates safe passwords.

---

## Problem 3: DNS Resolution Failure

**Symptom:**
```
ENOTFOUND db.xxxxx.supabase.co
getaddrinfo ENOTFOUND db.xxxxx.supabase.co
ping: cannot resolve db.xxxxx.supabase.co: Unknown host
```

**Cause:** Your network/DNS can't resolve Supabase's hostname.

**The Fix:**

First, verify it's a DNS issue:
```bash
ping db.YOUR_PROJECT_REF.supabase.co
```

If it fails, try:

1. **Change DNS servers** (use Google DNS):
```bash
# macOS
sudo networksetup -setdnsservers Wi-Fi 8.8.8.8 8.8.4.4
sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder
```

2. **Use the connection pooler** instead of direct connection:
```bash
# Direct (might have DNS issues)
postgresql://postgres:xxx@db.PROJECT.supabase.co:5432/postgres

# Pooler (more reliable)
postgresql://postgres.PROJECT:xxx@aws-0-REGION.pooler.supabase.com:6543/postgres
```

3. **Try a different network** (mobile hotspot often works when WiFi doesn't)

---

## Problem 4: Tenant or User Not Found

**Symptom:**
```
FATAL: Tenant or user not found
```

**Cause:** The connection pooler can't authenticate you. Either:
- Wrong project reference in username
- Wrong password
- Wrong pooler region

**The Fix:**

Get the exact connection string from Supabase dashboard:

1. Go to **Project Settings** → **Database**
2. Click **Connection string** → **URI**
3. Select **Transaction** mode (port 6543)
4. Copy the exact string

The format should be:
```
postgresql://postgres.YOUR_PROJECT_REF:PASSWORD@aws-X-REGION.pooler.supabase.com:6543/postgres
```

Note the username format: `postgres.PROJECT_REF` (not just `postgres`).

---

## Problem 5: Circuit Breaker Open

**Symptom:**
```
FATAL: Circuit breaker open: Unable to establish connection to upstream database
```

**Cause:** Too many failed connection attempts. Supabase's protection kicked in.

**The Fix:**

Wait 5 minutes. Seriously.

The circuit breaker resets automatically. Don't keep hammering the server with retries.

After waiting:
```bash
# Test with psql first
psql "YOUR_CONNECTION_STRING" -c "SELECT 1"

# If it works, then start your app
npm run dev
```

---

## Problem 6: Multiple .env Files

**Symptom:** Connection works sometimes, fails other times. Or worked yesterday, broken today.

**Cause:** Monorepos often have multiple `.env` files. The wrong one is being used.

**The Fix:**

Find all `.env` files:
```bash
find . -name ".env" -type f
```

You might see:
```
./code-zero/.env
./code-zero/projects/website/.env
./code-zero/projects/api/.env
```

Make sure ALL of them have the correct `DATABASE_URL`.

---

## The Debugging Flowchart

When your database connection fails:

```
1. Can you ping the host?
   └─ NO → DNS issue (Problem 3)
   └─ YES ↓

2. Can you connect with psql?
   └─ NO → Connection string issue (Problems 2, 4, 5)
   └─ YES ↓

3. Does your app connect?
   └─ NO → Check .env loading (Problems 1, 6)
   └─ YES → You're done!
```

---

## The Debug Script

Add this to your `db/index.ts` when troubleshooting:

```typescript
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

// Debug: Show which host we're connecting to
console.log('DB Host:', env.DATABASE_URL.split('@')[1]?.split('/')[0]);

const client = postgres(env.DATABASE_URL, {
  prepare: false,
  debug: (connection, query) => {
    console.log('Query:', query.substring(0, 100));
  },
});

export const db = drizzle(client);
```

And in your `+layout.server.ts`:

```typescript
export const load = async ({ locals }) => {
  console.log('=== DEBUG ===');

  const user = await locals.getUser();
  console.log('Auth user:', user?.id, user?.email);

  console.log('Querying database...');
  const result = await db.select().from(users).where(eq(users.id, user.id));
  console.log('DB result:', result);

  return { user: result[0] };
};
```

---

## Quick Reference: Supabase Connection Strings

**Direct connection** (for migrations, schema changes):
```
postgresql://postgres:PASSWORD@db.PROJECT.supabase.co:5432/postgres
```

**Session pooler** (for persistent connections):
```
postgresql://postgres.PROJECT:PASSWORD@aws-X-REGION.pooler.supabase.com:5432/postgres
```

**Transaction pooler** (for serverless, recommended):
```
postgresql://postgres.PROJECT:PASSWORD@aws-X-REGION.pooler.supabase.com:6543/postgres
```

---

## Prevention Checklist

Before deploying:

- [ ] `.env` file has actual newlines (not `\n` strings)
- [ ] Password has no special characters (or they're URL-encoded)
- [ ] Using pooler connection for serverless/edge
- [ ] All `.env` files in monorepo are synced
- [ ] `psql` can connect with the same string
- [ ] DNS can resolve the hostname (`ping` test)

---

## TL;DR

1. **Test connection with psql first** - isolates app issues from connection issues
2. **Use the pooler** - more reliable than direct connection
3. **Avoid special chars in passwords** - or URL-encode them
4. **Check for multiple .env files** - monorepos are tricky
5. **Wait after password changes** - pooler needs time to sync
6. **Add debug logging** - trace auth → query → result

Save yourself 3 hours. Bookmark this.

---

*Written after debugging a production outage at 10pm. Learn from my pain.*
