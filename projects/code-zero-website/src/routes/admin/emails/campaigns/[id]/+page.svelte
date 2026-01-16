<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let name = $state(data.campaign.name);
	let subject = $state(data.campaign.subject);
	let previewText = $state(data.campaign.previewText || '');
	let htmlContent = $state(data.campaign.htmlContent);
	let textContent = $state(data.campaign.textContent || '');

	$effect(() => {
		name = data.campaign.name;
		subject = data.campaign.subject;
		previewText = data.campaign.previewText || '';
		htmlContent = data.campaign.htmlContent;
		textContent = data.campaign.textContent || '';
	});
	let previewMode = $state<'desktop' | 'mobile'>('desktop');
	let showScheduleModal = $state(false);
	let scheduledAt = $state('');

	const isSent = $derived(data.campaign.status === 'sent');
	const isSending = $derived(data.campaign.status === 'sending');
	const isScheduled = $derived(data.campaign.status === 'scheduled');
	const canEdit = $derived(!isSent && !isSending);

	const subjectLength = $derived(subject.length);
	const previewTextLength = $derived(previewText.length);

	function formatDate(date: Date | null): string {
		if (!date) return '-';
		return new Intl.DateTimeFormat('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
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
			case 'draft': return '#6b7280';
			case 'review': return '#f59e0b';
			case 'scheduled': return '#3b82f6';
			case 'sending': return '#8b5cf6';
			case 'sent': return '#04A459';
			case 'paused': return '#ef4444';
			default: return '#6b7280';
		}
	}
</script>

<svelte:head>
	<title>{data.campaign.name} | Campaigns | code:zero Admin</title>
</svelte:head>

