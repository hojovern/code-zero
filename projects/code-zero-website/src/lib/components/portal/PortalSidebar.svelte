<script lang="ts">
	import { page } from '$app/stores';
	import { getLevelProgress } from '$lib/config/gamification';

	interface User {
		username: string;
		name: string | null;
		avatarUrl: string | null;
		xpTotal: number;
		level: number;
		canAccessAdmin: boolean;
	}

	let { user, onClose }: { user: User; onClose?: () => void } = $props();

	const levelProgress = $derived(getLevelProgress(user.xpTotal, user.level));

	const navItems = [
		{ href: '/portal', icon: '🏠', label: 'Dashboard', exact: true },
		{ href: '/portal/courses', icon: '📚', label: 'My Courses' },
		{ href: '/portal/achievements', icon: '🏆', label: 'Achievements' },
		{ href: '/portal/settings', icon: '⚙️', label: 'Settings' }
	];

	function isActive(href: string, exact: boolean = false): boolean {
		const path = $page.url.pathname;
		if (exact) return path === href;
		return path.startsWith(href);
	}
</script>

<aside class="sidebar">
	<!-- User Card -->
	<div class="user-card">
		<div class="avatar">
			{#if user.avatarUrl}
				<img src={user.avatarUrl} alt={user.name || user.username} />
			{:else}
				<span class="avatar-fallback">{(user.name || user.username).charAt(0).toUpperCase()}</span>
			{/if}
		</div>
		<div class="user-info">
			<span class="user-name">{user.name || user.username}</span>
			<span class="user-level">Level {user.level}</span>
		</div>
	</div>

	<!-- XP Progress -->
	<div class="xp-section">
		<div class="xp-header">
			<span class="xp-label">XP Progress</span>
			<span class="xp-value">{levelProgress.current} / {levelProgress.needed}</span>
		</div>
		<div class="xp-bar">
			<div class="xp-fill" style="width: {levelProgress.percentage}%"></div>
		</div>
	</div>

	<!-- Navigation -->
	<nav class="nav">
		{#each navItems as item}
			<a
				href={item.href}
				class="nav-item"
				class:active={isActive(item.href, item.exact)}
				onclick={onClose}
			>
				<span class="nav-icon">{item.icon}</span>
				<span class="nav-label">{item.label}</span>
			</a>
		{/each}
	</nav>

	<!-- Admin Link -->
	{#if user.canAccessAdmin}
		<div class="admin-section">
			<a href="/admin" class="admin-link">
				<span class="nav-icon">🔧</span>
				<span class="nav-label">Admin Panel</span>
			</a>
		</div>
	{/if}

	<!-- Bottom Actions -->
	<div class="sidebar-footer">
		<a href="/" class="footer-link">
			<span class="nav-icon">🏠</span>
			<span class="nav-label">Back to Site</span>
		</a>
		<form method="POST" action="/api/auth/logout">
			<button type="submit" class="footer-link logout">
				<span class="nav-icon">🚪</span>
				<span class="nav-label">Sign Out</span>
			</button>
		</form>
	</div>
</aside>

<style>
	.sidebar {
		width: 260px;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		background: var(--bg-elevated);
		border-right: 1px solid var(--border-subtle);
		display: flex;
		flex-direction: column;
		padding: var(--space-6);
		contain: strict;
		z-index: var(--z-sticky);
	}

	/* User Card */
	.user-card {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		padding-bottom: var(--space-6);
		border-bottom: 1px solid var(--border-subtle);
		margin-bottom: var(--space-6);
	}

	.avatar {
		width: 48px;
		height: 48px;
		border-radius: var(--radius-full);
		overflow: hidden;
		background: var(--bg-surface);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.avatar-fallback {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-primary);
	}

	.user-info {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	.user-name {
		font-weight: 600;
		color: var(--text-primary);
		font-size: 0.9375rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.user-level {
		font-size: 0.8125rem;
		color: var(--color-primary);
		font-weight: 500;
	}

	/* XP Section */
	.xp-section {
		padding-bottom: var(--space-6);
		border-bottom: 1px solid var(--border-subtle);
		margin-bottom: var(--space-6);
	}

	.xp-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-2);
	}

	.xp-label {
		font-size: 0.75rem;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.xp-value {
		font-size: 0.75rem;
		color: var(--text-secondary);
		font-weight: 500;
	}

	.xp-bar {
		height: 6px;
		background: var(--bg-base);
		border-radius: var(--radius-full);
		overflow: hidden;
	}

	.xp-fill {
		height: 100%;
		background: var(--gradient-accent);
		border-radius: var(--radius-full);
	}

	/* Navigation */
	.nav {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
		flex: 1;
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3) var(--space-4);
		border-radius: var(--radius-lg);
		color: var(--text-secondary);
		text-decoration: none;
		transition: all var(--duration-fast) var(--ease-default);
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
		width: 24px;
		text-align: center;
	}

	.nav-label {
		font-size: 0.9375rem;
		font-weight: 500;
	}

	/* Admin Section */
	.admin-section {
		padding-top: var(--space-4);
		border-top: 1px solid var(--border-subtle);
		margin-top: auto;
	}

	.admin-link {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3) var(--space-4);
		border-radius: var(--radius-lg);
		color: var(--text-muted);
		text-decoration: none;
		transition: all var(--duration-fast) var(--ease-default);
	}

	.admin-link:hover {
		background: var(--bg-surface);
		color: var(--text-primary);
	}

	/* Footer */
	.sidebar-footer {
		padding-top: var(--space-4);
		border-top: 1px solid var(--border-subtle);
		margin-top: var(--space-4);
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.footer-link {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3) var(--space-4);
		border-radius: var(--radius-lg);
		color: var(--text-muted);
		text-decoration: none;
		font-size: 0.875rem;
		font-weight: 500;
		background: none;
		border: none;
		cursor: pointer;
		width: 100%;
		font-family: inherit;
		transition: all var(--duration-fast) var(--ease-default);
	}

	.footer-link:hover {
		background: var(--bg-surface);
		color: var(--text-primary);
	}

	.footer-link.logout:hover {
		color: #ef4444;
	}

	/* Mobile: Hidden by default, shown via parent */
	@media (max-width: 768px) {
		.sidebar {
			transform: translateX(-100%);
			transition: transform var(--duration-normal) var(--ease-default);
		}

		.sidebar.open {
			transform: translateX(0);
		}
	}
</style>
