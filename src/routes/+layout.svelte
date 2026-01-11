<script lang="ts">
	import '../app.css';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { openLoginModal, openApplyModal } from '$lib/stores/auth';
	import LoginModal from '$lib/components/LoginModal.svelte';
	import ApplyModal from '$lib/components/ApplyModal.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	// Auto-open login modal if ?login=1 is in URL (reactive to URL changes)
	$effect(() => {
		if (page.url.searchParams.get('login') === '1') {
			openLoginModal();
			// Clean up URL
			goto(page.url.pathname, { replaceState: true });
		}
		if (page.url.searchParams.get('apply') === '1') {
			openApplyModal();
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

<Navbar />

<main>
	{@render children()}
</main>

<Footer />

<LoginModal />
<ApplyModal />
