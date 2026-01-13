<script lang="ts">
	import { page } from '$app/stores';
	const username = $page.params.username;
	const weeks = [
		{
			week: 1,
			title: "AI-First Foundation",
			tagline: "Build the system that builds the product",
			status: "available",
			days: [
				{ day: 1, title: "AI Workspace → Live Website", ship: "Blog skill + live site + first post" },
				{ day: 2, title: "Users Are Real", ship: "Auth + database + profiles" },
				{ day: 3, title: "Build the Thing", ship: "Core product feature" },
				{ day: 4, title: "AI Does the Work", ship: "AI-powered feature" },
				{ day: 5, title: "Your AI Content Engine", ship: "Content system + demo" }
			]
		},
		{
			week: 2,
			title: "Core Product",
			tagline: "Build the main functionality",
			status: "coming-soon",
			days: []
		},
		{
			week: 3,
			title: "AI Integration + Automation",
			tagline: "Add intelligence and workflows",
			status: "coming-soon",
			days: []
		},
		{
			week: 4,
			title: "Polish + Launch",
			tagline: "Ship publicly, get real users",
			status: "coming-soon",
			days: []
		}
	];
</script>

<svelte:head>
	<title>Learn | code:zero Student Portal</title>
	<meta name="description" content="Access your Full Stack Web Development curriculum. Day-by-day lessons to build and ship your product with AI." />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
</svelte:head>

<!-- Navigation -->
<nav class="navbar">
	<div class="nav-container">
		<a href="/" class="nav-logo" data-sveltekit-reload>
			<span class="logo-text">code<span class="logo-accent">:zero</span></span>
		</a>
		<span class="nav-title">Student Portal</span>
		<div class="nav-spacer"></div>
	</div>
</nav>

<!-- Hero -->
<section class="portal-hero">
	<div class="container">
		<div class="hero-badge">
			<span class="badge-icon">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
					<path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
				</svg>
			</span>
			<span>Student Portal</span>
		</div>
		<h1 class="portal-title">Full Stack Web Development</h1>
		<p class="portal-subtitle">4 weeks. 20 lessons. 1 shipped product.</p>
	</div>
</section>

