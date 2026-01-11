# n8n Workflow: Email Triage

> AI reads VIP emails, categorizes urgency, drafts responses, and notifies you.

---

## What It Does

```
VIP email arrives → AI analyzes → Categorizes urgency → Drafts response → You review
```

**Result:** Never miss an important email. Always have a draft ready.

---

## The Workflow

```
┌─────────────────────────┐
│  1. Email Trigger       │
│  New email in inbox     │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  2. VIP Filter          │
│  Is sender on VIP list? │
└───────────┬─────────────┘
            │ Yes
            ▼
┌─────────────────────────┐
│  3. AI Analysis         │
│  Categorize + draft     │
└───────────┬─────────────┘
            │
            ├──────────────┐
            ▼              ▼
┌──────────────────┐ ┌──────────────────┐
│  4a. Save Draft  │ │  4b. Slack Alert │
│  To drafts folder│ │  Notify CEO      │
└──────────────────┘ └──────────────────┘
```

---

## Node Configuration

### Node 1: Email Trigger

**Type:** Gmail Trigger / Microsoft Outlook Trigger

**Event:** New email received

**Filters:**
- Inbox only (not spam, promotions)
- Unread only

**Polling:** Every 1 minute

---

### Node 2: VIP Filter

**Type:** IF node

**Condition:**
```javascript
// Check if sender is in VIP list
const vipEmails = [
  "board@company.com",
  "ceo@bigclient.com",
  "investor@vc.com",
  // Add your VIPs here
];

const vipDomains = [
  "boardmember.com",
  "importantclient.com",
  // Add VIP domains here
];

const senderEmail = $json.from.toLowerCase();
const senderDomain = senderEmail.split('@')[1];

return vipEmails.includes(senderEmail) ||
       vipDomains.includes(senderDomain);
```

---

### Node 3: AI Analysis

**Type:** OpenAI / Claude node

**Prompt:**
```
Analyze this email and help me respond.

**From:** {{$json.from}}
**Subject:** {{$json.subject}}
**Body:**
"""
{{$json.body}}
"""

---

Provide:

## Analysis

**Urgency:** 🔴 URGENT / 🟡 IMPORTANT / 🟢 FYI
**Category:** [Request / Question / Update / Problem / Opportunity]
**What they want:** [One sentence]
**Deadline:** [If mentioned]

## Draft Response

Write a response in this style:
- Length: Short (2-4 sentences)
- Tone: Direct but warm
- Always end with a clear next step
- Sign off: "- J"

[DRAFT RESPONSE HERE]

## Notes

- Any context I should know
- Suggested follow-up actions
- Red flags if any
```

---

### Node 4a: Save Draft

**Type:** Gmail / Outlook node

**Action:** Create Draft

**To:** Original sender
**Subject:** Re: {{original_subject}}
**Body:** {{ai_draft_response}}

---

### Node 4b: Slack Alert

**Type:** Slack node

**Channel:** DM to CEO (or #ceo-alerts)

**Message:**
```
:envelope: *VIP Email Alert*

*From:* {{sender_name}}
*Subject:* {{subject}}

*Urgency:* {{urgency_emoji}}
*What they want:* {{one_sentence_summary}}

*Draft ready:* Check your drafts folder

_Reply within: {{suggested_timeframe}}_
```

---

## VIP List Configuration

### By Individual

```javascript
const vipEmails = [
  // Board
  "michael.smith@board.com",
  "sarah.jones@board.com",

  // Key Clients
  "jennifer@acmecorp.com",
  "david@bigclient.com",

  // Investors
  "partner@sequoia.com",

  // Direct Reports
  "cfo@yourcompany.com",
  "coo@yourcompany.com"
];
```

### By Domain

```javascript
const vipDomains = [
  // Board domains
  "boarddomain.com",

  // Key client domains
  "acmecorp.com",
  "bigclient.com",

  // Investor domains
  "sequoia.com",
  "a16z.com"
];
```

---

## Required Accounts

| Service | What You Need |
|---------|---------------|
| Email | Gmail or Microsoft 365 |
| n8n | Cloud or self-hosted |
| Slack | Workspace (for alerts) |
| OpenAI/Claude | API key |

---

## Setup Checklist

- [ ] Connect email account to n8n
- [ ] Configure VIP list (emails + domains)
- [ ] Add AI API credentials
- [ ] Connect Slack for notifications
- [ ] Create drafts folder if needed
- [ ] Test with sample email
- [ ] Adjust urgency criteria

---

## Urgency Criteria

**🔴 URGENT (respond within hours)**
- Contains words: urgent, ASAP, emergency, deadline today
- From: Board chair, major investor
- Subject indicates problem

**🟡 IMPORTANT (respond within 24 hours)**
- Direct question requiring response
- Business decision needed
- From: Key clients, direct reports

**🟢 FYI (respond when convenient)**
- Updates and FYIs
- No action required
- Informational only

---

## Customization Options

**Escalation rules:**
- 🔴 emails → SMS alert
- 🟡 emails → Slack DM
- 🟢 emails → Daily digest

**Route by category:**
- Sales emails → forward to sales team
- Support issues → create ticket
- Meeting requests → check calendar

**Auto-responses:**
- Known VIPs get immediate acknowledgment
- "Got your email, will respond within [timeframe]"

---

## Common Issues

| Problem | Solution |
|---------|----------|
| Too many false positives | Tighten VIP list |
| Missing important emails | Expand VIP domains |
| Draft tone is wrong | Refine AI prompt with examples |
| Duplicate alerts | Add dedup check on message ID |

---

## Privacy Note

- Emails are processed through AI API
- Consider: What emails should NOT go through AI?
- Add exclusion filters for sensitive topics
- Legal, HR, personal matters may need manual handling

---

## Cost Estimate

| Component | Cost |
|-----------|------|
| n8n Cloud | ~$20/mo |
| OpenAI API | ~$0.01 per email analyzed |
| Slack | Free |
| **Total** | ~$25/mo for typical executive volume |
