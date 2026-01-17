<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';

	// Agent data - ranked by usefulness and importance
	const agents = [
		{
			id: 'code-architect',
			name: 'Code Architect',
			category: 'Development',
			description: 'Designs system architecture and plans implementations before writing code.',
			icon: '🏗️',
			rank: 1,
			prompt: `You are a Code Architect agent. Before writing any code:

1. Analyze the requirements thoroughly
2. Design the system architecture
3. Identify components and their interactions
4. Plan the implementation in phases
5. Consider edge cases and error handling
6. Document technical decisions

Always think architecture-first, code-second. Present your design for approval before implementation.`,
			tags: ['planning', 'architecture', 'design']
		},
		{
			id: 'bug-hunter',
			name: 'Bug Hunter',
			category: 'Development',
			description: 'Systematically debugs issues by analyzing stack traces and identifying root causes.',
			icon: '🔍',
			rank: 2,
			prompt: `You are a Bug Hunter agent. When debugging:

1. First, reproduce the issue consistently
2. Analyze error messages and stack traces
3. Identify the scope (frontend/backend/database)
4. Form hypotheses about the root cause
5. Test each hypothesis methodically
6. Document the fix and why it works

Never guess. Always trace the data flow and verify assumptions with evidence.`,
			tags: ['debugging', 'errors', 'troubleshooting']
		},
		{
			id: 'code-reviewer',
			name: 'Code Reviewer',
			category: 'Development',
			description: 'Reviews code for quality, security, performance, and best practices.',
			icon: '👁️',
			rank: 3,
			prompt: `You are a Code Reviewer agent. When reviewing code:

1. Check for security vulnerabilities (OWASP Top 10)
2. Evaluate code readability and maintainability
3. Look for performance bottlenecks
4. Verify error handling completeness
5. Ensure consistent coding standards
6. Suggest improvements, not just problems

Be constructive. Explain WHY something should change, not just WHAT.`,
			tags: ['review', 'security', 'quality']
		},
		{
			id: 'research-agent',
			name: 'Research Agent',
			category: 'Research',
			description: 'Investigates topics deeply and synthesizes findings into actionable insights.',
			icon: '📚',
			rank: 4,
			prompt: `You are a Research Agent. When researching:

1. Define the research question clearly
2. Identify authoritative sources
3. Cross-reference multiple perspectives
4. Distinguish facts from opinions
5. Synthesize findings into actionable insights
6. Cite sources and acknowledge limitations

Be thorough but concise. Quality over quantity.`,
			tags: ['research', 'analysis', 'synthesis']
		},
		{
			id: 'devops-agent',
			name: 'DevOps Agent',
			category: 'Infrastructure',
			description: 'Manages deployments, CI/CD pipelines, and infrastructure.',
			icon: '🚀',
			rank: 5,
			prompt: `You are a DevOps Agent. When managing infrastructure:

1. Automate everything that can be automated
2. Make deployments reversible (easy rollbacks)
3. Monitor before you need to debug
4. Use infrastructure as code
5. Implement proper secrets management
6. Design for failure - assume things will break

Reliability is a feature. Ship fast, but ship safely.`,
			tags: ['devops', 'ci-cd', 'deployment']
		},
		{
			id: 'test-engineer',
			name: 'Test Engineer',
			category: 'Development',
			description: 'Designs test strategies and writes tests that catch bugs before users do.',
			icon: '🧪',
			rank: 6,
			prompt: `You are a Test Engineer agent. When testing:

1. Identify critical user paths to test
2. Write tests that are readable and maintainable
3. Cover edge cases and error states
4. Mock external dependencies appropriately
5. Balance unit, integration, and e2e tests
6. Make tests deterministic - no flaky tests

Tests are documentation. They should explain what the code does and why.`,
			tags: ['testing', 'qa', 'automation']
		},
		{
			id: 'security-sentinel',
			name: 'Security Sentinel',
			category: 'Security',
			description: 'Identifies vulnerabilities and recommends hardening measures.',
			icon: '🛡️',
			rank: 7,
			prompt: `You are a Security Sentinel agent. When reviewing security:

1. Check authentication and authorization flows
2. Validate input sanitization everywhere
3. Review secrets management
4. Assess attack surface and vectors
5. Verify logging and audit trails
6. Recommend defense in depth

Assume attackers are smart. Never trust user input. Log everything suspicious.`,
			tags: ['security', 'audit', 'hardening']
		},
		{
			id: 'content-writer',
			name: 'Content Writer',
			category: 'Content',
			description: 'Creates engaging, SEO-optimized content with clear structure.',
			icon: '✍️',
			rank: 8,
			prompt: `You are a Content Writer agent. When writing:

1. Understand the target audience deeply
2. Start with a hook that grabs attention
3. Structure content with clear hierarchy
4. Use concrete examples over abstract concepts
5. Write in active voice, be concise
6. End with a clear call-to-action

Write for humans first, SEO second. Authenticity beats keyword stuffing.`,
			tags: ['writing', 'seo', 'content']
		},
		{
			id: 'ux-critic',
			name: 'UX Critic',
			category: 'Design',
			description: 'Evaluates interfaces for usability, accessibility, and conversion.',
			icon: '🎨',
			rank: 9,
			prompt: `You are a UX Critic agent. When evaluating interfaces:

1. Assess visual hierarchy - is the CTA obvious?
2. Check accessibility (contrast, focus states, screen readers)
3. Evaluate cognitive load - can users complete tasks easily?
4. Look for friction points in user flows
5. Verify mobile responsiveness
6. Suggest specific, actionable improvements

Think like a first-time user. Every click should feel intentional.`,
			tags: ['ux', 'accessibility', 'design']
		},
		{
			id: 'data-analyst',
			name: 'Data Analyst',
			category: 'Analytics',
			description: 'Transforms raw data into actionable insights through analysis.',
			icon: '📊',
			rank: 10,
			prompt: `You are a Data Analyst agent. When analyzing data:

1. Start with a clear question to answer
2. Validate data quality before analysis
3. Look for patterns, anomalies, and trends
4. Use appropriate statistical methods
5. Visualize findings clearly
6. Tell a story with the data

Numbers without context are meaningless. Always explain the "so what?"`,
			tags: ['data', 'analytics', 'visualization']
		}
	];

	// Categories for filtering
	const categories = ['All', ...new Set(agents.map(a => a.category))];
	let selectedCategory = $state('All');
	let searchQuery = $state('');
	let copiedId = $state<string | null>(null);
	let expandedId = $state<string | null>(null);

	// Filter agents
	let filteredAgents = $derived(() => {
		let result = agents;

		if (selectedCategory !== 'All') {
			result = result.filter(a => a.category === selectedCategory);
		}

		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			result = result.filter(a =>
				a.name.toLowerCase().includes(query) ||
				a.description.toLowerCase().includes(query) ||
				a.tags.some(tag => tag.toLowerCase().includes(query))
			);
		}

		return result;
	});

	// Copy prompt to clipboard
	async function copyPrompt(agent: typeof agents[0]) {
		await navigator.clipboard.writeText(agent.prompt);
		copiedId = agent.id;
		setTimeout(() => copiedId = null, 2000);
	}

	function toggleExpand(id: string) {
		expandedId = expandedId === id ? null : id;
	}
