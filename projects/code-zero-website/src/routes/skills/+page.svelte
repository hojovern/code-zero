<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';

	// Skills data - ranked by daily usefulness
	const skills = [
		{
			id: 'commit',
			name: 'commit',
			rank: 1,
			trigger: '/commit',
			type: 'Workflow',
			category: 'Development',
			description: 'Commit all changes and push to GitHub with well-crafted messages.',
			icon: '📤',
			details: `Workflow Steps:
1. Run pre-commit quality checks (npm run check)
2. Check git status, diff, and recent commit style
3. Stage all changes with git add -A
4. Analyze changes and draft commit message
5. Commit with conventional format (feat/fix/refactor)
6. Push to GitHub

Always includes: Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>`
		},
		{
			id: 'blog-writer',
			name: 'blog-writer',
			rank: 2,
			trigger: '/blog-writer',
			type: 'Workflow',
			category: 'Content',
			description: 'Automated SEO blog writer. Researches competitors, generates optimized articles.',
			icon: '✍️',
			details: `Workflow Steps:
1. Research phase: Analyze top 5 competitors via MCP
2. Extract patterns: Headlines, structure, word count
3. Generate outline with SEO-optimized headers
4. Write content matching brand voice
5. Output: DOCX, MD, and HTML versions
6. Save to /blog-articles/{slug}/ folder

Style: alexop.dev pattern—techy tone, problem-first openings`
		},
		{
			id: 'think-harder',
			name: 'think-harder',
			rank: 3,
			trigger: '/think-harder',
			type: 'System',
			category: 'Intelligence',
			description: 'Spawns specialized agents (Critic, Research, Memory) for complex tasks.',
			icon: '🧠',
			details: `Sub-Agents Spawned:
• Research — Investigate before acting
• Decompose — Break into verifiable steps
• Critic — Find flaws before delivery
• Synthesis — Combine outputs coherently
• Memory — Persist and retrieve learnings

Use for: Architecture decisions, complex debugging, multi-file refactors`
		},
		{
			id: 'branded-deck',
			name: 'branded-deck',
			rank: 4,
			trigger: '/deck',
			type: 'Workflow',
			category: 'Design',
			description: 'Create branded presentations with consistent styling for pitches and proposals.',
			icon: '📊',
			details: `Brand Colors Applied:
• Navy #213555 (headers)
• Slate Blue #3E5879 (accents)
• Beige #D8C4B6 (backgrounds)
• Cream #F5EFE7 (text)

Rules: 6x6 max (6 bullets, 6 words), one idea per slide
Output: .pptx file ready for presentation`
		},
		{
			id: 'keyword-research',
			name: 'keyword-research',
			rank: 5,
			trigger: '/keywords',
			type: 'Workflow',
			category: 'Research',
			description: 'SEO keyword research and opportunity analysis. Finds gaps and question keywords.',
			icon: '🔍',
			details: `Uses MCP Tools:
• keyword_generator — Find related terms
• keyword_difficulty — Score competition
• get_traffic — Estimate search volume
• get_backlinks_list — Analyze competitor links

Output: Ranked keyword opportunities with difficulty scores
Saved to: /research/keywords/`
		},
		{
			id: 'instagram-content',
			name: 'instagram-content',
			rank: 6,
			trigger: '/instagram',
			type: 'Workflow',
			category: 'Content',
			description: 'Generate complete Instagram posts with captions and on-brand graphics.',
			icon: '📸',
			details: `Generates:
• Caption with hooks and CTAs
• Branded graphic (dark tech aesthetic)
• Hashtag recommendations
• Posting schedule suggestion

Style: Neon accents, geometric chevrons, bold typography
Output: PNG to /social-media folder`
		},
		{
			id: 'web-design',
			name: 'web-design',
			rank: 7,
			trigger: 'Auto-consult',
			type: 'Reference',
			category: 'Design',
			description: 'UI/UX patterns and components. Modals, buttons, animations, interactive elements.',
			icon: '🎨',
			details: `Patterns Included:
• Modal close button (rotate on hover)
• Floating glows background
• Form inputs (dark theme)
• Selection chips
• Step indicators
• Loading spinners

Typography: 0.8rem, 0.9rem, 1rem, 1.1rem only`
		},
		{
			id: 'clean-code',
			name: 'clean-code',
			rank: 8,
			trigger: 'Auto-apply',
			type: 'Reference',
			category: 'Development',
			description: 'Prevents tech debt. Check duplication, extract on 2nd use, proactive refactoring.',
			icon: '🧹',
			details: `Rules Enforced:
• Check for duplication FIRST
• Extract on 2nd use (not 5th)
• Components < 300 lines
• Modules < 400 lines
• Composition over copying

Triggers refactor when: Same pattern 3+ times, file too large`
		},
		{
			id: 'course-builder',
			name: 'course-builder',
			rank: 9,
			trigger: '/build-course',
			type: 'Workflow',
			category: 'Education',
			description: 'Master skill that builds complete courses by chaining all syllabus skills.',
			icon: '📚',
			details: `Chains These Skills:
1. syllabus-architect — Plan structure
2. lesson-writer — Write content
3. exercise-generator — Create practice
4. curriculum-critic — Review quality
5. outcome-mapper — Connect to jobs
6. website-sync — Generate Svelte pages

Output: Complete course ready to publish`
		},
		{
			id: 'typography-audit',
			name: 'typography-audit',
			rank: 10,
			trigger: '/typography-audit',
			type: 'Workflow',
			category: 'Development',
			description: 'Scan Svelte files for typography inconsistencies, report and fix violations.',
			icon: '🔤',
			details: `Detects Violations:
• Non-standard sizes (0.875rem → 0.9rem)
• Wrong weights (600 → 500)
• Missing font-mono on UI elements
• Line-height issues (1.6 → 1.7)

Modes: Report only, or auto-fix
Output: File:line with current → recommended`
		},
		{
			id: 'learn',
			name: 'learn',
			rank: 11,
			trigger: 'Auto-run',
			type: 'System',
			category: 'Memory',
			description: 'Mid-session learning capture. Automatically captures corrections and preferences.',
			icon: '💡',
			details: `Triggers On:
• User corrects output
• User expresses preference
• User rejects approach
• Output accepted enthusiastically

Saves To:
• CLAUDE.md — Global learnings
• [skill]/SKILL.md — Skill-specific
• master-content.md — Teachable moments`
		},
		{
			id: 'close',
			name: 'close',
			rank: 12,
			trigger: '/close',
			type: 'System',
			category: 'Session',
			description: 'Session closer with learning capture. Creates session log for continuity.',
			icon: '👋',
			details: `Auto-Triggers On:
"bye", "thanks", "done", "goodbye", "see you"

Actions:
1. Capture session learnings
2. Save to /sessions/YYYY-MM-DD-HHMMSS.md
3. Update session log in CLAUDE.md
4. Confirm: "Session saved: [filename]"`
		}
	];

	// State
	let searchQuery = $state('');
	let selectedType = $state('All');
	let expandedId = $state<string | null>(null);
	let copiedId = $state<string | null>(null);

	// Types for filtering
	const types = ['All', 'Workflow', 'Reference', 'System'];

	// Filter skills
	let filteredSkills = $derived(() => {
		let result = skills;

		if (selectedType !== 'All') {
			result = result.filter(s => s.type === selectedType);
		}

		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			result = result.filter(s =>
				s.name.toLowerCase().includes(query) ||
				s.description.toLowerCase().includes(query) ||
				s.trigger.toLowerCase().includes(query)
			);
		}

		return result;
	});

	function toggleExpand(id: string) {
		expandedId = expandedId === id ? null : id;
	}

	async function copyDetails(skill: typeof skills[0]) {
		await navigator.clipboard.writeText(skill.details);
		copiedId = skill.id;
		setTimeout(() => copiedId = null, 2000);
	}

	function getTypeColor(type: string) {
		switch (type) {
			case 'Workflow': return 'var(--color-primary)';
			case 'Reference': return '#F59E0B';
			case 'System': return '#8B5CF6';
			default: return 'var(--text-muted)';
		}
	}
