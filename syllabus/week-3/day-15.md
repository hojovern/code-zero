# Day 15: Soft Launch

> "The only validation that matters: strangers using your product."

## The Challenge

**By end of day, real strangers are using your product.**

Not friends. Not family. Real people who found you and decided to sign up. This is soft launch—limited release to validate before going big.

---

## What You're Building

| Activity | What It Does |
|----------|--------------|
| Launch checklist | Ensure nothing is broken |
| Beta invite system | Controlled user growth |
| Feedback collection | Learn from early users |
| Quick fixes | Address critical issues |
| Launch announcement | Get your first strangers |

**The WOW moment:** Watch your analytics as real people sign up. People you've never met, using something you built.

---

## Schedule

### Morning Block (9:00 - 12:00)

| Time | Activity | Outcome |
|------|----------|---------|
| 9:00 - 9:30 | Launch Checklist | Verify everything works |
| 9:30 - 10:30 | Beta Invite System | Control early access |
| 10:30 - 10:45 | Break | |
| 10:45 - 12:00 | Feedback System | Collect user input |

### Lunch (12:00 - 13:00)
Prepare launch content

### Afternoon Block (13:00 - 17:30)

| Time | Activity | Outcome |
|------|----------|---------|
| 13:00 - 13:30 | Standup: Launch readiness | Final checks |
| 13:30 - 14:30 | **SOFT LAUNCH** | Share publicly |
| 14:30 - 15:30 | Monitor + Quick Fixes | Address issues |
| 15:30 - 16:00 | Feedback Session | Learn from each other |
| 16:00 - 17:00 | Week 3 Retro | What worked |
| 17:00 - 17:30 | Week 4 Preview | Final stretch |

---

## Morning: Prepare to Launch

### 1. Launch Checklist (30 min)

**Final verification:**
```
You: Run through a complete launch checklist for me.

Check these categories:

CRITICAL (must work):
- [ ] Site loads (no errors)
- [ ] Can sign up with email
- [ ] Can log in
- [ ] Core feature works
- [ ] Payments work (if applicable)
- [ ] Mobile works

IMPORTANT (should work):
- [ ] AI features working
- [ ] Emails sending
- [ ] All links work
- [ ] No console errors
- [ ] Analytics tracking
- [ ] Error monitoring active

NICE TO HAVE:
- [ ] SEO meta tags
- [ ] Social sharing previews
- [ ] Fast load time

Run through each check and fix any critical issues.
```

**Fix any blockers:**
```
You: [Describe any issue]
This is blocking launch. Fix it quickly.
```

### 2. Beta Invite System (60 min)

**Control early access:**
```
You: Create a beta invite system.

Options:
1. Waitlist mode:
   - Landing page collects emails
   - Manually invite in batches
   - Dashboard to manage waitlist

2. Invite code mode:
   - Generate unique invite codes
   - Users need code to sign up
   - Track who invited whom

3. Limited access mode:
   - First N users get in
   - Others go to waitlist
   - Counter shows spots left

Recommend which is best for soft launch and implement it.
```

**For waitlist mode:**
```
You: Create a waitlist system.

1. Landing page changes:
   - Show "Join the waitlist" instead of "Sign up"
   - Email input + submit
   - Success message: "You're on the list!"

2. Waitlist table:
   - email, joined_at, status (waiting/invited/signed_up)
   - position in line

3. Admin page to manage:
   - See all waitlist entries
   - Send invite emails in batches
   - Mark as invited

4. When invited:
   - User receives email with magic link
   - Link allows signup
   - Track conversion

This gives us controlled growth.
```

### 3. Feedback System (75 min)

**Make it easy to share feedback:**
```
You: Add multiple feedback collection methods.

1. In-app feedback widget:
   - Floating button: "Feedback"
   - Opens modal with text area
   - Optional screenshot capture
   - Sends to feedback table + Slack

2. NPS survey (Net Promoter Score):
   - Show after 3 days of usage
   - "How likely to recommend?" 0-10
   - Follow-up question for context
   - Only show once per user

3. Feature voting:
   - /roadmap page showing planned features
   - Users can upvote
   - Shows what's popular

4. Feedback storage:
   - feedback table: user_id, type, content, screenshot_url, created_at
   - Admin page to view all feedback
   - Tag and categorize

Make feedback EASY. Low friction = more responses.
```

**Set up feedback alerts:**
```
You: Create n8n workflow for feedback.

When feedback submitted:
1. Save to database
2. Send to Slack #feedback channel
3. If NPS < 7, alert immediately (detractor)
4. If NPS > 8, send thank you email (ask for review)
```

---

## Afternoon: LAUNCH

### 4. Soft Launch (60 min)

**Launch preparation:**
```
You: Help me prepare launch content.

Write:
1. Launch tweet/post:
   - Announce beta launch
   - What the product does
   - Who it's for
   - Link to sign up
   - Ask for feedback

2. Reddit post (if appropriate):
   - For relevant subreddit
   - Share story, not just product
   - Ask for honest feedback

3. Hacker News "Show HN" (optional):
   - Title format: "Show HN: [product] - [one-line description]"
   - Brief description
   - What makes it interesting

4. Email to existing contacts:
   - Personal ask for beta testing
   - What you'd like them to try
   - How to give feedback

Keep it authentic. You're looking for feedback, not viral growth yet.
```

