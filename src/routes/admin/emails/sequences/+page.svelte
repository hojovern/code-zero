<script lang="ts">
	// Placeholder for sequences page
</script>

<svelte:head>
	<title>Sequences | Email Marketing | code:zero Admin</title>
</svelte:head>

<header class="page-header">
	<div class="header-title">
		<h1>Email Sequences</h1>
		<p class="header-subtitle">Automate drip campaigns and onboarding flows</p>
	</div>
	<div class="header-actions">
		<a href="/admin/emails/sequences/new" class="btn btn-primary">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<line x1="12" y1="5" x2="12" y2="19"/>
				<line x1="5" y1="12" x2="19" y2="12"/>
			</svg>
			New Sequence
		</a>
	</div>
</header>

<div class="coming-soon">
	<div class="coming-soon-icon">
		<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
			<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
		</svg>
	</div>
	<h2>Sequences Coming Soon</h2>
	<p>Build automated email sequences triggered by user actions like enrollment, inactivity, or course completion.</p>
	<div class="features-preview">
		<div class="feature">
			<span class="feature-icon">1</span>
			<span>Define trigger events</span>
		</div>
		<div class="feature">
			<span class="feature-icon">2</span>
			<span>Add email steps with delays</span>
		</div>
		<div class="feature">
			<span class="feature-icon">3</span>
			<span>Track completion rates</span>
		</div>
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

	.coming-soon {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-10);
		text-align: center;
	}

	.coming-soon-icon {
		width: 80px;
		height: 80px;
		margin: 0 auto var(--space-4);
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(6, 182, 212, 0.1);
		border-radius: var(--radius-lg);
		color: #06b6d4;
	}

	.coming-soon h2 {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.coming-soon p {
		color: var(--text-muted);
		max-width: 500px;
		margin: 0 auto var(--space-6);
	}

	.features-preview {
		display: flex;
		justify-content: center;
		gap: var(--space-4);
	}

	.feature {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-4);
		background: var(--bg-base);
		border-radius: var(--radius-md);
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.feature-icon {
		width: 24px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-primary);
		color: white;
		border-radius: 50%;
		font-size: 0.75rem;
		font-weight: 600;
	}

	@media (max-width: 768px) {
		.features-preview {
			flex-direction: column;
		}
	}
</style>
