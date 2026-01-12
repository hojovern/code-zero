<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let seeding = $state(false);
	let seedResult = $state<{ success: boolean; message: string } | null>(null);

	async function seedDatabase() {
		seeding = true;
		seedResult = null;

		try {
			const response = await fetch('/api/seed', { method: 'POST' });
			const result = await response.json();
			seedResult = { success: response.ok, message: result.message || result.error };
		} catch (error) {
			seedResult = { success: false, message: 'Failed to seed database' };
		} finally {
			seeding = false;
		}
	}

	// Define all modules with their required permissions
	const allModules = [
		{
			title: 'Students',
			description: 'Create accounts, manage enrollments',
			href: '/admin/students',
			icon: 'users',
			color: '#3b82f6',
			permission: 'canManageStudents'
		},
		{
			title: 'Courses',
			description: 'Create and manage courses',
			href: '/admin/courses',
			icon: 'book',
			color: '#04A459',
			permission: 'canManageCourses'
		},
		{
			title: 'Social Media',
			description: 'Manage scheduled posts',
			href: '/admin/social-media',
			icon: 'instagram',
			color: '#E4405F',
			permission: 'canManageSocialMedia'
		},
		{
			title: 'Content',
			description: 'All content pipeline',
			href: '/admin/content',
			icon: 'pipeline',
			color: '#8b5cf6',
			permission: 'canManageContent'
		},
		{
			title: 'Emails',
			description: 'Campaigns, sequences, analytics',
			href: '/admin/emails',
			icon: 'email',
			color: '#06b6d4',
			permission: 'canManageEmail'
		},
		{
			title: 'Analytics',
			description: 'Traffic and metrics',
			href: '/admin/analytics',
			icon: 'chart',
			color: '#f59e0b',
			permission: 'canViewAnalytics',
			comingSoon: true
		}
	];

	// Filter modules based on user permissions
	const adminModules = $derived(
		allModules.filter(m => data.permissions[m.permission as keyof typeof data.permissions])
	);
</script>

<svelte:head>
	<title>{data.user?.role === 'super_admin' ? 'Super Admin' : 'Admin'} Dashboard | code:zero</title>
</svelte:head>

<header class="page-header">
	<div class="header-title">
		<h1>{data.user?.role === 'super_admin' ? 'Super Admin' : 'Admin'} Dashboard</h1>
		<p class="header-subtitle">Welcome back, {data.user?.role === 'super_admin' ? 'Super Admin' : (data.user?.name?.split(' ')[0] || 'Admin')}</p>
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
				{#if module.icon === 'pipeline'}
					<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
						<polyline points="14 2 14 8 20 8"/>
						<line x1="16" y1="13" x2="8" y2="13"/>
						<line x1="16" y1="17" x2="8" y2="17"/>
					</svg>
				{:else if module.icon === 'instagram'}
					<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<rect x="2" y="2" width="20" height="20" rx="5" />
						<circle cx="12" cy="12" r="4" />
						<circle cx="18" cy="6" r="1.5" fill="currentColor" />
					</svg>
				{:else if module.icon === 'users'}
					<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
						<circle cx="9" cy="7" r="4" />
						<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
						<path d="M16 3.13a4 4 0 0 1 0 7.75" />
					</svg>
				{:else if module.icon === 'book'}
					<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
						<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
					</svg>
				{:else if module.icon === 'chart'}
					<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<line x1="18" y1="20" x2="18" y2="10" />
						<line x1="12" y1="20" x2="12" y2="4" />
						<line x1="6" y1="20" x2="6" y2="14" />
					</svg>
				{:else if module.icon === 'email'}
					<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
						<polyline points="22,6 12,13 2,6"/>
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

<!-- Quick Stats -->
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

<!-- Database Tools (Super Admin only) -->
{#if data.permissions.canSeedDatabase}
	<section class="database-tools">
		<h2>🛠️ Database Tools</h2>
		<div class="tools-grid">
			<div class="tool-card">
				<h3>Seed Database</h3>
				<p>Initialize achievements and Full Stack Web Development course with lessons</p>
				<button
					class="btn btn-primary"
					onclick={seedDatabase}
					disabled={seeding}
				>
					{seeding ? '⏳ Seeding...' : '🌱 Seed Database'}
				</button>
				{#if seedResult}
					<div class="seed-result" class:success={seedResult.success} class:error={!seedResult.success}>
						{seedResult.success ? '✅' : '❌'} {seedResult.message}
					</div>
				{/if}
			</div>
		</div>
	</section>
{/if}

<style>
	.page-header {
		margin-bottom: var(--space-5);
	}

	.header-title h1 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: 2px;
	}

	.header-subtitle {
		color: var(--text-muted);
		font-size: 0.875rem;
	}

	/* Modules Grid */
	.modules-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-3);
		margin-bottom: var(--space-6);
	}

	.module-card {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-4);
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
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
		width: 44px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: color-mix(in srgb, var(--icon-color) 15%, transparent);
		border-radius: var(--radius-md);
		color: var(--icon-color);
		flex-shrink: 0;
	}

	.module-icon :global(svg) {
		width: 22px;
		height: 22px;
	}

	.module-content {
		flex: 1;
		min-width: 0;
	}

	.module-content h3 {
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 2px;
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.module-content p {
		font-size: 0.8rem;
		color: var(--text-muted);
		line-height: 1.3;
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
		margin-top: var(--space-6);
	}

	.quick-stats h2 {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-3);
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-3);
	}

	.stat-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		padding: var(--space-4);
		text-align: center;
	}

	.stat-value {
		display: block;
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: 2px;
	}

	.stat-label {
		font-size: 0.7rem;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	/* Database Tools */
	.database-tools {
		margin-top: var(--space-6);
	}

	.database-tools h2 {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-3);
	}

	.tools-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-3);
	}

	.tool-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		padding: var(--space-4);
	}

	.tool-card h3 {
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 2px;
	}

	.tool-card p {
		font-size: 0.8rem;
		color: var(--text-muted);
		margin-bottom: var(--space-3);
	}

	.tool-card .btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-4);
		font-size: 0.875rem;
		font-weight: 600;
		border-radius: var(--radius-md);
		border: none;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.tool-card .btn-primary {
		background: var(--color-primary);
		color: white;
	}

	.tool-card .btn-primary:hover:not(:disabled) {
		background: var(--color-primary-light);
	}

	.tool-card .btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.seed-result {
		margin-top: var(--space-3);
		padding: var(--space-2) var(--space-3);
		border-radius: var(--radius-md);
		font-size: 0.875rem;
	}

	.seed-result.success {
		background: rgba(4, 164, 89, 0.1);
		color: var(--color-primary);
	}

	.seed-result.error {
		background: rgba(239, 68, 68, 0.1);
		color: #ef4444;
	}

	@media (max-width: 768px) {
		.modules-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
