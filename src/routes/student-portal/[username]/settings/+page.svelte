<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<svelte:head>
	<title>Settings | code:zero</title>
</svelte:head>

<div class="settings">
	<header class="settings-header">
		<h1>⚙️ Settings</h1>
		<p>Manage your profile and account settings</p>
	</header>

	<!-- Success/Error Messages -->
	{#if form?.success}
		<div class="alert alert-success">
			<span>✅</span> {form.message}
		</div>
	{/if}
	{#if form?.error}
		<div class="alert alert-error">
			<span>⚠️</span> {form.error}
		</div>
	{/if}

	<!-- Profile Section -->
	<section class="settings-section">
		<div class="section-header">
			<h2>👤 Profile</h2>
			<p>Update your display name and username</p>
		</div>

		<form method="POST" action="?/updateProfile" use:enhance class="settings-form">
			<div class="form-group">
				<label for="username">
					<span class="label-icon">@</span>
					Username
				</label>
				<input
					type="text"
					id="username"
					name="username"
					value={data.user.username}
					placeholder="your_username"
					pattern="[a-zA-Z0-9_]{'{'}3,20{'}'}"
					required
				/>
				<span class="form-hint">3-20 characters. Letters, numbers, and underscores only.</span>
			</div>

			<div class="form-group">
				<label for="name">
					<span class="label-icon">📝</span>
					Display Name
				</label>
				<input
					type="text"
					id="name"
					name="name"
					value={data.user.name || ''}
					placeholder="Your Name"
				/>
				<span class="form-hint">Optional. How you want to be called.</span>
			</div>

			<div class="form-group">
				<label>
					<span class="label-icon">📧</span>
					Email
				</label>
				<input
					type="email"
					value={data.user.email}
					disabled
					class="input-disabled"
				/>
				<span class="form-hint">Email cannot be changed. Contact admin if needed.</span>
			</div>

			<button type="submit" class="btn btn-primary">
				💾 Save Profile
			</button>
		</form>
	</section>

	<!-- Password Section -->
	<section class="settings-section">
		<div class="section-header">
			<h2>🔒 Change Password</h2>
			<p>Update your account password</p>
		</div>

		<form method="POST" action="?/changePassword" use:enhance class="settings-form">
			<div class="form-group">
				<label for="newPassword">
					<span class="label-icon">🔑</span>
					New Password
				</label>
				<input
					type="password"
					id="newPassword"
					name="newPassword"
					placeholder="Enter new password"
					minlength="8"
					required
				/>
				<span class="form-hint">Minimum 8 characters.</span>
			</div>

			<div class="form-group">
				<label for="confirmPassword">
					<span class="label-icon">🔑</span>
					Confirm Password
				</label>
				<input
					type="password"
					id="confirmPassword"
					name="confirmPassword"
					placeholder="Confirm new password"
					minlength="8"
					required
				/>
			</div>

			<button type="submit" class="btn btn-secondary">
				🔐 Change Password
			</button>
		</form>
	</section>

	<!-- Account Info -->
	<section class="settings-section">
		<div class="section-header">
			<h2>📊 Account Info</h2>
			<p>Your current stats and level</p>
		</div>

		<div class="account-stats">
			<div class="stat-item">
				<span class="stat-icon">⚡</span>
				<div class="stat-info">
					<span class="stat-value">{data.user.xpTotal} XP</span>
					<span class="stat-label">Total Experience</span>
				</div>
			</div>
			<div class="stat-item">
				<span class="stat-icon">🎯</span>
				<div class="stat-info">
					<span class="stat-value">Level {data.user.level}</span>
					<span class="stat-label">Current Level</span>
				</div>
			</div>
			<div class="stat-item">
				<span class="stat-icon">🏆</span>
				<div class="stat-info">
					<span class="stat-value">{data.achievements.length}</span>
					<span class="stat-label">Achievements</span>
				</div>
			</div>
			<div class="stat-item">
				<span class="stat-icon">📚</span>
				<div class="stat-info">
					<span class="stat-value">{data.enrollments.length}</span>
					<span class="stat-label">Enrolled Courses</span>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	.settings {
		max-width: 700px;
	}

	/* Header */
	.settings-header {
		margin-bottom: var(--space-8);
	}

	.settings-header h1 {
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.settings-header p {
		color: var(--text-secondary);
	}

	/* Alerts */
	.alert {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-4);
		border-radius: var(--radius-lg);
		margin-bottom: var(--space-6);
		font-weight: 500;
	}

	.alert-success {
		background: rgba(4, 164, 89, 0.1);
		border: 1px solid rgba(4, 164, 89, 0.3);
		color: var(--color-primary);
	}

	.alert-error {
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.3);
		color: #ef4444;
	}

	/* Section */
	.settings-section {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl);
		padding: var(--space-6);
		margin-bottom: var(--space-6);
	}

	.section-header {
		margin-bottom: var(--space-6);
		padding-bottom: var(--space-4);
		border-bottom: 1px solid var(--border-subtle);
	}

	.section-header h2 {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-1);
	}

	.section-header p {
		font-size: 0.875rem;
		color: var(--text-muted);
	}

	/* Form */
	.settings-form {
		display: flex;
		flex-direction: column;
		gap: var(--space-5);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.form-group label {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-primary);
	}

	.label-icon {
		font-size: 1rem;
	}

	.form-group input {
		padding: var(--space-3) var(--space-4);
		background: var(--bg-base);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		color: var(--text-primary);
		font-size: 1rem;
		transition: all 0.15s ease;
	}

	.form-group input::placeholder {
		color: var(--text-muted);
	}

	.form-group input:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px rgba(4, 164, 89, 0.1);
	}

	.input-disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.form-hint {
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	/* Buttons */
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-6);
		font-size: 0.9375rem;
		font-weight: 600;
		border-radius: var(--radius-md);
		border: none;
		cursor: pointer;
		transition: all 0.15s ease;
		align-self: flex-start;
	}

	.btn-primary {
		background: var(--color-primary);
		color: white;
	}

	.btn-primary:hover {
		background: var(--color-primary-light);
		transform: translateY(-1px);
	}

	.btn-secondary {
		background: var(--bg-surface);
		color: var(--text-primary);
		border: 1px solid var(--border-subtle);
	}

	.btn-secondary:hover {
		background: var(--bg-base);
		border-color: var(--color-primary);
	}

	/* Account Stats */
	.account-stats {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-4);
	}

	.stat-item {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-4);
		background: var(--bg-surface);
		border-radius: var(--radius-lg);
	}

	.stat-item .stat-icon {
		font-size: 1.5rem;
	}

	.stat-info {
		display: flex;
		flex-direction: column;
	}

	.stat-info .stat-value {
		font-weight: 600;
		color: var(--text-primary);
	}

	.stat-info .stat-label {
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	@media (max-width: 500px) {
		.account-stats {
			grid-template-columns: 1fr;
		}
	}
</style>
