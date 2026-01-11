# Day 10: AI Agents On Autopilot

> "Your AI doesn't wait to be asked. It just works."

## The Challenge

**By end of day, you have AI agents running automatically, 24/7.**

Not AI you click a button to use. AI that runs on schedules. AI that triggers on events. AI that does work while you're asleep.

This is the Week 2 capstone: AI + Automation = AI Agents On Autopilot.

---

## What You're Building

| Agent | Trigger | What It Does |
|-------|---------|--------------|
| Content Agent | Weekly schedule | Generates blog + social + email |
| Welcome Agent | New signup | Creates personalized onboarding |
| Insight Agent | Daily schedule | Analyzes data, sends report |
| Alert Agent | Threshold crossed | Warns about issues |
| Mission Control | — | Dashboard showing all agents |

**The WOW moment:** Watch your AI agents working in real-time during your demo.

---

## Schedule

### Morning Block (9:00 - 12:00)

| Time | Activity | Outcome |
|------|----------|---------|
| 9:00 - 9:30 | Agent Architecture | Design your AI workforce |
| 9:30 - 10:30 | Content Agent | Scheduled content generation |
| 10:30 - 10:45 | Break | |
| 10:45 - 12:00 | Welcome Agent | AI-powered onboarding |

### Lunch (12:00 - 13:00)
Final prep for demo

### Afternoon Block (13:00 - 17:30)

| Time | Activity | Outcome |
|------|----------|---------|
| 13:00 - 14:00 | Insight Agent | Daily AI reports |
| 14:00 - 14:30 | Mission Control Dashboard | See all agents running |
| 14:30 - 15:30 | **DEMO DAY** | Everyone presents |
| 15:30 - 16:00 | Feedback Session | Learn from each other |
| 16:00 - 17:00 | Week 2 Retro | What worked, what didn't |
| 17:00 - 17:30 | Week 3 Preview | What's coming next |

---

## Morning: Build Your AI Workforce

### 1. Agent Architecture (30 min)

**Design your AI agents:**
```
You: Help me design an AI agent system for [my product].

I want agents that:
1. Run automatically (scheduled or event-triggered)
2. Use AI (Gemini) to do intelligent work
3. Take actions (save to DB, send emails, notify)
4. Log their activity for visibility

Map out:
- What agents should I build?
- What triggers each one?
- What does each agent do?
- How do I monitor them?

Think about what would be most valuable for my product and users.
```

**Agent system structure:**
```
AI Agents System
├── Content Agent
│   ├── Trigger: Every Monday 6am
│   ├── Action: Generate weekly content
│   └── Output: Blog + social + email in DB
│
├── Welcome Agent
│   ├── Trigger: New user signup
│   ├── Action: Analyze profile, personalize onboarding
│   └── Output: Custom welcome + recommendations
│
├── Insight Agent
│   ├── Trigger: Daily 8am
│   ├── Action: Analyze yesterday's activity
│   └── Output: Report email to admin
│
├── Alert Agent
│   ├── Trigger: Threshold check (hourly)
│   ├── Action: Detect anomalies
│   └── Output: Slack alert if issues
│
└── Mission Control
    └── Dashboard showing all agent activity
```

### 2. Content Agent (60 min)

**Automated content generation:**

**Step 1: Create the n8n workflow**
```
In n8n:
1. Add Schedule trigger
   - Every Monday at 6:00 AM

2. Add HTTP Request node
   - GET your app's /api/content/topics
   - Get trending topics or content calendar

3. Add HTTP Request node (to Gemini)
   - Generate full blog post
   - Use your blog-writer prompt from Week 1

4. Add HTTP Request node (to Gemini again)
   - Generate 5 social snippets from blog

5. Add HTTP Request node (to Gemini again)
   - Generate email newsletter draft

6. Add HTTP Request node
   - POST to your app's /api/content
   - Save all generated content to database

7. Add Slack node
   - "🤖 Content Agent: Generated weekly content"
   - Include preview of headline

8. Add Email node (optional)
   - Send draft to you for review
```

**Step 2: Create supporting API endpoints**
```
You: Create API endpoints for the Content Agent.

1. GET /api/content/topics
   - Returns next topic from content calendar
   - Or uses AI to suggest trending topic

2. POST /api/content
   - Receives generated content from n8n
   - Saves to content table
   - Marks as "auto-generated, pending review"

3. GET /api/content/pending
   - Lists content waiting for human review

Add an agent_runs table to track:
- agent_name, trigger_type, started_at, completed_at, status, output_summary
```

