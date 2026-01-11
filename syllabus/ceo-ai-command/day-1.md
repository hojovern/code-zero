# Day 1: CEO AI Command Center

> "You're not learning to use AI. You're building a system that works for you."

## Facilitator Prep

### Before the Session

**24 hours before:**
- [ ] Confirm venue and time
- [ ] Get participant's company name, industry, key competitors
- [ ] Prepare personalized examples for their industry
- [ ] Test all tools: Claude, n8n, Zoom integration

**Bring:**
- [ ] Laptop with Claude Code installed
- [ ] n8n account ready (cloud or self-hosted)
- [ ] Backup hotspot (never trust client WiFi)
- [ ] Printed cheatsheets (Command Center Quick Reference)
- [ ] Notebook for capturing their specific opportunities

**Set up their device:**
- [ ] Claude Code installed (or use your laptop for demo)
- [ ] n8n account created
- [ ] Browser tabs ready: Claude, n8n, their email

---

## Block 1: Build Your Command Center (45 min)

### Opening (5 min)

**Frame the day:**

> "Most people use AI like a search engine — ask a question, get an answer, start over. That's like having a brilliant employee with amnesia.
>
> Today, we're building something different. An AI Command Center that:
> - Remembers your business, your role, your preferences
> - Works autonomously while you sleep
> - Gets smarter every time you use it
>
> By the end of today, you'll have a digital workforce. Let's build it."

### The Memory Layer (15 min)

**Explain the concept:**

> "The difference between ChatGPT and what we're building is memory. ChatGPT forgets you exist after each conversation. Your Command Center remembers everything."

**Show CLAUDE.md:**

```markdown
# [Company Name] - CEO Command Center

## Who I Am
- CEO of [Company], a [industry] company
- [X] years in the role
- Key priorities: [growth/efficiency/expansion/etc.]

## My Business
- What we do: [one paragraph]
- Key metrics I track: [revenue, customers, etc.]
- Main competitors: [list]
- Current challenges: [list]

## How I Work
- Communication style: [direct/collaborative/formal]
- Decision-making: [data-driven/intuitive/consensus]
- Pet peeves: [long emails/jargon/etc.]

## My Team
- Direct reports: [CFO, COO, CMO, etc.]
- Key relationships: [board chair, major clients, etc.]

## Current Focus
- This quarter: [priorities]
- This week: [immediate focus]
```

**Build it together:**

> "Let's create your memory file right now. I'll ask you questions, you answer, and we'll build this together."

Walk through each section:
1. Who they are (role, experience)
2. What the company does
3. How they work (style, preferences)
4. Who matters (team, relationships)
5. Current priorities

**Time:** 15 min to complete their CLAUDE.md

### The Learning System (10 min)

**Explain how it gets smarter:**

> "Every time you correct the AI, it learns. Every time you express a preference, it remembers. This file grows with you."

Show examples:
```markdown
## Preferences I've Learned
- Always use bullet points, never paragraphs
- Prefer "revenue" over "sales"
- Never schedule meetings before 9am
- Skip the pleasantries, get to the point
```

**Key point:**

> "You're not training a tool. You're building a system that knows you better than your EA."

### Skills Library Introduction (15 min)

**Explain the concept:**

> "A skill is a reusable workflow. Instead of explaining how to write a board update every month, you create a skill once and use it forever."

**Show skill structure:**
```
.claude/skills/
├── board-update/
│   └── SKILL.md (instructions for board updates)
├── competitor-analysis/
│   └── SKILL.md (how to analyze competitors)
└── meeting-prep/
    └── SKILL.md (how to prepare for meetings)
```

**Create first skill together:**

```markdown
# Meeting Prep Skill

When I say "prep me for [meeting]", do this:

1. Look up who I'm meeting with
2. Find recent news about them/their company
3. Check my previous notes on them
4. List 3 talking points I should raise
5. Identify 1 thing I should ask them

Output as bullet points, keep it under 1 page.
```

**Aha moment trigger:**

> "You just created a skill that will work forever. Next week, you say 'prep me for my board meeting' and it knows exactly what to do."

### Block 1 Checkpoint

