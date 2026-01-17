<script lang="ts">
	import { page } from '$app/state';
	import type { LayoutData } from './$types';
	import LogoConcept1 from '$lib/components/logos/LogoConcept1.svelte';
	import type { Snippet } from 'svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	// Role badge text
	const roleBadge = $derived(data.user?.role === 'super_admin' ? 'Super Admin' : 'Teacher');

	// Check which page is active
	function isActive(path: string): boolean {
		if (path === '/admin') {
			return page.url.pathname === '/admin';
		}
		return page.url.pathname.startsWith(path);
	}
</script>

<div class="admin-layout">
	<!-- Sidebar -->
	<aside class="sidebar">
		<div class="sidebar-header">
			<a href="/" class="logo" data-sveltekit-reload>
				<LogoConcept1 size={28} />
			</a>
			<span class="admin-badge" class:super={data.user?.role === 'super_admin'}>
				{roleBadge}
			</span>
		</div>

		<nav class="sidebar-nav">
			<a href="/admin" class="nav-item" class:active={isActive('/admin')}>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<rect x="3" y="3" width="7" height="7" />
					<rect x="14" y="3" width="7" height="7" />
					<rect x="14" y="14" width="7" height="7" />
					<rect x="3" y="14" width="7" height="7" />
				</svg>
				{data.user?.role === 'super_admin' ? 'Super Admin' : 'Admin'} Dashboard
			</a>

			{#if data.permissions.canManageStudents}
				<a href="/admin/students" class="nav-item" class:active={isActive('/admin/students')}>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
						<circle cx="9" cy="7" r="4" />
						<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
						<path d="M16 3.13a4 4 0 0 1 0 7.75" />
					</svg>
					Students
				</a>
			{/if}

			{#if data.permissions.canManageCourses}
				<a href="/admin/courses" class="nav-item" class:active={isActive('/admin/courses')}>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
						<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
					</svg>
					Courses
				</a>
			{/if}

			{#if data.permissions.canManageSocialMedia}
				<a href="/admin/social-media" class="nav-item" class:active={isActive('/admin/social-media')}>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<rect x="2" y="2" width="20" height="20" rx="5" />
						<circle cx="12" cy="12" r="4" />
						<circle cx="18" cy="6" r="1.5" fill="currentColor" />
					</svg>
					Social Media
				</a>
			{/if}

			{#if data.permissions.canManageContent}
				<a href="/admin/content" class="nav-item" class:active={isActive('/admin/content')}>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
						<polyline points="14 2 14 8 20 8"/>
						<line x1="16" y1="13" x2="8" y2="13"/>
						<line x1="16" y1="17" x2="8" y2="17"/>
					</svg>
					Content
				</a>
			{/if}

			{#if data.permissions.canManageEmail}
				<a href="/admin/emails" class="nav-item" class:active={isActive('/admin/emails')}>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
						<polyline points="22,6 12,13 2,6"/>
					</svg>
					Emails
				</a>
			{/if}

			{#if data.user?.role === 'super_admin'}
				<a href="/admin/financials" class="nav-item" class:active={isActive('/admin/financials')}>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<line x1="12" y1="1" x2="12" y2="23"/>
						<path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
					</svg>
					Financials
				</a>
			{/if}

			<div class="nav-divider"></div>

			<a
				href="/portal"
				class="nav-item portal-link"
			>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
					<polyline points="9 22 9 12 15 12 15 22" />
				</svg>
				Exit to Student Portal
			</a>
		</nav>

		<div class="sidebar-footer">
			<div class="user-info">
				{#if data.user?.image}
					<img src={data.user.image} alt="" class="user-avatar" />
				{:else}
					<div class="user-avatar-placeholder">
						{data.user?.name?.charAt(0) || data.user?.email?.charAt(0) || '?'}
					</div>
				{/if}
				<span class="user-name">{data.user?.name || data.user?.email}</span>
			</div>
			<form action="/auth/signout" method="POST">
				<button type="submit" class="signout-btn" title="Sign out">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
						<polyline points="16 17 21 12 16 7" />
						<line x1="21" y1="12" x2="9" y2="12" />
					</svg>
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
		display: flex;
		align-items: center;
	}

	.admin-badge {
		background: #3b82f6;
		color: white;
		font-size: 0.6rem;
		font-weight: 600;
		padding: 2px 6px;
		border-radius: var(--radius-full);
		text-transform: uppercase;
	}

	.admin-badge.super {
		background: var(--color-primary);
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

	.nav-divider {
		height: 1px;
		background: var(--border-subtle);
		margin: var(--space-4) var(--space-4);
	}

	.portal-link {
		color: var(--text-muted);
	}

	.portal-link:hover {
		color: #f59e0b;
		background: rgba(245, 158, 11, 0.1);
	}

	.sidebar-footer {
		padding: var(--space-4);
		border-top: 1px solid var(--border-subtle);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		flex: 1;
		min-width: 0;
	}

	.user-avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.user-avatar-placeholder {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-weight: 600;
		font-size: 0.875rem;
		flex-shrink: 0;
	}

	.user-name {
		font-size: 0.85rem;
		color: var(--text-secondary);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.signout-btn {
		background: none;
		border: none;
		color: var(--text-muted);
		cursor: pointer;
		padding: var(--space-2);
		border-radius: var(--radius-md);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.15s ease;
	}

	.signout-btn:hover {
		color: #ef4444;
		background: rgba(239, 68, 68, 0.1);
	}

	/* Main Content */
	.main-content {
		flex: 1;
		margin-left: 260px;
		padding: var(--space-8);
		min-width: 0; /* Prevents children from expanding parent beyond viewport */
	}

	/* Responsive */
	@media (max-width: 768px) {
		.sidebar {
			display: none;
		}

		.main-content {
			margin-left: 0;
		}
	}
</style>
