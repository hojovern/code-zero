<script lang="ts">
	const days = [
		{
			day: 6,
			title: "Real-Time Magic",
			tagline: "Your app stops waiting. Everything updates instantly.",
			ship: ["Real-time data sync", "Presence indicators", "Live notifications"],
			wow: "My app updates instantly like Google Docs"
		},
		{
			day: 7,
			title: "Polish Like a Pro",
			tagline: "The difference between a project and a product is polish.",
			ship: ["Modal system", "Toast notifications", "Form validation"],
			wow: "This looks like a real product"
		},
		{
			day: 8,
			title: "Files & Media",
			tagline: "Your app handles more than text now.",
			ship: ["File uploads", "Image optimization", "Gallery component"],
			wow: "Users can upload anything"
		},
		{
			day: 9,
			title: "Automate Everything",
			tagline: "Your product starts working without you.",
			ship: ["n8n workflows", "Webhook integrations", "Scheduled tasks"],
			wow: "Things happen automatically"
		},
		{
			day: 10,
			title: "AI Agents On Autopilot",
			tagline: "Your AI doesn't wait to be asked. It just works.",
			ship: ["AI Content Agent", "AI Welcome Agent", "Mission Control"],
			wow: "AI is working for me 24/7"
		}
	];

	const outcomes = [
		"Real-time subscriptions (live data updates)",
		"Presence indicators (who's online)",
		"Professional modals, toasts, and forms",
		"File upload system with Supabase Storage",
		"At least 3 automated n8n workflows",
		"AI agents that run on schedule or triggers",
		"Mission control dashboard showing all automations",
		"Demo of your automated, real-time product"
	];

	const techStack = [
		{ tool: "Supabase Realtime", day: "6", learn: "Live subscriptions, presence" },
		{ tool: "Advanced Svelte", day: "7", learn: "Modals, transitions, stores" },
		{ tool: "Supabase Storage", day: "8", learn: "File uploads, signed URLs" },
		{ tool: "n8n", day: "9-10", learn: "Visual workflow automation" },
		{ tool: "Webhooks", day: "9-10", learn: "Event-driven architecture" },
		{ tool: "Cron/Scheduling", day: "10", learn: "Time-based automation" }
	];
</script>

<svelte:head>
	<title>Week 2: Real-Time & Automation | code:zero</title>
	<meta name="description" content="Your product stops waiting for you. Real-time features, professional UI, file uploads, and AI agents on autopilot." />
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
		<span class="nav-title">Week 2: Real-Time & Automation</span>
		<div class="nav-spacer"></div>
	</div>
</nav>

