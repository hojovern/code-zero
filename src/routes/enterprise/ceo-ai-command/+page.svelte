<script lang="ts">
	const blocks = [
		{
			number: 1,
			title: 'Build Your Command Center',
			duration: '45 min',
			description: 'Set up AI memory, context, and learning system',
			outcomes: ['CLAUDE.md with business context', 'Learning system active', 'First skill created']
		},
		{
			number: 2,
			title: 'Deploy Your Agent Fleet',
			duration: '90 min',
			description: 'Build 4 working AI agents',
			outcomes: ['Daily CEO Briefing', 'Competitive Intelligence', 'Board Prep Agent', 'Email Ghostwriter']
		},
		{
			number: 3,
			title: 'Automation Power',
			duration: '75 min',
			description: 'n8n workflows connecting everything',
			outcomes: ['Zoom → Slack summaries', 'Email triage', 'News digest', 'Document analyzer']
		},
		{
			number: 4,
			title: 'Build Your Dashboard',
			duration: '60 min',
			description: 'Personal CEO dashboard with SQLite',
			outcomes: ["Today's Focus", 'AI Prompts Library', 'Decision Log', 'Quick Capture']
		},
		{
			number: 5,
			title: 'Map to Your Business',
			duration: '30 min',
			description: 'Identify 15-20 AI opportunities',
			outcomes: ['Opportunity audit', 'Priority matrix', 'Team opportunities']
		},
		{
			number: 6,
			title: 'Your Playbook',
			duration: '20 min',
			description: 'Framework, team handoff, next steps',
			outcomes: ['CEO AI Playbook', 'Team training plan', 'Portal access']
		}
	];

	const agents = [
		{ name: 'Daily CEO Briefing', trigger: '7am every day', icon: '📋' },
		{ name: 'Competitive Intelligence', trigger: 'Sunday 6pm', icon: '🔍' },
		{ name: 'Board Prep Agent', trigger: 'On demand', icon: '📊' },
		{ name: 'Email Ghostwriter', trigger: 'VIP email arrives', icon: '✉️' }
	];

	const workflows = [
		{ name: 'Zoom → Slack Briefing', trigger: 'Meeting ends' },
		{ name: 'Email Triage', trigger: 'VIP email received' },
		{ name: 'Daily News Digest', trigger: '6am schedule' },
		{ name: 'Document Analyzer', trigger: 'File uploaded' }
	];

	const dashboardModules = [
		{ name: "Today's Focus", desc: '3 daily priorities' },
		{ name: 'AI Prompts Library', desc: 'One-click access to skills' },
		{ name: 'Decision Log', desc: 'Track major decisions' },
		{ name: 'Quick Capture', desc: 'Scratchpad for ideas' }
	];
</script>

