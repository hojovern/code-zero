<script lang="ts">
	import { page } from '$app/stores';
	const username = $page.params.username;
	const schedule = {
		morning: [
			{ time: "9:00 - 9:30", activity: "Agent Architecture", outcome: "Design your AI workforce" },
			{ time: "9:30 - 10:30", activity: "Content Agent", outcome: "Scheduled content generation" },
			{ time: "10:30 - 10:45", activity: "Break", outcome: "" },
			{ time: "10:45 - 12:00", activity: "Welcome Agent", outcome: "AI-powered onboarding" }
		],
		afternoon: [
			{ time: "13:00 - 14:00", activity: "Insight Agent", outcome: "Daily AI reports" },
			{ time: "14:00 - 14:30", activity: "Mission Control Dashboard", outcome: "See all agents running" },
			{ time: "14:30 - 15:30", activity: "DEMO DAY", outcome: "Everyone presents" },
			{ time: "15:30 - 16:00", activity: "Feedback Session", outcome: "Learn from each other" },
			{ time: "16:00 - 17:00", activity: "Week 2 Retro", outcome: "What worked, what didn't" },
			{ time: "17:00 - 17:30", activity: "Week 3 Preview", outcome: "What's coming next" }
		]
	};

	const agents = [
		{ name: "Content Agent", trigger: "Every Monday 6am", action: "Generates blog + social + email" },
		{ name: "Welcome Agent", trigger: "New signup", action: "Creates personalized onboarding" },
		{ name: "Insight Agent", trigger: "Daily 8am", action: "Analyzes data, sends report" },
		{ name: "Alert Agent", trigger: "Threshold crossed", action: "Warns about issues" },
		{ name: "Mission Control", trigger: "—", action: "Dashboard showing all agents" }
	];

	const weekSummary = [
		"Real-time data sync",
		"Presence indicators",
		"Professional UI (modals, toasts, validation)",
		"File upload system",
		"n8n automation workflows",
		"AI Content Agent",
		"AI Welcome Agent",
		"AI Insight Agent",
		"Mission Control dashboard",
		"Demo of AI agents working live"
	];
</script>

<svelte:head>
	<title>Day 10: AI Agents On Autopilot | code:zero</title>
	<meta name="description" content="Your AI doesn't wait to be asked. It just works. Build AI agents that run 24/7 on schedules and events." />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
</svelte:head>

<!-- Navigation -->
<nav class="navbar">
	<div class="nav-container">
		<a href="/student-portal/{username}/full-stack-web-development/week-2" class="nav-back">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M19 12H5M12 19l-7-7 7-7"/>
			</svg>
		</a>
		<span class="nav-title">Day 10: AI Agents On Autopilot</span>
		<div class="nav-spacer"></div>
	</div>
</nav>

