<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let name = $state('');
	let subject = $state('');
	let previewText = $state('');
	let htmlContent = $state(`<h1>Hello {{firstName}},</h1>

<p>Your email content goes here. Use {{variables}} for personalization.</p>

<p style="text-align: center; margin: 32px 0;">
  <a href="https://codezero.my" class="button" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #04A459 0%, #038f4d 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600;">Apply Now</a>
</p>

<p>Best,<br>The code:zero team</p>`);
	let textContent = $state('');
	let previewMode = $state<'desktop' | 'mobile'>('desktop');

	// AI generation state
	let aiPrompt = $state('');
	let generating = $state(false);

	// Character counters
	const subjectLength = $derived(subject.length);
	const previewTextLength = $derived(previewText.length);

	async function generateWithAI() {
		if (!aiPrompt.trim()) return;
		generating = true;

		// TODO: Call AI endpoint
		// For now, just set some example content
		await new Promise((r) => setTimeout(r, 1500));

		name = 'AI Generated: ' + aiPrompt;
		subject = 'Ship your product in 4 weeks';
		previewText = 'Join 12 builders in Penang this March';
		htmlContent = `<h1>Ready to finally ship, {{firstName}}?</h1>

<p>You've been thinking about building that product for months. The March intake is your chance to finally make it happen.</p>

<h2>What you'll build:</h2>
<ul>
  <li>A real, working product in 4 weeks</li>
  <li>Full-stack web app with AI features</li>
  <li>Landing page that converts</li>
</ul>

<p style="text-align: center; margin: 32px 0;">
  <a href="https://codezero.my/apply" class="button" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #04A459 0%, #038f4d 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600;">Apply Now - 4 Spots Left</a>
</p>

<p>See you in Penang,<br>The code:zero team</p>`;

		generating = false;
	}
</script>

<svelte:head>
	<title>New Campaign | Email Marketing | code:zero Admin</title>
</svelte:head>

<header class="page-header">
	<a href="/admin/emails/campaigns" class="back-link">
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<polyline points="15 18 9 12 15 6"/>
		</svg>
		Back to Campaigns
	</a>
	<h1>New Campaign</h1>
</header>

