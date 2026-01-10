<script>
	import { formatDate } from '$lib/posts.js';

	let { data } = $props();
	const posts = data.posts;

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

<!-- Navigation -->
<nav class="navbar">
	<div class="nav-container">
		<a href="/" class="nav-logo">
			<span class="logo-text">code<span class="logo-accent">:zero</span></span>
		</a>
		<div class="nav-links">
			<a href="/full-stack-web-development" class="nav-link">Full Stack Web Development</a>
			<a href="/enterprise" class="nav-link">Enterprise</a>
			<a href="/learn" class="nav-link">Student Portal</a>
			<a href="/instructors" class="nav-link">Instructors</a>
			<a href="/prompts" class="nav-link">Prompts</a>
			<a href="/blog" class="nav-link active">Blog</a>
		</div>
					<a href="/login" class="btn btn-primary btn-nav">Apply Now</a>	</div>
</nav>

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

	/* Blog Page */
	.blog-page {
		min-height: 100vh;
		padding: calc(80px + var(--space-16)) 0 var(--space-24);
		background: var(--bg-base);
	}

	.blog-container {
		max-width: 720px;
		margin: 0 auto;
		padding: 0 var(--space-8);
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--space-6);
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

	/* Footer */
	.footer {
		padding: var(--space-12) 0;
		border-top: 1px solid var(--border-subtle);
		background: var(--bg-base);
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

		.footer-content {
			flex-direction: column;
			text-align: center;
		}
	}
</style>
