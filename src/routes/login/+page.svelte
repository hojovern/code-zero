<script lang="ts">
	import { signIn } from "@auth/sveltekit/client";
	import { page } from '$app/state';

	const callbackUrl = page.url.searchParams.get('callbackUrl') || '/learn';
</script>

<svelte:head>
	<title>Login | code:zero</title>
	<meta name="description" content="Sign in to your code:zero account." />
</svelte:head>

<section class="login-section">
	<div class="login-container">
		<div class="login-card">
			<div class="login-header">
				<a href="/" class="login-logo">
					<span class="logo-text">code<span class="logo-accent">:zero</span></span>
				</a>
				<h1 class="login-title">Build your freedom.</h1>
				<p class="login-subtitle">Sign in to start your application or access the portal.</p>
			</div>

			<div class="login-body">
				<button 
					onclick={() => signIn("google", { callbackUrl })} 
					class="btn-google"
				>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
						<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
						<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
						<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
					</svg>
					Continue with Google
				</button>
			</div>

			<div class="login-footer">
				<p>Don't have an account? <span class="text-highlight">Sign in to create one.</span></p>
			</div>
		</div>
	</div>
</section>

<style>
	.login-section {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--bg-base);
		padding: var(--space-6);
		background-image: var(--gradient-glow);
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}

	.login-container {
		width: 100%;
		max-width: 440px;
	}

	.login-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl);
		padding: var(--space-10);
		box-shadow: var(--shadow-lg);
		text-align: center;
	}

	.login-header {
		margin-bottom: var(--space-8);
	}

	.login-logo {
		display: inline-block;
		text-decoration: none;
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

	.login-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.login-subtitle {
		font-size: 0.9375rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.login-body {
		margin-bottom: var(--space-8);
	}

	.btn-google {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-3);
		width: 100%;
		padding: var(--space-3);
		background: white;
		color: #1f2937;
		font-family: var(--font-body);
		font-size: 0.9375rem;
		font-weight: 600;
		border-radius: var(--radius-md);
		border: 1px solid #e5e7eb;
		cursor: pointer;
		transition: all var(--duration-fast);
	}

	.btn-google:hover {
		background: #f9fafb;
		box-shadow: var(--shadow-md);
		transform: translateY(-1px);
	}

	.login-footer {
		font-size: 0.875rem;
		color: var(--text-muted);
	}

	.text-highlight {
		color: var(--color-primary-light);
		font-weight: 500;
	}
</style>
