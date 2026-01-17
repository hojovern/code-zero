<script>
	import { prompts, getTools, getTypes, getTypeIcon } from '$lib/prompts.js';
	import { openLoginModal, openApplyModal } from '$lib/stores/auth';

	let { data } = $props();

	function handleApply(e) {
		e.preventDefault();
		openApplyModal();
	}

	function handleStudentPortal(e) {
		e.preventDefault();
		if (data.isLoggedIn) {
			window.location.href = '/portal';
		} else {
			openLoginModal();
		}
	}

	let selectedTool = $state('all');
	let selectedType = $state('all');
	let searchQuery = $state('');

	const tools = getTools();
	const types = getTypes();

	// Filter prompts based on selections
	let filteredPrompts = $derived(() => {
		let result = prompts;

		if (selectedTool !== 'all') {
			result = result.filter(p => p.tool === selectedTool);
		}

		if (selectedType !== 'all') {
			result = result.filter(p => p.type === selectedType);
		}

		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			result = result.filter(p =>
				p.title.toLowerCase().includes(query) ||
				p.description.toLowerCase().includes(query) ||
				p.tags.some(tag => tag.toLowerCase().includes(query))
			);
		}

		return result;
	});

	// Get displayed tags (max 3) and overflow count
	function getDisplayTags(tags) {
		const maxDisplay = 3;
		const displayed = tags.slice(0, maxDisplay);
		const overflow = tags.length - maxDisplay;
		return { displayed, overflow };
	}
</script>

<svelte:head>
	<title>Prompts Library | code:zero</title>
	<meta name="description" content="Searchable collection of AI prompts, agents, instructions, and skills for Claude Code, Copilot, Cursor, and other tools." />
</svelte:head>

<!-- Navigation -->
<nav class="navbar">
	<div class="nav-container">
		<a href="/" class="nav-logo">
			<span class="logo-text">code<span class="logo-accent">:zero</span></span>
		</a>
		<div class="nav-links">
			<a href="/full-stack-web-development" class="nav-link">Full Stack Web Development</a>
			<a href="/enterprise" class="nav-link">Enterprise</a>
			<a href="/portal" onclick={handleStudentPortal} class="nav-link">Student Portal</a>
			<a href="/instructors" class="nav-link">Instructors</a>
			<a href="/prompts" class="nav-link active">Prompts</a>
			<a href="/blog" class="nav-link">Blog</a>
		</div>
			<button onclick={handleApply} class="btn btn-primary btn-nav">Start Learning</button>
	</div>
</nav>

