<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import { page } from '$app/state';
	import { getLevelProgress } from '$lib/config/gamification';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	const levelProgress = $derived(getLevelProgress(data.user.xpTotal, data.user.level));

	function isActive(path: string): boolean {
		return page.url.pathname === path;
	}
</script>

<svelte:head>
	<title>Dashboard | code:zero</title>
</svelte:head>

<div class="dashboard-layout">
	<!-- Sidebar -->
	<aside class="sidebar">
		<div class="sidebar-header">
			<a href="/" class="logo">
				<span class="logo-text">code<span class="logo-accent">:zero</span></span>
			</a>
		</div>

		<div class="user-profile">
			<div class="avatar-wrapper">
				{#if data.user.avatarUrl}
					<img src={data.user.avatarUrl} alt="" class="avatar" />
				{:else}
					<div class="avatar-placeholder">
						{data.user.username?.charAt(0).toUpperCase() || '👤'}
					</div>
				{/if}
				<span class="level-badge">Lv.{data.user.level}</span>
			</div>
			<div class="user-info">
				<span class="username">{data.user.username}</span>
				<div class="xp-mini">
					<span class="xp-icon">⚡</span>
					<span>{data.user.xpTotal} XP</span>
				</div>
			</div>
		</div>

		<div class="xp-progress">
			<div class="xp-bar">
				<div class="xp-fill" style="width: {levelProgress.percentage}%"></div>
			</div>
			<span class="xp-label">{levelProgress.needed - levelProgress.current} XP to Level {data.user.level + 1}</span>
		</div>

		<nav class="sidebar-nav">
			<a href="/dashboard" class="nav-item" class:active={isActive('/dashboard')}>
				<span class="nav-icon">📊</span>
				Dashboard
			</a>
			<a href="/learn" class="nav-item">
				<span class="nav-icon">📚</span>
				Learn
			</a>
			<a href="/dashboard/settings" class="nav-item" class:active={isActive('/dashboard/settings')}>
				<span class="nav-icon">⚙️</span>
				Settings
			</a>
			{#if data.user.isAdmin}
				<div class="nav-divider"></div>
				<a href="/admin" class="nav-item">
					<span class="nav-icon">🔐</span>
					Admin
				</a>
			{/if}
		</nav>

		<div class="sidebar-footer">
			<form action="/auth/signout" method="POST">
				<button type="submit" class="btn-signout">
					<span>👋</span> Sign Out
				</button>
			</form>
		</div>
	</aside>

	<!-- Main Content -->
	<main class="main-content">
		{@render children()}
	</main>
</div>

<style>
	.dashboard-layout {
		display: flex;
		min-height: 100vh;
		background: var(--bg-base);
	}

	/* Sidebar */
	.sidebar {
		width: 280px;
		background: var(--bg-elevated);
		border-right: 1px solid var(--border-subtle);
		display: flex;
		flex-direction: column;
		padding: var(--space-6);
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		overflow-y: auto;
	}

	.sidebar-header {
		margin-bottom: var(--space-6);
	}

	.logo {
		text-decoration: none;
	}

	.logo-text {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.logo-accent {
		color: var(--color-primary);
	}

	/* User Profile */
	.user-profile {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		padding: var(--space-4);
		background: var(--bg-surface);
		border-radius: var(--radius-lg);
		margin-bottom: var(--space-4);
	}

	.avatar-wrapper {
		position: relative;
	}

	.avatar, .avatar-placeholder {
		width: 48px;
		height: 48px;
		border-radius: var(--radius-full);
		object-fit: cover;
	}

	.avatar-placeholder {
		background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25rem;
		color: white;
		font-weight: 600;
	}

	.level-badge {
		position: absolute;
		bottom: -4px;
		right: -4px;
		background: var(--color-primary);
		color: white;
		font-size: 0.625rem;
		font-weight: 700;
		padding: 2px 6px;
		border-radius: var(--radius-full);
		border: 2px solid var(--bg-elevated);
	}

	.user-info {
		flex: 1;
		min-width: 0;
	}

	.username {
		display: block;
		font-weight: 600;
		color: var(--text-primary);
		font-size: 0.9375rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.xp-mini {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		font-size: 0.8125rem;
		color: var(--text-secondary);
		margin-top: var(--space-1);
	}

	.xp-icon {
		font-size: 0.875rem;
	}

	/* XP Progress */
	.xp-progress {
		margin-bottom: var(--space-6);
	}

	.xp-bar {
		height: 6px;
		background: var(--bg-surface);
		border-radius: var(--radius-full);
		overflow: hidden;
		margin-bottom: var(--space-2);
	}

	.xp-fill {
		height: 100%;
		background: linear-gradient(90deg, var(--color-primary), var(--color-primary-light));
		border-radius: var(--radius-full);
		transition: width 0.5s ease;
	}

	.xp-label {
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	/* Navigation */
	.sidebar-nav {
		flex: 1;
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3) var(--space-4);
		color: var(--text-secondary);
		text-decoration: none;
		border-radius: var(--radius-md);
		font-size: 0.9375rem;
		font-weight: 500;
		transition: all 0.15s ease;
		margin-bottom: var(--space-1);
	}

	.nav-item:hover {
		background: var(--bg-surface);
		color: var(--text-primary);
	}

	.nav-item.active {
		background: rgba(4, 164, 89, 0.1);
		color: var(--color-primary);
	}

	.nav-icon {
		font-size: 1.125rem;
	}

	.nav-divider {
		height: 1px;
		background: var(--border-subtle);
		margin: var(--space-4) 0;
	}

	/* Footer */
	.sidebar-footer {
		padding-top: var(--space-4);
		border-top: 1px solid var(--border-subtle);
	}

	.btn-signout {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		width: 100%;
		padding: var(--space-3) var(--space-4);
		background: none;
		border: none;
		color: var(--text-muted);
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		border-radius: var(--radius-md);
		transition: all 0.15s ease;
	}

	.btn-signout:hover {
		background: var(--bg-surface);
		color: var(--text-secondary);
	}

	/* Main Content */
	.main-content {
		flex: 1;
		margin-left: 280px;
		padding: var(--space-8);
		min-height: 100vh;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.sidebar {
			width: 100%;
			position: relative;
			height: auto;
			border-right: none;
			border-bottom: 1px solid var(--border-subtle);
		}

		.dashboard-layout {
			flex-direction: column;
		}

		.main-content {
			margin-left: 0;
		}
	}
</style>