</script>

<svelte:head>
	<title>AI Agents | code:zero</title>
	<meta name="description" content="Collection of specialized AI agents with ready-to-use prompts. Code architects, bug hunters, content writers, and more." />
</svelte:head>

<Navbar />

<main class="agents-page">
	<div class="agents-container">
		<!-- Breadcrumb -->
		<nav class="breadcrumb">
			<a href="/">Home</a>
			<span class="separator">»</span>
			<span>Agents</span>
		</nav>

		<!-- Header -->
		<header class="agents-header">
			<h1>AI Agents</h1>
			<p class="agents-intro">
				<em>Specialized AI agents with ready-to-use system prompts. Copy, paste into your AI tool, and transform it into an expert for the task at hand.</em>
			</p>
			<p class="agents-ranking-note">The most useful and important agents we use daily, ranked.</p>
		</header>

		<!-- Filter Bar -->
		<div class="filter-bar">
			<div class="search-container">
				<svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="11" cy="11" r="8"/>
					<path d="m21 21-4.3-4.3"/>
				</svg>
				<input
					type="text"
					placeholder="Search agents..."
					bind:value={searchQuery}
					class="search-input"
				/>
			</div>

			<div class="filter-selects">
				<div class="select-wrapper">
					<select bind:value={selectedCategory} class="filter-select">
						<option value="All">All Categories ({agents.length})</option>
						{#each categories.filter(c => c !== 'All') as category}
							<option value={category}>{category} ({agents.filter(a => a.category === category).length})</option>
						{/each}
					</select>
					<svg class="select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="m6 9 6 6 6-6"/>
					</svg>
				</div>
			</div>
		</div>

		<!-- Results count -->
		<div class="results-count">
			Showing {filteredAgents().length} agents
		</div>

		<!-- Agents List -->
		<ul class="agents-list">
			{#each filteredAgents() as agent (agent.id)}
				<li class="agent-item" class:expanded={expandedId === agent.id}>
					<button class="agent-row" onclick={() => toggleExpand(agent.id)}>
						<span class="agent-rank">#{agent.rank}</span>
						<span class="agent-icon">{agent.icon}</span>
						<span class="agent-name">{agent.name}</span>
						<span class="agent-description">{agent.description}</span>
						<div class="agent-meta">
							<span class="agent-category">{agent.category}</span>
							<span class="agent-tags">
								{#each agent.tags.slice(0, 2) as tag}
									<span class="agent-tag">#{tag}</span>
								{/each}
							</span>
						</div>
						<svg class="expand-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="6 9 12 15 18 9"/>
						</svg>
					</button>

					{#if expandedId === agent.id}
						<div class="agent-expanded">
							<div class="prompt-box">
								<div class="prompt-header">
									<span class="prompt-label">System Prompt</span>
									<button
										class="copy-btn"
										class:copied={copiedId === agent.id}
										onclick={() => copyPrompt(agent)}
									>
										{#if copiedId === agent.id}
											<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
												<polyline points="20 6 9 17 4 12"/>
											</svg>
											Copied!
										{:else}
											<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
												<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
												<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
											</svg>
											Copy Prompt
										{/if}
									</button>
								</div>
								<pre class="prompt-code"><code>{agent.prompt}</code></pre>
							</div>
						</div>
					{/if}
				</li>
			{:else}
				<li class="no-agents">
					<p>No agents found matching your criteria.</p>
				</li>
			{/each}
		</ul>

		<!-- FAQ Section -->
		<section class="faq-section">
			<h2>Before You Copy All These Prompts</h2>

			<div class="faq-grid">
				<div class="faq-item">
					<h3>Do I really need all these agents?</h3>
					<p>No. Start with 2-3 that match your daily work. Most developers live in Code Architect (#1) and Bug Hunter (#2). Add others as specific needs arise. Having 10 agents you never use is just noise.</p>
				</div>

				<div class="faq-item">
					<h3>How does this affect my token usage?</h3>
					<p>Each system prompt adds ~200-400 tokens to every message. That's roughly $0.003-0.006 per conversation on GPT-4. The real cost isn't money—it's context window space. A bloated system prompt leaves less room for your actual conversation.</p>
				</div>

				<div class="faq-item">
					<h3>Should I use one agent or switch between them?</h3>
					<p>Switch. Start a fresh conversation for each task type. Don't ask your Bug Hunter to write content—it'll do a mediocre job. Specialized agents outperform generalists because they have focused instructions, not conflicting priorities.</p>
				</div>

				<div class="faq-item">
					<h3>What's the practical approach?</h3>
					<p>Pick your top 3. Save them as custom GPTs, Claude Projects, or quick-paste snippets. Use them for a week. Only add more when you hit a task where you think "I wish I had an agent for this." That's the signal.</p>
				</div>
			</div>
		</section>

		<!-- CTA Section -->
		<section class="cta-section">
			<div class="cta-card">
				<div class="cta-content">
					<h2>Build Your Own Agents</h2>
					<p>Learn to create custom AI agents tailored to your workflow in our Full Stack + AI course.</p>
					<a href="/full-stack-web-development" class="btn btn-primary btn-lg">
						Start Learning
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<line x1="5" y1="12" x2="19" y2="12"/>
							<polyline points="12 5 19 12 12 19"/>
						</svg>
					</a>
				</div>
				<div class="cta-visual">
					<div class="floating-agents">
						<span class="float-icon" style="--delay: 0s">🏗️</span>
						<span class="float-icon" style="--delay: 0.5s">🔍</span>
						<span class="float-icon" style="--delay: 1s">✍️</span>
						<span class="float-icon" style="--delay: 1.5s">🚀</span>
					</div>
				</div>
			</div>
		</section>
	</div>
</main>

<style>
	/* Page Layout */
	.agents-page {
		min-height: 100vh;
		padding: calc(80px + var(--space-12)) 0 var(--space-24);
		background: var(--bg-base);
	}

	.agents-container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 var(--space-8);
	}

	/* Breadcrumb */
	.breadcrumb {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-family: var(--font-mono);
		font-size: 0.9rem;
		color: var(--text-muted);
		margin-bottom: var(--space-4);
	}

	.breadcrumb a {
		color: var(--text-muted);
		text-decoration: none;
		transition: color 0.2s;
	}

	.breadcrumb a:hover {
		color: var(--text-primary);
	}

	.breadcrumb .separator {
		opacity: 0.5;
	}

	/* Header */
	.agents-header {
		margin-bottom: var(--space-8);
	}

	.agents-header h1 {
		font-family: var(--font-heading);
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-4);
		letter-spacing: -0.02em;
	}

	.agents-intro {
		font-size: 1.1rem;
		color: var(--text-secondary);
		line-height: 1.7;
	}

	.agents-intro em {
		font-style: italic;
	}

	.agents-ranking-note {
		font-family: var(--font-mono);
		font-size: 0.9rem;
		color: var(--color-primary);
		margin-top: var(--space-4);
	}

	/* Filter Bar */
	.filter-bar {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-4);
		margin-bottom: var(--space-6);
	}

	.search-container {
		position: relative;
		flex: 1;
		min-width: 280px;
	}

	.search-icon {
		position: absolute;
		left: var(--space-4);
		top: 50%;
		transform: translateY(-50%);
		color: var(--text-muted);
		pointer-events: none;
	}

	.search-input {
		width: 100%;
		padding: var(--space-3) var(--space-4);
		padding-left: calc(var(--space-4) + 26px);
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		color: var(--text-primary);
		font-family: var(--font-mono);
		font-size: 0.95rem;
		transition: border-color 0.2s;
	}

	.search-input::placeholder {
		color: var(--text-muted);
	}

	.search-input:focus {
		outline: none;
		border-color: var(--color-primary);
	}

	.filter-selects {
		display: flex;
		gap: var(--space-3);
	}

	.select-wrapper {
		position: relative;
	}

	.filter-select {
		appearance: none;
		padding: var(--space-3) var(--space-10) var(--space-3) var(--space-4);
		background: var(--bg-elevated);
		border: 1px solid var(--color-primary);
		border-radius: var(--radius-md);
		color: var(--text-primary);
		font-family: var(--font-mono);
		font-size: 0.9rem;
		cursor: pointer;
		min-width: 180px;
	}

	.filter-select:focus {
		outline: none;
		border-color: var(--color-primary);
	}

	.select-arrow {
		position: absolute;
		right: var(--space-3);
		top: 50%;
		transform: translateY(-50%);
		color: var(--text-muted);
		pointer-events: none;
	}

	/* Results */
	.results-count {
		font-family: var(--font-mono);
		font-size: 0.9rem;
		color: var(--text-muted);
		margin-bottom: var(--space-6);
	}

	/* Agents List */
	.agents-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		margin-bottom: var(--space-16);
	}

	.agent-item {
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.agent-item:last-child {
		border-bottom: none;
	}

	.agent-row {
		display: flex;
		align-items: flex-start;
		gap: var(--space-4);
		padding: var(--space-5) 0;
		width: 100%;
		background: none;
		border: none;
		color: inherit;
		text-align: left;
		cursor: pointer;
		transition: all 0.2s;
	}

	.agent-row:hover {
		transform: translateX(4px);
	}

	.agent-row:hover .agent-name {
		color: var(--color-primary);
	}

	.agent-rank {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--text-muted);
		min-width: 28px;
		flex-shrink: 0;
	}

	.agent-icon {
		font-size: 1.25rem;
		flex-shrink: 0;
	}

	.agent-name {
		font-family: var(--font-mono);
		font-size: 1rem;
		font-weight: 500;
		color: var(--text-primary);
		transition: color 0.2s;
		flex-shrink: 0;
		min-width: 180px;
	}

	.agent-description {
		font-size: 0.9rem;
		color: var(--text-secondary);
		flex: 1;
		padding-right: var(--space-4);
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		line-height: 1.5;
	}

	.agent-meta {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		flex-shrink: 0;
	}

	.agent-category {
		display: inline-block;
		padding: var(--space-1) var(--space-3);
		background: rgba(4, 164, 89, 0.15);
		border: 1px solid rgba(4, 164, 89, 0.3);
		border-radius: var(--radius-sm);
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--color-primary);
	}

	.agent-tags {
		display: flex;
		gap: var(--space-2);
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	.agent-tag {
		opacity: 0.7;
	}

	.expand-icon {
		flex-shrink: 0;
		color: var(--text-muted);
		transition: transform 0.2s;
	}

	.agent-item.expanded .expand-icon {
		transform: rotate(180deg);
	}

	/* Expanded Content */
	.agent-expanded {
		padding: 0 0 var(--space-6) var(--space-10);
		animation: slideDown 0.2s ease;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.prompt-box {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.prompt-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-3) var(--space-4);
		background: rgba(255, 255, 255, 0.02);
		border-bottom: 1px solid var(--border-subtle);
	}

	.prompt-label {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.copy-btn {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-3);
		background: rgba(4, 164, 89, 0.1);
		border: 1px solid rgba(4, 164, 89, 0.3);
		border-radius: var(--radius-md);
		color: var(--color-primary);
		font-family: var(--font-mono);
		font-size: 0.8rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.copy-btn:hover {
		background: rgba(4, 164, 89, 0.2);
	}

	.copy-btn.copied {
		background: var(--color-primary);
		border-color: var(--color-primary);
		color: white;
	}

	.prompt-code {
		margin: 0;
		padding: var(--space-4);
		font-family: var(--font-mono);
		font-size: 0.8rem;
		line-height: 1.7;
		color: var(--text-secondary);
		white-space: pre-wrap;
		overflow-x: auto;
	}

	/* No Results */
	.no-agents {
		padding: var(--space-12);
		text-align: center;
		color: var(--text-muted);
	}

	/* FAQ Section */
	.faq-section {
		margin-top: var(--space-12);
		padding: var(--space-12);
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl);
	}

	.faq-section h2 {
		font-family: var(--font-heading);
		font-size: 2rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-10);
	}

	.faq-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-10);
	}

	.faq-item h3 {
		font-family: var(--font-mono);
		font-size: 1.1rem;
		font-weight: 500;
		color: var(--color-primary);
		margin-bottom: var(--space-4);
	}

	.faq-item p {
		font-size: 1rem;
		color: var(--text-secondary);
		line-height: 1.8;
	}

	@media (max-width: 768px) {
		.faq-grid {
			grid-template-columns: 1fr;
			gap: var(--space-6);
		}

		.faq-section {
			padding: var(--space-6);
		}
	}

	/* CTA Section */
	.cta-section {
		margin-top: var(--space-8);
	}

	.cta-card {
		background: linear-gradient(135deg, rgba(4, 164, 89, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
		border: 1px solid rgba(4, 164, 89, 0.2);
		border-radius: var(--radius-2xl);
		padding: var(--space-12);
		display: grid;
		grid-template-columns: 1fr auto;
		gap: var(--space-8);
		align-items: center;
	}

	.cta-content h2 {
		font-family: var(--font-heading);
		font-size: 2rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-3);
	}

	.cta-content p {
		font-size: 1.1rem;
		color: var(--text-secondary);
		margin-bottom: var(--space-6);
		max-width: 500px;
		line-height: 1.7;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		font-weight: 600;
		border-radius: var(--radius-lg);
		transition: all 0.2s;
		text-decoration: none;
		border: none;
		cursor: pointer;
	}

	.btn-primary {
		background: linear-gradient(135deg, #04A459, #2ECC71);
		color: white;
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 30px rgba(4, 164, 89, 0.3);
	}

	.btn-lg {
		padding: var(--space-4) var(--space-6);
		font-size: 1rem;
	}

	.cta-visual {
		position: relative;
		width: 200px;
		height: 150px;
	}

	.floating-agents {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.float-icon {
		position: absolute;
		font-size: 2.5rem;
		animation: float-up 3s ease-in-out infinite;
		animation-delay: var(--delay);
	}

	.float-icon:nth-child(1) { left: 20%; top: 20%; }
	.float-icon:nth-child(2) { left: 60%; top: 10%; }
	.float-icon:nth-child(3) { left: 10%; top: 60%; }
	.float-icon:nth-child(4) { left: 70%; top: 50%; }

	@keyframes float-up {
		0%, 100% { transform: translateY(0) rotate(0deg); }
		50% { transform: translateY(-15px) rotate(5deg); }
	}

	/* Responsive */
	@media (max-width: 768px) {
		.agents-container {
			padding: 0 var(--space-4);
		}

		.agents-header h1 {
			font-size: 2rem;
		}

		.filter-bar {
			flex-direction: column;
		}

		.search-container {
			min-width: 100%;
		}

		.filter-selects {
			width: 100%;
		}

		.filter-select {
			width: 100%;
		}

		.agent-icon {
			font-size: 1.5rem;
		}

		.agent-expanded {
			padding-left: var(--space-5);
		}

		.cta-card {
			grid-template-columns: 1fr;
			text-align: center;
			padding: var(--space-8);
		}

		.cta-content h2 {
			font-size: 1.5rem;
		}

		.cta-visual {
			display: none;
		}
	}
</style>
