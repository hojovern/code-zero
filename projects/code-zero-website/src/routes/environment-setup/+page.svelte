<script lang="ts">
	let copiedId = $state<string | null>(null);
	let os = $state<'mac' | 'windows'>('mac');
	let searchQuery = $state('');

	type SetupStep = {
		id: string;
		icon: string;
		title: string;
		description: string;
		category: 'essential' | 'ai-cli' | 'config' | 'tips';
		mac?: { command: string; note?: string };
		windows?: { command: string; note?: string };
		command?: string;
		note?: string;
		docsUrl?: string;
		warning?: boolean;
	};

	const setupSteps: SetupStep[] = [
		{
			id: 'package-manager',
			icon: '📦',
			title: 'Package Manager',
			description: 'Install packages from the command line.',
			category: 'essential',
			mac: {
				command: '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
				note: 'Homebrew'
			},
			windows: {
				command: 'winget --version',
				note: 'Winget (App Installer)'
			},
			docsUrl: 'https://brew.sh'
		},
		{
			id: 'terminal',
			icon: '💻',
			title: 'Better Terminal',
			description: 'Modern terminal with split panes and tabs.',
			category: 'essential',
			mac: {
				command: 'brew install --cask iterm2',
				note: 'iTerm2'
			},
			windows: {
				command: 'winget install Microsoft.WindowsTerminal',
				note: 'Windows Terminal'
			},
			docsUrl: 'https://iterm2.com'
		},
		{
			id: 'node',
			icon: '🟢',
			title: 'Node.js LTS',
			description: 'JavaScript runtime for dev tools.',
			category: 'essential',
			mac: {
				command: 'brew install node',
				note: 'Verify: node -v'
			},
			windows: {
				command: 'winget install OpenJS.NodeJS.LTS',
				note: 'Verify: node -v'
			},
			docsUrl: 'https://nodejs.org'
		},
		{
			id: 'git',
			icon: '🔀',
			title: 'Git',
			description: 'Version control system.',
			category: 'essential',
			mac: {
				command: 'brew install git',
				note: 'git --version'
			},
			windows: {
				command: 'winget install Git.Git',
				note: 'git --version'
			},
			docsUrl: 'https://git-scm.com'
		},
		{
			id: 'claude',
			icon: '🤖',
			title: 'Claude Code',
			description: 'Anthropic\'s official AI CLI.',
			category: 'ai-cli',
			command: 'npm install -g @anthropic-ai/claude-code',
			note: 'Requires API key',
			docsUrl: 'https://docs.anthropic.com/en/docs/claude-code'
		},
		{
			id: 'gemini',
			icon: '💎',
			title: 'Gemini CLI',
			description: 'Google\'s AI in your terminal.',
			category: 'ai-cli',
			command: 'pip install -q -U google-generativeai',
			note: 'Requires Python',
			docsUrl: 'https://ai.google.dev'
		},
		{
			id: 'python-office',
			icon: '🐍',
			title: 'Python Office SDKs',
			description: 'Generate Word/Excel/PPTX files.',
			category: 'config',
			command: 'pip install python-docx openpyxl python-pptx',
			note: 'For automated reporting',
			docsUrl: 'https://pypi.org'
		},
		{
			id: 'claude-turbo',
			icon: '⚡',
			title: 'Claude Turbo',
			description: 'Skip permission prompts (Risky).',
			category: 'tips',
			command: 'claude --dangerously-skip-permissions',
			note: 'Trusted projects only',
			warning: true
		}
	];

	// Filter steps based on search
	let filteredSteps = $derived(() => {
		if (!searchQuery.trim()) return setupSteps;
		const query = searchQuery.toLowerCase();
		return setupSteps.filter(s =>
			s.title.toLowerCase().includes(query) ||
			s.description.toLowerCase().includes(query) ||
			s.category.toLowerCase().includes(query)
		);
	});

	function getCommand(step: SetupStep): string {
		if (step.command) return step.command;
		return os === 'mac' ? step.mac?.command || '' : step.windows?.command || '';
	}

	function getNote(step: SetupStep): string | undefined {
		if (step.note) return step.note;
		return os === 'mac' ? step.mac?.note : step.windows?.note;
	}

	async function copyToClipboard(text: string, id: string) {
		try {
			await navigator.clipboard.writeText(text);
			copiedId = id;
			setTimeout(() => {
				copiedId = null;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}
</script>

<svelte:head>
	<title>Environment Setup | code:zero</title>
</svelte:head>

<main class="tool-page">
	<div class="tool-container">
		<!-- Breadcrumb -->
		<nav class="breadcrumb">
			<a href="/">Home</a>
			<span class="separator">»</span>
			<span>Setup</span>
		</nav>

		<!-- Header -->
		<header class="tool-header">
			<h1>Environment Setup</h1>
			<p class="tool-intro">
				<em>Essential tools and configurations for the code:zero stack. Select your OS and copy commands to your terminal.</em>
			</p>
		</header>

		<!-- Controls Bar -->
		<div class="controls-bar">
			<div class="os-selector">
				<button
					class="os-btn"
					class:active={os === 'mac'}
					onclick={() => os = 'mac'}
				>
					<span class="os-icon">🍎</span> macOS
				</button>
				<button
					class="os-btn"
					class:active={os === 'windows'}
					onclick={() => os = 'windows'}
				>
					<span class="os-icon">🪟</span> Windows
				</button>
			</div>

			<div class="search-container">
				<input
					type="text"
					placeholder="Search tools..."
					bind:value={searchQuery}
					class="search-input"
				/>
			</div>
		</div>

		<!-- Tools List -->
		<div class="tools-list">
			<div class="list-header">
				<span class="col-tool">TOOL</span>
				<span class="col-desc">DESCRIPTION</span>
				<span class="col-cmd">COMMAND</span>
				<span class="col-meta">META</span>
			</div>

			{#each filteredSteps() as step}
				<div class="tool-item">
					<div class="tool-info">
						<span class="tool-icon">{step.icon}</span>
						<span class="tool-name">{step.title}</span>
						{#if step.docsUrl}
							<a href={step.docsUrl} target="_blank" rel="noopener noreferrer" class="docs-link" aria-label="Docs">↗</a>
						{/if}
					</div>

					<div class="tool-desc">
						{step.description}
					</div>

					<div class="tool-cmd">
						<code class="cmd-text">{getCommand(step)}</code>
						<button
							class="copy-btn"
							onclick={() => copyToClipboard(getCommand(step), step.id)}
							aria-label="Copy command"
							class:copied={copiedId === step.id}
						>
							{#if copiedId === step.id}
								✓
							{:else}
								⎘
							{/if}
						</button>
					</div>

					<div class="tool-meta">
						<span class="meta-tag {step.category}">{step.category}</span>
						{#if getNote(step)}
							<span class="meta-note">{getNote(step)}</span>
						{/if}
					</div>
				</div>
			{/each}
		</div>

		<!-- Status Line Section (Compact) -->
		<div class="section-divider">
			<h2>Terminal Status Line</h2>
		</div>

		<div class="config-block">
			<div class="config-header">
				<span class="config-title">claude-status.{os === 'mac' ? 'sh' : 'ps1'}</span>
				<span class="config-desc">Real-time token usage & cost display</span>
			</div>
			<div class="config-body">
				<p>See <code>~/Coding/code-zero/clade/settings.json</code> for full configuration.</p>
				<div class="cmd-row">
					<code>{os === 'mac' ? 'chmod +x ~/.claude/statusline.sh' : 'Set-ExecutionPolicy RemoteSigned'}</code>
					<button class="copy-tiny">Copy</button>
				</div>
			</div>
		</div>

	</div>
</main>

<style>
	/* Layout & Base */
	.tool-page {
		min-height: 100vh;
		padding: calc(80px + var(--space-12)) 0 var(--space-24);
		background: var(--bg-base);
		color: var(--text-secondary);
	}

	.tool-container {
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

	.breadcrumb a:hover { color: var(--text-primary); }
	.separator { opacity: 0.5; }

	/* Header */
	.tool-header { margin-bottom: var(--space-8); }
	
	.tool-header h1 {
		font-family: var(--font-heading);
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-4);
		letter-spacing: -0.02em;
	}

	.tool-intro {
		font-size: 1.1rem;
		line-height: 1.7;
		color: var(--text-secondary);
	}

	.tool-intro em { font-style: italic; }

	/* Controls */
	.controls-bar {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-4);
		margin-bottom: var(--space-6);
		align-items: center;
		justify-content: space-between;
	}

	.os-selector {
		display: flex;
		background: var(--bg-elevated);
		padding: 4px;
		border-radius: var(--radius-md);
		border: 1px solid var(--border-subtle);
	}

	.os-btn {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 6px 16px;
		border: none;
		background: transparent;
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: 0.9rem;
		cursor: pointer;
		border-radius: 4px;
		transition: all 0.2s;
	}

	.os-btn.active {
		background: var(--bg-surface);
		color: var(--text-primary);
		box-shadow: var(--shadow-sm);
	}

	.search-container {
		flex: 1;
		max-width: 300px;
	}

	.search-input {
		width: 100%;
		padding: 8px 12px;
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		color: var(--text-primary);
		font-family: var(--font-mono);
		font-size: 0.9rem;
	}

	.search-input:focus {
		outline: none;
		border-color: var(--color-primary);
	}

	/* List Table */
	.tools-list {
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		background: var(--bg-elevated);
		overflow: hidden;
	}

	.list-header {
		display: grid;
		grid-template-columns: 1.5fr 2.5fr 4fr 1fr;
		padding: 12px 20px;
		background: rgba(0,0,0,0.2);
		border-bottom: 1px solid var(--border-subtle);
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--text-muted);
		font-weight: 600;
		letter-spacing: 0.05em;
	}

	.tool-item {
		display: grid;
		grid-template-columns: 1.5fr 2.5fr 4fr 1fr;
		padding: 16px 20px;
		align-items: center;
		border-bottom: 1px solid var(--border-subtle);
		transition: background 0.2s;
	}

	.tool-item:last-child { border-bottom: none; }
	.tool-item:hover { background: var(--bg-surface); }

	.tool-info {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.tool-name {
		font-family: var(--font-mono);
		font-size: 1rem;
		font-weight: 500;
		color: var(--text-primary);
	}

	.docs-link {
		color: var(--text-muted);
		text-decoration: none;
		font-family: var(--font-mono);
		opacity: 0.5;
	}
	.docs-link:hover { opacity: 1; color: var(--color-primary); }

	.tool-desc {
		font-size: 0.9rem;
		color: var(--text-secondary);
		padding-right: 16px;
	}

	.tool-cmd {
		display: flex;
		align-items: center;
		gap: 8px;
		background: var(--bg-base);
		padding: 6px 10px;
		border-radius: var(--radius-md);
		border: 1px solid var(--border-subtle);
	}

	.cmd-text {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--color-primary-light);
		white-space: pre-wrap;
		word-break: break-all;
		flex: 1;
	}

	.copy-btn {
		background: transparent;
		border: none;
		color: var(--text-muted);
		cursor: pointer;
		font-size: 1rem;
		padding: 2px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.copy-btn:hover { color: var(--text-primary); }
	.copy-btn.copied { color: var(--color-primary); }

	.tool-meta {
		display: flex;
		flex-direction: column;
		gap: 4px;
		align-items: flex-start;
		padding-left: 10px;
	}

	.meta-tag {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		padding: 2px 6px;
		border-radius: 4px;
		text-transform: uppercase;
	}

	.meta-tag.essential { background: rgba(59, 130, 246, 0.1); color: #60a5fa; }
	.meta-tag.ai-cli { background: rgba(168, 85, 247, 0.1); color: #c084fc; }
	.meta-tag.config { background: rgba(16, 185, 129, 0.1); color: #34d399; }
	.meta-tag.tips { background: rgba(245, 158, 11, 0.1); color: #fbbf24; }

	.meta-note {
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	/* Section Divider */
	.section-divider {
		margin: var(--space-12) 0 var(--space-6);
		border-bottom: 1px solid var(--border-subtle);
		padding-bottom: var(--space-2);
	}

	.section-divider h2 {
		font-family: var(--font-mono);
		font-size: 1rem;
		color: var(--text-primary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	/* Config Block */
	.config-block {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-6);
	}

	.config-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: var(--space-4);
	}

	.config-title {
		font-family: var(--font-mono);
		color: var(--color-primary-light);
		font-weight: 600;
	}

	.config-desc { font-size: 0.9rem; }

	.cmd-row {
		display: flex;
		gap: 12px;
		align-items: center;
		margin-top: 12px;
	}

	.copy-tiny {
		background: var(--bg-surface);
		border: 1px solid var(--border-subtle);
		color: var(--text-secondary);
		font-size: 0.75rem;
		padding: 4px 8px;
		border-radius: 4px;
		cursor: pointer;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.list-header { display: none; }
		.tool-item {
			grid-template-columns: 1fr;
			gap: 12px;
		}
		.tool-desc, .tool-meta { padding: 0; }
	}
</style>