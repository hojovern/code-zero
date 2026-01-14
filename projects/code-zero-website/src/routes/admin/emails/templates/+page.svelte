<script lang="ts">
	// Placeholder for templates page
</script>

<svelte:head>
	<title>Templates | Email Marketing | code:zero Admin</title>
</svelte:head>

<header class="page-header">
	<div class="header-title">
		<h1>Email Templates</h1>
		<p class="header-subtitle">Reusable email designs and layouts</p>
	</div>
	<div class="header-actions">
		<a href="/admin/emails/templates/new" class="btn btn-primary">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<line x1="12" y1="5" x2="12" y2="19"/>
				<line x1="5" y1="12" x2="19" y2="12"/>
			</svg>
			New Template
		</a>
	</div>
</header>

<div class="templates-grid">
	<div class="template-card default">
		<div class="template-preview">
			<div class="preview-header"></div>
			<div class="preview-content">
				<div class="preview-line"></div>
				<div class="preview-line short"></div>
				<div class="preview-button"></div>
			</div>
		</div>
		<div class="template-info">
			<h3>Default Template</h3>
			<p>Clean, minimal design with CTA button</p>
			<span class="template-badge">Built-in</span>
		</div>
	</div>

	<div class="template-card add-new">
		<a href="/admin/emails/templates/new" class="add-template-link">
			<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<line x1="12" y1="5" x2="12" y2="19"/>
				<line x1="5" y1="12" x2="19" y2="12"/>
			</svg>
			<span>Create Custom Template</span>
		</a>
	</div>
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

	.templates-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-4);
	}

	.template-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		overflow: hidden;
		transition: all 0.2s ease;
	}

	.template-card:hover {
		border-color: var(--color-primary);
		transform: translateY(-2px);
	}

	.template-preview {
		height: 180px;
		background: #f5f5f5;
		padding: var(--space-4);
	}

	.preview-header {
		height: 24px;
		background: white;
		border-radius: var(--radius-sm);
		margin-bottom: var(--space-3);
	}

	.preview-content {
		background: white;
		padding: var(--space-4);
		border-radius: var(--radius-sm);
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.preview-line {
		height: 8px;
		background: #e5e5e5;
		border-radius: 4px;
	}

	.preview-line.short {
		width: 60%;
	}

	.preview-button {
		width: 80px;
		height: 24px;
		background: var(--color-primary);
		border-radius: 4px;
		margin-top: var(--space-2);
	}

	.template-info {
		padding: var(--space-4);
	}

	.template-info h3 {
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 4px;
	}

	.template-info p {
		font-size: 0.8rem;
		color: var(--text-muted);
		margin-bottom: var(--space-2);
	}

	.template-badge {
		display: inline-block;
		font-size: 0.65rem;
		font-weight: 600;
		padding: 2px 6px;
		background: rgba(4, 164, 89, 0.1);
		color: var(--color-primary);
		border-radius: var(--radius-full);
		text-transform: uppercase;
	}

	.template-card.add-new {
		border-style: dashed;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 260px;
	}

	.add-template-link {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-3);
		text-decoration: none;
		color: var(--text-muted);
		padding: var(--space-4);
	}

	.add-template-link:hover {
		color: var(--color-primary);
	}

	.add-template-link span {
		font-size: 0.875rem;
		font-weight: 500;
	}

	@media (max-width: 1024px) {
		.templates-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 640px) {
		.templates-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
