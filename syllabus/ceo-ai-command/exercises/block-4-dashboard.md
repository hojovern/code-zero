# Exercise: Build Your CEO Dashboard

## Overview

| Duration | 60 minutes |
|----------|------------|
| Difficulty | Guided (facilitator assists) |
| Outcome | Working personal dashboard |

---

## Pre-Exercise Setup

Facilitator should have ready:
- [ ] Terminal open
- [ ] Node.js installed (v18+)
- [ ] DB Browser for SQLite installed
- [ ] Code snippets ready to paste

---

## Exercise Steps

### Step 1: Create the Project (10 min)

**Open terminal and run:**

```bash
# Create new SvelteKit project
npx sv create ceo-dashboard
# Select: SvelteKit minimal, TypeScript

# Navigate and install SQLite
cd ceo-dashboard
npm install better-sqlite3
npm install -D @types/better-sqlite3
```

**Checkpoint:** Project folder created, dependencies installed.

---

### Step 2: Set Up the Database (5 min)

**Create file:** `src/lib/db.ts`

```typescript
import Database from 'better-sqlite3';
import { building } from '$app/environment';

let db: Database.Database;

if (!building) {
  db = new Database('dashboard.db');

  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS focus (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task TEXT NOT NULL,
      completed INTEGER DEFAULT 0,
      date TEXT DEFAULT (date('now'))
    );

    CREATE TABLE IF NOT EXISTS decisions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      decision TEXT NOT NULL,
      context TEXT,
      date TEXT DEFAULT (date('now'))
    );

    CREATE TABLE IF NOT EXISTS prompts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      prompt TEXT NOT NULL,
      category TEXT
    );

    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // Seed prompts with skills from earlier blocks
  const existingPrompts = db.prepare('SELECT COUNT(*) as count FROM prompts').get() as { count: number };

  if (existingPrompts.count === 0) {
    const insert = db.prepare('INSERT INTO prompts (title, prompt, category) VALUES (?, ?, ?)');

    insert.run('Daily CEO Briefing', `Generate my daily briefing with:
- Today's schedule with context
- Top 3 industry news items
- Yesterday's incomplete action items
- Key metrics update`, 'briefing');

    insert.run('Competitive Intelligence', `Analyze my competitors and report:
- Recent news/PR (last 7 days)
- Notable job postings
- Threat/opportunity assessment`, 'intel');

    insert.run('Board Prep', `Take my notes and create:
- Recommended deck structure
- Key talking points
- Potential board questions + answers`, 'board');

    insert.run('Email Ghostwriter', `Draft a response to this email in my style:
- Keep it brief
- Be direct
- Clear next step`, 'email');
  }
}

export { db };
```

**Checkpoint:** Run `npm run dev`, then check that `dashboard.db` file appears.

---

### Step 3: Create Today's Focus Module (10 min)

**Create file:** `src/lib/components/TodaysFocus.svelte`

*[Paste component code from materials/block-4-dashboard.md]*

**Create server load function:** `src/routes/+page.server.ts`

```typescript
import { db } from '$lib/db';

export function load() {
  const tasks = db.prepare(`
    SELECT * FROM focus
    WHERE date = date('now')
    ORDER BY id
  `).all();

  return { tasks };
}

export const actions = {
  addTask: async ({ request }) => {
    const data = await request.formData();
    const task = data.get('task') as string;

    db.prepare('INSERT INTO focus (task) VALUES (?)').run(task);
    return { success: true };
  },

  toggleTask: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('id') as string;

    db.prepare(`
      UPDATE focus
      SET completed = CASE WHEN completed = 1 THEN 0 ELSE 1 END
      WHERE id = ?
    `).run(id);
    return { success: true };
  }
};
```

**Checkpoint:** Can add and complete tasks.

---

### Step 4: Create AI Prompts Library (10 min)

**Create file:** `src/lib/components/PromptLibrary.svelte`

*[Paste component code from materials/block-4-dashboard.md]*

**Update server load:**

