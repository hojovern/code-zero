<script lang="ts">
	let copiedId = $state<string | null>(null);
	let os = $state<'mac' | 'windows'>('mac');

	type SetupStep = {
		id: string;
		icon: string;
		title: string;
		description: string;
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
			description: 'Install packages from the command line. Essential for developer tools.',
			mac: {
				command: '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
				note: 'Homebrew - follow the prompts, then add to PATH as shown.'
			},
			windows: {
				command: 'winget --version',
				note: 'winget comes pre-installed on Windows 11. If missing, get it from the Microsoft Store (App Installer).'
			},
			docsUrl: 'https://brew.sh'
		},
		{
			id: 'terminal',
			icon: '💻',
			title: 'Better Terminal',
			description: 'A modern terminal with split panes, tabs, and customization.',
			mac: {
				command: 'brew install --cask iterm2',
				note: 'iTerm2 - Open from Applications after install.'
			},
			windows: {
				command: 'winget install Microsoft.WindowsTerminal',
				note: 'Windows Terminal - Already installed on Windows 11. Pin it to taskbar.'
			},
			docsUrl: 'https://iterm2.com'
		},
		{
			id: 'node',
			icon: '🟢',
			title: 'Node.js',
			description: 'JavaScript runtime required for Claude Code and many dev tools.',
			mac: {
				command: 'brew install node',
				note: 'Verify: node --version && npm --version'
			},
			windows: {
				command: 'winget install OpenJS.NodeJS.LTS',
				note: 'Verify: node --version && npm --version (restart terminal first)'
			},
			docsUrl: 'https://nodejs.org'
		},
		{
			id: 'git',
			icon: '🔀',
			title: 'Git',
			description: 'Version control for your code. Essential for any developer.',
			mac: {
				command: 'brew install git',
				note: 'May already be installed via Xcode Command Line Tools.'
			},
			windows: {
				command: 'winget install Git.Git',
				note: 'Includes Git Bash. Restart terminal after install.'
			},
			docsUrl: 'https://git-scm.com'
		},
		{
			id: 'claude',
			icon: '🤖',
			title: 'Claude Code',
			description: 'Anthropic\'s official CLI for Claude. Your AI coding assistant.',
			command: 'npm install -g @anthropic-ai/claude-code',
			note: 'You\'ll need an Anthropic API key from console.anthropic.com',
			docsUrl: 'https://docs.anthropic.com/en/docs/claude-code'
		},
		{
			id: 'claude-turbo',
			icon: '⚡',
			title: 'Claude Turbo Mode',
			description: 'Skip permission prompts for faster workflows. Use with caution.',
			command: 'claude --dangerously-skip-permissions',
			note: 'Only in trusted projects. Claude executes without confirmation.',
			warning: true
		},
		{
			id: 'gemini',
			icon: '💎',
			title: 'Gemini CLI',
			description: 'Google\'s AI in your terminal. Great for second opinions.',
			command: 'pip install -q -U google-generativeai',
			note: 'Requires Python installed. Used for Google Gemini API tasks.',
			docsUrl: 'https://ai.google.dev'
		},
		{
			id: 'python-office',
			icon: '🐍',
			title: 'Python Office SDKs',
			description: 'Build tools that generate Word, Excel, and PowerPoint files automatically.',
			command: 'pip install python-docx openpyxl python-pptx',
			note: 'Essential for the "Deck Architect" and "Report Engine" modules.',
			docsUrl: 'https://pypi.org'
		},
		{
			id: 'gemini-yolo',
			icon: '🚀',
			title: 'Gemini YOLO Mode',
			description: 'Auto-approve Gemini actions. Fast but use carefully.',
			command: 'gemini --yolo',
			note: 'Like Claude turbo - only in trusted environments.',
			warning: true
		}
	];

	// Mac status line script (bash)
	const statuslineScriptMac = `#!/bin/bash
input=$(cat)

MODEL=$(echo "$input" | jq -r '.model.display_name')
COST=$(echo "$input" | jq -r '.cost.total_cost_usd')
CONTEXT_SIZE=$(echo "$input" | jq -r '.context_window.context_window_size')
USAGE=$(echo "$input" | jq '.context_window.current_usage')

if [ "$USAGE" != "null" ] && [ "$CONTEXT_SIZE" != "null" ] && [ "$CONTEXT_SIZE" != "0" ]; then
    CURRENT=$(echo "$USAGE" | jq '.input_tokens + .cache_creation_input_tokens + .cache_read_input_tokens')
    REMAINING=$((CONTEXT_SIZE - CURRENT))
    PERCENT=$((CURRENT * 100 / CONTEXT_SIZE))

    if [ "$REMAINING" -gt 1000 ]; then
        REMAINING_FMT="$((REMAINING / 1000))K"
    else
        REMAINING_FMT="$REMAINING"
    fi

    printf "[%s] %d%% used | %s left | $%.2f" "$MODEL" "$PERCENT" "$REMAINING_FMT" "$COST"
else
    printf "[%s] $%.2f" "$MODEL" "$COST"
fi`;

	// Windows status line script (PowerShell)
	const statuslineScriptWindows = `$input = $input | ConvertFrom-Json

$model = $input.model.display_name
$cost = $input.cost.total_cost_usd
$contextSize = $input.context_window.context_window_size
$usage = $input.context_window.current_usage

if ($usage -and $contextSize -and $contextSize -gt 0) {
    $current = $usage.input_tokens + $usage.cache_creation_input_tokens + $usage.cache_read_input_tokens
    $remaining = $contextSize - $current
    $percent = [math]::Round(($current / $contextSize) * 100)

    if ($remaining -gt 1000) {
        $remainingFmt = "$([math]::Floor($remaining / 1000))K"
    } else {
        $remainingFmt = "$remaining"
    }

    Write-Output "[$model] $percent% used | $remainingFmt left | `$$([math]::Round($cost, 2))"
} else {
    Write-Output "[$model] `$$([math]::Round($cost, 2))"
}`;

	const settingsJsonMac = `{
  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh",
    "padding": 0
  }
}`;

	const settingsJsonWindows = `{
  "statusLine": {
    "type": "command",
    "command": "powershell -File %USERPROFILE%\\\\.claude\\\\statusline.ps1",
    "padding": 0
  }
}`;

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
	<meta name="description" content="Set up your AI-powered development environment. Copy-paste commands to get started with Claude, Gemini, and essential developer tools." />
</svelte:head>

<!-- Hero Section -->
<section class="hero">
	<div class="hero-glow"></div>
	<div class="container">
		<div class="hero-content">
			<div class="hero-badge">
				<span class="badge-icon">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M4 17l6-6-6-6M12 19h8"/>
					</svg>
				</span>
				Terminal First
			</div>
			<h1 class="hero-heading">
				Environment <span class="highlight">Setup</span>
			</h1>
			<p class="hero-subheading">
				Everything you need to build with AI. Copy, paste, and start shipping.
			</p>

			<!-- OS Toggle -->
			<div class="os-toggle">
				<button
					class="os-btn"
					class:active={os === 'mac'}
					onclick={() => os = 'mac'}
				>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
					</svg>
					macOS
				</button>
				<button
					class="os-btn"
					class:active={os === 'windows'}
					onclick={() => os = 'windows'}
				>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .15V5.21L20 3zM3 13l6 .09v6.81l-6-1.15V13zm17 .25V22l-10-1.91V13.1l10 .15z"/>
					</svg>
					Windows
				</button>
			</div>
		</div>
	</div>
</section>

<!-- Quick Start -->
<section class="section section-alt">
	<div class="container">
		<div class="section-header">
			<span class="section-number">01</span>
			<h2>Essential Tools</h2>
			<p>Install these in order. Each command is copy-paste ready.</p>
		</div>

		<div class="steps-grid">
			{#each setupSteps as step}
				<div class="step-card" class:warning={step.warning}>
					<div class="step-header">
						<span class="step-icon">{step.icon}</span>
						<div class="step-title-group">
							<h3>{step.title}</h3>
							{#if step.docsUrl}
								<a href={step.docsUrl} target="_blank" rel="noopener noreferrer" class="docs-link">
									Docs
								</a>
							{/if}
						</div>
					</div>
					<p class="step-description">{step.description}</p>

					<div class="command-block">
						<code>{getCommand(step)}</code>
						<button
							class="copy-btn"
							onclick={() => copyToClipboard(getCommand(step), step.id)}
							aria-label="Copy command"
						>
							{#if copiedId === step.id}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M20 6L9 17l-5-5"/>
								</svg>
							{:else}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
									<path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
								</svg>
							{/if}
						</button>
					</div>

					{#if getNote(step)}
						<p class="step-note">
							{#if step.warning}⚠️{:else}💡{/if} {getNote(step)}
						</p>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Custom Status Line -->
<section class="section">
	<div class="container">
		<div class="section-header">
			<span class="section-number">02</span>
			<h2>Claude Status Line</h2>
			<p>See your token usage and cost in real-time. Never run out of context unexpectedly.</p>
		</div>

		<div class="statusline-preview">
			<div class="terminal-window">
				<div class="terminal-header">
					{#if os === 'mac'}
						<span class="terminal-dot red"></span>
						<span class="terminal-dot yellow"></span>
						<span class="terminal-dot green"></span>
					{:else}
						<span class="terminal-icon">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
								<path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .15V5.21L20 3z"/>
							</svg>
						</span>
					{/if}
					<span class="terminal-title">{os === 'mac' ? 'iTerm2 — claude' : 'Windows Terminal — claude'}</span>
				</div>
				<div class="terminal-body">
					<div class="statusline-demo">
						[Opus 4.5] 15% used | 170K left | $0.45
					</div>
				</div>
			</div>
		</div>

		<div class="setup-instructions">
			<div class="instruction-step">
				<div class="instruction-header">
					<span class="instruction-number">1</span>
					<h4>Create the status line script</h4>
				</div>
				{#if os === 'mac'}
					<p>Save this to <code>~/.claude/statusline.sh</code></p>
					<div class="code-block">
						<pre>{statuslineScriptMac}</pre>
						<button
							class="copy-btn"
							onclick={() => copyToClipboard(statuslineScriptMac, 'statusline')}
							aria-label="Copy script"
						>
							{#if copiedId === 'statusline'}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M20 6L9 17l-5-5"/>
								</svg>
							{:else}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
									<path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
								</svg>
							{/if}
						</button>
					</div>
				{:else}
					<p>Save this to <code>%USERPROFILE%\.claude\statusline.ps1</code></p>
					<div class="code-block">
						<pre>{statuslineScriptWindows}</pre>
						<button
							class="copy-btn"
							onclick={() => copyToClipboard(statuslineScriptWindows, 'statusline')}
							aria-label="Copy script"
						>
							{#if copiedId === 'statusline'}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M20 6L9 17l-5-5"/>
								</svg>
							{:else}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
									<path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
								</svg>
							{/if}
						</button>
					</div>
				{/if}
			</div>

			{#if os === 'mac'}
				<div class="instruction-step">
					<div class="instruction-header">
						<span class="instruction-number">2</span>
						<h4>Make it executable</h4>
					</div>
					<div class="command-block standalone">
						<code>chmod +x ~/.claude/statusline.sh</code>
						<button
							class="copy-btn"
							onclick={() => copyToClipboard('chmod +x ~/.claude/statusline.sh', 'chmod')}
							aria-label="Copy command"
						>
							{#if copiedId === 'chmod'}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M20 6L9 17l-5-5"/>
								</svg>
							{:else}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
									<path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
								</svg>
							{/if}
						</button>
					</div>
				</div>

				<div class="instruction-step">
					<div class="instruction-header">
						<span class="instruction-number">3</span>
						<h4>Install jq (JSON parser)</h4>
					</div>
					<div class="command-block standalone">
						<code>brew install jq</code>
						<button
							class="copy-btn"
							onclick={() => copyToClipboard('brew install jq', 'jq')}
							aria-label="Copy command"
						>
							{#if copiedId === 'jq'}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M20 6L9 17l-5-5"/>
								</svg>
							{:else}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
									<path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
								</svg>
							{/if}
						</button>
					</div>
				</div>

				<div class="instruction-step">
					<div class="instruction-header">
						<span class="instruction-number">4</span>
						<h4>Configure Claude</h4>
					</div>
					<p>Add this to <code>~/.claude/settings.json</code></p>
					<div class="code-block">
						<pre>{settingsJsonMac}</pre>
						<button
							class="copy-btn"
							onclick={() => copyToClipboard(settingsJsonMac, 'settings')}
							aria-label="Copy settings"
						>
							{#if copiedId === 'settings'}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M20 6L9 17l-5-5"/>
								</svg>
							{:else}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
									<path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
								</svg>
							{/if}
						</button>
					</div>
				</div>
			{:else}
				<div class="instruction-step">
					<div class="instruction-header">
						<span class="instruction-number">2</span>
						<h4>Create the .claude folder</h4>
					</div>
					<div class="command-block standalone">
						<code>mkdir $env:USERPROFILE\.claude</code>
						<button
							class="copy-btn"
							onclick={() => copyToClipboard('mkdir $env:USERPROFILE\\.claude', 'mkdir')}
							aria-label="Copy command"
						>
							{#if copiedId === 'mkdir'}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M20 6L9 17l-5-5"/>
								</svg>
							{:else}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
									<path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
								</svg>
							{/if}
						</button>
					</div>
				</div>

				<div class="instruction-step">
					<div class="instruction-header">
						<span class="instruction-number">3</span>
						<h4>Configure Claude</h4>
					</div>
					<p>Add this to <code>%USERPROFILE%\.claude\settings.json</code></p>
					<div class="code-block">
						<pre>{settingsJsonWindows}</pre>
						<button
							class="copy-btn"
							onclick={() => copyToClipboard(settingsJsonWindows, 'settings')}
							aria-label="Copy settings"
						>
							{#if copiedId === 'settings'}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M20 6L9 17l-5-5"/>
								</svg>
							{:else}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
									<path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
								</svg>
							{/if}
						</button>
					</div>
				</div>
			{/if}
		</div>

		<div class="statusline-info">
			<div class="info-card">
				<span class="info-icon">📊</span>
				<h4>What it shows</h4>
				<ul>
					<li><strong>% used</strong> — Context window consumption</li>
					<li><strong>left</strong> — Remaining tokens (in K)</li>
					<li><strong>$</strong> — Session cost so far</li>
				</ul>
			</div>
			<div class="info-card">
				<span class="info-icon">⚡</span>
				<h4>Zero token cost</h4>
				<p>The status line runs locally — it doesn't use any API tokens. It just displays info Claude already tracks.</p>
			</div>
		</div>
	</div>
</section>

<!-- Pro Tips -->
<section class="section section-alt">
	<div class="container">
		<div class="section-header">
			<span class="section-number">03</span>
			<h2>Pro Tips</h2>
			<p>Level up your terminal workflow.</p>
		</div>

		<div class="tips-grid">
			<div class="tip-card">
				<span class="tip-icon">🔑</span>
				<h4>API Keys</h4>
				{#if os === 'mac'}
					<p>Store API keys in environment variables. Add to <code>~/.zshrc</code>:</p>
					<div class="command-block">
						<code>export ANTHROPIC_API_KEY="your-key-here"</code>
						<button
							class="copy-btn"
							onclick={() => copyToClipboard('export ANTHROPIC_API_KEY="your-key-here"', 'apikey')}
						>
							{#if copiedId === 'apikey'}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M20 6L9 17l-5-5"/>
								</svg>
							{:else}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
									<path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
								</svg>
							{/if}
						</button>
					</div>
				{:else}
					<p>Set environment variable via PowerShell (permanent):</p>
					<div class="command-block">
						<code>[Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "your-key", "User")</code>
						<button
							class="copy-btn"
							onclick={() => copyToClipboard('[Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "your-key", "User")', 'apikey')}
						>
							{#if copiedId === 'apikey'}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M20 6L9 17l-5-5"/>
								</svg>
							{:else}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
									<path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
								</svg>
							{/if}
						</button>
					</div>
				{/if}
			</div>

			<div class="tip-card">
				<span class="tip-icon">📁</span>
				<h4>Project Context</h4>
				<p>Create a <code>CLAUDE.md</code> file in your project root. Claude reads it automatically for context about your codebase.</p>
			</div>

			<div class="tip-card">
				<span class="tip-icon">🔄</span>
				<h4>Reload Config</h4>
				{#if os === 'mac'}
					<p>After editing <code>~/.zshrc</code>, reload:</p>
					<div class="command-block">
						<code>source ~/.zshrc</code>
						<button
							class="copy-btn"
							onclick={() => copyToClipboard('source ~/.zshrc', 'source')}
						>
							{#if copiedId === 'source'}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M20 6L9 17l-5-5"/>
								</svg>
							{:else}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
									<path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
								</svg>
							{/if}
						</button>
					</div>
				{:else}
					<p>After setting env vars, restart your terminal or run:</p>
					<div class="command-block">
						<code>refreshenv</code>
						<button
							class="copy-btn"
							onclick={() => copyToClipboard('refreshenv', 'source')}
						>
							{#if copiedId === 'source'}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M20 6L9 17l-5-5"/>
								</svg>
							{:else}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
									<path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
								</svg>
							{/if}
						</button>
					</div>
				{/if}
			</div>

			<div class="tip-card">
				<span class="tip-icon">🛠️</span>
				<h4>VS Code Integration</h4>
				<p>Open projects from terminal:</p>
				<div class="command-block">
					<code>code .</code>
					<button
						class="copy-btn"
						onclick={() => copyToClipboard('code .', 'vscode')}
					>
						{#if copiedId === 'vscode'}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M20 6L9 17l-5-5"/>
							</svg>
						{:else}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
								<path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
							</svg>
						{/if}
					</button>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="final-cta">
	<div class="container">
		<div class="cta-content">
			<h2>Ready to build?</h2>
			<p>Your environment is set. Time to ship something.</p>
			<a href="/" class="btn btn-primary btn-lg">Explore Courses</a>
		</div>
	</div>
</section>

<style>
	/* Hero */
	.hero {
		position: relative;
		padding: calc(80px + var(--space-16)) 0 var(--space-16);
		overflow: hidden;
		background: var(--bg-base);
		text-align: center;
	}

	.hero-glow {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 80%;
		height: 80%;
		background: radial-gradient(ellipse at center, rgba(4, 164, 89, 0.15) 0%, transparent 60%);
		filter: blur(80px);
		pointer-events: none;
	}

	.container {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--space-6);
	}

	.hero-content {
		position: relative;
		z-index: 1;
		max-width: 700px;
		margin: 0 auto;
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-4);
		background: rgba(4, 164, 89, 0.1);
		border: 1px solid rgba(4, 164, 89, 0.3);
		border-radius: var(--radius-full);
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-primary);
		margin-bottom: var(--space-6);
	}

	.badge-icon {
		display: flex;
	}

	.hero-heading {
		font-family: var(--font-heading);
		font-size: clamp(2.5rem, 6vw, 4rem);
		font-weight: 800;
		line-height: 1.1;
		letter-spacing: -0.02em;
		color: var(--text-primary);
		margin: 0 0 var(--space-6);
	}

	.hero-heading .highlight {
		background: var(--gradient-accent);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero-subheading {
		font-size: 1.25rem;
		color: var(--text-secondary);
		line-height: 1.6;
		margin: 0 0 var(--space-8);
	}

	/* OS Toggle */
	.os-toggle {
		display: inline-flex;
		gap: var(--space-2);
		background: var(--bg-elevated);
		padding: var(--space-1);
		border-radius: var(--radius-lg);
		border: 1px solid var(--border-subtle);
	}

	.os-btn {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-5);
		background: transparent;
		border: none;
		border-radius: var(--radius-md);
		color: var(--text-secondary);
		font-family: var(--font-body);
		font-size: 0.9375rem;
		font-weight: 600;
		cursor: pointer;
		transition: all var(--duration-fast);
	}

	.os-btn:hover {
		color: var(--text-primary);
	}

	.os-btn.active {
		background: var(--color-primary);
		color: white;
		box-shadow: var(--shadow-md);
	}

	/* Sections */
	.section {
		padding: var(--space-20) 0;
	}

	.section-alt {
		background: var(--bg-elevated);
	}

	.section-header {
		text-align: center;
		margin-bottom: var(--space-12);
	}

	.section-number {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: 0.875rem;
		color: var(--color-primary);
		background: rgba(4, 164, 89, 0.1);
		padding: var(--space-1) var(--space-3);
		border-radius: var(--radius-full);
		margin-bottom: var(--space-4);
	}

	.section-header h2 {
		font-family: var(--font-heading);
		font-size: 2.5rem;
		font-weight: 800;
		color: var(--text-primary);
		margin: 0 0 var(--space-3);
	}

	.section-header p {
		font-size: 1.125rem;
		color: var(--text-secondary);
		margin: 0;
	}

	/* Steps Grid */
	.steps-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: var(--space-6);
	}

	.step-card {
		background: var(--bg-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl);
		padding: var(--space-6);
		transition: transform var(--duration-normal), box-shadow var(--duration-normal), border-color var(--duration-normal);
	}

	.step-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg);
		border-color: var(--color-primary);
	}

	.step-card.warning {
		border-color: rgba(251, 191, 36, 0.3);
	}

	.step-card.warning:hover {
		border-color: rgba(251, 191, 36, 0.6);
	}

	.step-header {
		display: flex;
		align-items: flex-start;
		gap: var(--space-3);
		margin-bottom: var(--space-4);
	}

	.step-icon {
		font-size: 1.5rem;
		line-height: 1;
	}

	.step-title-group {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-2);
	}

	.step-title-group h3 {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text-primary);
		margin: 0;
	}

	.docs-link {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-primary);
		text-decoration: none;
		opacity: 0.8;
		transition: opacity var(--duration-fast);
	}

	.docs-link:hover {
		opacity: 1;
	}

	.step-description {
		font-size: 0.9375rem;
		color: var(--text-secondary);
		line-height: 1.6;
		margin: 0 0 var(--space-4);
	}

	.command-block {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		background: var(--bg-base);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		padding: var(--space-3) var(--space-4);
		margin-bottom: var(--space-3);
	}

	.command-block.standalone {
		margin-bottom: 0;
	}

	.command-block code {
		flex: 1;
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		color: var(--color-primary-light);
		background: none;
		padding: 0;
		overflow-x: auto;
		white-space: nowrap;
	}

	.copy-btn {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		background: var(--bg-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		color: var(--text-secondary);
		cursor: pointer;
		transition: all var(--duration-fast);
	}

	.copy-btn:hover {
		background: var(--bg-hover);
		color: var(--text-primary);
		border-color: var(--color-primary);
	}

	.step-note {
		font-size: 0.8125rem;
		color: var(--text-muted);
		margin: 0;
		line-height: 1.5;
	}

	/* Status Line Preview */
	.statusline-preview {
		max-width: 600px;
		margin: 0 auto var(--space-12);
	}

	.terminal-window {
		background: var(--bg-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.terminal-header {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-4);
		background: var(--bg-elevated);
		border-bottom: 1px solid var(--border-subtle);
	}

	.terminal-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
	}

	.terminal-dot.red { background: #ff5f56; }
	.terminal-dot.yellow { background: #ffbd2e; }
	.terminal-dot.green { background: #27ca40; }

	.terminal-icon {
		display: flex;
		color: var(--text-muted);
	}

	.terminal-title {
		flex: 1;
		text-align: center;
		font-size: 0.75rem;
		color: var(--text-muted);
		font-family: var(--font-mono);
	}

	.terminal-body {
		padding: var(--space-6);
	}

	.statusline-demo {
		font-family: var(--font-mono);
		font-size: 0.875rem;
		color: var(--color-primary-light);
		text-align: center;
	}

	/* Setup Instructions */
	.setup-instructions {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
		margin-bottom: var(--space-12);
	}

	.instruction-step {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl);
		padding: var(--space-6);
	}

	.instruction-header {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		margin-bottom: var(--space-4);
	}

	.instruction-number {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		background: var(--color-primary);
		color: white;
		font-family: var(--font-mono);
		font-size: 0.875rem;
		font-weight: 700;
		border-radius: 50%;
	}

	.instruction-header h4 {
		font-family: var(--font-heading);
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--text-primary);
		margin: 0;
	}

	.instruction-step > p {
		font-size: 0.9375rem;
		color: var(--text-secondary);
		margin: 0 0 var(--space-4);
	}

	.instruction-step > p code {
		font-family: var(--font-mono);
		font-size: 0.875rem;
		background: var(--bg-surface);
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-sm);
		color: var(--color-primary-light);
	}

	.code-block {
		position: relative;
		background: var(--bg-base);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.code-block pre {
		margin: 0;
		padding: var(--space-4);
		padding-right: var(--space-12);
		overflow-x: auto;
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		line-height: 1.7;
		color: var(--text-secondary);
		background: transparent;
		border: none;
	}

	.code-block .copy-btn {
		position: absolute;
		top: var(--space-3);
		right: var(--space-3);
	}

	/* Status Line Info */
	.statusline-info {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--space-6);
	}

	.info-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-6);
	}

	.info-icon {
		font-size: 1.5rem;
		display: block;
		margin-bottom: var(--space-3);
	}

	.info-card h4 {
		font-family: var(--font-heading);
		font-size: 1rem;
		font-weight: 700;
		color: var(--text-primary);
		margin: 0 0 var(--space-3);
	}

	.info-card p {
		font-size: 0.9375rem;
		color: var(--text-secondary);
		margin: 0;
		line-height: 1.6;
	}

	.info-card ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.info-card li {
		font-size: 0.875rem;
		color: var(--text-secondary);
		padding: var(--space-1) 0;
	}

	.info-card li strong {
		color: var(--text-primary);
	}

	/* Tips Grid */
	.tips-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--space-6);
	}

	.tip-card {
		background: var(--bg-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-6);
	}

	.tip-icon {
		font-size: 1.5rem;
		display: block;
		margin-bottom: var(--space-3);
	}

	.tip-card h4 {
		font-family: var(--font-heading);
		font-size: 1rem;
		font-weight: 700;
		color: var(--text-primary);
		margin: 0 0 var(--space-2);
	}

	.tip-card p {
		font-size: 0.9375rem;
		color: var(--text-secondary);
		margin: 0 0 var(--space-4);
		line-height: 1.6;
	}

	.tip-card p:last-child {
		margin-bottom: 0;
	}

	.tip-card code {
		font-family: var(--font-mono);
		font-size: 0.875rem;
		background: var(--bg-elevated);
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-sm);
		color: var(--color-primary-light);
	}

	.tip-card .command-block {
		margin-bottom: 0;
	}

	/* Final CTA */
	.final-cta {
		text-align: center;
		padding: var(--space-24) 0;
		background: var(--bg-base);
	}

	.cta-content {
		max-width: 500px;
		margin: 0 auto;
	}

	.cta-content h2 {
		font-family: var(--font-heading);
		font-size: 2.5rem;
		font-weight: 800;
		color: var(--text-primary);
		margin: 0 0 var(--space-4);
	}

	.cta-content p {
		font-size: 1.25rem;
		color: var(--text-secondary);
		margin: 0 0 var(--space-8);
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-6);
		font-family: var(--font-body);
		font-size: 0.9rem;
		font-weight: 600;
		line-height: 1;
		border-radius: var(--radius-md);
		border: none;
		cursor: pointer;
		text-decoration: none;
		transition: all var(--duration-normal) var(--ease-default);
	}

	.btn-primary {
		background: var(--gradient-accent);
		color: white;
		box-shadow: var(--shadow-glow-sm), var(--shadow-md);
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-glow-md), var(--shadow-lg);
		color: white;
	}

	.btn-lg {
		padding: var(--space-4) var(--space-8);
		font-size: 1rem;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.hero-heading {
			font-size: 2.25rem;
		}

		.section-header h2 {
			font-size: 2rem;
		}

		.steps-grid {
			grid-template-columns: 1fr;
		}

		.tips-grid {
			grid-template-columns: 1fr;
		}

		.os-toggle {
			flex-direction: column;
			width: 100%;
			max-width: 280px;
		}

		.os-btn {
			justify-content: center;
		}
	}
</style>
