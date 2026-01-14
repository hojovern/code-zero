<script lang="ts">
	import { openTasterModal } from '$lib/stores/auth';

	const days = [
		{
			number: 1,
			title: 'The Sovereign Terminal',
			focus: 'COMMAND',
			description: 'Break free from "point-and-click." Master the CLI and install your personal AI Agent fleet.',
			outcomes: [
				'Terminal environment & shell mastery',
				'Claude & Gemini CLI integration',
				'Automated file auditing & variance reporting',
				'Batch data processing via AI Agents'
			]
		},
		{
			number: 2,
			title: 'The Brain & The Dashboard',
			focus: 'STRUCTURE',
			description: 'Build a persistent memory layer for your business. Connect your data to a custom full-stack UI.',
			outcomes: [
				'SvelteKit & Supabase foundations',
				'The "AI Brain" (Persistent RAG system)',
				'Internal Management Dashboard',
				'Secure database architecture for P&L data'
			]
		},
		{
			number: 3,
			title: 'The Automated Manager',
			focus: 'LEVERAGE',
			description: 'Connect your Brain to the world. Build "Digital Mike"—a system that works while you sleep.',
			outcomes: [
				'Morning Email Synthesis (Zero-Touch)',
				'Raw Data-to-PowerPoint Automation',
				'Complex n8n Workflow engineering',
				'The Technical Leverage Roadmap'
			]
		}
	];

	const stats = [
		{ value: '3 Days', label: 'Intensive' },
		{ value: '1:1', label: 'Private Training' },
		{ value: '10h+', label: 'Weekly Time Saved' },
		{ value: 'Sovereign', label: 'Tech Stack' }
	];
</script>

<svelte:head>
	<title>Enterprise AI Full Stack: The Quantum Degree | code:zero</title>
	<meta name="description" content="A 3-day intensive for managers. Master the terminal, build an AI brain, and automate your entire reporting pipeline. Gain 10+ hours a week back." />
</svelte:head>

