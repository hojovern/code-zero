# Day 14: Ship With Confidence

> "Know when things break before your users tell you."

## The Challenge

**By end of day, you have tests and monitoring that give you confidence to ship.**

Tests catch bugs before production. Monitoring catches bugs in production. Together, they let you move fast without breaking things.

---

## What You're Building

| Feature | What It Does |
|---------|--------------|
| Unit tests | Test individual functions |
| Integration tests | Test features end-to-end |
| Error monitoring | Catch errors in production |
| Uptime monitoring | Know when site is down |
| Health checks | Verify critical systems work |

**The confidence:** Deploy on Friday afternoon without fear.

---

## Schedule

### Morning Block (9:00 - 12:00)

| Time | Activity | Outcome |
|------|----------|---------|
| 9:00 - 9:30 | Testing Strategy | What to test |
| 9:30 - 10:30 | Unit Tests | Core logic tested |
| 10:30 - 10:45 | Break | |
| 10:45 - 12:00 | Integration Tests | User flows tested |

### Lunch (12:00 - 13:00)

### Afternoon Block (13:00 - 17:30)

| Time | Activity | Outcome |
|------|----------|---------|
| 13:00 - 13:30 | Standup: Run tests live | Show green tests |
| 13:30 - 14:30 | Error Monitoring | Sentry configured |
| 14:30 - 14:45 | Break | |
| 14:45 - 15:30 | Health Checks + Uptime | Monitoring active |
| 15:30 - 16:15 | CI/CD Pipeline | Tests run on every push |
| 16:15 - 17:00 | Alerting | Get notified on issues |
| 17:00 - 17:30 | Ship | Monitoring live |

---

## Morning: Testing

### 1. Testing Strategy (30 min)

**Decide what to test:**
```
You: Help me create a testing strategy for [my product].

I have limited time. What should I test first?

Consider:
1. What breaks most often?
2. What would hurt users most if broken?
3. What's hard to test manually?
4. What changes frequently?

For my product, recommend:
- Which functions need unit tests
- Which user flows need integration tests
- What can I skip (for now)

I want maximum confidence with minimum effort.
```

**Testing pyramid:**

| Type | What | How Many |
|------|------|----------|
| Unit | Single functions | Many (fast, easy) |
| Integration | Features/flows | Some (slower, valuable) |
| E2E | Full user journey | Few (slowest, fragile) |

**What to test first:**
- Auth flows (login, signup, logout)
- Payment flows (if applicable)
- Core feature CRUD
- AI integrations
- Data validation

### 2. Unit Tests (60 min)

**Set up testing framework:**
```
You: Set up Vitest for testing our SvelteKit app.

1. Install Vitest and testing utilities
2. Configure vitest.config.ts
3. Set up test scripts in package.json
4. Create a sample test to verify setup

Show me the basic test structure.
```

**Write unit tests for core logic:**
```
You: Write unit tests for our core functions.

Test these areas:
1. Validation functions:
   - Email validation
   - Password strength
   - Form field validation

2. Data transformation:
   - Format date functions
   - Parse/stringify utilities
   - Data mapping functions

3. Business logic:
   - canAccess(user, feature) - subscription checks
   - calculatePrice() - pricing logic
   - Any pure functions with logic

For each function:
- Test happy path
- Test edge cases
- Test error cases

Put tests in src/lib/__tests__/
```

**Run tests:**
```bash
npm run test
```

**Aim for:** Core utility functions have tests, all passing.

### 3. Integration Tests (75 min)

**Test user flows:**
```
You: Write integration tests for critical user flows.

Test these flows:
1. Authentication:
   - Sign up with valid data → success
   - Sign up with invalid data → error message
   - Login with correct credentials → redirects to dashboard
   - Login with wrong credentials → error message
   - Logout → redirects to home

2. Core Feature:
   - Create [item] → appears in list
   - Update [item] → changes saved
   - Delete [item] → removed from list
   - Validation errors shown for invalid input

3. AI Features:
   - Trigger AI generation → returns result
   - Handle AI API failure gracefully

Use Vitest + testing-library/svelte for component tests.
Mock external APIs (Supabase, AI).
```

**Claude will:**
- Set up test utilities
- Create mock implementations
- Write comprehensive tests
- Handle async operations

**Test coverage report:**
```
You: Add test coverage reporting.
Show me which code is tested and which isn't.
```

---

## Afternoon: Monitoring

### 4. Error Monitoring (60 min)

**Set up Sentry:**
```
You: Set up Sentry for error monitoring.

1. Create Sentry account (sentry.io)
2. Create a new SvelteKit project
3. Install @sentry/sveltekit
4. Configure for both client and server errors
5. Add environment variable for DSN

Sentry should capture:
- JavaScript errors in browser
- Server errors in API routes
- Unhandled promise rejections
- Context: user ID, page, browser

Test by throwing an intentional error.
```

