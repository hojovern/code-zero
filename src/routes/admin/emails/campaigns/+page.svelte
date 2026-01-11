<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let filter = $state<'all' | 'draft' | 'scheduled' | 'sent'>('all');
	let searchQuery = $state('');

	const filteredCampaigns = $derived(() => {
		let campaigns = data.campaigns;

		if (filter !== 'all') {
			campaigns = campaigns.filter((c) => c.status === filter);
		}

		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			campaigns = campaigns.filter(
				(c) =>
					c.name.toLowerCase().includes(query) ||
					c.subject.toLowerCase().includes(query)
			);
		}

		return campaigns;
	});

	function formatDate(date: Date | null): string {
		if (!date) return '-';
		return new Intl.DateTimeFormat('en-US', {
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		}).format(new Date(date));
	}

	function formatPercent(value: number | undefined): string {
		if (value === undefined) return '-';
		return value.toFixed(1) + '%';
	}

	function getStatusColor(status: string): string {
		switch (status) {
			case 'draft':
				return '#6b7280';
			case 'review':
				return '#f59e0b';
			case 'scheduled':
				return '#3b82f6';
			case 'sending':
				return '#8b5cf6';
			case 'sent':
				return '#04A459';
			case 'paused':
				return '#ef4444';
			default:
				return '#6b7280';
		}
	}
</script>

<svelte:head>
	<title>Campaigns | Email Marketing | code:zero Admin</title>
</svelte:head>

<header class="page-header">
	<div class="header-title">
		<h1>Campaigns</h1>
		<p class="header-subtitle">Create and manage email campaigns</p>
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

<!-- Filters -->
<div class="filters">
	<div class="filter-tabs">
		<button class="filter-tab" class:active={filter === 'all'} onclick={() => (filter = 'all')}>
			All
		</button>
		<button class="filter-tab" class:active={filter === 'draft'} onclick={() => (filter = 'draft')}>
			Drafts
		</button>
		<button class="filter-tab" class:active={filter === 'scheduled'} onclick={() => (filter = 'scheduled')}>
			Scheduled
		</button>
		<button class="filter-tab" class:active={filter === 'sent'} onclick={() => (filter = 'sent')}>
			Sent
		</button>
	</div>
	<div class="search-box">
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<circle cx="11" cy="11" r="8"/>
			<line x1="21" y1="21" x2="16.65" y2="16.65"/>
		</svg>
		<input
			type="text"
			placeholder="Search campaigns..."
			bind:value={searchQuery}
		/>
	</div>
</div>

