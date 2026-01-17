<script lang="ts">
    import { onMount } from "svelte";

    let {
        backUrl = "/portal",
        backLabel = "Course",
        nextUrl = "",
    }: { backUrl?: string; backLabel?: string; nextUrl?: string } = $props();

    const outcomes = [
        { icon: "01", title: "Today's Focus", desc: "3 daily priorities" },
        { icon: "02", title: "Prompts Library", desc: "One-click AI access" },
        { icon: "03", title: "Decision Log", desc: "Track major decisions" },
        { icon: "04", title: "Quick Capture", desc: "Scratchpad for ideas" },
    ];

    const modules = [
        {
            name: "Today's Focus",
            time: "10 min",
            description:
                "Set 3 priorities each morning. Simple but powerful — forces you to think about what actually matters today.",
            schema: `CREATE TABLE focus (
  id INTEGER PRIMARY KEY,
  focus TEXT NOT NULL,
  completed BOOLEAN DEFAULT 0,
  date DATE DEFAULT CURRENT_DATE
);`,
        },
        {
            name: "AI Prompts Library",
            time: "10 min",
            description:
                "One-click access to all your skills. Click a card, it copies to clipboard, paste into Claude. Zero friction.",
            schema: `CREATE TABLE prompts (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  prompt TEXT NOT NULL,
  category TEXT,
  uses INTEGER DEFAULT 0
);`,
        },
        {
            name: "Decision Log",
            time: "10 min",
            description:
                "Track major decisions with context. When you look back in 6 months, you'll know why you made that call.",
            schema: `CREATE TABLE decisions (
  id INTEGER PRIMARY KEY,
  decision TEXT NOT NULL,
  context TEXT,
  outcome TEXT,
  date DATE DEFAULT CURRENT_DATE
);`,
        },
        {
            name: "Quick Capture",
            time: "10 min",
            description:
                "Scratchpad for ideas and notes. Get thoughts out of your head and into a system.",
            schema: `CREATE TABLE captures (
  id INTEGER PRIMARY KEY,
  note TEXT NOT NULL,
  tags TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
        },
    ];

    const checklist = [
        "SvelteKit project created and running locally",
        "SQLite database file visible (dashboard.db)",
        "Today's Focus module working",
        "Prompts library with copy-to-clipboard",
        "Decision Log and Quick Capture functional",
        "DB Browser shows your data",
    ];
</script>

<svelte:head>
    <title>Block 4: Build Your Dashboard | code:zero</title>
    <meta
        name="description"
        content="Create a personal CEO dashboard with SvelteKit and SQLite - runs locally, data stays with you."
    />
</svelte:head>

<div class="lesson-wrapper">
    <!-- Header -->
    <header class="lesson-header">
        <a href={backUrl} class="back-link">← {backLabel}</a>
        <h1 class="lesson-title">Build Your Dashboard</h1>
        <p class="lesson-subtitle">CEO AI Command Center · Block 4</p>
    </header>

    <!-- Outcomes (Exercises Grid Style) -->
    <section class="lesson-section">
        <h2 class="section-title">Key Outcomes</h2>
        <div class="exercises-grid">
            {#each outcomes as outcome}
                <div class="exercise-card">
                    <div class="exercise-icon">{outcome.icon}</div>
                    <div class="exercise-title">{outcome.title}</div>
                    <div class="exercise-desc">{outcome.desc}</div>
                </div>
            {/each}
        </div>
    </section>

    <!-- The Workflow (Timeline Style) -->
    
    <!-- Dashboard Modules -->
    <section class="lesson-section">
        <h2 class="section-title">Dashboard Modules</h2>
        <div class="callout">
            {#each modules as mod}
                <div class="timeline-item">
                    <div class="timeline-time">{mod.time}</div>
                    <div class="timeline-content">
                        <h3>{mod.name}</h3>
                        <p>{mod.description}</p>
                    </div>
                </div>
            {/each}
        </div>
    </section>
    

    <!-- Checklist -->
    <section class="lesson-section">
        <h2 class="section-title">Ship Checklist</h2>
        <div class="checklist">
            {#each checklist as item}
                <label class="checklist-item">
                    <input type="checkbox" />
                    <span class="check-text">{item}</span>
                </label>
            {/each}
        </div>
    </section>

    <!-- Next Link -->
    {#if nextUrl}
        <div class="next-section">
            <a href={nextUrl} class="next-btn">
                Next Block →
            </a>
        </div>
    {/if}
</div>

<style>

    /* Standard Layout CSS */
    .lesson-wrapper {
        max-width: 1400px;
        margin: 0 auto;
        padding: var(--space-6);
        font-family: var(--font-body, system-ui, sans-serif);
        color: var(--text-primary);
    }

    .lesson-header {
        margin-bottom: var(--space-8);
        border-bottom: 1px solid var(--border-subtle);
        padding-bottom: var(--space-6);
    }
    
    .back-link {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        color: var(--text-muted);
        text-decoration: none;
        font-size: 0.875rem;
        margin-bottom: var(--space-4);
        transition: color 0.2s;
    }
    
    .back-link:hover {
        color: var(--color-primary);
    }

    .lesson-title {
        font-family: var(--font-heading, system-ui, sans-serif);
        font-size: clamp(2rem, 4vw, 3rem);
        font-weight: 800;
        letter-spacing: -0.02em;
        margin: 0 0 var(--space-2);
        line-height: 1.1;
    }
    
    .lesson-subtitle {
        font-size: 1.25rem;
        color: var(--text-secondary);
        font-weight: 400;
    }

    /* Cards & Sections */
    .lesson-section {
        margin-bottom: var(--space-12);
    }

    .section-title {
        font-family: var(--font-heading, system-ui, sans-serif);
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: var(--space-6);
        color: var(--text-primary);
        display: flex;
        align-items: center;
        gap: var(--space-3);
    }
    
    .section-title::before {
        content: '';
        display: block;
        width: 4px;
        height: 24px;
        background: var(--color-primary);
        border-radius: 2px;
    }

    /* Exercises/Outcomes Grid */
    .exercises-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-4);
    }

    @media (min-width: 640px) {
        .exercises-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (min-width: 1024px) {
        .exercises-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    .exercise-card {
        background: var(--bg-elevated);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-lg);
        padding: var(--space-5);
        transition: all 200ms ease;
        contain: layout style;
    }
    
    .exercise-card:hover {
        border-color: var(--color-primary);
        transform: translateY(-2px);
    }
    
    .exercise-icon {
        font-size: 1.5rem;
        color: var(--color-primary);
        margin-bottom: var(--space-3);
        font-weight: 800;
        font-family: var(--font-heading);
    }
    
    .exercise-title {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: var(--space-2);
    }
    
    .exercise-desc {
        font-size: 0.9rem;
        color: var(--text-secondary);
        line-height: 1.5;
    }

    /* Callout / Timeline */
    .callout {
        background: var(--bg-elevated);
        border: 1px solid var(--border-subtle);
        border-left: 3px solid var(--color-primary);
        border-radius: var(--radius-md);
        padding: var(--space-6);
    }
    
    .timeline-item {
        display: grid;
        grid-template-columns: 80px 1fr;
        gap: var(--space-6);
        margin-bottom: var(--space-6);
        padding-bottom: var(--space-6);
        border-bottom: 1px solid var(--border-subtle);
    }
    
    .timeline-item:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
    }
    
    .timeline-time {
        font-family: var(--font-mono);
        font-size: 0.85rem;
        color: var(--text-muted);
        text-align: right;
        padding-top: 4px;
    }
    
    .timeline-content h3 {
        font-size: 1.1rem;
        font-weight: 600;
        margin: 0 0 var(--space-1);
        color: var(--text-primary);
    }
    
    .timeline-content p {
        font-size: 0.95rem;
        color: var(--text-secondary);
        margin: 0;
    }

    /* Checklist */
    .checklist {
        background: var(--bg-elevated);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-lg);
        padding: var(--space-2);
    }

    .checklist-item {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        padding: var(--space-3) var(--space-4);
        cursor: pointer;
        border-radius: var(--radius-md);
        transition: background 150ms;
        border-bottom: 1px solid var(--border-subtle);
    }
    
    .checklist-item:last-child {
        border-bottom: none;
    }

    .checklist-item:hover {
        background: var(--bg-surface);
    }

    .checklist-item input {
        width: 18px;
        height: 18px;
        accent-color: var(--color-primary);
    }

    .check-text {
        font-size: 0.95rem;
        color: var(--text-secondary);
    }

    .checklist-item input:checked + .check-text {
        color: var(--text-primary);
        text-decoration: line-through;
        opacity: 0.7;
    }

    /* Next Button */
    .next-section {
        margin-top: var(--space-12);
        display: flex;
        justify-content: flex-end;
    }
    
    .next-btn {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        padding: var(--space-3) var(--space-6);
        background: var(--color-primary);
        color: white;
        border-radius: var(--radius-full);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.2s;
    }
    
    .next-btn:hover {
        opacity: 0.9;
        transform: translateX(4px);
    }

</style>
