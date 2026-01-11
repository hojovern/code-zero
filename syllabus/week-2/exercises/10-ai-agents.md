# Exercise: Build AI Agents

**Day 10 | Project | 2 hours**

Build autonomous AI agents that run automatically and create a Mission Control dashboard to monitor them.

---

## Learning Objectives

By completing this exercise, you will:
- Design AI agent architectures
- Connect n8n workflows with AI APIs
- Build autonomous scheduled agents
- Create real-time monitoring dashboards

---

## Prerequisites

Before starting:
- [ ] n8n workflows working (from Day 9)
- [ ] Gemini API key
- [ ] Content generation from Week 1
- [ ] Days 6-9 completed

---

## The Challenge

**Build an AI agent system with:**
1. Content Agent - generates weekly content automatically
2. Welcome Agent - personalizes onboarding for new users
3. Mission Control - dashboard showing all agent activity

**Success criteria:**
- Agents run on schedule or triggers
- AI generates useful output
- Dashboard shows real-time agent activity

---

## Part 1: Content Agent (45 min)

### Step 1: Create Agent Run Tracking

First, track all agent executions:

```sql
-- Run in Supabase SQL Editor
CREATE TABLE agent_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name TEXT NOT NULL,
  trigger_type TEXT NOT NULL, -- 'schedule' | 'webhook' | 'manual'
  status TEXT NOT NULL DEFAULT 'running', -- 'running' | 'completed' | 'failed'
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  output_summary TEXT,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE agent_runs;

-- RLS for admin access
ALTER TABLE agent_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read agent_runs"
ON agent_runs FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Service role can insert"
ON agent_runs FOR INSERT
TO service_role
WITH CHECK (true);
```

### Step 2: API Endpoint for Agent Logging

```typescript
// src/routes/api/agents/log/+server.ts
import { json } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY! // Service key for RLS bypass
);

export const POST = async ({ request }) => {
  const body = await request.json();
  const { agent_name, trigger_type, status, output_summary, error_message } = body;

  if (status === 'started') {
    const { data, error } = await supabase
      .from('agent_runs')
      .insert({ agent_name, trigger_type, status: 'running' })
      .select()
      .single();

    return json({ run_id: data?.id });
  }

  if (body.run_id) {
    await supabase
      .from('agent_runs')
      .update({
        status,
        completed_at: new Date().toISOString(),
        output_summary,
        error_message
      })
      .eq('id', body.run_id);
  }

  return json({ success: true });
};
```

### Step 3: Build Content Agent in n8n

Create workflow:

1. **Schedule Trigger**
   - Cron: `0 6 * * 1` (Monday 6am)

2. **HTTP Request - Log Start**
   - POST to `/api/agents/log`
   - Body: `{ "agent_name": "Content Agent", "trigger_type": "schedule", "status": "started" }`
   - Save `run_id` from response

3. **HTTP Request - Get Topic**
   - GET `/api/content/topics` (or use AI to suggest)

4. **HTTP Request - Generate Blog (Gemini)**
   ```json
   {
     "contents": [{
       "parts": [{
         "text": "Write a blog post about '{{ $json.topic }}' for an AI coding academy audience. Include: engaging headline, 3 main sections, actionable tips, call-to-action. About 800 words. Output as markdown."
       }]
     }]
   }
   ```

5. **HTTP Request - Generate Social Snippets (Gemini)**
   - Extract 5 tweet-length quotes from blog

6. **HTTP Request - Save Content**
   - POST to `/api/content`
   - Save blog + snippets to database

7. **HTTP Request - Log Complete**
   - POST to `/api/agents/log`
   - Body: `{ "run_id": "{{ saved_run_id }}", "status": "completed", "output_summary": "Generated blog: {{ title }}" }`

8. **Slack Notification**
   - "🤖 Content Agent completed: {{ title }}"

9. **Error Handler**
   - On error, log failure and notify

---

## Part 2: Welcome Agent (30 min)

### Step 1: Trigger on New Signup

Extend your webhook workflow:

1. **IF Node**: Check `event === 'user.signup'`

2. **HTTP Request - Log Start**
   - Log agent run for "Welcome Agent"

3. **HTTP Request - Personalize with AI (Gemini)**
   ```json
   {
     "contents": [{
       "parts": [{
         "text": "Create personalized onboarding for a new user:\n\nName: {{ $json.data.name }}\nEmail: {{ $json.data.email }}\n\nProvide:\n1. Personalized welcome message (2 sentences)\n2. 3 recommended first actions based on their email domain/interests\n3. One tip for success\n\nBe warm and specific, not generic."
       }]
     }]
   }
   ```

4. **HTTP Request - Save to User Profile**
   - PATCH `/api/users/{{ user_id }}/onboarding`
   - Save welcome_message, recommendations, tip

5. **Send Personalized Email**
   - Include AI-generated content

6. **Log Complete**

---

## Part 3: Mission Control Dashboard (45 min)

### Step 1: Create Dashboard Page