<div class="page">
	<!-- Hero -->
	<section class="hero">
		<div class="container">
			<div class="hero-badge">The Quantum Degree</div>
			<h1>Enterprise AI Full Stack</h1>
			<p class="tagline">3 Days to gain 10 hours a week back.</p>
			<p class="subtitle">
				Built for the "Mikes" of the world. Stop managing spreadsheets. Start engineering systems. Master full-stack development, terminal AI, and deep process automation in a high-intensity 3-day sprint.
			</p>
			<div class="hero-cta">
				<button class="btn btn-primary" onclick={openTasterModal}>Book Your 3-Day Sprint</button>
				<div class="pricing-options">
					<span class="price">Solo: RM 12,800</span>
					<span class="price-separator">·</span>
					<span class="price">Team: RM 38,000</span>
				</div>
			</div>
		</div>
	</section>

	<!-- Stats Bar -->
	<section class="stats-bar">
		<div class="container">
			<div class="stats-grid">
				{#each stats as stat}
					<div class="stat-item">
						<span class="stat-value">{stat.value}</span>
						<span class="stat-label">{stat.label}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- The Journey -->
	<section class="journey">
		<div class="container">
			<header class="section-header">
				<h2>The 3-Day Journey</h2>
				<p>From non-technical manager to Sovereign System Engineer.</p>
			</header>

			<div class="days-stack">
				{#each days as day}
					<div class="day-card">
						<div class="day-header">
							<div class="day-info">
								<span class="day-num">DAY 0{day.number}</span>
								<span class="day-focus">{day.focus}</span>
							</div>
							<h3>{day.title}</h3>
						</div>
						<div class="day-body">
							<p>{day.description}</p>
							<div class="outcomes-list">
								<h4>Key Mastery:</h4>
								<ul>
									{#each day.outcomes as outcome}
										<li>
											<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
												<polyline points="20 6 9 17 4 12"/>
											</svg>
											{outcome}
										</li>
									{/each}
								</ul>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- The Mike Outcome -->
	<section class="mike-outcome">
		<div class="container">
			<div class="outcome-box">
				<div class="box-content">
					<h2>The "Digital Mike" Protocol</h2>
					<p>On Day 3, we deploy your custom automation suite. You leave with a system that handles your most draining tasks:</p>
					<div class="feature-grid">
						<div class="feature">
							<strong>Executive Summary Bot</strong>
							<p>Wakes up at 6am. Reads your inbox. Sends you a concise Slack briefing of what actually requires your attention.</p>
						</div>
						<div class="feature">
							<strong>PowerPoint Architect</strong>
							<p>Drop a raw P&L spreadsheet into a folder. Watch an AI agent generate a formatted, insights-driven deck in 60 seconds.</p>
						</div>
						<div class="feature">
							<strong>Policy Oracle</strong>
							<p>A private "Brain" that knows every company policy and financial decision you've ever made. Instant answers, zero searching.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- FAQ/Logic -->
	<section class="logic">
		<div class="container">
			<div class="logic-grid">
				<div class="logic-text">
					<h2>Why 3 Days?</h2>
					<p>Because "1-day" is a demo, and "2-weeks" is impossible for a busy manager. 3 days is the minimum time required to break your old habits, master the terminal, and actually build a production-ready system you can trust.</p>
				</div>
				<div class="logic-cta">
					<div class="pricing-mini">
						<span class="price-val">RM 38,000</span>
						<p>Full Team Cohort (Up to 12 pax).<br>Individual Slot: RM 12,800.</p>
						<p>All-inclusive private training. All systems are yours to keep.</p>
						<button class="btn btn-primary btn-full" onclick={openTasterModal}>Start Your Quantum Leap</button>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	.page {
		background: #0f1115;
		color: white;
		font-family: 'Quicksand', sans-serif;
	}

	.container {
		max-width: 1100px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	section { padding: 6rem 0; }

	/* Hero */
	.hero {
		text-align: center;
		padding: 10rem 0 6rem;
		background: radial-gradient(circle at top, rgba(4, 164, 89, 0.1) 0%, transparent 70%);
	}

	.hero-badge {
		display: inline-block;
		background: rgba(4, 164, 89, 0.15);
		color: #04A459;
		padding: 0.5rem 1.25rem;
		border-radius: 100px;
		font-size: 0.85rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: 2rem;
	}

	.hero h1 {
		font-size: clamp(2.5rem, 7vw, 4.5rem);
		font-weight: 800;
		line-height: 1;
		margin-bottom: 1.5rem;
		letter-spacing: -0.03em;
	}

	.tagline {
		font-size: 1.75rem;
		color: #04A459;
		font-weight: 600;
		margin-bottom: 1.5rem;
	}

	.subtitle {
		font-size: 1.2rem;
		color: #a1a1a1;
		max-width: 750px;
		margin: 0 auto 3rem;
		line-height: 1.6;
	}

	.hero-cta {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 1.25rem 3rem;
		border-radius: 100px;
		font-weight: 700;
		font-size: 1.1rem;
		border: none;
		cursor: pointer;
		transition: all 0.2s;
	}

	.btn-primary {
		background: #04A459;
		color: white;
		box-shadow: 0 10px 30px rgba(4, 164, 89, 0.3);
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 15px 40px rgba(4, 164, 89, 0.4);
	}

	.price {
		font-family: 'JetBrains Mono', monospace;
		color: #666;
		font-size: 0.9rem;
	}

	/* Stats Bar */
	.stats-bar {
		background: rgba(255, 255, 255, 0.02);
		border-top: 1px solid rgba(255, 255, 255, 0.05);
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
		padding: 3rem 0;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 2rem;
		text-align: center;
	}

	.stat-value {
		display: block;
		font-size: 2rem;
		font-weight: 800;
		color: white;
		margin-bottom: 0.25rem;
	}

	.stat-label {
		font-size: 0.85rem;
		color: #666;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	/* Journey / Days */
	.section-header {
		text-align: center;
		margin-bottom: 5rem;
	}

	.section-header h2 { font-size: 3rem; margin-bottom: 1rem; }
	.section-header p { font-size: 1.25rem; color: #a1a1a1; }

	.days-stack {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.day-card {
		background: #16191e;
		border-radius: 24px;
		border: 1px solid rgba(255, 255, 255, 0.05);
		padding: 3rem;
		display: grid;
		grid-template-columns: 300px 1fr;
		gap: 4rem;
		transition: border-color 0.3s;
	}

	.day-card:hover { border-color: #04A459; }

	.day-num {
		font-family: 'JetBrains Mono', monospace;
		color: #04A459;
		font-weight: 700;
		display: block;
		margin-bottom: 0.5rem;
	}

	.day-focus {
		font-size: 0.75rem;
		font-weight: 800;
		background: rgba(255, 255, 255, 0.05);
		padding: 0.25rem 0.75rem;
		border-radius: 4px;
		letter-spacing: 0.1em;
		color: #888;
	}

	.day-header h3 { font-size: 2rem; line-height: 1.2; margin-top: 1.5rem; }

	.day-body p { font-size: 1.1rem; color: #a1a1a1; margin-bottom: 2rem; line-height: 1.6; }

	.outcomes-list h4 { font-size: 0.9rem; text-transform: uppercase; color: #666; margin-bottom: 1rem; letter-spacing: 0.05em; }
	.outcomes-list ul { list-style: none; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
	.outcomes-list li { display: flex; align-items: flex-start; gap: 0.75rem; font-size: 0.95rem; color: white; font-weight: 500; }
	.outcomes-list svg { color: #04A459; flex-shrink: 0; margin-top: 2px; }

	/* Outcome Box */
	.outcome-box {
		background: linear-gradient(135deg, #04A459 0%, #026b3d 100%);
		padding: 5rem;
		border-radius: 40px;
		color: white;
		position: relative;
		overflow: hidden;
	}

	.outcome-box::before {
		content: '';
		position: absolute;
		top: 0; right: 0;
		width: 300px; height: 300px;
		background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
		pointer-events: none;
	}

	.outcome-box h2 { font-size: 2.5rem; margin-bottom: 1.5rem; }
	.outcome-box p { font-size: 1.25rem; margin-bottom: 3rem; opacity: 0.9; max-width: 700px; }

	.feature-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 3rem;
	}

	.feature strong { display: block; font-size: 1.25rem; color: #38ff98; margin-bottom: 0.75rem; }
	.feature p { font-size: 1rem; line-height: 1.5; margin: 0; }

	/* Logic Section */
	.logic-grid {
		display: grid;
		grid-template-columns: 1.2fr 0.8fr;
		gap: 4rem;
		align-items: center;
	}

	.logic-text h2 { font-size: 2.5rem; margin-bottom: 1.5rem; }
	.logic-text p { font-size: 1.1rem; color: #a1a1a1; line-height: 1.7; }

	.pricing-mini {
		background: #16191e;
		padding: 3rem;
		border-radius: 32px;
		border: 1px solid rgba(255, 255, 255, 0.05);
		text-align: center;
	}

	.price-val { font-size: 3rem; font-weight: 800; color: #04A459; display: block; margin-bottom: 1rem; }
	.pricing-mini p { font-size: 0.95rem; color: #666; margin-bottom: 2rem; }
	.btn-full { width: 100%; }

	/* Responsive */
	@media (max-width: 1024px) {
		.day-card { grid-template-columns: 1fr; gap: 2rem; padding: 2.5rem; }
		.outcomes-list ul { grid-template-columns: 1fr; }
		.feature-grid { grid-template-columns: 1fr; gap: 2rem; }
		.logic-grid { grid-template-columns: 1fr; }
		.outcome-box { padding: 3rem; }
	}

	@media (max-width: 600px) {
		.stats-grid { grid-template-columns: 1fr 1fr; gap: 1.5rem; }
		.hero h1 { font-size: 2.5rem; }
	}
</style>
