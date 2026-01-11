# Day 9: Automate Everything

> "Your product starts working without you."

## The Challenge

**By end of day, things happen automatically in your product.**

Welcome emails send themselves. Slack gets notified. Data syncs. Reports generate. You build the workflow once, it runs forever.

This is where your product stops being something you operate and starts being something that operates itself.

---

## What You're Building

| Workflow | What It Does |
|----------|--------------|
| Welcome email | New user signup → personalized email |
| Slack notifications | Important events → team alert |
| Weekly digest | Scheduled → email summary to users |
| Data backup | Scheduled → export to Google Sheets |
| Webhook handler | External event → action in your app |

**The unlock:** Your product does work while you sleep.

---

## Schedule

### Morning Block (9:00 - 12:00)

| Time | Activity | Outcome |
|------|----------|---------|
| 9:00 - 9:30 | n8n Introduction | Understand the platform |
| 9:30 - 10:30 | Welcome Email Workflow | First automation working |
| 10:30 - 10:45 | Break | |
| 10:45 - 12:00 | Slack Notifications | Team alerts automated |

### Lunch (12:00 - 13:00)

### Afternoon Block (13:00 - 17:30)

| Time | Activity | Outcome |
|------|----------|---------|
| 13:00 - 13:30 | Standup: Show your workflows | Demo automations |
| 13:30 - 14:30 | Scheduled Workflows | Time-based automation |
| 14:30 - 14:45 | Break | |
| 14:45 - 15:45 | Webhook Integration | Connect external services |
| 15:45 - 16:30 | Your Custom Workflow | Build what you need |
| 16:30 - 17:00 | Error Handling + Monitoring | Production-ready |
| 17:00 - 17:30 | Ship | All workflows live |

---

## Morning: First Automations

### 1. n8n Introduction (30 min)

**What is n8n?**
- Visual workflow automation (like Zapier, but open source)
- Connects services together
- Triggers on events or schedules
- No code required (but can add code)