```svelte
<!-- src/routes/admin/mission-control/+page.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { supabase } from '$lib/supabase';

  let agents = [
    { name: 'Content Agent', schedule: 'Monday 6am', icon: '📝' },
    { name: 'Welcome Agent', schedule: 'On signup', icon: '👋' },
    { name: 'Insight Agent', schedule: 'Daily 8am', icon: '📊' }
  ];

  let runs: any[] = [];
  let stats = { today: 0, success_rate: 0, total: 0 };

  onMount(async () => {
    await loadRuns();
    await loadStats();
    subscribeToRuns();
  });

  async function loadRuns() {
    const { data } = await supabase
      .from('agent_runs')
      .select('*')
      .order('started_at', { ascending: false })
      .limit(20);

    runs = data || [];
  }

  async function loadStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data: todayRuns } = await supabase
      .from('agent_runs')
      .select('status')
      .gte('started_at', today.toISOString());

    const total = todayRuns?.length || 0;
    const successful = todayRuns?.filter(r => r.status === 'completed').length || 0;

    stats = {
      today: total,
      success_rate: total ? Math.round((successful / total) * 100) : 100,
      total
    };
  }

  let channel: any;

  function subscribeToRuns() {
    channel = supabase
      .channel('agent-runs')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'agent_runs'
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          runs = [payload.new, ...runs.slice(0, 19)];
        } else if (payload.eventType === 'UPDATE') {
          runs = runs.map(r => r.id === payload.new.id ? payload.new : r);
        }
        loadStats();
      })
      .subscribe();
  }

  onDestroy(() => {
    if (channel) supabase.removeChannel(channel);
  });

  function getStatusColor(status: string) {
    return {
      running: '#f59e0b',
      completed: '#10b981',
      failed: '#ef4444'
    }[status] || '#6b7280';
  }

  async function triggerAgent(name: string) {
    // Call API to manually trigger agent
    await fetch('/api/agents/trigger', {
      method: 'POST',
      body: JSON.stringify({ agent: name })
    });
  }
</script>

<div class="mission-control">
  <header>
    <h1>🎛️ Mission Control</h1>
    <p>AI Agents Dashboard</p>
  </header>

  <!-- Stats -->
  <div class="stats-row">
    <div class="stat-card">
      <span class="stat-value">{stats.today}</span>
      <span class="stat-label">Runs Today</span>
    </div>
    <div class="stat-card">
      <span class="stat-value">{stats.success_rate}%</span>
      <span class="stat-label">Success Rate</span>
    </div>
  </div>

  <!-- Agents Grid -->
  <section class="agents-section">
    <h2>Active Agents</h2>
    <div class="agents-grid">
      {#each agents as agent}
        {@const lastRun = runs.find(r => r.agent_name === agent.name)}
        <div class="agent-card">
          <div class="agent-header">
            <span class="agent-icon">{agent.icon}</span>
            <h3>{agent.name}</h3>
          </div>
          <p class="agent-schedule">{agent.schedule}</p>
          {#if lastRun}
            <div class="last-run">
              <span
                class="status-dot"
                style="background: {getStatusColor(lastRun.status)}"
              ></span>
              <span>{lastRun.status}</span>
              <span class="time">{new Date(lastRun.started_at).toLocaleTimeString()}</span>
            </div>
          {/if}
          <button class="trigger-btn" on:click={() => triggerAgent(agent.name)}>
            Run Now
          </button>
        </div>
      {/each}
    </div>
  </section>

  <!-- Live Activity -->
  <section class="activity-section">
    <h2>Live Activity</h2>
    <div class="activity-feed">
      {#each runs as run (run.id)}
        <div class="activity-item" class:running={run.status === 'running'}>
          <span
            class="status-dot"
            style="background: {getStatusColor(run.status)}"
          ></span>
          <span class="agent-name">{run.agent_name}</span>
          <span class="summary">{run.output_summary || run.status}</span>
          <span class="time">
            {new Date(run.started_at).toLocaleTimeString()}
          </span>
        </div>
      {/each}
    </div>
  </section>
</div>

<style>
  .mission-control {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  header h1 { margin: 0; font-size: 2rem; }
  header p { opacity: 0.7; margin: 0.5rem 0 2rem; }

  .stats-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    background: var(--bg-elevated, #242933);
    padding: 1.5rem;
    border-radius: 12px;
    text-align: center;
  }

  .stat-value {
    display: block;
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--color-primary, #04A459);
  }

  .stat-label { opacity: 0.7; }

  .agents-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .agent-card {
    background: var(--bg-elevated, #242933);
    border-radius: 12px;
    padding: 1.5rem;
  }

  .agent-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
  }

  .agent-icon { font-size: 1.5rem; }
  .agent-header h3 { margin: 0; }
  .agent-schedule { opacity: 0.6; font-size: 0.875rem; margin: 0 0 1rem; }

  .last-run {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .time { opacity: 0.5; margin-left: auto; }

  .trigger-btn {
    width: 100%;
    padding: 0.75rem;
    background: var(--color-primary, #04A459);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
  }

  .activity-feed {
    background: var(--bg-elevated, #242933);
    border-radius: 12px;
    overflow: hidden;
  }

  .activity-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--border-subtle, #2e3440);
  }

  .activity-item.running {
    background: rgba(245, 158, 11, 0.1);
  }

  .agent-name { font-weight: 600; min-width: 120px; }
  .summary { flex: 1; opacity: 0.7; }
</style>
```

---

## Testing Your System

### Manual Testing

1. **Trigger Content Agent manually** in n8n
   - Watch Mission Control update in real-time
   - Verify content appears in database

2. **Sign up as new user**
   - Welcome Agent should trigger
   - Check for personalized onboarding

3. **Check Dashboard**
   - Stats should update
   - Activity feed should show runs

---

## Common Mistakes

1. **Service key exposed** — Only use on server-side
2. **No error handling** — Always log failures
3. **Realtime not enabled** — Check table replication
4. **AI output not parsed** — Clean up JSON responses

---

## Stretch Goals

- [ ] Add Insight Agent (daily analytics report)
- [ ] Add agent enable/disable toggles
- [ ] Add execution duration tracking
- [ ] Add agent success/failure charts

---

## Verification Checklist

- [ ] Content Agent generates real content
- [ ] Welcome Agent personalizes onboarding
- [ ] Mission Control shows real-time updates
- [ ] Stats are accurate
- [ ] "Run Now" buttons work
- [ ] Error states display correctly
