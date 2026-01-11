# Block 4: Build Your Dashboard

> "All the AI power you've built today, accessible from one screen."

## Overview

| Duration | 60 minutes |
|----------|------------|
| Outcome | Working personal dashboard on their laptop |
| Tech | SvelteKit + SQLite |
| Login | None needed (personal use) |

---

## Opening (5 min)

**Frame the block:**

> "You've built AI agents. You've built automations. Now let's build your cockpit — a single screen where everything lives.
>
> This isn't a web app for your team. It's YOUR dashboard. It runs on your laptop. Your data stays with you. No passwords, no cloud, no complexity.
>
> In 60 minutes, you'll have a personal command center you'll open every morning."

**Show the end result:**

```
┌─────────────────────────────────────────────────────────────┐
│  CEO Command Center                          [Your Name]    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  TODAY'S FOCUS                    AI PROMPTS                │
│  ┌─────────────────────┐          ┌─────────────────────┐   │
│  │ ○ Board prep call   │          │ 📋 Daily Briefing   │   │
│  │ ○ Review Q1 numbers │          │ 🔍 Competitor Intel │   │
│  │ ○ Email to investor │          │ 📊 Board Prep       │   │
│  └─────────────────────┘          │ ✉️ Email Ghost      │   │
│                                   └─────────────────────┘   │
│  RECENT DECISIONS                 QUICK CAPTURE             │
│  ┌─────────────────────┐          ┌─────────────────────┐   │
│  │ Jan 10: Hired new   │          │ [Type a note...]    │   │
│  │ CMO - starting Feb  │          │                     │   │
│  │                     │          │ Recent:             │   │
│  │ Jan 8: Approved Q1  │          │ • Call John re: deal│   │
│  │ marketing budget    │          │ • Review pricing    │   │
│  └─────────────────────┘          └─────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Part 1: Project Setup (10 min)

**Explain the tech:**

> "We're using SvelteKit — the same framework real apps are built with. And SQLite — a database that's just a file on your computer. You can literally see your data, copy it, back it up."

**Create the project:**

```bash
# In terminal
npx sv create ceo-dashboard
# Choose: SvelteKit minimal, TypeScript, no extras

cd ceo-dashboard
npm install better-sqlite3
npm install -D @types/better-sqlite3
```

**Show them the SQLite file will appear:**

> "When we're done, there will be a `dashboard.db` file right here. That's your entire database. No cloud, no server, just a file."

**Create the database setup:**

Create `src/lib/db.ts`:
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
      outcome TEXT,
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

    CREATE TABLE IF NOT EXISTS meetings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      date TEXT,
      attendees TEXT,
      prep_notes TEXT
    );
  `);
}

export { db };
```

**Aha moment trigger:**

> "You just created 5 database tables with one file. No account needed, no configuration, no waiting."

---

## Part 2: Today's Focus Module (10 min)

**What it does:**

> "Every morning, you set 3 priorities. Check them off as you go. Tomorrow, start fresh."

**Create the component:**

Create `src/lib/components/TodaysFocus.svelte`:
```svelte
<script lang="ts">
  let { tasks, onAdd, onToggle } = $props<{
    tasks: { id: number; task: string; completed: boolean }[];
    onAdd: (task: string) => void;
    onToggle: (id: number) => void;
  }>();

  let newTask = $state('');

  function handleAdd() {
    if (newTask.trim() && tasks.length < 3) {
      onAdd(newTask);
      newTask = '';
    }
  }
</script>