**Test the Content Agent:**
- Manually trigger the workflow in n8n
- Watch it generate content
- Check your database
- See the Slack notification

### 3. Welcome Agent (75 min)

**AI-powered personalized onboarding:**

**Step 1: Create the trigger**
```
You: Update the signup webhook to trigger the Welcome Agent.

When new user signs up, send to n8n:
- user_id, email, name
- signup_source (where they came from)
- any profile data they entered
```

**Step 2: Build the n8n workflow**
```
In n8n:
1. Webhook trigger (new user)

2. Add HTTP Request node (to Gemini)
   Prompt: "Based on this user profile, create:
   1. A personalized welcome message (2-3 sentences)
   2. 3 recommended first actions based on their likely goals
   3. One tip that would help them succeed

   User: {name}, signed up from {source}
   Make it warm and specific, not generic."

3. Add HTTP Request node
   - POST to your app's /api/users/{id}/onboarding
   - Save personalized welcome content

4. Add Email node
   - Send personalized welcome email
   - Include AI-generated content

5. Add HTTP Request node
   - Create personalized dashboard items
   - "Recommended for you" section

6. Log the agent run
```

**Step 3: Create supporting infrastructure**
```
You: Create the onboarding system.

1. Add to profiles table:
   - welcome_message: text
   - recommended_actions: jsonb
   - onboarding_tip: text

2. Update dashboard to show:
   - Personalized welcome message
   - "Recommended for you" cards
   - Progress checklist

3. Create POST /api/users/{id}/onboarding
   - Accepts AI-generated onboarding content
   - Updates user profile

The dashboard should feel personalized from first visit.
```

**Test Welcome Agent:**
1. Sign up with a new account
2. Watch n8n workflow execute
3. Check email for personalized welcome
4. See personalized dashboard

---

## Afternoon: Monitoring + Demo

### 4. Insight Agent (60 min)

**Daily AI-powered reports:**

**Build the workflow:**
```
In n8n:
1. Schedule trigger: Daily 8:00 AM

2. Add Supabase node
   - Query yesterday's activity
   - Count new users, content created, AI tasks
   - Get any errors

3. Add HTTP Request (to Gemini)
   Prompt: "Analyze this product data and provide:
   1. One-sentence summary of yesterday
   2. Key metric highlight (best performing)
   3. One concern to watch
   4. One recommendation for today

   Data: {activity_data}
   Be concise and actionable."

4. Add Email node
   - Send daily report to admin
   - Subject: "[Product] Daily Insights - {date}"
   - Include AI analysis + raw numbers

5. Add Slack node
   - Quick summary to #product-insights channel

6. Log to agent_runs table
```

**Test the Insight Agent:**
- Create some activity in your app
- Manually trigger the workflow
- Check your email for the report
- See Slack notification

### 5. Mission Control Dashboard (30 min)

**See all your AI agents working:**
```
You: Create a /admin/mission-control page.

This is the command center for all AI agents. Include:

1. Agent Status Cards:
   - One card per agent
   - Name, description, trigger type
   - Last run time + status (success/failed)
   - Next scheduled run
   - Run count (today/this week)

2. Live Activity Feed:
   - Real-time stream of agent executions
   - "Content Agent started..." "Welcome Agent completed..."
   - Color coded: green=success, red=error, yellow=running

3. Quick Stats:
   - Total agent runs today
   - Success rate
   - Content generated this week
   - Users onboarded with AI

4. Manual Controls:
   - "Run Now" button for each agent
   - Enable/disable toggle
   - View logs link

Make it feel like a mission control center. Real-time updates.
Use the Supabase Realtime subscription for live activity feed.
```

**Claude will:**
- Create the dashboard layout
- Query agent_runs table
- Set up real-time subscription
- Build control buttons

### 6. Final Polish (30 min before demo)

**Make it demo-ready:**
```
You: Polish Mission Control for the demo.

1. Add visual indicators:
   - Animated pulse for "running" agents
   - Success checkmark animations
   - Live counter updating

2. Add sound effects (optional):
   - Subtle sound on agent completion
   - Alert sound on errors

3. Pre-populate with recent activity:
   - Generate some content earlier today
   - Have some agent runs to show

4. Test the live demo flow:
   - I'll trigger an agent during demo
   - It should show running → complete in real-time
```

