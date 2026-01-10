<script>
	import { formatDate } from '$lib/posts.js';

	let { data } = $props();
	const post = data.post;
	const Content = post.content;
</script>

<svelte:head>
	<title>{post.title} | code:zero</title>
	<meta name="description" content={post.description} />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.description} />
	<meta property="og:type" content="article" />
	{#if post.image}
		<meta property="og:image" content={post.image} />
	{/if}
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<!-- Navigation -->
<nav class="navbar">
	<div class="nav-container">
		<a href="/" class="nav-logo">
			<span class="logo-text">code<span class="logo-accent">:zero</span></span>
		</a>
		<div class="nav-links">
			<a href="/learn" class="nav-link">Student Portal</a>
			<a href="/full-stack-web-development" class="nav-link">Full Stack Web Development</a>
			<a href="/enterprise" class="nav-link">Enterprise</a>
			<a href="/instructors" class="nav-link">Instructors</a>
			<a href="/prompts" class="nav-link">Prompts</a>
			<a href="/blog" class="nav-link active">Blog</a>
		</div>
		<a href="/full-stack-web-development#apply" class="btn btn-primary btn-nav">Apply Now</a>
	</div>
</nav>

<main class="post-page">
	<article class="post">
		<header class="post-header">
			<div class="container">
				<a href="/blog" class="back-link">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M15 10H5M5 10L10 5M5 10L10 15"/>
					</svg>
					Back to Blog
				</a>

				{#if post.categories?.length > 0}
					<span class="post-category">{post.categories[0]}</span>
				{/if}

				<h1>{post.title}</h1>

				<div class="post-meta">
					<span class="author">{post.author}</span>
					<span class="separator">·</span>
					<time datetime={post.date}>{formatDate(post.date)}</time>
					<span class="separator">·</span>
					<span>{post.readingTime}</span>
				</div>

				{#if post.tags?.length > 0}
					<div class="post-tags">
						{#each post.tags as tag}
							<span class="tag">{tag}</span>
						{/each}
					</div>
				{/if}
			</div>
		</header>

		{#if post.image}
			<div class="post-hero">
				<div class="container">
					<img src={post.image} alt={post.title} />
				</div>
			</div>
		{/if}

		<div class="post-content">
			<div class="container">
				<div class="prose">
					<Content />
				</div>
			</div>
		</div>
	</article>
</main>

<!-- Footer -->
<footer class="footer">
	<div class="container">
		<div class="footer-content">
			<div class="footer-logo">code<span>:zero</span></div>
			<ul class="footer-links">
				<li><a href="/blog">Blog</a></li>
				<li><a href="/ship-sprint">Ship Sprint</a></li>
				<li><a href="/instructors">Instructors</a></li>
				<li><a href="/enterprise">Enterprise</a></li>
				<li><a href="/blog/rss.xml">RSS</a></li>
				<li><a href="mailto:hello@codezero.my">Contact</a></li>
			</ul>
			<p class="footer-copy">&copy; 2025 code:zero. Penang, Malaysia.</p>
		</div>
	</div>
</footer>

<style>
	/* Navbar */
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		padding: var(--space-4) 0;
		background: rgba(26, 29, 35, 0.85);
		backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--border-subtle);
	}

	.nav-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--space-6);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.nav-logo {
		text-decoration: none;
	}

	.logo-text {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		font-weight: 800;
		color: var(--text-primary);
	}

	.logo-accent {
		color: var(--color-primary);
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: var(--space-8);
	}

	.nav-link {
		color: var(--text-secondary);
		font-size: 0.9rem;
		font-weight: 500;
		text-decoration: none;
		transition: color var(--duration-normal) var(--ease-default);
	}

	.nav-link:hover,
	.nav-link.active {
		color: var(--text-primary);
	}

	.btn-nav {
		padding: var(--space-2) var(--space-6);
		background: var(--gradient-accent);
		color: white;
		border-radius: var(--radius-md);
		font-size: 0.9rem;
		font-weight: 600;
		text-decoration: none;
		box-shadow: var(--shadow-glow-sm);
		transition: all var(--duration-normal) var(--ease-default);
	}

	.btn-nav:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-glow-md);
	}

	/* Post Page */
	.post-page {
		min-height: 100vh;
		padding-top: 80px;
		background: var(--bg-base);
	}

	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 0 var(--space-6);
	}

	/* Post Header */
	.post-header {
		padding: var(--space-12) 0 var(--space-8);
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		color: var(--text-muted);
		font-size: 0.875rem;
		text-decoration: none;
		margin-bottom: var(--space-6);
		transition: color var(--duration-normal);
	}

	.back-link:hover {
		color: var(--color-primary);
	}

	.post-category {
		display: inline-block;
		padding: var(--space-1) var(--space-3);
		background: rgba(4, 164, 89, 0.1);
		color: var(--color-primary);
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		border-radius: var(--radius-full);
		margin-bottom: var(--space-4);
	}

	.post-header h1 {
		font-family: var(--font-heading);
		font-size: clamp(2rem, 5vw, 3rem);
		font-weight: 800;
		line-height: 1.2;
		color: var(--text-primary);
		margin-bottom: var(--space-6);
	}

	.post-meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-2);
		font-size: 0.9rem;
		color: var(--text-muted);
		margin-bottom: var(--space-4);
	}

	.author {
		color: var(--text-secondary);
		font-weight: 500;
	}

	.separator {
		opacity: 0.5;
	}

	.post-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.tag {
		padding: var(--space-1) var(--space-3);
		background: var(--bg-elevated);
		color: var(--text-secondary);
		font-size: 0.8rem;
		border-radius: var(--radius-full);
		border: 1px solid var(--border-subtle);
	}

	/* Post Hero Image */
	.post-hero {
		margin-bottom: var(--space-12);
	}

	.post-hero img {
		width: 100%;
		max-height: 500px;
		object-fit: cover;
		border-radius: var(--radius-xl);
	}

	/* Post Content */
	.post-content {
		padding-bottom: var(--space-24);
	}

	/* Prose Styles */
	.prose {
		color: var(--text-secondary);
		font-size: 1.1rem;
		line-height: 1.8;
	}

	.prose :global(h1),
	.prose :global(h2),
	.prose :global(h3),
	.prose :global(h4),
	.prose :global(h5),
	.prose :global(h6) {
		font-family: var(--font-heading);
		color: var(--text-primary);
		font-weight: 700;
		line-height: 1.3;
		margin-top: var(--space-10);
		margin-bottom: var(--space-4);
	}

	.prose :global(h1) {
		font-size: 2.25rem;
	}

	.prose :global(h2) {
		font-size: 1.75rem;
		padding-top: var(--space-4);
		border-top: 1px solid var(--border-subtle);
	}

	.prose :global(h3) {
		font-size: 1.375rem;
	}

	.prose :global(h4) {
		font-size: 1.125rem;
	}

	.prose :global(p) {
		margin-bottom: var(--space-6);
	}

	.prose :global(a) {
		color: var(--color-primary);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.prose :global(a:hover) {
		color: var(--color-primary-light);
	}

	.prose :global(strong) {
		color: var(--text-primary);
		font-weight: 600;
	}

	.prose :global(ul),
	.prose :global(ol) {
		margin-bottom: var(--space-6);
		padding-left: var(--space-6);
	}

	.prose :global(li) {
		margin-bottom: var(--space-2);
	}

	.prose :global(blockquote) {
		margin: var(--space-8) 0;
		padding: var(--space-4) var(--space-6);
		background: var(--bg-elevated);
		border-left: 4px solid var(--color-primary);
		border-radius: var(--radius-md);
		font-style: italic;
	}

	.prose :global(blockquote p) {
		margin-bottom: 0;
	}

	.prose :global(pre) {
		margin: var(--space-6) 0;
		padding: var(--space-4);
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		overflow-x: auto;
	}

	.prose :global(code) {
		font-family: var(--font-mono);
		font-size: 0.9em;
	}

	.prose :global(:not(pre) > code) {
		padding: 0.2em 0.4em;
		background: var(--bg-elevated);
		border-radius: var(--radius-sm);
		color: var(--color-primary);
	}

	.prose :global(img) {
		max-width: 100%;
		border-radius: var(--radius-lg);
		margin: var(--space-8) 0;
	}

	.prose :global(hr) {
		margin: var(--space-12) 0;
		border: none;
		border-top: 1px solid var(--border-subtle);
	}

	.prose :global(table) {
		width: 100%;
		margin: var(--space-8) 0;
		border-collapse: collapse;
	}

	.prose :global(th),
	.prose :global(td) {
		padding: var(--space-3) var(--space-4);
		border: 1px solid var(--border-subtle);
		text-align: left;
	}

	.prose :global(th) {
		background: var(--bg-elevated);
		color: var(--text-primary);
		font-weight: 600;
	}

	/* Footer */
	.footer {
		padding: var(--space-12) 0;
		border-top: 1px solid var(--border-subtle);
		background: var(--bg-base);
	}

	.footer .container {
		max-width: 1200px;
	}

	.footer-content {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: var(--space-6);
	}

	.footer-logo {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 800;
		color: var(--text-primary);
	}

	.footer-logo span {
		color: var(--color-primary);
	}

	.footer-links {
		display: flex;
		gap: var(--space-6);
		list-style: none;
	}

	.footer-links a {
		color: var(--text-muted);
		font-size: 0.875rem;
		text-decoration: none;
		transition: color var(--duration-normal);
	}

	.footer-links a:hover {
		color: var(--text-primary);
	}

	.footer-copy {
		color: var(--text-muted);
		font-size: 0.875rem;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.nav-links {
			display: none;
		}

		.post-header h1 {
			font-size: 1.75rem;
		}

		.post-meta {
			font-size: 0.85rem;
		}

		.footer-content {
			flex-direction: column;
			text-align: center;
		}
	}
</style>
