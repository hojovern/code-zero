<script lang="ts">
	import { onMount } from 'svelte';

	// Props for customization
	let { backUrl = '/portal', backLabel = 'Week 1', nextUrl = '' }: { backUrl?: string; backLabel?: string; nextUrl?: string } = $props();

	let heroVisible = $state(true);

	const outcomes = [
		{ icon: "01", title: "AI Workspace", desc: "Claude knows YOUR project" },
		{ icon: "02", title: "First Skill", desc: "Reusable blog writer" },
		{ icon: "03", title: "Live Website", desc: "Real URL, real visitors" }
	];

	const schedule = [
		{ time: "09:00", title: "Philosophy", subtitle: "AI-first development mindset", duration: "30 min" },
		{ time: "09:30", title: "Setup", subtitle: "Terminal + Claude Code", duration: "45 min" },
		{ time: "10:30", title: "CLAUDE.md", subtitle: "Give AI your context", duration: "45 min" },
		{ time: "11:15", title: "First Skill", subtitle: "Build blog writer", duration: "45 min" },
		{ time: "13:00", title: "Standup", subtitle: "Share your approach", duration: "30 min" },
		{ time: "13:30", title: "SvelteKit", subtitle: "AI scaffolds your app", duration: "60 min" },
		{ time: "14:45", title: "Landing Page", subtitle: "AI builds your homepage", duration: "75 min" },
		{ time: "16:00", title: "Deploy", subtitle: "Live on Vercel", duration: "45 min" },
		{ time: "16:45", title: "Content", subtitle: "First blog post ships", duration: "45 min" }
	];

	const checklist = [
		"CLAUDE.md captures your project",
		"Blog writer skill exists and works",
		"Landing page live at Vercel URL",
		"At least one blog post published",
		"Mobile responsive (check on phone)"
	];

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				heroVisible = entry.isIntersecting;
			},
			{ threshold: 0.1 }
		);

		const hero = document.querySelector('.hero');
		if (hero) observer.observe(hero);

		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>Day 1: AI Workspace → Live Website | code:zero</title>
	<meta name="description" content="Set up your AI workspace, create your first skill, and deploy a live website - all in one day." />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet" />
</svelte:head>

