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
			icon: '📤'
		},
		{
			id: 'blog-writer',
			name: 'blog-writer',
			rank: 2,
			trigger: '/blog-writer',
			type: 'Workflow',
			category: 'Content',
			description: 'Automated SEO blog writer. Researches competitors, generates optimized articles.',
			icon: '✍️'
		},
		{
			id: 'think-harder',
			name: 'think-harder',
			rank: 3,
			trigger: '/think-harder',
			type: 'System',
			category: 'Intelligence',
			description: 'Spawns specialized agents (Critic, Research, Memory) for complex tasks.',
			icon: '🧠'
		},
		{
			id: 'branded-deck',
			name: 'branded-deck',
			rank: 4,
			trigger: '/deck',
			type: 'Workflow',
			category: 'Design',
			description: 'Create branded presentations with consistent styling for pitches and proposals.',
			icon: '📊'
		},
		{
			id: 'keyword-research',
			name: 'keyword-research',
			rank: 5,
			trigger: '/keywords',
			type: 'Workflow',
			category: 'Research',
			description: 'SEO keyword research and opportunity analysis. Finds gaps and question keywords.',
			icon: '🔍'
		},
		{
			id: 'instagram-content',
			name: 'instagram-content',
			rank: 6,
			trigger: '/instagram',
			type: 'Workflow',
			category: 'Content',
			description: 'Generate complete Instagram posts with captions and on-brand graphics.',
			icon: '📸'
		},
		{
			id: 'web-design',
			name: 'web-design',
			rank: 7,
			trigger: 'Auto-consult',
			type: 'Reference',
			category: 'Design',
			description: 'UI/UX patterns and components. Modals, buttons, animations, interactive elements.',
			icon: '🎨'
		},
		{
			id: 'clean-code',
			name: 'clean-code',
			rank: 8,
			trigger: 'Auto-apply',
			type: 'Reference',
			category: 'Development',
			description: 'Prevents tech debt. Check duplication, extract on 2nd use, proactive refactoring.',
			icon: '🧹'
		},
		{
			id: 'course-builder',
			name: 'course-builder',
			rank: 9,
			trigger: '/build-course',
			type: 'Workflow',
			category: 'Education',
			description: 'Master skill that builds complete courses by chaining all syllabus skills.',
			icon: '📚'
		},
		{
			id: 'typography-audit',
			name: 'typography-audit',
			rank: 10,
			trigger: '/typography-audit',
			type: 'Workflow',
			category: 'Development',
			description: 'Scan Svelte files for typography inconsistencies, report and fix violations.',
			icon: '🔤'
		},
		{
			id: 'learn',
			name: 'learn',
			rank: 11,
			trigger: 'Auto-run',
			type: 'System',
			category: 'Memory',
			description: 'Mid-session learning capture. Automatically captures corrections and preferences.',
			icon: '💡'
		},
		{
			id: 'close',
			name: 'close',
			rank: 12,
			trigger: '/close',
			type: 'System',
			category: 'Session',
			description: 'Session closer with learning capture. Creates session log for continuity.',
			icon: '👋'
		}
	];

	// State
	let searchQuery = $state('');
	let selectedType = $state('All');
	let expandedId = $state<string | null>(null);

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
							<div class="expanded-content">
								<div class="expanded-row">
									<span class="expanded-label">Category</span>
									<span class="expanded-value">{skill.category}</span>
								</div>
								<div class="expanded-row">
									<span class="expanded-label">Trigger</span>
									<code class="expanded-code">{skill.trigger}</code>
								</div>
								<div class="expanded-row">
									<span class="expanded-label">Type</span>
									<span class="expanded-value">{skill.type} — {skill.type === 'Workflow' ? 'Multi-step process with structured output' : skill.type === 'Reference' ? 'Auto-consulted for relevant tasks' : 'Background system behavior'}</span>
								</div>
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

	.expanded-content {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-5);
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.expanded-row {
		display: flex;
		gap: var(--space-4);
	}

	.expanded-label {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--text-muted);
		min-width: 80px;
		flex-shrink: 0;
	}

	.expanded-value {
		font-size: 0.9rem;
		color: var(--text-secondary);
	}

	.expanded-code {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--color-primary);
		background: rgba(4, 164, 89, 0.1);
		padding: 2px 8px;
		border-radius: var(--radius-sm);
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
