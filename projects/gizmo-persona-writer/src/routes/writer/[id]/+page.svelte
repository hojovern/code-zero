<script>
	import { enhance } from '$app/forms';
	import { ChevronLeft, Sparkles, Send, Copy, RefreshCcw, GraduationCap, Save, Instagram } from 'lucide-svelte';
    import Tooltip from '$lib/components/Tooltip.svelte';

	let { data, form } = $props();
	let generating = $state(false);
    let learning = $state(false);
    let publishing = $state(false);
    let imagining = $state(false);
	let currentPrompt = $state("");
	
    // Initialize from loaded draft if available
    let generatedContent = $state(data.loadedDraft?.content || "");
    let originalContent = $state(data.loadedDraft?.content || ""); // To track for learning
    let draftId = $state(data.loadedDraft?.id || ""); // To track current draft
    let imageUrl = $state(data.loadedDraft?.imageUrl || ""); // For Instagram

    // Default to Marc Lou if available
    let defaultEditor = data.allPersonas.find(p => p.name === "Marc Lou");
    let selectedEditorId = $state(defaultEditor ? defaultEditor.id : "");

	$effect(() => {
		if (form?.success) {
            if (form.learned) {
                learning = false;
                alert("Gizmo has learned from your edits and draft updated!");
            } else if (form.published) {
                publishing = false;
                alert(`Successfully published to ${form.platform}! ID: ${form.id}`);
            } else if (form.generatedImage) {
                imageUrl = form.imageUrl;
                imagining = false;
            } else {
                generatedContent = form.content;
                originalContent = form.content;
                draftId = form.draftId || "";
                generating = false;
            }
		} else if (form?.message) {
            // Handle errors
            if (publishing) publishing = false;
            if (imagining) imagining = false;
            alert(`Error: ${form.message}`);
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
			<a href="/writer/{data.persona.id}/settings" class="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-all">
				Settings
			</a>
			<button class="px-4 py-2 text-sm bg-black text-white rounded-xl font-bold hover:bg-slate-800 shadow-sm transition-all">
				Publish
			</button>
		</div>
	</header>

	<main class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-73px)]">
		<!-- Sidebar: Scouted Topics & Persona Profile -->
		<aside class="lg:col-span-3 border-r border-slate-100 p-6 space-y-8 bg-slate-50/50">
			<div>
				<h3 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                    Voice Analysis
                    <Tooltip text="Analysis of your brand's voice, tone, and rhythm patterns." />
                </h3>
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
				<h3 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                    Suggested Topics
                    <Tooltip text="Content ideas scouted from your knowledge base." />
                </h3>
				<div class="space-y-3">
					{#each data.topics as topic}
						<form method="POST" action="?/generate" use:enhance={() => { generating = true; }}>
							<input type="hidden" name="topic" value={topic.title} />
                            <input type="hidden" name="editorPersonaId" value={selectedEditorId} />
							<button 
								type="submit"
								class="w-full text-left p-4 bg-white hover:bg-slate-900 hover:text-white rounded-2xl border border-slate-100 shadow-sm transition-all group"
							>
								<div class="text-sm font-bold mb-1 group-hover:text-white">{topic.title}</div>
								<div class="text-[10px] text-slate-400 group-hover:text-slate-400 line-clamp-2">{topic.reasoning}</div>
							</button>
						</form>
					{:else}
						<div class="text-sm text-slate-400 italic">No topics found yet...</div>
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
												placeholder="What should we write today? (e.g. 'Write a Twitter thread about our new launch')"
												class="w-full bg-transparent border-none text-white placeholder-slate-500 focus:ring-0 resize-none text-xl font-medium min-h-[120px] outline-none"
											></textarea>
											
					                        <!-- Controls -->
					                        <div class="flex items-center justify-between mt-4">
												<div class="flex gap-2 items-center">
					                                <!-- Editor Selector -->
					                                <select 
					                                    name="editorPersonaId" 
					                                    bind:value={selectedEditorId}
					                                    class="bg-slate-800 text-slate-300 text-xs font-bold rounded-lg px-3 py-1.5 border-none focus:ring-1 focus:ring-white outline-none appearance-none cursor-pointer"
					                                >
					                                    <option value="">No Editor (Draft Only)</option>
					                                    {#each data.allPersonas as p}
					                                        <option value={p.id} selected={p.name === "Marc Lou"}>{p.name} (Editor)</option>
					                                    {/each}
					                                </select>
					                                <Tooltip text="Select a secondary persona to edit and polish the draft." />
												</div>
					
												<button 
													type="submit"
													disabled={generating}
													class="bg-white text-black px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-200 disabled:bg-slate-700 disabled:text-slate-500 transition-all active:scale-95"
												>
													{#if generating}
														<RefreshCcw class="w-4 h-4 animate-spin" />
														Refining Draft...
													{:else}
														<Send class="w-4 h-4" />
														Generate Draft
													{/if}
												</button>
											</div>
										</form>				</div>

				<!-- Output / Edit Area -->
				<div class="min-h-[400px] border border-slate-100 rounded-[2.5rem] p-10 relative group bg-white shadow-sm">
					{#if generatedContent || originalContent}
						<div class="mb-4 flex items-center justify-between">
							<div class="flex items-center gap-3">
                                <div class="text-[10px] font-black text-slate-300 uppercase tracking-widest">Editorial Board:</div>
                                <div class="flex -space-x-2">
                                    {#each form?.agents || [] as agent}
                                        <div class="w-8 h-8 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-[10px] font-black text-white" title={agent}>
                                            {agent[0]}
                                        </div>
                                    {/each}
                                </div>
                            </div>
                            
                            <!-- Actions: Copy & Learn -->
                            <div class="flex items-center gap-2">
                                <button 
                                    onclick={copyToClipboard}
                                    class="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm text-slate-500 hover:text-black transition-colors"
                                    title="Copy to clipboard"
                                >
                                    <Copy class="w-4 h-4" />
                                </button>
                                
                                <!-- Learning Form -->
                                <form method="POST" action="?/learn" use:enhance={() => { learning = true; }} class="flex items-center gap-2">
                                    <input type="hidden" name="original" value={originalContent} />
                                    <input type="hidden" name="draftId" value={draftId} />
                                    <textarea name="edited" class="hidden" bind:value={generatedContent}></textarea>
                                    
                                    <input 
                                        type="text" 
                                        name="feedback" 
                                        placeholder="Feedback (e.g. 'More technical')..." 
                                        class="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs w-48 focus:ring-1 focus:ring-black outline-none transition-all"
                                    />
                                    
                                    <button 
                                        type="submit"
                                        disabled={learning}
                                        class="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 font-bold text-xs transition-all disabled:opacity-50 whitespace-nowrap"
                                    >
                                        {#if learning}
                                            <RefreshCcw class="w-3 h-3 animate-spin" />
                                            Learning...
                                        {:else}
                                            <GraduationCap class="w-4 h-4" />
                                            Train Persona
                                        {/if}
                                    </button>
                                    <Tooltip text="Save edits to update the draft and teach the AI your preferences." />
                                </form>
                            </div>
						</div>
                        
                        <!-- Editable Area -->
						<textarea
                            bind:value={generatedContent}
                            class="w-full min-h-[500px] resize-y outline-none text-lg leading-relaxed text-slate-700 placeholder-slate-300 border-none focus:ring-0 p-0"
                            placeholder="Start writing or edit the AI output..."
                        ></textarea>

                        <!-- Publish Section -->
                        <div class="mt-8 pt-8 border-t border-slate-100">
                            <h4 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                                Publishing
                                <Tooltip text="Generate visuals and publish directly to social media." />
                            </h4>
                            
                            <!-- Image Generation / Preview -->
                            <div class="mb-6 flex flex-col md:flex-row gap-6">
                                <div class="w-full md:w-48 aspect-square bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                                    {#if imageUrl}
                                        <img src={imageUrl} alt="Generated visual" class="w-full h-full object-cover" />
                                    {:else if imagining}
                                        <div class="text-center p-4">
                                            <RefreshCcw class="w-6 h-6 animate-spin mx-auto mb-2 text-slate-300" />
                                            <p class="text-[10px] font-bold text-slate-400 uppercase">Imagining...</p>
                                        </div>
                                    {:else}
                                        <Sparkles class="w-8 h-8 text-slate-200" />
                                    {/if}
                                </div>
                                <div class="flex-1 space-y-4">
                                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <p class="text-[10px] font-bold text-slate-400 uppercase mb-2 flex items-center">
                                            Visual Director
                                            <Tooltip text="The AI agent that reads your text and directs the art generation." />
                                        </p>
                                        {#if form?.imagePrompt}
                                            <p class="text-xs text-slate-600 italic">"{form.imagePrompt}"</p>
                                        {:else}
                                            <p class="text-xs text-slate-300">Gizmo hasn't imagined a visual for this content yet.</p>
                                        {/if}
                                    </div>
                                    <form method="POST" action="?/generateImage" use:enhance={() => { imagining = true; }}>
                                        <input type="hidden" name="content" value={generatedContent} />
                                        <button 
                                            type="submit"
                                            disabled={imagining || !generatedContent}
                                            class="w-full md:w-auto px-6 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-xs hover:bg-indigo-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {#if imagining}
                                                <RefreshCcw class="w-3 h-3 animate-spin" />
                                                Creating Art...
                                            {:else}
                                                <Sparkles class="w-3 h-3" />
                                                ✨ Imagine Visual
                                            {/if}
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div class="flex gap-4">
                                <form method="POST" action="?/publishToInstagram" use:enhance={() => { publishing = true; }} class="flex-1 bg-slate-50 p-4 rounded-xl flex gap-4 items-center">
                                    <div class="flex-1">
                                        <label for="imageUrl" class="block text-[10px] font-bold uppercase text-slate-400 mb-1">Final Image URL</label>
                                        <input 
                                            type="url" 
                                            name="imageUrl" 
                                            bind:value={imageUrl}
                                            placeholder="https://..." 
                                            class="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
                                        />
                                    </div>
                                    <textarea name="caption" class="hidden" bind:value={generatedContent}></textarea>
                                    <button 
                                        type="submit"
                                        disabled={publishing || !imageUrl}
                                        class="bg-gradient-to-tr from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 disabled:opacity-50 shadow-lg transition-all"
                                    >
                                        {#if publishing}
                                            <RefreshCcw class="w-4 h-4 animate-spin" />
                                            Posting...
                                        {:else}
                                            <Instagram class="w-4 h-4" />
                                            Post to Instagram
                                        {/if}
                                    </button>
                                </form>
                            </div>
                        </div>

					{:else if generating}
						<div class="flex flex-col items-center justify-center h-[300px] space-y-4">
							<div class="w-12 h-12 border-4 border-slate-100 border-t-black rounded-full animate-spin"></div>
							<p class="text-slate-400 font-medium animate-pulse">Writing...</p>
						</div>
					{:else}
						<div class="flex flex-col items-center justify-center h-[300px] text-center space-y-4">
							<div class="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center">
								<Sparkles class="w-8 h-8 text-slate-200" />
							</div>
							<div>
								<h4 class="font-bold text-slate-400">Your content will appear here</h4>
								<p class="text-sm text-slate-300">Select a topic or enter a custom prompt above.</p>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</section>
	</main>
</div>