```typescript
// Add to load function
const prompts = db.prepare('SELECT * FROM prompts ORDER BY category').all();

return { tasks, prompts };
```

**Checkpoint:** Click a prompt → it copies to clipboard.

---

### Step 5: Create Decision Log (10 min)

**Create file:** `src/lib/components/DecisionLog.svelte`

*[Paste component code from materials/block-4-dashboard.md]*

**Add server action:**

```typescript
// Add to actions
addDecision: async ({ request }) => {
  const data = await request.formData();
  const decision = data.get('decision') as string;
  const context = data.get('context') as string;

  db.prepare('INSERT INTO decisions (decision, context) VALUES (?, ?)').run(decision, context);
  return { success: true };
}
```

**Update load:**

```typescript
const decisions = db.prepare('SELECT * FROM decisions ORDER BY date DESC LIMIT 10').all();

return { tasks, prompts, decisions };
```

**Checkpoint:** Can add a decision and see it in the log.

---

### Step 6: Create Quick Capture (10 min)

**Create file:** `src/lib/components/QuickCapture.svelte`

*[Paste component code from materials/block-4-dashboard.md]*

**Add server action:**

```typescript
// Add to actions
addNote: async ({ request }) => {
  const data = await request.formData();
  const content = data.get('content') as string;

  db.prepare('INSERT INTO notes (content) VALUES (?)').run(content);
  return { success: true };
}
```

**Update load:**

```typescript
const notes = db.prepare('SELECT * FROM notes ORDER BY created_at DESC LIMIT 10').all();

return { tasks, prompts, decisions, notes };
```

**Checkpoint:** Can capture a note, see it appear instantly.

---

### Step 7: Assemble the Dashboard (5 min)

**Update:** `src/routes/+page.svelte`

```svelte
<script lang="ts">
  import { enhance } from '$app/forms';
  import TodaysFocus from '$lib/components/TodaysFocus.svelte';
  import PromptLibrary from '$lib/components/PromptLibrary.svelte';
  import DecisionLog from '$lib/components/DecisionLog.svelte';
  import QuickCapture from '$lib/components/QuickCapture.svelte';

  let { data } = $props();
</script>

<svelte:head>
  <title>CEO Command Center</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="dashboard">
  <header>
    <h1>CEO Command Center</h1>
    <span class="date">{new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    })}</span>
  </header>

  <div class="grid">
    <div class="col">
      <TodaysFocus tasks={data.tasks} />
      <DecisionLog decisions={data.decisions} />
    </div>

    <div class="col">
      <PromptLibrary prompts={data.prompts} />
      <QuickCapture notes={data.notes} />
    </div>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: 'Inter', sans-serif;
  }

  .dashboard {
    min-height: 100vh;
    background: #1a1d23;
    color: white;
    padding: 2rem;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #333;
  }

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
  }

  .date {
    color: #888;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .col {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
</style>
```

**Checkpoint:** Full dashboard visible with all 4 modules.

---

## Verification Checklist

By end of exercise, participant should have:

- [ ] SvelteKit project running locally
- [ ] `dashboard.db` file visible in project folder
- [ ] Today's Focus: Can add 3 priorities, check them off
- [ ] AI Prompts: Click to copy, 4 prompts pre-loaded
- [ ] Decision Log: Can add decisions with context
- [ ] Quick Capture: Can add notes, see timestamp

---

## Show the Magic

**Open DB Browser for SQLite:**

1. Open `dashboard.db` file
2. Browse each table
3. Show them their actual data

**Key point:** "This is YOUR database. Back it up, copy it, it's yours."

---

## Stretch Goals (if time permits)

1. **Custom styling:** Change the green accent color
2. **Add more prompts:** Create industry-specific prompts
3. **Meeting prep module:** Add upcoming meetings section
4. **Search:** Add search to Decision Log

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| SQLite not installing | Use `npm install better-sqlite3 --build-from-source` |
| Database not appearing | Check file permissions, restart dev server |
| Types errors | Run `npm run check` to see specific issues |
| Styles not applying | Check `<style>` block indentation |