**Enrich errors with context:**
```
You: Add context to Sentry errors.

When an error occurs, include:
- User ID (if logged in)
- Current page/route
- User's subscription tier
- Recent actions (breadcrumbs)

This helps debug issues faster.
```

**Set up source maps:**
```
You: Configure source maps upload to Sentry.

This lets us see the original code in error reports,
not minified production code.

Add to build process:
1. Generate source maps
2. Upload to Sentry
3. Clean up source maps (don't expose to users)
```

**Test error monitoring:**
1. Throw an error in production
2. Check Sentry dashboard
3. See full error with context

### 5. Health Checks + Uptime (45 min)

**Create health check endpoint:**
```
You: Create a /api/health endpoint.

Check:
1. Database connection (Supabase reachable)
2. External APIs (AI service reachable)
3. Critical services working

Return:
{
  status: "healthy" | "degraded" | "unhealthy",
  checks: {
    database: { status: "ok", latency: 45 },
    ai_api: { status: "ok", latency: 120 },
    storage: { status: "ok", latency: 30 }
  },
  timestamp: "2024-01-15T10:30:00Z"
}

If any check fails, return appropriate status.
```

**Set up uptime monitoring:**
```
You: Help me set up uptime monitoring.

Options:
1. UptimeRobot (free tier)
2. Better Uptime
3. Pingdom

Configure to:
- Check /api/health every 5 minutes
- Alert on failures
- Track response time
- Show status page (optional)

Walk me through UptimeRobot setup.
```

**Create status page (optional):**
```
You: Create a simple /status page.

Show:
- Current system status (all operational / issues)
- Status of each component
- Recent incidents (if any)
- Response time chart

This builds trust with users.
```

### 6. CI/CD Pipeline (45 min)

**Run tests on every push:**
```
You: Set up GitHub Actions to run tests on every push.

Create .github/workflows/test.yml that:
1. Triggers on push and PR
2. Sets up Node.js
3. Installs dependencies
4. Runs linter
5. Runs tests
6. Reports results

If tests fail, block the merge.
```

**Add deployment checks:**
```
You: Extend the CI pipeline for deployment safety.

Before deploying:
1. Run all tests
2. Check TypeScript types
3. Run linter
4. Build succeeds
5. Only then deploy to Vercel

Add branch protection:
- Require PR reviews
- Require CI to pass
```

### 7. Alerting (45 min)

**Get notified on issues:**
```
You: Set up alerting for production issues.

Alert me on:
1. Error rate spike (> 5 errors in 5 minutes)
2. Site down (uptime check fails)
3. Slow response time (> 3s average)
4. Health check degraded
5. Critical business events (if applicable)

Send alerts to:
- Slack #alerts channel
- Email (for critical only)

Create an n8n workflow that:
- Monitors Sentry webhook for new errors
- Groups similar errors
- Sends to Slack with context
```

**Tune alerting:**
```
You: Help me configure alert thresholds.

I don't want alert fatigue, but I need to know about real issues.

Suggest thresholds for:
- Error rate (when to alert)
- Response time (what's too slow)
- Uptime (how many failures before alert)

Also set up "resolved" notifications when issues clear.
```

### 8. Ship (30 min)

**Deploy with monitoring:**
```
You: Commit everything with message "Day 14: Tests + Monitoring"
and push to GitHub.
```

**Verify everything works:**
- [ ] Tests pass in CI
- [ ] Sentry receiving errors
- [ ] Uptime monitor active
- [ ] Health check returns healthy
- [ ] Alerts configured
- [ ] Status page live (if created)

---

## What You Built Today

| Feature | How |
|---------|-----|
| Unit tests | Vitest + testing-library |
| Integration tests | User flow coverage |
| Error monitoring | Sentry |
| Uptime monitoring | UptimeRobot |
| Health checks | /api/health endpoint |
| CI/CD | GitHub Actions |
| Alerting | Slack + email |

**You can ship with confidence now.** Tests catch bugs before production. Monitoring catches them in production. You'll know about problems before users complain.

---

## The Monitoring Pattern

Save for future projects:
```
You: Create a monitoring skill from what we built today.
Include:
- Test setup for SvelteKit
- Sentry configuration
- Health check endpoint
- CI/CD workflow
- Alerting setup
```

---

## Testing Cheat Sheet

| What | When to Test | How |
|------|--------------|-----|
| Pure functions | Always | Unit test |
| API handlers | For critical paths | Integration |
| UI components | Complex interactions | Component test |
| Auth flows | Always | Integration |
| Payment flows | Always | Integration |
| Full journeys | Key happy paths | E2E (sparingly) |

---

## Day 14 Troubleshooting

| Problem | Solution |
|---------|----------|
| Tests failing locally but not CI | Check environment variables |
| Sentry not receiving errors | Verify DSN, check network tab |
| Too many alerts | Adjust thresholds, add grouping |
| Health check always failing | Check API routes, verify connections |
| CI taking too long | Cache node_modules, parallelize |

---

*Tomorrow: Soft launch. Real users. Real feedback.*
