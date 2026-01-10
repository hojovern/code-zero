<script lang="ts">
	import '../app.css';
	import { signIn, signOut } from "@auth/sveltekit/client";

	let { data, children } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet" />
</svelte:head>

<header class="p-4 flex justify-between items-center bg-white border-b">
	<a href="/" class="text-xl font-bold">Code Zero</a>
	<nav>
		{#if data.session}
			<div class="flex items-center gap-4">
				<img src={data.session.user?.image} alt={data.session.user?.name} class="w-8 h-8 rounded-full" />
				<span class="text-sm font-medium">{data.session.user?.name}</span>
				<button 
					onclick={() => signOut()} 
					class="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition"
				>
					Sign Out
				</button>
			</div>
		{:else}
			<button 
				onclick={() => signIn("google")} 
				class="px-4 py-2 text-sm bg-black text-white hover:bg-gray-800 rounded-md transition"
			>
				Sign In with Google
			</button>
		{/if}
	</nav>
</header>

<main>
	{@render children()}
</main>

