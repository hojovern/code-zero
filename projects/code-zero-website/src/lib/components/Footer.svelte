<script>
	import Logo from '$lib/components/Logo.svelte';
</script>

<footer class="footer">
	<div class="container">
		<div class="footer-content">
			<div class="footer-brand">
				<Logo size={28} />
				<p class="footer-tagline">Build your freedom.</p>
			</div>
			<div class="footer-links">
				<a href="/ship-sprint">Full Stack</a>
				<a href="/instructors">Instructors</a>
				<a href="/enterprise">Enterprise</a>
				<a href="/environment-setup">Setup</a>
				<a href="/blog">Blog</a>
			</div>
			<div class="footer-social">
				<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
					</svg>
				</a>
				<a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
					</svg>
				</a>
			</div>
		</div>
		<div class="footer-bottom">
			<p>&copy; {new Date().getFullYear()} code:zero. All rights reserved.</p>
			<p>Based in Penang, Malaysia</p>
		</div>
	</div>
</footer>

<style>
	/* Footer */
	.footer {
		background: var(--bg-elevated);
		border-top: 1px solid var(--border-subtle);
		padding: var(--space-12) 0 var(--space-8);
	}

	.container {
		width: 100%;
		max-width: 1280px;
		margin: 0 auto;
		padding: 0 var(--space-4);
	}

	@media (min-width: 640px) {
		.container { padding: 0 var(--space-6); }
	}

	.footer-content {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-8);
		margin-bottom: var(--space-8);
	}

	@media (min-width: 768px) {
		.footer-content {
			grid-template-columns: 1fr auto auto;
			align-items: start;
		}
	}

	.logo-text {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.logo-accent { color: var(--color-primary); }

	.footer-tagline {
		font-size: 0.9375rem;
		color: var(--text-muted);
		margin: var(--space-2) 0 0;
	}

	.footer-links {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-4);
	}

	.footer-links a {
		color: var(--text-secondary);
		text-decoration: none;
		font-size: 0.9375rem;
		transition: color var(--duration-fast);
	}

	.footer-links a:hover { color: var(--color-primary); }

	.footer-social {
		display: flex;
		gap: var(--space-3);
	}

	.footer-social a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background: var(--bg-surface);
		border-radius: var(--radius-md);
		color: var(--text-secondary);
		transition: background var(--duration-fast), color var(--duration-fast);
	}

	.footer-social a:hover {
		background: var(--color-primary);
		color: white;
	}

	.footer-bottom {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		padding-top: var(--space-6);
		border-top: 1px solid var(--border-subtle);
		font-size: 0.875rem;
		color: var(--text-muted);
	}

	@media (min-width: 640px) {
		.footer-bottom {
			flex-direction: row;
			justify-content: space-between;
		}
	}

	.footer-bottom p { margin: 0; }
</style>
