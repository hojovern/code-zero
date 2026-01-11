# Daily CEO Briefing

> Your AI Chief of Staff delivers a morning briefing before you've had coffee.

---

## When to Use

**Trigger phrases:**
- "morning briefing"
- "brief me"
- "what's on today"

**Automated trigger:** Every day at 7:00 AM via n8n

---

## What It Does

Generates a comprehensive morning briefing covering:
1. Today's schedule with context about who you're meeting
2. Industry news relevant to your business
3. Outstanding action items and follow-ups
4. Key metrics snapshot
5. One strategic thought to consider

---

## The Prompt

```
Generate my Daily CEO Briefing for [DATE].

## Today's Schedule

For each meeting on my calendar:
- **Time**: [start - end]
- **Meeting**: [title]
- **With**: [attendees]
- **Context**: Who they are, why we're meeting, last interaction
- **Prep needed**: Yes/No - what specifically

Flag any meetings that need preparation I haven't done.

## Industry Pulse

Based on [INDUSTRY] news from the past 24 hours:
- **Top 3 headlines** relevant to my business
- **Company mentions**: Any news about [COMPANY NAME]
- **Competitor activity**: Notable moves from [COMPETITORS]

## Yesterday's Loose Ends

Review my recent activity and surface:
- **Uncommitted commitments**: Things I said I'd do but haven't
- **Unanswered VIPs**: Important emails awaiting response
- **Overdue items**: Deadlines I've passed

## Key Metrics

| Metric | Current | vs. Target | Trend |
|--------|---------|------------|-------|
| [METRIC 1] | X | +/-Y% | up/down |
| [METRIC 2] | X | +/-Y% | up/down |

## One Thing to Consider

One strategic thought, reminder, or opportunity I should be thinking about today.

---

**Format:** Keep under 2 pages. Use bullet points. No fluff. Mobile-readable.
```

---

## Customization Points

**Before first use, personalize:**

1. **Industry**: Replace [INDUSTRY] with your sector
2. **Company name**: Your company for news monitoring
3. **Competitors**: Your 3-5 main competitors
4. **Metrics**: The KPIs you actually track
5. **VIP list**: Who counts as "important" for email flagging

---

## Sample Output

```
# Daily CEO Briefing - January 11, 2025

## Today's Schedule

**9:00 AM - 10:00 AM | Q1 Planning Review**
- With: Sarah (CFO), Mike (COO)
- Context: Finalizing Q1 budget allocations
- Prep: Review finance deck Sarah sent (flagged - not yet opened)

**11:30 AM - 12:00 PM | Investor Call - David Chen**
- With: David Chen (Sequoia Partner)
- Context: Quarterly touch-base, last spoke Nov 15
- Prep: None needed - relationship call

**2:00 PM - 3:00 PM | Product Demo - Acme Corp**
- With: Jennifer Wu (Acme CEO), Tom (our Sales)
- Context: Enterprise deal, $2M ARR potential
- Prep: Review Acme's recent news (acquisition announced this week)

## Industry Pulse

- **Gartner predicts AI spending to hit $297B in 2025** - validates our AI-first positioning
- **Competitor XYZ raised $50M Series C** - expanding into our enterprise segment
- **No mentions of [Company] in past 24 hours**

## Yesterday's Loose Ends

- **Owe board update to Michael** - promised by EOD yesterday
- **Unanswered email from Lisa (key client)** - sent Tuesday, needs response
- **Q4 review slides** - overdue by 2 days

## Key Metrics

| Metric | Current | vs. Target | Trend |
|--------|---------|------------|-------|
| MRR | $1.2M | -5% | stable |
| NPS | 72 | +8 pts | up |

## One Thing to Consider

The Acme deal could set our enterprise pricing precedent. Worth discussing discount limits with Sarah before the demo.

---
*Generated 6:45 AM | Sources: Calendar, Gmail, Industry RSS*
```

---

## n8n Automation

**To run automatically:**

1. Schedule trigger: 7:00 AM daily
2. Pull calendar events (Google/Outlook)
3. Run news search (Google News API)
4. Pull email summary
5. Generate briefing with AI node
6. Send via email

See: `n8n-daily-briefing.json` workflow export

---

## Tips for Best Results

- **Keep CLAUDE.md updated** with current priorities - briefing uses this context
- **Update competitor list** quarterly
- **Adjust metrics** when your focus shifts
- **Review first week's briefings** and refine what's useful vs. noise