By end of Block 1, they have:
- [ ] CLAUDE.md with their business context
- [ ] Understanding of the memory/learning system
- [ ] First skill created (meeting prep)
- [ ] Mental model: "AI that knows me vs. generic AI"

---

## Block 2: Deploy Your Agent Fleet (90 min)

### Agent Concept (10 min)

**Reframe from "chatbot" to "agent":**

> "An agent isn't waiting for you to ask questions. It's doing work autonomously. It wakes up at 6am, does its job, and delivers results to you.
>
> You're about to build four agents. By tomorrow morning, one of them will already have done work for you."

**Show the agent fleet:**

| Agent | Trigger | Deliverable |
|-------|---------|-------------|
| Daily CEO Briefing | 7am every day | Morning email with your day |
| Competitive Intelligence | Sunday 6pm | Weekly competitor digest |
| Board Prep Agent | On demand | Deck outline + talking points |
| Email Ghostwriter | VIP email arrives | Draft response in your voice |

### Agent 1: Daily CEO Briefing (25 min)

**This is the hero agent. Most time spent here.**

**What it does:**

> "Every morning at 7am, before you've had coffee, this agent has already:
> - Reviewed your calendar and added context about who you're meeting
> - Scanned industry news relevant to your business
> - Compiled action items from yesterday
> - Pulled your key metrics
> - Packaged it all into one email"

**Build it:**

Create the skill:
```markdown
# Daily CEO Briefing

Every morning, generate a briefing email with:

## Today's Schedule
- List each meeting
- For each person: who they are, why we're meeting, last interaction
- Flag any prep needed

## Industry Pulse
- Top 3 news items relevant to [industry]
- Any mentions of [company] or [competitors]

## Yesterday's Loose Ends
- Action items I committed to but haven't completed
- Emails I haven't responded to (VIPs only)

## Key Metrics (if available)
- [metric 1]: current vs. target
- [metric 2]: current vs. target

## One Thing to Consider
- One strategic thought or reminder

Keep it under 2 pages. Use bullet points. No fluff.
```

**Show n8n scheduling:**
- Trigger: Schedule (7am daily)
- Action: Run the briefing prompt
- Action: Send email to CEO

**Aha moment trigger:**

> "Tomorrow morning, you'll wake up to this. You built it yourself. It works forever."

### Agent 2: Competitive Intelligence (20 min)

**What it does:**

> "Every Sunday evening, this agent scouts your competitors:
> - New job postings (are they hiring AI engineers? expanding?)
> - News mentions (funding, launches, problems)
> - Website changes (new products, pricing updates)
> - LinkedIn activity (what are their execs talking about?)
>
> You get a one-page digest with what matters."

**Build the skill:**
```markdown
# Competitive Intelligence Report

For each competitor in my list:

## [Competitor Name]
**What's New:**
- Recent news/PR (last 7 days)
- Notable job postings (especially leadership or new capabilities)
- Any mentions in industry publications

**What It Means:**
- One sentence interpretation: threat/opportunity/neutral

## Summary
- Biggest move this week across all competitors
- One thing I should ask my team about

Competitors to track: [list from their CLAUDE.md]
```

**Show n8n workflow:**
- Trigger: Schedule (Sunday 6pm)
- Actions: Web scrape, AI summarize, email delivery

**Seed the team training:**

> "Imagine your strategy team had this running on 20 competitors, not just 3."

### Agent 3: Board Prep Agent (20 min)

**What it does:**

> "Board prep is painful. You spend hours gathering data, writing the narrative, making slides. This agent does the first 80%.
>
> You dump your notes, financials, updates. It returns a structured outline with talking points."

**Build the skill:**
```markdown
# Board Prep Agent

Take my raw inputs and create:

## Recommended Deck Structure
1. [Section]: Key message, supporting points
2. [Section]: Key message, supporting points
(Continue for 6-8 sections typical board deck)

## For Each Section
- Headline (what you want them to remember)
- 3 bullet points maximum
- One chart/visual suggestion
- Potential board question + prepared answer

## Appendix Recommendations
- What backup data to have ready
- Which slides can go to appendix if time is short

## Talking Points
- Opening statement (2 sentences)
- Key narrative thread
- Closing ask/message

Output as structured text I can paste into slides.
```

