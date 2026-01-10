# Day 16: Growth Engine

> "The best marketing is users telling other users."

## The Challenge

**By end of day, your product has growth loops that work without you.**

Referrals. Content. Social proof. Users start bringing other users. This is sustainable growth—not paid ads, not manual outreach. Systems that compound.

---

## What You're Building

| Feature | What It Does |
|---------|--------------|
| Referral system | Users invite friends, both get rewarded |
| Content flywheel | AI generates traffic-driving content |
| Social proof | Reviews, testimonials, usage stats |
| Share mechanics | Easy to share from inside product |
| Growth dashboard | Track what's working |

**The WOW moment:** Check analytics. See a user you've never met who was referred by another user you've never met. That's organic growth.

---

## Schedule

### Morning Block (9:00 - 12:00)

| Time | Activity | Outcome |
|------|----------|---------|
| 9:00 - 9:30 | Growth Strategy | Define your channels |
| 9:30 - 10:30 | Referral System | Invite friends feature |
| 10:30 - 10:45 | Break | |
| 10:45 - 12:00 | Content Flywheel | AI-powered SEO content |

### Lunch (12:00 - 13:00)

### Afternoon Block (13:00 - 17:30)

| Time | Activity | Outcome |
|------|----------|---------|
| 13:00 - 13:30 | Standup: Growth plans | Share strategies |
| 13:30 - 14:30 | Social Proof + Sharing | Build trust, spread word |
| 14:30 - 14:45 | Break | |
| 14:45 - 15:45 | Growth Dashboard | Track everything |
| 15:45 - 16:30 | Launch Growth Campaigns | Activate channels |
| 16:30 - 17:00 | Growth Skill | Document the system |
| 17:00 - 17:30 | Ship | Growth engine live |

---

## Morning: Growth Loops

### 1. Growth Strategy (30 min)

**Choose your growth channels:**
```
You: Help me create a growth strategy for [my product].

Consider these channels:
1. Referrals - existing users invite new users
2. Content/SEO - blog posts that rank
3. Social - viral sharing mechanics
4. Community - where our users hang out
5. Partnerships - complementary products

For my product ([description]):
- Target audience: [who]
- Best channel fit: [which]
- Quick wins: [what can work fast]

Recommend 2-3 channels to focus on.
I have limited time, so prioritize high-leverage activities.
```

**Growth loop types:**

| Loop | How It Works | Example |
|------|--------------|---------|
| Referral | User invites → friend signs up → user rewarded | Dropbox |
| Content | SEO content → new visitor → signup → more content | HubSpot |
| Viral | Share creation → viewers see → some sign up | Canva |
| Network | Product better with more users → invite more | Slack |

### 2. Referral System (60 min)

**Build invite-a-friend:**
```
You: Create a referral system for our product.

1. Referral setup:
   - Each user gets unique referral code/link
   - Store in profiles table: referral_code, referred_by

2. Referral flow:
   - User clicks "Invite Friends" → gets shareable link
   - Link: yourapp.com/r/[code]
   - New user signs up with link → credited to referrer

3. Rewards (choose one):
   - Both get premium features for a month
   - Both get extended trial
   - Referrer gets credit toward subscription
   - Simple: "Thanks for spreading the word!"

4. UI components:
   - Referral dashboard showing invites sent
   - Count of successful referrals
   - Shareable link with copy button
   - Pre-written share messages for social

Make it easy to share via Twitter, LinkedIn, email.
```

**Track referrals:**
```
You: Create referral tracking and analytics.

Track:
- Referral links clicked
- Signups from referrals
- Conversion rate per referrer
- Top referrers

Show on admin dashboard:
- Total referral signups
- Best referral sources
- Referral conversion funnel
```

### 3. Content Flywheel (75 min)

**AI-powered content marketing:**
```
You: Set up a content marketing engine.

1. Keyword research integration:
   - Identify keywords our audience searches
   - Topics that drive traffic to products like ours
   - Long-tail keywords we can rank for

2. Automated content generation:
   - Use our Content Agent from Week 2
   - Schedule 2-3 posts per week
   - Each post targets specific keywords
   - Include internal links to product features

3. Content calendar:
   - Admin page to see planned content
   - Schedule posts in advance
   - Track what's published

4. SEO optimization:
   - Each post has target keyword in title, H1, meta
   - Include relevant internal links
   - AI suggests related keywords to include

The goal: rank for searches our target users make.
```

