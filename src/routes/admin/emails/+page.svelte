<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Format percentages
	function formatPercent(value: number): string {
		return value.toFixed(1) + '%';
	}

	// Format numbers with commas
	function formatNumber(value: number): string {
		return value.toLocaleString();
	}

	// Calculate trend (mock - would compare to previous period in real implementation)
	function getTrend(value: number): { direction: 'up' | 'down' | 'neutral'; percent: string } {
		// For demo purposes, randomize trends
		const directions: ('up' | 'down' | 'neutral')[] = ['up', 'down', 'neutral'];
		return {
			direction: directions[Math.floor(Math.random() * 3)],
			percent: (Math.random() * 5).toFixed(1) + '%',
		};
	}
</script>

<svelte:head>
	<title>Email Marketing | code:zero Admin</title>
</svelte:head>

<header class="page-header">
	<div class="header-title">
		<h1>Email Marketing</h1>
		<p class="header-subtitle">Manage campaigns, track performance, and optimize with AI</p>
	</div>
	<div class="header-actions">
		<a href="/admin/emails/campaigns/new" class="btn btn-primary">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<line x1="12" y1="5" x2="12" y2="19"/>
				<line x1="5" y1="12" x2="19" y2="12"/>
			</svg>
			New Campaign
		</a>
	</div>
</header>

<!-- Key Metrics -->
<section class="metrics-section">
	<h2>Last 30 Days</h2>
	<div class="metrics-grid">
		<div class="metric-card">
			<div class="metric-value">{formatNumber(data.metrics.sent)}</div>
			<div class="metric-label">Emails Sent</div>
			<div class="metric-trend up">
				<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
				</svg>
				12%
			</div>
		</div>
		<div class="metric-card">
			<div class="metric-value">{formatPercent(data.metrics.openRate)}</div>
			<div class="metric-label">Open Rate</div>
			<div class="metric-trend up">
				<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
				</svg>
				3.2%
			</div>
		</div>
		<div class="metric-card">
			<div class="metric-value">{formatPercent(data.metrics.clickRate)}</div>
			<div class="metric-label">Click Rate</div>
			<div class="metric-trend down">
				<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
				</svg>
				0.5%
			</div>
		</div>
		<div class="metric-card">
			<div class="metric-value">{formatPercent(data.metrics.bounceRate)}</div>
			<div class="metric-label">Bounce Rate</div>
			<div class="metric-trend neutral">
				<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<line x1="5" y1="12" x2="19" y2="12"/>
				</svg>
				0%
			</div>
		</div>
	</div>
</section>

<!-- Quick Actions -->
<section class="quick-actions">
	<a href="/admin/emails/campaigns/new" class="action-card">
		<div class="action-icon" style="--icon-color: #04A459">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<line x1="12" y1="5" x2="12" y2="19"/>
				<line x1="5" y1="12" x2="19" y2="12"/>
			</svg>
		</div>
		<span>Create Campaign</span>
	</a>
	<a href="/admin/emails/campaigns/new?ai=1" class="action-card">
		<div class="action-icon" style="--icon-color: #8b5cf6">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M12 2L2 7l10 5 10-5-10-5z"/>
				<path d="M2 17l10 5 10-5"/>
				<path d="M2 12l10 5 10-5"/>
			</svg>
		</div>
		<span>AI Generate</span>
	</a>
	<a href="/admin/emails/queue" class="action-card">
		<div class="action-icon" style="--icon-color: #f59e0b">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
				<line x1="16" y1="2" x2="16" y2="6"/>
				<line x1="8" y1="2" x2="8" y2="6"/>
				<line x1="3" y1="10" x2="21" y2="10"/>
			</svg>
		</div>
		<span>View Queue</span>
	</a>
	<a href="/admin/emails/sequences/new" class="action-card">
		<div class="action-icon" style="--icon-color: #06b6d4">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
			</svg>
		</div>
		<span>New Sequence</span>
	</a>
</section>

