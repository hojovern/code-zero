# Competitive Intelligence Agent

> Your AI scouts competitors weekly so you're never caught off guard.

---

## When to Use

**Trigger phrases:**
- "competitor update"
- "what are competitors doing"
- "competitive intel"

**Automated trigger:** Every Sunday at 6:00 PM via n8n

---

## What It Does

Generates a weekly competitive intelligence digest:
1. News and press releases from each competitor
2. Notable hiring activity and job postings
3. Product/pricing changes detected
4. Executive LinkedIn activity
5. Your strategic interpretation

---

## The Prompt

```
Generate Competitive Intelligence Report for week of [DATE].

For each competitor in my list, research and report:

## [COMPETITOR 1]

**News & PR (Last 7 Days)**
- [Headline 1]: [One sentence summary]
- [Headline 2]: [One sentence summary]
- No news this week (if applicable)

**Hiring Signals**
- Notable job postings (leadership, new capabilities, expansion)
- What these roles might indicate about their strategy

**Product/Pricing**
- Any changes to product, features, or pricing
- New releases or announcements

**Executive Activity**
- Notable LinkedIn posts or interviews
- Conference appearances

**What It Means**
One sentence: Is this a threat, opportunity, or neutral?

---

Repeat for each competitor.

## Weekly Summary

**Biggest Move**: The most significant competitor action this week
**Watch This**: One emerging trend across competitors
**Ask Your Team**: One question to raise Monday morning

---

**Competitors to track:**
1. [COMPETITOR 1]
2. [COMPETITOR 2]
3. [COMPETITOR 3]
4. [COMPETITOR 4]
5. [COMPETITOR 5]

**Format:** Keep each competitor section under 200 words. Focus on signal, not noise.
```

---

## Customization Points

**Before first use, personalize:**

1. **Competitor list**: Your 3-7 direct competitors
2. **Industry keywords**: What news to surface
3. **Hiring signals**: What roles matter (AI engineers? Sales? Enterprise?)
4. **Frequency**: Weekly default, can be daily for fast-moving markets

---

## Sample Output

```
# Competitive Intelligence Report
Week of January 6-12, 2025

---

## Acme Software

**News & PR**
- "Acme Raises $50M Series C" (TechCrunch, Jan 8)
  Expanding enterprise sales team, targeting Fortune 500
- "Acme Partners with AWS" (PR Newswire, Jan 10)
  Native AWS Marketplace integration announced

**Hiring Signals**
- Posted: VP of Enterprise Sales (NYC)
- Posted: 3x Solutions Engineers
- Signal: Serious enterprise push coming

**Product/Pricing**
- No changes detected

**Executive Activity**
- CEO posted about "2025 being the year of enterprise AI"
- CTO speaking at AWS re:Invent

**What It Means**
THREAT: They're well-funded and pivoting to our enterprise segment. Expect them competing on our larger deals within 90 days.

---

## TechRival Inc

**News & PR**
- No significant news this week

**Hiring Signals**
- Posted: VP of Customer Success
- Signal: Likely retention issues, investing in CS

**Product/Pricing**
- Quietly removed their free tier (spotted Jan 9)
- Enterprise pricing increased ~20%

**Executive Activity**
- CFO absent from LinkedIn (unusual)

**What It Means**
NEUTRAL/OPPORTUNITY: Signs of financial pressure. Their customers may be looking for alternatives.

---

## StartupZ

**News & PR**
- "StartupZ Acquires DataBot" (Jan 11)
  Small acqui-hire, 3 AI engineers

**Hiring Signals**
- Heavy AI/ML hiring across the board
- Posted: Chief AI Officer (new role)

**Product/Pricing**
- Beta launched: AI-powered analytics feature

**Executive Activity**
- Founder doing podcast circuit about AI

**What It Means**
WATCH: They're building AI capabilities fast. Feature could compete with our roadmap item.

---

## Weekly Summary

**Biggest Move**: Acme's $50M raise and enterprise pivot

**Watch This**: Multiple competitors adding AI features. This is becoming table stakes.

**Ask Your Team**: "Should we accelerate our AI analytics feature given StartupZ's beta?"

---
*Sources: Google News, LinkedIn, Job boards, Company websites*
*Generated: Sunday, January 12, 2025, 6:00 PM*
```

---

## n8n Automation

**To run automatically:**

1. Schedule trigger: Sunday 6:00 PM
2. Web search nodes for each competitor
3. Job board scraping (optional)
4. AI node to synthesize findings
5. Email delivery

See: `n8n-competitive-intel.json` workflow export

---

## Tips for Best Results

- **Limit to 5-7 competitors** - more creates noise
- **Update list quarterly** - competitors change
- **Add industry keywords** relevant to your positioning
- **Review with your strategy team** - often triggers useful discussions
- **Archive reports** - patterns emerge over time
