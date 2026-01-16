<script lang="ts">
    import { onMount } from "svelte";

    let {
        backUrl = "/student-portal",
        backLabel = "Course",
        nextUrl = "",
    }: { backUrl?: string; backLabel?: string; nextUrl?: string } = $props();

    let copiedIndex = $state<number | null>(null);

    const outcomes = [
        { icon: "✅", title: "Summary Doc", desc: "Everything you built" },
        { icon: "💬", title: "Team Script", desc: "What to tell Monday" },
        { icon: "🚀", title: "Next Steps", desc: "Your 30-day plan" },
    ];

    const builtItems = [
        "CLAUDE.md with business memory",
        "4 AI Agents (briefing, intel, board prep, email)",
        "4 Workflows (Zoom, email, news, docs)",
        "Personal CEO Dashboard with SQLite",
        "15+ AI opportunities identified",
    ];

    const scripts = [
        '"I built a system that briefs me every morning before I\'ve had coffee."',
        '"I have AI agents monitoring our competitors 24/7 now."',
        '"My Zoom meetings are automatically summarized to Slack."',
        '"I want you to look at [specific opportunity] for your team."',
    ];

    const nextSteps = [
        {
            icon: "☀️",
            title: "Tomorrow Morning",
            desc: "Check your briefing email from the Daily CEO Agent",
        },
        {
            icon: "📅",
            title: "This Week",
            desc: "Review your first Zoom summary in Slack",
        },
        {
            icon: "🔑",
            title: "Portal Access",
            desc: "Log in and explore all materials, templates, and tutorials",
        },
        {
            icon: "👥",
            title: "Team Training",
            desc: "Schedule a conversation about team training",
        },
    ];

    const playbookTemplate = `# [Name]'s AI Command Center Playbook

## What You Built Today
- [ ] CLAUDE.md with business memory
- [ ] 4 AI Agents (briefing, intel, board prep, email)
- [ ] 4 Workflows (Zoom, email, news, docs)
- [ ] Personal CEO Dashboard (running locally with SQLite)

## Your Priority Opportunities
1. [Quick win 1]
2. [Quick win 2]
3. [Quick win 3]

## What to Tell Your Team Monday
1. "I built an AI system that [does X]"
2. "I want us to explore [opportunity] for [team]"
3. "Let's schedule a follow-up to train the team"

## Next Steps
- [ ] Check your briefing email tomorrow morning
- [ ] Review first Zoom summary this week
- [ ] Access your student portal
- [ ] Schedule team training conversation`;

    function copyToClipboard(text: string, index: number) {
        navigator.clipboard.writeText(text);
        copiedIndex = index;
        setTimeout(() => (copiedIndex = null), 2000);
    }
</script>

<svelte:head>
    <title>Block 6: Your Playbook | code:zero</title>
    <meta
        name="description"
        content="Document everything, prepare to evangelize to your team, and plan your next steps."
    />
</svelte:head>

<div class="lesson-wrapper">
    <!-- Header -->
    <header class="lesson-header">
        <a href={backUrl} class="back-link">← {backLabel}</a>
        <h1 class="lesson-title">Your Playbook</h1>
        <p class="lesson-subtitle">CEO AI Command Center · Block 6</p>
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
    
    <!-- Built Items & Next Steps -->
    <section class="lesson-section">
        <h2 class="section-title">What You Built</h2>
        <div class="checklist" style="margin-bottom: 3rem;">
             {#each builtItems as item}
                <div class="checklist-item" style="cursor: default;">
                    <span style="color: var(--color-primary);">✓</span>
                    <span class="check-text" style="color: var(--text-primary);">{item}</span>
                </div>
            {/each}
        </div>
        
        <h2 class="section-title">Next 30 Days</h2>
        <div class="exercises-grid">
            {#each nextSteps as step}
                <div class="exercise-card">
                    <div class="exercise-icon">{step.icon}</div>
                    <div class="exercise-title">{step.title}</div>
                    <div class="exercise-desc">{step.desc}</div>
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