**Demo flow:**
1. CEO dumps messy notes into prompt
2. AI returns structured outline
3. CEO refines and hands to EA for slides

**Aha moment trigger:**

> "Your next board meeting prep just went from 6 hours to 1 hour."

### Agent 4: Email Ghostwriter (15 min)

**What it does:**

> "When an important email comes in, this agent drafts a response in your voice. You review, edit, send. Never stare at a blank compose window again."

**Build the skill:**
```markdown
# Email Ghostwriter

When drafting email responses for me:

## My Email Style
- Length: [short/medium - they specify]
- Tone: [direct/warm/formal]
- Signature: [how they sign off]
- Never use: [phrases they hate]
- Always: [habits they have]

## Response Framework
1. Acknowledge their message (one sentence)
2. Address their main point
3. Clear next step or ask
4. Sign off

## For Different Situations
- Good news: [their style]
- Bad news: [their style]
- Requests: [their style]
- Declines: [their style]
```

**Personalize during the session:**
- Ask how they write emails
- Ask for examples of emails they liked writing
- Capture their voice

**Show n8n potential:**
- Trigger: New email from VIP list
- Action: AI drafts response
- Action: Save to drafts folder for review

### Block 2 Checkpoint

By end of Block 2, they have:
- [ ] 4 agent skills created
- [ ] Daily Briefing scheduled (will run tomorrow)
- [ ] Understanding of autonomous AI
- [ ] Excitement about what's running while they sleep

---

## Break (10 min)

Let them breathe. They've built a lot.

Check in: "What's surprised you so far?"

---

## Block 3: Automation Power (75 min)

### n8n Introduction (10 min)

**Frame it:**

> "The agents we built are smart, but they're isolated. n8n connects everything.
>
> When a Zoom meeting ends → AI summarizes → Slack notifies your team.
> When an email arrives → AI categorizes → draft appears in your inbox.
>
> This is where your Command Center becomes a machine."

**Quick n8n tour:**
- Nodes = actions
- Connections = triggers
- Workflows = automated sequences

### Workflow 1: Zoom → Slack Briefing (20 min)

**What it does:**

> "Your meeting ends. Before you've closed Zoom, a summary is already in Slack with action items. Your team knows what was decided without you saying a word."

**Build it:**
```
Trigger: Zoom recording available
    ↓
Get transcript from Zoom API
    ↓
AI Node: Summarize meeting
    Prompt: "Summarize this meeting transcript:
    - Key decisions made
    - Action items (who, what, when)
    - Open questions
    - Next steps
    Keep under 10 bullet points."
    ↓
Slack: Post to #meeting-summaries channel
    ↓
Optional: Create tasks in Asana/Notion
```

**Build together:**
1. Connect Zoom account
2. Set up trigger
3. Add AI summarization node
4. Connect Slack
5. Test with a sample meeting

**Aha moment:**

> "Every meeting you have from now on is automatically documented."

### Workflow 2: Email Triage (20 min)

**What it does:**

> "New email from a VIP arrives. AI reads it, categorizes urgency, drafts a response, and you just... approve."

**Build it:**
```
Trigger: New email in inbox
    ↓
Filter: Is sender in VIP list?
    ↓
AI Node: Analyze email
    Prompt: "Categorize this email:
    - Urgency: 🔴 Urgent / 🟡 Important / 🟢 FYI
    - Topic: [what's it about]
    - Action needed: [what they want]
    - Draft response: [2-3 sentences in my style]"
    ↓
Save to "Drafts for Review" folder
    ↓
Slack notification: "New VIP email needs response"
```

**Build together:**
1. Connect email (Gmail/Outlook)
2. Create VIP filter
3. Add AI analysis node
4. Set up draft saving
5. Add notification

### Workflow 3: Daily News Digest (15 min)

**What it does:**

> "Every morning at 6am, before your briefing agent runs, this workflow has already scanned industry news and competitor mentions. The briefing agent uses this as input."

