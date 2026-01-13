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
    <title>Block 2: Deploy Your Agent Fleet | code:zero</title>
    <meta
        name="description"
        content="Build 4 AI agents that work autonomously: daily briefing, competitive intelligence, board prep, and email ghostwriter."
    />
</svelte:head>

<div class="lesson-wrapper">
    <!-- Floating Nav -->
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

    <!-- Hero Section -->
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
                Block 02 · 90 min
            </div>

            <h1 class="hero-title">
                <span class="title-line">Deploy Your</span>
                <span class="title-line accent">Agent Fleet</span>
            </h1>

            <p class="hero-tagline">
                "An agent isn't waiting for you to ask questions. It's doing
                work autonomously."
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

    <!-- Agent Concept Section -->
    <section class="concept-section">
        <div class="section-container">
            <span class="section-label">The Big Shift</span>
            <h2 class="section-title">From chatbot to autonomous agent</h2>

            <div class="concept-comparison">
                <div class="compare-card old">
                    <div class="compare-header">
                        <span class="compare-icon">💬</span>
                        Chatbot
                    </div>
                    <ul class="compare-list">
                        <li>Waits for you to ask</li>
                        <li>One question at a time</li>
                        <li>Forgets after each chat</li>
                        <li>You initiate everything</li>
                    </ul>
                </div>
                <div class="compare-arrow">→</div>
                <div class="compare-card new">
                    <div class="compare-header">
                        <span class="compare-icon">🤖</span>
                        Agent
                    </div>
                    <ul class="compare-list">
                        <li>Works while you sleep</li>
                        <li>Handles complex workflows</li>
                        <li>Remembers and learns</li>
                        <li>Delivers results proactively</li>
                    </ul>
                </div>
            </div>

            <div class="aha-box">
                <div class="aha-icon">🌅</div>
                <div class="aha-content">
                    <strong>Tomorrow morning:</strong> One of these agents will have
                    already done work for you before you wake up.
                </div>
            </div>
        </div>
    </section>

    <!-- Agents Section -->
    <section class="agents-section">
        <div class="section-container">
            <span class="section-label">Your Fleet</span>
            <h2 class="section-title">4 Agents, 4 Superpowers</h2>

            <div class="agents-grid">
                {#each agents as agent, i}
                    <div
                        class="agent-card"
                        class:expanded={expandedAgent === i}
                    >
                        <button
                            class="agent-header"
                            onclick={() => toggleAgent(i)}
                        >
                            <div class="agent-info">
                                <span class="agent-number"
                                    >{String(i + 1).padStart(2, "0")}</span
                                >
                                <div class="agent-meta">
                                    <h3 class="agent-name">{agent.name}</h3>
                                    <span class="agent-trigger"
                                        >{agent.trigger}</span
                                    >
                                </div>
                            </div>
                            <svg
                                class="agent-chevron"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </button>

                        {#if expandedAgent === i}
                            <div class="agent-content">
                                <p class="agent-desc">{agent.description}</p>

                                <div class="prompt-card">
                                    <div class="prompt-header">
                                        <span>Agent Prompt</span>
                                        <button
                                            class="copy-btn"
                                            onclick={() =>
                                                copyToClipboard(
                                                    agent.prompt,
                                                    i,
                                                )}
                                        >
                                            {#if copiedIndex === i}
                                                <svg
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                >
                                                    <polyline
                                                        points="20 6 9 17 4 12"
                                                    />
                                                </svg>
                                                Copied
                                            {:else}
                                                <svg
                                                    width="14"
                                                    height="14"
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
                                                    />
                                                    <path
                                                        d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                                                    />
                                                </svg>
                                                Copy
                                            {/if}
                                        </button>
                                    </div>
                                    <pre
                                        class="prompt-content">{agent.prompt}</pre>
                                </div>
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- n8n Preview Section -->
    <section class="n8n-section">
        <div class="section-container">
            <span class="section-label">Making It Automatic</span>
            <h2 class="section-title">Schedule with n8n</h2>
            <p class="section-subtitle">
                We'll dive deep into n8n in Block 3. Here's a preview of how
                your briefing agent gets scheduled:
            </p>

            <div class="workflow-preview">
                <div class="workflow-step">
                    <div class="step-icon">⏰</div>
                    <div class="step-content">
                        <h4>Schedule Trigger</h4>
                        <p>7:00 AM daily</p>
                    </div>
                </div>
                <div class="workflow-arrow">→</div>
                <div class="workflow-step">
                    <div class="step-icon">📅</div>
                    <div class="step-content">
                        <h4>Pull Calendar</h4>
                        <p>Get today's meetings</p>
                    </div>
                </div>
                <div class="workflow-arrow">→</div>
                <div class="workflow-step">
                    <div class="step-icon">🤖</div>
                    <div class="step-content">
                        <h4>AI Node</h4>
                        <p>Generate briefing</p>
                    </div>
                </div>
                <div class="workflow-arrow">→</div>
                <div class="workflow-step">
                    <div class="step-icon">📧</div>
                    <div class="step-content">
                        <h4>Send Email</h4>
                        <p>Deliver to inbox</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Big Statement -->
    <section class="statement-section">
        <div class="statement-bg"></div>
        <div class="section-container">
            <blockquote class="big-statement">
                <span class="statement-mark">"</span>
                By tomorrow morning, one of these agents will already have done work
                for you.
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
                        <h3 class="next-title">Block 3: Automation Power</h3>
                        <p class="next-desc">
                            Connect everything with n8n workflows. Zoom → Slack,
                            Email triage, and more.
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

    /* Hero - Same as Block 1 */
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
        background: rgba(255, 107, 53, 0.15);
        border: 1px solid rgba(255, 107, 53, 0.3);
        border-radius: 100px;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #ff6b35;
        margin-bottom: 32px;
    }

    .badge-dot {
        width: 8px;
        height: 8px;
        background: #ff6b35;
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
            #ff6b35 0%,
            #ff9f1c 50%,
            #ffbf69 100%
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
        border-color: rgba(255, 107, 53, 0.3);
        transform: translateY(-4px);
    }

    .outcome-num {
        font-family: var(--font-heading), system-ui, sans-serif;
        font-size: 28px;
        font-weight: 800;
        color: #ff6b35;
        line-height: 1;
    }

    .outcome-text {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .outcome-title {
        font-size: 15px;
        font-weight: 600;
        color: #fff;
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
        color: #ff6b35;
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

    .concept-comparison {
        display: flex;
        align-items: stretch;
        gap: 24px;
        margin-bottom: 48px;
    }

    .compare-card {
        flex: 1;
        padding: 32px;
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .compare-card.old {
        background: rgba(255, 255, 255, 0.02);
    }

    .compare-card.new {
        background: linear-gradient(
            135deg,
            rgba(255, 107, 53, 0.1) 0%,
            rgba(255, 107, 53, 0.02) 100%
        );
        border-color: rgba(255, 107, 53, 0.3);
    }

    .compare-header {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 24px;
    }

    .compare-icon {
        font-size: 28px;
    }

    .compare-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .compare-list li {
        font-size: 15px;
        color: #888;
        padding-left: 24px;
        position: relative;
    }

    .compare-list li::before {
        content: "•";
        position: absolute;
        left: 0;
        color: #444;
    }

    .compare-card.new .compare-list li {
        color: #ccc;
    }
    .compare-card.new .compare-list li::before {
        color: #ff6b35;
    }

    .compare-arrow {
        display: flex;
        align-items: center;
        font-size: 32px;
        color: #ff6b35;
    }

    .aha-box {
        display: flex;
        gap: 16px;
        padding: 24px;
        background: rgba(255, 107, 53, 0.1);
        border: 1px solid rgba(255, 107, 53, 0.2);
        border-radius: 12px;
    }

    .aha-icon {
        font-size: 24px;
        flex-shrink: 0;
    }

    .aha-content {
        font-size: 15px;
        line-height: 1.6;
        color: #ccc;
    }
    .aha-content strong {
        color: #fff;
    }

    /* Agents Section */
    .agents-section {
        padding: 120px 0;
        background: transparent;
    }

    .agents-grid {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .agent-card {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        overflow: hidden;
        transition: all 0.3s;
    }

    .agent-card:hover {
        border-color: rgba(255, 255, 255, 0.15);
    }
    .agent-card.expanded {
        border-color: rgba(255, 107, 53, 0.3);
    }

    .agent-header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 24px;
        background: none;
        border: none;
        color: #fff;
        cursor: pointer;
        text-align: left;
    }

    .agent-info {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .agent-number {
        font-family: var(--font-heading), system-ui, sans-serif;
        font-size: 24px;
        font-weight: 800;
        color: #ff6b35;
    }

    .agent-meta {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .agent-name {
        font-size: 18px;
        font-weight: 600;
        margin: 0;
    }
    .agent-trigger {
        font-size: 13px;
        color: #666;
    }

    .agent-chevron {
        color: #666;
        transition: transform 0.3s;
    }

    .agent-card.expanded .agent-chevron {
        transform: rotate(180deg);
        color: #ff6b35;
    }

    .agent-content {
        padding: 0 24px 24px;
        animation: slideDown 0.3s ease-out;
    }

    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .agent-desc {
        font-size: 15px;
        color: #888;
        line-height: 1.7;
        margin: 0 0 24px;
    }

    .prompt-card {
        background: #111;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        overflow: hidden;
    }

    .prompt-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 20px;
        background: rgba(255, 255, 255, 0.03);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 13px;
        color: #888;
    }

    .copy-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        background: rgba(255, 107, 53, 0.1);
        border: 1px solid rgba(255, 107, 53, 0.3);
        border-radius: 6px;
        color: #ff6b35;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
    }

    .copy-btn:hover {
        background: rgba(255, 107, 53, 0.2);
    }

    .prompt-content {
        padding: 20px;
        font-family: "JetBrains Mono", monospace;
        font-size: 12px;
        line-height: 1.7;
        color: #aaa;
        margin: 0;
        overflow-x: auto;
        white-space: pre-wrap;
    }

    /* n8n Section */
    .n8n-section {
        padding: 120px 0;
        background: #0a0a0b;
    }

    .workflow-preview {
        display: flex;
        align-items: stretch;
        gap: 16px;
        flex-wrap: wrap;
    }

    .workflow-step {
        flex: 1;
        min-width: 150px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 24px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        text-align: center;
    }

    .step-icon {
        font-size: 32px;
        margin-bottom: 16px;
    }
    .step-content h4 {
        font-size: 14px;
        font-weight: 600;
        margin: 0 0 4px;
    }
    .step-content p {
        font-size: 12px;
        color: #666;
        margin: 0;
    }

    .workflow-arrow {
        display: flex;
        align-items: center;
        font-size: 24px;
        color: #ff6b35;
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
            rgba(255, 107, 53, 0.15) 0%,
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
        color: rgba(255, 107, 53, 0.1);
        line-height: 1;
    }

    /* Checklist */
    .checklist-section {
        padding: 120px 0;
        background: transparent;
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
        background: #ff6b35;
        border-color: #ff6b35;
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
        background: #0f0f10;
    }

    .next-card {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 48px;
        background: linear-gradient(
            135deg,
            rgba(255, 107, 53, 0.1) 0%,
            rgba(255, 107, 53, 0.02) 100%
        );
        border: 1px solid rgba(255, 107, 53, 0.2);
        border-radius: 24px;
    }

    .next-label {
        display: block;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        color: #ff6b35;
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
        background: #ff6b35;
        color: #fff;
        text-decoration: none;
        font-weight: 600;
        font-size: 16px;
        border-radius: 12px;
        transition: all 0.3s;
    }

    .next-btn:hover {
        background: #ff8c5a;
        transform: translateX(4px);
    }

    /* Responsive */
    @media (max-width: 768px) {
        .hero {
            padding: 40px 24px;
        }
        .section-container {
            padding: 0 24px;
        }
        .concept-comparison {
            flex-direction: column;
        }
        .compare-arrow {
            transform: rotate(90deg);
            justify-content: center;
        }
        .workflow-preview {
            flex-direction: column;
        }
        .workflow-arrow {
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
