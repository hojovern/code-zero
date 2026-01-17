<script>
	import { formatDate } from '$lib/posts.js';
	import { copyCode } from '$lib/actions/copyCode.js';

	let { data } = $props();
	const post = $derived(data.post);
	const Content = $derived(post.content);
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

<main class="post-page">
	<article class="post">
		<header class="post-header">
			<div class="container">
				<div class="meta-row">
					<a href="/blog" class="back-link">Blog</a>
					<span class="meta-slash">/</span>
					<span class="post-category">{post.title}</span>
				</div>

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
				<div class="prose" use:copyCode>
					<Content />
				</div>
			</div>
		</div>
	</article>
</main>

<style>
	/* Copy Button Styles (Global because inserted via JS) */
	:global(.copy-btn) {
		position: absolute;
		top: 12px;
		right: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		background: rgba(255, 255, 255, 0.05); /* Constant subtle background */
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 6px;
		color: var(--text-muted);
		cursor: pointer;
		transition: all 0.2s ease;
		opacity: 1; /* Always visible */
		z-index: 10;
	}

	:global(.copy-btn:hover) {
		background: rgba(255, 255, 255, 0.15);
		color: white;
		border-color: rgba(255, 255, 255, 0.3);
	}

	:global(.copy-btn.copied) {
		border-color: var(--color-primary);
		color: var(--color-primary);
	}

	:global(.text-green-400) {
		color: #4ade80;
	}

	/* Post Page - Fade In Animation */
	.post-page {
		min-height: 100vh;
		padding-top: calc(80px + var(--space-12));
		background: var(--bg-base);
		opacity: 0;
		animation: fadeIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
	}

	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(10px); }
		to { opacity: 1; transform: translateY(0); }
	}

	.container {
		/* Parent allows widest element (1000px) */
		max-width: 1000px;
		margin: 0 auto;
		padding: 0 var(--space-6);
	}

	/* Post Header - Centered over the text column */
	.post-header {
		padding: var(--space-6) 0 var(--space-10); /* Slightly more breathing room */
		max-width: 720px; /* Match text width */
		margin: 0 auto; /* Center it */
		text-align: left;
	}

	/* Combined Breadcrumb / Category Row */
	.meta-row {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		margin-bottom: var(--space-6);
		font-family: var(--font-mono);
		font-size: 0.85rem;
	}

	.back-link {
		color: var(--text-muted);
		text-decoration: none;
		transition: color var(--duration-normal);
	}

	.back-link:hover {
		color: var(--color-primary);
	}

	.meta-slash {
		color: var(--border-default);
	}

	.post-category {
		color: var(--color-primary);
		font-weight: 600;
		letter-spacing: 0.02em;
	}

	.post-header h1 {
		font-family: var(--font-heading);
		font-size: clamp(2.5rem, 6vw, 3.5rem); /* Medium-style sizing */
		font-weight: 800; /* Bold and authoritative */
		line-height: 1.1;
		color: var(--text-primary); /* Crisp white/primary, no gradient */
		margin-bottom: var(--space-6);
		letter-spacing: -0.025em; /* Tight editorial tracking */
	}

	.post-meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: flex-start;
		gap: var(--space-4);
		font-size: 1rem;
		color: var(--text-secondary);
		margin-bottom: var(--space-8);
		font-family: var(--font-mono); /* Tech feel */
	}

	.author {
		color: var(--text-primary);
		font-weight: 600;
	}

	.separator {
		opacity: 0.3;
	}

	.post-tags {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		gap: var(--space-3);
	}

	.tag {
		padding: var(--space-1) var(--space-3);
		background: rgba(255, 255, 255, 0.03);
		color: var(--text-secondary);
		font-size: 0.85rem;
		border-radius: var(--radius-sm);
		border: 1px solid var(--border-default);
		font-family: var(--font-mono);
		transition: all 0.2s ease;
		cursor: default;
	}

	.tag:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(4, 164, 89, 0.1);
	}

	/* Post Hero Image - Full Width of Container (1000px) */
	.post-hero {
		margin-bottom: var(--space-16);
		/* No max-width constraint here, takes full .container */
	}

	.post-hero img {
		width: 100%;
		height: auto;
		max-height: 600px;
		object-fit: cover;
		border-radius: var(--radius-lg);
		border: 1px solid var(--border-subtle);
	}

	/* Post Content */
	.post-content {
		padding-bottom: var(--space-24);
	}

	/* Prose Styles - Stable Single Column */
	.prose {
		color: var(--text-secondary);
		font-size: 1.25rem; /* 20px */
		line-height: 1.8;
		font-family: var(--font-body);
		max-width: 800px; /* Reliable single column */
		margin: 0 auto;
		display: block; /* Force block layout */
	}

	/* Elements just fill the container */
	.prose :global(pre), 
	.prose :global(img),
	.prose :global(.post-hero),
	.prose :global(table) {
		width: 100%;
		border-radius: var(--radius-lg);
		margin: var(--space-8) 0;
	}

	/* Headings with Anchor Hashtags */
	.prose :global(h2),
	.prose :global(h3),
	.prose :global(h4) {
		font-family: var(--font-heading);
		color: var(--text-primary);
		font-weight: 700;
		line-height: 1.2;
		margin-top: var(--space-16);
		margin-bottom: var(--space-6);
		letter-spacing: -0.02em;
		position: relative;
		cursor: pointer;
	}

	/* The Hashtag Flourish */
	.prose :global(h2)::after,
	.prose :global(h3)::after,
	.prose :global(h4)::after {
		content: '#';
		margin-left: 0.5rem;
		color: var(--color-primary);
		opacity: 0;
		transition: opacity 0.2s ease;
		font-weight: 400;
		font-family: var(--font-mono);
	}

	.prose :global(h2:hover)::after,
	.prose :global(h3:hover)::after,
	.prose :global(h4:hover)::after {
		opacity: 0.6;
		color: var(--text-primary); /* Same color as text */
	}

	.prose :global(h2:hover),
	.prose :global(h3:hover),
	.prose :global(h4:hover) {
		text-decoration: none !important;
		border-bottom: none !important;
	}

	.prose :global(h1) { font-size: 3rem; }
	.prose :global(h2) { font-size: 2.25rem; border-top: none; }
	
	/* Tiny flourish: Green dot before H2s */
	.prose :global(h2)::before {
		content: '';
		position: absolute;
		left: -24px;
		top: 0.4em;
		width: 6px;
		height: 6px;
		background: var(--color-primary);
		border-radius: 50%;
		opacity: 0.5;
	}

	@media (max-width: 1000px) {
		.prose :global(h2)::before { display: none; }
	}

	.prose :global(h3) { font-size: 1.75rem; }
	.prose :global(h4) { font-size: 1.4rem; }

	/* Disable underline for links inside headings */
	.prose :global(h1 a),
	.prose :global(h2 a),
	.prose :global(h3 a),
	.prose :global(h4 a),
	.prose :global(h5 a),
	.prose :global(h6 a) {
		text-decoration: none;
		border-bottom: none;
		background-image: none;
	}

	.prose :global(p) {
		margin-bottom: var(--space-8);
	}

	/* Animated Link Underline */
	.prose :global(a) {
		color: var(--color-primary);
		text-decoration: none;
		background-image: linear-gradient(var(--color-primary), var(--color-primary));
		background-size: 0% 1px;
		background-repeat: no-repeat;
		background-position: 0 100%;
		transition: background-size 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), color 0.2s;
		padding-bottom: 2px;
		border-bottom: 1px solid rgba(4, 164, 89, 0.3);
	}

	.prose :global(a:hover) {
		background-size: 100% 1px;
		color: var(--color-primary-light);
		border-bottom-color: transparent;
	}

	.prose :global(strong) {
		color: var(--text-primary);
		font-weight: 600;
	}

	.prose :global(ul) {
		list-style-type: disc;
		margin-bottom: var(--space-8);
		padding-left: var(--space-6);
	}

	.prose :global(ol) {
		list-style-type: decimal;
		margin-bottom: var(--space-8);
		padding-left: var(--space-6);
	}

	.prose :global(li) {
		margin-bottom: var(--space-3);
		padding-left: var(--space-2);
	}
	
	.prose :global(li::marker) {
		color: var(--text-muted);
	}

	.prose :global(blockquote) {
		margin: var(--space-12) 0;
		padding-left: var(--space-6);
		border-left: 3px solid var(--color-primary);
		background: linear-gradient(90deg, rgba(4, 164, 89, 0.05) 0%, transparent 100%);
		font-style: normal;
		font-size: 1.35rem; /* Larger quote text */
		color: var(--text-primary);
		line-height: 1.6;
		padding: var(--space-6);
		border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
	}

	/* Code Blocks - Breakout Style with Glow */
	.prose :global(pre) {
		margin: var(--space-12) 0;
		padding: var(--space-8);
		background: #0d1117; /* Deep GitHub dark */
		border: 1px solid #30363d;
		border-radius: var(--radius-lg);
		overflow-x: auto;
		font-size: 1rem;
		line-height: 1.6;
		box-shadow: 0 0 0 1px rgba(0,0,0,0.5), 0 20px 40px rgba(0,0,0,0.4);
		transition: border-color 0.3s ease;
	}
	
	.prose :global(pre):hover {
		border-color: var(--text-muted);
	}

	/* Subtle glow for inline code */
	.prose :global(:not(pre) > code) {
		padding: 0.2em 0.4em;
		background: rgba(110, 118, 129, 0.1); 
		border: 1px solid rgba(110, 118, 129, 0.2);
		border-radius: 6px;
		color: var(--color-primary-light);
		font-size: 0.85em;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.post-header h1 {
			font-size: 1.75rem;
		}

		.post-meta {
			font-size: 0.85rem;
		}
	}
</style>