<div class="lesson-wrapper">
	<!-- Floating Nav -->
	<nav class="floating-nav" class:visible={!heroVisible}>
		<a href={backUrl} class="nav-back">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M19 12H5M12 19l-7-7 7-7"/>
			</svg>
		</a>
		<span class="nav-title">Day 1</span>
		<div class="nav-progress">
			<div class="progress-bar" style="width: {scrollHeight > innerHeight ? Math.min(100, (scrollY / (scrollHeight - innerHeight)) * 100) : 0}%"></div>
		</div>
	</nav>

	<!-- Hero Section - Full Screen -->
	<section class="hero">
		<div class="hero-bg">
			<div class="gradient-orb orb-1"></div>
			<div class="gradient-orb orb-2"></div>
			<div class="grid-overlay"></div>
		</div>

		<div class="hero-content">
			<a href={backUrl} class="back-link">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M19 12H5M12 19l-7-7 7-7"/>
				</svg>
				{backLabel}
			</a>

			<div class="hero-badge">
				<span class="badge-dot"></span>
				Day 01
			</div>

			<h1 class="hero-title">
				<span class="title-line">AI Workspace</span>
				<span class="title-arrow">→</span>
				<span class="title-line accent">Live Website</span>
			</h1>

			<p class="hero-tagline">"Set up the system. Use the system. Ship before you leave."</p>

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

	<!-- The Pace Section -->
	<section class="pace-section">
		<div class="section-container">
			<div class="pace-grid">
				<div class="pace-content">
					<span class="section-label">The Philosophy</span>
					<h2 class="section-title">This is the pace.</h2>
					<p class="pace-text">
						Most bootcamps: <em>"Here's how to code. Now code for 4 weeks."</em>
					</p>
					<p class="pace-text highlight">
						We flip it. First hour: set up AI that knows your project. Rest of day: AI helps build everything.
					</p>
				</div>
				<div class="pace-visual">
					<div class="pace-card old">
						<span class="pace-label">Old Way</span>
						<div class="pace-flow">
							<span>Learn</span>
							<span class="arrow">→</span>
							<span>Code</span>
							<span class="arrow">→</span>
							<span>Debug</span>
							<span class="arrow">→</span>
							<span>Ship?</span>
						</div>
					</div>
					<div class="pace-card new">
						<span class="pace-label">code:zero</span>
						<div class="pace-flow">
							<span>Setup AI</span>
							<span class="arrow">→</span>
							<span>Build</span>
							<span class="arrow">→</span>
							<span>Ship Today</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Timeline Section -->
	<section class="timeline-section">
		<div class="section-container">
			<span class="section-label">Your Day</span>
			<h2 class="section-title">The Timeline</h2>

			<div class="timeline">
				{#each schedule as item, i}
					<div class="timeline-item" class:break={item.title === 'Break'}>
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
							<span class="timeline-duration">{item.duration}</span>
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
				Everything after the first hour is AI-assisted. That's the point.
			</blockquote>
		</div>
	</section>

	<!-- Checklist Section -->
	<section class="checklist-section">
		<div class="section-container">
			<span class="section-label">End of Day</span>
			<h2 class="section-title">Ship Checklist</h2>

			<div class="checklist-grid">
				{#each checklist as item, i}
					<label class="checklist-item">
						<input type="checkbox" />
						<span class="check-box">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
								<polyline points="20 6 9 17 4 12"/>
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
						<span class="next-label">Tomorrow</span>
						<h3 class="next-title">Day 2: Users Are Real</h3>
						<p class="next-desc">Your app learns who's using it. Auth + database, AI-assisted.</p>
					</div>
					<a href={nextUrl} class="next-btn">
						Continue
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M5 12h14M12 5l7 7-7 7"/>
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
		font-family: var(--font-body, 'Quicksand'), system-ui, sans-serif;
		-webkit-font-smoothing: antialiased;
		min-height: 100vh;
	}

	/* Floating Nav */
	.floating-nav {
		position: fixed;
		top: 20px;
		left: 50%;
		transform: translateX(-50%) translateY(-100px);
		z-index: 100;
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 12px 20px;
		background: rgba(10, 10, 11, 0.8);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 100px;
		opacity: 0;
		transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.floating-nav.visible {
		transform: translateX(-50%) translateY(0);
		opacity: 1;
	}

	.nav-back {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 50%;
		color: #888;
		text-decoration: none;
		transition: all 0.2s;
	}

	.nav-back:hover {
		background: rgba(255, 255, 255, 0.15);
		color: #fff;
	}

	.nav-title {
		font-size: 14px;
		font-weight: 600;
		color: #fff;
	}

	.nav-progress {
		width: 100px;
		height: 3px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		overflow: hidden;
	}

	.progress-bar {
		height: 100%;
		background: linear-gradient(90deg, #04A459, #2ECC71);
		border-radius: 10px;
		transition: width 0.1s;
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

	.gradient-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(120px);
		opacity: 0.5;
	}

	.orb-1 {
		width: 800px;
		height: 800px;
		background: radial-gradient(circle, #04A459 0%, transparent 70%);
		top: -400px;
		right: -200px;
		animation: float 20s ease-in-out infinite;
	}

	.orb-2 {
		width: 600px;
		height: 600px;
		background: radial-gradient(circle, #0066ff 0%, transparent 70%);
		bottom: -300px;
		left: -100px;
		animation: float 25s ease-in-out infinite reverse;
	}

	@keyframes float {
		0%, 100% { transform: translate(0, 0) scale(1); }
		33% { transform: translate(30px, -30px) scale(1.05); }
		66% { transform: translate(-20px, 20px) scale(0.95); }
	}

	.grid-overlay {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
		background-size: 60px 60px;
		mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
	}

	.hero-content {
		position: relative;
		z-index: 1;
		max-width: 1400px;
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
		color: #04A459;
		margin-bottom: 32px;
	}

	.badge-dot {
		width: 8px;
		height: 8px;
		background: #04A459;
		border-radius: 50%;
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; transform: scale(1); }
		50% { opacity: 0.5; transform: scale(1.2); }
	}

	.hero-title {
		font-family: var(--font-heading, 'Quicksand'), system-ui, sans-serif;
		font-size: clamp(48px, 10vw, 120px);
		font-weight: 800;
		line-height: 1;
		letter-spacing: -0.03em;
		margin: 0 0 32px;
	}

	.title-line {
		display: block;
	}

	.title-arrow {
		display: inline-block;
		color: #04A459;
		margin: 0 20px;
		animation: arrowMove 2s ease-in-out infinite;
	}

	@keyframes arrowMove {
		0%, 100% { transform: translateX(0); }
		50% { transform: translateX(10px); }
	}

	.title-line.accent {
		background: linear-gradient(135deg, #04A459 0%, #2ECC71 50%, #00ff88 100%);
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
		from { opacity: 0; transform: translateY(20px); }
		to { opacity: 1; transform: translateY(0); }
	}

	.outcome-card:hover {
		background: rgba(255, 255, 255, 0.06);
		border-color: rgba(4, 164, 89, 0.3);
		transform: translateY(-4px);
	}

	.outcome-num {
		font-family: var(--font-heading, 'Quicksand'), system-ui, sans-serif;
		font-size: 32px;
		font-weight: 800;
		color: #04A459;
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
		0%, 100% { transform: scaleY(1); opacity: 1; }
		50% { transform: scaleY(0.5); opacity: 0.5; }
	}

	/* Section Styles */
	.section-container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 60px;
	}

	.section-label {
		display: inline-block;
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: #04A459;
		margin-bottom: 16px;
	}

	.section-title {
		font-family: var(--font-heading, 'Quicksand'), system-ui, sans-serif;
		font-size: clamp(36px, 6vw, 64px);
		font-weight: 800;
		letter-spacing: -0.02em;
		margin: 0 0 48px;
	}

	/* Pace Section */
	.pace-section {
		padding: 160px 0;
		background: #0a0a0b;
	}

	.pace-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 80px;
		align-items: center;
	}

	.pace-text {
		font-size: 20px;
		line-height: 1.7;
		color: #888;
		margin: 0 0 24px;
	}

	.pace-text em {
		color: #666;
	}

	.pace-text.highlight {
		color: #fff;
		font-weight: 500;
	}

	.pace-visual {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.pace-card {
		padding: 32px;
		border-radius: 20px;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.pace-card.old {
		background: rgba(255, 255, 255, 0.02);
	}

	.pace-card.new {
		background: linear-gradient(135deg, rgba(4, 164, 89, 0.1) 0%, rgba(4, 164, 89, 0.05) 100%);
		border-color: rgba(4, 164, 89, 0.3);
	}

	.pace-label {
		display: block;
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: #666;
		margin-bottom: 16px;
	}

	.pace-card.new .pace-label {
		color: #04A459;
	}

	.pace-flow {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 16px;
		color: #888;
	}

	.pace-card.new .pace-flow {
		color: #fff;
	}

	.pace-flow .arrow {
		color: #333;
	}

	.pace-card.new .pace-flow .arrow {
		color: #04A459;
	}

	/* Timeline */
	.timeline-section {
		padding: 160px 0;
		background: linear-gradient(180deg, #0a0a0b 0%, #0f0f10 100%);
	}

	.timeline {
		display: flex;
		flex-direction: column;
	}

	.timeline-item {
		display: grid;
		grid-template-columns: 80px 40px 1fr;
		gap: 24px;
		padding: 24px 0;
	}

	.timeline-time {
		font-family: var(--font-heading, 'Quicksand'), system-ui, sans-serif;
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
		background: #04A459;
		border-radius: 50%;
		box-shadow: 0 0 20px rgba(4, 164, 89, 0.5);
	}

	.marker-line {
		flex: 1;
		width: 2px;
		background: linear-gradient(180deg, #04A459 0%, rgba(4, 164, 89, 0.1) 100%);
		margin-top: 8px;
	}

	.timeline-content {
		padding-bottom: 24px;
	}

	.timeline-title {
		font-family: var(--font-heading, 'Quicksand'), system-ui, sans-serif;
		font-size: 24px;
		font-weight: 700;
		margin: 0 0 8px;
	}

	.timeline-subtitle {
		font-size: 16px;
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
		padding: 200px 0;
		overflow: hidden;
	}

	.statement-bg {
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse at center, rgba(4, 164, 89, 0.15) 0%, transparent 60%);
	}

	.big-statement {
		position: relative;
		font-family: var(--font-heading, 'Quicksand'), system-ui, sans-serif;
		font-size: clamp(32px, 5vw, 56px);
		font-weight: 600;
		line-height: 1.3;
		text-align: center;
		margin: 0;
		color: #fff;
	}

	.statement-mark {
		position: absolute;
		top: -40px;
		left: -20px;
		font-size: 200px;
		font-weight: 800;
		color: rgba(4, 164, 89, 0.1);
		line-height: 1;
	}

	/* Checklist */
	.checklist-section {
		padding: 160px 0;
		background: #0a0a0b;
	}

	.checklist-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 16px;
	}

	@media (min-width: 640px) {
		.checklist-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.checklist-grid {
			grid-template-columns: repeat(3, 1fr);
		}
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
		contain: layout style;
	}

	.checklist-item:hover {
		background: rgba(255, 255, 255, 0.04);
		border-color: rgba(255, 255, 255, 0.1);
	}

	.checklist-item input {
		display: none;
	}

	.check-box {
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.05);
		border: 2px solid rgba(255, 255, 255, 0.2);
		border-radius: 8px;
		color: transparent;
		transition: all 0.2s;
	}

	.checklist-item input:checked + .check-box {
		background: #04A459;
		border-color: #04A459;
		color: #fff;
	}

	.check-text {
		font-size: 16px;
		color: #888;
		transition: color 0.2s;
	}

	.checklist-item input:checked ~ .check-text {
		color: #fff;
	}

	/* Next */
	.next-section {
		padding: 80px 0 160px;
		background: #0a0a0b;
	}

	.next-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 48px;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 24px;
	}

	.next-label {
		display: block;
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: #666;
		margin-bottom: 8px;
	}

	.next-title {
		font-family: var(--font-heading, 'Quicksand'), system-ui, sans-serif;
		font-size: 28px;
		font-weight: 700;
		margin: 0 0 8px;
	}

	.next-desc {
		font-size: 16px;
		color: #666;
		margin: 0;
	}

	.next-btn {
		display: inline-flex;
		align-items: center;
		gap: 12px;
		padding: 16px 32px;
		background: linear-gradient(135deg, #04A459 0%, #2ECC71 100%);
		border-radius: 100px;
		font-size: 16px;
		font-weight: 600;
		color: #fff;
		text-decoration: none;
		transition: all 0.3s;
	}

	.next-btn:hover {
		transform: translateX(8px);
		box-shadow: 0 0 40px rgba(4, 164, 89, 0.4);
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.hero {
			padding: 40px;
		}

		.section-container {
			padding: 0 40px;
		}

		.pace-grid {
			grid-template-columns: 1fr;
			gap: 48px;
		}
	}

	@media (max-width: 768px) {
		.hero {
			padding: 24px;
			min-height: auto;
			padding-top: 100px;
			padding-bottom: 100px;
		}

		.section-container {
			padding: 0 24px;
		}

		.hero-outcomes {
			flex-direction: column;
		}

		.outcome-card {
			min-width: auto;
		}

		.timeline-item {
			grid-template-columns: 60px 30px 1fr;
			gap: 16px;
		}

		.next-card {
			flex-direction: column;
			text-align: center;
			gap: 32px;
		}

		.scroll-indicator {
			display: none;
		}
	}
</style>