<svelte:head>
	<title>CEO AI Command Center | code:zero</title>
	<meta name="description" content="From AI-curious to AI-capable in one day. Build your personal AI command center with agents, automations, and a custom dashboard." />
	<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="page">
	<!-- Hero -->
	<section class="hero">
		<div class="container">
			<span class="badge">Premium Training</span>
			<h1>CEO AI Command Center</h1>
			<p class="tagline">From AI-curious to AI-capable in one day.</p>
			<p class="subtitle">
				Build a complete AI system: memory, agents, automations, and a personal dashboard.
				No coding experience required.
			</p>
			<div class="hero-cta">
				<a href="#book" class="btn btn-primary">Book Your Session</a>
				<span class="price">RM 7,800 · 6 hours · 1:1 training</span>
			</div>
		</div>
	</section>

	<!-- Problem -->
	<section class="problem">
		<div class="container">
			<h2>The Problem</h2>
			<p class="lead">
				You've heard about AI. You've maybe used ChatGPT. But you don't have a <strong>system</strong>.
			</p>
			<div class="problem-grid">
				<div class="problem-item">
					<span class="icon">🔄</span>
					<p>Using AI like a search engine — ask a question, get an answer, start over</p>
				</div>
				<div class="problem-item">
					<span class="icon">🧠</span>
					<p>AI forgets everything about your business after each conversation</p>
				</div>
				<div class="problem-item">
					<span class="icon">⏰</span>
					<p>Competitors are building AI that works while they sleep</p>
				</div>
			</div>
			<p class="insight">The gap isn't intelligence. It's infrastructure.</p>
		</div>
	</section>

	<!-- Solution -->
	<section class="solution">
		<div class="container">
			<h2>The Solution: Your AI Command Center</h2>
			<p class="lead">In one day, you'll build what took early adopters months to figure out.</p>

			<div class="architecture">
				<div class="arch-item">
					<span class="arch-icon">🧠</span>
					<h3>Memory Layer</h3>
					<p>AI that knows YOUR business</p>
				</div>
				<div class="arch-item">
					<span class="arch-icon">🤖</span>
					<h3>Agent Fleet</h3>
					<p>4 AI agents working for you</p>
				</div>
				<div class="arch-item">
					<span class="arch-icon">⚡</span>
					<h3>Automation Hub</h3>
					<p>n8n workflows connecting everything</p>
				</div>
				<div class="arch-item">
					<span class="arch-icon">📊</span>
					<h3>Personal Dashboard</h3>
					<p>Your cockpit for daily operations</p>
				</div>
			</div>
		</div>
	</section>

	<!-- What You Build -->
	<section class="what-you-build">
		<div class="container">
			<h2>What You'll Build</h2>

			<div class="build-section">
				<h3>Your Agent Fleet</h3>
				<div class="agents-grid">
					{#each agents as agent}
						<div class="agent-card">
							<span class="agent-icon">{agent.icon}</span>
							<h4>{agent.name}</h4>
							<p>{agent.trigger}</p>
						</div>
					{/each}
				</div>
			</div>

			<div class="build-section">
				<h3>Your Automations</h3>
				<div class="workflows-list">
					{#each workflows as workflow}
						<div class="workflow-item">
							<span class="workflow-name">{workflow.name}</span>
							<span class="workflow-trigger">{workflow.trigger}</span>
						</div>
					{/each}
				</div>
			</div>

			<div class="build-section">
				<h3>Your Personal Dashboard</h3>
				<div class="dashboard-preview">
					<div class="dashboard-modules">
						{#each dashboardModules as module}
							<div class="module">
								<span class="module-name">{module.name}</span>
								<span class="module-desc">{module.desc}</span>
							</div>
						{/each}
					</div>
					<p class="dashboard-note">Runs locally on your laptop with SQLite. Your data stays with you.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Schedule -->
	<section class="schedule">
		<div class="container">
			<h2>The Day</h2>
			<div class="timeline">
				{#each blocks as block}
					<div class="block">
						<div class="block-header">
							<span class="block-number">{block.number}</span>
							<div class="block-title">
								<h3>{block.title}</h3>
								<span class="duration">{block.duration}</span>
							</div>
						</div>
						<p class="block-desc">{block.description}</p>
						<ul class="block-outcomes">
							{#each block.outcomes as outcome}
								<li>{outcome}</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Before/After -->
	<section class="transformation">
		<div class="container">
			<h2>The Transformation</h2>
			<div class="compare-grid">
				<div class="before">
					<h3>Before</h3>
					<ul>
						<li>Using AI like a search engine</li>
						<li>One-off prompts</li>
						<li>Manual follow-ups</li>
						<li>Unsure what's possible</li>
						<li>Can't direct your team on AI</li>
					</ul>
				</div>
				<div class="after">
					<h3>After</h3>
					<ul>
						<li>AI system that knows your business</li>
						<li>Autonomous agents working 24/7</li>
						<li>Automated workflows</li>
						<li>Clear roadmap for your company</li>
						<li>Speak AI fluently with your CTO</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<!-- What You Get -->
	<section class="what-you-get">
		<div class="container">
			<h2>What You Get</h2>
			<div class="includes-grid">
				<div class="include-item">
					<h3>During the Day</h3>
					<ul>
						<li>Hands-on building with expert guidance</li>
						<li>Your own working AI Command Center</li>
						<li>4 deployed AI agents</li>
						<li>4 live automations</li>
						<li>Personal CEO dashboard</li>
						<li>Personalized opportunity mapping</li>
					</ul>
				</div>
				<div class="include-item">
					<h3>After the Day</h3>
					<ul>
						<li>Lifetime portal access with templates</li>
						<li>All workflows and agents (yours to keep)</li>
						<li>CEO AI Playbook document</li>
						<li>Team briefing guide</li>
						<li>Monthly "What's New in AI" updates</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA -->
	<section class="cta" id="book">
		<div class="container">
			<h2>Book Your Session</h2>
			<div class="pricing-card">
				<div class="price-amount">RM 7,800</div>
				<div class="price-details">
					<p>6-hour private training</p>
					<p>Your office or preferred venue</p>
					<p>Lifetime portal access included</p>
				</div>
				<a href="/login" class="btn btn-primary btn-large">Get Started</a>
				<p class="note">No coding experience required. All tools provided.</p>
			</div>

			<div class="team-training">
				<h3>Training Your Team?</h3>
				<p>Many CEOs bring their leadership team through next. Contact for team pricing.</p>
			</div>
		</div>
	</section>
</div>

<style>
	.page {
		background: var(--bg-base, #1a1d23);
		color: var(--text-primary, #ffffff);
		font-family: 'Quicksand', sans-serif;
	}

	.container {
		max-width: 1100px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	section {
		padding: 5rem 0;
	}

	h1, h2, h3, h4 {
		font-family: 'Quicksand', sans-serif;
	}

	/* Hero */
	.hero {
		text-align: center;
		padding: 8rem 0 6rem;
		background: linear-gradient(180deg, rgba(4, 164, 89, 0.05) 0%, transparent 100%);
	}

	.badge {
		display: inline-block;
		background: rgba(4, 164, 89, 0.15);
		color: #04A459;
		padding: 0.5rem 1rem;
		border-radius: 2rem;
		font-size: 0.85rem;
		font-weight: 600;
		margin-bottom: 1.5rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.hero h1 {
		font-size: 3.5rem;
		font-weight: 800;
		margin: 0 0 1rem;
		line-height: 1.1;
	}

	.tagline {
		font-size: 1.5rem;
		color: #04A459;
		margin: 0 0 1rem;
		font-weight: 500;
	}

	.subtitle {
		font-size: 1.1rem;
		color: var(--text-secondary, #888);
		max-width: 600px;
		margin: 0 auto 2rem;
		line-height: 1.6;
	}

	.hero-cta {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.btn {
		display: inline-block;
		padding: 1rem 2rem;
		border-radius: 8px;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.2s;
	}

	.btn-primary {
		background: #04A459;
		color: white;
	}

	.btn-primary:hover {
		background: #05c46b;
		transform: translateY(-2px);
	}

	.btn-large {
		padding: 1.25rem 3rem;
		font-size: 1.1rem;
	}

	.price {
		color: var(--text-muted, #666);
		font-size: 0.9rem;
	}

	/* Problem */
	.problem {
		background: var(--bg-elevated, #242933);
	}

	.problem h2 {
		text-align: center;
		font-size: 2rem;
		margin-bottom: 1rem;
	}

	.lead {
		text-align: center;
		font-size: 1.25rem;
		color: var(--text-secondary, #888);
		max-width: 600px;
		margin: 0 auto 3rem;
	}

	.problem-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.problem-item {
		text-align: center;
		padding: 2rem;
		background: var(--bg-base, #1a1d23);
		border-radius: 12px;
	}

	.problem-item .icon {
		font-size: 2rem;
		display: block;
		margin-bottom: 1rem;
	}

	.problem-item p {
		color: var(--text-secondary, #888);
		margin: 0;
		line-height: 1.5;
	}

	.insight {
		text-align: center;
		font-size: 1.25rem;
		font-weight: 600;
		color: #04A459;
	}

	/* Solution */
	.solution h2 {
		text-align: center;
		font-size: 2rem;
		margin-bottom: 1rem;
	}

	.architecture {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.5rem;
		margin-top: 3rem;
	}

	.arch-item {
		text-align: center;
		padding: 2rem 1.5rem;
		background: var(--bg-elevated, #242933);
		border-radius: 12px;
		border: 1px solid transparent;
		transition: all 0.2s;
	}

	.arch-item:hover {
		border-color: #04A459;
	}

	.arch-icon {
		font-size: 2.5rem;
		display: block;
		margin-bottom: 1rem;
	}

	.arch-item h3 {
		font-size: 1rem;
		margin: 0 0 0.5rem;
	}

	.arch-item p {
		color: var(--text-muted, #666);
		margin: 0;
		font-size: 0.9rem;
	}

	/* What You Build */
	.what-you-build {
		background: var(--bg-elevated, #242933);
	}

	.what-you-build h2 {
		text-align: center;
		font-size: 2rem;
		margin-bottom: 3rem;
	}

	.build-section {
		margin-bottom: 3rem;
	}

	.build-section h3 {
		font-size: 1.25rem;
		margin-bottom: 1.5rem;
		color: #04A459;
	}

	.agents-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
	}

	.agent-card {
		background: var(--bg-base, #1a1d23);
		padding: 1.5rem;
		border-radius: 12px;
		text-align: center;
	}

	.agent-icon {
		font-size: 2rem;
		display: block;
		margin-bottom: 0.75rem;
	}

	.agent-card h4 {
		font-size: 0.9rem;
		margin: 0 0 0.5rem;
	}

	.agent-card p {
		font-size: 0.8rem;
		color: var(--text-muted, #666);
		margin: 0;
	}

	.workflows-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.workflow-item {
		display: flex;
		justify-content: space-between;
		padding: 1rem 1.5rem;
		background: var(--bg-base, #1a1d23);
		border-radius: 8px;
	}

	.workflow-name {
		font-weight: 500;
	}

	.workflow-trigger {
		color: var(--text-muted, #666);
		font-size: 0.9rem;
	}

	.dashboard-preview {
		background: var(--bg-base, #1a1d23);
		border-radius: 12px;
		padding: 2rem;
	}

	.dashboard-modules {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.module {
		background: var(--bg-elevated, #242933);
		padding: 1rem;
		border-radius: 8px;
		text-align: center;
	}

	.module-name {
		display: block;
		font-weight: 600;
		margin-bottom: 0.25rem;
	}

	.module-desc {
		font-size: 0.8rem;
		color: var(--text-muted, #666);
	}

	.dashboard-note {
		text-align: center;
		color: var(--text-muted, #666);
		font-size: 0.9rem;
		margin: 0;
	}

	/* Schedule */
	.schedule h2 {
		text-align: center;
		font-size: 2rem;
		margin-bottom: 3rem;
	}

	.timeline {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.block {
		background: var(--bg-elevated, #242933);
		border-radius: 12px;
		padding: 1.5rem 2rem;
	}

	.block-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.block-number {
		width: 40px;
		height: 40px;
		background: #04A459;
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		flex-shrink: 0;
	}

	.block-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex: 1;
	}

	.block-title h3 {
		margin: 0;
		font-size: 1.1rem;
	}

	.duration {
		color: var(--text-muted, #666);
		font-size: 0.9rem;
	}

	.block-desc {
		color: var(--text-secondary, #888);
		margin: 0 0 1rem;
		padding-left: 56px;
	}

	.block-outcomes {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding-left: 56px;
		margin: 0;
		list-style: none;
	}

	.block-outcomes li {
		background: var(--bg-base, #1a1d23);
		padding: 0.25rem 0.75rem;
		border-radius: 4px;
		font-size: 0.85rem;
		color: var(--text-secondary, #888);
	}

	/* Transformation */
	.transformation {
		background: var(--bg-elevated, #242933);
	}

	.transformation h2 {
		text-align: center;
		font-size: 2rem;
		margin-bottom: 3rem;
	}

	.compare-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
	}

	.before, .after {
		padding: 2rem;
		border-radius: 12px;
	}

	.before {
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.2);
	}

	.after {
		background: rgba(4, 164, 89, 0.1);
		border: 1px solid rgba(4, 164, 89, 0.2);
	}

	.before h3, .after h3 {
		margin: 0 0 1.5rem;
		font-size: 1.1rem;
	}

	.before h3 {
		color: #ef4444;
	}

	.after h3 {
		color: #04A459;
	}

	.before ul, .after ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.before li, .after li {
		padding: 0.5rem 0;
		color: var(--text-secondary, #888);
	}

	/* What You Get */
	.what-you-get h2 {
		text-align: center;
		font-size: 2rem;
		margin-bottom: 3rem;
	}

	.includes-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
	}

	.include-item {
		background: var(--bg-elevated, #242933);
		padding: 2rem;
		border-radius: 12px;
	}

	.include-item h3 {
		margin: 0 0 1.5rem;
		font-size: 1.1rem;
		color: #04A459;
	}

	.include-item ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.include-item li {
		padding: 0.5rem 0;
		color: var(--text-secondary, #888);
		position: relative;
		padding-left: 1.5rem;
	}

	.include-item li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: #04A459;
	}

	/* CTA */
	.cta {
		text-align: center;
		background: linear-gradient(180deg, transparent 0%, rgba(4, 164, 89, 0.05) 100%);
	}

	.cta h2 {
		font-size: 2rem;
		margin-bottom: 2rem;
	}

	.pricing-card {
		background: var(--bg-elevated, #242933);
		padding: 3rem;
		border-radius: 16px;
		max-width: 400px;
		margin: 0 auto 3rem;
		border: 1px solid rgba(4, 164, 89, 0.2);
	}

	.price-amount {
		font-size: 3rem;
		font-weight: 800;
		color: #04A459;
		margin-bottom: 1rem;
	}

	.price-details {
		color: var(--text-secondary, #888);
		margin-bottom: 2rem;
	}

	.price-details p {
		margin: 0.5rem 0;
	}

	.note {
		margin-top: 1rem;
		font-size: 0.85rem;
		color: var(--text-muted, #666);
	}

	.team-training {
		padding: 2rem;
		background: var(--bg-elevated, #242933);
		border-radius: 12px;
		max-width: 500px;
		margin: 0 auto;
	}

	.team-training h3 {
		margin: 0 0 0.5rem;
		font-size: 1.1rem;
	}

	.team-training p {
		margin: 0;
		color: var(--text-secondary, #888);
	}

	/* Responsive */
	@media (max-width: 900px) {
		.hero h1 {
			font-size: 2.5rem;
		}

		.problem-grid,
		.architecture,
		.agents-grid,
		.dashboard-modules,
		.compare-grid,
		.includes-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 600px) {
		.hero h1 {
			font-size: 2rem;
		}

		.problem-grid,
		.architecture,
		.agents-grid,
		.dashboard-modules,
		.compare-grid,
		.includes-grid {
			grid-template-columns: 1fr;
		}

		.block-desc,
		.block-outcomes {
			padding-left: 0;
		}
	}
</style>
