# Exercise: n8n Automation Workflows

**Day 9 | Guided | 90 min**

Build automated workflows using n8n that respond to events in your app and run on schedules.

---

## Learning Objectives

By completing this exercise, you will:
- Set up n8n and understand workflow concepts
- Create webhook-triggered workflows
- Build scheduled automation
- Connect n8n to your Supabase database

---

## Prerequisites

Before starting:
- [ ] n8n account (cloud.n8n.io or self-hosted)
- [ ] Working app with Supabase
- [ ] API endpoints that can send webhooks
- [ ] Week 1 + Days 6-8 completed

---

## The Challenge

**Build three automated workflows:**
1. Welcome email when user signs up
2. Slack notification on key events
3. Weekly scheduled report

**Success criteria:**
- Sign up triggers automatic welcome email
- Events in app notify Slack channel
- Weekly report generates and sends automatically

---

## Part 1: Welcome Email Workflow (30 min)

### Step 1: Create Webhook Endpoint in Your App

First, add a webhook trigger when users sign up:

```typescript
// src/routes/api/webhooks/send/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const { event, data } = body;

  if (!WEBHOOK_URL) {
    return json({ error: 'Webhook not configured' }, { status: 500 });
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, data, timestamp: new Date().toISOString() })
    });

    return json({ success: true });
  } catch (error) {
    return json({ error: 'Webhook failed' }, { status: 500 });
  }
};
```

### Step 2: Trigger Webhook on Signup

```typescript
// In your signup flow, after user is created:
async function onSignupComplete(user: User) {
  await fetch('/api/webhooks/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: 'user.signup',
      data: {
        email: user.email,
        name: user.name || user.email.split('@')[0],
        created_at: new Date().toISOString()
      }
    })
  });
}
```

### Step 3: Build n8n Workflow

In n8n:

1. **Add Webhook Trigger**
   - Create new workflow
   - Add "Webhook" node
   - HTTP Method: POST
   - Copy the webhook URL

2. **Add IF Node (Router)**
   - Condition: `{{ $json.event }}` equals `user.signup`

3. **Add Send Email Node**
   - Connect to your email service (Gmail, SendGrid, Resend)
   - To: `{{ $json.data.email }}`
   - Subject: `Welcome to [Your Product]!`
   - Body: Use HTML template below

```html
<h1>Welcome, {{ $json.data.name }}!</h1>
<p>We're excited to have you on board.</p>
<h2>Get Started:</h2>
<ol>
  <li>Complete your profile</li>
  <li>Create your first item</li>
  <li>Explore AI features</li>
</ol>
<p><a href="https://yourapp.com/dashboard">Go to Dashboard</a></p>
```

4. **Test the Workflow**
   - Click "Execute Workflow"
   - Sign up in your app
   - Check email inbox

---

## Part 2: Slack Notifications (30 min)

### Step 1: Set Up Slack

1. Create a Slack workspace (or use existing)
2. Create channel: `#app-notifications`
3. In n8n, add Slack credentials (OAuth connection)

### Step 2: Add Slack Node to Workflow

Extend your webhook workflow:

1. **Add another IF branch**
   - For events like: `content.created`, `error.occurred`

2. **Add Slack Node**
   - Channel: `#app-notifications`
   - Message type: Block Kit (for rich formatting)

```json
{
  "blocks": [
    {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": "{{ $json.event === 'user.signup' ? '🎉 New User!' : '📝 New Content' }}"
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Event:* {{ $json.event }}\n*Time:* {{ $json.timestamp }}"
      }
    },
    {
      "type": "section",
      "fields": [
        {
          "type": "mrkdwn",
          "text": "*User:*\n{{ $json.data.email || 'System' }}"
        },
        {
          "type": "mrkdwn",
          "text": "*Details:*\n{{ $json.data.name || $json.data.title || 'N/A' }}"
        }
      ]
    }
  ]
}
```

### Step 3: Test Multiple Event Types

Add triggers in your app for different events:

