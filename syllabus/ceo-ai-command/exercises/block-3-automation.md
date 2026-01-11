# Block 3 Exercise: Automation Power

> Connect your AI agents to real workflows with n8n.

---

## Exercise 3.1: Zoom → Slack Briefing (20 min)

### The Goal

Every meeting you have automatically gets summarized and posted to Slack.

### Part A: Connect Zoom (5 min)

With facilitator:

1. **Create Zoom App**
   - Go to marketplace.zoom.us
   - Create new app (OAuth)
   - Enable "Recording" scope

2. **Enable cloud recording**
   - Zoom Settings → Recording
   - Turn on "Automatic recording"
   - Enable "Audio transcript"

3. **Connect to n8n**
   - Add Zoom OAuth credentials
   - Set up webhook trigger

### Part B: Create the Workflow (10 min)

Build in n8n:

```
┌─────────────────┐
│  Zoom Trigger   │
│  Recording done │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Get Transcript │
│  HTTP Request   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  AI Summarize   │
│  OpenAI Node    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Post to Slack  │
│  #meetings      │
└─────────────────┘
```

**AI Prompt:**
```
Summarize this meeting:

[transcript]

Format:
- Key decisions (bullets)
- Action items (who, what, when)
- Open questions
- Next steps

Keep under 10 points total.
```

### Part C: Test It (5 min)

1. Start a short Zoom meeting (solo is fine)
2. Talk for 2-3 minutes about anything
3. End the meeting
4. Wait 2-3 minutes for cloud processing
5. Check Slack for summary

### Checkpoint

- [ ] Zoom connected to n8n
- [ ] Test meeting generated summary
- [ ] Summary appeared in Slack
- [ ] Format is useful

---

## Exercise 3.2: Email Triage Workflow (15 min)

### The Goal

VIP emails get automatically analyzed with draft responses ready.

### Part A: Define Your VIP List (3 min)

Who should trigger this workflow?

**VIP Individuals:**
```
board-member@company.com
key-client@bigcorp.com
investor@vc.com
```

**VIP Domains:**
```
boarddomain.com
importantclient.com
```

### Part B: Build the Workflow (10 min)

```
┌─────────────────┐
│  Email Trigger  │
│  New email      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  VIP Filter     │
│  IF node        │
└────────┬────────┘
         │ Is VIP?
         ▼
┌─────────────────┐
│  AI Analyze     │
│  Categorize +   │
│  Draft response │
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌────────┐ ┌────────┐
│ Save   │ │ Slack  │
│ Draft  │ │ Alert  │
└────────┘ └────────┘
```

**AI Prompt:**
```
Analyze this email:

From: [sender]
Subject: [subject]
Body: [body]

Provide:
1. Urgency: 🔴/🟡/🟢
2. What they want (one sentence)
3. Draft response (2-4 sentences, my style)
```

### Part C: Test It (2 min)

Send yourself a test email from a VIP address (or add your own email to VIP list temporarily).

### Checkpoint

- [ ] VIP list configured
- [ ] Test email triggered workflow
- [ ] Draft appeared in drafts folder
- [ ] Got Slack notification

---

## Exercise 3.3: Daily News Digest (10 min)

### The Goal

Wake up to curated industry news every morning.

### Part A: Choose Your Sources (3 min)

**Industry RSS feeds to monitor:**
```
1. ________________________________
2. ________________________________
3. ________________________________
```

**Search terms for company mentions:**
```
"[Your company name]"
"[Competitor 1]"
"[Competitor 2]"
```

### Part B: Build the Workflow (5 min)

```
┌─────────────────┐
│  Schedule       │
│  6:00 AM daily  │
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌────────┐ ┌────────┐
│  RSS   │ │ News   │
│ Feeds  │ │ Search │
└────┬───┘ └────┬───┘
     │          │
     └────┬─────┘
          ▼
┌─────────────────┐
│  AI Summarize   │
│  Filter noise   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Save to DB     │
│  (Feeds into    │
│   daily brief)  │
└─────────────────┘
```

### Part C: Test It (2 min)

Trigger manually and review output.

### Checkpoint

- [ ] News sources configured
- [ ] Search terms set
- [ ] Output feeds into daily briefing

---

## Exercise 3.4: Document Analyzer (10 min)

### The Goal

Drop documents in a folder → AI extracts key points → builds searchable knowledge base.

### Part A: Create Your Folder (2 min)

In Google Drive or Dropbox:
- Create folder: "To Analyze"
- Note the folder path

### Part B: Build the Workflow (5 min)

```
┌─────────────────┐
│  File Trigger   │
│  New file in    │
│  "To Analyze"   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Extract Text   │
│  PDF/DOCX       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  AI Analyze     │
│  Summarize      │
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌────────┐ ┌────────┐
│ Save   │ │ Notify │
│ to DB  │ │ Slack  │
└────────┘ └────────┘
```

**AI Prompt:**
```
Analyze this document:

[document text]

Provide:
- One paragraph summary
- Key points (max 5)
- Action items if any
- Category: [Contract/Report/Research/Other]
- Tags for searching
```

### Part C: Test It (3 min)

1. Drop a PDF into "To Analyze"
2. Wait for processing
3. Check database/Slack for output

### Checkpoint

- [ ] Folder created and connected
- [ ] Test document processed
- [ ] Summary saved to database
- [ ] Got notification

---

## Block 3 Complete!

### What You Built

| Workflow | Trigger | Output |
|----------|---------|--------|
| Zoom → Slack | Meeting ends | Summary in Slack |
| Email Triage | VIP email | Draft + notification |
| News Digest | 6 AM daily | Curated news |
| Document Analyzer | File uploaded | Searchable summary |

### What's Different Now

Before: AI agents worked in isolation
After: AI is connected to your real tools and workflows

### The Compounding Effect

Every meeting → documented
Every VIP email → pre-drafted
Every morning → industry news ready
Every document → searchable

### Next Up

Block 4: Map to Your Business — find 10+ more AI opportunities.
