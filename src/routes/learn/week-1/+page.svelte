<script lang="ts">
	const days = [
		{
			day: 1,
			title: "AI Workspace → Live Website",
			tagline: "Set up the system. Use the system. Ship before you leave.",
			ship: ["AI workspace + blog skill", "Live website", "First blog post"],
			wow: "AI workspace + website in ONE day"
		},
		{
			day: 2,
			title: "Users Are Real",
			tagline: "Today your app learns who's using it.",
			ship: ["Working authentication", "Database + RLS", "User profiles"],
			wow: "People can sign up for MY app"
		},
		{
			day: 3,
			title: "Build the Thing",
			tagline: "Today you build what makes your product YOUR product.",
			ship: ["Database table + RLS", "CRUD operations", "Complete feature UI"],
			wow: "My app does something useful"
		},
		{
			day: 4,
			title: "AI Does the Work",
			tagline: "Today your product gets a brain.",
			ship: ["AI API connection", "Custom AI function", "AI-powered feature"],
			wow: "AI is working for MY users"
		},
		{
			day: 5,
			title: "Your AI Content Engine",
			tagline: "Leave Week 1 with a machine that creates for you.",
			ship: ["Content generator", "Social + email drafts", "2-minute demo"],
			wow: "I have a machine that creates for me"
		}
	];

	const outcomes = [
		"CLAUDE.md that captures your project",
		"Blog writer skill (reusable forever)",
		"Live URL anyone can visit",
		"User authentication + database",
		"Core product feature (CRUD)",
		"AI-powered feature for users",
		"Content engine that generates blog + social + email",
		"2-minute demo of your content machine"
	];

	const techStack = [
		{ tool: "Claude Code", day: "1", learn: "AI-first development workflow" },
		{ tool: "CLAUDE.md", day: "1", learn: "Giving AI project context" },
		{ tool: "Skills", day: "1", learn: "Creating reusable AI workflows" },
		{ tool: "SvelteKit", day: "1", learn: "Routes, components, layouts" },
		{ tool: "Vercel", day: "1", learn: "One-click deploys from GitHub" },
		{ tool: "Supabase", day: "2-3", learn: "Auth, database, row-level security" },
		{ tool: "Gemini/ChatGPT", day: "4-5", learn: "API calls, prompt engineering" },
		{ tool: "Content Pipelines", day: "5", learn: "Multi-step AI generation systems" }
	];
</script>

<svelte:head>
	<title>Week 1: AI-First Foundation | code:zero</title>
	<meta name="description" content="Build the system that builds the product. Ship a live website, add auth, build features, integrate AI - all in one week." />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
</svelte:head>

<!-- Navigation -->
<nav class="navbar">
	<div class="nav-container">
		<a href="/learn" class="nav-back">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M19 12H5M12 19l-7-7 7-7"/>
			</svg>
		</a>
		<span class="nav-title">Week 1: AI-First Foundation</span>
		<div class="nav-spacer"></div>
	</div>
</nav>

<!-- Breadcrumb + Hero -->
<section class="week-hero">
	<div class="container">
		<nav class="breadcrumb">
			<a href="/learn">Learn</a>
			<span class="separator">/</span>
			<span class="current">Week 1</span>
		</nav>

		<div class="week-badge">Week 1</div>
		<h1 class="week-title">AI-First Foundation</h1>
		<p class="week-tagline">"Build the system that builds the product."</p>

		<div class="week-promise">
			<p>By Friday, you have:</p>
			<ol>
				<li>An AI workspace that knows YOUR project</li>
				<li>Reusable skills that do work FOR you</li>
				<li>A live product with users and AI features</li>
				<li>A demo you're proud to present</li>
			</ol>
		</div>
	</div>
</section>