---

## Demo Day

### The 2-Minute Demo Structure

| Section | Time | What to Show |
|---------|------|--------------|
| Hook | 15 sec | "My AI workforce runs while I sleep" |
| Mission Control | 30 sec | Show dashboard with all agents |
| Live Agent | 60 sec | Trigger agent, watch it work in real-time |
| Results | 15 sec | Show what the agent produced |

### Demo Script

```
HOOK (15 seconds):
"Last week I had AI features. This week I have AI employees.
Let me show you my mission control."

MISSION CONTROL (30 seconds):
[Show dashboard]
"These are my AI agents. Content Agent runs every Monday—
it's already created 4 blog posts automatically.
Welcome Agent greets every new user with personalized onboarding.
Insight Agent sends me a report every morning."

[Point to live feed]
"This is real-time. Watch what happens when I trigger an agent."

LIVE AGENT (60 seconds):
[Click "Run Now" on an agent]
"I just triggered the Content Agent. Watch the feed..."
[Activity shows: "Content Agent started..."]
[Wait for completion]
"It just generated a full blog post, 5 tweets, and an email draft."
[Show in Slack: notification arrives]
"My team just got notified in Slack."

RESULTS (15 seconds):
[Show generated content]
"All of this happened automatically. No clicking. No prompting.
AI agents working while I sleep. That's Week 2."
```

### Demo Day Rules

1. **2 minutes MAX**
2. **Show Mission Control** — The command center
3. **Trigger live** — Show an agent actually running
4. **Real results** — Show what the AI produced
5. **Have backup** — Pre-recorded video if live fails

---

## Week 2 Retro

### Discussion Questions

**For yourself:**
1. Which automation saves you the most time?
2. What would you automate next?
3. How does it feel to have AI working for you?
4. What surprised you this week?

**For the intake:**
1. Whose automation was most creative?
2. What patterns can we all learn from?
3. What would make these agents even better?

### Retro Format

| Category | Prompt |
|----------|--------|
| 🌟 Wins | What went well this week? |
| 🔧 Improve | What could be better? |
| 💡 Learn | What did you learn? |
| ❓ Questions | What are you still confused about? |

---

## Week 3 Preview

### What's Coming

| Day | Focus |
|-----|-------|
| Day 11 | Payments + Subscriptions (Stripe) |
| Day 12 | Analytics + User Tracking |
| Day 13 | SEO + Performance Optimization |
| Day 14 | Testing + Quality Assurance |
| Day 15 | Launch Prep + Go-to-Market |

Week 3 is about going from product to business.

---

## Week 2 Complete

**What you shipped:**
- [x] Real-time data sync
- [x] Presence indicators
- [x] Professional UI (modals, toasts, validation)
- [x] File upload system
- [x] n8n automation workflows
- [x] AI Content Agent
- [x] AI Welcome Agent
- [x] AI Insight Agent
- [x] Mission Control dashboard
- [x] Demo of AI agents working live

**What you proved:**
- You can build systems that run without you
- You can make AI work autonomously
- You can monitor and control automation
- You can present complex systems simply

**What's different now:**
- Your product works 24/7
- AI does repetitive tasks for you
- You have visibility into everything
- You're thinking in systems, not features

---

## The AI Agents Pattern

What you built is reusable:
```
You: Create an ai-agents skill from what we built today.
Include:
- Agent architecture pattern
- n8n + AI integration
- Webhook trigger patterns
- Mission control dashboard template
- Monitoring and logging approach
```

---

## The Transformation

| Week 1 | Week 2 |
|--------|--------|
| AI feature you click | AI that runs itself |
| Manual everything | Automated workflows |
| You are the operator | Product operates itself |
| Features | Systems |
| Builder | Orchestrator |

You're not just building products anymore. You're building teams—of AI agents that work for you.

---

## Practice Exercise

Complete this capstone exercise:

**[Build AI Agents](exercises/10-ai-agents.md)** (2 hours)
- Design AI agent architectures
- Connect n8n workflows with AI APIs
- Build autonomous scheduled agents
- Create real-time monitoring dashboards

---

*Week 3 starts Monday. Time to turn your product into a business.*