**GO LIVE:**

1. Remove any "coming soon" messaging
2. Enable signups (or send first waitlist invites)
3. Post your launch content
4. Share with the intake: everyone post at the same time for support

**Where to post:**
- Twitter/X
- LinkedIn
- Reddit (relevant subreddits)
- Hacker News (if technical)
- IndieHackers
- Product Hunt (save for bigger launch)
- Personal network

### 5. Monitor + Quick Fixes (60 min)

**Watch everything:**
```
You: Set up a launch monitoring dashboard.

Show me live:
1. Analytics (visitors, signups)
2. Error rate (Sentry)
3. Response time
4. Feedback coming in
5. Social mentions (if possible)

I want to watch the launch in real-time.
```

**Respond to issues immediately:**
- User reports bug → Fix in 15 minutes if possible
- Site slow → Investigate immediately
- Confusion in feedback → Clarify in UI
- Common question → Add to FAQ

**Track launch metrics:**
```
You: Create a launch-day metrics tracker.

Track:
- Visitors (unique)
- Signups
- Conversion rate (visitor → signup)
- Activation rate (signup → first action)
- Feedback count
- Errors

Update every hour during launch.
```

### 6. Respond to Feedback (30 min)

**Close the loop:**
```
You: Help me respond to early feedback.

For each piece of feedback:
1. Thank the user personally
2. Acknowledge their point
3. Tell them what we'll do (or why we won't)
4. Make them feel heard

Draft response templates for:
- Bug report received
- Feature request logged
- Positive feedback thanks
- Clarifying question
```

**Quick wins:**
- If multiple people report same issue → Fix today
- If people are confused → Improve copy/UX
- If people love something → Double down

---

## Demo Day (Week 3)

### Share Your Launch Results

| Section | Time | What to Show |
|---------|------|--------------|
| Launch story | 30 sec | Where you posted, initial reaction |
| Real metrics | 30 sec | Signups, visitors, activation |
| User feedback | 30 sec | Actual quotes from strangers |
| What you learned | 30 sec | Key insight from soft launch |

**Demo Script:**
```
"At 2pm today, I posted [product] on [platform].

In 3 hours:
- X visitors
- Y signups
- Z people gave feedback

A user said: '[actual quote]'

What I learned: [insight]

Next week, I'm [what's changing based on feedback]."
```

---

## Week 3 Retro

### Discussion Questions

**For yourself:**
1. How did it feel to launch?
2. What surprised you about user feedback?
3. What would you do differently?
4. What's working that you should keep?

**For the intake:**
1. Whose launch went best? What can we learn?
2. What common feedback themes emerged?
3. How do we support each other in Week 4?

### Retro Format

| Category | Prompt |
|----------|--------|
| 🌟 Wins | What went well this week? |
| 🔧 Improve | What could be better? |
| 💡 Learn | What did you learn? |
| 🚀 Launch | How did soft launch go? |

---

## Week 4 Preview

### What's Coming

| Day | Focus |
|-----|-------|
| Day 16 | Growth + Marketing |
| Day 17 | User Onboarding Optimization |
| Day 18 | Scale + Performance |
| Day 19 | Polish + Documentation |
| Day 20 | **Final Demo Day** |

Week 4 is about growth and polish before the final presentation.

---

## Week 3 Complete

**What you shipped:**
- [x] Payment system (Stripe)
- [x] Analytics tracking
- [x] SEO optimization
- [x] Performance optimization
- [x] Tests and monitoring
- [x] Beta/waitlist system
- [x] Feedback collection
- [x] **SOFT LAUNCH**
- [x] Real users using your product

**What you proved:**
- You can charge for your product
- You can track what matters
- You can ship with confidence
- You can get real users
- You can handle feedback

**What's different now:**
- You have customers, not just users
- You have data, not just guesses
- You have feedback from strangers
- You're a founder now

---

## The Launch Pattern

What you learned is reusable:
```
You: Create a launch skill from what we did today.
Include:
- Launch checklist template
- Beta invite system
- Feedback collection setup
- Launch content templates
- Monitoring during launch
```

---

## Why Soft Launch Matters

| Hard launch | Soft launch |
|-------------|-------------|
| Hope nothing breaks | Know nothing breaks |
| Lots of users, no feedback loop | Few users, fast iteration |
| One shot to impress | Multiple shots to improve |
| Pressure to be perfect | Permission to learn |

Soft launch is your rehearsal. Week 4 finale is the show.

---

## Day 15 Troubleshooting

| Problem | Solution |
|---------|----------|
| No one signing up | Check landing page copy, post in more places |
| High bounce rate | Check page speed, improve hero |
| Many errors | Fix critical ones, communicate transparently |
| Negative feedback | Thank them, fix what you can, don't take it personally |
| Too much traffic | Good problem—scale up if needed |

---

*Week 4: Growth, polish, and the final demo. The home stretch.*
