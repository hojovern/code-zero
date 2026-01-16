<script>
	let { data, form } = $props();
	let url = $state("");
	let processing = $state(false);

	function handleSubmit() {
		processing = true;
	}
</script>

<main class="max-w-5xl mx-auto px-6 py-20">
	<div class="text-center mb-16">
		<h1 class="text-7xl font-black tracking-tighter mb-4 text-black italic">GIZMO</h1>
		<p class="text-xl text-slate-500 font-medium">The Persona Writer. Clone any brand's digital soul.</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
		<div class="lg:col-span-2 space-y-10">
			<!-- Gizmosis Card -->
			<div class="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 ring-1 ring-slate-900/5">
				<h2 class="text-2xl font-bold mb-2">Start Gizmosis</h2>
				<p class="text-slate-500 mb-8">Enter a URL to crawl and build Gizmo's memory brain.</p>
				
				<form method="POST" action="?/gizmosis" onsubmit={handleSubmit} class="flex flex-col sm:flex-row gap-4">
					<input 
						type="url" 
						name="url"
						bind:value={url} 
						required
						placeholder="https://example.com" 
						class="flex-1 px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-black outline-none transition-all text-lg"
					/>
					<button 
						type="submit"
						disabled={!url || processing}
						class="px-10 py-4 bg-black text-white rounded-2xl font-bold hover:bg-slate-800 disabled:bg-slate-300 transition-all shadow-lg text-lg active:scale-95"
					>
						{processing ? "Crawling..." : "Gizmosis"}
					</button>
				</form>

				{#if form?.success}
					<p class="mt-6 p-4 bg-green-50 text-green-700 rounded-xl font-medium text-center">
						Gizmosis complete! Persona saved to memory.
					</p>
				{:else if form?.message}
					<p class="mt-6 p-4 bg-red-50 text-red-700 rounded-xl font-medium text-center">
						{form.message}
					</p>
				{/if}
			</div>

			<!-- Info Grid -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div class="p-8 bg-slate-100 rounded-3xl">
					<h3 class="font-bold text-lg mb-2">Memory Brain</h3>
					<p class="text-slate-500">Stored expertise from your crawled sources. Gizmo remembers everything so you don't have to.</p>
				</div>
				<div class="p-8 bg-slate-100 rounded-3xl">
					<h3 class="font-bold text-lg mb-2">Voice Profiles</h3>
					<p class="text-slate-500">Tone, rhythm, and vocabulary fingerprinting. Content indistinguishable from the original.</p>
				</div>
			</div>
		</div>

		<!-- Persona Sidebar -->
		<div class="space-y-6">
			<h2 class="text-2xl font-bold px-2">Your Personas</h2>
			<div class="space-y-4">
				{#each data.personas as persona}
					<a 
						href="/writer/{persona.id}"
						class="block p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
					>
						<div class="font-bold text-lg">{persona.name}</div>
						<div class="text-sm text-slate-400 truncate">{persona.baseUrl}</div>
						<div class="mt-3 inline-flex items-center text-xs font-bold uppercase tracking-wider text-slate-400">
							<span class="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
							Memory Active
						</div>
					</a>
				{:else}
					<div class="p-10 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-slate-400">
						No personas yet. Start Gizmosis to create one.
					</div>
				{/each}
			</div>
		</div>
	</div>
</main>
