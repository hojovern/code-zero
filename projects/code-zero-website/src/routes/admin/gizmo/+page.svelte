<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Gizmo Persona Writer | code:zero Admin</title>
</svelte:head>

<header class="page-header">
	<div class="header-title">
		<h1>Gizmo Persona Writer</h1>
		<p class="header-subtitle">Clone and manage your AI persona staff</p>
	</div>
</header>

<div class="gizmo-container">
	<div class="iframe-wrapper">
		<!-- This will point to the standalone Gizmo app -->
		<iframe src="http://localhost:5174" title="Gizmo App" class="gizmo-iframe"></iframe>
	</div>
</div>

<style>
	.page-header {
		margin-bottom: var(--space-6);
	}

	.header-title h1 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.gizmo-container {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		overflow: hidden;
		height: calc(100vh - 250px);
	}

	.iframe-wrapper {
		width: 100%;
		height: 100%;
	}

	.gizmo-iframe {
		width: 100%;
		height: 100%;
		border: none;
	}
</style>
