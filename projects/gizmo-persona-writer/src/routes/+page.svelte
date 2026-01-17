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

			<!-- Staff Activity -->
			<div class="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 ring-1 ring-slate-900/5">
				<div class="flex items-center justify-between mb-8">
					<h2 class="text-2xl font-bold">Staff Activity</h2>
					<button class="text-sm font-bold text-slate-400 hover:text-black transition-all">View All Drafts</button>
				</div>
				<div class="space-y-6">
					{#each data.personas.flatMap(p => p.drafts.map(d => ({...d, personaName: p.name}))) as draft}
						<div class="flex gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:bg-white hover:shadow-xl transition-all">
							<div class="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center font-black shrink-0">
								{draft.personaName[0]}
							</div>
							<div class="flex-1 min-width-0">
								<div class="flex items-center justify-between mb-1">
									<div class="font-bold truncate">{draft.title}</div>
									<span class="text-[10px] font-black uppercase text-orange-500 px-2 py-1 bg-orange-50 rounded-md">Pending Review</span>
								</div>
								<p class="text-sm text-slate-400 line-clamp-2 mb-4 leading-relaxed">{draft.content}</p>
								<div class="flex items-center gap-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
									<span>Writer: {draft.personaName}</span>
									<span>•</span>
									<span>{new Date(draft.createdAt).toLocaleDateString()}</span>
								</div>
							</div>
						</div>
					{:else}
						<div class="text-center py-12 text-slate-300 italic font-medium border-2 border-dashed border-slate-100 rounded-3xl">
							No staff activity yet. Setup a schedule to start production.
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Persona Sidebar -->
		<div class="space-y-6">
			<div class="flex items-center justify-between px-2">
				<h2 class="text-2xl font-bold">Your Staff</h2>
				<span class="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase rounded-md">
					{data.personas.length} Active
				</span>
			</div>
			<div class="space-y-4">
				{#each data.personas as persona}
					<div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group">
						<a 
							href="/writer/{persona.id}"
							class="block p-6 hover:bg-slate-50 transition-all"
						>
							<div class="flex items-center justify-between mb-1">
								<div class="font-bold text-lg">{persona.name}</div>
								<div class="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
							</div>
							<div class="text-sm text-slate-400 truncate mb-4">{persona.baseUrl}</div>
							
							<!-- Quick Stats -->
							<div class="flex gap-4 border-t border-slate-50 pt-4">
								<div class="text-center flex-1">
									<div class="text-xs font-bold text-slate-300 uppercase tracking-tighter">Schedules</div>
									<div class="text-sm font-black">{persona.schedules.length}</div>
								</div>
								<div class="text-center flex-1 border-x border-slate-50">
									<div class="text-xs font-bold text-slate-300 uppercase tracking-tighter">Drafts</div>
									<div class="text-sm font-black">{persona.drafts.length}</div>
								</div>
								<div class="text-center flex-1">
									<div class="text-xs font-bold text-slate-300 uppercase tracking-tighter">Brain</div>
									<div class="text-sm font-black">Active</div>
								</div>
							</div>
						</a>

						<!-- Schedule Quick Add -->
						<div class="bg-slate-50 p-4 border-t border-slate-100">
							<form method="POST" action="?/createSchedule" class="flex gap-2">
								<input type="hidden" name="personaId" value={persona.id} />
								<select name="frequency" class="text-[10px] font-bold uppercase p-2 rounded-lg border-none bg-white shadow-sm outline-none flex-1">
									<option value="daily">Daily</option>
									<option value="weekly">Weekly</option>
								</select>
								<select name="channel" class="text-[10px] font-bold uppercase p-2 rounded-lg border-none bg-white shadow-sm outline-none flex-1">
									<option value="blog">Blog</option>
									<option value="twitter">X</option>
								</select>
								<button class="p-2 bg-black text-white rounded-lg hover:bg-slate-800 transition-all">
									<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
										<path d="M12 5v14M5 12h14" />
									</svg>
								</button>
							</form>
						</div>
					</div>
				{:else}
					<div class="p-10 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-slate-400">
						No personas yet. Start Gizmosis to create one.
					</div>
				{/each}
			</div>
		</div>
	</div>
</main>
