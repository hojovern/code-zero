<script lang="ts">
	import { onMount } from 'svelte';

	// Props for customization
	let { backUrl = '/student-portal', backLabel = 'Week 1', nextUrl = '' }: { backUrl?: string; backLabel?: string; nextUrl?: string } = $props();

	let heroVisible = $state(true);
	let terminalLines = $state<string[]>([]);

	const outcomes = [
		{ icon: "01", title: "User Auth", desc: "Sign up & login working" },
		{ icon: "02", title: "Database", desc: "User profiles stored" },
		{ icon: "03", title: "Protected Routes", desc: "Dashboard secured" }
	];

	const comparison = [
		{ before: "Same for everyone", after: "Personalized to each user" },
		{ before: "No memory", after: "Remembers who you are" },
		{ before: "Static content", after: "Dynamic data" },
		{ before: "Viewer", after: "User" }
	];

	const schedule = [
		{ time: "09:00", title: "Standup", subtitle: "Show your live site", duration: "15 min" },
		{ time: "09:15", title: "Supabase Setup", subtitle: "Project created + connected", duration: "60 min" },
		{ time: "10:30", title: "Build Auth Pages", subtitle: "Sign up + login working", duration: "60 min" },
		{ time: "11:30", title: "Protected Routes", subtitle: "Dashboard for logged-in users", duration: "30 min" },
		{ time: "13:00", title: "Standup", subtitle: "Auth working? Troubleshoot blockers", duration: "30 min" },
		{ time: "13:30", title: "Database Fundamentals", subtitle: "Tables, queries, RLS", duration: "60 min" },
		{ time: "14:45", title: "User Profiles Table", subtitle: "Store + display user data", duration: "75 min" },
		{ time: "16:00", title: "Create Auth Skill", subtitle: "Reusable pattern", duration: "60 min" },
		{ time: "17:00", title: "Ship Check", subtitle: "Deploy with auth", duration: "30 min" }
	];

	const checklist = [
		"Supabase project connected",
		"Sign up page working",
		"Login page working",
		"Dashboard protected",
		"Profiles table with RLS",
		"Auth skill created"
	];

	const terminalContent = [
		"$ npx supabase init",
		"Supabase initialized.",
		"$ npm install @supabase/supabase-js @supabase/ssr",
		"added 47 packages in 3.2s",
		"$ Creating auth pages...",
		"✓ src/routes/signup/+page.svelte",
		"✓ src/routes/login/+page.svelte",
		"✓ src/routes/dashboard/+page.svelte",
		"$ Running RLS policies...",
		"✓ Policy 'Users can view own profile' created",
		"✓ Policy 'Users can update own profile' created",
		"$ git push origin main",
		"→ Deployed to production ✓"
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

		// Animate terminal
		let i = 0;
		const interval = setInterval(() => {
			if (i < terminalContent.length) {
				terminalLines = [...terminalLines, terminalContent[i]];
				i++;
			} else {
				clearInterval(interval);
			}
		}, 400);

		return () => {
			observer.disconnect();
			clearInterval(interval);
		};
	});
</script>

<svelte:head>
	<title>Day 2: Users Are Real | code:zero</title>
	<meta name="description" content="Today your app learns who's using it. Real authentication, real users, real software." />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
</svelte:head>

