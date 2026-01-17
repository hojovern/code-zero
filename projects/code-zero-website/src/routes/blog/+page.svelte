<script>
	import { formatDate } from '$lib/posts.js';

	let { data } = $props();
	const posts = $derived(data.posts);

	// Group posts by year
	function getPostsByYear() {
		const grouped = {};
		for (const post of posts) {
			const year = new Date(post.date).getFullYear();
			if (!grouped[year]) {
				grouped[year] = [];
			}
			grouped[year].push(post);
		}
		// Sort years descending
		return Object.entries(grouped)
			.sort(([a], [b]) => Number(b) - Number(a))
			.map(([year, yearPosts]) => ({ year, posts: yearPosts }));
	}

	const postsByYear = getPostsByYear();

	// Format date as "Jan 15"
	function formatShortDate(dateStr) {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}
</script>

<svelte:head>
	<title>Blog | code:zero</title>
	<meta name="description" content="Articles on AI-powered development, shipping products fast, and building your freedom with code." />
</svelte:head>

<main class="blog-page">
	<div class="blog-container">
		<header class="blog-header">
			<h1>Posts</h1>
		</header>

		<!-- Posts grouped by year -->
		<div class="posts-container">
			{#each postsByYear as { year, posts: yearPosts }}
				<section class="year-section">
					<h2 class="year-heading">{year}</h2>
					<ul class="posts-list">
						{#each yearPosts as post}
							<li class="post-item">
								<a href="/blog/{post.slug}" class="post-link">
									<span class="post-title">{post.title}</span>
									<time datetime={post.date} class="post-date">{formatShortDate(post.date)}</time>
								</a>
							</li>
						{/each}
					</ul>
				</section>
			{:else}
				<div class="no-posts">
					<p>No posts yet. Check back soon!</p>
				</div>
			{/each}
		</div>
	</div>
</main>

<style>
	/* Blog Page */
	.blog-page {
		min-height: 100vh;
		padding: calc(80px + var(--space-16)) 0 var(--space-24);
		background: var(--bg-base);
	}

	.blog-container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 var(--space-8);
	}

	/* Header */
	.blog-header {
		margin-bottom: var(--space-12);
	}

	.blog-header h1 {
		font-family: var(--font-heading);
		font-size: 2rem;
		font-weight: 600;
		color: var(--color-primary);
	}

	/* Year Sections */
	.posts-container {
		display: flex;
		flex-direction: column;
		gap: var(--space-12);
	}

	.year-section {
		display: flex;
		flex-direction: column;
	}

	.year-heading {
		font-family: var(--font-heading);
		font-size: 1.1rem;
		font-weight: 500;
		color: var(--text-muted);
		margin-bottom: var(--space-4);
		letter-spacing: 0.02em;
	}

	/* Posts List */
	.posts-list {
		list-style: none;
		display: flex;
		flex-direction: column;
	}

	.post-item {
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.post-item:last-child {
		border-bottom: none;
	}

	.post-link {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: var(--space-4);
		padding: var(--space-4) 0;
		color: inherit;
		text-decoration: none;
		transition: color var(--duration-normal) var(--ease-default);
	}

	.post-link:hover .post-title {
		color: var(--color-primary);
	}

	.post-title {
		font-family: var(--font-body);
		font-size: 1.05rem;
		font-weight: 400;
		color: var(--text-primary);
		line-height: 1.5;
		transition: color var(--duration-normal) var(--ease-default);
	}

	.post-date {
		font-size: 0.9rem;
		color: var(--text-muted);
		letter-spacing: 0.03em;
		white-space: nowrap;
		flex-shrink: 0;
	}

	/* No Posts */
	.no-posts {
		text-align: center;
		padding: var(--space-16) 0;
		color: var(--text-muted);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.blog-container {
			padding: 0 var(--space-6);
		}

		.blog-header h1 {
			font-size: 1.75rem;
		}

		.post-link {
			flex-direction: column;
			gap: var(--space-1);
			align-items: flex-start;
		}

		.post-date {
			font-size: 0.8rem;
		}
	}
</style>