</script>

<svelte:head>
	<title>Skills | code:zero</title>
	<meta name="description" content="Workflows, references, and automation tools that extend AI capabilities. Type the trigger or let them run automatically." />
</svelte:head>

<Navbar />

<main class="skills-page">
	<div class="skills-container">
		<!-- Breadcrumb -->
		<nav class="breadcrumb">
			<a href="/">Home</a>
			<span class="separator">»</span>
			<span>Skills</span>
		</nav>

		<!-- Header -->
		<header class="skills-header">
			<h1>Skills</h1>
			<p class="skills-intro">
				<em>Workflows, references, and automation tools that extend AI capabilities. Type the trigger command or let them run automatically.</em>
			</p>
			<p class="skills-ranking-note">The most useful skills we use daily, ranked.</p>
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
					placeholder="Search skills..."
					bind:value={searchQuery}
					class="search-input"
				/>
			</div>

			<div class="filter-selects">
				<div class="select-wrapper">
					<select bind:value={selectedType} class="filter-select">
						{#each types as type}
							<option value={type}>{type} {type === 'All' ? `(${skills.length})` : `(${skills.filter(s => s.type === type).length})`}</option>
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
			Showing {filteredSkills().length} skills
		</div>

		<!-- Skills List -->
		<ul class="skills-list">
			{#each filteredSkills() as skill (skill.id)}
				<li class="skill-item" class:expanded={expandedId === skill.id}>
					<button class="skill-row" onclick={() => toggleExpand(skill.id)}>
						<span class="skill-rank">#{skill.rank}</span>
						<span class="skill-icon">{skill.icon}</span>
						<span class="skill-name">{skill.name}</span>
						<span class="skill-description">{skill.description}</span>
						<div class="skill-meta">
							<code class="skill-trigger">{skill.trigger}</code>
							<span class="skill-type" style="--type-color: {getTypeColor(skill.type)}">{skill.type}</span>
						</div>
						<svg class="expand-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="6 9 12 15 18 9"/>
						</svg>
					</button>

					{#if expandedId === skill.id}
						<div class="skill-expanded">
							<div class="details-box">
								<div class="details-header">
									<span class="details-label">Skill Details</span>
									<button
										class="copy-btn"
										class:copied={copiedId === skill.id}
										onclick={() => copyDetails(skill)}
									>
										{#if copiedId === skill.id}
											<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
												<polyline points="20 6 9 17 4 12"/>
											</svg>
											Copied!
										{:else}
											<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
												<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
												<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
											</svg>
											Copy
										{/if}
									</button>
								</div>
								<pre class="details-code"><code>{skill.details}</code></pre>
							</div>
						</div>
					{/if}
				</li>
			{:else}
				<li class="no-skills">
					<p>No skills found matching your criteria.</p>
				</li>
			{/each}
		</ul>
	</div>
</main>

<style>
	/* Page Layout */
	.skills-page {
		min-height: 100vh;
		padding: calc(80px + var(--space-12)) 0 var(--space-24);
		background: var(--bg-base);
	}

	.skills-container {
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
	.skills-header {
		margin-bottom: var(--space-8);
	}

	.skills-header h1 {
		font-family: var(--font-heading);
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-4);
		letter-spacing: -0.02em;
	}

	.skills-intro {
		font-size: 1.1rem;
		color: var(--text-secondary);
		line-height: 1.7;
	}

	.skills-intro em {
		font-style: italic;
	}

	.skills-ranking-note {
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
		min-width: 160px;
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

	/* Skills List */
	.skills-list {
		list-style: none;
		display: flex;
		flex-direction: column;
	}

	.skill-item {
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.skill-item:last-child {
		border-bottom: none;
	}

	.skill-row {
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

	.skill-row:hover {
		transform: translateX(4px);
	}

	.skill-row:hover .skill-name {
		color: var(--color-primary);
	}

	.skill-rank {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--text-muted);
		min-width: 28px;
		flex-shrink: 0;
	}

	.skill-icon {
		font-size: 1.25rem;
		flex-shrink: 0;
	}

	.skill-name {
		font-family: var(--font-mono);
		font-size: 1rem;
		font-weight: 500;
		color: var(--text-primary);
		transition: color 0.2s;
		flex-shrink: 0;
		min-width: 160px;
	}

	.skill-description {
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

	.skill-meta {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		flex-shrink: 0;
	}

	.skill-trigger {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--color-primary);
		background: rgba(4, 164, 89, 0.1);
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-sm);
	}

	.skill-type {
		display: inline-block;
		padding: var(--space-1) var(--space-3);
		background: color-mix(in srgb, var(--type-color) 15%, transparent);
		border: 1px solid color-mix(in srgb, var(--type-color) 30%, transparent);
		border-radius: var(--radius-sm);
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--type-color);
		text-transform: uppercase;
		letter-spacing: 0.03em;
	}

	.expand-icon {
		flex-shrink: 0;
		color: var(--text-muted);
		transition: transform 0.2s;
	}

	.skill-item.expanded .expand-icon {
		transform: rotate(180deg);
	}

	/* Expanded Content */
	.skill-expanded {
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

	.details-box {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.details-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-3) var(--space-4);
		background: rgba(255, 255, 255, 0.02);
		border-bottom: 1px solid var(--border-subtle);
	}

	.details-label {
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

	.details-code {
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
	.no-skills {
		padding: var(--space-12);
		text-align: center;
		color: var(--text-muted);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.skills-container {
			padding: 0 var(--space-4);
		}

		.skills-header h1 {
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

		.skill-row {
			flex-wrap: wrap;
		}

		.skill-description {
			width: 100%;
			order: 10;
			margin-top: var(--space-2);
			padding-left: calc(28px + var(--space-4) + 1.25rem + var(--space-4));
		}

		.skill-meta {
			margin-left: auto;
		}

		.skill-expanded {
			padding-left: var(--space-5);
		}
	}
</style>
