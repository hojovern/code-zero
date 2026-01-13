<script lang="ts">
    import { onMount } from "svelte";

    let {
        backUrl = "/student-portal",
        backLabel = "Course",
        nextUrl = "",
    }: { backUrl?: string; backLabel?: string; nextUrl?: string } = $props();

    let scrollY = $state(0);
    let scrollHeight = $state(0);
    let innerHeight = $state(0);
    let heroVisible = $state(true);
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

    onMount(() => {
        const updateMetrics = () => {
            scrollY = window.scrollY;
            scrollHeight = document.body.scrollHeight;
            innerHeight = window.innerHeight;
            heroVisible = scrollY < innerHeight * 0.8;
        };
        updateMetrics();
        window.addEventListener("scroll", updateMetrics);
        window.addEventListener("resize", updateMetrics);
        return () => {
            window.removeEventListener("scroll", updateMetrics);
            window.removeEventListener("resize", updateMetrics);
        };
    });
</script>

<svelte:head>
    <title>Block 3: Automation Power | code:zero</title>
    <meta
        name="description"
        content="Connect everything with n8n workflows: Zoom to Slack, email triage, news digest, and document analysis."
    />
</svelte:head>

<div class="lesson-wrapper">
    <!-- Bottom Progress Bar -->
    <div class="reading-progress">
        <div 
            class="reading-progress-bar"
            style="width: {scrollHeight > innerHeight
                ? Math.min(
                      100,
                      (scrollY / (scrollHeight - innerHeight)) * 100,
                  )
                : 0}%"
        ></div>
    </div>

    <section class="hero">
        <div class="hero-bg">
            
            
            
        </div>

        <div class="hero-content">
            <a href={backUrl} class="back-link">
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                {backLabel}
            </a>

            <div class="hero-badge">
                <span class="badge-dot"></span>
                Block 03 · 75 min
            </div>

            <h1 class="hero-title">
                <span class="title-line">Automation</span>
                <span class="title-line accent">Power</span>
            </h1>

            <p class="hero-tagline">
                "When a Zoom meeting ends → AI summarizes → Slack notifies your
                team."
            </p>

            <div class="hero-outcomes">
                {#each outcomes as outcome, i}
                    <div class="outcome-card" style="--delay: {i * 0.1}s">
                        <span class="outcome-num">{outcome.icon}</span>
                        <div class="outcome-text">
                            <span class="outcome-title">{outcome.title}</span>
                            <span class="outcome-desc">{outcome.desc}</span>
                        </div>
                    </div>
                {/each}
            </div>
        </div>

        <div class="scroll-indicator">
            <span>Scroll to begin</span>
            <div class="scroll-line"></div>
        </div>
    </section>

    <!-- n8n Concept -->
    <section class="concept-section">
        <div class="section-container">
            <span class="section-label">The Platform</span>
            <h2 class="section-title">n8n connects everything</h2>

            <div class="n8n-intro">
                <div class="intro-text">
                    <p>
                        The agents we built are smart, but they're isolated. n8n
                        connects everything together.
                    </p>
                    <p class="highlight">
                        This is where your Command Center becomes a machine.
                    </p>
                </div>
                <div class="n8n-visual">
                    <div class="n8n-box">
                        <div class="n8n-item"><span>Nodes</span> = actions</div>
                        <div class="n8n-item">
                            <span>Connections</span> = triggers
                        </div>
                        <div class="n8n-item">
                            <span>Workflows</span> = sequences
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Workflows -->
    <section class="workflows-section">
        <div class="section-container">
            <span class="section-label">Your Workflows</span>
            <h2 class="section-title">4 Automations</h2>

            <div class="workflows-grid">
                {#each workflows as workflow, i}
                    <button
                        class="workflow-card"
                        class:active={expandedWorkflow === i}
                        onclick={() =>
                            (expandedWorkflow =
                                expandedWorkflow === i ? null : i)}
                    >
                        <div class="workflow-header">
                            <span class="workflow-num"
                                >{String(i + 1).padStart(2, "0")}</span
                            >
                            <div class="workflow-meta">
                                <h3>{workflow.name}</h3>
                                <p class="workflow-trigger">
                                    {workflow.trigger} → {workflow.output}
                                </p>
                            </div>
                        </div>
                    </button>
                {/each}
            </div>

            {#if expandedWorkflow !== null}
                <div class="workflow-detail">
                    <p class="workflow-desc">
                        {workflows[expandedWorkflow].description}
                    </p>
                    <div class="workflow-steps">
                        {#each workflows[expandedWorkflow].steps as step, i}
                            <div class="step-card">
                                <span class="step-icon">{step.icon}</span>
                                <h4>{step.title}</h4>
                                <p>{step.desc}</p>
                            </div>
                            {#if i < workflows[expandedWorkflow].steps.length - 1}
                                <div class="step-arrow">→</div>
                            {/if}
                        {/each}
                    </div>
                </div>
            {/if}
        </div>
    </section>

    <!-- Statement -->
    <section class="statement-section">
        <div class="statement-bg"></div>
        <div class="section-container">
            <blockquote class="big-statement">
                <span class="statement-mark">"</span>
                Every meeting you have from now on is automatically documented.
            </blockquote>
        </div>
    </section>

    <!-- Checklist -->
    <section class="checklist-section">
        <div class="section-container">
            <span class="section-label">End of Block</span>
            <h2 class="section-title">Checkpoint</h2>

            <div class="checklist-grid">
                {#each checklist as item}
                    <label class="checklist-item">
                        <input type="checkbox" />
                        <span class="check-box">
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="3"
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </span>
                        <span class="check-text">{item}</span>
                    </label>
                {/each}
            </div>

            <div class="tip-box">
                <div class="tip-icon">💡</div>
                <div class="tip-content">
                    <strong>Team potential:</strong> You just built 4 workflows.
                    Your operations team could build 40 of these for different processes
                    across the company.
                </div>
            </div>
        </div>
    </section>

    {#if nextUrl}
        <section class="next-section">
            <div class="section-container">
                <div class="next-card">
                    <div class="next-content">
                        <span class="next-label">Up Next</span>
                        <h3 class="next-title">
                            Block 4: Build Your Dashboard
                        </h3>
                        <p class="next-desc">
                            Create a personal CEO dashboard with SvelteKit +
                            SQLite.
                        </p>
                    </div>
                    <a href={nextUrl} class="next-btn">
                        Continue
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    {/if}
</div>

<style>
    .lesson-wrapper {
        background: #0a0a0b;
        color: #fff;
        font-family: var(--font-body, "Quicksand"), system-ui, sans-serif;
        min-height: 100vh;
    }

    

    
    
    
    
    

    
    /* Reading Progress */
    .reading-progress {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 6px;
        background: rgba(255, 255, 255, 0.05);
        z-index: 1000;
    }

    .reading-progress-bar {
        height: 100%;
        background: #04a459;
        background: linear-gradient(90deg, #04a459, #2ecc71);
        transition: width 0.1s;
        box-shadow: 0 0 10px rgba(4, 164, 89, 0.5);
    }

    .hero {
        position: relative;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 60px;
        overflow: hidden;
    }
    .hero-bg {
        position: absolute;
        inset: 0;
    }
    .gradient-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(120px);
        opacity: 0.5;
    }
    .orb-1 {
        width: 800px;
        height: 800px;
        background: transparent;
        top: -400px;
        right: -200px;
        animation: float 20s ease-in-out infinite;
    }
    .orb-2 {
        width: 600px;
        height: 600px;
        background: transparent;
        bottom: -300px;
        left: -100px;
        animation: float 25s ease-in-out infinite reverse;
    }
    @keyframes float {
        0%,
        100% {
            transform: translate(0, 0) scale(1);
        }
        33% {
            transform: translate(30px, -30px) scale(1.05);
        }
        66% {
            transform: translate(-20px, 20px) scale(0.95);
        }
    }
    .grid-overlay {
        position: absolute;
        inset: 0;
        background-image: linear-gradient(
                rgba(255, 255, 255, 0.03) 1px,
                transparent 1px
            ),
            linear-gradient(
                90deg,
                rgba(255, 255, 255, 0.03) 1px,
                transparent 1px
            );
        background-size: 60px 60px;
        mask-image: radial-gradient(
            ellipse at center,
            black 0%,
            transparent 70%
        );
    }

    .hero-content {
        position: relative;
        z-index: 1;
        max-width: 1200px;
        margin: 0 auto;
    }
    .back-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: #666;
        text-decoration: none;
        font-size: 14px;
        margin-bottom: 40px;
    }
    .back-link:hover {
        color: #fff;
    }
    .hero-badge {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 8px 16px;
        background: rgba(139, 92, 246, 0.15);
        border: 1px solid rgba(139, 92, 246, 0.3);
        border-radius: 100px;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #8b5cf6;
        margin-bottom: 32px;
    }
    .badge-dot {
        width: 8px;
        height: 8px;
        background: #8b5cf6;
        border-radius: 50%;
        animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }

    .hero-title {
        font-size: clamp(48px, 10vw, 100px);
        font-weight: 800;
        line-height: 1.1;
        margin: 0 0 32px;
    }
    .title-line {
        display: block;
    }
    .title-line.accent {
        background: linear-gradient(135deg, #8b5cf6, #a78bfa, #c4b5fd);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .hero-tagline {
        font-size: clamp(18px, 2.5vw, 24px);
        color: #888;
        font-style: italic;
        margin: 0 0 60px;
    }

    .hero-outcomes {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
    }
    .outcome-card {
        display: flex;
        align-items: flex-start;
        gap: 16px;
        padding: 20px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        min-width: 180px;
        animation: fadeInUp 0.6s ease-out backwards;
        animation-delay: var(--delay);
    }
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    .outcome-card:hover {
        background: rgba(255, 255, 255, 0.06);
        border-color: rgba(139, 92, 246, 0.3);
        transform: translateY(-4px);
    }
    .outcome-num {
        font-size: 28px;
        font-weight: 800;
        color: #8b5cf6;
    }
    .outcome-text {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .outcome-title {
        font-size: 15px;
        font-weight: 600;
    }
    .outcome-desc {
        font-size: 13px;
        color: #666;
    }

    .scroll-indicator {
        position: absolute;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        color: #444;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.2em;
    }
    .scroll-line {
        width: 1px;
        height: 60px;
        background: linear-gradient(to bottom, #444, transparent);
    }

    .section-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 60px;
    }
    .section-label {
        display: inline-block;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        color: #8b5cf6;
        margin-bottom: 16px;
    }
    .section-title {
        font-size: clamp(36px, 6vw, 56px);
        font-weight: 800;
        margin: 0 0 24px;
    }

    .concept-section {
        padding: 160px 0;
        background: #0a0a0b;
    }
    .n8n-intro {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 60px;
        align-items: center;
    }
    .intro-text p {
        font-size: 18px;
        color: #888;
        line-height: 1.7;
        margin: 0 0 16px;
    }
    .intro-text .highlight {
        color: #fff;
        font-weight: 500;
    }
    .n8n-visual {
        background: rgba(139, 92, 246, 0.1);
        border: 1px solid rgba(139, 92, 246, 0.2);
        border-radius: 16px;
        padding: 32px;
    }
    .n8n-box {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    .n8n-item {
        font-size: 16px;
        color: #ccc;
    }
    .n8n-item span {
        color: #8b5cf6;
        font-weight: 600;
    }

    .workflows-section {
        padding: 120px 0;
        background: transparent;
    }
    .workflows-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        margin-bottom: 32px;
    }
    .workflow-card {
        text-align: left;
        padding: 24px;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        cursor: pointer;
        transition: all 0.2s;
    }
    .workflow-card:hover {
        border-color: rgba(255, 255, 255, 0.15);
    }
    .workflow-card.active {
        background: rgba(139, 92, 246, 0.1);
        border-color: rgba(139, 92, 246, 0.3);
    }
    .workflow-header {
        display: flex;
        align-items: center;
        gap: 16px;
    }
    .workflow-num {
        font-size: 24px;
        font-weight: 800;
        color: #8b5cf6;
    }
    .workflow-meta h3 {
        font-size: 16px;
        font-weight: 600;
        margin: 0 0 4px;
        color: #fff;
    }
    .workflow-trigger {
        font-size: 13px;
        color: #666;
        margin: 0;
    }

    .workflow-detail {
        padding: 32px;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        animation: fadeInUp 0.3s ease-out;
    }
    .workflow-desc {
        font-size: 16px;
        color: #888;
        line-height: 1.7;
        margin: 0 0 32px;
    }
    .workflow-steps {
        display: flex;
        align-items: stretch;
        gap: 12px;
        flex-wrap: wrap;
    }
    .step-card {
        flex: 1;
        min-width: 140px;
        padding: 20px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        text-align: center;
    }
    .step-icon {
        font-size: 28px;
        display: block;
        margin-bottom: 12px;
    }
    .step-card h4 {
        font-size: 14px;
        font-weight: 600;
        margin: 0 0 4px;
    }
    .step-card p {
        font-size: 12px;
        color: #666;
        margin: 0;
    }
    .step-arrow {
        display: flex;
        align-items: center;
        font-size: 20px;
        color: #8b5cf6;
    }

    .statement-section {
        position: relative;
        padding: 160px 0;
    }
    .statement-bg {
        position: absolute;
        inset: 0;
        background: radial-gradient(
            ellipse at center,
            rgba(139, 92, 246, 0.15) 0%,
            transparent 60%
        );
    }
    .big-statement {
        position: relative;
        font-size: clamp(28px, 4vw, 48px);
        font-weight: 600;
        line-height: 1.4;
        text-align: center;
        margin: 0;
    }
    .statement-mark {
        position: absolute;
        top: -40px;
        left: -20px;
        font-size: 150px;
        font-weight: 800;
        color: rgba(139, 92, 246, 0.1);
    }

    .checklist-section {
        padding: 120px 0;
        background: #0a0a0b;
    }
    .checklist-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 16px;
        margin-bottom: 32px;
    }
    .checklist-item {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 24px;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 12px;
        cursor: pointer;
    }
    .checklist-item:hover {
        background: rgba(255, 255, 255, 0.04);
    }
    .checklist-item input {
        display: none;
    }
    .check-box {
        width: 24px;
        height: 24px;
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }
    .check-box svg {
        opacity: 0;
    }
    .checklist-item input:checked + .check-box {
        background: #8b5cf6;
        border-color: #8b5cf6;
    }
    .checklist-item input:checked + .check-box svg {
        opacity: 1;
    }
    .check-text {
        font-size: 15px;
        color: #ccc;
    }

    .tip-box {
        display: flex;
        gap: 16px;
        padding: 24px;
        background: rgba(59, 130, 246, 0.1);
        border: 1px solid rgba(59, 130, 246, 0.2);
        border-radius: 12px;
    }
    .tip-icon {
        font-size: 24px;
    }
    .tip-content {
        font-size: 15px;
        color: #ccc;
    }
    .tip-content strong {
        color: #fff;
    }

    .next-section {
        padding: 80px 0 120px;
        background: #0f0f10;
    }
    .next-card {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 48px;
        background: linear-gradient(
            135deg,
            rgba(139, 92, 246, 0.1) 0%,
            rgba(139, 92, 246, 0.02) 100%
        );
        border: 1px solid rgba(139, 92, 246, 0.2);
        border-radius: 24px;
    }
    .next-label {
        display: block;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        color: #8b5cf6;
        margin-bottom: 12px;
    }
    .next-title {
        font-size: 28px;
        font-weight: 700;
        margin: 0 0 8px;
    }
    .next-desc {
        font-size: 16px;
        color: #888;
        margin: 0;
    }
    .next-btn {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        padding: 16px 32px;
        background: #8b5cf6;
        color: #fff;
        text-decoration: none;
        font-weight: 600;
        border-radius: 12px;
    }
    .next-btn:hover {
        background: #a78bfa;
        transform: translateX(4px);
    }

    @media (max-width: 768px) {
        .hero,
        .section-container {
            padding: 40px 24px;
        }
        .n8n-intro {
            grid-template-columns: 1fr;
        }
        .workflows-grid {
            grid-template-columns: 1fr;
        }
        .workflow-steps {
            flex-direction: column;
        }
        .step-arrow {
            transform: rotate(90deg);
            justify-content: center;
        }
        .next-card {
            flex-direction: column;
            gap: 32px;
            text-align: center;
        }
    }
</style>
