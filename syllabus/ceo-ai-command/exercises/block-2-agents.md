# Block 2 Exercise: Deploy Your Agent Fleet

> Build four AI agents that work while you sleep.

---

## Exercise 2.1: Daily CEO Briefing Agent (25 min)

### The Goal

Create an agent that delivers a personalized morning briefing every day.

### Part A: Customize the Skill (10 min)

Start with the template and personalize:

```markdown
# Daily CEO Briefing

Every morning, generate a briefing email with:

## Today's Schedule
- List each meeting
- For each person: who they are, why we're meeting
- Flag any prep needed

## Industry Pulse
- Top 3 news items relevant to [YOUR INDUSTRY]
- Any mentions of [YOUR COMPANY]
- Any mentions of [YOUR COMPETITORS]

## Yesterday's Loose Ends
- Action items I haven't completed
- VIP emails awaiting response

## Key Metrics
- [METRIC 1]: current vs. target
- [METRIC 2]: current vs. target

## One Thing to Consider
- One strategic thought for today

---
Keep under 2 pages. Bullet points. No fluff.
```

**Fill in:**
- [ ] Your industry
- [ ] Your company name
- [ ] Your 3-5 competitors
- [ ] Your 2-4 key metrics

### Part B: Test It (10 min)

Run the briefing manually:

```
Generate my Daily CEO Briefing for today.
```

**Review:**
- Is the calendar section useful?
- Are the metrics you track included?
- Is the format easy to scan?

**Refine:**
Make three specific improvements:

1. "Add ____________"
2. "Remove ____________"
3. "Change ____________ to ____________"

### Part C: Schedule It (5 min)

With facilitator, set up in n8n:
- Trigger: 7:00 AM daily
- Action: Run briefing prompt
- Action: Email to your inbox

### Checkpoint

- [ ] Briefing includes your actual metrics
- [ ] Competitors are named correctly
- [ ] Format is scannable in 2 minutes
- [ ] Scheduled to run tomorrow morning

---

## Exercise 2.2: Competitive Intelligence Agent (15 min)

### The Goal

Create an agent that scouts competitors every week.

### Part A: Define Your Competitors (5 min)

List 3-5 competitors to track:

| Competitor | Why They Matter | Watch For |
|------------|-----------------|-----------|
| 1. | | |
| 2. | | |
| 3. | | |
| 4. | | |
| 5. | | |

### Part B: Customize the Skill (5 min)

```markdown
# Competitive Intelligence Report

For each competitor, report:

## [Competitor Name]

**News & PR (Last 7 Days)**
- Headlines and one-sentence summaries

**Hiring Signals**
- Notable job postings (leadership, new capabilities)

**What It Means**
- Threat / Opportunity / Neutral

## Summary
- Biggest move this week
- One question to ask my team

---
Competitors: [YOUR LIST]
```

### Part C: Test It (5 min)

```
Generate a competitive intelligence report for this week.
```

**Did it find:**
- [ ] Recent news on at least one competitor?
- [ ] Any job postings?
- [ ] A useful "what it means" interpretation?

### Checkpoint

- [ ] All competitors listed correctly
- [ ] Output is actionable, not just data
- [ ] Scheduled for Sunday 6 PM

---

## Exercise 2.3: Board Prep Agent (10 min)

### The Goal

Create an agent that transforms messy notes into board deck outlines.

### Part A: Quick Customization (3 min)

Think about your typical board deck:

**My board decks usually include:**
- [ ] Executive summary
- [ ] Financial performance
- [ ] Key metrics / KPIs
- [ ] Product update
- [ ] Team / org update
- [ ] Strategic priorities
- [ ] Risks and challenges
- [ ] Discussion / asks
- [ ] Other: ____________

### Part B: Test With Real Input (7 min)

Think of something you'll need to present to your board.

Dump messy notes:
```
Here are my rough notes for the board:

[Type or paste real notes - financials, updates, concerns, wins]
```

Then ask:
```
Prepare a board deck outline from these notes.
```

**Review the output:**
- [ ] Structure makes sense?
- [ ] Key points are captured?
- [ ] Anticipated questions are useful?

### Checkpoint

- [ ] Skill produces useful structure
- [ ] Output format works for you
- [ ] You can imagine using this before your next board meeting

---

## Exercise 2.4: Email Ghostwriter Agent (10 min)

### The Goal

Create an agent that drafts emails in your voice.

### Part A: Define Your Email DNA (5 min)

**Length preference:**
- [ ] Short (2-4 sentences)
- [ ] Medium (1-2 paragraphs)
- [ ] It depends (specify when)

**Tone:**
- [ ] Direct and efficient
- [ ] Warm and personal
- [ ] Formal and professional

**Sign-off:**
I typically sign emails: ____________

**Words I use:**
- ____________
- ____________

**Words I never use:**
- ____________
- ____________

### Part B: Test With Real Email (5 min)

Think of an email you need to respond to.

```
Draft a response to this email:

[Paste or describe the email]

From: [Who]
Context: [Your relationship, what you want]
```

**Review:**
- [ ] Sounds like you?
- [ ] Right length?
- [ ] Right tone?

**Refine:**
```
Make it [shorter/more direct/warmer].
I would never say "___", use "___" instead.
```

### Checkpoint

- [ ] AI captures your email voice
- [ ] You would send the draft with minimal edits
- [ ] Preferences are documented

---

## Block 2 Complete!

### What You Built

- [ ] Daily CEO Briefing (running tomorrow 7 AM)
- [ ] Competitive Intelligence (running Sunday 6 PM)
- [ ] Board Prep Agent (ready for next board meeting)
- [ ] Email Ghostwriter (ready for VIP emails)

### What's Different Now

Before: You do all this work manually
After: AI agents do the first 80% while you sleep

### The Mindset Shift

These aren't chatbots waiting for questions.
These are employees with specific jobs, running on schedules.

### Next Up

Block 3: Automation Power — connect everything with n8n workflows.