**Build it:**
```
Trigger: Schedule (6:00 AM)
    ↓
HTTP Request: Get news from [industry RSS/news API]
    ↓
HTTP Request: Google News search for [company] and [competitors]
    ↓
AI Node: Summarize relevant news
    Prompt: "From these news items, extract:
    - Top 3 relevant to [industry]
    - Any mentions of [company]
    - Any mentions of [competitors]
    - One headline I should know about
    Format for quick scanning."
    ↓
Save to database/Notion
    ↓
(Briefing agent picks this up at 7am)
```

### Workflow 4: Document Analyzer (10 min)

**What it does:**

> "Drop a document in a folder. AI reads it, extracts key points, and adds to your searchable knowledge base."

**Build it:**
```
Trigger: File added to "To Analyze" folder (Dropbox/Google Drive)
    ↓
Extract text from document
    ↓
AI Node: Analyze document
    Prompt: "Extract from this document:
    - One sentence summary
    - Key points (max 5)
    - Action items if any
    - Related to: [project/topic]"
    ↓
Save to Notion/Airtable database
    ↓
Slack notification: "New document analyzed"
```

### Block 3 Checkpoint

By end of Block 3, they have:
- [ ] 4 working n8n workflows
- [ ] Zoom meetings auto-summarizing
- [ ] Email triage running
- [ ] News digest scheduled
- [ ] Documents auto-analyzing

**Seed the team training:**

> "You just built 4 workflows. Your operations team could build 40 of these for different processes across the company."

---

## Break (10 min)

This is where the magnitude hits them.

Check in: "You now have AI agents and automations running. How does that feel?"

---

## Block 4: Build Your Dashboard (60 min)

> See full facilitator guide: [materials/block-4-dashboard.md](materials/block-4-dashboard.md)

### Overview

**Frame the block:**

> "You've built AI agents. You've built automations. Now let's build your cockpit — a single screen where everything lives."

| Part | Duration | What They Build |
|------|----------|-----------------|
| Project Setup | 10 min | SvelteKit + SQLite |
| Today's Focus | 10 min | 3 daily priorities |
| AI Prompts Library | 10 min | One-click access to skills |
| Decision Log | 10 min | Track major decisions |
| Quick Capture | 10 min | Scratchpad for ideas |
| Assemble | 5 min | Full dashboard |
| Close | 5 min | Show database file |

**Tech:** SvelteKit + SQLite (runs locally, no login needed)

**What they walk away with:**
- Working dashboard on their laptop
- `dashboard.db` file they can see/backup
- 4 functional modules

### Key Aha Moments

1. "You just created 5 database tables with one file"
2. "One click copies your prompt — open Claude, paste, done"
3. "That database file? That's your entire database. Back it up, copy it, it's yours"
4. "You just built a real application in an hour"

### Block 4 Checkpoint

By end of Block 4, they have:
- [ ] Working SvelteKit + SQLite dashboard
- [ ] 4 functional modules (Focus, Prompts, Decisions, Capture)
- [ ] Understanding of how apps work (database → UI)
- [ ] A tool they'll actually use daily

---

## Break (10 min)

They just built an app. Let that sink in.

Check in: "You now have a personal dashboard. How does that feel?"

---

## Block 5: Map to Your Business (30 min)

### The AI Opportunity Audit (15 min)

**Facilitate discovery:**

> "Let's look at your business through an AI lens. Where are the opportunities?"

**Use this framework:**

| Category | Question | Examples |
|----------|----------|----------|
| **Repetitive** | What do you/your team do repeatedly? | Reports, updates, emails, scheduling |
| **Data-heavy** | What involves processing lots of information? | Research, analysis, summarization |
| **Time-sensitive** | What needs quick turnaround? | Customer responses, approvals, alerts |
| **Error-prone** | What goes wrong due to human oversight? | Follow-ups, handoffs, compliance |
| **High-volume** | What scales linearly with growth? | Customer support, onboarding, invoicing |

**Walk through each category:**
- Ask questions
- Write down every opportunity they mention
- Aim for 15-20 items

### Prioritization (15 min)

**Score each opportunity:**

| Criteria | Question |
|----------|----------|
| **Impact** | How much time/money would this save? (1-5) |
| **Feasibility** | How easy with tools we learned today? (1-5) |
| **Excitement** | How energized are you about this? (1-5) |

