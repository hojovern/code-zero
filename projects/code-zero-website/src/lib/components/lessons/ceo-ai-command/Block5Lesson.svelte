<script lang="ts">
    import { onMount } from "svelte";

    let {
        backUrl = "/student-portal",
        backLabel = "Course",
        nextUrl = "",
    }: { backUrl?: string; backLabel?: string; nextUrl?: string } = $props();

    const outcomes = [
        { icon: "01", title: "Opportunity Audit", desc: "Find AI wins" },
        { icon: "02", title: "Prioritization", desc: "Impact vs. effort" },
        { icon: "03", title: "Role Mapping", desc: "Team-specific ideas" },
    ];

    const categories = [
        {
            name: "Repetitive",
            question: "What do you/your team do repeatedly?",
            examples: "Reports, updates, emails, scheduling",
        },
        {
            name: "Data-heavy",
            question: "What involves processing lots of information?",
            examples: "Research, analysis, summarization",
        },
        {
            name: "Time-sensitive",
            question: "What needs quick turnaround?",
            examples: "Customer responses, approvals, alerts",
        },
        {
            name: "Error-prone",
            question: "What goes wrong due to human oversight?",
            examples: "Follow-ups, handoffs, compliance",
        },
        {
            name: "High-volume",
            question: "What scales linearly with growth?",
            examples: "Customer support, onboarding, invoicing",
        },
    ];

    const roles = [
        {
            role: "CFO",
            wins: "Financial report summarizer, invoice processor, variance analyzer",
            quote: "Imagine your CFO's month-end just got 2 days shorter",
        },
        {
            role: "CMO",
            wins: "Content generator, social monitor, campaign analyzer",
            quote: "Your marketing team could produce 3x the content",
        },
        {
            role: "COO",
            wins: "Process automator, vendor manager, operations dashboard",
            quote: "Every SOP could have an AI assistant",
        },
        {
            role: "CHRO",
            wins: "Resume screener, policy Q&A bot, onboarding automator",
            quote: "HR could handle 10x the hiring volume",
        },
    ];

    const checklist = [
        "15-20 AI opportunities identified",
        "Each scored on Impact, Feasibility, Excitement",
        "Quick wins list (do this month)",
        "Strategic bets list (plan for Q2)",
        "Role-specific opportunities noted for team",
    ];
</script>

<svelte:head>
    <title>Block 5: Map to Your Business | code:zero</title>
    <meta
        name="description"
        content="Identify AI opportunities across your organization with a structured audit framework."
    />
</svelte:head>

<div class="lesson-wrapper">
    <!-- Header -->
    <header class="lesson-header">
        <a href={backUrl} class="back-link">← {backLabel}</a>
        <h1 class="lesson-title">Map to Your Business</h1>
        <p class="lesson-subtitle">CEO AI Command Center · Block 5</p>
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
    
    <!-- Opportunities & Roles -->
    <section class="lesson-section">
        <h2 class="section-title">Opportunity Categories</h2>
        <div class="exercises-grid" style="margin-bottom: 3rem;">
            {#each categories as cat}
                <div class="exercise-card">
                    <div class="exercise-title">{cat.name}</div>
                    <div class="exercise-desc">
                        <em>"{cat.question}"</em><br/><br/>
                        Examples: {cat.examples}
                    </div>
                </div>
            {/each}
        </div>
        
        <h2 class="section-title">C-Suite Wins</h2>
        <div class="callout">
             {#each roles as role}
                <div class="timeline-item">
                    <div class="timeline-time" style="font-weight: bold; color: var(--color-primary);">{role.role}</div>
                    <div class="timeline-content">
                        <h3>{role.wins}</h3>
                        <p>"{role.quote}"</p>
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