**Set up n8n:**
1. Go to [n8n.cloud](https://n8n.cloud) and create free account
2. Or self-host (we'll use cloud for simplicity)

**Explore the interface:**
```
You: I just set up n8n. Walk me through the interface.
Explain:
- What are nodes?
- What are triggers vs actions?
- How do workflows execute?
- How do I test workflows?

Give me a mental model for thinking about automation.
```

**Key concepts:**

| Concept | What It Means |
|---------|---------------|
| Workflow | A sequence of automated steps |
| Trigger | What starts the workflow (webhook, schedule, event) |
| Node | One step in the workflow (an action) |
| Execution | One run of the workflow |
| Credentials | Saved auth for external services |

### 2. Welcome Email Workflow (60 min)

**Your first real automation:**

**Step 1: Create webhook in your app**
```
You: Create a webhook endpoint that fires when a new user signs up.

Add to the signup flow:
1. After user created in Supabase Auth
2. After profile created
3. Call webhook with user data: { email, name, signup_date }

Create POST /api/webhooks/new-user that accepts this data
and forwards to an external URL (we'll add n8n URL later).

Also create an admin setting to enable/disable the webhook
and set the webhook URL.
```

**Step 2: Build the n8n workflow**
```
In n8n:
1. Add Webhook trigger node
   - Method: POST
   - Copy the webhook URL

2. Add HTTP Request node (to get more user data if needed)
   - Or use the data from webhook directly

3. Add Email node (use n8n's email or connect SendGrid/Resend)
   - To: {{ $json.email }}
   - Subject: "Welcome to [Product Name]!"
   - Body: Personalized welcome message

4. Test the workflow
   - Click "Listen for test event"
   - Sign up in your app
   - See the workflow execute
   - Check your email
```

**Tell Claude to help with the email template:**
```
You: Write a welcome email template for [my product].

It should:
- Greet user by name
- Explain what they can do now
- Give 3 quick start tips
- Include a CTA to their dashboard
- Match our brand voice

Make it warm and helpful, not corporate.
```

**Step 3: Connect webhook URL to your app**
- Copy the n8n webhook URL
- Add it to your app's webhook settings
- Test end-to-end

**Verify it works:**
1. Sign up with a new account
2. Check n8n execution history
3. Check email inbox
4. Welcome email arrived automatically!

### 3. Slack Notifications (75 min)

**Keep your team informed:**

**Step 1: Set up Slack**
1. Create a Slack workspace (or use existing)
2. Create a channel: `#product-alerts`
3. In n8n, add Slack credentials (OAuth)

**Step 2: Build notification workflow**
```
In n8n:
1. Add Webhook trigger
   - New endpoint for product events

2. Add IF node (router)
   - Check event type from webhook data

3. Add Slack nodes for each event type:
   - New signup: "🎉 New user: {name} just signed up!"
   - New content: "📝 {name} created: {title}"
   - Error: "🚨 Error in production: {message}"

4. Format messages nicely:
   - Use Slack Block Kit for rich formatting
   - Include relevant links
   - Add emoji for visual scanning
```

**Step 3: Add webhooks to your app**
```
You: Create a notification service that sends events to n8n.

Create src/lib/notifications.ts with:
- notifyNewSignup(user)
- notifyNewContent(content)
- notifyError(error)

Each function POSTs to the n8n webhook with event type and data.
Call these at appropriate places in the app.
```

**Test notifications:**
- Sign up → Slack notification
- Create content → Slack notification
- Trigger error → Slack alert

---

## Afternoon: Advanced Automation

### 4. Scheduled Workflows (60 min)

**Time-based automation:**

**Build a weekly digest:**
```
In n8n:
1. Add Schedule trigger
   - Every Monday at 9am

2. Add Supabase node
   - Query: Get all activity from last 7 days
   - Group by user

3. Add Loop node
   - For each user with activity

4. Add AI node (HTTP to Gemini)
   - Summarize user's week in 2-3 sentences

5. Add Email node
   - Send personalized digest to each user
   - Include: activity summary, AI insights, top content
```

**Tell Claude to create the digest template:**
```
You: Create a weekly digest email template.

Include sections for:
- Personal greeting
- "Your week in numbers" (items created, AI tasks, etc.)
- AI-generated insight about their activity
- "What's new" in the product
- One tip to get more value

Make it scannable and valuable, not just noise.
```

**Build a data backup workflow:**
```
In n8n:
1. Add Schedule trigger
   - Daily at 2am

2. Add Supabase node
   - Export tables you want backed up

3. Add Google Sheets node (or Airtable)
   - Append data to backup spreadsheet
   - One sheet per table

4. Add Slack notification
   - "✅ Daily backup complete: X rows exported"

Now you have automatic backups running every night.
```

### 5. Webhook Integration (60 min)

**Connect external services:**

**Receive webhooks from external services:**
```
You: Set up webhook handlers for external services.

Create POST /api/webhooks/[service] endpoints for:
- Stripe: Payment events
- GitHub: Repo events
- Or any service relevant to your product

Each endpoint should:
1. Verify webhook signature (security)
2. Parse the event data
3. Take appropriate action in your app
4. Return 200 OK

Log all webhook events for debugging.
```

**Example: Stripe payment webhook**
```
In n8n (receiving Stripe webhook):
1. Webhook trigger receives Stripe event

2. IF node checks event type:
   - payment_intent.succeeded
   - customer.subscription.created
   - etc.

3. For successful payment:
   - Update user's subscription in Supabase
   - Send confirmation email
   - Notify Slack: "💰 New payment: $X from {email}"

4. For failed payment:
   - Send "payment failed" email
   - Alert team in Slack
```

### 6. Your Custom Workflow (45 min)

**Build something you actually need:**
```
You: I want to automate [specific thing in my product].

Here's what should happen:
- Trigger: [when this happens]
- Action 1: [do this]
- Action 2: [then do this]
- Notification: [tell me/user about it]

Help me design this workflow in n8n.
```

**Ideas based on your product:**
- AI generates weekly content on schedule
- User inactivity → re-engagement email
- High usage → upgrade suggestion
- Error spike → PagerDuty alert
- New feature → announcement to all users

**Build it in n8n, test it, make it live.**

### 7. Error Handling + Monitoring (30 min)

**Make automations production-ready:**
```
You: Add error handling to all my n8n workflows.

For each workflow:
1. Add Error Trigger node
   - Catches any failure in the workflow

2. On error:
   - Send Slack alert with error details
   - Log to error tracking (Supabase table)
   - Retry if appropriate (network errors)

3. Add execution logging:
   - Track every execution
   - Success/failure status
   - Duration

Also show me how to monitor workflows in n8n dashboard.
```

**Create automation dashboard in your app:**
```
You: Create an /admin/automations page that shows:

1. List of all active workflows
   - Name, trigger type, last run, status

2. Recent executions
   - Workflow name, time, status, duration

3. Error log
   - Failed executions with error messages

4. Quick actions
   - Enable/disable webhooks
   - Test workflow manually

Query this from n8n API or from our execution log table.
```

### 8. Ship (30 min)

**Go live:**
- Activate all workflows in n8n (not just test mode)
- Verify webhook URLs are production URLs
- Test each automation end-to-end

```
You: Commit everything with message "Day 9: Automate everything"
and push to GitHub.
```

**Checklist:**
- [ ] Welcome email sends on signup
- [ ] Slack notifications working
- [ ] Weekly digest scheduled
- [ ] Data backup scheduled
- [ ] Error handling in place
- [ ] Monitoring dashboard live

---

## What You Built Today

| Workflow | Trigger | Result |
|----------|---------|--------|
| Welcome email | New signup | Personalized email sent |
| Slack alerts | Various events | Team notified |
| Weekly digest | Monday 9am | Users get summary |
| Data backup | Daily 2am | Backup to Sheets |
| Custom workflow | Your trigger | Your action |

**Your product operates itself now.** Things happen without you clicking buttons.

---

## The Automation Pattern

Save this for reuse:
```
You: Create an automation skill from what we built today.
Include:
- n8n setup guide
- Webhook endpoint patterns
- Common workflow templates
- Error handling pattern
- Monitoring approach
```

---

## Why Automation Matters

| Without Automation | With Automation |
|--------------------|-----------------|
| "I forgot to send the welcome email" | Emails send automatically |
| "Let me check what happened today" | Slack shows everything |
| "I need to export data manually" | Backups run every night |
| You are the bottleneck | Product runs itself |

Automation is how solo founders scale. Your time is too valuable to do repetitive tasks.

---

## Day 9 Troubleshooting

| Problem | Solution |
|---------|----------|
| Webhook not firing | Check URL is correct, endpoint returns 200 |
| n8n execution fails | Check credentials, test each node individually |
| Emails going to spam | Set up proper email domain (SPF, DKIM) |
| Slack not connecting | Re-authenticate, check permissions |
| Schedule not running | Verify timezone settings in n8n |

---

## Practice Exercise

Complete this exercise to solidify today's skills:

**[n8n Automation Workflows](exercises/09-n8n-automation.md)** (90 min)
- Set up n8n and understand workflow concepts
- Create webhook-triggered workflows
- Build scheduled automation
- Connect n8n to your Supabase database

---

*Tomorrow: Your AI agents work on autopilot. The capstone.*
