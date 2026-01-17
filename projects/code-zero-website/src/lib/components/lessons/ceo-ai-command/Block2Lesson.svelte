<script lang="ts">
    import { onMount } from "svelte";

    let {
        backUrl = "/portal",
        backLabel = "Course",
        nextUrl = "",
    }: { backUrl?: string; backLabel?: string; nextUrl?: string } = $props();

    let copiedIndex = $state<number | null>(null);
    let expandedAgent = $state<number | null>(null);

    const outcomes = [
        { icon: "01", title: "Daily Briefing", desc: "Morning email at 7am" },
        {
            icon: "02",
            title: "Competitive Intel",
            desc: "Weekly competitor digest",
        },
        { icon: "03", title: "Board Prep", desc: "Instant deck outlines" },
        { icon: "04", title: "Email Ghost", desc: "Drafts in your voice" },
    ];

    const agents = [
        {
            name: "Daily CEO Briefing",
            trigger: "Every day at 7am",
            description:
                "Before you've had coffee, this agent has reviewed your calendar, scanned industry news, compiled action items, and packaged it into one email.",
            prompt: `Generate my Daily CEO Briefing for [DATE].

## Today's Schedule
For each meeting on my calendar:
- **Time**: [start - end]
- **Meeting**: [title]
- **With**: [attendees]
- **Context**: Who they are, why we're meeting, last interaction
- **Prep needed**: Yes/No - what specifically

## Industry Pulse
- **Top 3 headlines** relevant to my business
- **Company mentions**: Any news about [COMPANY NAME]
- **Competitor activity**: Notable moves from [COMPETITORS]

## Yesterday's Loose Ends
- **Uncommitted commitments**: Things I said I'd do but haven't
- **Unanswered VIPs**: Important emails awaiting response

## Key Metrics
| Metric | Current | vs. Target | Trend |
|--------|---------|------------|-------|
| [METRIC 1] | X | +/-Y% | up/down |

## One Thing to Consider
One strategic thought or reminder I should be thinking about today.

**Format:** Keep under 2 pages. Bullet points. No fluff.`,
        },
        {
            name: "Competitive Intelligence",
            trigger: "Every Sunday at 6pm",
            description:
                "Scouts your competitors: job postings, news mentions, website changes, LinkedIn activity. One-page digest with what matters.",
            prompt: `# Competitive Intelligence Report

For each competitor in my list:

## [Competitor Name]
**What's New:**
- Recent news/PR (last 7 days)
- Notable job postings (especially leadership or new capabilities)
- Any mentions in industry publications

**What It Means:**
- One sentence interpretation: threat/opportunity/neutral

## Summary
- Biggest move this week across all competitors
- One thing I should ask my team about

Competitors to track: [list from CLAUDE.md]`,
        },
        {
            name: "Board Prep Agent",
            trigger: "On demand",
            description:
                "Dump your messy notes, financials, updates. Get back a structured outline with talking points. 6 hours of prep becomes 1 hour.",
            prompt: `# Board Prep Agent

Take my raw inputs and create:

## Recommended Deck Structure
1. [Section]: Key message, supporting points
2. [Section]: Key message, supporting points
(Continue for 6-8 sections typical board deck)

## For Each Section
- Headline (what you want them to remember)
- 3 bullet points maximum
- One chart/visual suggestion
- Potential board question + prepared answer

## Appendix Recommendations
- What backup data to have ready
- Which slides can go to appendix if time is short

## Talking Points
- Opening statement (2 sentences)
- Key narrative thread
- Closing ask/message`,
        },
        {
            name: "Email Ghostwriter",
            trigger: "VIP email arrives",
            description:
                "Drafts responses in YOUR voice. You review, edit, send. Never stare at a blank compose window again.",
            prompt: `# Email Ghostwriter

When drafting email responses for me:

## My Email Style
- Length: [short/medium]
- Tone: [direct/warm/formal]
- Signature: [how I sign off]
- Never use: [phrases I hate]
- Always: [habits I have]

## Response Framework
1. Acknowledge their message (one sentence)
2. Address their main point
3. Clear next step or ask
4. Sign off

## For Different Situations
- Good news: [my style]
- Bad news: [my style]
- Requests: [my style]
- Declines: [my style]`,
        },
    ];

    const checklist = [
        "Daily Briefing agent skill created",
        "Competitive Intelligence agent skill created",
        "Board Prep agent skill created",
        "Email Ghostwriter agent skill created",
        "At least one agent scheduled to run automatically",
    ];

    function copyToClipboard(text: string, index: number) {
        navigator.clipboard.writeText(text);
        copiedIndex = index;
        setTimeout(() => (copiedIndex = null), 2000);
    }

    function toggleAgent(index: number) {
        expandedAgent = expandedAgent === index ? null : index;
    }
</script>

<svelte:head>
    <title>Block 2: Deploy Your Agent Fleet | code:zero</title>
    <meta
        name="description"
        content="Build 4 AI agents that work autonomously: daily briefing, competitive intelligence, board prep, and email ghostwriter."
    />
</svelte:head>

<div class="lesson-wrapper">
    <!-- Header -->
    <header class="lesson-header">
        <a href={backUrl} class="back-link">← {backLabel}</a>
        <h1 class="lesson-title">Deploy Your Agent Fleet</h1>
        <p class="lesson-subtitle">CEO AI Command Center · Block 2</p>
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
    
    <!-- Agent Fleet -->
    <section class="lesson-section">
        <h2 class="section-title">The Agent Fleet</h2>
        <div class="exercises-grid">
            {#each agents as agent}
                <div class="exercise-card">
                    <div class="exercise-icon">🤖</div>
                    <div class="exercise-title">{agent.name}</div>
                    <div class="exercise-desc">
                        <strong>Trigger:</strong> {agent.trigger}<br/><br/>
                        {agent.description}
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
