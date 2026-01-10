# Day 12: Know Your Users

> "Stop guessing. Start knowing."

## The Challenge

**By end of day, you can see exactly how users interact with your product.**

Every click. Every flow. Every drop-off. No more guessing what users want—you have data. This is how real products make decisions.

---

## What You're Building

| Feature | What It Does |
|---------|--------------|
| Page analytics | Views, visitors, sources |
| Event tracking | Button clicks, feature usage |
| User journeys | Funnels and conversion paths |
| Custom dashboard | Your metrics at a glance |
| Behavior insights | What users actually do |

**The insight:** Watch your analytics as you use your own product. See events fire in real-time.

---

## Schedule

### Morning Block (9:00 - 12:00)

| Time | Activity | Outcome |
|------|----------|---------|
| 9:00 - 9:30 | Analytics Strategy | Define what to track |
| 9:30 - 10:30 | Set Up Plausible/PostHog | Basic analytics working |
| 10:30 - 10:45 | Break | |
| 10:45 - 12:00 | Custom Event Tracking | Track user actions |

### Lunch (12:00 - 13:00)

### Afternoon Block (13:00 - 17:30)

| Time | Activity | Outcome |
|------|----------|---------|
| 13:00 - 13:30 | Standup: Show your tracking | What are you measuring? |
| 13:30 - 14:30 | Build Funnels | Conversion tracking |
| 14:30 - 14:45 | Break | |
| 14:45 - 15:45 | Internal Dashboard | Admin metrics view |
| 15:45 - 16:30 | User Behavior Analysis | Cohorts + insights |
| 16:30 - 17:00 | AI Analytics Summary | Daily insights |
| 17:00 - 17:30 | Ship | Analytics live |

---

## Morning: Analytics Foundation

### 1. Analytics Strategy (30 min)

**Before adding tracking, decide what matters:**
```
You: Help me create an analytics strategy for [my product].

I need to understand:
1. Acquisition: How do users find me?
2. Activation: Do they experience the "aha moment"?
3. Retention: Do they come back?
4. Revenue: Do they pay? (if applicable)
5. Referral: Do they tell others?

For my product, suggest:
- Key metrics to track
- Important events to capture
- Funnels to measure
- What "success" looks like

My product does: [description]
Core value: [what users get]
```

**The AARRR framework:**

| Stage | Question | Metrics |
|-------|----------|---------|
| Acquisition | Where do users come from? | Traffic sources, landing pages |
| Activation | Do they "get it"? | Signup rate, first action |
| Retention | Do they come back? | DAU/MAU, return visits |
| Revenue | Do they pay? | Conversion rate, MRR |
| Referral | Do they share? | Invites, shares |

### 2. Set Up Plausible/PostHog (60 min)

**Choose your analytics tool:**

| Tool | Best For | Privacy |
|------|----------|---------|
| Plausible | Simple, privacy-focused | No cookies, GDPR-friendly |
| PostHog | Feature-rich, self-hostable | Session recordings, heatmaps |
| Mixpanel | Event-heavy products | Advanced funnels |

**Set up Plausible (recommended for simplicity):**
```
You: Set up Plausible analytics for this project.

1. Create Plausible account and add site
2. Add the tracking script to our app
3. Verify it's tracking page views
4. Set up custom events capability

Use the environment variable for the domain.
Make sure it works in production only (not dev).
```

**Or set up PostHog (for more features):**
```
You: Set up PostHog analytics for this project.

1. Create PostHog account (cloud or self-hosted)
2. Install posthog-js package
3. Initialize in our app
4. Verify basic tracking works
5. Set up user identification (link events to users)

I want to track both anonymous and authenticated users.
```

**Verify it works:**
- Visit your site
- Check analytics dashboard
- See your visit appear

### 3. Custom Event Tracking (75 min)

**Track meaningful user actions:**
```
You: Set up custom event tracking throughout the app.

Create a tracking utility in src/lib/analytics.ts with:
- track(eventName, properties) - general event
- trackPageView(page) - page views (if not auto)
- identify(userId, traits) - identify logged-in users

Track these events:
- User signed up: { method: 'email' | 'google' }
- User logged in
- Created [item]: { item_type, word_count, etc. }
- Used AI feature: { feature_name, success: boolean }
- Upgraded subscription: { from_tier, to_tier, price }
- Clicked CTA: { cta_name, location }

Make tracking calls throughout the app at appropriate places.
```

**Claude will:**
- Create analytics utility
- Add tracking calls to key actions
- Set up user identification
- Handle both dev and prod environments

**Event naming conventions:**
```
Good: user_signed_up, item_created, upgrade_started
Bad: click1, button, user action

Always use: snake_case, verb_past_tense, specific names
```

**Test your tracking:**
- Perform actions in your app
- Check analytics dashboard
- Events should appear in real-time (PostHog) or within minutes (Plausible)

---

## Afternoon: Insights + Dashboards

### 4. Build Funnels (60 min)

