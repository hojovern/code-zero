<script lang="ts">
	import type { LayoutData } from './$types';
	import PortalSidebar from '$lib/components/portal/PortalSidebar.svelte';

	let { data, children }: { data: LayoutData; children: any } = $props();

	let sidebarOpen = $state(false);

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	function closeSidebar() {
		sidebarOpen = false;
	}
</script>

<svelte:head>
	<title>Student Portal | code:zero</title>
</svelte:head>

<div class="portal-shell">
	<!-- Mobile Header -->
	<header class="mobile-header">
		<button class="menu-btn" onclick={toggleSidebar} aria-label="Toggle menu">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<line x1="3" y1="6" x2="21" y2="6" />
				<line x1="3" y1="12" x2="21" y2="12" />
				<line x1="3" y1="18" x2="21" y2="18" />
			</svg>
		</button>
		<span class="mobile-title">code:zero</span>
	</header>

	<!-- Backdrop -->
	{#if sidebarOpen}
		<button class="backdrop" onclick={closeSidebar} aria-label="Close menu"></button>
	{/if}

	<!-- Sidebar -->
	<div class="sidebar-wrapper" class:open={sidebarOpen}>
		<PortalSidebar user={data.user} onClose={closeSidebar} />
	</div>

	<!-- Main Content -->
	<main class="portal-content">
		{@render children()}
	</main>
</div>

<style>
	.portal-shell {
		min-height: 100vh;
		background: var(--bg-base);
	}

	/* Mobile Header */
	.mobile-header {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 56px;
		background: var(--bg-elevated);
		border-bottom: 1px solid var(--border-subtle);
		padding: 0 var(--space-4);
		align-items: center;
		gap: var(--space-4);
		z-index: calc(var(--z-sticky) - 1);
	}

	.menu-btn {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		color: var(--text-primary);
		cursor: pointer;
		border-radius: var(--radius-md);
	}

	.menu-btn:hover {
		background: var(--bg-surface);
	}

	.mobile-title {
		font-family: var(--font-heading);
		font-weight: 700;
		font-size: 1.125rem;
		color: var(--text-primary);
	}

	/* Backdrop */
	.backdrop {
		display: none;
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: calc(var(--z-sticky) - 1);
		border: none;
		cursor: pointer;
	}

	/* Sidebar Wrapper */
	.sidebar-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		z-index: var(--z-sticky);
	}

	/* Main Content */
	.portal-content {
		margin-left: 260px;
		min-height: 100vh;
		padding: var(--space-8);
	}

	/* Mobile Styles */
	@media (max-width: 768px) {
		.mobile-header {
			display: flex;
		}

		.backdrop {
			display: block;
			opacity: 0;
			pointer-events: none;
			transition: opacity var(--duration-normal) var(--ease-default);
		}

		.sidebar-wrapper.open + .portal-content ~ .backdrop,
		.portal-shell:has(.sidebar-wrapper.open) .backdrop {
			opacity: 1;
			pointer-events: auto;
		}

		.sidebar-wrapper {
			transform: translateX(-100%);
			transition: transform var(--duration-normal) var(--ease-default);
		}

		.sidebar-wrapper.open {
			transform: translateX(0);
		}

		.portal-content {
			margin-left: 0;
			padding: var(--space-6);
			padding-top: calc(56px + var(--space-6));
		}
	}

	@media (max-width: 480px) {
		.portal-content {
			padding: var(--space-4);
			padding-top: calc(56px + var(--space-4));
		}
	}
</style>
