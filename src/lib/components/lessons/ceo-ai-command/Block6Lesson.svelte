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
    <title>Block 6: Your Playbook | code:zero</title>
    <meta
        name="description"
        content="Document everything, prepare to evangelize to your team, and plan your next steps."
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
                Block 06 · 20 min · Final
            </div>

            <h1 class="hero-title">
                <span class="title-line">Your</span>
                <span class="title-line accent">Playbook</span>
            </h1>

            <p class="hero-tagline">
                "This morning you were using AI like everyone else. Now you have
                an AI Command Center."
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

    <!-- What You Built -->
    <section class="built-section">
        <div class="section-container">
            <span class="section-label">The Transformation</span>
            <h2 class="section-title">What You Built Today</h2>

            <div class="built-grid">
                {#each builtItems as item, i}
                    <div class="built-card">
                        <span class="built-check">✓</span>
                        <span class="built-text">{item}</span>
                    </div>
                {/each}
            </div>

            <div class="transformation-box">
                <div class="transform-side before">
                    <h4>Before</h4>
                    <ul>
                        <li>Using AI like a search engine</li>
                        <li>One-off prompts</li>
                        <li>Manual follow-ups</li>
                        <li>Unsure what's possible</li>
                    </ul>
                </div>
                <div class="transform-arrow">→</div>
                <div class="transform-side after">
                    <h4>After</h4>
                    <ul>
                        <li>AI system that knows your business</li>
                        <li>Autonomous agents 24/7</li>
                        <li>Automated workflows</li>
                        <li>Clear roadmap for company</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Team Scripts -->
    <section class="scripts-section">
        <div class="section-container">
            <span class="section-label">Monday Morning</span>
            <h2 class="section-title">What to Tell Your Team</h2>
            <p class="section-subtitle">
                When your CTO asks "how was that AI training?" — here's what you
                say:
            </p>

            <div class="scripts-grid">
                {#each scripts as script, i}
                    <div class="script-card">
                        <p>{script}</p>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- Playbook Template -->
    <section class="playbook-section">
        <div class="section-container">
            <span class="section-label">Your Document</span>
            <h2 class="section-title">CEO AI Playbook</h2>

            <div class="code-card">
                <div class="code-header">
                    <span class="code-filename">Your-AI-Playbook.md</span>
                    <button
                        class="copy-btn"
                        onclick={() => copyToClipboard(playbookTemplate, 0)}
                    >
                        {#if copiedIndex === 0}
                            <svg
                                width="14"
                                height="14"
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
                            Copy Template
                        {/if}
                    </button>
                </div>
                <pre class="code-content">{playbookTemplate}</pre>
            </div>
        </div>
    </section>

    <!-- Next Steps -->
    <section class="next-steps-section">
        <div class="section-container">
            <span class="section-label">After Today</span>
            <h2 class="section-title">Your Next Steps</h2>

            <div class="steps-grid">
                {#each nextSteps as step}
                    <div class="step-card">
                        <span class="step-icon">{step.icon}</span>
                        <h3>{step.title}</h3>
                        <p>{step.desc}</p>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- Final Statement -->
    <section class="statement-section">
        <div class="statement-bg"></div>
        <div class="section-container">
            <blockquote class="big-statement">
                <span class="statement-mark">"</span>
                Go home, get some sleep, and tomorrow morning... check your briefing
                email.
            </blockquote>
        </div>
    </section>

    <!-- Completion -->
    <section class="completion-section">
        <div class="section-container">
            <div class="completion-card">
                <div class="completion-badge">🎉</div>
                <h2>Course Complete</h2>
                <p>You've built your AI Command Center. It grows with you.</p>
                <a href={backUrl} class="completion-btn">
                    Back to Dashboard
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
        background: linear-gradient(135deg, #04a459, #2ecc71, #00ff88);
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
        }
    }
    .outcome-num {
        font-size: 28px;
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
        color: #04a459;
        margin-bottom: 16px;
    }
    .section-title {
        font-size: clamp(36px, 6vw, 56px);
        font-weight: 800;
        margin: 0 0 24px;
    }
    .section-subtitle {
        font-size: 18px;
        color: #888;
        margin: 0 0 48px;
    }

    .built-section {
        padding: 160px 0;
        background: #0a0a0b;
    }
    .built-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 16px;
        margin-bottom: 48px;
    }
    .built-card {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 20px 24px;
        background: rgba(4, 164, 89, 0.1);
        border: 1px solid rgba(4, 164, 89, 0.2);
        border-radius: 12px;
    }
    .built-check {
        color: #04a459;
        font-size: 20px;
        font-weight: 700;
    }
    .built-text {
        font-size: 15px;
        color: #ccc;
    }

    .transformation-box {
        display: flex;
        align-items: stretch;
        gap: 32px;
    }
    .transform-side {
        flex: 1;
        padding: 28px;
        border-radius: 16px;
    }
    .transform-side.before {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .transform-side.after {
        background: rgba(4, 164, 89, 0.1);
        border: 1px solid rgba(4, 164, 89, 0.2);
    }
    .transform-side h4 {
        font-size: 14px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: #666;
        margin: 0 0 16px;
    }
    .transform-side.after h4 {
        color: #04a459;
    }
    .transform-side ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    .transform-side li {
        font-size: 14px;
        color: #888;
    }
    .transform-side.after li {
        color: #ccc;
    }
    .transform-arrow {
        display: flex;
        align-items: center;
        font-size: 32px;
        color: #04a459;
    }

    .scripts-section {
        padding: 120px 0;
        background: transparent;
    }
    .scripts-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
    }
    .script-card {
        padding: 24px;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
    }
    .script-card p {
        font-size: 15px;
        color: #ccc;
        font-style: italic;
        margin: 0;
        line-height: 1.6;
    }

    .playbook-section {
        padding: 120px 0;
        background: #0a0a0b;
    }
    .code-card {
        background: #111;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        overflow: hidden;
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
    }
    .copy-btn:hover {
        background: rgba(4, 164, 89, 0.2);
    }
    .code-content {
        padding: 24px;
        font-family: "JetBrains Mono", monospace;
        font-size: 12px;
        line-height: 1.7;
        color: #aaa;
        margin: 0;
        white-space: pre-wrap;
    }

    .next-steps-section {
        padding: 120px 0;
        background: transparent;
    }
    .steps-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
    }
    .step-card {
        padding: 28px;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        text-align: center;
    }
    .step-icon {
        font-size: 36px;
        display: block;
        margin-bottom: 16px;
    }
    .step-card h3 {
        font-size: 16px;
        font-weight: 600;
        margin: 0 0 8px;
    }
    .step-card p {
        font-size: 13px;
        color: #888;
        margin: 0;
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
            rgba(4, 164, 89, 0.15) 0%,
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
        color: rgba(4, 164, 89, 0.1);
    }

    .completion-section {
        padding: 80px 0 160px;
        background: #0f0f10;
    }
    .completion-card {
        text-align: center;
        padding: 64px;
        background: linear-gradient(
            135deg,
            rgba(4, 164, 89, 0.15) 0%,
            rgba(4, 164, 89, 0.05) 100%
        );
        border: 1px solid rgba(4, 164, 89, 0.3);
        border-radius: 32px;
    }
    .completion-badge {
        font-size: 64px;
        margin-bottom: 24px;
    }
    .completion-card h2 {
        font-size: 36px;
        font-weight: 800;
        margin: 0 0 16px;
    }
    .completion-card p {
        font-size: 18px;
        color: #888;
        margin: 0 0 32px;
    }
    .completion-btn {
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
    }
    .completion-btn:hover {
        background: #05b863;
    }

    @media (max-width: 768px) {
        .hero,
        .section-container {
            padding: 40px 24px;
        }
        .transformation-box {
            flex-direction: column;
        }
        .transform-arrow {
            transform: rotate(90deg);
            justify-content: center;
        }
        .scripts-grid,
        .steps-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
