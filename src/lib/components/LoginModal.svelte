<script lang="ts">
	import { createSupabaseBrowserClient } from '$lib/supabase/client';
	import { goto } from '$app/navigation';
	import { showLoginModal, closeLoginModal } from '$lib/stores/auth';

	const supabase = createSupabaseBrowserClient();

	let username = $state('');
	let password = $state('');
	let error = $state('');
	let loading = $state(false);

	async function signIn() {
		if (!username || !password) {
			error = 'Please enter username and password';
			return;
		}

		loading = true;
		error = '';

		// Convert username to email format for Supabase
		const email = username.includes('@') ? username : `${username}@students.codezero.my`;

		const { error: authError } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (authError) {
			error = 'Invalid username or password';
			loading = false;
			return;
		}

		closeLoginModal();
		goto('/dashboard');
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			closeLoginModal();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			closeLoginModal();
		}
	}

	function handleFormKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			signIn();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if $showLoginModal}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div class="modal-backdrop" onclick={handleBackdropClick}>
		<div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="login-title">
			<button class="modal-close" onclick={closeLoginModal} aria-label="Close">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M18 6L6 18M6 6l12 12" />
				</svg>
			</button>

			<div class="modal-header">
				<div class="modal-logo">
					<span class="logo-text">code<span class="logo-accent">:zero</span></span>
				</div>
				<h2 id="login-title">Welcome back! 👋</h2>
				<p>Sign in to access your student portal.</p>
			</div>

			<div class="modal-body">
				<div class="form-group">
					<label for="username">
						<span class="label-icon">👤</span>
						Username
					</label>
					<input
						type="text"
						id="username"
						bind:value={username}
						onkeydown={handleFormKeydown}
						placeholder="Enter your username"
						autocomplete="username"
						disabled={loading}
					/>
				</div>

				<div class="form-group">
					<label for="password">
						<span class="label-icon">🔒</span>
						Password
					</label>
					<input
						type="password"
						id="password"
						bind:value={password}
						onkeydown={handleFormKeydown}
						placeholder="Enter your password"
						autocomplete="current-password"
						disabled={loading}
					/>
				</div>

				{#if error}
					<div class="error-message">
						<span>⚠️</span> {error}
					</div>
				{/if}

				<button onclick={signIn} class="btn-login" disabled={loading}>
					{#if loading}
						<span class="spinner"></span>
						Signing in...
					{:else}
						🚀 Sign In
					{/if}
				</button>
			</div>

			<div class="modal-footer">
				<p>🎓 Student accounts are created by admin.<br/>
				Contact us if you need access.</p>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		z-index: 1000;
		background: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-4);
	}

	.modal-content {
		position: relative;
		width: 100%;
		max-width: 420px;
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl);
		padding: var(--space-10);
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
		animation: modalIn 0.2s ease-out;
	}

	@keyframes modalIn {
		from {
			opacity: 0;
			transform: scale(0.95) translateY(-10px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	.modal-close {
		position: absolute;
		top: var(--space-4);
		right: var(--space-4);
		background: none;
		border: none;
		color: var(--text-muted);
		cursor: pointer;
		padding: var(--space-2);
		border-radius: var(--radius-md);
		transition: all 0.15s ease;
	}

	.modal-close:hover {
		color: var(--text-primary);
		background: var(--bg-base);
	}

	.modal-header {
		text-align: center;
		margin-bottom: var(--space-8);
	}

	.modal-logo {
		margin-bottom: var(--space-6);
	}

	.logo-text {
		font-family: var(--font-heading);
		font-size: 2rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.logo-accent {
		color: var(--color-primary);
	}

	.modal-header h2 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.modal-header p {
		font-size: 0.9375rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.modal-body {
		margin-bottom: var(--space-6);
	}

	.form-group {
		margin-bottom: var(--space-4);
	}

	.form-group label {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-secondary);
		margin-bottom: var(--space-2);
	}

	.label-icon {
		font-size: 1rem;
	}

	.form-group input {
		width: 100%;
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

	.form-group input:disabled {
		opacity: 0.6;
		cursor: not-allowed;
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

	.btn-login {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		width: 100%;
		padding: var(--space-4);
		background: var(--color-primary);
		color: white;
		font-family: var(--font-body);
		font-size: 1rem;
		font-weight: 600;
		border-radius: var(--radius-md);
		border: none;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.btn-login:hover:not(:disabled) {
		background: var(--color-primary-light);
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(4, 164, 89, 0.3);
	}

	.btn-login:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.spinner {
		width: 18px;
		height: 18px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.modal-footer {
		text-align: center;
		font-size: 0.8125rem;
		color: var(--text-muted);
		line-height: 1.5;
	}
</style>
