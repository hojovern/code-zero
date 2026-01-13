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
    <title>Block 1: Build Your Command Center | code:zero</title>
    <meta
        name="description"
        content="Set up your AI memory layer with CLAUDE.md and create your first reusable skill."
    />
</svelte:head>

<div class="lesson-wrapper">
    <!-- Floating Nav -->
    <!-- Bottom Progress Bar -->
    <div class="reading-progress">
        <div
            class="reading-progress-bar"
            style="width: {scrollHeight > innerHeight
                ? Math.min(100, (scrollY / (scrollHeight - innerHeight)) * 100)
                : 0}%"
        ></div>
    </div>

    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-bg"></div>

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
                Block 01 · 45 min
            </div>

            <h1 class="hero-title">
                <span class="title-line">Build Your</span>
                <span class="title-line accent">Command Center</span>
            </h1>

            <p class="hero-tagline">
                "The difference between ChatGPT and what we're building is
                memory."
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

    <!-- Concept Section -->
    <section class="concept-section">
        <div class="section-container">
            <div class="concept-grid">
                <div class="concept-content">
                    <span class="section-label">The Big Idea</span>
                    <h2 class="section-title">
                        AI with amnesia vs. AI that knows you
                    </h2>
                    <p class="concept-text">
                        Most people use AI like a search engine — ask a
                        question, get an answer, <em>start over</em>.
                    </p>
                    <p class="concept-text highlight">
                        That's like having a brilliant employee with amnesia.
                    </p>
                    <p class="concept-text">
                        Your Command Center remembers your business, your role,
                        your preferences. It gets smarter every time you use it.
                    </p>
                </div>
                <div class="concept-visual">
                    <div class="command-structure">
                        <div class="structure-title">
                            Your AI Command Center
                        </div>
                        <div class="structure-tree">
                            <div class="tree-item">
                                📁 Memory Layer <span
                                    >(AI knows YOUR business)</span
                                >
                            </div>
                            <div class="tree-item">
                                📁 Agent Fleet <span
                                    >(4 AI agents working for you)</span
                                >
                            </div>
                            <div class="tree-item">
                                📁 Automation Hub <span>(n8n workflows)</span>
                            </div>
                            <div class="tree-item">
                                📁 Learning System <span
                                    >(improves with every interaction)</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CLAUDE.md Section -->
    <section class="claude-section">
        <div class="section-container">
            <span class="section-label">The Memory File</span>
            <h2 class="section-title">Your CLAUDE.md</h2>
            <p class="section-subtitle">
                This file is your AI's long-term memory. Everything here
                persists across conversations.
            </p>

            <div class="code-card">
                <div class="code-header">
                    <span class="code-filename">CLAUDE.md</span>
                    <button
                        class="copy-btn"
                        onclick={() => copyToClipboard(claudeTemplate, 0)}
                    >
                        {#if copiedIndex === 0}
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Copied
                        {:else}
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <rect
                                    x="9"
                                    y="9"
                                    width="13"
                                    height="13"
                                    rx="2"
                                    ry="2"
                                />
                                <path
                                    d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                                />
                            </svg>
                            Copy
                        {/if}
                    </button>
                </div>
                <pre class="code-content">{claudeTemplate}</pre>
            </div>

            <div class="tip-box">
                <div class="tip-icon">💡</div>
                <div class="tip-content">
                    <strong>Pro tip:</strong> Spend time on this file. The better
                    your AI knows you, the better every interaction becomes.
                </div>
            </div>
        </div>
    </section>

    <!-- Learning System Section -->
    <section class="learning-section">
        <div class="section-container">
            <span class="section-label">It Gets Smarter</span>
            <h2 class="section-title">The Learning System</h2>

            <div class="learning-grid">
                <div class="learning-card">
                    <div class="learning-icon">🔄</div>
                    <h3>Every Correction Trains It</h3>
                    <p>
                        When you say "actually, make that shorter" — AI
                        remembers for next time.
                    </p>
                </div>
                <div class="learning-card">
                    <div class="learning-icon">📝</div>
                    <h3>Preferences Are Captured</h3>
                    <p>
                        Your CLAUDE.md grows with entries like "Always use
                        bullet points, never paragraphs."
                    </p>
                </div>
                <div class="learning-card">
                    <div class="learning-icon">🎯</div>
                    <h3>Context Compounds</h3>
                    <p>
                        After a month, AI knows your style better than most EAs.
                    </p>
                </div>
            </div>

            <div class="example-box">
                <div class="example-header">Example: Preferences AI Learns</div>
                <div class="example-content">
                    <code>- Always use bullet points, never paragraphs</code>
                    <code>- Prefer "revenue" over "sales"</code>
                    <code>- Never schedule meetings before 9am</code>
                    <code>- Skip the pleasantries, get to the point</code>
                </div>
            </div>
        </div>
    </section>

    <!-- Skills Section -->
    <section class="skills-section">
        <div class="section-container">
            <span class="section-label">Your First Skill</span>
            <h2 class="section-title">Meeting Prep Skill</h2>
            <p class="section-subtitle">
                A skill is a reusable workflow. Create once, use forever.
            </p>

            <div class="code-card">
                <div class="code-header">
                    <span class="code-filename"
                        >.claude/skills/meeting-prep/SKILL.md</span
                    >
                    <button
                        class="copy-btn"
                        onclick={() => copyToClipboard(meetingPrepSkill, 1)}
                    >
                        {#if copiedIndex === 1}
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Copied
                        {:else}
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <rect
                                    x="9"
                                    y="9"
                                    width="13"
                                    height="13"
                                    rx="2"
                                    ry="2"
                                />
                                <path
                                    d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                                />
                            </svg>
                            Copy
                        {/if}
                    </button>
                </div>
                <pre class="code-content">{meetingPrepSkill}</pre>
            </div>

            <div class="aha-box">
                <div class="aha-icon">✨</div>
                <div class="aha-content">
                    <strong>Aha moment:</strong> You just created a skill that will
                    work forever. Next week, say "prep me for my board meeting" and
                    it knows exactly what to do.
                </div>
            </div>
        </div>
    </section>

    <!-- Timeline Section -->
    <section class="timeline-section">
        <div class="section-container">
            <span class="section-label">Your Block</span>
            <h2 class="section-title">The Timeline</h2>

            <div class="timeline">
                {#each schedule as item, i}
                    <div class="timeline-item">
                        <div class="timeline-time">{item.time}</div>
                        <div class="timeline-marker">
                            <div class="marker-dot"></div>
                            {#if i < schedule.length - 1}
                                <div class="marker-line"></div>
                            {/if}
                        </div>
                        <div class="timeline-content">
                            <h3 class="timeline-title">{item.title}</h3>
                            <p class="timeline-subtitle">{item.subtitle}</p>
                            <span class="timeline-duration"
                                >{item.duration}</span
                            >
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- Big Statement -->
    <section class="statement-section">
        <div class="statement-bg"></div>
        <div class="section-container">
            <blockquote class="big-statement">
                <span class="statement-mark">"</span>
                You're not training a tool. You're building a system that knows you
                better than your EA.
            </blockquote>
        </div>
    </section>

    <!-- Checklist Section -->
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
        </div>
    </section>

    <!-- Next Section -->
    {#if nextUrl}
        <section class="next-section">
            <div class="section-container">
                <div class="next-card">
                    <div class="next-content">
                        <span class="next-label">Up Next</span>
                        <h3 class="next-title">
                            Block 2: Deploy Your Agent Fleet
                        </h3>
                        <p class="next-desc">
                            Build 4 AI agents that work autonomously while you
                            sleep.
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
        -webkit-font-smoothing: antialiased;
        min-height: 100vh;
    }

    /* Floating Nav */
    

    

    

    

    

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

    /* Hero */
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
        overflow: hidden;
    }

    .grid-overlay {
        position: absolute;
        inset: 0;
        background-image: linear-gradient(
                rgba(255, 255, 255, 0.02) 1px,
                transparent 1px
            ),
            linear-gradient(
                90deg,
                rgba(255, 255, 255, 0.02) 1px,
                transparent 1px
            );
        background-size: 60px 60px;
        opacity: 0.5;
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
        transition: color 0.2s;
    }

    .back-link:hover {
        color: #fff;
    }

    .hero-badge {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 8px 16px;
        background: rgba(4, 164, 89, 0.15);
        border: 1px solid rgba(4, 164, 89, 0.3);
        border-radius: 100px;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #04a459;
        margin-bottom: 32px;
    }

    .badge-dot {
        width: 8px;
        height: 8px;
        background: #04a459;
        border-radius: 50%;
        animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
        0%,
        100% {
            opacity: 1;
            transform: scale(1);
        }
        50% {
            opacity: 0.5;
            transform: scale(1.2);
        }
    }

    .hero-title {
        font-family: var(--font-heading, "Quicksand"), system-ui, sans-serif;
        font-size: clamp(48px, 10vw, 100px);
        font-weight: 800;
        line-height: 1.1;
        letter-spacing: -0.03em;
        margin: 0 0 32px;
    }

    .title-line {
        display: block;
    }

    .title-line.accent {
        background: linear-gradient(
            135deg,
            #04a459 0%,
            #2ecc71 50%,
            #00ff88 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .hero-tagline {
        font-size: clamp(18px, 2.5vw, 24px);
        font-weight: 300;
        color: #888;
        font-style: italic;
        margin: 0 0 60px;
    }

    .hero-outcomes {
        display: flex;
        gap: 24px;
        flex-wrap: wrap;
    }

    .outcome-card {
        display: flex;
        align-items: flex-start;
        gap: 16px;
        padding: 24px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        min-width: 240px;
        transition: all 0.3s;
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
        border-color: rgba(4, 164, 89, 0.3);
        transform: translateY(-4px);
    }

    .outcome-num {
        font-family: var(--font-heading), system-ui, sans-serif;
        font-size: 32px;
        font-weight: 800;
        color: #04a459;
        line-height: 1;
    }

    .outcome-text {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .outcome-title {
        font-size: 16px;
        font-weight: 600;
        color: #fff;
    }

    .outcome-desc {
        font-size: 14px;
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
        animation: scrollLine 2s ease-in-out infinite;
    }

    @keyframes scrollLine {
        0%,
        100% {
            transform: scaleY(1);
            opacity: 1;
        }
        50% {
            transform: scaleY(0.5);
            opacity: 0.5;
        }
    }

    /* Section Styles */
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
        color: #04a459;
        margin-bottom: 16px;
    }

    .section-title {
        font-family: var(--font-heading), system-ui, sans-serif;
        font-size: clamp(36px, 6vw, 56px);
        font-weight: 800;
        letter-spacing: -0.02em;
        margin: 0 0 24px;
    }

    .section-subtitle {
        font-size: 18px;
        color: #888;
        margin: 0 0 48px;
        max-width: 600px;
    }

    /* Concept Section */
    .concept-section {
        padding: 160px 0;
        background: #0a0a0b;
    }

    .concept-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 80px;
        align-items: center;
    }

    .concept-text {
        font-size: 20px;
        line-height: 1.7;
        color: #888;
        margin: 0 0 24px;
    }

    .concept-text em {
        color: #666;
    }
    .concept-text.highlight {
        color: #fff;
        font-weight: 500;
    }

    .command-structure {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: 32px;
    }

    .structure-title {
        font-weight: 700;
        font-size: 18px;
        margin-bottom: 24px;
        color: #04a459;
    }

    .structure-tree {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .tree-item {
        font-size: 15px;
        color: #fff;
        padding-left: 16px;
        border-left: 2px solid rgba(4, 164, 89, 0.3);
    }

    .tree-item span {
        color: #666;
        font-size: 13px;
    }

    /* Code Card */
    .claude-section,
    .skills-section {
        padding: 120px 0;
        background: transparent;
    }

    .code-card {
        background: #111;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        overflow: hidden;
        margin-bottom: 32px;
    }

    .code-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 24px;
        background: rgba(255, 255, 255, 0.03);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .code-filename {
        font-family: "JetBrains Mono", monospace;
        font-size: 13px;
        color: #04a459;
    }

    .copy-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
        background: rgba(4, 164, 89, 0.1);
        border: 1px solid rgba(4, 164, 89, 0.3);
        border-radius: 8px;
        color: #04a459;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
    }

    .copy-btn:hover {
        background: rgba(4, 164, 89, 0.2);
    }

    .code-content {
        padding: 24px;
        font-family: "JetBrains Mono", monospace;
        font-size: 13px;
        line-height: 1.7;
        color: #ccc;
        margin: 0;
        overflow-x: auto;
        white-space: pre-wrap;
    }

    /* Tip/Aha Boxes */
    .tip-box,
    .aha-box {
        display: flex;
        gap: 16px;
        padding: 24px;
        border-radius: 12px;
    }

    .tip-box {
        background: rgba(59, 130, 246, 0.1);
        border: 1px solid rgba(59, 130, 246, 0.2);
    }

    .aha-box {
        background: rgba(4, 164, 89, 0.1);
        border: 1px solid rgba(4, 164, 89, 0.2);
    }

    .tip-icon,
    .aha-icon {
        font-size: 24px;
        flex-shrink: 0;
    }

    .tip-content,
    .aha-content {
        font-size: 15px;
        line-height: 1.6;
        color: #ccc;
    }

    .tip-content strong,
    .aha-content strong {
        color: #fff;
    }

    /* Learning Section */
    .learning-section {
        padding: 120px 0;
        background: #0a0a0b;
    }

    .learning-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
        margin-bottom: 48px;
    }

    .learning-card {
        padding: 32px;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        transition: all 0.3s;
    }

    .learning-card:hover {
        background: rgba(255, 255, 255, 0.04);
        border-color: rgba(4, 164, 89, 0.3);
        transform: translateY(-4px);
    }

    .learning-icon {
        font-size: 32px;
        margin-bottom: 16px;
    }

    .learning-card h3 {
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 12px;
    }

    .learning-card p {
        font-size: 14px;
        color: #888;
        margin: 0;
        line-height: 1.6;
    }

    .example-box {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        overflow: hidden;
    }

    .example-header {
        padding: 16px 24px;
        background: rgba(255, 255, 255, 0.03);
        font-size: 13px;
        font-weight: 600;
        color: #888;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }

    .example-content {
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .example-content code {
        font-family: "JetBrains Mono", monospace;
        font-size: 13px;
        color: #04a459;
    }

    /* Timeline */
    .timeline-section {
        padding: 120px 0;
        background: transparent;
    }

    .timeline {
        display: flex;
        flex-direction: column;
    }

    .timeline-item {
        display: grid;
        grid-template-columns: 60px 40px 1fr;
        gap: 24px;
        padding: 24px 0;
    }

    .timeline-time {
        font-family: var(--font-heading), system-ui, sans-serif;
        font-size: 14px;
        font-weight: 600;
        color: #666;
        text-align: right;
        padding-top: 4px;
    }

    .timeline-marker {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .marker-dot {
        width: 12px;
        height: 12px;
        background: #04a459;
        border-radius: 50%;
        box-shadow: 0 0 20px rgba(4, 164, 89, 0.5);
    }

    .marker-line {
        flex: 1;
        width: 2px;
        background: linear-gradient(
            180deg,
            #04a459 0%,
            rgba(4, 164, 89, 0.1) 100%
        );
        margin-top: 8px;
    }

    .timeline-content {
        padding-bottom: 24px;
    }

    .timeline-title {
        font-family: var(--font-heading), system-ui, sans-serif;
        font-size: 20px;
        font-weight: 700;
        margin: 0 0 8px;
    }

    .timeline-subtitle {
        font-size: 15px;
        color: #888;
        margin: 0 0 12px;
    }

    .timeline-duration {
        display: inline-block;
        padding: 4px 12px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 100px;
        font-size: 12px;
        color: #666;
    }

    /* Statement */
    .statement-section {
        position: relative;
        padding: 160px 0;
        overflow: hidden;
    }

    .statement-bg {
        position: absolute;
        inset: 0;
        background: radial-gradient(
            ellipse at center,
            rgba(4, 164, 89, 0.15) 0%,
            transparent 60%
        );
    }

    .big-statement {
        position: relative;
        font-family: var(--font-heading), system-ui, sans-serif;
        font-size: clamp(28px, 4vw, 48px);
        font-weight: 600;
        line-height: 1.4;
        text-align: center;
        margin: 0;
        color: #fff;
    }

    .statement-mark {
        position: absolute;
        top: -40px;
        left: -20px;
        font-size: 150px;
        font-weight: 800;
        color: rgba(4, 164, 89, 0.1);
        line-height: 1;
    }

    /* Checklist */
    .checklist-section {
        padding: 120px 0;
        background: #0a0a0b;
    }

    .checklist-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 16px;
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
        transition: all 0.2s;
    }

    .checklist-item:hover {
        background: rgba(255, 255, 255, 0.04);
        border-color: rgba(255, 255, 255, 0.1);
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
        transition: all 0.2s;
    }

    .check-box svg {
        opacity: 0;
        transition: opacity 0.2s;
    }

    .checklist-item input:checked + .check-box {
        background: #04a459;
        border-color: #04a459;
    }

    .checklist-item input:checked + .check-box svg {
        opacity: 1;
    }

    .check-text {
        font-size: 15px;
        color: #ccc;
        line-height: 1.5;
    }

    /* Next Section */
    .next-section {
        padding: 80px 0 120px;
        background: transparent;
    }

    .next-card {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 48px;
        background: linear-gradient(
            135deg,
            rgba(4, 164, 89, 0.1) 0%,
            rgba(4, 164, 89, 0.02) 100%
        );
        border: 1px solid rgba(4, 164, 89, 0.2);
        border-radius: 24px;
    }

    .next-label {
        display: block;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        color: #04a459;
        margin-bottom: 12px;
    }

    .next-title {
        font-family: var(--font-heading), system-ui, sans-serif;
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
        background: #04a459;
        color: #fff;
        text-decoration: none;
        font-weight: 600;
        font-size: 16px;
        border-radius: 12px;
        transition: all 0.3s;
    }

    .next-btn:hover {
        background: #05b863;
        transform: translateX(4px);
    }

    /* Responsive */
    @media (max-width: 1024px) {
        .concept-grid {
            grid-template-columns: 1fr;
            gap: 48px;
        }
        .learning-grid {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width: 768px) {
        .hero {
            padding: 40px 24px;
        }
        .section-container {
            padding: 0 24px;
        }
        .outcome-card {
            min-width: 100%;
        }
        .next-card {
            flex-direction: column;
            gap: 32px;
            text-align: center;
        }
    }
</style>
