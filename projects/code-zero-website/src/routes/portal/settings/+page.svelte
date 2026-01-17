<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="settings-page">
	<header class="page-header">
		<h1>Settings</h1>
		<p>Manage your account preferences.</p>
	</header>

	<!-- Profile Section -->
	<section class="settings-section">
		<h2>Profile</h2>

		<div class="settings-card">
			<div class="profile-row">
				<div class="avatar">
					{#if data.user.avatarUrl}
						<img src={data.user.avatarUrl} alt={data.user.name || data.user.username} />
					{:else}
						<span class="avatar-fallback">
							{(data.user.name || data.user.username).charAt(0).toUpperCase()}
						</span>
					{/if}
				</div>

				<div class="profile-info">
					<span class="profile-name">{data.user.name || data.user.username}</span>
					<span class="profile-email">{data.user.email}</span>
				</div>
			</div>

			<div class="divider"></div>

			<div class="info-grid">
				<div class="info-item">
					<span class="info-label">Username</span>
					<span class="info-value">@{data.user.username}</span>
				</div>
				<div class="info-item">
					<span class="info-label">Level</span>
					<span class="info-value">Level {data.user.level}</span>
				</div>
				<div class="info-item">
					<span class="info-label">Total XP</span>
					<span class="info-value">{data.user.xpTotal.toLocaleString()} XP</span>
				</div>
				<div class="info-item">
					<span class="info-label">Role</span>
					<span class="info-value role-badge">{data.user.role || 'Student'}</span>
				</div>
			</div>
		</div>
	</section>

	<!-- Account Section -->
	<section class="settings-section">
		<h2>Account</h2>

		<div class="settings-card">
			<div class="setting-row">
				<div class="setting-info">
					<span class="setting-label">Email Address</span>
					<span class="setting-value">{data.user.email}</span>
				</div>
				<span class="setting-badge">Verified</span>
			</div>

			<div class="divider"></div>

			<div class="setting-row">
				<div class="setting-info">
					<span class="setting-label">Authentication</span>
					<span class="setting-value">Signed in via Magic Link</span>
				</div>
			</div>
		</div>
	</section>

	<!-- Danger Zone -->
	<section class="settings-section danger">
		<h2>Sign Out</h2>

		<div class="settings-card">
			<div class="setting-row">
				<div class="setting-info">
					<span class="setting-label">End your session</span>
					<span class="setting-value">You can sign back in anytime with your email.</span>
				</div>
				<form method="POST" action="/api/auth/logout">
					<button type="submit" class="btn btn-danger">Sign Out</button>
				</form>
			</div>
		</div>
	</section>
</div>

<style>
	.settings-page {
		max-width: 700px;
		margin: 0 auto;
	}

	.page-header {
		margin-bottom: var(--space-8);
	}

	.page-header h1 {
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.page-header p {
		color: var(--text-secondary);
	}

	/* Sections */
	.settings-section {
		margin-bottom: var(--space-8);
	}

	.settings-section h2 {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-4);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.settings-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-6);
	}

	.divider {
		height: 1px;
		background: var(--border-subtle);
		margin: var(--space-5) 0;
	}

	/* Profile */
	.profile-row {
		display: flex;
		align-items: center;
		gap: var(--space-5);
	}

	.avatar {
		width: 72px;
		height: 72px;
		border-radius: var(--radius-full);
		overflow: hidden;
		background: var(--bg-surface);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.avatar-fallback {
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--color-primary);
	}

	.profile-info {
		display: flex;
		flex-direction: column;
	}

	.profile-name {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.profile-email {
		font-size: 0.875rem;
		color: var(--text-muted);
	}

	/* Info Grid */
	.info-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-4);
	}

	@media (max-width: 480px) {
		.info-grid {
			grid-template-columns: 1fr;
		}
	}

	.info-item {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.info-label {
		font-size: 0.75rem;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.info-value {
		font-size: 0.9375rem;
		color: var(--text-primary);
		font-weight: 500;
	}

	.role-badge {
		text-transform: capitalize;
	}

	/* Setting Rows */
	.setting-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--space-4);
	}

	.setting-info {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.setting-label {
		font-weight: 600;
		color: var(--text-primary);
	}

	.setting-value {
		font-size: 0.875rem;
		color: var(--text-muted);
	}

	.setting-badge {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-primary);
		background: rgba(4, 164, 89, 0.1);
		padding: var(--space-1) var(--space-3);
		border-radius: var(--radius-full);
	}

	/* Buttons */
	.btn-danger {
		background: transparent;
		color: #ef4444;
		border: 1px solid #ef4444;
		padding: var(--space-2) var(--space-4);
		border-radius: var(--radius-md);
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
		transition: all var(--duration-fast) var(--ease-default);
	}

	.btn-danger:hover {
		background: rgba(239, 68, 68, 0.1);
	}

	/* Mobile */
	@media (max-width: 480px) {
		.setting-row {
			flex-direction: column;
			align-items: flex-start;
		}

		.setting-row form {
			width: 100%;
		}

		.btn-danger {
			width: 100%;
		}
	}
</style>
