---
name: last
description: Retrieve the last session context and continue from where we left off. Use when starting a new conversation to instantly pick up previous work. Triggers on "/last" or "continue from last session".
---

# Last Session Resume

Retrieves the most recent session log and loads full context so we can continue seamlessly.

## TRIGGER

- `/last`
- "continue from last session"
- "where were we"
- "pick up from last time"

## WORKFLOW

### Step 1: Find Most Recent Session

```bash
ls -t /sessions/*.md | grep -v index.md | grep -v current.md | head -1
```

Get the most recent session file (by modification time, excluding index and current).

### Step 2: Read Session Context

Read in this order:

1. **Most recent session file** (`sessions/YYYY-MM-DD-topic.md`)
   - TL;DR, accomplishments, open threads, decisions

2. **Session index** (`sessions/index.md`)
   - Overview of recent sessions

3. **Relevant topic files** based on session content:
   - `sessions/by-topic/pricing-decisions.md`
   - `sessions/by-topic/product-strategy.md`
   - `sessions/by-topic/marketing-sales.md`
   - `sessions/by-topic/technical-decisions.md`

4. **Business context** (`/.claude/memory/business-context.md`)
   - Current state of the business

5. **Learnings** (`/.claude/memory/learnings.md`)
   - User preferences and patterns

### Step 3: Summarize & Offer Continuation

Output format:

```
## Last Session: [DATE] - [TOPIC]

**Summary:** [TL;DR from session file]

**We accomplished:**
- [Item 1]
- [Item 2]

**Open threads:**
- [ ] [Thread 1]
- [ ] [Thread 2]

**Key decisions still in play:**
- [Decision 1]
- [Decision 2]

---

Ready to continue. What would you like to pick up?
```

### Step 4: Be Ready to Continue

After presenting the summary:
- Be ready to work on any open thread
- Remember all decisions made
- Don't re-ask questions that were already answered
- Treat this as a continuation, not a new conversation

## EXAMPLE

**User:** `/last`

**Claude:**
```
## Last Session: 2025-01-10 - Business Planning

**Summary:** Comprehensive business planning for code:zero. Built intelligence system,
set pricing (RM 9,800 consumer / RM 38,000 enterprise), created sales materials.

**We accomplished:**
- Created think-harder intelligence system
- Set 4-week Ship Sprint at RM 9,800
- Set 3-day Enterprise Sprint at RM 38,000
- Created enterprise one-pager and taster outline
- Built session logging system

**Open threads:**
- [ ] Fill in instructor bios
- [ ] Register for HRDF
- [ ] Build n8n demo for taster sessions
- [ ] Create consumer landing page
- [ ] Decide on tech stack (SvelteKit vs Next.js)

**Key decisions still in play:**
- Consumer: 4 weeks, RM 9,800, "Ship Sprint" positioning
- Enterprise: 3 days, RM 38,000, HRDF claimable
- Strategy: Consumer first, Enterprise once proof exists

---

Ready to continue. What would you like to pick up?
```

## RULES

1. **Always read the full session file** - Don't summarize from memory
2. **Check for current.md first** - If it exists, session was interrupted
3. **Load topic files relevant to open threads** - Be prepared to continue any thread
4. **Don't re-explain decisions** - Treat as continuation, user knows the context
5. **Offer to continue, don't assume** - Let user pick what to work on

## HANDLING INTERRUPTED SESSIONS

If `sessions/current.md` exists:
- This means the last session was interrupted (window closed without `/close`)
- Read `current.md` instead of looking for dated files
- Mention: "Looks like our last session was interrupted. Here's where we were..."

## SESSION LEARNINGS

### Workflow

### Output Rules

### Avoid