<header class="page-header">
	<a href="/admin/emails/campaigns" class="back-link">
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<polyline points="15 18 9 12 15 6"/>
		</svg>
		Back to Campaigns
	</a>
	<div class="header-row">
		<div class="header-info">
			<h1>{data.campaign.name}</h1>
			<span class="status-badge" style="--status-color: {getStatusColor(data.campaign.status || 'draft')}">
				{data.campaign.status}
			</span>
		</div>
		{#if canEdit}
			<div class="header-actions">
				{#if data.canSend}
					<button class="btn btn-secondary" onclick={() => (showScheduleModal = true)}>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
							<line x1="16" y1="2" x2="16" y2="6"/>
							<line x1="8" y1="2" x2="8" y2="6"/>
							<line x1="3" y1="10" x2="21" y2="10"/>
						</svg>
						Schedule
					</button>
					<form method="POST" action="?/send" use:enhance>
						<button type="submit" class="btn btn-primary">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<line x1="22" y1="2" x2="11" y2="13"/>
								<polygon points="22 2 15 22 11 13 2 9 22 2"/>
							</svg>
							Send Now
						</button>
					</form>
				{/if}
			</div>
		{/if}
	</div>
</header>

{#if form?.message}
	<div class="alert" class:success={form.success} class:error={!form.success}>
		{form.message}
	</div>
{/if}

{#if isSent && data.metrics}
	<!-- Analytics for sent campaigns -->
	<section class="metrics-section">
		<h2>Performance</h2>
		<div class="metrics-grid">
			<div class="metric-card">
				<div class="metric-value">{data.metrics.sent}</div>
				<div class="metric-label">Sent</div>
			</div>
			<div class="metric-card">
				<div class="metric-value">{formatPercent(data.metrics.openRate)}</div>
				<div class="metric-label">Open Rate</div>
			</div>
			<div class="metric-card">
				<div class="metric-value">{formatPercent(data.metrics.clickRate)}</div>
				<div class="metric-label">Click Rate</div>
			</div>
			<div class="metric-card">
				<div class="metric-value">{formatPercent(data.metrics.bounceRate)}</div>
				<div class="metric-label">Bounce Rate</div>
			</div>
		</div>
	</section>
{/if}

<form method="POST" action="?/save" use:enhance class="campaign-form">
	<div class="form-layout">
		<!-- Editor Column -->
		<div class="editor-column">
			<div class="form-section">
				<h3>Campaign Details</h3>
				<div class="form-group">
					<label for="name">Campaign Name</label>
					<input type="text" id="name" name="name" bind:value={name} required disabled={!canEdit} />
				</div>
			</div>

			<div class="form-section">
				<h3>Email Content</h3>
				<div class="form-group">
					<label for="subject">
						Subject Line
						<span class="char-count" class:warning={subjectLength > 50}>{subjectLength}/50</span>
					</label>
					<input type="text" id="subject" name="subject" bind:value={subject} required disabled={!canEdit} />
				</div>

				<div class="form-group">
					<label for="previewText">
						Preview Text
						<span class="char-count" class:warning={previewTextLength > 90}>{previewTextLength}/90</span>
					</label>
					<input type="text" id="previewText" name="previewText" bind:value={previewText} disabled={!canEdit} />
				</div>

				<div class="form-group">
					<label for="htmlContent">HTML Content</label>
					<textarea id="htmlContent" name="htmlContent" bind:value={htmlContent} rows="15" required disabled={!canEdit}></textarea>
				</div>

				<div class="form-group">
					<label for="textContent">Plain Text (optional)</label>
					<textarea id="textContent" name="textContent" bind:value={textContent} rows="6" disabled={!canEdit}></textarea>
				</div>
			</div>

			{#if canEdit}
				<div class="form-actions-inline">
					<button type="submit" class="btn btn-primary">Save Changes</button>
				</div>
			{/if}
		</div>

		<!-- Preview Column -->
		<div class="preview-column">
			<div class="preview-header">
				<h3>Preview</h3>
				<div class="preview-toggle">
					<button type="button" class:active={previewMode === 'desktop'} onclick={() => (previewMode = 'desktop')}>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
							<line x1="8" y1="21" x2="16" y2="21"/>
							<line x1="12" y1="17" x2="12" y2="21"/>
						</svg>
					</button>
					<button type="button" class:active={previewMode === 'mobile'} onclick={() => (previewMode = 'mobile')}>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
							<line x1="12" y1="18" x2="12.01" y2="18"/>
						</svg>
					</button>
				</div>
			</div>
			<div class="preview-frame" class:mobile={previewMode === 'mobile'}>
				<div class="preview-email-header">
					<div class="preview-from">From: code:zero</div>
					<div class="preview-subject">{subject || 'Subject line'}</div>
					<div class="preview-preheader">{previewText || 'Preview text'}</div>
				</div>
				<div class="preview-content">
					{@html htmlContent}
				</div>
			</div>

			{#if data.campaign.sentAt || data.campaign.scheduledAt}
				<div class="campaign-info-card">
					{#if data.campaign.sentAt}
						<div class="info-row">
							<span class="info-label">Sent</span>
							<span class="info-value">{formatDate(data.campaign.sentAt)}</span>
						</div>
					{/if}
					{#if data.campaign.scheduledAt && !data.campaign.sentAt}
						<div class="info-row">
							<span class="info-label">Scheduled</span>
							<span class="info-value">{formatDate(data.campaign.scheduledAt)}</span>
						</div>
					{/if}
					<div class="info-row">
						<span class="info-label">Recipients</span>
						<span class="info-value">{data.campaign.recipientCount || 0}</span>
					</div>
				</div>
			{/if}
		</div>
	</div>
</form>

<!-- Schedule Modal -->
{#if showScheduleModal}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="modal-overlay" onclick={() => (showScheduleModal = false)}>
		<div class="modal" onclick={(e) => e.stopPropagation()}>
			<h3>Schedule Campaign</h3>
			<form method="POST" action="?/schedule" use:enhance>
				<div class="form-group">
					<label for="scheduledAt">Send Date & Time</label>
					<input
						type="datetime-local"
						id="scheduledAt"
						name="scheduledAt"
						bind:value={scheduledAt}
						required
					/>
				</div>
				<div class="modal-actions">
					<button type="button" class="btn btn-secondary" onclick={() => (showScheduleModal = false)}>
						Cancel
					</button>
					<button type="submit" class="btn btn-primary">Schedule</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	.page-header {
		margin-bottom: var(--space-6);
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: var(--space-1);
		color: var(--text-muted);
		text-decoration: none;
		font-size: 0.875rem;
		margin-bottom: var(--space-2);
	}

	.back-link:hover {
		color: var(--color-primary);
	}

	.header-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.header-info {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.header-info h1 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
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

	.header-actions {
		display: flex;
		gap: var(--space-3);
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

	/* Metrics */
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
		padding: var(--space-4);
		text-align: center;
	}

	.metric-value {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.metric-label {
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	/* Form Layout */
	.form-layout {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-6);
	}

	.editor-column {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}

	.form-section {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-5);
	}

	.form-section h3 {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-4);
	}

	.form-group {
		margin-bottom: var(--space-4);
	}

	.form-group:last-child {
		margin-bottom: 0;
	}

	.form-group label {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-secondary);
		margin-bottom: var(--space-2);
	}

	.char-count {
		font-size: 0.75rem;
		font-weight: normal;
		color: var(--text-muted);
	}

	.char-count.warning {
		color: #f59e0b;
	}

	.form-group input,
	.form-group textarea {
		width: 100%;
		padding: var(--space-3);
		background: var(--bg-base);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		font-size: 0.875rem;
		color: var(--text-primary);
		font-family: inherit;
	}

	.form-group textarea {
		resize: vertical;
		font-family: 'Monaco', 'Menlo', monospace;
		font-size: 0.8rem;
	}

	.form-group input:disabled,
	.form-group textarea:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.form-actions-inline {
		display: flex;
		justify-content: flex-end;
	}

	/* Preview Column */
	.preview-column {
		position: sticky;
		top: var(--space-4);
		height: fit-content;
	}

	.preview-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-3);
	}

	.preview-header h3 {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.preview-toggle {
		display: flex;
		gap: 2px;
		padding: 2px;
		background: var(--bg-elevated);
		border-radius: var(--radius-md);
		border: 1px solid var(--border-subtle);
	}

	.preview-toggle button {
		padding: var(--space-2);
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

	.preview-toggle button.active {
		background: var(--bg-base);
		color: var(--color-primary);
	}

	.preview-frame {
		background: #f5f5f5;
		border-radius: var(--radius-lg);
		overflow: hidden;
		transition: all 0.3s ease;
		margin-bottom: var(--space-4);
	}

	.preview-frame.mobile {
		max-width: 375px;
		margin: 0 auto var(--space-4);
	}

	.preview-email-header {
		background: white;
		padding: var(--space-4);
		border-bottom: 1px solid #e5e5e5;
	}

	.preview-from {
		font-size: 0.75rem;
		color: #666;
		margin-bottom: 4px;
	}

	.preview-subject {
		font-size: 0.875rem;
		font-weight: 600;
		color: #1a1a1a;
		margin-bottom: 2px;
	}

	.preview-preheader {
		font-size: 0.8rem;
		color: #999;
	}

	.preview-content {
		background: white;
		padding: var(--space-6);
		font-size: 0.875rem;
		color: #1a1a1a;
		line-height: 1.6;
	}

	.campaign-info-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-4);
	}

	.info-row {
		display: flex;
		justify-content: space-between;
		padding: var(--space-2) 0;
		border-bottom: 1px solid var(--border-subtle);
	}

	.info-row:last-child {
		border-bottom: none;
	}

	.info-label {
		color: var(--text-muted);
		font-size: 0.875rem;
	}

	.info-value {
		color: var(--text-primary);
		font-size: 0.875rem;
		font-weight: 500;
	}

	/* Modal */
	.modal-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.modal {
		background: var(--bg-elevated);
		border-radius: var(--radius-lg);
		padding: var(--space-6);
		width: 400px;
		max-width: 90vw;
	}

	.modal h3 {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-4);
	}

	.modal-actions {
		display: flex;
		justify-content: flex-end;
		gap: var(--space-3);
		margin-top: var(--space-4);
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

	@media (max-width: 1024px) {
		.form-layout {
			grid-template-columns: 1fr;
		}

		.preview-column {
			position: static;
		}

		.metrics-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 640px) {
		.header-row {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-3);
		}

		.header-actions {
			width: 100%;
			flex-direction: column;
		}

		.header-actions .btn,
		.header-actions form {
			width: 100%;
		}

		.header-actions form .btn {
			width: 100%;
			justify-content: center;
		}
	}
</style>
