<script lang="ts">
    import { onMount } from "svelte";

    let {
        backUrl = "/student-portal",
        backLabel = "Course",
        nextUrl = "",
    }: { backUrl?: string; backLabel?: string; nextUrl?: string } = $props();

    let heroVisible = $state(true);
    let copiedIndex = $state<number | null>(null);

    const outcomes = [
        {
            icon: "01",
            title: "AI Memory",
            desc: "CLAUDE.md knows YOUR business",
        },
        {
            icon: "02",
            title: "Learning System",
            desc: "AI that improves over time",
        },
        {
            icon: "03",
            title: "First Skill",
            desc: "Reusable meeting prep workflow",
        },
    ];

    const schedule = [
        {
            time: "0:00",
            title: "Opening Frame",
            subtitle: "The AI Command Center concept",
            duration: "5 min",
        },
        {
            time: "0:05",
            title: "The Memory Layer",
            subtitle: "Building your CLAUDE.md",
            duration: "15 min",
        },
        {
            time: "0:20",
            title: "The Learning System",
            subtitle: "How AI captures preferences",
            duration: "10 min",
        },
        {
            time: "0:30",
            title: "Skills Library",
            subtitle: "Creating your first reusable skill",
            duration: "15 min",
        },
    ];

    const checklist = [
        "CLAUDE.md file created with your business context",
        "At least 5 sections completed (Who, Business, Work Style, Team, Focus)",
        "Learning system section started",
        "First skill created (Meeting Prep)",
        "Tested skill with a real meeting on your calendar",
    ];

    const claudeTemplate = `# [Company Name] - CEO Command Center

## Who I Am
- CEO of [Company], a [industry] company
- [X] years in the role
- Key priorities: [growth/efficiency/expansion/etc.]

## My Business
- What we do: [one paragraph]
- Key metrics I track: [revenue, customers, etc.]
- Main competitors: [list]
- Current challenges: [list]

## How I Work
- Communication style: [direct/collaborative/formal]
- Decision-making: [data-driven/intuitive/consensus]
- Pet peeves: [long emails/jargon/etc.]

## My Team
- Direct reports: [CFO, COO, CMO, etc.]
- Key relationships: [board chair, major clients, etc.]

## Current Focus
- This quarter: [priorities]
- This week: [immediate focus]

## Preferences I've Learned
- (AI will add preferences as you work together)`;

    const meetingPrepSkill = `# Meeting Prep Skill

When I say "prep me for [meeting]", do this:

1. Look up who I'm meeting with
2. Find recent news about them/their company
3. Check my previous notes on them
4. List 3 talking points I should raise
5. Identify 1 thing I should ask them

Output as bullet points, keep it under 1 page.`;

    function copyToClipboard(text: string, index: number) {
        navigator.clipboard.writeText(text);
        copiedIndex = index;
        setTimeout(() => (copiedIndex = null), 2000);
    }

    onMount(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                heroVisible = entry.isIntersecting;
            },
            { threshold: 0.1 }
        );

        const hero = document.querySelector('.hero');
        if (hero) observer.observe(hero);

        return () => observer.disconnect();
    });
</script>

<svelte:head>
    <title>Block 1: Build Your Command Center | code:zero</title>
    <meta
        name="description"
        content="Set up your AI memory layer with CLAUDE.md and create your first reusable skill."
    />
</svelte:head>

<div class="lesson-wrapper">
    <!-- Header -->
    <header class="lesson-header">
        <a href={backUrl} class="back-link">← {backLabel}</a>
        <h1 class="lesson-title">Build Your Command Center</h1>
        <p class="lesson-subtitle">CEO AI Command Center · Block 1</p>
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
    
    <!-- Focus Schedule -->
    <section class="lesson-section">
        <h2 class="section-title">Focus Schedule</h2>
        <div class="callout">
            {#each schedule as item}
                <div class="timeline-item">
                    <div class="timeline-time">{item.time}</div>
                    <div class="timeline-content">
                        <h3>{item.title}</h3>
                        <p>{item.subtitle}</p>
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
        max-width: 1200px;
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
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: var(--space-4);
    }

    .exercise-card {
        background: var(--bg-elevated);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-lg);
        padding: var(--space-5);
        transition: all 200ms ease;
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