<!-- Campaigns Table -->
<div class="campaigns-table">
	{#if filteredCampaigns().length === 0}
		<div class="empty-state">
			<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
				<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
				<polyline points="22,6 12,13 2,6"/>
			</svg>
			<h3>No campaigns found</h3>
			<p>Create your first campaign to get started</p>
			<a href="/admin/emails/campaigns/new" class="btn btn-primary">Create Campaign</a>
		</div>
	{:else}
		<table>
			<thead>
				<tr>
					<th>Campaign</th>
					<th>Status</th>
					<th>Sent / Scheduled</th>
					<th>Opens</th>
					<th>Clicks</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{#each filteredCampaigns() as campaign}
					<tr>
						<td class="campaign-cell">
							<a href="/admin/emails/campaigns/{campaign.id}" class="campaign-link">
								<span class="campaign-name">{campaign.name}</span>
								<span class="campaign-subject">{campaign.subject}</span>
							</a>
						</td>
						<td>
							<span class="status-badge" style="--status-color: {getStatusColor(campaign.status || 'draft')}">
								{campaign.status}
							</span>
						</td>
						<td class="date-cell">
							{campaign.status === 'sent' ? formatDate(campaign.sentAt) : formatDate(campaign.scheduledAt)}
						</td>
						<td>
							{campaign.metrics ? formatPercent(campaign.metrics.openRate) : '-'}
						</td>
						<td>
							{campaign.metrics ? formatPercent(campaign.metrics.clickRate) : '-'}
						</td>
						<td class="actions-cell">
							<div class="row-actions">
								<a href="/admin/emails/campaigns/{campaign.id}" class="action-btn" title="Edit">
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
										<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
									</svg>
								</a>
								<form method="POST" action="?/duplicate" use:enhance>
									<input type="hidden" name="id" value={campaign.id} />
									<button type="submit" class="action-btn" title="Duplicate">
										<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
											<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
										</svg>
									</button>
								</form>
								{#if campaign.status === 'draft'}
									<form method="POST" action="?/delete" use:enhance>
										<input type="hidden" name="id" value={campaign.id} />
										<button type="submit" class="action-btn delete" title="Delete">
											<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
												<polyline points="3 6 5 6 21 6"/>
												<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
											</svg>
										</button>
									</form>
								{/if}
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>

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

	/* Filters */
	.filters {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-4);
		gap: var(--space-4);
	}

	.filter-tabs {
		display: flex;
		gap: var(--space-1);
		background: var(--bg-elevated);
		padding: var(--space-1);
		border-radius: var(--radius-md);
		border: 1px solid var(--border-subtle);
	}

	.filter-tab {
		padding: var(--space-2) var(--space-3);
		background: transparent;
		border: none;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-muted);
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.filter-tab:hover {
		color: var(--text-primary);
	}

	.filter-tab.active {
		background: var(--bg-base);
		color: var(--color-primary);
	}

	.search-box {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-3);
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		color: var(--text-muted);
	}

	.search-box input {
		background: transparent;
		border: none;
		outline: none;
		font-size: 0.875rem;
		color: var(--text-primary);
		width: 200px;
	}

	.search-box input::placeholder {
		color: var(--text-muted);
	}

	/* Table */
	.campaigns-table {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	thead {
		background: var(--bg-base);
	}

	th {
		padding: var(--space-3) var(--space-4);
		text-align: left;
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		border-bottom: 1px solid var(--border-subtle);
	}

	td {
		padding: var(--space-4);
		border-bottom: 1px solid var(--border-subtle);
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	tr:last-child td {
		border-bottom: none;
	}

	tr:hover {
		background: rgba(255, 255, 255, 0.02);
	}

	.campaign-cell {
		min-width: 300px;
	}

	.campaign-link {
		display: flex;
		flex-direction: column;
		gap: 2px;
		text-decoration: none;
	}

	.campaign-name {
		font-weight: 600;
		color: var(--text-primary);
	}

	.campaign-subject {
		color: var(--text-muted);
		font-size: 0.8rem;
	}

	.status-badge {
		display: inline-block;
		padding: 2px 8px;
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		border-radius: var(--radius-full);
		background: color-mix(in srgb, var(--status-color) 15%, transparent);
		color: var(--status-color);
	}

	.date-cell {
		white-space: nowrap;
	}

	.actions-cell {
		width: 120px;
	}

	.row-actions {
		display: flex;
		gap: var(--space-1);
	}

	.action-btn {
		padding: var(--space-1);
		background: transparent;
		border: none;
		color: var(--text-muted);
		cursor: pointer;
		border-radius: var(--radius-sm);
		transition: all 0.15s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.action-btn:hover {
		background: rgba(255, 255, 255, 0.05);
		color: var(--text-primary);
	}

	.action-btn.delete:hover {
		background: rgba(239, 68, 68, 0.1);
		color: #ef4444;
	}

	/* Empty State */
	.empty-state {
		text-align: center;
		padding: var(--space-10);
		color: var(--text-muted);
	}

	.empty-state svg {
		margin-bottom: var(--space-4);
		opacity: 0.5;
	}

	.empty-state h3 {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.empty-state p {
		margin-bottom: var(--space-4);
	}

	@media (max-width: 768px) {
		.filters {
			flex-direction: column;
			align-items: stretch;
		}

		.search-box {
			width: 100%;
		}

		.search-box input {
			width: 100%;
		}
	}
</style>