**Create pillar content:**
```
You: Create a pillar content piece for our main topic.

This should be:
- Comprehensive guide (2000+ words)
- Covers [main topic] thoroughly
- Internally links to our features
- Designed to rank for "[main keyword]"

Use AI to research and generate, then I'll review.
```

---

## Afternoon: Amplification

### 4. Social Proof + Sharing (60 min)

**Build trust with proof:**
```
You: Add social proof throughout the site.

1. Testimonials section:
   - Collect from beta users (ask via email)
   - Display on landing page
   - Include name, photo (if available), quote

2. Usage stats:
   - "X users have created Y [items]"
   - Real numbers, updated live
   - Display on landing page

3. Trust badges:
   - "As featured in..." (if applicable)
   - Security badges
   - Payment security (Stripe badge)

4. Recent activity feed (public):
   - "Someone just created..." (anonymous)
   - Creates sense of active community
   - Use real data, update in real-time
```

**Add share mechanics:**
```
You: Make it easy to share from inside the product.

When user creates something:
1. "Share" button appears
2. Pre-written share text for Twitter/LinkedIn
3. "Tweet about [product]" with mention
4. Generate shareable preview image (if applicable)

When user achieves milestone:
- "You've created 10 [items]! Share your progress?"
- One-click share with celebration message

Make sharing feel natural and rewarding.
```

### 5. Growth Dashboard (60 min)

**Track what's working:**
```
You: Create a growth dashboard at /admin/growth.

Sections:

1. Overview:
   - Total users + growth rate
   - Users this week vs last week
   - Primary growth channel

2. Acquisition breakdown:
   - Direct (typed URL)
   - Referral (invited by user)
   - Organic search (SEO)
   - Social (Twitter, LinkedIn, etc.)
   - Chart showing trend over time

3. Referral metrics:
   - Active referrers
   - Referral conversion rate
   - Top referrers leaderboard
   - Reward status

4. Content metrics:
   - Top performing posts
   - Traffic from SEO
   - Ranking keywords (if available)

5. Viral coefficient:
   - How many new users does each user bring?
   - Target: > 1 (true virality)
   - Current number + trend

Make it real-time where possible.
```

### 6. Launch Growth Campaigns (45 min)

**Activate your channels:**
```
You: Help me launch growth campaigns today.

1. Referral campaign:
   - Email existing users about new referral program
   - "Invite a friend, both get [reward]"
   - Include their unique link

2. Content push:
   - Publish 2-3 blog posts today
   - Share on social channels
   - Post in relevant communities (with value, not spam)

3. Social campaign:
   - Create shareable content about [product]
   - Twitter thread explaining what we built
   - LinkedIn post about the journey

4. Community engagement:
   - Find 3 communities where our users hang out
   - Provide value first (answer questions)
   - Mention product naturally when relevant

Draft the content for each campaign.
```

**Go execute:**
- Send referral email
- Publish content
- Post on social
- Engage in communities

### 7. Growth Skill (30 min)

**Document your growth system:**
```
You: Create a growth skill from what we built today.

Include:
- Referral system implementation
- Content flywheel setup
- Social proof components
- Growth dashboard
- Campaign templates

This is reusable for future products.
```

### 8. Ship (30 min)

**Deploy:**
```
You: Commit everything with message "Day 16: Growth engine"
and push to GitHub.
```

**Growth checklist:**
- [ ] Referral system live
- [ ] Referral emails sent
- [ ] New content published
- [ ] Social posts shared
- [ ] Growth dashboard tracking
- [ ] First referral signups (goal)

---

## What You Built Today

| Feature | Impact |
|---------|--------|
| Referral system | Users bring users |
| Content flywheel | SEO traffic grows |
| Social proof | Trust and credibility |
| Share mechanics | Easy word-of-mouth |
| Growth dashboard | Track everything |

**Your product grows itself now.** You've built growth loops that compound over time.

---

## Growth Principles

| Principle | Why It Works |
|-----------|--------------|
| Make sharing easy | Low friction = more shares |
| Reward both sides | Everyone has incentive |
| Track everything | Know what works |
| Content compounds | Old posts keep ranking |
| Social proof builds trust | People follow people |

---

## Day 16 Troubleshooting

| Problem | Solution |
|---------|----------|
| No one sharing referrals | Make incentive more compelling |
| Content not ranking | Focus on long-tail keywords first |
| Low conversion from referrals | Improve landing page for referred users |
| Can't track sources | Check UTM parameters, analytics setup |
| Growth stalled | Try a new channel, double down on what works |

---

*Tomorrow: Optimize the first minute. Make users fall in love faster.*