<!-- Days Overview -->
<section class="days-section">
	<div class="container">
		<h2 class="section-title">The 5 Days</h2>
		<div class="days-timeline">
			{#each days as day}
				<a href="/learn/week-1/day-{day.day}" class="day-block">
					<div class="day-header">
						<span class="day-number">Day {day.day}</span>
						<span class="day-wow">{day.wow}</span>
					</div>
					<h3 class="day-title">{day.title}</h3>
					<p class="day-tagline">{day.tagline}</p>
					<div class="day-ships">
						<span class="ships-label">You ship:</span>
						<ul>
							{#each day.ship as item}
								<li>{item}</li>
							{/each}
						</ul>
					</div>
					<span class="day-cta">
						Start Day {day.day}
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M5 12h14M12 5l7 7-7 7"/>
						</svg>
					</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- Week Outcomes -->
<section class="outcomes-section">
	<div class="container">
		<h2 class="section-title">By End of Week</h2>
		<div class="outcomes-grid">
			{#each outcomes as outcome, i}
				<div class="outcome-item">
					<span class="outcome-check">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
							<polyline points="20 6 9 17 4 12"/>
						</svg>
					</span>
					<span class="outcome-text">{outcome}</span>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Tech Stack -->
<section class="tech-section">
	<div class="container">
		<h2 class="section-title">Tech You'll Learn</h2>
		<div class="tech-table">
			<div class="tech-header">
				<span>Tool</span>
				<span>Day</span>
				<span>What You'll Know</span>
			</div>
			{#each techStack as tech}
				<div class="tech-row">
					<span class="tech-tool">{tech.tool}</span>
					<span class="tech-day">{tech.day}</span>
					<span class="tech-learn">{tech.learn}</span>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Mindset -->
<section class="mindset-section">
	<div class="container">
		<div class="mindset-card">
			<h2 class="mindset-title">Week 1 Mindset</h2>
			<p class="mindset-quote">"AI-first, not AI-added."</p>
			<p class="mindset-text">
				Most people use AI like Google: ask a question, get an answer, go back to working alone.
				That's backwards. AI should be:
			</p>
			<ul class="mindset-list">
				<li><strong>In your workflow</strong> — Claude Code in terminal</li>
				<li><strong>Knowing your context</strong> — CLAUDE.md</li>
				<li><strong>Following your processes</strong> — Skills</li>
				<li><strong>Doing actual work</strong> — not just answering questions</li>
			</ul>
			<p class="mindset-text">
				Week 1 teaches this mindset. By Friday, AI isn't a tool you use sometimes—it's how you build.
			</p>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="cta-section">
	<div class="container">
		<a href="/learn/week-1/day-1" class="btn btn-primary btn-lg">
			Start Day 1
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M5 12h14M12 5l7 7-7 7"/>
			</svg>
		</a>
	</div>
</section>

<style>
	:global(:root) {
		--color-primary: #04A459;
		--color-primary-light: #2ECC71;
		--gradient-accent: linear-gradient(135deg, #04A459 0%, #2ECC71 100%);
		--bg-base: #1a1d23;
		--bg-elevated: #242933;
		--bg-surface: #2e3440;
		--bg-hover: #3b4252;
		--text-primary: #ffffff;
		--text-secondary: #a1a1a1;
		--text-muted: #6b7280;
		--border-subtle: #2e3440;
		--border-default: #3b4252;
		--font-heading: 'Plus Jakarta Sans', system-ui, sans-serif;
		--font-body: 'Inter', system-ui, sans-serif;
		--font-mono: 'JetBrains Mono', monospace;
		--radius-sm: 4px;
		--radius-md: 8px;
		--radius-lg: 12px;
		--radius-xl: 16px;
		--radius-2xl: 24px;
		--radius-full: 9999px;
		--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.25);
		--shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.3);
		--shadow-glow-sm: 0 0 10px rgba(4, 164, 89, 0.2);
		--shadow-glow-md: 0 0 20px rgba(4, 164, 89, 0.3);
		--space-1: 0.25rem;
		--space-2: 0.5rem;
		--space-3: 0.75rem;
		--space-4: 1rem;
		--space-5: 1.25rem;
		--space-6: 1.5rem;
		--space-8: 2rem;
		--space-10: 2.5rem;
		--space-12: 3rem;
		--space-16: 4rem;
		--space-20: 5rem;
	}

	:global(*, *::before, *::after) { box-sizing: border-box; }

	:global(body) {
		margin: 0;
		font-family: var(--font-body);
		background: var(--bg-base);
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.container {
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		padding: 0 var(--space-4);
	}

	@media (min-width: 640px) {
		.container { padding: 0 var(--space-6); }
	}

	/* Navigation */
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		padding: var(--space-4) 0;
		background: rgba(26, 29, 35, 0.95);
		backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--border-subtle);
	}

	.nav-container {
		position: relative;
		max-width: 1280px;
		margin: 0 auto;
		padding: 0 var(--space-4);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.nav-back {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		color: var(--text-secondary);
		text-decoration: none;
		border-radius: var(--radius-md);
		transition: color 150ms, background 150ms;
	}

	.nav-back:hover {
		color: var(--text-primary);
		background: var(--bg-hover);
	}

	.nav-title {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		font-family: var(--font-heading);
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-secondary);
		letter-spacing: 0.02em;
	}

	.nav-spacer {
		width: 40px;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-6);
		font-family: var(--font-body);
		font-size: 0.875rem;
		font-weight: 600;
		border-radius: var(--radius-md);
		cursor: pointer;
		text-decoration: none;
		transition: all 200ms;
		border: none;
	}

	.btn-primary {
		background: var(--gradient-accent);
		color: white;
		box-shadow: var(--shadow-glow-sm), var(--shadow-md);
	}

	.btn-primary:hover {
		box-shadow: var(--shadow-glow-md), var(--shadow-lg);
		transform: translateY(-2px);
	}

	.btn-lg {
		padding: var(--space-4) var(--space-8);
		font-size: 1rem;
		border-radius: var(--radius-lg);
	}

	.btn-nav {
		display: none;
	}

	@media (min-width: 768px) {
		.btn-nav { display: inline-flex; }
	}

	/* Week Hero */
	.week-hero {
		padding: calc(var(--space-20) + 80px) 0 var(--space-12);
		background: linear-gradient(180deg, var(--bg-base) 0%, var(--bg-elevated) 100%);
	}

	.breadcrumb {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-size: 0.875rem;
		margin-bottom: var(--space-6);
	}

	.breadcrumb a {
		color: var(--text-muted);
		text-decoration: none;
		transition: color 150ms;
	}

	.breadcrumb a:hover { color: var(--color-primary); }

	.breadcrumb .separator { color: var(--text-muted); }

	.breadcrumb .current { color: var(--text-secondary); }

	.week-badge {
		display: inline-block;
		padding: var(--space-2) var(--space-4);
		background: var(--gradient-accent);
		border-radius: var(--radius-full);
		font-size: 0.875rem;
		font-weight: 700;
		color: white;
		margin-bottom: var(--space-4);
	}

	.week-title {
		font-family: var(--font-heading);
		font-size: clamp(2rem, 6vw, 3rem);
		font-weight: 800;
		color: var(--text-primary);
		margin: 0 0 var(--space-3);
		letter-spacing: -0.03em;
	}

	.week-tagline {
		font-size: 1.25rem;
		font-style: italic;
		color: var(--text-secondary);
		margin: 0 0 var(--space-8);
	}

	.week-promise {
		background: var(--bg-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-6);
		max-width: 480px;
	}

	.week-promise p {
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 var(--space-3);
	}

	.week-promise ol {
		margin: 0;
		padding-left: var(--space-6);
	}

	.week-promise li {
		color: var(--text-secondary);
		padding: var(--space-1) 0;
	}

	/* Days Section */
	.days-section {
		padding: var(--space-16) 0;
	}

	.section-title {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin: 0 0 var(--space-8);
	}

	.days-timeline {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.day-block {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl);
		padding: var(--space-6);
		text-decoration: none;
		transition: all 200ms;
	}

	.day-block:hover {
		border-color: var(--color-primary);
		transform: translateX(4px);
	}

	.day-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--space-3);
	}

	.day-number {
		display: inline-block;
		padding: var(--space-1) var(--space-3);
		background: var(--color-primary);
		border-radius: var(--radius-sm);
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		color: white;
	}

	.day-wow {
		font-size: 0.8125rem;
		font-style: italic;
		color: var(--color-primary);
	}

	.day-title {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text-primary);
		margin: 0 0 var(--space-2);
	}

	.day-tagline {
		font-size: 0.9375rem;
		color: var(--text-secondary);
		margin: 0 0 var(--space-4);
	}

	.day-ships {
		margin-bottom: var(--space-4);
	}

	.ships-label {
		display: block;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-muted);
		margin-bottom: var(--space-2);
	}

	.day-ships ul {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.day-ships li {
		padding: var(--space-1) var(--space-3);
		background: var(--bg-surface);
		border-radius: var(--radius-full);
		font-size: 0.8125rem;
		color: var(--text-secondary);
	}

	.day-cta {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-primary);
	}

	/* Outcomes Section */
	.outcomes-section {
		padding: var(--space-16) 0;
		background: var(--bg-elevated);
	}

	.outcomes-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-3);
	}

	@media (min-width: 640px) {
		.outcomes-grid { grid-template-columns: repeat(2, 1fr); }
	}

	.outcome-item {
		display: flex;
		align-items: flex-start;
		gap: var(--space-3);
		padding: var(--space-3);
		background: var(--bg-surface);
		border-radius: var(--radius-md);
	}

	.outcome-check {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		background: rgba(4, 164, 89, 0.2);
		border-radius: var(--radius-sm);
		color: var(--color-primary);
		flex-shrink: 0;
	}

	.outcome-text {
		font-size: 0.9375rem;
		color: var(--text-secondary);
	}

	/* Tech Section */
	.tech-section {
		padding: var(--space-16) 0;
	}

	.tech-table {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.tech-header {
		display: grid;
		grid-template-columns: 140px 60px 1fr;
		gap: var(--space-4);
		padding: var(--space-4);
		background: var(--bg-surface);
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-muted);
	}

	.tech-row {
		display: grid;
		grid-template-columns: 140px 60px 1fr;
		gap: var(--space-4);
		padding: var(--space-4);
		border-top: 1px solid var(--border-subtle);
		font-size: 0.9375rem;
	}

	.tech-tool {
		font-weight: 600;
		color: var(--text-primary);
	}

	.tech-day {
		color: var(--color-primary);
		font-weight: 500;
	}

	.tech-learn {
		color: var(--text-secondary);
	}

	/* Mindset Section */
	.mindset-section {
		padding: var(--space-16) 0;
		background: var(--bg-elevated);
	}

	.mindset-card {
		background: linear-gradient(135deg, rgba(4, 164, 89, 0.1) 0%, rgba(4, 164, 89, 0.05) 100%);
		border: 1px solid rgba(4, 164, 89, 0.3);
		border-radius: var(--radius-xl);
		padding: var(--space-8);
	}

	.mindset-title {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin: 0 0 var(--space-4);
	}

	.mindset-quote {
		font-size: 1.25rem;
		font-weight: 600;
		font-style: italic;
		color: var(--color-primary);
		margin: 0 0 var(--space-4);
	}

	.mindset-text {
		font-size: 1rem;
		color: var(--text-secondary);
		margin: 0 0 var(--space-4);
		line-height: 1.7;
	}

	.mindset-list {
		list-style: none;
		padding: 0;
		margin: 0 0 var(--space-4);
	}

	.mindset-list li {
		padding: var(--space-2) 0;
		padding-left: var(--space-6);
		position: relative;
		color: var(--text-secondary);
	}

	.mindset-list li::before {
		content: "→";
		position: absolute;
		left: 0;
		color: var(--color-primary);
	}

	.mindset-list li strong {
		color: var(--text-primary);
	}

	/* CTA Section */
	.cta-section {
		padding: var(--space-12) 0 var(--space-20);
		text-align: center;
	}
</style>
