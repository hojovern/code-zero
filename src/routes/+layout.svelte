<script lang="ts">
	import '../app.css';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { openLoginModal } from '$lib/stores/auth';
	import LoginModal from '$lib/components/LoginModal.svelte';

	let { children } = $props();

	// Auto-open login modal if ?login=1 is in URL (reactive to URL changes)
	$effect(() => {
		if (page.url.searchParams.get('login') === '1') {
			openLoginModal();
			// Clean up URL
			goto(page.url.pathname, { replaceState: true });
		}
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet" />
</svelte:head>

<main>
	{@render children()}
</main>

<LoginModal />
