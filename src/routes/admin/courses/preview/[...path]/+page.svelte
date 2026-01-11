<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { marked } from 'marked';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let isEditMode = $state(false);
	let editContent = $state(data.content);
	let isSaving = $state(false);

	// Configure marked for nice rendering
	marked.setOptions({
		gfm: true,
		breaks: true
	});

	let renderedContent = $derived(marked(editContent) as string);

	function toggleEdit() {
		if (isEditMode) {
			// Exiting edit mode without saving - reset content
			editContent = data.content;
		}
		isEditMode = !isEditMode;
	}

	// Update editContent when data changes (after save)
	$effect(() => {
		editContent = data.content;
	});
</script>

<svelte:head>
	<title>{data.title} | Admin Preview | code:zero</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
</svelte:head>

<!-- Fixed Header -->
<header class="preview-header">
	<div class="header-container">
		<!-- Breadcrumbs -->
		<nav class="breadcrumbs">
			{#each data.breadcrumbs as crumb, i}
				{#if i > 0}
					<span class="sep">/</span>
				{/if}
				{#if i === data.breadcrumbs.length - 1}
					<span class="current">{crumb.label}</span>
				{:else}
					<a href={crumb.href}>{crumb.label}</a>
				{/if}
			{/each}
		</nav>

		<!-- Actions -->
		<div class="header-actions">
			{#if form?.success}
				<span class="save-status success">Saved!</span>
			{/if}
			{#if form?.error}
				<span class="save-status error">{form.error}</span>
			{/if}

			{#if isEditMode}
				<button class="btn btn-secondary" onclick={toggleEdit}>
					Cancel
				</button>
				<form method="POST" action="?/save" use:enhance={() => {
					isSaving = true;
					return async ({ update }) => {
						await update();
						isSaving = false;
						isEditMode = false;
					};
				}}>
					<input type="hidden" name="content" value={editContent} />
					<button type="submit" class="btn btn-primary" disabled={isSaving}>
						{isSaving ? 'Saving...' : 'Save Changes'}
					</button>
				</form>
			{:else}
				<button class="btn btn-primary" onclick={toggleEdit}>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
						<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
					</svg>
					Edit
				</button>
			{/if}
		</div>
	</div>
</header>

<!-- Main Content -->
<div class="preview-container">
	{#if isEditMode}
		<!-- Edit Mode: Split view -->
		<div class="split-view">
			<div class="editor-pane">
				<div class="pane-header">
					<span>Markdown</span>
				</div>
				<textarea
					class="markdown-editor"
					bind:value={editContent}
					placeholder="Write your content in Markdown..."
					spellcheck="false"
				></textarea>
			</div>
			<div class="preview-pane">
				<div class="pane-header">
					<span>Preview</span>
				</div>
				<article class="lesson-content">
					{@html renderedContent}
				</article>
			</div>
		</div>
	{:else}
		<!-- Preview Mode: Full student view -->
		<article class="lesson-content">
			{@html renderedContent}
		</article>
	{/if}
</div>

<style>
	:global(:root) {
		--color-primary: #04A459;
		--color-primary-light: #2ECC71;
		--gradient-accent: linear-gradient(135deg, #04A459 0%, #2ECC71 100%);
		--bg-base: #1a1d23;
		--bg-elevated: #242933;
		--bg-surface: #2e3440;
		--bg-hover: #3b4252;
		--text-primary: #ffffff;
		--text-secondary: #a1a1a1;
		--text-muted: #6b7280;
		--border-subtle: #2e3440;
		--border-default: #3b4252;
		--font-heading: 'Plus Jakarta Sans', system-ui, sans-serif;
		--font-body: 'Inter', system-ui, sans-serif;
		--font-mono: 'JetBrains Mono', monospace;
		--radius-sm: 4px;
		--radius-md: 8px;
		--radius-lg: 12px;
		--radius-xl: 16px;
		--space-1: 0.25rem;
		--space-2: 0.5rem;
		--space-3: 0.75rem;
		--space-4: 1rem;
		--space-5: 1.25rem;
		--space-6: 1.5rem;
		--space-8: 2rem;
		--space-10: 2.5rem;
		--space-12: 3rem;
	}

	/* Header */
	.preview-header {
		position: fixed;
		top: 60px;
		left: 0;
		right: 0;
		z-index: 50;
		background: rgba(26, 29, 35, 0.98);
		backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--border-subtle);
		padding: var(--space-3) var(--space-6);
	}

	.header-container {
		max-width: 1400px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.breadcrumbs {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-size: 0.875rem;
	}

	.breadcrumbs a {
		color: var(--text-muted);
		text-decoration: none;
		transition: color 150ms;
	}

	.breadcrumbs a:hover {
		color: var(--color-primary);
	}

	.breadcrumbs .sep {
		color: var(--text-muted);
	}

	.breadcrumbs .current {
		color: var(--text-secondary);
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.save-status {
		font-size: 0.875rem;
		padding: var(--space-1) var(--space-3);
		border-radius: var(--radius-md);
	}

	.save-status.success {
		background: rgba(4, 164, 89, 0.2);
		color: var(--color-primary);
	}

	.save-status.error {
		background: rgba(239, 68, 68, 0.2);
		color: #ef4444;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-4);
		font-size: 0.875rem;
		font-weight: 600;
		border-radius: var(--radius-md);
		border: none;
		cursor: pointer;
		transition: all 150ms;
	}

	.btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.btn-primary {
		background: var(--gradient-accent);
		color: white;
	}

	.btn-primary:hover:not(:disabled) {
		box-shadow: 0 0 20px rgba(4, 164, 89, 0.3);
	}

	.btn-secondary {
		background: var(--bg-surface);
		color: var(--text-primary);
		border: 1px solid var(--border-subtle);
	}

	.btn-secondary:hover:not(:disabled) {
		border-color: var(--color-primary);
	}

	/* Container */
	.preview-container {
		padding-top: 120px;
		min-height: 100vh;
		background: var(--bg-base);
	}

	/* Split View for Edit Mode */
	.split-view {
		display: grid;
		grid-template-columns: 1fr 1fr;
		height: calc(100vh - 120px);
	}

	.editor-pane,
	.preview-pane {
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.editor-pane {
		border-right: 1px solid var(--border-subtle);
	}

	.pane-header {
		padding: var(--space-3) var(--space-4);
		background: var(--bg-elevated);
		border-bottom: 1px solid var(--border-subtle);
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: var(--text-muted);
	}

	.markdown-editor {
		flex: 1;
		width: 100%;
		padding: var(--space-6);
		background: var(--bg-base);
		border: none;
		color: var(--text-primary);
		font-family: var(--font-mono);
		font-size: 0.9rem;
		line-height: 1.8;
		resize: none;
	}

	.markdown-editor:focus {
		outline: none;
	}

	.preview-pane .lesson-content {
		flex: 1;
		overflow-y: auto;
		padding: var(--space-8);
	}

	/* Lesson Content - Student View Styling */
	.lesson-content {
		max-width: 800px;
		margin: 0 auto;
		padding: var(--space-8) var(--space-6);
		color: var(--text-secondary);
		font-family: var(--font-body);
		font-size: 1rem;
		line-height: 1.8;
	}

	/* Typography */
	.lesson-content :global(h1) {
		font-family: var(--font-heading);
		font-size: 2.5rem;
		font-weight: 800;
		color: var(--text-primary);
		margin: 0 0 var(--space-6);
		letter-spacing: -0.02em;
		line-height: 1.2;
	}

	.lesson-content :global(h2) {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin: var(--space-10) 0 var(--space-4);
		padding-top: var(--space-4);
		border-top: 1px solid var(--border-subtle);
	}

	.lesson-content :global(h3) {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: var(--space-8) 0 var(--space-3);
	}

	.lesson-content :global(h4) {
		font-family: var(--font-heading);
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: var(--space-6) 0 var(--space-3);
	}

	.lesson-content :global(p) {
		margin: 0 0 var(--space-4);
	}

	.lesson-content :global(strong) {
		font-weight: 600;
		color: var(--text-primary);
	}

	.lesson-content :global(em) {
		font-style: italic;
	}

	/* Blockquotes (for taglines) */
	.lesson-content :global(blockquote) {
		border-left: 3px solid var(--color-primary);
		padding-left: var(--space-4);
		margin: var(--space-6) 0;
		font-size: 1.125rem;
		font-style: italic;
		color: var(--text-secondary);
	}

	/* Code */
	.lesson-content :global(code) {
		font-family: var(--font-mono);
		font-size: 0.875em;
		padding: var(--space-1) var(--space-2);
		background: var(--bg-surface);
		border-radius: var(--radius-sm);
		color: var(--color-primary-light);
	}

	.lesson-content :global(pre) {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		padding: var(--space-4);
		overflow-x: auto;
		margin: var(--space-4) 0;
	}

	.lesson-content :global(pre code) {
		background: none;
		padding: 0;
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--text-secondary);
	}

	/* Lists */
	.lesson-content :global(ul),
	.lesson-content :global(ol) {
		margin: 0 0 var(--space-4);
		padding-left: var(--space-6);
	}

	.lesson-content :global(li) {
		margin-bottom: var(--space-2);
	}

	.lesson-content :global(li strong) {
		color: var(--text-primary);
	}

	/* Tables */
	.lesson-content :global(table) {
		width: 100%;
		border-collapse: collapse;
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		overflow: hidden;
		margin: var(--space-4) 0;
	}

	.lesson-content :global(th),
	.lesson-content :global(td) {
		padding: var(--space-3) var(--space-4);
		text-align: left;
		border-bottom: 1px solid var(--border-subtle);
	}

	.lesson-content :global(th) {
		background: var(--bg-surface);
		font-weight: 600;
		color: var(--text-primary);
		font-size: 0.875rem;
	}

	.lesson-content :global(td) {
		font-size: 0.9375rem;
	}

	.lesson-content :global(tr:last-child td) {
		border-bottom: none;
	}

	/* Links */
	.lesson-content :global(a) {
		color: var(--color-primary);
		text-decoration: none;
	}

	.lesson-content :global(a:hover) {
		text-decoration: underline;
	}

	/* Horizontal Rule */
	.lesson-content :global(hr) {
		border: none;
		border-top: 1px solid var(--border-subtle);
		margin: var(--space-8) 0;
	}

	/* Checkbox Lists */
	.lesson-content :global(ul li input[type="checkbox"]) {
		margin-right: var(--space-2);
		accent-color: var(--color-primary);
	}

	/* Images */
	.lesson-content :global(img) {
		max-width: 100%;
		border-radius: var(--radius-md);
		margin: var(--space-4) 0;
	}
</style>
