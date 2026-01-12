# Security Checklist

**Type:** Reference (apply when working on auth, user input, APIs, deploy)

**Purpose:** Catch security vulnerabilities before they ship.

---

## AUTO-APPLY TRIGGERS

Apply this skill when working on:
- Authentication / authorization code
- User input handling (forms, URLs, APIs)
- Database queries
- File uploads
- API endpoints
- Environment variables / secrets
- Third-party integrations
- Before deployment

---

## OWASP TOP 10 QUICK CHECK

### 1. Injection (SQL, NoSQL, Command)

**Check:**
- [ ] Using parameterized queries (Drizzle ORM does this)
- [ ] No string concatenation in queries
- [ ] No `eval()` or dynamic code execution
- [ ] Shell commands use proper escaping

**Bad:**
```typescript
// SQL injection risk
db.execute(`SELECT * FROM users WHERE id = '${userId}'`)
```

**Good:**
```typescript
// Parameterized (Drizzle handles this)
db.select().from(users).where(eq(users.id, userId))
```

### 2. Broken Authentication

**Check:**
- [ ] Using established auth library (Auth.js, Supabase Auth)
- [ ] Sessions expire appropriately
- [ ] Password reset tokens are single-use and time-limited
- [ ] No credentials in URLs or logs

**SvelteKit pattern:**
```typescript
// Always verify session server-side
const session = await locals.auth();
if (!session?.user) {
  throw redirect(303, '/login');
}
```

### 3. Sensitive Data Exposure

**Check:**
- [ ] Secrets in `.env`, never in code
- [ ] `.env` in `.gitignore`
- [ ] No API keys in client-side code
- [ ] Passwords hashed (bcrypt/argon2), never plain text
- [ ] HTTPS only in production

**Never commit:**
```
.env
.env.local
.env.production
**/credentials.json
**/*secret*
```

### 4. Broken Access Control

**Check:**
- [ ] Every endpoint verifies user has permission
- [ ] Can't access other users' data by changing IDs
- [ ] Admin routes check admin role
- [ ] API routes validate ownership

**Pattern:**
```typescript
// Check ownership, not just authentication
const item = await db.select().from(items).where(eq(items.id, itemId));
if (item.userId !== session.user.id) {
  throw error(403, 'Forbidden');
}
```

### 5. Security Misconfiguration

**Check:**
- [ ] Error messages don't leak stack traces to users
- [ ] Debug mode off in production
- [ ] Default credentials changed
- [ ] CORS configured properly

**SvelteKit error handling:**
```typescript
// Don't expose internal errors
catch (err) {
  console.error('Internal error:', err); // Log internally
  throw error(500, 'Something went wrong'); // Generic to user
}
```

### 6. XSS (Cross-Site Scripting)

**Check:**
- [ ] User input escaped before rendering
- [ ] No `{@html}` with user content (Svelte)
- [ ] Content-Security-Policy headers set
- [ ] Sanitize HTML if absolutely needed

**Svelte is safe by default:**
```svelte
<!-- Safe: auto-escaped -->
<p>{userInput}</p>

<!-- DANGEROUS: renders raw HTML -->
{@html userInput}
```

**If you must use `{@html}`:**
```typescript
import DOMPurify from 'dompurify';
const safeHtml = DOMPurify.sanitize(userInput);
```

### 7. Insecure Dependencies

**Check:**
- [ ] Run `npm audit` periodically
- [ ] Keep dependencies updated
- [ ] Review new dependencies before adding

```bash
npm audit
npm audit fix
```

### 8. CSRF (Cross-Site Request Forgery)

**Check:**
- [ ] SvelteKit form actions have CSRF protection (built-in)
- [ ] API mutations require authentication
- [ ] Sensitive actions require re-authentication

**SvelteKit forms are protected by default.**

### 9. Insecure File Uploads

**Check:**
- [ ] Validate file type (not just extension)
- [ ] Limit file size
- [ ] Store outside web root or use signed URLs
- [ ] Scan for malware if accepting from public

```typescript
// Validate file type
const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
if (!allowedTypes.includes(file.type)) {
  throw error(400, 'Invalid file type');
}

// Limit size (5MB)
if (file.size > 5 * 1024 * 1024) {
  throw error(400, 'File too large');
}
```

### 10. Logging & Monitoring

**Check:**
- [ ] Log authentication events
- [ ] Log authorization failures
- [ ] Don't log sensitive data (passwords, tokens)
- [ ] Have alerting for suspicious activity

---

## SVELTEKIT-SPECIFIC SECURITY

### Server vs Client

```typescript
// CORRECT: Server-only imports
import { SECRET_KEY } from '$env/static/private';
import { db } from '$lib/server/db';

// WRONG: These are exposed to client
import { PUBLIC_API_URL } from '$env/static/public'; // OK if truly public
```

### Hooks for Auth

```typescript
// src/hooks.server.ts
export const handle: Handle = async ({ event, resolve }) => {
  const session = await event.locals.auth();

  // Protect admin routes
  if (event.url.pathname.startsWith('/admin')) {
    if (!session?.user || session.user.role !== 'admin') {
      throw redirect(303, '/login');
    }
  }

  return resolve(event);
};
```

### API Route Protection

```typescript
// Every API route should check auth
export const POST: RequestHandler = async ({ locals }) => {
  const session = await locals.auth();
  if (!session?.user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Proceed with authenticated user
};
```

---

## BEFORE DEPLOY CHECKLIST

- [ ] `.env.production` has all required vars
- [ ] No secrets in codebase (`git log -p | grep -i secret`)
- [ ] `npm audit` shows no high/critical vulnerabilities
- [ ] Auth flows tested (login, logout, session expiry)
- [ ] Admin routes protected
- [ ] Error pages don't leak info
- [ ] HTTPS enforced
- [ ] Database backups configured

---

## RED FLAGS (Stop Immediately)

| If You See | Do This |
|------------|---------|
| API key in client code | Move to server, use proxy endpoint |
| `{@html userInput}` | Sanitize or escape |
| Password in plain text | Hash with bcrypt |
| SQL string concatenation | Use parameterized query |
| `eval()` with user input | Remove immediately |
| Secrets in git history | Rotate all affected secrets |

---

## SESSION LEARNINGS

### Patterns Discovered

### Improvements Made

### Avoid