**Create their priority list:**
- Quick wins (high feasibility + high impact): Do this month
- Strategic bets (high impact + lower feasibility): Plan for Q2
- Nice to have: Backlog

### Role-Specific Opportunities (15 min)

**Plant seeds for team training:**

| Role | They Would Love | Example |
|------|-----------------|---------|
| **CFO** | Financial report summarizer, invoice processor, variance analyzer | "Imagine your CFO's month-end just got 2 days shorter" |
| **CMO** | Content generator, social monitor, campaign analyzer | "Your marketing team could produce 3x the content" |
| **COO** | Process automator, vendor manager, operations dashboard | "Every SOP could have an AI assistant" |
| **CHRO** | Resume screener, policy Q&A bot, onboarding automator | "HR could handle 10x the hiring volume" |

**Write down their team members and potential wins for each.**

---

## Block 6: Your Playbook (20 min)

### Document Everything (10 min)

**Create their takeaway doc:**

```markdown
# [Name]'s AI Command Center Playbook

## What You Built Today
- [ ] CLAUDE.md with business memory
- [ ] 4 AI Agents (briefing, intel, board prep, email)
- [ ] 4 Workflows (Zoom, email, news, docs)
- [ ] Personal CEO Dashboard (running locally with SQLite)

## Your Priority Opportunities
1. [Quick win 1]
2. [Quick win 2]
3. [Quick win 3]

## What to Tell Your Team Monday
1. "I built an AI system that [does X]"
2. "I want us to explore [opportunity] for [team]"
3. "Let's schedule a follow-up to train the team"

## Next Steps
- [ ] Check your briefing email tomorrow morning
- [ ] Review first Zoom summary this week
- [ ] Access your student portal: [link]
- [ ] Schedule team training conversation

## Your Portal Access
[Login details]
```

### The Team Conversation (10 min)

**Prepare them to evangelize:**

> "Monday morning, your CTO asks 'how was that AI training?' Here's what you say..."

Script options:
- "I built a system that briefs me every morning before I've had coffee."
- "I have AI agents monitoring our competitors 24/7 now."
- "My Zoom meetings are automatically summarized to Slack."
- "I want you to look at [specific opportunity] for your team."

### Close + Upsell Plant (10 min)

**Summarize the transformation:**

> "This morning you were using AI like everyone else — one-off questions, no memory, no system.
>
> Now you have:
> - An AI that knows your business
> - Agents working while you sleep
> - Automations connecting your tools
> - A framework to find more opportunities
>
> This is your Command Center. It grows with you."

**Plant the team training:**

> "Many CEOs find so much value in this that they bring their leadership team through together. When you're ready, I'll send you the team package details.
>
> For now, go home, get some sleep, and tomorrow morning... check your briefing email."

---

## Facilitator Notes

### Common Sticking Points

| Problem | Solution |
|---------|----------|
| "This is too technical" | Focus on outcomes, minimize tool mechanics |
| "I won't remember this" | Emphasize: it's all in your portal, plus AI remembers for you |
| "My IT team needs to approve" | Frame as personal productivity tool, not IT project |
| "What about security?" | Discuss data handling, offer enterprise options |

### Aha Moment Triggers

- First time AI uses their CLAUDE.md context
- When they see the briefing email preview
- When Zoom summary appears in Slack
- When they realize this runs without them
- When they see their database file and realize "that's my entire database"
- When the dashboard is running and they think "I built this"

### Team Training Hook

Best moments to mention:
- Block 2: "Your whole leadership team could have these agents"
- Block 3: "Your ops team could build 40 workflows"
- Block 4: "Your team could each have their own dashboard"
- Block 5: "I see CFO, CMO, COO opportunities here"
- Block 6: "Want me to send you the team package?"

---

## Materials Checklist

- [ ] CLAUDE.md template
- [ ] Skill templates (all 4 agents)
- [ ] n8n workflow exports
- [ ] Dashboard component code snippets
- [ ] DB Browser for SQLite installed
- [ ] CEO AI Playbook template
- [ ] Quick reference cheatsheet
- [ ] Portal access setup
