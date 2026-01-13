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
        { icon: "01", title: "Today's Focus", desc: "3 daily priorities" },
        { icon: "02", title: "Prompts Library", desc: "One-click AI access" },
        { icon: "03", title: "Decision Log", desc: "Track major decisions" },
        { icon: "04", title: "Quick Capture", desc: "Scratchpad for ideas" },
    ];

    const modules = [
        {
            name: "Today's Focus",
            time: "10 min",
            description:
                "Set 3 priorities each morning. Simple but powerful — forces you to think about what actually matters today.",
            schema: `CREATE TABLE focus (
  id INTEGER PRIMARY KEY,
  focus TEXT NOT NULL,
  completed BOOLEAN DEFAULT 0,
  date DATE DEFAULT CURRENT_DATE
);`,
        },
        {
            name: "AI Prompts Library",
            time: "10 min",
            description:
                "One-click access to all your skills. Click a card, it copies to clipboard, paste into Claude. Zero friction.",
            schema: `CREATE TABLE prompts (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  prompt TEXT NOT NULL,
  category TEXT,
  uses INTEGER DEFAULT 0
);`,
        },
        {
            name: "Decision Log",
            time: "10 min",
            description:
                "Track major decisions with context. When you look back in 6 months, you'll know why you made that call.",
            schema: `CREATE TABLE decisions (
  id INTEGER PRIMARY KEY,
  decision TEXT NOT NULL,
  context TEXT,
  outcome TEXT,
  date DATE DEFAULT CURRENT_DATE
);`,
        },
        {
            name: "Quick Capture",
            time: "10 min",
            description:
                "Scratchpad for ideas and notes. Get thoughts out of your head and into a system.",
            schema: `CREATE TABLE captures (
  id INTEGER PRIMARY KEY,
  note TEXT NOT NULL,
  tags TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
        },
    ];

    const checklist = [
        "SvelteKit project created and running locally",
        "SQLite database file visible (dashboard.db)",
        "Today's Focus module working",
        "Prompts library with copy-to-clipboard",
        "Decision Log and Quick Capture functional",
        "DB Browser shows your data",
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
    <title>Block 4: Build Your Dashboard | code:zero</title>
    <meta
        name="description"
        content="Create a personal CEO dashboard with SvelteKit and SQLite - runs locally, data stays with you."
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
                Block 04 · 60 min
            </div>

            <h1 class="hero-title">
                <span class="title-line">Build Your</span>
                <span class="title-line accent">Dashboard</span>
            </h1>

            <p class="hero-tagline">
                "A single screen where everything lives. Your cockpit."
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

    <!-- Tech Stack -->
    <section class="tech-section">
        <div class="section-container">
            <span class="section-label">The Stack</span>
            <h2 class="section-title">SvelteKit + SQLite</h2>

            <div class="tech-grid">
                <div class="tech-card">
                    <div class="tech-icon">⚡</div>
                    <h3>SvelteKit</h3>
                    <p>Modern web framework. Fast, intuitive, AI-friendly.</p>
                </div>
                <div class="tech-card">
                    <div class="tech-icon">🗄️</div>
                    <h3>SQLite</h3>
                    <p>
                        Your entire database is one file. Back it up, copy it,
                        it's yours.
                    </p>
                </div>
                <div class="tech-card">
                    <div class="tech-icon">🏠</div>
                    <h3>Runs Locally</h3>
                    <p>
                        No login needed. Data stays on your laptop. Private by
                        default.
                    </p>
                </div>
            </div>

            <div class="aha-box">
                <div class="aha-icon">✨</div>
                <div class="aha-content">
                    <strong>Aha moment:</strong> That database file? That's your
                    entire database. Back it up, copy it, it's yours forever.
                </div>
            </div>
        </div>
    </section>

    <!-- Modules -->
    <section class="modules-section">
        <div class="section-container">
            <span class="section-label">Your Modules</span>
            <h2 class="section-title">4 Dashboard Modules</h2>

            <div class="modules-grid">
                {#each modules as module, i}
                    <div class="module-card">
                        <div class="module-header">
                            <span class="module-num"
                                >{String(i + 1).padStart(2, "0")}</span
                            >
                            <div class="module-meta">
                                <h3>{module.name}</h3>
                                <span class="module-time">{module.time}</span>
                            </div>
                        </div>
                        <p class="module-desc">{module.description}</p>
                        <div class="module-schema">
                            <span class="schema-label">Schema</span>
                            <pre>{module.schema}</pre>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- Statement -->
    <section class="statement-section">
        <div class="statement-bg"></div>
        <div class="section-container">
            <blockquote class="big-statement">
                <span class="statement-mark">"</span>
                You just built a real application in an hour.
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
        </div>
    </section>

    {#if nextUrl}
        <section class="next-section">
            <div class="section-container">
                <div class="next-card">
                    <div class="next-content">
                        <span class="next-label">Up Next</span>
                        <h3 class="next-title">
                            Block 5: Map to Your Business
                        </h3>
                        <p class="next-desc">
                            Identify AI opportunities across your organization.
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
        background: rgba(20, 184, 166, 0.15);
        border: 1px solid rgba(20, 184, 166, 0.3);
        border-radius: 100px;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #14b8a6;
        margin-bottom: 32px;
    }
    .badge-dot {
        width: 8px;
        height: 8px;
        background: #14b8a6;
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
        background: linear-gradient(135deg, #14b8a6, #2dd4bf, #5eead4);
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
        border-color: rgba(20, 184, 166, 0.3);
        transform: translateY(-4px);
    }
    .outcome-num {
        font-size: 28px;
        font-weight: 800;
        color: #14b8a6;
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
        color: #14b8a6;
        margin-bottom: 16px;
    }
    .section-title {
        font-size: clamp(36px, 6vw, 56px);
        font-weight: 800;
        margin: 0 0 48px;
    }

    .tech-section {
        padding: 160px 0;
        background: #0a0a0b;
    }
    .tech-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
        margin-bottom: 48px;
    }
    .tech-card {
        padding: 32px;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        text-align: center;
    }
    .tech-card:hover {
        border-color: rgba(20, 184, 166, 0.3);
    }
    .tech-icon {
        font-size: 40px;
        margin-bottom: 16px;
    }
    .tech-card h3 {
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 8px;
    }
    .tech-card p {
        font-size: 14px;
        color: #888;
        margin: 0;
    }

    .aha-box {
        display: flex;
        gap: 16px;
        padding: 24px;
        background: rgba(20, 184, 166, 0.1);
        border: 1px solid rgba(20, 184, 166, 0.2);
        border-radius: 12px;
    }
    .aha-icon {
        font-size: 24px;
    }
    .aha-content {
        font-size: 15px;
        color: #ccc;
    }
    .aha-content strong {
        color: #fff;
    }

    .modules-section {
        padding: 120px 0;
        background: transparent;
    }
    .modules-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
    }
    .module-card {
        padding: 28px;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
    }
    .module-card:hover {
        border-color: rgba(20, 184, 166, 0.3);
    }
    .module-header {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 16px;
    }
    .module-num {
        font-size: 24px;
        font-weight: 800;
        color: #14b8a6;
    }
    .module-meta h3 {
        font-size: 18px;
        font-weight: 600;
        margin: 0;
    }
    .module-time {
        font-size: 12px;
        color: #666;
    }
    .module-desc {
        font-size: 14px;
        color: #888;
        line-height: 1.6;
        margin: 0 0 20px;
    }
    .module-schema {
        background: #111;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        overflow: hidden;
    }
    .schema-label {
        display: block;
        padding: 8px 12px;
        background: rgba(255, 255, 255, 0.03);
        font-size: 11px;
        color: #666;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }
    .module-schema pre {
        padding: 12px;
        font-family: "JetBrains Mono", monospace;
        font-size: 11px;
        color: #14b8a6;
        margin: 0;
        overflow-x: auto;
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
            rgba(20, 184, 166, 0.15) 0%,
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
        color: rgba(20, 184, 166, 0.1);
    }

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
        background: #14b8a6;
        border-color: #14b8a6;
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
            rgba(20, 184, 166, 0.1) 0%,
            rgba(20, 184, 166, 0.02) 100%
        );
        border: 1px solid rgba(20, 184, 166, 0.2);
        border-radius: 24px;
    }
    .next-label {
        display: block;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        color: #14b8a6;
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
        background: #14b8a6;
        color: #fff;
        text-decoration: none;
        font-weight: 600;
        border-radius: 12px;
    }
    .next-btn:hover {
        background: #2dd4bf;
        transform: translateX(4px);
    }

    @media (max-width: 768px) {
        .hero,
        .section-container {
            padding: 40px 24px;
        }
        .tech-grid,
        .modules-grid {
            grid-template-columns: 1fr;
        }
        .next-card {
            flex-direction: column;
            gap: 32px;
            text-align: center;
        }
    }
</style>