<!-- Two-column layout -->
<div class="dashboard-grid">
	<!-- Recent Campaigns -->
	<section class="recent-campaigns">
		<div class="section-header">
			<h2>Recent Campaigns</h2>
			<a href="/admin/emails/campaigns" class="view-all">View All</a>
		</div>
		<div class="campaigns-list">
			{#if data.recentCampaigns.length === 0}
				<div class="empty-state">
					<p>No campaigns sent yet</p>
					<a href="/admin/emails/campaigns/new" class="btn btn-secondary">Create Your First Campaign</a>
				</div>
			{:else}
				{#each data.recentCampaigns as campaign}
					<a href="/admin/emails/campaigns/{campaign.campaignId}" class="campaign-row">
						<div class="campaign-info">
							<span class="campaign-name">{campaign.campaignName}</span>
							<span class="campaign-subject">{campaign.subject}</span>
						</div>
						<div class="campaign-stats">
							<span class="stat">
								<span class="stat-value">{formatPercent(campaign.openRate)}</span>
								<span class="stat-label">opens</span>
							</span>
							<span class="stat">
								<span class="stat-value">{formatPercent(campaign.clickRate)}</span>
								<span class="stat-label">clicks</span>
							</span>
						</div>
					</a>
				{/each}
			{/if}
		</div>
	</section>

	<!-- AI Insights -->
	<section class="ai-insights">
		<div class="section-header">
			<h2>AI Insights</h2>
			<span class="ai-badge">Powered by AI</span>
		</div>
		<div class="insights-list">
			{#if data.aiInsights.subjectPatterns.length > 0}
				{#each data.aiInsights.subjectPatterns.slice(0, 3) as pattern}
					<div class="insight-item">
						<span class="insight-bullet">•</span>
						<span class="insight-text">
							"{pattern.pattern}" subject lines get <strong>{formatPercent(pattern.avgOpenRate)}</strong> avg open rate
						</span>
					</div>
				{/each}
			{/if}
			{#if data.aiInsights.bestSendTimes.length > 0}
				{@const best = data.aiInsights.bestSendTimes[0]}
				<div class="insight-item">
					<span class="insight-bullet">•</span>
					<span class="insight-text">
						Best send time: <strong>{best.dayOfWeek} at {best.hour}:00</strong> ({formatPercent(best.avgOpenRate)} opens)
					</span>
				</div>
			{/if}
			{#if data.aiInsights.subjectPatterns.length === 0 && data.aiInsights.bestSendTimes.length === 0}
				<div class="insight-empty">
					<p>Send more campaigns to unlock AI insights</p>
					<p class="insight-hint">We'll analyze your data to find winning patterns</p>
				</div>
			{/if}
		</div>
		<a href="/admin/emails/campaigns/new?ai=1" class="btn btn-insight">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M12 2L2 7l10 5 10-5-10-5z"/>
				<path d="M2 17l10 5 10-5"/>
				<path d="M2 12l10 5 10-5"/>
			</svg>
			Generate Campaign Based on Top Performers
		</a>
	</section>
</div>

<!-- Queue Summary -->
<section class="queue-summary">
	<div class="section-header">
		<h2>Email Queue</h2>
		<a href="/admin/emails/queue" class="view-all">Manage Queue</a>
	</div>
	<div class="queue-stats">
		<div class="queue-stat">
			<span class="queue-count">{data.queue.drafts.length}</span>
			<span class="queue-label">Drafts</span>
		</div>
		<div class="queue-stat">
			<span class="queue-count">{data.queue.scheduled.length}</span>
			<span class="queue-label">Scheduled</span>
		</div>
		<div class="queue-stat">
			<span class="queue-count">{data.queue.sending.length}</span>
			<span class="queue-label">Sending</span>
		</div>
		<div class="queue-stat">
			<span class="queue-count">{data.queue.sent.length}</span>
			<span class="queue-label">Sent Today</span>
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

	.btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-4);
		font-size: 0.875rem;
		font-weight: 600;
		border-radius: var(--radius-md);
		text-decoration: none;
		border: none;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.btn-primary {
		background: var(--color-primary);
		color: white;
	}

	.btn-primary:hover {
		background: var(--color-primary-light);
	}

	.btn-secondary {
		background: var(--bg-elevated);
		color: var(--text-primary);
		border: 1px solid var(--border-subtle);
	}

	.btn-secondary:hover {
		border-color: var(--color-primary);
	}

	/* Metrics Section */
	.metrics-section {
		margin-bottom: var(--space-6);
	}

	.metrics-section h2 {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-muted);
		margin-bottom: var(--space-3);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.metrics-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--space-4);
	}

	.metric-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-5);
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
		margin-bottom: var(--space-2);
	}

	.metric-trend {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		font-size: 0.75rem;
		font-weight: 600;
	}

	.metric-trend.up {
		color: var(--color-primary);
	}

	.metric-trend.down {
		color: #ef4444;
	}

	.metric-trend.neutral {
		color: var(--text-muted);
	}

	/* Quick Actions */
	.quick-actions {
		display: flex;
		gap: var(--space-3);
		margin-bottom: var(--space-6);
	}

	.action-card {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3) var(--space-4);
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		text-decoration: none;
		color: var(--text-primary);
		font-weight: 500;
		font-size: 0.875rem;
		transition: all 0.15s ease;
	}

	.action-card:hover {
		border-color: var(--color-primary);
		transform: translateY(-2px);
	}

	.action-icon {
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: color-mix(in srgb, var(--icon-color) 15%, transparent);
		border-radius: var(--radius-md);
		color: var(--icon-color);
	}

	/* Dashboard Grid */
	.dashboard-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-6);
		margin-bottom: var(--space-6);
	}

	/* Section Headers */
	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-4);
	}

	.section-header h2 {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.view-all {
		font-size: 0.875rem;
		color: var(--color-primary);
		text-decoration: none;
	}

	.view-all:hover {
		text-decoration: underline;
	}

	/* Recent Campaigns */
	.recent-campaigns {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-5);
	}

	.campaigns-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.campaign-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-3);
		background: var(--bg-base);
		border-radius: var(--radius-md);
		text-decoration: none;
		transition: all 0.15s ease;
	}

	.campaign-row:hover {
		background: rgba(4, 164, 89, 0.05);
	}

	.campaign-info {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.campaign-name {
		font-weight: 600;
		color: var(--text-primary);
		font-size: 0.875rem;
	}

	.campaign-subject {
		color: var(--text-muted);
		font-size: 0.8rem;
	}

	.campaign-stats {
		display: flex;
		gap: var(--space-4);
	}

	.stat {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.stat-value {
		font-weight: 600;
		color: var(--text-primary);
		font-size: 0.875rem;
	}

	.stat-label {
		color: var(--text-muted);
		font-size: 0.7rem;
	}

	.empty-state {
		text-align: center;
		padding: var(--space-6);
		color: var(--text-muted);
	}

	.empty-state p {
		margin-bottom: var(--space-3);
	}

	/* AI Insights */
	.ai-insights {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-5);
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

	.insights-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		margin-bottom: var(--space-4);
	}

	.insight-item {
		display: flex;
		gap: var(--space-2);
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.insight-bullet {
		color: var(--color-primary);
		font-weight: bold;
	}

	.insight-text strong {
		color: var(--text-primary);
	}

	.insight-empty {
		text-align: center;
		padding: var(--space-4);
		color: var(--text-muted);
	}

	.insight-hint {
		font-size: 0.8rem;
		margin-top: var(--space-1);
	}

	.btn-insight {
		width: 100%;
		justify-content: center;
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%);
		color: #8b5cf6;
		border: 1px solid rgba(139, 92, 246, 0.3);
	}

	.btn-insight:hover {
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%);
	}

	/* Queue Summary */
	.queue-summary {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-5);
	}

	.queue-stats {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--space-4);
	}

	.queue-stat {
		text-align: center;
		padding: var(--space-4);
		background: var(--bg-base);
		border-radius: var(--radius-md);
	}

	.queue-count {
		display: block;
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.queue-label {
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.metrics-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.dashboard-grid {
			grid-template-columns: 1fr;
		}

		.quick-actions {
			flex-wrap: wrap;
		}

		.queue-stats {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 640px) {
		.page-header {
			flex-direction: column;
			gap: var(--space-3);
		}

		.metrics-grid {
			grid-template-columns: 1fr;
		}

		.quick-actions {
			flex-direction: column;
		}

		.action-card {
			width: 100%;
		}
	}
</style>
