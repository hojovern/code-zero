<script lang="ts">
    import { onMount } from "svelte";

    let {
        backUrl = "/student-portal",
        backLabel = "Course",
        nextUrl = "",
    }: { backUrl?: string; backLabel?: string; nextUrl?: string } = $props();

    let expandedWorkflow = $state<number | null>(0);

    const outcomes = [
        { icon: "01", title: "Zoom → Slack", desc: "Auto meeting summaries" },
        { icon: "02", title: "Email Triage", desc: "VIP auto-response" },
        { icon: "03", title: "News Digest", desc: "Daily industry scan" },
        { icon: "04", title: "Doc Analyzer", desc: "Extract key points" },
    ];

    const workflows = [
        {
            name: "Zoom → Slack Briefing",
            trigger: "Meeting ends",
            output: "Summary + action items in Slack",
            description:
                "Your meeting ends. Before you've closed Zoom, a summary is already in Slack with action items. Your team knows what was decided without you saying a word.",
            steps: [
                {
                    icon: "🎥",
                    title: "Zoom Recording",
                    desc: "Trigger: Recording available",
                },
                {
                    icon: "📝",
                    title: "Get Transcript",
                    desc: "Pull from Zoom API",
                },
                {
                    icon: "🤖",
                    title: "AI Summarize",
                    desc: "Key decisions + action items",
                },
                {
                    icon: "💬",
                    title: "Slack Post",
                    desc: "To #meeting-summaries",
                },
            ],
        },
        {
            name: "Email Triage",
            trigger: "VIP email received",
            output: "Categorized + draft response",
            description:
                "New email from a VIP arrives. AI reads it, categorizes urgency, drafts a response, and you just... approve.",
            steps: [
                { icon: "📧", title: "New Email", desc: "Trigger: Inbox" },
                { icon: "🔍", title: "VIP Filter", desc: "Check sender list" },
                {
                    icon: "🤖",
                    title: "AI Analyze",
                    desc: "Urgency + draft reply",
                },
                { icon: "📁", title: "Save Draft", desc: "For your review" },
            ],
        },
        {
            name: "Daily News Digest",
            trigger: "6am schedule",
            output: "Industry news summary",
            description:
                "Every morning at 6am, before your briefing agent runs, this workflow has already scanned industry news and competitor mentions.",
            steps: [
                { icon: "⏰", title: "Schedule", desc: "6:00 AM daily" },
                {
                    icon: "🌐",
                    title: "RSS/News API",
                    desc: "Fetch industry news",
                },
                {
                    icon: "🤖",
                    title: "AI Filter",
                    desc: "Relevant to your biz",
                },
                { icon: "💾", title: "Save", desc: "Ready for briefing" },
            ],
        },
        {
            name: "Document Analyzer",
            trigger: "File uploaded",
            output: "Key points extracted",
            description:
                "Drop a document in a folder. AI reads it, extracts key points, and adds to your searchable knowledge base.",
            steps: [
                { icon: "📂", title: "File Watch", desc: "New file in folder" },
                { icon: "📄", title: "Extract Text", desc: "Parse document" },
                {
                    icon: "🤖",
                    title: "AI Analyze",
                    desc: "Summary + key points",
                },
                { icon: "🗄️", title: "Database", desc: "Searchable storage" },
            ],
        },
    ];

    const checklist = [
        "n8n account created and accessible",
        "Zoom → Slack workflow built and tested",
        "Email triage workflow connected",
        "News digest scheduled for 6am",
        "Document analyzer watching a folder",
    ];
</script>

<svelte:head>
    <title>Block 3: Automation Power | code:zero</title>
    <meta
        name="description"
        content="Connect everything with n8n workflows: Zoom to Slack, email triage, news digest, and document analysis."
    />
</svelte:head>

<div class="lesson-wrapper">
    <!-- Header -->
    <header class="lesson-header">
        <a href={backUrl} class="back-link">← {backLabel}</a>
        <h1 class="lesson-title">Automation Power</h1>
        <p class="lesson-subtitle">CEO AI Command Center · Block 3</p>
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
    
    <!-- Automation Workflows -->
    <section class="lesson-section">
        <h2 class="section-title">Automation Workflows</h2>
        {#each workflows as wf}
            <div class="callout" style="margin-bottom: 2rem;">
                <h3>{wf.name}</h3>
                <p style="color: var(--text-secondary); margin-bottom: 1rem;">{wf.description}</p>
                <div class="checklist">
                    {#each wf.steps as step}
                        <div class="checklist-item" style="cursor: default;">
                            <span style="font-size: 1.2rem;">{step.icon}</span>
                            <div>
                                <strong>{step.title}</strong>
                                <span class="check-text"> - {step.desc}</span>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        {/each}
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
