<script>
	import { enhance } from '$app/forms';
	import { ChevronLeft, Sparkles, Send, Copy, RefreshCcw } from 'lucide-svelte';

	let { data, form } = $props();
	let generating = $state(false);
	let currentPrompt = $state("");
	let generatedContent = $state("");

	$effect(() => {
		if (form?.success) {
			generatedContent = form.content;
			generating = false;
		}
	});

	function copyToClipboard() {
		navigator.clipboard.writeText(generatedContent);
		alert("Copied to clipboard!");
	}
</script>

<div class="min-h-screen bg-white">
	<!-- Top Bar -->
	<header class="border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 bg-white z-10">
		<div class="flex items-center gap-4">
			<a href="/" class="p-2 hover:bg-slate-50 rounded-full transition-colors">
				<ChevronLeft class="w-5 h-5" />
			</a>
			<div>
				<h1 class="font-bold text-lg">{data.persona.name}</h1>
				<p class="text-xs text-slate-400 uppercase tracking-widest font-bold">Writer Studio</p>
			</div>
		</div>
		<div class="flex items-center gap-3">
			<button class="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-all">
				Settings
			</button>
			<button class="px-4 py-2 text-sm bg-black text-white rounded-xl font-bold hover:bg-slate-800 shadow-sm transition-all">
				Publish
			</button>
		</div>
	</header>

	<main class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-73px)]">
		<!-- Sidebar: Scouted Topics & Persona Profile -->
		<aside class="lg:col-span-3 border-r border-slate-100 p-6 space-y-8 bg-slate-50/50">
			<div>
				<h3 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Voice Fingerprint</h3>
				<div class="space-y-3">
					<div class="p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
						<div class="text-[10px] font-bold text-slate-400 uppercase mb-1">Tone</div>
						<div class="text-sm font-medium leading-tight">{data.persona.styleProfile?.tone || "Analyzing..."}</div>
					</div>
					<div class="p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
						<div class="text-[10px] font-bold text-slate-400 uppercase mb-1">Rhythm</div>
						<div class="text-sm font-medium">{data.persona.styleProfile?.rhythm || "Mixed"}</div>
					</div>
				</div>
			</div>

			<div>
				<h3 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Scouted Topics</h3>
				<div class="space-y-3">
					{#each data.topics as topic}
						<form method="POST" action="?/generate" use:enhance={() => { generating = true; }}>
							<input type="hidden" name="topic" value={topic.title} />
							<button 
								type="submit"
								class="w-full text-left p-4 bg-white hover:bg-slate-900 hover:text-white rounded-2xl border border-slate-100 shadow-sm transition-all group"
							>
								<div class="text-sm font-bold mb-1 group-hover:text-white">{topic.title}</div>
								<div class="text-[10px] text-slate-400 group-hover:text-slate-400 line-clamp-2">{topic.reasoning}</div>
							</button>
						</form>
					{:else}
						<div class="text-sm text-slate-400 italic">No topics scouted yet...</div>
					{/each}
				</div>
			</div>
		</aside>

		<!-- Main Editor Area -->
		<section class="lg:col-span-9 p-8 lg:p-12">
			<div class="max-w-3xl mx-auto space-y-8">
				<!-- Prompt Input -->
				<div class="bg-slate-900 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden">
					<div class="absolute top-0 right-0 p-4 opacity-10">
						<Sparkles class="w-12 h-12 text-white" />
					</div>
					<form method="POST" action="?/generate" use:enhance={() => { generating = true; }} class="relative z-10">
						<textarea 
							name="prompt"
							bind:value={currentPrompt}
							placeholder="What should Gizmo write today? (e.g. 'Write a Twitter thread about our new update')"
							class="w-full bg-transparent border-none text-white placeholder-slate-500 focus:ring-0 resize-none text-xl font-medium min-h-[120px] outline-none"
						></textarea>
						<div class="flex items-center justify-between mt-4">
							<div class="flex gap-2">
								<span class="px-3 py-1 bg-slate-800 text-slate-400 text-[10px] font-bold rounded-full uppercase">Persona: {data.persona.name}</span>
								<span class="px-3 py-1 bg-slate-800 text-slate-400 text-[10px] font-bold rounded-full uppercase">Brain Active</span>
							</div>
							<button 
								type="submit"
								disabled={generating || !currentPrompt}
								class="bg-white text-black px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-200 disabled:bg-slate-700 disabled:text-slate-500 transition-all active:scale-95"
							>
								{#if generating}
									<RefreshCcw class="w-4 h-4 animate-spin" />
									Generating...
								{:else}
									<Send class="w-4 h-4" />
									Write
								{/if}
							</button>
						</div>
					</form>
				</div>

				<!-- Output Area -->
				<div class="min-h-[400px] border border-slate-100 rounded-[2.5rem] p-10 relative group">
					{#if generatedContent}
						<div class="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
							<button 
								onclick={copyToClipboard}
								class="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm"
								title="Copy to clipboard"
							>
								<Copy class="w-4 h-4 text-slate-600" />
							</button>
						</div>
						<div class="prose prose-slate max-w-none">
							<div class="whitespace-pre-wrap text-lg leading-relaxed text-slate-700">
								{generatedContent}
							</div>
						</div>
					{:else if generating}
						<div class="flex flex-col items-center justify-center h-[300px] space-y-4">
							<div class="w-12 h-12 border-4 border-slate-100 border-t-black rounded-full animate-spin"></div>
							<p class="text-slate-400 font-medium animate-pulse">Gizmo is accessing the Brain...</p>
						</div>
					{:else}
						<div class="flex flex-col items-center justify-center h-[300px] text-center space-y-4">
							<div class="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center">
								<Sparkles class="w-8 h-8 text-slate-200" />
							</div>
							<div>
								<h4 class="font-bold text-slate-400">Your content will appear here</h4>
								<p class="text-sm text-slate-300">Select a scouted topic or enter a custom prompt above.</p>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</section>
	</main>
</div>
