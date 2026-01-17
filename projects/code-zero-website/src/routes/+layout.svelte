<script lang="ts">
	import { onMount } from 'svelte';
	import { createSupabaseBrowserClient } from '$lib/supabase/client';
	import '../app.css';
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/state';
	import { openLoginModal, openApplyModal } from '$lib/stores/auth';
	import LoginModal from '$lib/components/LoginModal.svelte';
	import ApplyModal from '$lib/components/ApplyModal.svelte';
	import TasterModal from '$lib/components/TasterModal.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
	const supabase = createSupabaseBrowserClient();

	onMount(() => {
		const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
			console.log(`[AUTH EVENT] ${event} | Session exists: ${!!session}`);
			if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
				// Refresh the page data if the session changes
				invalidate('supabase:auth');
			}
			if (event === 'SIGNED_OUT') {
				// Clear the cache and redirect if needed
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});

	// Hide navbar/footer for student portal and admin (they have their own layouts)
	const hideGlobalNav = $derived.by(() => {
		const path = page.url.pathname;
		return path.startsWith('/portal') || path.startsWith('/admin');
	});

	// Remove preload class after hydration to enable transitions
	$effect(() => {
		document.body.classList.remove('preload');
	});

	// Auto-open login modal if ?login=1 is in URL (reactive to URL changes)
	$effect(() => {
		const searchParams = page.url.searchParams;
		if (searchParams.get('login') === '1') {
			openLoginModal();
			// Clean up URL without losing other params
			const newParams = new URLSearchParams(searchParams);
			newParams.delete('login');
			const newQuery = newParams.toString();
			goto(`${page.url.pathname}${newQuery ? '?' + newQuery : ''}`, { replaceState: true });
		}
		if (searchParams.get('apply') === '1') {
			openApplyModal();
			const newParams = new URLSearchParams(searchParams);
			newParams.delete('apply');
			const newQuery = newParams.toString();
			goto(`${page.url.pathname}${newQuery ? '?' + newQuery : ''}`, { replaceState: true });
		}
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
</svelte:head>

{#if !hideGlobalNav}
	<Navbar />
{/if}

<main>
	{@render children()}
</main>

{#if !hideGlobalNav}
	<Footer />
{/if}

<LoginModal />
<ApplyModal />
<TasterModal />
