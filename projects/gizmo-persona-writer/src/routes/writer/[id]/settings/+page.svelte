<script>
	import { enhance } from '$app/forms';
	import { ChevronLeft, Instagram, Save, CheckCircle } from 'lucide-svelte';

	let { data, form } = $props();
    let loading = $state(false);

    let integrations = $derived(data.persona.integrations || {});
    let instagram = $derived(integrations.instagram || { accessToken: '', userId: '' });
</script>

<div class="min-h-screen bg-white">
	<!-- Top Bar -->
	<header class="border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 bg-white z-10">
		<div class="flex items-center gap-4">
			<a href="/writer/{data.persona.id}" class="p-2 hover:bg-slate-50 rounded-full transition-colors">
				<ChevronLeft class="w-5 h-5" />
			</a>
			<div>
				<h1 class="font-bold text-lg">{data.persona.name}</h1>
				<p class="text-xs text-slate-400 uppercase tracking-widest font-bold">Settings</p>
			</div>
		</div>
	</header>

    <main class="max-w-2xl mx-auto px-6 py-12">
        <h2 class="text-2xl font-bold mb-8">Integrations</h2>

        <!-- Instagram Card -->
        <div class="border border-slate-200 rounded-3xl p-8 shadow-sm">
            <div class="flex items-center gap-4 mb-6">
                <div class="w-12 h-12 bg-gradient-to-tr from-purple-500 to-pink-500 text-white rounded-2xl flex items-center justify-center">
                    <Instagram class="w-6 h-6" />
                </div>
                <div>
                    <h3 class="font-bold text-lg">Instagram</h3>
                    <p class="text-sm text-slate-500">Connect your professional account to auto-publish.</p>
                </div>
            </div>

            <form method="POST" action="?/updateInstagram" use:enhance={() => { loading = true; return async ({ update }) => { await update(); loading = false; }; }}>
                <div class="space-y-4">
                    <div>
                        <label for="userId" class="block text-xs font-bold uppercase text-slate-400 mb-1">Instagram User ID</label>
                        <input 
                            type="text" 
                            name="userId" 
                            value={instagram.userId} 
                            placeholder="1784..."
                            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium outline-none focus:ring-2 focus:ring-black transition-all"
                        />
                    </div>
                    <div>
                        <label for="accessToken" class="block text-xs font-bold uppercase text-slate-400 mb-1">Access Token</label>
                        <input 
                            type="password" 
                            name="accessToken" 
                            value={instagram.accessToken} 
                            placeholder="EAA..."
                            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium outline-none focus:ring-2 focus:ring-black transition-all"
                        />
                    </div>
                </div>

                <div class="mt-8 flex items-center justify-between">
                    <div class="text-xs text-slate-400">
                        {#if instagram.userId && instagram.accessToken}
                            <span class="text-green-600 font-bold flex items-center gap-1">
                                <CheckCircle class="w-3 h-3" /> Connected
                            </span>
                        {:else}
                            Not connected
                        {/if}
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        class="bg-black text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 disabled:bg-slate-200 transition-all"
                    >
                        {loading ? "Saving..." : "Save Credentials"}
                    </button>
                </div>
            </form>
        </div>
    </main>
</div>