<!-- Breadcrumb + Hero -->
<section class="week-hero">
	<div class="container">
		<nav class="breadcrumb">
			<a href="/learn">Learn</a>
			<span class="separator">/</span>
			<span class="current">Week 2</span>
		</nav>

		<div class="week-badge">Week 2</div>
		<h1 class="week-title">Real-Time & Automation</h1>
		<p class="week-tagline">"Your product stops waiting for you to do things."</p>

		<div class="week-promise">
			<p>By Friday, you have:</p>
			<ol>
				<li>Real-time features that update instantly</li>
				<li>Professional UI that feels polished</li>
				<li>File uploads and media handling</li>
				<li>Automated workflows that run without you</li>
				<li>AI agents working 24/7 on autopilot</li>
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
				<a href="/learn/week-2/day-{day.day}" class="day-block">
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
			{#each outcomes as outcome}
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

<!-- Resources -->
<section class="resources-section">
	<div class="container">
		<h2 class="section-title">Week 2 Resources</h2>
		<div class="resources-grid">
			<a href="/syllabus/week-2/exercises/" class="resource-card" target="_blank">
				<div class="resource-icon">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
						<polyline points="14 2 14 8 20 8"/>
						<line x1="16" y1="13" x2="8" y2="13"/>
						<line x1="16" y1="17" x2="8" y2="17"/>
						<polyline points="10 9 9 9 8 9"/>
					</svg>
				</div>
				<div class="resource-content">
					<h3>Exercises</h3>
					<p>Hands-on practice with realtime, UI, files, automation</p>
				</div>
				<svg class="resource-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
			<a href="/syllabus/week-2/outcome-map.md" class="resource-card" target="_blank">
				<div class="resource-icon">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
						<circle cx="12" cy="10" r="3"/>
					</svg>
				</div>
				<div class="resource-content">
					<h3>Outcome Map</h3>
					<p>Job skills, portfolio pieces, interview prep</p>
				</div>
				<svg class="resource-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
		</div>
	</div>
</section>

<!-- Mindset -->
<section class="mindset-section">
	<div class="container">
		<div class="mindset-card">
			<h2 class="mindset-title">Week 2 Mindset</h2>
			<p class="mindset-quote">"Automate yourself out of the loop."</p>
			<p class="mindset-text">
				Most founders are bottlenecks. Everything waits for them:
			</p>
			<ul class="mindset-list">
				<li>"I need to send that email"</li>
				<li>"I need to create that content"</li>
				<li>"I need to check that data"</li>
			</ul>
			<p class="mindset-text">
				Week 2 teaches you to build systems that don't need you. By Friday, your product is doing work at 3am while you sleep.
			</p>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="cta-section">
	<div class="container">
		<a href="/learn/week-2/day-6" class="btn btn-primary btn-lg">
			Start Day 6
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
		--space-1: 0.25rem; --space-2: 0.5rem; --space-3: 0.75rem; --space-4: 1rem;
		--space-5: 1.25rem; --space-6: 1.5rem; --space-8: 2rem; --space-10: 2.5rem;
		--space-12: 3rem; --space-16: 4rem; --space-20: 5rem;
	}
	:global(*, *::before, *::after) { box-sizing: border-box; }
	:global(body) { margin: 0; font-family: var(--font-body); background: var(--bg-base); color: var(--text-secondary); line-height: 1.6; }
	.container { width: 100%; max-width: 1024px; margin: 0 auto; padding: 0 var(--space-4); }
	@media (min-width: 640px) { .container { padding: 0 var(--space-6); } }

	.navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: var(--space-4) 0; background: rgba(26, 29, 35, 0.95); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border-subtle); }
	.nav-container { position: relative; max-width: 1280px; margin: 0 auto; padding: 0 var(--space-4); display: flex; align-items: center; justify-content: space-between; }
	.nav-back { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; color: var(--text-secondary); text-decoration: none; border-radius: var(--radius-md); transition: color 150ms, background 150ms; }
	.nav-back:hover { color: var(--text-primary); background: var(--bg-hover); }
	.nav-title { position: absolute; left: 50%; transform: translateX(-50%); font-family: var(--font-heading); font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); letter-spacing: 0.02em; }
	.nav-spacer { width: 40px; }

	.btn { display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); padding: var(--space-3) var(--space-6); font-family: var(--font-body); font-size: 0.875rem; font-weight: 600; border-radius: var(--radius-md); cursor: pointer; text-decoration: none; transition: all 200ms; border: none; }
	.btn-primary { background: var(--gradient-accent); color: white; box-shadow: var(--shadow-glow-sm), var(--shadow-md); }
	.btn-primary:hover { box-shadow: var(--shadow-glow-md), var(--shadow-lg); transform: translateY(-2px); }
	.btn-lg { padding: var(--space-4) var(--space-8); font-size: 1rem; border-radius: var(--radius-lg); }

	.week-hero { padding: calc(var(--space-20) + 80px) 0 var(--space-12); background: linear-gradient(180deg, var(--bg-base) 0%, var(--bg-elevated) 100%); }
	.breadcrumb { display: flex; align-items: center; gap: var(--space-2); font-size: 0.875rem; margin-bottom: var(--space-6); }
	.breadcrumb a { color: var(--text-muted); text-decoration: none; transition: color 150ms; }
	.breadcrumb a:hover { color: var(--color-primary); }
	.breadcrumb .separator { color: var(--text-muted); }
	.breadcrumb .current { color: var(--text-secondary); }
	.week-badge { display: inline-block; padding: var(--space-2) var(--space-4); background: var(--gradient-accent); border-radius: var(--radius-full); font-size: 0.875rem; font-weight: 700; color: white; margin-bottom: var(--space-4); }
	.week-title { font-family: var(--font-heading); font-size: clamp(2rem, 6vw, 3rem); font-weight: 800; color: var(--text-primary); margin: 0 0 var(--space-3); letter-spacing: -0.03em; }
	.week-tagline { font-size: 1.25rem; font-style: italic; color: var(--text-secondary); margin: 0 0 var(--space-8); }
	.week-promise { background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: var(--space-6); max-width: 480px; }
	.week-promise p { font-weight: 600; color: var(--text-primary); margin: 0 0 var(--space-3); }
	.week-promise ol { margin: 0; padding-left: var(--space-6); }
	.week-promise li { color: var(--text-secondary); padding: var(--space-1) 0; }

	.days-section { padding: var(--space-16) 0; }
	.section-title { font-family: var(--font-heading); font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin: 0 0 var(--space-8); }
	.days-timeline { display: flex; flex-direction: column; gap: var(--space-4); }
	.day-block { background: var(--bg-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: var(--space-6); text-decoration: none; transition: all 200ms; }
	.day-block:hover { border-color: var(--color-primary); transform: translateX(4px); }
	.day-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-3); }
	.day-number { display: inline-block; padding: var(--space-1) var(--space-3); background: var(--color-primary); border-radius: var(--radius-sm); font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: white; }
	.day-wow { font-size: 0.8125rem; font-style: italic; color: var(--color-primary); }
	.day-title { font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin: 0 0 var(--space-2); }
	.day-tagline { font-size: 0.9375rem; color: var(--text-secondary); margin: 0 0 var(--space-4); }
	.day-ships { margin-bottom: var(--space-4); }
	.ships-label { display: block; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: var(--space-2); }
	.day-ships ul { display: flex; flex-wrap: wrap; gap: var(--space-2); list-style: none; padding: 0; margin: 0; }
	.day-ships li { padding: var(--space-1) var(--space-3); background: var(--bg-surface); border-radius: var(--radius-full); font-size: 0.8125rem; color: var(--text-secondary); }
	.day-cta { display: inline-flex; align-items: center; gap: var(--space-2); font-size: 0.875rem; font-weight: 600; color: var(--color-primary); }

	.outcomes-section { padding: var(--space-16) 0; background: var(--bg-elevated); }
	.outcomes-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-3); }
	@media (min-width: 640px) { .outcomes-grid { grid-template-columns: repeat(2, 1fr); } }
	.outcome-item { display: flex; align-items: flex-start; gap: var(--space-3); padding: var(--space-3); background: var(--bg-surface); border-radius: var(--radius-md); }
	.outcome-check { display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; background: rgba(4, 164, 89, 0.2); border-radius: var(--radius-sm); color: var(--color-primary); flex-shrink: 0; }
	.outcome-text { font-size: 0.9375rem; color: var(--text-secondary); }

	.tech-section { padding: var(--space-16) 0; }
	.tech-table { background: var(--bg-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); overflow: hidden; }
	.tech-header { display: grid; grid-template-columns: 140px 60px 1fr; gap: var(--space-4); padding: var(--space-4); background: var(--bg-surface); font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); }
	.tech-row { display: grid; grid-template-columns: 140px 60px 1fr; gap: var(--space-4); padding: var(--space-4); border-top: 1px solid var(--border-subtle); font-size: 0.9375rem; }
	.tech-tool { font-weight: 600; color: var(--text-primary); }
	.tech-day { color: var(--color-primary); font-weight: 500; }
	.tech-learn { color: var(--text-secondary); }

	.resources-section { padding: var(--space-16) 0; }
	.resources-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-4); }
	@media (min-width: 640px) { .resources-grid { grid-template-columns: repeat(2, 1fr); } }
	.resource-card { display: flex; align-items: center; gap: var(--space-4); padding: var(--space-5); background: var(--bg-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); text-decoration: none; transition: all 200ms; }
	.resource-card:hover { border-color: var(--color-primary); transform: translateY(-2px); }
	.resource-icon { display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: rgba(4, 164, 89, 0.1); border-radius: var(--radius-md); color: var(--color-primary); flex-shrink: 0; }
	.resource-content { flex: 1; }
	.resource-content h3 { font-family: var(--font-heading); font-size: 1rem; font-weight: 600; color: var(--text-primary); margin: 0 0 var(--space-1); }
	.resource-content p { font-size: 0.875rem; color: var(--text-secondary); margin: 0; }
	.resource-arrow { color: var(--text-muted); flex-shrink: 0; transition: color 150ms, transform 150ms; }
	.resource-card:hover .resource-arrow { color: var(--color-primary); transform: translateX(4px); }

	.mindset-section { padding: var(--space-16) 0; background: var(--bg-elevated); }
	.mindset-card { background: linear-gradient(135deg, rgba(4, 164, 89, 0.1) 0%, rgba(4, 164, 89, 0.05) 100%); border: 1px solid rgba(4, 164, 89, 0.3); border-radius: var(--radius-xl); padding: var(--space-8); }
	.mindset-title { font-family: var(--font-heading); font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin: 0 0 var(--space-4); }
	.mindset-quote { font-size: 1.25rem; font-weight: 600; font-style: italic; color: var(--color-primary); margin: 0 0 var(--space-4); }
	.mindset-text { font-size: 1rem; color: var(--text-secondary); margin: 0 0 var(--space-4); line-height: 1.7; }
	.mindset-list { list-style: none; padding: 0; margin: 0 0 var(--space-4); }
	.mindset-list li { padding: var(--space-2) 0; padding-left: var(--space-6); position: relative; color: var(--text-secondary); }
	.mindset-list li::before { content: "→"; position: absolute; left: 0; color: var(--color-primary); }

	.cta-section { padding: var(--space-12) 0 var(--space-20); text-align: center; }
</style>
