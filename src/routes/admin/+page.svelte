<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const adminModules = [
		{
			title: 'Social Media Queue',
			description: 'Manage and approve scheduled Instagram posts',
			href: '/admin/social-media',
			icon: 'instagram',
			color: '#E4405F'
		},
		{
			title: 'Blog Posts',
			description: 'Create and manage blog content',
			href: '/admin/blog',
			icon: 'edit',
			color: '#04A459',
			comingSoon: true
		},
		{
			title: 'Users',
			description: 'Manage user accounts and permissions',
			href: '/admin/users',
			icon: 'users',
			color: '#3b82f6',
			comingSoon: true
		},
		{
			title: 'Analytics',
			description: 'View site traffic and engagement metrics',
			href: '/admin/analytics',
			icon: 'chart',
			color: '#f59e0b',
			comingSoon: true
		}
	];
</script>

<svelte:head>
	<title>Admin Dashboard | code:zero</title>
</svelte:head>

<div class="admin-layout">
	<!-- Sidebar -->
	<aside class="sidebar">
		<div class="sidebar-header">
			<a href="/" class="logo">
				<span class="logo-text">code<span class="logo-accent">:zero</span></span>
			</a>
			<span class="admin-badge">Admin</span>
		</div>

		<nav class="sidebar-nav">
			<a href="/admin" class="nav-item active">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<rect x="3" y="3" width="7" height="7" />
					<rect x="14" y="3" width="7" height="7" />
					<rect x="14" y="14" width="7" height="7" />
					<rect x="3" y="14" width="7" height="7" />
				</svg>
				Dashboard
			</a>
			<a href="/admin/social-media" class="nav-item">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<rect x="2" y="2" width="20" height="20" rx="5" />
					<circle cx="12" cy="12" r="4" />
					<circle cx="18" cy="6" r="1.5" fill="currentColor" />
				</svg>
				Social Media
			</a>
		</nav>

		<div class="sidebar-footer">
			<div class="user-info">
				{#if data.user?.image}
					<img src={data.user.image} alt="" class="user-avatar" />
				{/if}
				<span class="user-name">{data.user?.name || data.user?.email}</span>
			</div>
		</div>
	</aside>

	<!-- Main Content -->
	<main class="main-content">
		<header class="page-header">
			<div class="header-title">
				<h1>Admin Dashboard</h1>
				<p class="header-subtitle">Welcome back, {data.user?.name?.split(' ')[0] || 'Admin'}</p>
			</div>
		</header>

		<!-- Admin Modules Grid -->
		<div class="modules-grid">
			{#each adminModules as module}
				<a
					href={module.comingSoon ? '#' : module.href}
					class="module-card"
					class:coming-soon={module.comingSoon}
				>
					<div class="module-icon" style="--icon-color: {module.color}">
						{#if module.icon === 'instagram'}
							<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<rect x="2" y="2" width="20" height="20" rx="5" />
								<circle cx="12" cy="12" r="4" />
								<circle cx="18" cy="6" r="1.5" fill="currentColor" />
							</svg>
						{:else if module.icon === 'edit'}
							<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
								<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
							</svg>
						{:else if module.icon === 'users'}
							<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
								<circle cx="9" cy="7" r="4" />
								<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
								<path d="M16 3.13a4 4 0 0 1 0 7.75" />
							</svg>
						{:else if module.icon === 'chart'}
							<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<line x1="18" y1="20" x2="18" y2="10" />
								<line x1="12" y1="20" x2="12" y2="4" />
								<line x1="6" y1="20" x2="6" y2="14" />
							</svg>
						{/if}
					</div>

					<div class="module-content">
						<h3>
							{module.title}
							{#if module.comingSoon}
								<span class="badge-soon">Soon</span>
							{/if}
						</h3>
						<p>{module.description}</p>
					</div>

					<div class="module-arrow">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M5 12h14M12 5l7 7-7 7" />
						</svg>
					</div>
				</a>
			{/each}
		</div>

		<!-- Quick Stats (placeholder) -->
		<section class="quick-stats">
			<h2>Quick Overview</h2>
			<div class="stats-grid">
				<div class="stat-card">
					<span class="stat-value">2</span>
					<span class="stat-label">Queued Posts</span>
				</div>
				<div class="stat-card">
					<span class="stat-value">0</span>
					<span class="stat-label">Draft Articles</span>
				</div>
				<div class="stat-card">
					<span class="stat-value">—</span>
					<span class="stat-label">Users</span>
				</div>
			</div>
		</section>
	</main>
</div>

<style>
	/* Layout */
	.admin-layout {
		display: flex;
		min-height: 100vh;
		background: var(--bg-base);
	}

	/* Sidebar */
	.sidebar {
		width: 260px;
		background: var(--bg-elevated);
		border-right: 1px solid var(--border-subtle);
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		z-index: 10;
	}

	.sidebar-header {
		padding: var(--space-6);
		border-bottom: 1px solid var(--border-subtle);
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.logo {
		text-decoration: none;
	}

	.logo-text {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.logo-accent {
		color: var(--color-primary);
	}

	.admin-badge {
		background: var(--color-primary);
		color: white;
		font-size: 0.7rem;
		font-weight: 600;
		padding: 2px 8px;
		border-radius: var(--radius-full);
		text-transform: uppercase;
	}

	.sidebar-nav {
		flex: 1;
		padding: var(--space-4);
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3) var(--space-4);
		color: var(--text-secondary);
		text-decoration: none;
		border-radius: var(--radius-md);
		font-size: 0.9rem;
		font-weight: 500;
		transition: all 0.15s ease;
	}

	.nav-item:hover {
		background: rgba(255, 255, 255, 0.05);
		color: var(--text-primary);
	}

	.nav-item.active {
		background: rgba(4, 164, 89, 0.1);
		color: var(--color-primary);
	}

	.sidebar-footer {
		padding: var(--space-4);
		border-top: 1px solid var(--border-subtle);
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.user-avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
	}

	.user-name {
		font-size: 0.85rem;
		color: var(--text-secondary);
	}

	/* Main Content */
	.main-content {
		flex: 1;
		margin-left: 260px;
		padding: var(--space-8);
	}

	.page-header {
		margin-bottom: var(--space-8);
	}

	.header-title h1 {
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-1);
	}

	.header-subtitle {
		color: var(--text-muted);
		font-size: 0.95rem;
	}

	/* Modules Grid */
	.modules-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: var(--space-4);
		margin-bottom: var(--space-10);
	}

	.module-card {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		padding: var(--space-5);
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.module-card:hover:not(.coming-soon) {
		border-color: var(--color-primary);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.module-card.coming-soon {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.module-icon {
		width: 56px;
		height: 56px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: color-mix(in srgb, var(--icon-color) 15%, transparent);
		border-radius: var(--radius-md);
		color: var(--icon-color);
		flex-shrink: 0;
	}

	.module-content {
		flex: 1;
		min-width: 0;
	}

	.module-content h3 {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-1);
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.module-content p {
		font-size: 0.85rem;
		color: var(--text-muted);
		line-height: 1.4;
	}

	.badge-soon {
		font-size: 0.65rem;
		font-weight: 600;
		padding: 2px 6px;
		background: var(--bg-base);
		color: var(--text-muted);
		border-radius: var(--radius-full);
		text-transform: uppercase;
	}

	.module-arrow {
		color: var(--text-muted);
		opacity: 0;
		transition: all 0.2s ease;
	}

	.module-card:hover:not(.coming-soon) .module-arrow {
		opacity: 1;
		transform: translateX(4px);
	}

	/* Quick Stats */
	.quick-stats {
		margin-top: var(--space-8);
	}

	.quick-stats h2 {
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-4);
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		gap: var(--space-4);
	}

	.stat-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-5);
		text-align: center;
	}

	.stat-value {
		display: block;
		font-size: 2rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-1);
	}

	.stat-label {
		font-size: 0.8rem;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.sidebar {
			display: none;
		}

		.main-content {
			margin-left: 0;
		}

		.modules-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