<article class="lesson">
	<div class="container">
		<!-- Breadcrumb -->
		<nav class="breadcrumb">
			<a href="/student-portal/{username}">Learn</a>
			<span class="sep">/</span>
			<a href="/student-portal/{username}/full-stack-web-development/week-2">Week 2</a>
			<span class="sep">/</span>
			<span class="current">Day 10</span>
		</nav>

		<!-- Lesson Header -->
		<header class="lesson-header">
			<div class="day-badge">Day 10 — Week 2 Capstone</div>
			<h1 class="lesson-title">AI Agents On Autopilot</h1>
			<p class="lesson-tagline">"Your AI doesn't wait to be asked. It just works."</p>
		</header>

		<!-- Challenge -->
		<section class="content-section">
			<div class="challenge-card">
				<h2>The Challenge</h2>
				<p><strong>By end of day, you have AI agents running automatically, 24/7.</strong></p>
				<p>Not AI you click a button to use. AI that runs on schedules. AI that triggers on events. AI that does work while you're asleep.</p>
				<p class="emphasis">This is the Week 2 capstone: AI + Automation = AI Agents On Autopilot.</p>
			</div>
		</section>

		<!-- What You're Building -->
		<section class="content-section">
			<h2>What You're Building</h2>
			<div class="info-table">
				<div class="info-row header">
					<span>Agent</span>
					<span>Trigger → What It Does</span>
				</div>
				{#each agents as agent}
					<div class="info-row">
						<span>{agent.name}</span>
						<span>{agent.trigger} → {agent.action}</span>
					</div>
				{/each}
			</div>
			<div class="highlight-box">
				<strong>The WOW Moment</strong>
				<p>Watch your AI agents working in real-time during your demo.</p>
			</div>
		</section>

		<!-- Schedule -->
		<section class="content-section">
			<h2>Schedule</h2>

			<h3>Morning Block (9:00 - 12:00)</h3>
			<div class="schedule-table">
				{#each schedule.morning as item}
					<div class="schedule-row" class:break={item.activity === 'Break'}>
						<span class="schedule-time">{item.time}</span>
						<span class="schedule-activity">{item.activity}</span>
						<span class="schedule-outcome">{item.outcome}</span>
					</div>
				{/each}
			</div>

			<h3>Lunch (12:00 - 13:00) — Final prep for demo</h3>

			<h3>Afternoon Block (13:00 - 17:30)</h3>
			<div class="schedule-table">
				{#each schedule.afternoon as item}
					<div class="schedule-row" class:break={item.activity === 'Break'} class:demo={item.activity === 'DEMO DAY'}>
						<span class="schedule-time">{item.time}</span>
						<span class="schedule-activity">{item.activity}</span>
						<span class="schedule-outcome">{item.outcome}</span>
					</div>
				{/each}
			</div>
		</section>

		<!-- Morning Content -->
		<section class="content-section">
			<h2>Morning: Build Your AI Workforce</h2>

			<h3>1. Agent Architecture (30 min)</h3>

			<div class="code-block prompt">
				<pre><code>You: Help me design an AI agent system for [my product].

I want agents that:
1. Run automatically (scheduled or event-triggered)
2. Use AI (Gemini) to do intelligent work
3. Take actions (save to DB, send emails, notify)
4. Log their activity for visibility

Map out:
- What agents should I build?
- What triggers each one?
- What does each agent do?
- How do I monitor them?</code></pre>
			</div>

			<p><strong>Agent system structure:</strong></p>
			<div class="code-block">
				<pre><code>AI Agents System
├── Content Agent
│   ├── Trigger: Every Monday 6am
│   ├── Action: Generate weekly content
│   └── Output: Blog + social + email in DB
│
├── Welcome Agent
│   ├── Trigger: New user signup
│   ├── Action: Analyze profile, personalize onboarding
│   └── Output: Custom welcome + recommendations
│
├── Insight Agent
│   ├── Trigger: Daily 8am
│   ├── Action: Analyze yesterday's activity
│   └── Output: Report email to admin
│
└── Mission Control
    └── Dashboard showing all agent activity</code></pre>
			</div>

			<h3>2. Content Agent (60 min)</h3>

			<div class="code-block">
				<pre><code>In n8n:
1. Add Schedule trigger
   - Every Monday at 6:00 AM

2. Add HTTP Request node
   - GET your app's /api/content/topics
   - Get trending topics or content calendar

3. Add HTTP Request node (to Gemini)
   - Generate full blog post
   - Use your blog-writer prompt from Week 1

4. Add HTTP Request node (to Gemini again)
   - Generate 5 social snippets from blog

5. Add HTTP Request node
   - POST to your app's /api/content
   - Save all generated content to database

6. Add Slack node
   - "🤖 Content Agent: Generated weekly content"</code></pre>
			</div>

			<h3>3. Welcome Agent (75 min)</h3>

			<div class="code-block">
				<pre><code>In n8n:
1. Webhook trigger (new user)

2. Add HTTP Request node (to Gemini)
   Prompt: "Based on this user profile, create:
   1. A personalized welcome message (2-3 sentences)
   2. 3 recommended first actions based on their likely goals
   3. One tip that would help them succeed

   User: {name}, signed up from {source}
   Make it warm and specific, not generic."

3. Add HTTP Request node
   - POST to your app's /api/users/{id}/onboarding
   - Save personalized welcome content

4. Add Email node
   - Send personalized welcome email

5. Log the agent run</code></pre>
			</div>
		</section>

		<!-- Afternoon Content -->
		<section class="content-section">
			<h2>Afternoon: Monitoring + Demo</h2>

			<h3>4. Insight Agent (60 min)</h3>

			<div class="code-block">
				<pre><code>In n8n:
1. Schedule trigger: Daily 8:00 AM

2. Add Supabase node
   - Query yesterday's activity
   - Count new users, content created, AI tasks
   - Get any errors

3. Add HTTP Request (to Gemini)
   Prompt: "Analyze this product data and provide:
   1. One-sentence summary of yesterday
   2. Key metric highlight (best performing)
   3. One concern to watch
   4. One recommendation for today

   Data: {activity_data}
   Be concise and actionable."

4. Add Email node
   - Send daily report to admin

5. Log to agent_runs table</code></pre>
			</div>

			<h3>5. Mission Control Dashboard (30 min)</h3>

			<div class="code-block prompt">
				<pre><code>You: Create a /admin/mission-control page.

This is the command center for all AI agents. Include:

1. Agent Status Cards:
   - One card per agent
   - Name, description, trigger type
   - Last run time + status (success/failed)
   - Next scheduled run
   - Run count (today/this week)

2. Live Activity Feed:
   - Real-time stream of agent executions
   - "Content Agent started..." "Welcome Agent completed..."
   - Color coded: green=success, red=error, yellow=running

3. Quick Stats:
   - Total agent runs today
   - Success rate
   - Content generated this week

4. Manual Controls:
   - "Run Now" button for each agent
   - Enable/disable toggle
   - View logs link

Make it feel like a mission control center. Real-time updates.
Use the Supabase Realtime subscription for live activity feed.</code></pre>
			</div>
		</section>

		<!-- Demo Day -->
		<section class="content-section">
			<h2>Demo Day</h2>

			<h3>The 2-Minute Demo Structure</h3>
			<div class="info-table">
				<div class="info-row header">
					<span>Section</span>
					<span>Time → What to Show</span>
				</div>
				<div class="info-row">
					<span>Hook</span>
					<span>15 sec → "My AI workforce runs while I sleep"</span>
				</div>
				<div class="info-row">
					<span>Mission Control</span>
					<span>30 sec → Show dashboard with all agents</span>
				</div>
				<div class="info-row">
					<span>Live Agent</span>
					<span>60 sec → Trigger agent, watch it work in real-time</span>
				</div>
				<div class="info-row">
					<span>Results</span>
					<span>15 sec → Show what the agent produced</span>
				</div>
			</div>

			<h3>Demo Script</h3>
			<div class="code-block">
				<pre><code>HOOK (15 seconds):
"Last week I had AI features. This week I have AI employees.
Let me show you my mission control."

MISSION CONTROL (30 seconds):
[Show dashboard]
"These are my AI agents. Content Agent runs every Monday—
it's already created 4 blog posts automatically.
Welcome Agent greets every new user with personalized onboarding.
Insight Agent sends me a report every morning."

[Point to live feed]
"This is real-time. Watch what happens when I trigger an agent."

LIVE AGENT (60 seconds):
[Click "Run Now" on an agent]
"I just triggered the Content Agent. Watch the feed..."
[Activity shows: "Content Agent started..."]
[Wait for completion]
"It just generated a full blog post, 5 tweets, and an email draft."
[Show in Slack: notification arrives]
"My team just got notified in Slack."

RESULTS (15 seconds):
[Show generated content]
"All of this happened automatically. No clicking. No prompting.
AI agents working while I sleep. That's Week 2."</code></pre>
			</div>

			<h3>Demo Rules</h3>
			<ol>
				<li><strong>2 minutes MAX</strong></li>
				<li><strong>Show Mission Control</strong> — The command center</li>
				<li><strong>Trigger live</strong> — Show an agent actually running</li>
				<li><strong>Real results</strong> — Show what the AI produced</li>
				<li><strong>Have backup</strong> — Pre-recorded video if live fails</li>
			</ol>
		</section>

		<!-- Week 2 Summary -->
		<section class="content-section">
			<h2>Week 2 Complete</h2>

			<h3>What You Shipped</h3>
			<div class="checklist">
				{#each weekSummary as item}
					<label class="checklist-item">
						<input type="checkbox" checked disabled />
						<span>{item}</span>
					</label>
				{/each}
			</div>

			<h3>What You Proved</h3>
			<ul>
				<li>You can build systems that run without you</li>
				<li>You can make AI work autonomously</li>
				<li>You can monitor and control automation</li>
				<li>You can present complex systems simply</li>
			</ul>

			<h3>What's Different Now</h3>
			<div class="info-table">
				<div class="info-row">
					<span>Before</span>
					<span>After</span>
				</div>
				<div class="info-row">
					<span>AI feature you click</span>
					<span>AI that runs itself</span>
				</div>
				<div class="info-row">
					<span>Manual everything</span>
					<span>Automated workflows</span>
				</div>
				<div class="info-row">
					<span>You are the operator</span>
					<span>Product operates itself</span>
				</div>
				<div class="info-row">
					<span>Builder</span>
					<span>Orchestrator</span>
				</div>
			</div>
		</section>

		<!-- The Transformation -->
		<section class="content-section">
			<div class="callout highlight">
				<h2>The Transformation</h2>
				<p>You're not just building products anymore. You're building teams—of AI agents that work for you.</p>
				<p style="margin-top: 1rem; margin-bottom: 0;"><strong>Week 3 Preview:</strong> Payments, Analytics, SEO, Testing, and Launch Prep. Time to turn your product into a business.</p>
			</div>
		</section>

		<!-- Practice Exercise -->
		<section class="content-section">
			<h2>Practice Exercise</h2>
			<p>Complete this capstone exercise:</p>
			<div class="exercises-grid">
				<a href="/syllabus/week-2/exercises/10-ai-agents.md" class="exercise-card" target="_blank">
					<div class="exercise-header">
						<span class="exercise-type">Project</span>
						<span class="exercise-duration">2 hours</span>
					</div>
					<h3>Build AI Agents</h3>
					<ul>
						<li>Design AI agent architectures</li>
						<li>Connect n8n workflows with AI APIs</li>
						<li>Build autonomous scheduled agents</li>
						<li>Create real-time monitoring dashboards</li>
					</ul>
				</a>
			</div>
		</section>

		<!-- Navigation -->
		<nav class="lesson-nav">
			<a href="/student-portal/{username}/full-stack-web-development/week-2/day-9" class="nav-prev">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M19 12H5M12 19l-7-7 7-7"/>
				</svg>
				Day 9: Automate Everything
			</a>
			<a href="/student-portal/{username}/full-stack-web-development/week-3" class="nav-next">
				Week 3: Product → Business
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
		</nav>
	</div>
</article>

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
		--font-heading: 'Quicksand', system-ui, sans-serif;
		--font-body: 'Quicksand', system-ui, sans-serif;
		--font-mono: 'JetBrains Mono', monospace;
		--radius-sm: 4px;
		--radius-md: 8px;
		--radius-lg: 12px;
		--radius-xl: 16px;
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
		line-height: 1.7;
	}

	.container {
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
		padding: 0 var(--space-4);
	}

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
		white-space: nowrap;
	}

	.nav-spacer { width: 40px; }

	.lesson {
		padding: calc(var(--space-20) + 60px) 0 var(--space-20);
	}

	.breadcrumb {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-size: 0.875rem;
		margin-bottom: var(--space-8);
	}

	.breadcrumb a {
		color: var(--text-muted);
		text-decoration: none;
	}

	.breadcrumb a:hover { color: var(--color-primary); }
	.breadcrumb .sep { color: var(--text-muted); }
	.breadcrumb .current { color: var(--text-secondary); }

	.lesson-header {
		margin-bottom: var(--space-12);
		padding-bottom: var(--space-8);
		border-bottom: 1px solid var(--border-subtle);
	}

	.day-badge {
		display: inline-block;
		padding: var(--space-2) var(--space-4);
		background: var(--gradient-accent);
		border-radius: var(--radius-md);
		font-size: 0.875rem;
		font-weight: 700;
		color: white;
		margin-bottom: var(--space-4);
	}

	.lesson-title {
		font-family: var(--font-heading);
		font-size: clamp(1.75rem, 5vw, 2.5rem);
		font-weight: 800;
		color: var(--text-primary);
		margin: 0 0 var(--space-3);
		letter-spacing: -0.02em;
		line-height: 1.2;
	}

	.lesson-tagline {
		font-size: 1.125rem;
		font-style: italic;
		color: var(--text-secondary);
		margin: 0;
	}

	.content-section {
		margin-bottom: var(--space-12);
	}

	.content-section h2 {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin: 0 0 var(--space-4);
		padding-top: var(--space-4);
		border-top: 1px solid var(--border-subtle);
	}

	.content-section h3 {
		font-family: var(--font-heading);
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: var(--space-8) 0 var(--space-3);
	}

	.content-section p { margin: 0 0 var(--space-4); }

	.content-section ul, .content-section ol {
		margin: 0 0 var(--space-4);
		padding-left: var(--space-6);
	}

	.content-section li { margin-bottom: var(--space-2); }
	.content-section a { color: var(--color-primary); }

	.content-section code {
		font-family: var(--font-mono);
		font-size: 0.875em;
		padding: var(--space-1) var(--space-2);
		background: var(--bg-surface);
		border-radius: var(--radius-sm);
		color: var(--color-primary-light);
	}

	.emphasis {
		font-weight: 600;
		color: var(--text-primary);
	}

	.challenge-card {
		background: linear-gradient(135deg, rgba(4, 164, 89, 0.1) 0%, rgba(4, 164, 89, 0.05) 100%);
		border: 1px solid rgba(4, 164, 89, 0.3);
		border-radius: var(--radius-lg);
		padding: var(--space-6);
	}

	.challenge-card h2 {
		border: none;
		padding-top: 0;
		margin-top: 0;
	}

	.code-block {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		margin: var(--space-4) 0;
		overflow: hidden;
	}

	.code-block pre {
		margin: 0;
		padding: var(--space-4);
		overflow-x: auto;
	}

	.code-block code {
		font-family: var(--font-mono);
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--text-secondary);
		background: none;
		padding: 0;
	}

	.code-block.prompt {
		border-left: 3px solid var(--color-primary);
	}

	.code-block.prompt code {
		color: var(--text-primary);
	}

	.info-table {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		overflow: hidden;
		margin: var(--space-4) 0;
	}

	.info-row {
		display: grid;
		grid-template-columns: 1fr 1.5fr;
		border-bottom: 1px solid var(--border-subtle);
	}

	.info-row:last-child { border-bottom: none; }

	.info-row.header span {
		font-weight: 600;
		color: var(--text-primary);
		background: var(--bg-surface);
	}

	.info-row span {
		padding: var(--space-3) var(--space-4);
		font-size: 0.875rem;
	}

	.info-row span:first-child {
		border-right: 1px solid var(--border-subtle);
		color: var(--text-muted);
	}

	.info-row span:last-child { color: var(--text-secondary); }

	.schedule-table {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		overflow: hidden;
		margin: var(--space-4) 0;
	}

	.schedule-row {
		display: grid;
		grid-template-columns: 120px 1fr 1fr;
		border-bottom: 1px solid var(--border-subtle);
	}

	.schedule-row:last-child { border-bottom: none; }

	.schedule-row.break {
		background: var(--bg-surface);
		opacity: 0.6;
	}

	.schedule-row.demo {
		background: linear-gradient(135deg, rgba(4, 164, 89, 0.15) 0%, rgba(4, 164, 89, 0.05) 100%);
	}

	.schedule-time, .schedule-activity, .schedule-outcome {
		padding: var(--space-3) var(--space-4);
		font-size: 0.875rem;
	}

	.schedule-time {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		color: var(--text-muted);
		border-right: 1px solid var(--border-subtle);
	}

	.schedule-activity {
		font-weight: 500;
		color: var(--text-primary);
		border-right: 1px solid var(--border-subtle);
	}

	.schedule-outcome {
		color: var(--color-primary);
		font-size: 0.8125rem;
	}

	.callout {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-left: 3px solid var(--color-primary);
		border-radius: var(--radius-md);
		padding: var(--space-4);
		margin: var(--space-4) 0;
	}

	.callout.highlight {
		background: linear-gradient(135deg, rgba(4, 164, 89, 0.1) 0%, rgba(4, 164, 89, 0.05) 100%);
		border: 1px solid rgba(4, 164, 89, 0.3);
		border-left: 3px solid var(--color-primary);
	}

	.callout h2 {
		border: none;
		padding-top: 0;
		margin-top: 0;
		font-size: 1.25rem;
	}

	.highlight-box {
		background: var(--gradient-accent);
		border-radius: var(--radius-lg);
		padding: var(--space-6);
		text-align: center;
		margin: var(--space-6) 0;
	}

	.highlight-box strong {
		display: block;
		font-family: var(--font-heading);
		font-size: 1.25rem;
		color: white;
		margin-bottom: var(--space-2);
	}

	.highlight-box p {
		color: rgba(255, 255, 255, 0.9);
		margin: 0;
	}

	.checklist {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-4);
	}

	.checklist-item {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3);
		cursor: pointer;
		border-radius: var(--radius-md);
		transition: background 150ms;
	}

	.checklist-item:hover { background: var(--bg-surface); }

	.checklist-item input {
		width: 20px;
		height: 20px;
		accent-color: var(--color-primary);
	}

	.checklist-item span {
		font-size: 0.9375rem;
		color: var(--text-secondary);
	}

	.lesson-nav {
		display: flex;
		justify-content: space-between;
		gap: var(--space-4);
		padding-top: var(--space-8);
		border-top: 1px solid var(--border-subtle);
		margin-top: var(--space-12);
	}

	.lesson-nav a {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-4);
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		text-decoration: none;
		color: var(--text-secondary);
		font-weight: 500;
		transition: all 150ms;
	}

	.lesson-nav a:hover {
		border-color: var(--color-primary);
		color: var(--text-primary);
	}

	.nav-next { margin-left: auto; }

	.exercises-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-4);
		margin-top: var(--space-4);
	}

	.exercise-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-5);
		text-decoration: none;
		transition: all 200ms;
	}

	.exercise-card:hover {
		border-color: var(--color-primary);
		transform: translateY(-2px);
	}

	.exercise-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-3);
	}

	.exercise-type {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-primary);
		background: rgba(4, 164, 89, 0.15);
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-sm);
	}

	.exercise-duration {
		font-size: 0.8125rem;
		color: var(--text-muted);
	}

	.exercise-card h3 {
		font-family: var(--font-heading);
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 var(--space-3);
	}

	.exercise-card ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.exercise-card li {
		font-size: 0.875rem;
		color: var(--text-secondary);
		padding: var(--space-1) 0;
		padding-left: var(--space-4);
		position: relative;
	}

	.exercise-card li::before {
		content: "→";
		position: absolute;
		left: 0;
		color: var(--text-muted);
	}
</style>