<div class="focus-module">
  <h2>Today's Focus</h2>

  <div class="tasks">
    {#each tasks as task}
      <label class="task" class:completed={task.completed}>
        <input
          type="checkbox"
          checked={task.completed}
          onchange={() => onToggle(task.id)}
        />
        <span>{task.task}</span>
      </label>
    {/each}
  </div>

  {#if tasks.length < 3}
    <form onsubmit={handleAdd}>
      <input
        type="text"
        placeholder="Add priority..."
        bind:value={newTask}
      />
    </form>
  {/if}
</div>

<style>
  .focus-module {
    background: #242933;
    padding: 1.5rem;
    border-radius: 12px;
  }

  h2 {
    margin: 0 0 1rem;
    font-size: 1rem;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .tasks {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .task {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    background: #1a1d23;
    border-radius: 8px;
    cursor: pointer;
  }

  .task.completed span {
    text-decoration: line-through;
    opacity: 0.5;
  }

  input[type="text"] {
    width: 100%;
    padding: 0.75rem;
    background: #1a1d23;
    border: 1px solid #333;
    border-radius: 8px;
    color: white;
    margin-top: 0.75rem;
  }
</style>
```

**Build it together:**
1. Create the component file
2. Add to main page
3. Test adding/completing tasks
4. Show them the data in SQLite

---

## Part 3: AI Prompts Library (10 min)

**What it does:**

> "All the AI skills you built earlier — daily briefing, competitor intel, board prep, email ghostwriter — accessible with one click."

**Create the component:**

Create `src/lib/components/PromptLibrary.svelte`:
```svelte
<script lang="ts">
  let { prompts, onCopy } = $props<{
    prompts: { id: number; title: string; prompt: string; category: string }[];
    onCopy: (prompt: string) => void;
  }>();

  let copied = $state<number | null>(null);

  function handleCopy(id: number, prompt: string) {
    navigator.clipboard.writeText(prompt);
    onCopy(prompt);
    copied = id;
    setTimeout(() => copied = null, 2000);
  }

  const icons: Record<string, string> = {
    'briefing': '📋',
    'intel': '🔍',
    'board': '📊',
    'email': '✉️',
    'default': '🤖'
  };
</script>

<div class="prompts-module">
  <h2>AI Prompts</h2>

  <div class="prompts">
    {#each prompts as prompt}
      <button
        class="prompt-card"
        onclick={() => handleCopy(prompt.id, prompt.prompt)}
      >
        <span class="icon">{icons[prompt.category] || icons.default}</span>
        <span class="title">{prompt.title}</span>
        {#if copied === prompt.id}
          <span class="copied">Copied!</span>
        {/if}
      </button>
    {/each}
  </div>
</div>

<style>
  .prompts-module {
    background: #242933;
    padding: 1.5rem;
    border-radius: 12px;
  }

  h2 {
    margin: 0 0 1rem;
    font-size: 1rem;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .prompts {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .prompt-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: #1a1d23;
    border: 1px solid transparent;
    border-radius: 8px;
    cursor: pointer;
    color: white;
    text-align: left;
    transition: all 0.15s;
  }

  .prompt-card:hover {
    border-color: #04A459;
  }

  .icon {
    font-size: 1.25rem;
  }

  .title {
    flex: 1;
  }

  .copied {
    font-size: 0.75rem;
    color: #04A459;
  }
</style>
```

**Pre-populate with their skills:**

```typescript
// Seed the prompts table with skills from Block 2
const skills = [
  {
    title: 'Daily CEO Briefing',
    category: 'briefing',
    prompt: `Generate my daily briefing with:
- Today's schedule with context on each person
- Top 3 industry news items
- Yesterday's incomplete action items
- Key metrics update
- One strategic thought`
  },
  {
    title: 'Competitive Intelligence',
    category: 'intel',
    prompt: `Analyze my competitors and report:
- Recent news/PR (last 7 days)
- Notable job postings
- Any industry mentions
- Threat/opportunity assessment`
  },
  // ... add board prep and email ghostwriter
];
```

**Aha moment:**

> "One click copies your prompt. Open Claude, paste, done. Your entire AI toolkit in one place."

---

## Part 4: Decision Log (10 min)

**What it does:**

> "Every major decision you make, logged. Context, reasoning, outcome. A year from now, you can search 'why did we choose vendor X?' and find the answer."

**Create the component:**

Create `src/lib/components/DecisionLog.svelte`:
```svelte
<script lang="ts">
  let { decisions, onAdd } = $props<{
    decisions: { id: number; decision: string; context: string; date: string }[];
    onAdd: (decision: string, context: string) => void;
  }>();

  let showForm = $state(false);
  let newDecision = $state('');
  let newContext = $state('');

  function handleAdd() {
    if (newDecision.trim()) {
      onAdd(newDecision, newContext);
      newDecision = '';
      newContext = '';
      showForm = false;
    }
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }
</script>

<div class="decisions-module">
  <div class="header">
    <h2>Recent Decisions</h2>
    <button class="add-btn" onclick={() => showForm = !showForm}>+</button>
  </div>

  {#if showForm}
    <form class="decision-form" onsubmit={handleAdd}>
      <input
        type="text"
        placeholder="What did you decide?"
        bind:value={newDecision}
      />
      <textarea
        placeholder="Context/reasoning (optional)"
        bind:value={newContext}
      ></textarea>
      <button type="submit">Log Decision</button>
    </form>
  {/if}

  <div class="decisions">
    {#each decisions.slice(0, 5) as decision}
      <div class="decision">
        <span class="date">{formatDate(decision.date)}</span>
        <span class="text">{decision.decision}</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .decisions-module {
    background: #242933;
    padding: 1.5rem;
    border-radius: 12px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  h2 {
    margin: 0;
    font-size: 1rem;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .add-btn {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #04A459;
    border: none;
    color: white;
    font-size: 1.25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .decision-form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .decision-form input,
  .decision-form textarea {
    padding: 0.75rem;
    background: #1a1d23;
    border: 1px solid #333;
    border-radius: 8px;
    color: white;
  }

  .decision-form textarea {
    min-height: 60px;
    resize: vertical;
  }

  .decision-form button {
    padding: 0.75rem;
    background: #04A459;
    border: none;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    cursor: pointer;
  }

  .decisions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .decision {
    padding: 0.75rem;
    background: #1a1d23;
    border-radius: 8px;
  }

  .date {
    display: block;
    font-size: 0.75rem;
    color: #04A459;
    margin-bottom: 0.25rem;
  }

  .text {
    color: #ccc;
    font-size: 0.9rem;
  }
</style>
```

**Build it together:**
1. Create component
2. Add first decision
3. Show it persisting in SQLite
4. Search capability mention: "Imagine searching all your decisions from the past year"

---

## Part 5: Quick Capture (10 min)

**What it does:**

> "Thought pops into your head? Capture it instantly. No friction, no organization required. Just type and move on."

**Create the component:**

Create `src/lib/components/QuickCapture.svelte`:
```svelte
<script lang="ts">
  let { notes, onAdd } = $props<{
    notes: { id: number; content: string; created_at: string }[];
    onAdd: (content: string) => void;
  }>();

  let newNote = $state('');

  function handleAdd() {
    if (newNote.trim()) {
      onAdd(newNote);
      newNote = '';
    }
  }

  function formatTime(dateStr: string) {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
</script>

<div class="capture-module">
  <h2>Quick Capture</h2>

  <form onsubmit={handleAdd}>
    <input
      type="text"
      placeholder="Type a note and press Enter..."
      bind:value={newNote}
    />
  </form>

  <div class="notes">
    {#each notes.slice(0, 5) as note}
      <div class="note">
        <span class="content">{note.content}</span>
        <span class="time">{formatTime(note.created_at)}</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .capture-module {
    background: #242933;
    padding: 1.5rem;
    border-radius: 12px;
  }

  h2 {
    margin: 0 0 1rem;
    font-size: 1rem;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    background: #1a1d23;
    border: 1px solid #333;
    border-radius: 8px;
    color: white;
    margin-bottom: 1rem;
  }

  .notes {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .note {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0.5rem 0;
    border-bottom: 1px solid #333;
  }

  .content {
    color: #ccc;
    font-size: 0.9rem;
  }

  .time {
    font-size: 0.75rem;
    color: #666;
    flex-shrink: 0;
    margin-left: 1rem;
  }
</style>
```

---

## Part 6: Assemble the Dashboard (5 min)

**Create the main page:**

Update `src/routes/+page.svelte`:
```svelte
<script lang="ts">
  import TodaysFocus from '$lib/components/TodaysFocus.svelte';
  import PromptLibrary from '$lib/components/PromptLibrary.svelte';
  import DecisionLog from '$lib/components/DecisionLog.svelte';
  import QuickCapture from '$lib/components/QuickCapture.svelte';

  let { data } = $props();
</script>

<svelte:head>
  <title>CEO Command Center</title>
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
      <TodaysFocus
        tasks={data.tasks}
        onAdd={...}
        onToggle={...}
      />
      <DecisionLog
        decisions={data.decisions}
        onAdd={...}
      />
    </div>

    <div class="col">
      <PromptLibrary
        prompts={data.prompts}
        onCopy={...}
      />
      <QuickCapture
        notes={data.notes}
        onAdd={...}
      />
    </div>
  </div>
</div>

<style>
  .dashboard {
    min-height: 100vh;
    background: #1a1d23;
    color: white;
    padding: 2rem;
    font-family: 'Inter', sans-serif;
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

---

## Close (5 min)

**Show the complete dashboard:**

> "This is YOUR Command Center. It runs on your laptop. Open it every morning.
>
> - Set your 3 priorities
> - One-click access to your AI prompts
> - Log decisions so you never forget why
> - Capture thoughts before they disappear
>
> And that `dashboard.db` file? That's your entire database. Back it up. Copy it to another computer. It's yours."

**Show them the database file:**

Open DB Browser for SQLite, show them their actual data.

**Aha moment trigger:**

> "You just built a real application. Database, UI, persistence. This is what developers do. And you did it in an hour."

---

## Block 4 Checkpoint

By end of Block 4, they have:
- [ ] Working SvelteKit + SQLite dashboard
- [ ] 4 functional modules (Focus, Prompts, Decisions, Capture)
- [ ] Understanding of how apps work (database → UI)
- [ ] A tool they'll actually use

---

## Materials Needed

- [ ] SvelteKit project template (or create live)
- [ ] Component code snippets (for pasting)
- [ ] DB Browser for SQLite installed
- [ ] Pre-seeded prompts from Block 2