```typescript
// When content is created
await sendWebhook('content.created', {
  title: content.title,
  author: user.email,
  id: content.id
});

// When error occurs
await sendWebhook('error.occurred', {
  message: error.message,
  stack: error.stack,
  user: user?.email
});
```

---

## Part 3: Weekly Scheduled Report (30 min)

### Step 1: Create Schedule Trigger

1. **Add new workflow in n8n**
2. **Add Schedule Trigger**
   - Mode: Cron
   - Cron Expression: `0 9 * * 1` (Monday 9am)

### Step 2: Fetch Data from Supabase

1. **Add HTTP Request Node**
   - Method: GET
   - URL: `https://your-project.supabase.co/rest/v1/your_table`
   - Headers:
     - `apikey`: Your Supabase anon key
     - `Authorization`: `Bearer YOUR_ANON_KEY`
   - Query: `?created_at=gte.{{ $now.minus(7, 'days').toISO() }}`

Or create an API endpoint:

```typescript
// src/routes/api/reports/weekly/+server.ts
import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export const GET = async () => {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const { data: users } = await supabase
    .from('profiles')
    .select('*')
    .gte('created_at', weekAgo.toISOString());

  const { data: content } = await supabase
    .from('content')
    .select('*')
    .gte('created_at', weekAgo.toISOString());

  return json({
    week_start: weekAgo.toISOString(),
    week_end: new Date().toISOString(),
    new_users: users?.length || 0,
    new_content: content?.length || 0,
    users: users || [],
    content: content || []
  });
};
```

### Step 3: Generate Report with AI

1. **Add HTTP Request Node (to Gemini)**
   - Method: POST
   - URL: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_KEY`
   - Body:
   ```json
   {
     "contents": [{
       "parts": [{
         "text": "Analyze this weekly data and provide a brief summary:\n\nNew users: {{ $json.new_users }}\nNew content: {{ $json.new_content }}\n\nProvide: 1) One sentence summary 2) Top highlight 3) One recommendation"
       }]
     }]
   }
   ```

### Step 4: Send Report Email

1. **Add Email Node**
   - To: Your email
   - Subject: `Weekly Report - {{ $now.format('MMM D, YYYY') }}`
   - Body: Combine stats + AI summary

---

## Testing Your Workflows

### Test Checklist

- [ ] Sign up triggers welcome email
- [ ] Events send Slack notifications
- [ ] Schedule trigger fires (test manually first)
- [ ] Report includes accurate data
- [ ] AI summary is relevant

### Manual Testing in n8n

- Click "Execute Workflow" to test
- Use "Test webhook" to simulate events
- Check execution history for errors

---

## Common Mistakes

1. **Webhook URL not saved in env** — Add `N8N_WEBHOOK_URL` to `.env`
2. **Wrong date format in queries** — Use ISO format
3. **Slack not connected** — Re-authenticate OAuth
4. **Cron timezone wrong** — Set timezone in n8n settings

---

## Hints

<details>
<summary>Hint 1: Webhook not triggering?</summary>

Check that:
- Workflow is activated (toggle in n8n)
- URL is exactly correct (no trailing slash issues)
- Request body is valid JSON
</details>

<details>
<summary>Hint 2: Email not sending?</summary>

- Check spam folder
- Verify email credentials in n8n
- Test email node independently
</details>

<details>
<summary>Hint 3: Schedule not running?</summary>

- Cron expression must be valid
- Workflow must be activated
- Check n8n timezone settings
</details>

---

## Stretch Goals

- [ ] Add error handling workflow (catches failed executions)
- [ ] Build re-engagement email (users inactive 7+ days)
- [ ] Add workflow that backs up data to Google Sheets
- [ ] Create AI-powered content suggestion workflow

---

## Verification Checklist

- [ ] Welcome email sends within 30 seconds of signup
- [ ] Slack notifications appear for multiple event types
- [ ] Weekly report scheduled correctly
- [ ] AI summary adds value to report
- [ ] Error handling in place (workflows don't fail silently)