{#if data.aiMode}
	<div class="ai-section">
		<div class="ai-header">
			<span class="ai-badge">AI Powered</span>
			<h2>Generate with AI</h2>
			<p>Describe your campaign and we'll generate content based on your top performers</p>
		</div>
		<div class="ai-input-group">
			<input
				type="text"
				placeholder="e.g., Promote March intake to people who viewed pricing page"
				bind:value={aiPrompt}
			/>
			<button class="btn btn-ai" onclick={generateWithAI} disabled={generating || !aiPrompt.trim()}>
				{#if generating}
					<svg class="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="12" cy="12" r="10"/>
					</svg>
					Generating...
				{:else}
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M12 2L2 7l10 5 10-5-10-5z"/>
						<path d="M2 17l10 5 10-5"/>
						<path d="M2 12l10 5 10-5"/>
					</svg>
					Generate
				{/if}
			</button>
		</div>
	</div>
{/if}

<form method="POST" action="?/save" use:enhance class="campaign-form">
	<div class="form-layout">
		<!-- Editor Column -->
		<div class="editor-column">
			<div class="form-section">
				<h3>Campaign Details</h3>
				<div class="form-group">
					<label for="name">Campaign Name</label>
					<input type="text" id="name" name="name" bind:value={name} placeholder="e.g., March Intake Announcement" required />
				</div>
			</div>

			<div class="form-section">
				<h3>Email Content</h3>
				<div class="form-group">
					<label for="subject">
						Subject Line
						<span class="char-count" class:warning={subjectLength > 50}>{subjectLength}/50</span>
					</label>
					<input type="text" id="subject" name="subject" bind:value={subject} placeholder="e.g., Ship your product in 4 weeks" required />
				</div>

				<div class="form-group">
					<label for="previewText">
						Preview Text
						<span class="char-count" class:warning={previewTextLength > 90}>{previewTextLength}/90</span>
					</label>
					<input type="text" id="previewText" name="previewText" bind:value={previewText} placeholder="e.g., Join 12 builders in Penang..." />
				</div>

				<div class="form-group">
					<label for="htmlContent">HTML Content</label>
					<textarea id="htmlContent" name="htmlContent" bind:value={htmlContent} rows="15" required></textarea>
					<p class="form-hint">Use {"{{firstName}}"}, {"{{name}}"}, {"{{email}}"} for personalization</p>
				</div>

				<div class="form-group">
					<label for="textContent">Plain Text (optional)</label>
					<textarea id="textContent" name="textContent" bind:value={textContent} rows="6" placeholder="Auto-generated if left empty"></textarea>
				</div>
			</div>
		</div>

		<!-- Preview Column -->
		<div class="preview-column">
			<div class="preview-header">
				<h3>Preview</h3>
				<div class="preview-toggle">
					<button type="button" class:active={previewMode === 'desktop'} onclick={() => (previewMode = 'desktop')}>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
							<line x1="8" y1="21" x2="16" y2="21"/>
							<line x1="12" y1="17" x2="12" y2="21"/>
						</svg>
					</button>
					<button type="button" class:active={previewMode === 'mobile'} onclick={() => (previewMode = 'mobile')}>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
							<line x1="12" y1="18" x2="12.01" y2="18"/>
						</svg>
					</button>
				</div>
			</div>
			<div class="preview-frame" class:mobile={previewMode === 'mobile'}>
				<div class="preview-email-header">
					<div class="preview-from">From: code:zero</div>
					<div class="preview-subject">{subject || 'Subject line'}</div>
					<div class="preview-preheader">{previewText || 'Preview text'}</div>
				</div>
				<div class="preview-content">
					{@html htmlContent}
				</div>
			</div>
		</div>
	</div>

	<!-- Form Actions -->
	<div class="form-actions">
		<a href="/admin/emails/campaigns" class="btn btn-secondary">Cancel</a>
		<div class="action-group">
			<button type="submit" name="status" value="draft" class="btn btn-secondary">
				Save as Draft
			</button>
			<button type="submit" name="status" value="review" class="btn btn-primary">
				Save & Continue
			</button>
		</div>
	</div>
</form>

<style>
	.page-header {
		margin-bottom: var(--space-6);
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: var(--space-1);
		color: var(--text-muted);
		text-decoration: none;
		font-size: 0.875rem;
		margin-bottom: var(--space-2);
	}

	.back-link:hover {
		color: var(--color-primary);
	}

	.page-header h1 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	/* AI Section */
	.ai-section {
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%);
		border: 1px solid rgba(139, 92, 246, 0.3);
		border-radius: var(--radius-lg);
		padding: var(--space-6);
		margin-bottom: var(--space-6);
	}

	.ai-header {
		margin-bottom: var(--space-4);
	}

	.ai-badge {
		display: inline-block;
		font-size: 0.65rem;
		font-weight: 600;
		padding: 2px 8px;
		background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
		color: white;
		border-radius: var(--radius-full);
		text-transform: uppercase;
		margin-bottom: var(--space-2);
	}

	.ai-header h2 {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 4px;
	}

	.ai-header p {
		font-size: 0.875rem;
		color: var(--text-muted);
	}

	.ai-input-group {
		display: flex;
		gap: var(--space-3);
	}

	.ai-input-group input {
		flex: 1;
		padding: var(--space-3);
		background: var(--bg-base);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		font-size: 0.875rem;
		color: var(--text-primary);
	}

	.btn-ai {
		background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
		color: white;
		white-space: nowrap;
	}

	.btn-ai:disabled {
		opacity: 0.6;
	}

	.spinner {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	/* Form Layout */
	.form-layout {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-6);
		margin-bottom: var(--space-6);
	}

	.editor-column {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}

	.form-section {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-5);
	}

	.form-section h3 {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-4);
	}

	.form-group {
		margin-bottom: var(--space-4);
	}

	.form-group:last-child {
		margin-bottom: 0;
	}

	.form-group label {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-secondary);
		margin-bottom: var(--space-2);
	}

	.char-count {
		font-size: 0.75rem;
		font-weight: normal;
		color: var(--text-muted);
	}

	.char-count.warning {
		color: #f59e0b;
	}

	.form-group input,
	.form-group textarea {
		width: 100%;
		padding: var(--space-3);
		background: var(--bg-base);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		font-size: 0.875rem;
		color: var(--text-primary);
		font-family: inherit;
	}

	.form-group textarea {
		resize: vertical;
		font-family: 'Monaco', 'Menlo', monospace;
		font-size: 0.8rem;
	}

	.form-group input:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: var(--color-primary);
	}

	.form-hint {
		font-size: 0.75rem;
		color: var(--text-muted);
		margin-top: var(--space-1);
	}

	/* Preview Column */
	.preview-column {
		position: sticky;
		top: var(--space-4);
		height: fit-content;
	}

	.preview-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-3);
	}

	.preview-header h3 {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.preview-toggle {
		display: flex;
		gap: 2px;
		padding: 2px;
		background: var(--bg-elevated);
		border-radius: var(--radius-md);
		border: 1px solid var(--border-subtle);
	}

	.preview-toggle button {
		padding: var(--space-2);
		background: transparent;
		border: none;
		color: var(--text-muted);
		cursor: pointer;
		border-radius: var(--radius-sm);
		transition: all 0.15s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.preview-toggle button:hover {
		color: var(--text-primary);
	}

	.preview-toggle button.active {
		background: var(--bg-base);
		color: var(--color-primary);
	}

	.preview-frame {
		background: #f5f5f5;
		border-radius: var(--radius-lg);
		overflow: hidden;
		transition: all 0.3s ease;
	}

	.preview-frame.mobile {
		max-width: 375px;
		margin: 0 auto;
	}

	.preview-email-header {
		background: white;
		padding: var(--space-4);
		border-bottom: 1px solid #e5e5e5;
	}

	.preview-from {
		font-size: 0.75rem;
		color: #666;
		margin-bottom: 4px;
	}

	.preview-subject {
		font-size: 0.875rem;
		font-weight: 600;
		color: #1a1a1a;
		margin-bottom: 2px;
	}

	.preview-preheader {
		font-size: 0.8rem;
		color: #999;
	}

	.preview-content {
		background: white;
		padding: var(--space-6);
		font-size: 0.875rem;
		color: #1a1a1a;
		line-height: 1.6;
	}

	.preview-content :global(h1) {
		font-size: 1.25rem;
		font-weight: 700;
		margin-bottom: var(--space-4);
	}

	.preview-content :global(h2) {
		font-size: 1rem;
		font-weight: 600;
		margin: var(--space-4) 0 var(--space-2) 0;
	}

	.preview-content :global(p) {
		margin-bottom: var(--space-3);
	}

	.preview-content :global(ul) {
		margin-left: var(--space-4);
		margin-bottom: var(--space-3);
	}

	.preview-content :global(a) {
		color: #04A459;
	}

	/* Form Actions */
	.form-actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: var(--space-6);
		border-top: 1px solid var(--border-subtle);
	}

	.action-group {
		display: flex;
		gap: var(--space-3);
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-4);
		font-size: 0.875rem;
		font-weight: 600;
		border-radius: var(--radius-md);
		text-decoration: none;
		border: none;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.btn-primary {
		background: var(--color-primary);
		color: white;
	}

	.btn-primary:hover {
		background: var(--color-primary-light);
	}

	.btn-secondary {
		background: var(--bg-elevated);
		color: var(--text-primary);
		border: 1px solid var(--border-subtle);
	}

	.btn-secondary:hover {
		border-color: var(--color-primary);
	}

	@media (max-width: 1024px) {
		.form-layout {
			grid-template-columns: 1fr;
		}

		.preview-column {
			position: static;
		}
	}

	@media (max-width: 640px) {
		.ai-input-group {
			flex-direction: column;
		}

		.form-actions {
			flex-direction: column;
			gap: var(--space-3);
		}

		.action-group {
			width: 100%;
			flex-direction: column;
		}

		.action-group .btn {
			width: 100%;
			justify-content: center;
		}
	}
</style>