<main class="prompts-page">
	<div class="prompts-container">
		<!-- Breadcrumb -->
		<nav class="breadcrumb">
			<a href="/">Home</a>
			<span class="separator">»</span>
			<span>Prompts</span>
		</nav>

		<!-- Header -->
		<header class="prompts-header">
			<h1>Prompts Library</h1>
			<p class="prompts-intro">
				<em>Searchable collection of AI prompts, agents, instructions, and skills for Claude, Copilot, Cursor, and other tools. Filter by tool and category.</em>
			</p>
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
					placeholder="Search prompts... (Press /)"
					bind:value={searchQuery}
					class="search-input"
				/>
			</div>

			<div class="filter-selects">
				<div class="select-wrapper">
					<select bind:value={selectedTool} class="filter-select">
						<option value="all">All Tools ({prompts.length})</option>
						{#each tools as { tool, count }}
							<option value={tool}>{tool} ({count})</option>
						{/each}
					</select>
					<svg class="select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="m6 9 6 6 6-6"/>
					</svg>
				</div>

				<div class="select-wrapper">
					<select bind:value={selectedType} class="filter-select">
						<option value="all">🎯 All ({prompts.length})</option>
						{#each types as { type, count }}
							<option value={type}>{getTypeIcon(type)} {type} ({count})</option>
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
			Showing {filteredPrompts().length} prompts
		</div>

		<!-- Prompts List -->
		<ul class="prompts-list">
			{#each filteredPrompts() as prompt}
				{@const tagInfo = getDisplayTags(prompt.tags)}
				<li class="prompt-item">
					<a href="/prompts/{prompt.slug}" class="prompt-link">
						<span class="prompt-icon">{prompt.icon}</span>
						<span class="prompt-title">{prompt.title}</span>
						<div class="prompt-meta">
							<span class="prompt-tool">{prompt.tool}</span>
							<span class="prompt-tags">
								{#each tagInfo.displayed as tag}
									<span class="prompt-tag">#{tag}</span>
								{/each}
								{#if tagInfo.overflow > 0}
									<span class="prompt-tag-overflow">+{tagInfo.overflow}</span>
								{/if}
							</span>
						</div>
					</a>
				</li>
			{:else}
				<li class="no-prompts">
					<p>No prompts found matching your criteria.</p>
				</li>
			{/each}
		</ul>
	</div>
</main>

<!-- Footer -->
<footer class="footer">
	<div class="container">
		<div class="footer-content">
			<div class="footer-logo">code<span>:zero</span></div>
			<ul class="footer-links">
				<li><a href="/blog">Blog</a></li>
				<li><a href="/prompts">Prompts</a></li>
				<li><a href="/full-stack-web-development">Full Stack Web Development</a></li>
				<li><a href="/instructors">Instructors</a></li>
				<li><a href="/enterprise">Enterprise</a></li>
				<li><a href="mailto:hello@codezero.my">Contact</a></li>
			</ul>
			<p class="footer-copy">&copy; 2025 code:zero. Penang, Malaysia.</p>
		</div>
	</div>
</footer>

<style>
	/* Navbar */
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		padding: var(--space-4) 0;
		background: rgba(26, 29, 35, 0.85);
		backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--border-subtle);
	}

	.nav-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--space-6);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.nav-logo {
		text-decoration: none;
	}

	.logo-text {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		font-weight: 800;
		color: var(--text-primary);
	}

	.logo-accent {
		color: var(--color-primary);
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: var(--space-8);
	}

	.nav-link {
		color: var(--text-secondary);
		font-size: 0.9rem;
		font-weight: 500;
		text-decoration: none;
		transition: color var(--duration-normal) var(--ease-default);
	}

	.nav-link:hover,
	.nav-link.active {
		color: var(--text-primary);
	}

	.btn-nav {
		padding: var(--space-2) var(--space-6);
		background: var(--gradient-accent);
		color: white;
		border-radius: var(--radius-md);
		font-size: 0.9rem;
		font-weight: 600;
		text-decoration: none;
		box-shadow: var(--shadow-glow-sm);
		transition: all var(--duration-normal) var(--ease-default);
	}

	.btn-nav:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-glow-md);
	}

	/* Prompts Page */
	.prompts-page {
		min-height: 100vh;
		padding: calc(80px + var(--space-12)) 0 var(--space-24);
		background: var(--bg-base);
	}

	.prompts-container {
		max-width: 900px;
		margin: 0 auto;
		padding: 0 var(--space-8);
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--space-6);
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
		transition: color var(--duration-normal);
	}

	.breadcrumb a:hover {
		color: var(--text-primary);
	}

	.breadcrumb .separator {
		opacity: 0.5;
	}

	/* Header */
	.prompts-header {
		margin-bottom: var(--space-8);
	}

	.prompts-header h1 {
		font-family: var(--font-heading);
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-4);
		letter-spacing: -0.02em;
	}

	.prompts-intro {
		font-size: 1.1rem;
		color: var(--text-secondary);
		line-height: 1.7;
	}

	.prompts-intro em {
		font-style: italic;
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
		transition: border-color var(--duration-normal) var(--ease-default);
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
		min-width: 150px;
	}

	.filter-select:focus {
		outline: none;
		border-color: var(--color-primary-light);
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

	/* Prompts List */
	.prompts-list {
		list-style: none;
		display: flex;
		flex-direction: column;
	}

	.prompt-item {
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.prompt-item:last-child {
		border-bottom: none;
	}

	.prompt-link {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-4) 0;
		color: inherit;
		text-decoration: none;
		transition: all var(--duration-normal) var(--ease-default);
	}

	.prompt-link:hover {
		transform: rotate(0.5deg);
	}

	.prompt-link:hover .prompt-title {
		color: var(--color-primary);
	}

	.prompt-icon {
		font-size: 1rem;
		flex-shrink: 0;
		opacity: 0.7;
	}

	.prompt-title {
		font-family: var(--font-mono);
		font-size: 1rem;
		font-weight: 500;
		color: var(--text-primary);
		transition: color var(--duration-normal) var(--ease-default);
		flex-shrink: 0;
	}

	.prompt-meta {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		margin-left: auto;
		flex-shrink: 0;
	}

	.prompt-tool {
		display: inline-block;
		padding: var(--space-1) var(--space-3);
		background: rgba(4, 164, 89, 0.15);
		border: 1px solid rgba(4, 164, 89, 0.3);
		border-radius: var(--radius-sm);
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--color-primary-light);
	}

	.prompt-tags {
		display: flex;
		gap: var(--space-2);
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	.prompt-tag {
		white-space: nowrap;
	}

	.prompt-tag-overflow {
		color: var(--text-muted);
		opacity: 0.7;
	}

	/* No Prompts */
	.no-prompts {
		text-align: center;
		padding: var(--space-16) 0;
		color: var(--text-muted);
		font-family: var(--font-mono);
	}

	/* Footer */
	.footer {
		padding: var(--space-12) 0;
		border-top: 1px solid var(--border-subtle);
		background: var(--bg-base);
	}

	.footer-content {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: var(--space-6);
	}

	.footer-logo {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 800;
		color: var(--text-primary);
	}

	.footer-logo span {
		color: var(--color-primary);
	}

	.footer-links {
		display: flex;
		gap: var(--space-6);
		list-style: none;
	}

	.footer-links a {
		color: var(--text-muted);
		font-size: 0.875rem;
		text-decoration: none;
		transition: color var(--duration-normal);
	}

	.footer-links a:hover {
		color: var(--text-primary);
	}

	.footer-copy {
		color: var(--text-muted);
		font-size: 0.875rem;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.nav-links {
			display: none;
		}

		.prompts-container {
			padding: 0 var(--space-6);
		}

		.prompts-header h1 {
			font-size: 1.75rem;
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
			flex: 1;
		}

		.prompt-link {
			flex-wrap: wrap;
		}

		.prompt-meta {
			width: 100%;
			margin-left: calc(var(--space-3) + 1rem);
			margin-top: var(--space-2);
		}

		.footer-content {
			flex-direction: column;
			text-align: center;
		}

		.footer-links {
			flex-wrap: wrap;
			justify-content: center;
		}
	}
</style>
