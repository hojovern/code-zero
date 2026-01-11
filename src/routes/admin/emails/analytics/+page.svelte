<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function formatPercent(value: number): string {
		return value.toFixed(1) + '%';
	}
</script>

<svelte:head>
	<title>Analytics | Email Marketing | code:zero Admin</title>
</svelte:head>

<header class="page-header">
	<div class="header-title">
		<h1>Email Analytics</h1>
		<p class="header-subtitle">Track performance and discover insights</p>
	</div>
	<div class="header-actions">
		<select class="date-range">
			<option value="7">Last 7 days</option>
			<option value="30" selected>Last 30 days</option>
			<option value="90">Last 90 days</option>
		</select>
	</div>
</header>

<!-- Metrics Overview -->
<section class="metrics-section">
	<div class="metrics-grid">
		<div class="metric-card">
			<div class="metric-header">
				<span class="metric-icon sent">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<line x1="22" y1="2" x2="11" y2="13"/>
						<polygon points="22 2 15 22 11 13 2 9 22 2"/>
					</svg>
				</span>
			</div>
			<div class="metric-value">{data.metrics.sent.toLocaleString()}</div>
			<div class="metric-label">Emails Sent</div>
		</div>
		<div class="metric-card">
			<div class="metric-header">
				<span class="metric-icon opened">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
						<circle cx="12" cy="12" r="3"/>
					</svg>
				</span>
			</div>
			<div class="metric-value">{formatPercent(data.metrics.openRate)}</div>
			<div class="metric-label">Open Rate</div>
		</div>
		<div class="metric-card">
			<div class="metric-header">
				<span class="metric-icon clicked">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
						<polyline points="22 4 12 14.01 9 11.01"/>
					</svg>
				</span>
			</div>
			<div class="metric-value">{formatPercent(data.metrics.clickRate)}</div>
			<div class="metric-label">Click Rate</div>
		</div>
		<div class="metric-card">
			<div class="metric-header">
				<span class="metric-icon bounced">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="12" cy="12" r="10"/>
						<line x1="15" y1="9" x2="9" y2="15"/>
						<line x1="9" y1="9" x2="15" y2="15"/>
					</svg>
				</span>
			</div>
			<div class="metric-value">{formatPercent(data.metrics.bounceRate)}</div>
			<div class="metric-label">Bounce Rate</div>
		</div>
	</div>
</section>

<!-- AI Insights -->
<section class="insights-section">
	<div class="section-header">
		<h2>AI Insights</h2>
		<span class="ai-badge">Powered by AI</span>
	</div>

	<div class="insights-grid">
		<div class="insight-card">
			<h3>Subject Line Patterns</h3>
			{#if data.aiInsights.subjectPatterns.length > 0}
				<ul class="insight-list">
					{#each data.aiInsights.subjectPatterns as pattern}
						<li>
							<span class="pattern-name">{pattern.pattern}</span>
							<span class="pattern-value">{formatPercent(pattern.avgOpenRate)} avg opens</span>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="no-data">Send more campaigns to unlock pattern insights</p>
			{/if}
		</div>

		<div class="insight-card">
			<h3>Best Send Times</h3>
			{#if data.aiInsights.bestSendTimes.length > 0}
				<ul class="insight-list">
					{#each data.aiInsights.bestSendTimes as time}
						<li>
							<span class="pattern-name">{time.dayOfWeek} at {time.hour}:00</span>
							<span class="pattern-value">{formatPercent(time.avgOpenRate)} opens</span>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="no-data">Send more campaigns to discover optimal times</p>
			{/if}
		</div>

		<div class="insight-card recommendations">
			<h3>Recommendations</h3>
			<ul class="recommendations-list">
				<li>Keep subject lines under 50 characters</li>
				<li>Include numbers for higher open rates</li>
				<li>Place CTAs above the fold</li>
				<li>Test sending on Tuesday mornings</li>
			</ul>
		</div>
	</div>
</section>

<style>
	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: var(--space-6);
	}

	.header-title h1 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: 2px;
	}

	.header-subtitle {
		color: var(--text-muted);
		font-size: 0.875rem;
	}

	.date-range {
		padding: var(--space-2) var(--space-3);
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		color: var(--text-primary);
		font-size: 0.875rem;
	}

	/* Metrics */
	.metrics-section {
		margin-bottom: var(--space-6);
	}

	.metrics-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 24px;
	}

	.metric-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: 24px;
	}

	.metric-header {
		margin-bottom: var(--space-3);
	}

	.metric-icon {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-md);
	}

	.metric-icon.sent {
		background: rgba(59, 130, 246, 0.15);
		color: #3b82f6;
	}

	.metric-icon.opened {
		background: rgba(4, 164, 89, 0.15);
		color: var(--color-primary);
	}

	.metric-icon.clicked {
		background: rgba(139, 92, 246, 0.15);
		color: #8b5cf6;
	}

	.metric-icon.bounced {
		background: rgba(239, 68, 68, 0.15);
		color: #ef4444;
	}

	.metric-value {
		font-size: 2rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: 2px;
	}

	.metric-label {
		font-size: 0.875rem;
		color: var(--text-muted);
	}

	/* Insights */
	.insights-section {
		margin-top: 48px;
		margin-bottom: 32px;
	}

	.section-header {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 24px;
	}

	.section-header h2 {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.ai-badge {
		font-size: 0.65rem;
		font-weight: 600;
		padding: 2px 8px;
		background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
		color: white;
		border-radius: var(--radius-full);
		text-transform: uppercase;
	}

	.insights-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
	}

	.insight-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: 24px;
	}

	.insight-card h3 {
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-3);
	}

	.insight-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.insight-list li {
		display: flex;
		justify-content: space-between;
		padding: var(--space-2) var(--space-3);
		background: var(--bg-base);
		border-radius: var(--radius-md);
		font-size: 0.8rem;
	}

	.pattern-name {
		color: var(--text-primary);
	}

	.pattern-value {
		color: var(--color-primary);
		font-weight: 500;
	}

	.no-data {
		color: var(--text-muted);
		font-size: 0.875rem;
		text-align: center;
		padding: var(--space-4);
	}

	.recommendations {
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%);
		border-color: rgba(139, 92, 246, 0.3);
	}

	.recommendations-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.recommendations-list li {
		display: flex;
		align-items: flex-start;
		gap: var(--space-2);
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.recommendations-list li::before {
		content: '•';
		color: #8b5cf6;
		font-weight: bold;
	}

	@media (max-width: 1024px) {
		.metrics-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.insights-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 640px) {
		.metrics-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
