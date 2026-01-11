# Email Ghostwriter

> Draft responses in your voice so you never stare at a blank compose window again.

---

## When to Use

**Trigger phrases:**
- "draft response to [this email]"
- "write email to [person] about [topic]"
- "ghostwrite: [context]"

**Automated trigger:** n8n can draft responses when VIP emails arrive

---

## What It Does

Drafts email responses that sound like you:
1. Matches your length preference
2. Uses your tone and vocabulary
3. Follows your typical email structure
4. Avoids words/phrases you hate
5. Includes your signature style

---

## The Prompt

```
Draft an email response for me.

## The Email I'm Responding To

[PASTE ORIGINAL EMAIL HERE]

---

## My Email Style

**Length:** [SHORT: 2-4 sentences | MEDIUM: 1-2 paragraphs | DETAILED: As needed]

**Tone:** [DIRECT: Get to the point | WARM: Personal touch | FORMAL: Professional distance]

**Structure:**
1. [How you typically open]
2. [How you address the main point]
3. [How you close/call to action]

**Always:**
- [Habit 1, e.g., "End with a clear next step"]
- [Habit 2, e.g., "Keep paragraphs under 3 sentences"]

**Never:**
- [Thing to avoid, e.g., "Use 'best' as a sign-off"]
- [Thing to avoid, e.g., "Write 'hope this helps'"]

**Sign-off:** [Your typical signature, e.g., "- J" or "Thanks, John"]

---

## Context About This Email

- **Relationship:** [Who is this person to you?]
- **Desired outcome:** [What do you want to happen?]
- **Tone adjustment:** [Any special considerations?]

---

## Generate

Draft a response that sounds like me. Make it ready to send with minimal editing.
```

---

## Style Configuration

**Before first use, define your email DNA:**

### Length Preferences

| Situation | Your Preference |
|-----------|-----------------|
| Quick acknowledgment | [1-2 sentences] |
| Answering a question | [2-3 sentences with answer] |
| Giving feedback | [Bullet points] |
| Declining something | [3 sentences max] |
| Good news | [Length + enthusiasm level] |
| Bad news | [How you deliver tough messages] |

### Tone by Relationship

| Relationship | Tone | Example |
|--------------|------|---------|
| Board members | [e.g., Respectful but confident] | |
| Direct reports | [e.g., Direct and supportive] | |
| Clients | [e.g., Warm and professional] | |
| Vendors | [e.g., Friendly but businesslike] | |
| Cold outreach | [e.g., Ignore / Brief decline] | |

### Your Vocabulary

**Words you use:**
- [Your go-to words]
- [Industry terms you like]
- [Phrases that are "you"]

**Words you hate:**
- [Words that make you cringe]
- [Jargon you avoid]
- [Clichés to never use]

---

## Sample Output

**Original email:**
```
From: Jennifer Wu (Acme Corp CEO)
Subject: Follow-up from our call

Hi John,

Great speaking with you yesterday. The team was impressed with the demo.

A few questions came up after:
1. Can we get a pilot program set up for Q1?
2. What's the timeline for enterprise features you mentioned?
3. Any flexibility on pricing for a multi-year deal?

Would love to move quickly on this. Let me know next steps.

Best,
Jennifer
```

**Ghostwritten response:**
```
Jennifer,

Good timing - I was about to reach out.

On your questions:

1. **Pilot** - Absolutely. Let's target Feb 1 start. I'll have Tom send
   over a pilot proposal by end of week.

2. **Enterprise features** - Core ones ship in March. Full suite by June.
   Happy to share the roadmap under NDA if helpful.

3. **Pricing** - Yes, flexibility exists for multi-year. Let's discuss
   specifics once we scope the pilot.

What works for a 30-min call this week to nail down the pilot terms?
I'm open Thursday afternoon.

- J
```

---

## n8n Automation

**For automatic drafting:**

1. **Trigger:** New email from VIP list
2. **Filter:** Is sender in VIP list? (CEO, board, key clients)
3. **AI Node:** Generate draft using this skill
4. **Action:** Save to Drafts folder
5. **Notification:** Slack alert "Draft ready for [sender]"

**VIP List Example:**
- Board members (all)
- Key clients (top 10)
- Investors (active)
- Direct reports (all)

See: `n8n-email-triage.json` workflow export

---

## Tips for Best Results

- **Provide relationship context** - tone changes by who you're emailing
- **State desired outcome** - "I want them to agree to a meeting"
- **Flag urgency** - "This is time-sensitive" vs "No rush"
- **Review first 10 drafts carefully** - teach AI your voice through edits
- **Update style notes** - when you correct a draft, add the preference to your style config
