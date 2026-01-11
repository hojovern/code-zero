# n8n Workflow: Zoom → Slack Briefing

> Auto-summarize every meeting and post to Slack before you've closed Zoom.

---

## What It Does

```
Meeting ends → Transcript extracted → AI summarizes → Slack receives summary
```

**Time from meeting end to Slack post:** ~2 minutes

---

## The Workflow

```
┌─────────────────────────┐
│  1. Zoom Trigger        │
│  "Recording Available"  │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  2. Get Recording       │
│  Zoom API call          │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  3. Extract Transcript  │
│  Download .vtt file     │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  4. AI Summarize        │
│  Claude/OpenAI node     │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  5. Post to Slack       │
│  #meeting-summaries     │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  6. (Optional) Tasks    │
│  Create in Asana/Notion │
└─────────────────────────┘
```

---

## Node Configuration

### Node 1: Zoom Trigger

**Type:** Webhook (Zoom App)

**Event:** `recording.completed`

**Setup:**
1. Create Zoom App (marketplace.zoom.us)
2. Enable "Recording" event subscription
3. Add webhook URL from n8n
4. Verify with challenge token

---

### Node 2: Get Recording

**Type:** HTTP Request

**Method:** GET

**URL:** `https://api.zoom.us/v2/meetings/{{$node["Zoom Trigger"].json.payload.object.id}}/recordings`

**Authentication:** Zoom OAuth2

---

### Node 3: Extract Transcript

**Type:** HTTP Request

**Method:** GET

**URL:** `{{transcript_download_url}}` (from recording response)

**Headers:**
- Authorization: Bearer {{zoom_access_token}}

**Processing:** Parse VTT to plain text

---

### Node 4: AI Summarize

**Type:** OpenAI / Claude node

**Prompt:**
```
Summarize this meeting transcript:

"""
{{transcript_text}}
"""

Output format:

## Meeting Summary
**Date:** [date]
**Duration:** [duration]
**Attendees:** [list]

### Key Decisions
- [Decision 1]
- [Decision 2]

### Action Items
- [ ] [Task] - Owner: [Name] - Due: [Date]
- [ ] [Task] - Owner: [Name] - Due: [Date]

### Open Questions
- [Question needing follow-up]

### Next Steps
- [What happens next]

Keep it under 10 bullet points total. Be specific about owners and dates.
```

---

### Node 5: Post to Slack

**Type:** Slack node

**Channel:** `#meeting-summaries` (or configured channel)

**Message format:**
```
:memo: *Meeting Summary*

*{{meeting_topic}}*
{{summary_from_ai}}

_Auto-generated from Zoom recording_
```

---

### Node 6 (Optional): Create Tasks

**Type:** Notion / Asana node

**Action:** Create task for each action item

**Fields:**
- Title: [Action item text]
- Assignee: [Owner]
- Due date: [Date]
- Project: Meetings

---

## Required Accounts

| Service | What You Need |
|---------|---------------|
| Zoom | Business/Enterprise (recording access) |
| n8n | Cloud or self-hosted |
| Slack | Workspace with bot permissions |
| OpenAI/Claude | API key |
| Notion/Asana | (Optional) API token |

---

## Setup Checklist

- [ ] Create Zoom App at marketplace.zoom.us
- [ ] Enable recording webhooks
- [ ] Add n8n webhook URL to Zoom App
- [ ] Connect Slack workspace to n8n
- [ ] Create #meeting-summaries channel
- [ ] Add AI API credentials to n8n
- [ ] Test with a sample meeting
- [ ] (Optional) Connect task manager

---

## Common Issues

| Problem | Solution |
|---------|----------|
| No transcript available | Ensure "Audio transcript" is enabled in Zoom settings |
| Webhook not firing | Check Zoom App event subscriptions |
| Summary too long | Adjust prompt to be more concise |
| Wrong Slack channel | Verify channel ID in Slack node |
| AI timeout | Chunk long transcripts |

---

## Customization Options

**Route by meeting type:**
- Client meetings → #client-summaries
- Internal meetings → #team-summaries
- 1:1s → DM to manager

**Add participants:**
- Tag attendees in Slack message
- Send individual follow-ups

**Extend with:**
- Email summary to external attendees
- Update CRM with meeting notes
- Trigger follow-up reminders

---

## Cost Estimate

| Component | Cost |
|-----------|------|
| n8n Cloud | ~$20/mo for this workflow |
| OpenAI API | ~$0.02 per meeting (gpt-3.5-turbo) |
| Slack | Free (within message limits) |
| **Total** | ~$25/mo for unlimited meetings |

---

## Test It

1. Start a Zoom meeting (can be solo)
2. Talk for 2-3 minutes
3. End and save recording
4. Wait for cloud processing (~1-2 min)
5. Check Slack for summary

*If summary doesn't appear within 5 minutes, check n8n execution logs.*
