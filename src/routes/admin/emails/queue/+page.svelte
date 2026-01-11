<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	function formatDate(date: Date | null): string {
		if (!date) return '-';
		return new Intl.DateTimeFormat('en-US', {
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		}).format(new Date(date));
	}
</script>

<svelte:head>
	<title>Email Queue | code:zero Admin</title>
</svelte:head>

<header class="page-header">
	<div class="header-title">
		<h1>Email Queue</h1>
		<p class="header-subtitle">Manage scheduled and pending emails</p>
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

{#if form?.message}
	<div class="alert" class:success={form.success} class:error={!form.success}>
		{form.message}
	</div>
{/if}

<!-- AI Review Queue Section -->
{#if data.aiReviewQueue && data.aiReviewQueue.length > 0}
	<section class="queue-section ai-review">
		<div class="section-header">
			<div class="section-title">
				<span class="section-icon ai">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/>
						<path d="M12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z"/>
						<circle cx="12" cy="10" r="1"/>
					</svg>
				</span>
				<h2>AI Review Queue</h2>
				<span class="ai-badge">Powered by AI</span>
				<span class="count">{data.aiReviewQueue.length}</span>
			</div>
		</div>

		<div class="ai-queue-list">
			{#each data.aiReviewQueue as item}
				{@const targetSegment = item.brief.targetSegment as Record<string, unknown> || {}}
				<div class="ai-queue-item">
					<div class="ai-item-header">
						<div class="ai-item-title">
							<span class="ai-icon">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/>
								</svg>
							</span>
							<span class="item-name">{item.campaign?.name || 'AI Generated Campaign'}</span>
						</div>
						<div class="confidence-badge" class:high={item.brief.aiConfidence && item.brief.aiConfidence >= 80} class:medium={item.brief.aiConfidence && item.brief.aiConfidence >= 60 && item.brief.aiConfidence < 80} class:low={item.brief.aiConfidence && item.brief.aiConfidence < 60}>
							Confidence: {item.brief.aiConfidence || 0}%
						</div>
					</div>

					<div class="ai-item-details">
						<div class="detail-row">
							<span class="detail-label">Type:</span>
							<span class="detail-value">{item.brief.campaignType.replace('_', ' ')}</span>
							<span class="detail-separator">|</span>
							<span class="detail-label">Trigger:</span>
							<span class="detail-value">{item.brief.triggerType}</span>
						</div>

						{#if item.campaign}
							<div class="subject-preview">
								<span class="detail-label">Subject:</span>
								<span class="subject-text">"{item.campaign.subject}"</span>
							</div>
						{/if}

						{#if item.brief.aiReasoning}
							<div class="ai-reasoning">
								<span class="reasoning-label">AI Reasoning:</span>
								<p class="reasoning-text">"{item.brief.aiReasoning}"</p>
							</div>
						{/if}
					</div>

					<div class="ai-item-actions">
						{#if item.campaign}
							<a href="/admin/emails/campaigns/{item.campaign.id}" class="btn btn-sm btn-secondary">
								Preview
							</a>
							<a href="/admin/emails/campaigns/{item.campaign.id}" class="btn btn-sm btn-secondary">
								Edit
							</a>
						{/if}
						{#if data.canSend}
							<form method="POST" action="?/approveBrief" use:enhance>
								<input type="hidden" name="briefId" value={item.brief.id} />
								<button type="submit" class="btn btn-sm btn-success">
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<polyline points="20 6 9 17 4 12"/>
									</svg>
									Approve
								</button>
							</form>
						{/if}
						<form method="POST" action="?/rejectBrief" use:enhance>
							<input type="hidden" name="briefId" value={item.brief.id} />
							<button type="submit" class="btn btn-sm btn-danger">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<line x1="18" y1="6" x2="6" y2="18"/>
									<line x1="6" y1="6" x2="18" y2="18"/>
								</svg>
								Reject
							</button>
						</form>
					</div>
				</div>
			{/each}
		</div>
	</section>
{/if}

<!-- Drafts Section -->
<section class="queue-section">
	<div class="section-header">
		<div class="section-title">
			<span class="section-icon draft">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
					<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
				</svg>
			</span>
			<h2>Drafts</h2>
			<span class="count">{data.queue.drafts.length}</span>
		</div>
	</div>

	{#if data.queue.drafts.length === 0}
		<div class="empty-state">
			<p>No drafts in queue</p>
		</div>
	{:else}
		<div class="queue-list">
			{#each data.queue.drafts as item}
				<div class="queue-item">
					<div class="item-info">
						<a href="/admin/emails/campaigns/{item.id}" class="item-name">{item.name}</a>
						<span class="item-subject">{item.subject}</span>
						<span class="item-meta">
							{item.type} • Created {formatDate(item.createdAt)}
						</span>
					</div>
					<div class="item-actions">
						<a href="/admin/emails/campaigns/{item.id}" class="btn btn-sm btn-secondary">
							Preview
						</a>
						<a href="/admin/emails/campaigns/{item.id}" class="btn btn-sm btn-secondary">
							Edit
						</a>
						{#if data.canSend}
							<form method="POST" action="?/approve" use:enhance>
								<input type="hidden" name="id" value={item.id} />
								<button type="submit" class="btn btn-sm btn-success">
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<polyline points="20 6 9 17 4 12"/>
									</svg>
									Approve
								</button>
							</form>
						{/if}
						<form method="POST" action="?/reject" use:enhance>
							<input type="hidden" name="id" value={item.id} />
							<button type="submit" class="btn btn-sm btn-danger">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<line x1="18" y1="6" x2="6" y2="18"/>
									<line x1="6" y1="6" x2="18" y2="18"/>
								</svg>
							</button>
						</form>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</section>

<!-- Scheduled Section -->
<section class="queue-section">
	<div class="section-header">
		<div class="section-title">
			<span class="section-icon scheduled">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
					<line x1="16" y1="2" x2="16" y2="6"/>
					<line x1="8" y1="2" x2="8" y2="6"/>
					<line x1="3" y1="10" x2="21" y2="10"/>
				</svg>
			</span>
			<h2>Scheduled</h2>
			<span class="count">{data.queue.scheduled.length}</span>
		</div>
	</div>

	{#if data.queue.scheduled.length === 0}
		<div class="empty-state">
			<p>No scheduled campaigns</p>
		</div>
	{:else}
		<div class="queue-list">
			{#each data.queue.scheduled as item}
				<div class="queue-item">
					<div class="item-info">
						<a href="/admin/emails/campaigns/{item.id}" class="item-name">{item.name}</a>
						<span class="item-subject">{item.subject}</span>
						<span class="item-meta">
							<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<circle cx="12" cy="12" r="10"/>
								<polyline points="12 6 12 12 16 14"/>
							</svg>
							{formatDate(item.scheduledAt)} • {item.recipientCount} recipients
						</span>
					</div>
					<div class="item-actions">
						<a href="/admin/emails/campaigns/{item.id}" class="btn btn-sm btn-secondary">
							Edit Time
						</a>
						<form method="POST" action="?/pause" use:enhance>
							<input type="hidden" name="id" value={item.id} />
							<button type="submit" class="btn btn-sm btn-secondary">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<rect x="6" y="4" width="4" height="16"/>
									<rect x="14" y="4" width="4" height="16"/>
								</svg>
								Pause
							</button>
						</form>
						{#if data.canSend}
							<form method="POST" action="?/send" use:enhance>
								<input type="hidden" name="id" value={item.id} />
								<button type="submit" class="btn btn-sm btn-primary">
									Send Now
								</button>
							</form>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</section>

<!-- Sending Section -->
{#if data.queue.sending.length > 0}
	<section class="queue-section">
		<div class="section-header">
			<div class="section-title">
				<span class="section-icon sending">
					<svg class="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="12" cy="12" r="10"/>
					</svg>
				</span>
				<h2>Sending</h2>
				<span class="count">{data.queue.sending.length}</span>
			</div>
		</div>

		<div class="queue-list">
			{#each data.queue.sending as item}
				<div class="queue-item sending">
					<div class="item-info">
						<span class="item-name">{item.name}</span>
						<span class="item-subject">{item.subject}</span>
						<span class="item-meta">
							Sending to {item.recipientCount} recipients...
						</span>
					</div>
					<div class="progress-bar">
						<div class="progress-fill"></div>
					</div>
				</div>
			{/each}
		</div>
	</section>
{/if}

<!-- Sent Today Section -->
<section class="queue-section">
	<div class="section-header">
		<div class="section-title">
			<span class="section-icon sent">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<polyline points="20 6 9 17 4 12"/>
				</svg>
			</span>
			<h2>Sent Today</h2>
			<span class="count">{data.queue.sent.length}</span>
		</div>
	</div>

	{#if data.queue.sent.length === 0}
		<div class="empty-state">
			<p>No emails sent today</p>
		</div>
	{:else}
		<div class="queue-list">
			{#each data.queue.sent as item}
				<div class="queue-item">
					<div class="item-info">
						<a href="/admin/emails/campaigns/{item.id}" class="item-name">{item.name}</a>
						<span class="item-subject">{item.subject}</span>
						<span class="item-meta">
							Sent {formatDate(item.scheduledAt)} • {item.recipientCount} recipients
						</span>
					</div>
					<div class="item-actions">
						<a href="/admin/emails/campaigns/{item.id}" class="btn btn-sm btn-secondary">
							View Analytics
						</a>
					</div>
				</div>
			{/each}
		</div>
	{/if}
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

	.alert {
		padding: var(--space-3) var(--space-4);
		border-radius: var(--radius-md);
		margin-bottom: var(--space-4);
		font-size: 0.875rem;
	}

	.alert.success {
		background: rgba(4, 164, 89, 0.1);
		color: var(--color-primary);
	}

	.alert.error {
		background: rgba(239, 68, 68, 0.1);
		color: #ef4444;
	}

	/* Queue Section */
	.queue-section {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		margin-bottom: var(--space-4);
		overflow: hidden;
	}

	.section-header {
		padding: var(--space-4);
		border-bottom: 1px solid var(--border-subtle);
		background: var(--bg-base);
	}

	.section-title {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.section-title h2 {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.section-icon {
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-md);
	}

	.section-icon.draft {
		background: rgba(107, 114, 128, 0.15);
		color: #6b7280;
	}

	.section-icon.scheduled {
		background: rgba(59, 130, 246, 0.15);
		color: #3b82f6;
	}

	.section-icon.sending {
		background: rgba(139, 92, 246, 0.15);
		color: #8b5cf6;
	}

	.section-icon.sent {
		background: rgba(4, 164, 89, 0.15);
		color: var(--color-primary);
	}

	.section-icon.ai {
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%);
		color: #8b5cf6;
	}

	.ai-badge {
		font-size: 0.65rem;
		font-weight: 600;
		padding: 2px 8px;
		background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
		color: white;
		border-radius: var(--radius-full);
		text-transform: uppercase;
		margin-left: var(--space-2);
	}

	/* AI Review Section */
	.queue-section.ai-review {
		border: 1px solid rgba(139, 92, 246, 0.3);
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%);
	}

	.ai-queue-list {
		display: flex;
		flex-direction: column;
	}

	.ai-queue-item {
		padding: 20px;
		border-bottom: 1px solid var(--border-subtle);
	}

	.ai-queue-item:last-child {
		border-bottom: none;
	}

	.ai-item-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 12px;
	}

	.ai-item-title {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.ai-icon {
		width: 24px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%);
		border-radius: var(--radius-md);
		color: #8b5cf6;
	}

	.confidence-badge {
		font-size: 0.75rem;
		font-weight: 600;
		padding: 4px 10px;
		border-radius: var(--radius-full);
	}

	.confidence-badge.high {
		background: rgba(4, 164, 89, 0.15);
		color: var(--color-primary);
	}

	.confidence-badge.medium {
		background: rgba(234, 179, 8, 0.15);
		color: #ca8a04;
	}

	.confidence-badge.low {
		background: rgba(239, 68, 68, 0.15);
		color: #ef4444;
	}

	.ai-item-details {
		margin-bottom: 16px;
		padding-left: 32px;
	}

	.detail-row {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 0.8rem;
		color: var(--text-secondary);
		margin-bottom: 8px;
	}

	.detail-label {
		color: var(--text-muted);
	}

	.detail-value {
		color: var(--text-primary);
		text-transform: capitalize;
	}

	.detail-separator {
		color: var(--border-subtle);
	}

	.subject-preview {
		display: flex;
		align-items: flex-start;
		gap: 8px;
		font-size: 0.85rem;
		margin-bottom: 12px;
	}

	.subject-text {
		color: var(--text-primary);
		font-style: italic;
	}

	.ai-reasoning {
		background: var(--bg-base);
		border-radius: var(--radius-md);
		padding: 12px;
		margin-top: 8px;
	}

	.reasoning-label {
		font-size: 0.75rem;
		font-weight: 600;
		color: #8b5cf6;
		display: block;
		margin-bottom: 4px;
	}

	.reasoning-text {
		font-size: 0.8rem;
		color: var(--text-secondary);
		margin: 0;
		line-height: 1.5;
		font-style: italic;
	}

	.ai-item-actions {
		display: flex;
		gap: 8px;
		padding-left: 32px;
	}

	.count {
		background: var(--bg-elevated);
		color: var(--text-muted);
		font-size: 0.75rem;
		font-weight: 600;
		padding: 2px 8px;
		border-radius: var(--radius-full);
	}

	.empty-state {
		padding: var(--space-6);
		text-align: center;
		color: var(--text-muted);
		font-size: 0.875rem;
	}

	/* Queue List */
	.queue-list {
		divide-y: 1px solid var(--border-subtle);
	}

	.queue-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-4);
		border-bottom: 1px solid var(--border-subtle);
	}

	.queue-item:last-child {
		border-bottom: none;
	}

	.queue-item.sending {
		background: rgba(139, 92, 246, 0.05);
	}

	.item-info {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.item-name {
		font-weight: 600;
		color: var(--text-primary);
		font-size: 0.9rem;
		text-decoration: none;
	}

	.item-name:hover {
		color: var(--color-primary);
	}

	.item-subject {
		color: var(--text-secondary);
		font-size: 0.8rem;
	}

	.item-meta {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		color: var(--text-muted);
		font-size: 0.75rem;
		margin-top: 2px;
	}

	.item-actions {
		display: flex;
		gap: var(--space-2);
	}

	/* Buttons */
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

	.btn-sm {
		padding: var(--space-1) var(--space-3);
		font-size: 0.8rem;
	}

	.btn-primary {
		background: var(--color-primary);
		color: white;
	}

	.btn-primary:hover {
		background: var(--color-primary-light);
	}

	.btn-secondary {
		background: var(--bg-base);
		color: var(--text-primary);
		border: 1px solid var(--border-subtle);
	}

	.btn-secondary:hover {
		border-color: var(--color-primary);
	}

	.btn-success {
		background: rgba(4, 164, 89, 0.1);
		color: var(--color-primary);
		border: 1px solid rgba(4, 164, 89, 0.3);
	}

	.btn-success:hover {
		background: rgba(4, 164, 89, 0.2);
	}

	.btn-danger {
		background: rgba(239, 68, 68, 0.1);
		color: #ef4444;
		border: 1px solid rgba(239, 68, 68, 0.3);
	}

	.btn-danger:hover {
		background: rgba(239, 68, 68, 0.2);
	}

	/* Progress Bar */
	.progress-bar {
		width: 100px;
		height: 4px;
		background: var(--bg-base);
		border-radius: var(--radius-full);
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: #8b5cf6;
		border-radius: var(--radius-full);
		animation: progress 2s ease-in-out infinite;
	}

	@keyframes progress {
		0% {
			width: 0%;
		}
		50% {
			width: 70%;
		}
		100% {
			width: 100%;
		}
	}

	.spinner {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	@media (max-width: 768px) {
		.queue-item {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-3);
		}

		.item-actions {
			width: 100%;
			flex-wrap: wrap;
		}
	}
</style>
