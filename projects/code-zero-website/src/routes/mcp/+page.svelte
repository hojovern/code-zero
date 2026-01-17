<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';

	// MCP Servers - ranked by daily usefulness
	const servers = [
		{
			id: 'github',
			name: 'GitHub',
			rank: 1,
			icon: '🐙',
			toolCount: 23,
			status: 'active',
			description: 'Repository management, issues, pull requests, code search, collaboration.',
			tools: ['create_or_update_file', 'search_repositories', 'create_repository', 'get_file_contents', 'push_files', 'create_issue', 'create_pull_request', 'fork_repository', 'create_branch', 'list_commits', 'search_code', 'merge_pull_request']
		},
		{
			id: 'claude-in-chrome',
			name: 'Claude in Chrome',
			rank: 2,
			icon: '🌐',
			toolCount: 16,
			status: 'active',
			description: 'Browser automation, page interaction, screenshots, form filling, web testing.',
			tools: ['navigate', 'read_page', 'find', 'form_input', 'computer', 'javascript_tool', 'gif_creator', 'tabs_context_mcp', 'tabs_create_mcp', 'read_console_messages', 'read_network_requests']
		},
		{
			id: 'supabase',
			name: 'Supabase',
			rank: 3,
			icon: '⚡',
			toolCount: 21,
			status: 'active',
			description: 'Database operations, migrations, edge functions, project management.',
			tools: ['list_organizations', 'list_projects', 'get_project', 'create_project', 'list_tables', 'list_extensions', 'apply_migration', 'execute_sql', 'get_logs', 'deploy_edge_function', 'generate_typescript_types']
		},
		{
			id: 'brevo',
			name: 'Brevo',
			rank: 4,
			icon: '📧',
			toolCount: 85,
			status: 'active',
			description: 'Email marketing, transactional emails, contacts, campaigns, automation.',
			tools: ['get_account', 'get_contacts', 'create_contact', 'create_email_campaign', 'send_transactional_email', 'get_email_templates', 'create_list', 'import_contacts', 'get_campaign_statistics']
		},
		{
			id: 'seo-research',
			name: 'SEO Research',
			rank: 5,
			icon: '📊',
			toolCount: 4,
			status: 'active',
			description: 'Keyword research, traffic analysis, backlink data, keyword difficulty.',
			tools: ['get_backlinks_list', 'keyword_generator', 'get_traffic', 'keyword_difficulty']
		},
		{
			id: 'gizmo',
			name: 'Gizmo',
			rank: 6,
			icon: '🧠',
			toolCount: 3,
			status: 'active',
			description: 'Personal knowledge base, persona management, context retrieval.',
			tools: ['list_personas', 'gizmo_write', 'query_brain']
		}
	];

	// State
	let searchQuery = $state('');
	let expandedId = $state<string | null>(null);
	let copiedTool = $state<string | null>(null);

	// Filter servers
	let filteredServers = $derived(() => {
		if (!searchQuery.trim()) return servers;

		const query = searchQuery.toLowerCase();
		return servers.filter(s =>
			s.name.toLowerCase().includes(query) ||
			s.description.toLowerCase().includes(query) ||
			s.tools.some(t => t.toLowerCase().includes(query))
		);
	});

	function toggleExpand(id: string) {
		expandedId = expandedId === id ? null : id;
	}

	async function copyTool(serverId: string, tool: string) {
		const fullName = `mcp__${serverId}__${tool}`;
		await navigator.clipboard.writeText(fullName);
		copiedTool = fullName;
		setTimeout(() => copiedTool = null, 2000);
	}

	let totalTools = servers.reduce((acc, s) => acc + s.toolCount, 0);
</script>

<svelte:head>
	<title>MCP Servers | code:zero</title>
	<meta name="description" content="Model Context Protocol servers powering the AI toolkit. GitHub, Supabase, Browser automation, and more." />
</svelte:head>

<Navbar />

