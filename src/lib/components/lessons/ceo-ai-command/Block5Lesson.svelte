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
    <title>Block 5: Map to Your Business | code:zero</title>
    <meta
        name="description"
        content="Identify AI opportunities across your organization with a structured audit framework."
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
                Block 05 · 30 min
            </div>

            <h1 class="hero-title">
                <span class="title-line">Map to Your</span>
                <span class="title-line accent">Business</span>
            </h1>

            <p class="hero-tagline">
                "Let's look at your business through an AI lens. Where are the
                opportunities?"
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

    <!-- AI Audit Framework -->
    <section class="audit-section">
        <div class="section-container">
            <span class="section-label">The Framework</span>
            <h2 class="section-title">AI Opportunity Audit</h2>
            <p class="section-subtitle">
                Use these 5 categories to discover where AI can help your
                business.
            </p>

            <div class="categories-grid">
                {#each categories as cat, i}
                    <div class="category-card">
                        <span class="cat-num"
                            >{String(i + 1).padStart(2, "0")}</span
                        >
                        <h3>{cat.name}</h3>
                        <p class="cat-question">{cat.question}</p>
                        <span class="cat-examples">{cat.examples}</span>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- Prioritization -->
    <section class="priority-section">
        <div class="section-container">
            <span class="section-label">Score Each</span>
            <h2 class="section-title">Prioritization Matrix</h2>

            <div class="matrix-grid">
                <div class="matrix-card">
                    <div class="matrix-icon">💥</div>
                    <h3>Impact</h3>
                    <p>How much time/money would this save?</p>
                    <span class="matrix-scale">Score 1-5</span>
                </div>
                <div class="matrix-card">
                    <div class="matrix-icon">🎯</div>
                    <h3>Feasibility</h3>
                    <p>How easy with tools we learned today?</p>
                    <span class="matrix-scale">Score 1-5</span>
                </div>
                <div class="matrix-card">
                    <div class="matrix-icon">⚡</div>
                    <h3>Excitement</h3>
                    <p>How energized are you about this?</p>
                    <span class="matrix-scale">Score 1-5</span>
                </div>
            </div>

            <div class="priority-buckets">
                <div class="bucket quick">
                    <h4>🚀 Quick Wins</h4>
                    <p>High feasibility + High impact</p>
                    <span>Do this month</span>
                </div>
                <div class="bucket strategic">
                    <h4>📈 Strategic Bets</h4>
                    <p>High impact + Lower feasibility</p>
                    <span>Plan for Q2</span>
                </div>
                <div class="bucket backlog">
                    <h4>📝 Nice to Have</h4>
                    <p>Lower scores across the board</p>
                    <span>Backlog</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Role-Specific -->
    <section class="roles-section">
        <div class="section-container">
            <span class="section-label">Team Potential</span>
            <h2 class="section-title">Role-Specific Opportunities</h2>

            <div class="roles-grid">
                {#each roles as r}
                    <div class="role-card">
                        <div class="role-header">
                            <span class="role-title">{r.role}</span>
                        </div>
                        <p class="role-wins">{r.wins}</p>
                        <p class="role-quote">"{r.quote}"</p>
                    </div>
                {/each}
            </div>
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
        </div>
    </section>

    {#if nextUrl}
        <section class="next-section">
            <div class="section-container">
                <div class="next-card">
                    <div class="next-content">
                        <span class="next-label">Final Block</span>
                        <h3 class="next-title">Block 6: Your Playbook</h3>
                        <p class="next-desc">
                            Document everything and prepare to evangelize to
                            your team.
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
    .hero-badge {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 8px 16px;
        background: rgba(245, 158, 11, 0.15);
        border: 1px solid rgba(245, 158, 11, 0.3);
        border-radius: 100px;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #f59e0b;
        margin-bottom: 32px;
    }
    .badge-dot {
        width: 8px;
        height: 8px;
        background: #f59e0b;
        border-radius: 50%;
        animation: pulse 2s ease-in-out infinite;
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
        background: linear-gradient(135deg, #f59e0b, #fbbf24, #fcd34d);
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
        font-weight: 800;
        color: #f59e0b;
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
        color: #f59e0b;
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

    .audit-section {
        padding: 160px 0;
        background: #0a0a0b;
    }
    .categories-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 20px;
    }
    .category-card {
        padding: 28px;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
    }
    .category-card:hover {
        border-color: rgba(245, 158, 11, 0.3);
    }
    .cat-num {
        font-size: 20px;
        font-weight: 800;
        color: #f59e0b;
    }
    .category-card h3 {
        font-size: 18px;
        font-weight: 600;
        margin: 12px 0 8px;
    }
    .cat-question {
        font-size: 14px;
        color: #888;
        margin: 0 0 12px;
    }
    .cat-examples {
        font-size: 12px;
        color: #666;
        font-style: italic;
    }

    .priority-section {
        padding: 120px 0;
        background: transparent;
    }
    .matrix-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
        margin-bottom: 48px;
    }
    .matrix-card {
        padding: 28px;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        text-align: center;
    }
    .matrix-icon {
        font-size: 36px;
        margin-bottom: 16px;
    }
    .matrix-card h3 {
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 8px;
    }
    .matrix-card p {
        font-size: 14px;
        color: #888;
        margin: 0 0 12px;
    }
    .matrix-scale {
        font-size: 12px;
        color: #f59e0b;
        font-weight: 600;
    }

    .priority-buckets {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
    }
    .bucket {
        padding: 24px;
        border-radius: 12px;
        text-align: center;
    }
    .bucket h4 {
        font-size: 16px;
        margin: 0 0 8px;
    }
    .bucket p {
        font-size: 13px;
        color: #888;
        margin: 0 0 8px;
    }
    .bucket span {
        font-size: 12px;
        font-weight: 600;
    }
    .bucket.quick {
        background: rgba(34, 197, 94, 0.1);
        border: 1px solid rgba(34, 197, 94, 0.2);
    }
    .bucket.quick span {
        color: #22c55e;
    }
    .bucket.strategic {
        background: rgba(59, 130, 246, 0.1);
        border: 1px solid rgba(59, 130, 246, 0.2);
    }
    .bucket.strategic span {
        color: #3b82f6;
    }
    .bucket.backlog {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .bucket.backlog span {
        color: #666;
    }

    .roles-section {
        padding: 120px 0;
        background: #0a0a0b;
    }
    .roles-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
    }
    .role-card {
        padding: 28px;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
    }
    .role-header {
        margin-bottom: 16px;
    }
    .role-title {
        font-size: 20px;
        font-weight: 700;
        color: #f59e0b;
    }
    .role-wins {
        font-size: 14px;
        color: #888;
        margin: 0 0 16px;
    }
    .role-quote {
        font-size: 14px;
        color: #ccc;
        font-style: italic;
        margin: 0;
    }

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
        background: #f59e0b;
        border-color: #f59e0b;
    }
    .checklist-item input:checked + .check-box svg {
        opacity: 1;
    }
    .check-text {
        font-size: 15px;
        color: #ccc;
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
            rgba(245, 158, 11, 0.1) 0%,
            rgba(245, 158, 11, 0.02) 100%
        );
        border: 1px solid rgba(245, 158, 11, 0.2);
        border-radius: 24px;
    }
    .next-label {
        display: block;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        color: #f59e0b;
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
        background: #f59e0b;
        color: #fff;
        text-decoration: none;
        font-weight: 600;
        border-radius: 12px;
    }
    .next-btn:hover {
        background: #fbbf24;
    }

    @media (max-width: 768px) {
        .hero,
        .section-container {
            padding: 40px 24px;
        }
        .matrix-grid,
        .priority-buckets,
        .roles-grid {
            grid-template-columns: 1fr;
        }
        .next-card {
            flex-direction: column;
            gap: 32px;
            text-align: center;
        }
    }
</style>