<div class="lesson-wrapper">
	<!-- Floating Nav -->
	<nav class="floating-nav" class:visible={!heroVisible}>
		<a href={backUrl} class="nav-back">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M19 12H5M12 19l-7-7 7-7"/>
			</svg>
		</a>
		<span class="nav-title">Day 2</span>
		<div class="nav-progress">
			<div class="progress-bar" style="width: {scrollHeight > innerHeight ? Math.min(100, (scrollY / (scrollHeight - innerHeight)) * 100) : 0}%"></div>
		</div>
	</nav>

	<!-- Hero Section -->
	<section class="hero">
		<div class="hero-bg">
			<div class="gradient-orb orb-1"></div>
			<div class="gradient-orb orb-2"></div>
			<div class="code-rain"></div>
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
				Day 02
			</div>

			<h1 class="hero-title">
				<span class="title-line">Users Are</span>
				<span class="title-line accent">Real</span>
			</h1>

			<p class="hero-tagline">"Today your app learns who's using it."</p>

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

	<!-- The Challenge Section -->
	<section class="challenge-section">
		<div class="section-container">
			<div class="challenge-grid">
				<div class="challenge-content">
					<span class="section-label">The Challenge</span>
					<h2 class="section-title">Users can create accounts on <span class="highlight">YOUR</span> app.</h2>
					<div class="challenge-points">
						<div class="point">
							<span class="point-icon">@</span>
							<span>Real email addresses</span>
						</div>
						<div class="point">
							<span class="point-icon">*</span>
							<span>Real passwords</span>
						</div>
						<div class="point">
							<span class="point-icon">→</span>
							<span>Real users</span>
						</div>
					</div>
					<p class="challenge-conclusion">Your product stops being a demo and starts being <strong>software</strong>.</p>
				</div>
				<div class="terminal-window">
					<div class="terminal-header">
						<div class="terminal-dots">
							<span class="dot red"></span>
							<span class="dot yellow"></span>
							<span class="dot green"></span>
						</div>
						<span class="terminal-title">~/your-app</span>
					</div>
					<div class="terminal-body">
						{#each terminalLines as line, i}
							<div class="terminal-line" style="--delay: {i * 0.1}s">
								{#if line.startsWith('$')}
									<span class="prompt">$</span>
									<span class="command">{line.slice(2)}</span>
								{:else if line.startsWith('✓')}
									<span class="success">{line}</span>
								{:else if line.startsWith('→')}
									<span class="deploy">{line}</span>
								{:else}
									<span class="output">{line}</span>
								{/if}
							</div>
						{/each}
						<span class="cursor">▋</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- What Changes Section -->
	<section class="comparison-section">
		<div class="section-container">
			<span class="section-label">What Changes Today</span>
			<h2 class="section-title">Website → <span class="highlight">App</span></h2>

			<div class="comparison-grid">
				{#each comparison as item, i}
					<div class="comparison-card" style="--delay: {i * 0.1}s">
						<div class="comparison-before">
							<span class="comparison-label">Before</span>
							<span class="comparison-value">{item.before}</span>
						</div>
						<div class="comparison-arrow">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M5 12h14M12 5l7 7-7 7"/>
							</svg>
						</div>
						<div class="comparison-after">
							<span class="comparison-label">After</span>
							<span class="comparison-value">{item.after}</span>
						</div>
					</div>
				{/each}
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
				Your app now has users. Real people with real accounts. This is software, not a brochure.
			</blockquote>
		</div>
	</section>

	<!-- Checklist Section -->
	<section class="checklist-section">
		<div class="section-container">
			<span class="section-label">End of Day</span>
			<h2 class="section-title">Ship Checklist</h2>

			<div class="checklist-grid">
				{#each checklist as item}
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
						<h3 class="next-title">Day 3: Build the Thing</h3>
						<p class="next-desc">Build the core feature that makes your product unique.</p>
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
		background: linear-gradient(90deg, #6366f1, #818cf8);
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
		opacity: 0.4;
	}

	.orb-1 {
		width: 600px;
		height: 600px;
		background: radial-gradient(circle, #6366f1 0%, transparent 70%);
		top: -200px;
		right: -100px;
		animation: float 20s ease-in-out infinite;
	}

	.orb-2 {
		width: 500px;
		height: 500px;
		background: radial-gradient(circle, #04A459 0%, transparent 70%);
		bottom: -200px;
		left: -100px;
		animation: float 25s ease-in-out infinite reverse;
	}

	@keyframes float {
		0%, 100% { transform: translate(0, 0) scale(1); }
		33% { transform: translate(30px, -30px) scale(1.05); }
		66% { transform: translate(-20px, 20px) scale(0.95); }
	}

	.code-rain {
		position: absolute;
		inset: -100% 0 0 0; /* Double height to scroll */
		height: 200%;
		background: repeating-linear-gradient(
			0deg,
			transparent,
			transparent 2px,
			rgba(99, 102, 241, 0.03) 2px,
			rgba(99, 102, 241, 0.03) 4px
		);
		animation: rain 20s linear infinite;
		will-change: transform;
	}

	@keyframes rain {
		0% { transform: translateY(0); }
		100% { transform: translateY(50%); }
	}

	.grid-overlay {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
		background-size: 40px 40px;
		mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
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
		background: rgba(99, 102, 241, 0.15);
		border: 1px solid rgba(99, 102, 241, 0.3);
		border-radius: 100px;
		font-size: 13px;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #818cf8;
		margin-bottom: 32px;
	}

	.badge-dot {
		width: 8px;
		height: 8px;
		background: #818cf8;
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

	.title-line.accent {
		background: linear-gradient(135deg, #6366f1 0%, #818cf8 50%, #a5b4fc 100%);
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
		min-width: 220px;
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
		border-color: rgba(99, 102, 241, 0.3);
		transform: translateY(-4px);
	}

	.outcome-num {
		font-family: var(--font-heading, 'Quicksand'), system-ui, sans-serif;
		font-size: 32px;
		font-weight: 800;
		color: #818cf8;
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
		color: #818cf8;
		margin-bottom: 16px;
	}

	.section-title {
		font-family: var(--font-heading, 'Quicksand'), system-ui, sans-serif;
		font-size: clamp(36px, 6vw, 64px);
		font-weight: 800;
		letter-spacing: -0.02em;
		margin: 0 0 48px;
	}

	.section-title .highlight {
		color: #818cf8;
	}

	/* Challenge Section */
	.challenge-section {
		padding: 160px 0;
		background: #0a0a0b;
	}

	.challenge-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 60px;
		align-items: center;
	}

	.challenge-points {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin: 32px 0;
	}

	.point {
		display: flex;
		align-items: center;
		gap: 16px;
		font-size: 18px;
		color: #a1a1a1;
	}

	.point-icon {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(99, 102, 241, 0.1);
		border: 1px solid rgba(99, 102, 241, 0.3);
		border-radius: 10px;
		font-family: 'JetBrains Mono', monospace;
		font-size: 16px;
		color: #818cf8;
	}

	.challenge-conclusion {
		font-size: 20px;
		color: #888;
		margin: 0;
	}

	.challenge-conclusion strong {
		color: #fff;
	}

	/* Terminal */
	.terminal-window {
		background: #0d0d0d;
		border: 1px solid #222;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
	}

	.terminal-header {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 16px;
		background: #161616;
		border-bottom: 1px solid #222;
	}

	.terminal-dots {
		display: flex;
		gap: 8px;
	}

	.dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
	}

	.dot.red { background: #ff5f56; }
	.dot.yellow { background: #ffbd2e; }
	.dot.green { background: #27ca40; }

	.terminal-title {
		font-family: 'JetBrains Mono', monospace;
		font-size: 12px;
		color: #666;
	}

	.terminal-body {
		padding: 20px;
		font-family: 'JetBrains Mono', monospace;
		font-size: 13px;
		line-height: 1.8;
		min-height: 300px;
	}

	.terminal-line {
		animation: typeIn 0.3s ease-out backwards;
		animation-delay: var(--delay);
	}

	@keyframes typeIn {
		from { opacity: 0; transform: translateX(-10px); }
		to { opacity: 1; transform: translateX(0); }
	}

	.prompt {
		color: #04A459;
		margin-right: 8px;
	}

	.command {
		color: #fff;
	}

	.output {
		color: #666;
	}

	.success {
		color: #04A459;
	}

	.deploy {
		color: #818cf8;
	}

	.cursor {
		color: #04A459;
		animation: blink 1s step-end infinite;
	}

	@keyframes blink {
		0%, 50% { opacity: 1; }
		51%, 100% { opacity: 0; }
	}

	/* Comparison Section */
	.comparison-section {
		padding: 160px 0;
		background: linear-gradient(180deg, #0a0a0b 0%, #0f0f10 100%);
	}

	.comparison-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 24px;
	}

	.comparison-card {
		display: flex;
		align-items: center;
		gap: 20px;
		padding: 28px;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 16px;
		animation: fadeInUp 0.6s ease-out backwards;
		animation-delay: var(--delay);
	}

	.comparison-before,
	.comparison-after {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.comparison-label {
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #666;
	}

	.comparison-before .comparison-value {
		color: #666;
		text-decoration: line-through;
		text-decoration-color: #444;
	}

	.comparison-after .comparison-value {
		color: #fff;
	}

	.comparison-arrow {
		color: #818cf8;
		flex-shrink: 0;
	}

	/* Timeline */
	.timeline-section {
		padding: 160px 0;
		background: #0a0a0b;
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
		font-family: 'JetBrains Mono', monospace;
		font-size: 14px;
		font-weight: 500;
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
		background: #818cf8;
		border-radius: 50%;
		box-shadow: 0 0 20px rgba(129, 140, 248, 0.5);
	}

	.marker-line {
		flex: 1;
		width: 2px;
		background: linear-gradient(180deg, #818cf8 0%, rgba(129, 140, 248, 0.1) 100%);
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
		background: rgba(129, 140, 248, 0.1);
		border-radius: 100px;
		font-size: 12px;
		font-family: 'JetBrains Mono', monospace;
		color: #818cf8;
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
		background: radial-gradient(ellipse at center, rgba(99, 102, 241, 0.1) 0%, transparent 60%);
	}

	.big-statement {
		position: relative;
		font-family: var(--font-heading, 'Quicksand'), system-ui, sans-serif;
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
		font-size: 200px;
		font-weight: 800;
		color: rgba(129, 140, 248, 0.1);
		line-height: 1;
	}

	/* Checklist */
	.checklist-section {
		padding: 160px 0;
		background: #0a0a0b;
	}

	.checklist-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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
		background: #818cf8;
		border-color: #818cf8;
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
		background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%);
		border-radius: 100px;
		font-size: 16px;
		font-weight: 600;
		color: #fff;
		text-decoration: none;
		transition: all 0.3s;
	}

	.next-btn:hover {
		transform: translateX(8px);
		box-shadow: 0 0 40px rgba(99, 102, 241, 0.4);
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.hero {
			padding: 40px;
		}

		.section-container {
			padding: 0 40px;
		}

		.challenge-grid {
			grid-template-columns: 1fr;
			gap: 48px;
		}

		.comparison-grid {
			grid-template-columns: 1fr;
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

		.comparison-card {
			flex-direction: column;
			text-align: center;
		}

		.comparison-arrow {
			transform: rotate(90deg);
		}
	}
</style>
