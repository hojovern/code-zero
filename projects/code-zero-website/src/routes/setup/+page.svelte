<script lang="ts">
	let password = $state('');
	let confirmPassword = $state('');
	let loading = $state(false);
	let result = $state<{ success: boolean; message: string } | null>(null);

	async function createAdmin() {
		if (password.length < 8) {
			result = { success: false, message: 'Password must be at least 8 characters' };
			return;
		}

		if (password !== confirmPassword) {
			result = { success: false, message: 'Passwords do not match' };
			return;
		}

		loading = true;
		result = null;

		try {
			const response = await fetch('/api/setup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ password })
			});

			const data = await response.json();
			result = { success: response.ok, message: data.message || data.error };
		} catch (error) {
			result = { success: false, message: 'Setup failed' };
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Setup | code:zero</title>
</svelte:head>

<div class="setup-page">
	<div class="setup-card">
		<div class="setup-header">
			<span class="logo">code<span class="accent">:zero</span></span>
			<h1>🔧 Admin Setup</h1>
			<p>Create your admin account for <strong>hojovern@gmail.com</strong></p>
		</div>

		{#if result?.success}
			<div class="success-message">
				<span>✅</span> {result.message}
				<a href="/?login=1" class="btn btn-primary">Go to Login</a>
			</div>
		{:else}
			<div class="setup-form">
				<div class="form-group">
					<label for="password">🔒 Password</label>
					<input
						type="password"
						id="password"
						bind:value={password}
						placeholder="Enter a strong password"
						disabled={loading}
					/>
				</div>

				<div class="form-group">
					<label for="confirm">🔒 Confirm Password</label>
					<input
						type="password"
						id="confirm"
						bind:value={confirmPassword}
						placeholder="Confirm your password"
						disabled={loading}
					/>
				</div>

				{#if result && !result.success}
					<div class="error-message">
						<span>⚠️</span> {result.message}
					</div>
				{/if}

				<button
					class="btn btn-primary"
					onclick={createAdmin}
					disabled={loading}
				>
					{loading ? '⏳ Creating...' : '🚀 Create Admin Account'}
				</button>
			</div>
		{/if}
	</div>
</div>

<style>
	.setup-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-6);
		background: var(--bg-base);
	}

	.setup-card {
		width: 100%;
		max-width: 420px;
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl);
		padding: var(--space-10);
	}

	.setup-header {
		text-align: center;
		margin-bottom: var(--space-8);
	}

	.logo {
		font-family: var(--font-heading);
		font-size: 2rem;
		font-weight: 700;
		color: var(--text-primary);
		display: block;
		margin-bottom: var(--space-4);
	}

	.accent {
		color: var(--color-primary);
	}

	.setup-header h1 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.setup-header p {
		color: var(--text-secondary);
		font-size: 0.9375rem;
	}

	.form-group {
		margin-bottom: var(--space-4);
	}

	.form-group label {
		display: block;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-secondary);
		margin-bottom: var(--space-2);
	}

	.form-group input {
		width: 100%;
		padding: var(--space-3) var(--space-4);
		background: var(--bg-base);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		color: var(--text-primary);
		font-size: 1rem;
	}

	.form-group input:focus {
		outline: none;
		border-color: var(--color-primary);
	}

	.form-group input:disabled {
		opacity: 0.6;
	}

	.error-message {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-3);
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.3);
		border-radius: var(--radius-md);
		color: #ef4444;
		font-size: 0.875rem;
		margin-bottom: var(--space-4);
	}

	.success-message {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-4);
		padding: var(--space-6);
		background: rgba(4, 164, 89, 0.1);
		border: 1px solid rgba(4, 164, 89, 0.3);
		border-radius: var(--radius-lg);
		color: var(--color-primary);
		text-align: center;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-6);
		font-size: 1rem;
		font-weight: 600;
		border-radius: var(--radius-md);
		border: none;
		cursor: pointer;
		text-decoration: none;
		transition: all 0.15s ease;
	}

	.btn-primary {
		width: 100%;
		background: var(--color-primary);
		color: white;
	}

	.btn-primary:hover:not(:disabled) {
		background: var(--color-primary-light);
	}

	.btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
</style>