<main class="mcp-page">
	<div class="mcp-container">
		<!-- Breadcrumb -->
		<nav class="breadcrumb">
			<a href="/">Home</a>
			<span class="separator">»</span>
			<span>MCP</span>
		</nav>

		<!-- Header -->
		<header class="mcp-header">
			<h1>MCP Servers</h1>
			<p class="mcp-intro">
				<em>Model Context Protocol servers that let AI take real actions—query databases, create issues, send emails, browse the web.</em>
			</p>
			<p class="mcp-ranking-note">{servers.length} servers with {totalTools} tools, ranked by daily use.</p>
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
					placeholder="Search servers or tools..."
					bind:value={searchQuery}
					class="search-input"
				/>
			</div>
		</div>

		<!-- Results count -->
		<div class="results-count">
			Showing {filteredServers().length} servers
		</div>

		<!-- Servers List -->
		<ul class="servers-list">
			{#each filteredServers() as server (server.id)}
				<li class="server-item" class:expanded={expandedId === server.id}>
					<button class="server-row" onclick={() => toggleExpand(server.id)}>
						<span class="server-rank">#{server.rank}</span>
						<span class="server-icon">{server.icon}</span>
						<span class="server-name">{server.name}</span>
						<span class="server-description">{server.description}</span>
						<div class="server-meta">
							<span class="tool-count">{server.toolCount} tools</span>
							<span class="status-dot" class:active={server.status === 'active'}></span>
						</div>
						<svg class="expand-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="6 9 12 15 18 9"/>
						</svg>
					</button>

					{#if expandedId === server.id}
						<div class="server-expanded">
							<div class="tools-grid">
								{#each server.tools as tool}
									<button
										class="tool-chip"
										class:copied={copiedTool === `mcp__${server.id}__${tool}`}
										onclick={() => copyTool(server.id, tool)}
									>
										<code>{tool}</code>
										{#if copiedTool === `mcp__${server.id}__${tool}`}
											<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
												<polyline points="20 6 9 17 4 12"/>
											</svg>
										{:else}
											<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
												<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
												<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
											</svg>
										{/if}
									</button>
								{/each}
								{#if server.toolCount > server.tools.length}
									<span class="more-tools">+{server.toolCount - server.tools.length} more</span>
								{/if}
							</div>
						</div>
					{/if}
				</li>
			{:else}
				<li class="no-servers">
					<p>No servers found matching your criteria.</p>
				</li>
			{/each}
		</ul>
	</div>
</main>

<style>
	/* Page Layout */
	.mcp-page {
		min-height: 100vh;
		padding: calc(80px + var(--space-12)) 0 var(--space-24);
		background: var(--bg-base);
	}

	.mcp-container {
		max-width: 1520px;
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
	.mcp-header {
		margin-bottom: var(--space-8);
	}

	.mcp-header h1 {
		font-family: var(--font-heading);
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-4);
		letter-spacing: -0.02em;
	}

	.mcp-intro {
		font-size: 1.1rem;
		color: var(--text-secondary);
		line-height: 1.7;
	}

	.mcp-intro em {
		font-style: italic;
	}

	.mcp-ranking-note {
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
		max-width: 400px;
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

	/* Results */
	.results-count {
		font-family: var(--font-mono);
		font-size: 0.9rem;
		color: var(--text-muted);
		margin-bottom: var(--space-6);
	}

	/* Servers List */
	.servers-list {
		list-style: none;
		display: flex;
		flex-direction: column;
	}

	.server-item {
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.server-item:last-child {
		border-bottom: none;
	}

	.server-row {
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

	.server-row:hover {
		transform: translateX(4px);
	}

	.server-row:hover .server-name {
		color: var(--color-primary);
	}

	.server-rank {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--text-muted);
		min-width: 28px;
		flex-shrink: 0;
	}

	.server-icon {
		font-size: 1.25rem;
		flex-shrink: 0;
	}

	.server-name {
		font-family: var(--font-mono);
		font-size: 1rem;
		font-weight: 500;
		color: var(--text-primary);
		transition: color 0.2s;
		flex-shrink: 0;
		min-width: 160px;
	}

	.server-description {
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

	.server-meta {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		flex-shrink: 0;
	}

	.tool-count {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--color-primary);
		background: rgba(4, 164, 89, 0.1);
		padding: var(--space-1) var(--space-3);
		border-radius: var(--radius-sm);
	}

	.status-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--text-muted);
	}

	.status-dot.active {
		background: var(--color-primary);
		box-shadow: 0 0 8px rgba(4, 164, 89, 0.5);
	}

	.expand-icon {
		flex-shrink: 0;
		color: var(--text-muted);
		transition: transform 0.2s;
	}

	.server-item.expanded .expand-icon {
		transform: rotate(180deg);
	}

	/* Expanded Content */
	.server-expanded {
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

	.tools-grid {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.tool-chip {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-3);
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all 0.2s;
	}

	.tool-chip:hover {
		border-color: var(--color-primary);
		background: rgba(4, 164, 89, 0.05);
	}

	.tool-chip.copied {
		border-color: var(--color-primary);
		background: rgba(4, 164, 89, 0.15);
	}

	.tool-chip code {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--text-secondary);
	}

	.tool-chip:hover code {
		color: var(--text-primary);
	}

	.tool-chip.copied code {
		color: var(--color-primary);
	}

	.tool-chip svg {
		color: var(--text-muted);
		flex-shrink: 0;
	}

	.tool-chip.copied svg {
		color: var(--color-primary);
	}

	.more-tools {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--text-muted);
		padding: var(--space-2) var(--space-3);
	}

	/* No Results */
	.no-servers {
		padding: var(--space-12);
		text-align: center;
		color: var(--text-muted);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.mcp-container {
			padding: 0 var(--space-4);
		}

		.mcp-header h1 {
			font-size: 2rem;
		}

		.search-container {
			max-width: 100%;
		}

		.server-row {
			flex-wrap: wrap;
		}

		.server-description {
			width: 100%;
			order: 10;
			margin-top: var(--space-2);
			padding-left: calc(28px + var(--space-4) + 1.25rem + var(--space-4));
		}

		.server-meta {
			margin-left: auto;
		}

		.server-expanded {
			padding-left: var(--space-5);
		}
	}
</style>
