# n8n Workflow: Daily News Digest

> Wake up to a curated industry news summary, ready before your coffee.

---

## What It Does

```
6:00 AM → Scan news sources → AI filters relevance → Summary ready → Feeds into morning briefing
```

**Output:** Top industry news, competitor mentions, and company alerts.

---

## The Workflow

```
┌─────────────────────────┐
│  1. Schedule Trigger    │
│  Every day at 6:00 AM   │
└───────────┬─────────────┘
            │
            ├────────────────────────┐
            ▼                        ▼
┌─────────────────────┐  ┌─────────────────────┐
│  2a. Industry News  │  │  2b. Company Search │
│  RSS feeds / APIs   │  │  Google News API    │
└─────────┬───────────┘  └─────────┬───────────┘
            │                        │
            └────────────┬───────────┘
                         │
                         ▼
            ┌─────────────────────────┐
            │  3. AI Summarize        │
            │  Filter & prioritize    │
            └───────────┬─────────────┘
                        │
                        ▼
            ┌─────────────────────────┐
            │  4. Save to Database    │
            │  Notion / Airtable      │
            └───────────┬─────────────┘
                        │
                        ▼
            ┌─────────────────────────┐
            │  5. (Optional) Email    │
            │  Send digest directly   │
            └─────────────────────────┘
```

---

## Node Configuration

### Node 1: Schedule Trigger

**Type:** Cron node

**Schedule:** `0 6 * * *` (6:00 AM daily)

**Timezone:** Your local timezone

---

### Node 2a: Industry News

**Type:** RSS Feed Read node (or HTTP Request)

**Sources to add:**
```
# Tech Industry Example
https://techcrunch.com/feed/
https://feeds.feedburner.com/TheHackersNews
https://www.wired.com/feed/rss

# Business/Finance Example
https://feeds.bloomberg.com/markets/news.rss
https://rss.nytimes.com/services/xml/rss/nyt/Business.xml

# Add industry-specific RSS feeds here
```

**Items:** Last 24 hours only

---

### Node 2b: Company/Competitor Search

**Type:** HTTP Request

**Google News API call:**
```
URL: https://newsapi.org/v2/everything
Parameters:
  - q: "[Company Name]" OR "[Competitor 1]" OR "[Competitor 2]"
  - from: {{yesterday_date}}
  - to: {{today_date}}
  - sortBy: relevancy
  - apiKey: {{newsapi_key}}
```

**Alternative: Google Custom Search API**

---

### Node 3: AI Summarize

**Type:** OpenAI / Claude node

**Prompt:**
```
You are my news analyst. Review these news items and create my morning digest.

**Industry News:**
{{industry_news_items}}

**Company/Competitor Mentions:**
{{company_search_results}}

---

Create a digest with:

## Industry Pulse

**Top 3 Stories:**
1. [Headline] - [One sentence why it matters to my business]
2. [Headline] - [One sentence why it matters to my business]
3. [Headline] - [One sentence why it matters to my business]

## Company Mentions
- [Any mentions of {{company_name}}]
- "No mentions" if none

## Competitor Watch
For each competitor mentioned:
- **[Competitor]:** [What happened] - [Threat/Opportunity/Neutral]

## One Thing to Know
The single most important news item I should be aware of today.

---

**My Industry:** {{industry}}
**My Company:** {{company_name}}
**My Competitors:** {{competitor_list}}

**Rules:**
- Skip news older than 24 hours
- Skip irrelevant/tangential stories
- If nothing significant, say "Quiet news day"
- Keep entire output under 500 words
```

---

### Node 4: Save to Database

**Type:** Notion / Airtable node

**Purpose:** Archive for reference + feeds into morning briefing

**Fields:**
| Field | Value |
|-------|-------|
| Date | Today |
| Industry News | {{ai_summary.industry}} |
| Company Mentions | {{ai_summary.company}} |
| Competitor News | {{ai_summary.competitors}} |
| Top Story | {{ai_summary.one_thing}} |

---

### Node 5 (Optional): Email Digest

**Type:** Gmail / SMTP node

**To:** Your email
**Subject:** Daily News Digest - {{date}}
**Body:** {{full_ai_digest}}

---

## News Sources by Industry

### Technology
```
- TechCrunch (techcrunch.com/feed)
- The Verge (theverge.com/rss/index.xml)
- Wired (wired.com/feed/rss)
- Hacker News (news.ycombinator.com/rss)
- Ars Technica (feeds.arstechnica.com/arstechnica/index)
```

### Finance/Fintech
```
- Bloomberg Markets (bloomberg.com/markets)
- Financial Times (ft.com - requires subscription)
- Finextra (finextra.com/rss)
- American Banker (americanbanker.com/feed)
```

### Healthcare
```
- Fierce Healthcare (fiercehealthcare.com/rss)
- Healthcare IT News (healthcareitnews.com/rss)
- STAT News (statnews.com/feed)
```

### E-commerce/Retail
```
- Retail Dive (retaildive.com/feeds)
- eMarketer (emarketer.com/rss)
- Modern Retail (modernretail.co/feed)
```

### Manufacturing
```
- Industry Week (industryweek.com/rss)
- Manufacturing.net (manufacturing.net/rss)
- Plant Engineering (plantengineering.com/feed)
```

---

## Required Accounts

| Service | What You Need |
|---------|---------------|
| n8n | Cloud or self-hosted |
| News API | newsapi.org key (free tier: 100 req/day) |
| OpenAI/Claude | API key |
| Notion/Airtable | (Optional) For archiving |

---

## Setup Checklist

- [ ] Get NewsAPI key from newsapi.org
- [ ] Identify 5-10 industry RSS feeds
- [ ] Configure company/competitor search terms
- [ ] Connect AI API
- [ ] Set up database for archiving
- [ ] Test with manual trigger
- [ ] Verify 6 AM schedule

---

## Customization Options

**Add sentiment analysis:**
- Flag negative news about your company
- Track competitor sentiment over time

**Expand sources:**
- Twitter/X mentions
- LinkedIn news
- Industry publications
- Analyst reports

**Alert on keywords:**
- Acquisition mentions
- Funding news
- Executive changes
- Product launches

---

## Cost Estimate

| Component | Cost |
|-----------|------|
| n8n Cloud | ~$20/mo |
| NewsAPI | Free (100 req/day) |
| OpenAI API | ~$0.02/day |
| **Total** | ~$21/mo |

---

## Integration with Morning Briefing

This workflow runs at 6 AM and saves results to database.

The Daily CEO Briefing agent (7 AM) pulls from this database to include:
- "Industry Pulse" section
- Competitor mentions
- Top story of the day

**No extra work** - news digest automatically feeds into your briefing.