**Track conversion paths:**
```
You: Set up funnel tracking for key user journeys.

Funnel 1: Signup to First Value
- Step 1: Visited landing page
- Step 2: Clicked signup CTA
- Step 3: Completed signup
- Step 4: Created first [item]
- Step 5: Used AI feature

Funnel 2: Free to Paid
- Step 1: Visited pricing page
- Step 2: Clicked upgrade button
- Step 3: Started checkout
- Step 4: Completed payment

For each funnel:
- Track all step events
- Calculate drop-off between steps
- Identify where users leave

Help me set this up in [Plausible/PostHog].
```

**What funnels tell you:**
- Where users drop off
- What's blocking conversion
- Which flows need improvement

**Add funnel visualization:**
```
You: Create a /admin/funnels page that visualizes our conversion funnels.

Show:
- Each funnel as a visual flow
- Number of users at each step
- Conversion % between steps
- Drop-off highlights (red for bad, green for good)

Query this from our analytics API or from internal event logs.
```

### 5. Internal Dashboard (60 min)

**Build your metrics command center:**
```
You: Create an /admin/analytics page with key metrics.

Include these sections:

1. Overview Cards:
   - Total users (all time)
   - New users (last 7 days)
   - Active users (DAU, WAU, MAU)
   - Revenue (if applicable)

2. Traffic Chart:
   - Page views over time
   - Unique visitors over time
   - Toggle: 7 days / 30 days / 90 days

3. Top Pages:
   - Most visited pages
   - Bounce rate per page

4. Feature Usage:
   - Which features are used most
   - AI feature usage stats
   - Content generated count

5. User Growth:
   - Signups over time
   - Cumulative user count chart

6. Revenue (if applicable):
   - MRR chart
   - Conversion rate
   - Churn rate

Query from Plausible/PostHog API or internal tables.
Real-time updates where possible.
```

**Claude will:**
- Create dashboard layout
- Build chart components
- Connect to analytics APIs
- Add date range filters

### 6. User Behavior Analysis (45 min)

**Understand user segments:**
```
You: Add user behavior analysis capabilities.

1. Cohort Analysis:
   - Group users by signup week
   - Track retention per cohort
   - Visualize cohort retention grid

2. User Segments:
   - Power users (high activity)
   - At-risk users (declining activity)
   - New users (< 7 days)
   - Paying users

3. Feature Adoption:
   - % of users who've tried each feature
   - Time to first use of each feature
   - Feature usage by user segment

4. Session Analysis:
   - Average session duration
   - Pages per session
   - Most common user flows

Add these to the admin analytics page.
```

### 7. AI Analytics Summary (30 min)

**Daily AI-generated insights:**
```
You: Extend our Insight Agent to include analytics.

Update the daily report to include:
1. Analytics summary:
   - Traffic trends (up/down vs last week)
   - Notable events (spike in signups, etc.)
   - Feature adoption changes

2. AI-generated insights:
   - "Signups increased 40% after you published [blog post]"
   - "Users who use [feature] are 3x more likely to upgrade"
   - "Drop-off is high at [step] - consider simplifying"

3. Recommended actions:
   - What to investigate
   - What to double down on
   - What to fix

Send this as part of the daily email digest.
```

**Connect analytics to existing automation:**
```
You: Create alerts for important analytics events.

Trigger n8n workflows when:
- Traffic spike (> 2x normal)
- Signup surge (> 10 in an hour)
- Error spike (> 5% of requests)
- Revenue milestone (new subscriber)

Send to Slack with context.
```

### 8. Ship (30 min)

**Deploy:**
```
You: Commit everything with message "Day 12: Analytics"
and push to GitHub.
```

**Verify in production:**
- [ ] Page views tracking
- [ ] Custom events firing
- [ ] User identification working
- [ ] Admin dashboard loading
- [ ] Funnels calculating
- [ ] No PII leaking (privacy check)

---

## What You Built Today

| Feature | How |
|---------|-----|
| Page analytics | Plausible/PostHog integration |
| Event tracking | Custom events throughout app |
| Funnels | Conversion tracking |
| Admin dashboard | Internal metrics view |
| Behavior analysis | Segments and cohorts |
| AI insights | Automated analytics summary |

**You know your users now.** No more guessing. Data-driven decisions from here on.

---

## The Analytics Pattern

Save for future products:
```
You: Create an analytics skill from what we built today.
Include:
- Analytics tool setup
- Event tracking patterns
- Funnel configuration
- Dashboard components
- AI insight integration
```

---

## What to Track (Cheat Sheet)

| Category | Events |
|----------|--------|
| Auth | signup, login, logout, password_reset |
| Core Feature | created, updated, deleted, viewed |
| AI | ai_feature_used, ai_generation_complete |
| Subscription | upgrade_started, upgrade_completed, cancelled |
| Engagement | page_view, session_start, feature_clicked |
| Errors | error_occurred, api_failed |

---

## Day 12 Troubleshooting

| Problem | Solution |
|---------|----------|
| Events not appearing | Check script loaded, verify event name |
| User not identified | Call identify() after login |
| Funnels showing 0% | Verify all step events fire correctly |
| Dashboard slow | Cache API responses, use date filters |
| Privacy concerns | Review what data you're collecting |

---

*Tomorrow: Get found by people searching for what you built.*