<!-- Week Grid -->
<section class="portal-content">
	<div class="container">
		<div class="weeks-list">
			{#each weeks as week}
				{#if week.status === 'available'}
					<a href="/student-portal/{username}/full-stack-web-development/week-{week.week}" class="week-block available">
						<div class="week-header">
							<div class="week-number">Week {week.week}</div>
							<div class="week-info">
								<h2 class="week-title">{week.title}</h2>
								<p class="week-tagline">{week.tagline}</p>
							</div>
							<span class="btn btn-primary btn-sm">
								Start Week
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M5 12h14M12 5l7 7-7 7"/>
								</svg>
							</span>
						</div>

						{#if week.days.length > 0}
							<div class="days-grid">
								{#each week.days as day}
									<div class="day-card">
										<div class="day-badge">Day {day.day}</div>
										<h3 class="day-title">{day.title}</h3>
										<p class="day-ship">
											<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
												<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
											</svg>
											{day.ship}
										</p>
									</div>
								{/each}
							</div>
						{/if}
					</a>
				{:else}
					<div class="week-block coming-soon">
						<div class="week-header">
							<div class="week-number">Week {week.week}</div>
							<div class="week-info">
								<h2 class="week-title">{week.title}</h2>
								<p class="week-tagline">{week.tagline}</p>
							</div>
							<span class="coming-badge">Coming Soon</span>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</section>

<!-- Quick Stats -->
<section class="portal-stats">
	<div class="container">
		<div class="stats-grid">
			<div class="stat-item">
				<span class="stat-value">20</span>
				<span class="stat-label">Lessons</span>
			</div>
			<div class="stat-item">
				<span class="stat-value">4</span>
				<span class="stat-label">Weeks</span>
			</div>
			<div class="stat-item">
				<span class="stat-value">1</span>
				<span class="stat-label">Shipped Product</span>
			</div>
			<div class="stat-item">
				<span class="stat-value">94%</span>
				<span class="stat-label">Ship Rate</span>
			</div>
		</div>
	</div>
</section>

<style>
	/* ===================================
	   CSS Variables
	   =================================== */
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
		--font-heading: 'Quicksand', system-ui, sans-serif;
		--font-body: 'Quicksand', system-ui, sans-serif;
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

	:global(*, *::before, *::after) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
		font-family: var(--font-body);
		background: var(--bg-base);
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.container {
		width: 100%;
		max-width: 1280px;
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

	.nav-logo { text-decoration: none; }

	.logo-text {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.logo-accent { color: var(--color-primary); }

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
		width: 100px; /* Balance the logo on the other side */
	}

	.nav-link:hover, .nav-link.active {
		color: var(--text-primary);
	}

	.nav-link.active {
		color: var(--color-primary);
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

	.btn-sm {
		padding: var(--space-2) var(--space-4);
		font-size: 0.8125rem;
	}

	.btn-nav {
		display: none;
	}

	@media (min-width: 768px) {
		.btn-nav { display: inline-flex; }
	}

	/* Portal Hero */
	.portal-hero {
		padding: calc(var(--space-20) + 80px) 0 var(--space-12);
		text-align: center;
		background: linear-gradient(180deg, var(--bg-base) 0%, var(--bg-elevated) 100%);
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-4);
		background: rgba(4, 164, 89, 0.1);
		border: 1px solid rgba(4, 164, 89, 0.3);
		border-radius: var(--radius-full);
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-primary);
		margin-bottom: var(--space-6);
	}

	.badge-icon {
		display: flex;
		align-items: center;
	}

	.portal-title {
		font-family: var(--font-heading);
		font-size: clamp(2rem, 6vw, 3.5rem);
		font-weight: 800;
		color: var(--text-primary);
		margin: 0 0 var(--space-4);
		letter-spacing: -0.03em;
	}

	.portal-subtitle {
		font-size: 1.25rem;
		color: var(--text-secondary);
		margin: 0;
	}

	/* Portal Content */
	.portal-content {
		padding: var(--space-12) 0 var(--space-20);
	}

	.weeks-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
	}

	.week-block {
		display: block;
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl);
		padding: var(--space-6);
		transition: border-color 200ms, transform 200ms, box-shadow 200ms;
		text-decoration: none;
		color: inherit;
	}

	.week-block.available {
		cursor: pointer;
	}

	.week-block.available:hover {
		border-color: var(--color-primary);
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(4, 164, 89, 0.15);
	}

	.week-block.coming-soon {
		opacity: 0.6;
	}

	.week-header {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-4);
		margin-bottom: var(--space-6);
	}

	.week-number {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 64px;
		height: 64px;
		background: var(--gradient-accent);
		border-radius: var(--radius-lg);
		font-family: var(--font-heading);
		font-size: 0.75rem;
		font-weight: 700;
		color: white;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.week-info {
		flex: 1;
		min-width: 200px;
	}

	.week-title {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin: 0 0 var(--space-1);
	}

	.week-tagline {
		font-size: 0.9375rem;
		color: var(--text-secondary);
		margin: 0;
	}

	.coming-badge {
		padding: var(--space-2) var(--space-4);
		background: var(--bg-surface);
		border-radius: var(--radius-full);
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--text-muted);
	}

	/* Days Grid */
	.days-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-4);
	}

	@media (min-width: 640px) {
		.days-grid { grid-template-columns: repeat(2, 1fr); }
	}

	@media (min-width: 1024px) {
		.days-grid { grid-template-columns: repeat(5, 1fr); }
	}

	.day-card {
		background: var(--bg-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-5);
		text-decoration: none;
		transition: all 200ms;
	}

	.day-card:hover {
		background: var(--bg-hover);
		border-color: var(--color-primary);
		transform: translateY(-2px);
	}

	.day-badge {
		display: inline-block;
		padding: var(--space-1) var(--space-2);
		background: var(--color-primary);
		border-radius: var(--radius-sm);
		font-size: 0.6875rem;
		font-weight: 700;
		text-transform: uppercase;
		color: white;
		margin-bottom: var(--space-3);
	}

	.day-title {
		font-family: var(--font-heading);
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 var(--space-2);
		line-height: 1.3;
	}

	.day-ship {
		display: flex;
		align-items: flex-start;
		gap: var(--space-2);
		font-size: 0.8125rem;
		color: var(--text-muted);
		margin: 0;
		line-height: 1.4;
	}

	.day-ship svg {
		color: var(--color-primary);
		flex-shrink: 0;
		margin-top: 2px;
	}

	/* Portal Stats */
	.portal-stats {
		background: var(--bg-elevated);
		border-top: 1px solid var(--border-subtle);
		padding: var(--space-12) 0;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-6);
	}

	@media (min-width: 640px) {
		.stats-grid { grid-template-columns: repeat(4, 1fr); }
	}

	.stat-item {
		text-align: center;
	}

	.stat-value {
		display: block;
		font-family: var(--font-heading);
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--color-primary);
		line-height: 1;
	}

	.stat-label {
		display: block;
		font-size: 0.875rem;
		color: var(--text-muted);
		margin-top: var(--space-2);
	}
</style>
