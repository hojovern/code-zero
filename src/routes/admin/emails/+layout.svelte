<script lang="ts">
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: any } = $props();

	function isActive(path: string): boolean {
		if (path === '/admin/emails') {
			return $page.url.pathname === '/admin/emails';
		}
		return $page.url.pathname.startsWith(path);
	}
</script>

<div class="email-section">
	<!-- Sub-navigation -->
	<nav class="email-subnav">
		<a href="/admin/emails" class="subnav-item" class:active={isActive('/admin/emails')}>
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<rect x="3" y="3" width="7" height="7" />
				<rect x="14" y="3" width="7" height="7" />
				<rect x="14" y="14" width="7" height="7" />
				<rect x="3" y="14" width="7" height="7" />
			</svg>
			Overview
		</a>
		<a href="/admin/emails/campaigns" class="subnav-item" class:active={isActive('/admin/emails/campaigns')}>
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
				<polyline points="22,6 12,13 2,6"/>
			</svg>
			Campaigns
		</a>
		<a href="/admin/emails/queue" class="subnav-item" class:active={isActive('/admin/emails/queue')}>
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
				<line x1="16" y1="2" x2="16" y2="6"/>
				<line x1="8" y1="2" x2="8" y2="6"/>
				<line x1="3" y1="10" x2="21" y2="10"/>
			</svg>
			Queue
		</a>
		<a href="/admin/emails/sequences" class="subnav-item" class:active={isActive('/admin/emails/sequences')}>
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
			</svg>
			Sequences
		</a>
		<a href="/admin/emails/templates" class="subnav-item" class:active={isActive('/admin/emails/templates')}>
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
				<polyline points="14 2 14 8 20 8"/>
			</svg>
			Templates
		</a>
		<a href="/admin/emails/analytics" class="subnav-item" class:active={isActive('/admin/emails/analytics')}>
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<line x1="18" y1="20" x2="18" y2="10"/>
				<line x1="12" y1="20" x2="12" y2="4"/>
				<line x1="6" y1="20" x2="6" y2="14"/>
			</svg>
			Analytics
		</a>
	</nav>

	<!-- Content -->
	<div class="email-content">
		{@render children()}
	</div>
</div>

<style>
	.email-section {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}

	.email-subnav {
		display: flex;
		gap: var(--space-2);
		padding: var(--space-3);
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		flex-wrap: wrap;
	}

	.subnav-item {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-3);
		color: var(--text-secondary);
		text-decoration: none;
		font-size: 0.875rem;
		font-weight: 500;
		border-radius: var(--radius-md);
		transition: all 0.15s ease;
	}

	.subnav-item:hover {
		background: rgba(255, 255, 255, 0.05);
		color: var(--text-primary);
	}

	.subnav-item.active {
		background: rgba(4, 164, 89, 0.1);
		color: var(--color-primary);
	}

	.email-content {
		flex: 1;
	}
</style>
