<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	// Format date nicely
	function formatDate(dateStr: string) {
		if (!dateStr) return '—';
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
	}

	// Get status badge class
	function getStatusClass(status: string) {
		switch (status) {
			case 'approved':
				return 'status-approved';
			case 'draft':
				return 'status-draft';
			case 'posted':
				return 'status-posted';
			case 'failed':
				return 'status-failed';
			default:
				return 'status-draft';
		}
	}

	// Truncate caption for preview
	function truncate(text: string, maxLength: number = 150) {
		if (text.length <= maxLength) return text;
		return text.slice(0, maxLength) + '...';
	}

	// Count by status
	let stats = $derived({
		total: data.posts.length,
		draft: data.posts.filter((p) => p.status === 'draft').length,
		approved: data.posts.filter((p) => p.status === 'approved').length,
		posted: data.posts.filter((p) => p.status === 'posted').length
	});

	// Selected post for preview
	let selectedPost = $state<typeof data.posts[0] | null>(null);
</script>

<svelte:head>
	<title>Social Media Queue | {data.user?.role === 'super_admin' ? 'Super Admin' : 'Admin'} | code:zero</title>
</svelte:head>

<div class="social-media-page">
	<header class="page-header">
		<div class="header-title">
		<h1>Social Media Queue</h1>
		<p class="header-subtitle">Manage and approve scheduled posts</p>
		</div>

		{#if stats.draft > 0}
		<form method="POST" action="?/approveAll" use:enhance>
		<button type="submit" class="btn btn-primary">
			Approve All ({stats.draft})
		</button>
		</form>
		{/if}
	</header>

	<!-- Stats -->
	<div class="stats-grid">
		<div class="stat-card">
		<span class="stat-value">{stats.total}</span>
		<span class="stat-label">Total Posts</span>
		</div>
		<div class="stat-card">
		<span class="stat-value stat-draft">{stats.draft}</span>
		<span class="stat-label">Pending Review</span>
		</div>
		<div class="stat-card">
		<span class="stat-value stat-approved">{stats.approved}</span>
		<span class="stat-label">Approved</span>
		</div>
		<div class="stat-card">
		<span class="stat-value stat-posted">{stats.posted}</span>
		<span class="stat-label">Posted</span>
		</div>
		</div>

		<!-- Feedback -->
		{#if form?.success}
		<div class="alert alert-success">
		{#if form.action === 'approved'}
			Post approved successfully
		{:else if form.action === 'rejected'}
			Post returned to drafts
		{:else if form.action === 'approvedAll'}
			{form.count} posts approved
		{/if}
		</div>
		{/if}

		{#if form?.error}
		<div class="alert alert-error">{form.error}</div>
		{/if}

		<!-- Posts Grid -->
		<div class="posts-container">
		<div class="posts-list">
		{#each data.posts as post (post.id)}
			<article class="post-card" class:selected={selectedPost?.id === post.id}>
				<button class="post-card-inner" onclick={() => (selectedPost = post)}>
					<!-- Post Image -->
					<div class="post-image">
						{#if post.image}
							<img src="/social-media/{post.image}" alt="" />
						{:else}
							<div class="no-image">No Image</div>
						{/if}
					</div>

					<!-- Post Info -->
					<div class="post-info">
						<div class="post-header">
							<span class="status-badge {getStatusClass(post.status)}">{post.status}</span>
							<span class="post-date">{formatDate(post.scheduled_date)}</span>
						</div>

						<p class="post-preview">{truncate(post.caption)}</p>

						<div class="post-meta">
							<span class="meta-item">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
									<polyline points="22,6 12,13 2,6" />
								</svg>
								{post.caption_length} chars
							</span>
							<span class="meta-item">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
								</svg>
								{post.hashtag_count} tags
							</span>
						</div>
					</div>
				</button>

				<!-- Actions -->
				<div class="post-actions">
					{#if post.status === 'draft'}
						<form method="POST" action="?/approve" use:enhance>
							<input type="hidden" name="id" value={post.id} />
							<button type="submit" class="btn btn-approve">Approve</button>
						</form>
					{:else if post.status === 'approved'}
						<form method="POST" action="?/reject" use:enhance>
							<input type="hidden" name="id" value={post.id} />
							<button type="submit" class="btn btn-reject">Unapprove</button>
						</form>
					{/if}
				</div>
			</article>
		{:else}
			<div class="empty-state">
				<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<rect x="3" y="3" width="18" height="18" rx="2" />
					<path d="M3 9h18" />
					<path d="M9 21V9" />
				</svg>
				<h3>No posts in queue</h3>
				<p>Create new posts using the Instagram content generator skill.</p>
			</div>
		{/each}
		</div>

		<!-- Preview Panel -->
		{#if selectedPost}
		<aside class="preview-panel">
			<div class="preview-header">
				<h2>Post Preview</h2>
				<button class="close-preview" onclick={() => (selectedPost = null)}>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M18 6L6 18M6 6l12 12" />
					</svg>
				</button>
			</div>

			<div class="preview-content">
				{#if selectedPost.image}
					<img src="/social-media/{selectedPost.image}" alt="" class="preview-image" />
				{/if}

				<div class="preview-details">
					<div class="detail-row">
						<span class="detail-label">Status</span>
						<span class="status-badge {getStatusClass(selectedPost.status)}">{selectedPost.status}</span>
					</div>
					<div class="detail-row">
						<span class="detail-label">Scheduled</span>
						<span class="detail-value">{formatDate(selectedPost.scheduled_date)}</span>
					</div>
					<div class="detail-row">
						<span class="detail-label">Platform</span>
						<span class="detail-value">{selectedPost.platform}</span>
					</div>
					<div class="detail-row">
						<span class="detail-label">Format</span>
						<span class="detail-value">{selectedPost.format}</span>
					</div>
					<div class="detail-row">
						<span class="detail-label">Image URL</span>
						<span class="detail-value {selectedPost.image_url ? '' : 'missing'}">
							{selectedPost.image_url || 'Not set (required for posting)'}
						</span>
					</div>
				</div>

				<div class="preview-caption">
					<h3>Caption</h3>
					<div class="caption-text">{selectedPost.caption}</div>
					<div class="caption-stats">
						{selectedPost.caption_length}/2200 characters
						&middot;
						{selectedPost.hashtag_count}/30 hashtags
					</div>
				</div>

				<div class="preview-actions">
					{#if selectedPost.status === 'draft'}
						<form method="POST" action="?/approve" use:enhance>
							<input type="hidden" name="id" value={selectedPost.id} />
							<button type="submit" class="btn btn-primary btn-full">Approve Post</button>
						</form>
					{:else if selectedPost.status === 'approved'}
						<form method="POST" action="?/reject" use:enhance>
							<input type="hidden" name="id" value={selectedPost.id} />
							<button type="submit" class="btn btn-secondary btn-full">Return to Draft</button>
						</form>
					{/if}
				</div>
			</div>
		</aside>
		{/if}
		</div>
</div>

<style>
	/* Page Container */
	.social-media-page {
		width: 100%;
	}

	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: var(--space-8);
	}

	.header-title h1 {
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-1);
	}

	.header-subtitle {
		color: var(--text-muted);
		font-size: 0.9rem;
	}

	/* Stats */
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: var(--space-4);
		margin-bottom: var(--space-8);
	}

	.stat-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-5);
		text-align: center;
	}

	.stat-value {
		display: block;
		font-size: 2rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-1);
	}

	.stat-label {
		font-size: 0.8rem;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.stat-draft {
		color: #f59e0b;
	}

	.stat-approved {
		color: var(--color-primary);
	}

	.stat-posted {
		color: #3b82f6;
	}

	/* Alerts */
	.alert {
		padding: var(--space-4);
		border-radius: var(--radius-md);
		margin-bottom: var(--space-6);
		font-size: 0.9rem;
	}

	.alert-success {
		background: rgba(4, 164, 89, 0.1);
		border: 1px solid rgba(4, 164, 89, 0.3);
		color: var(--color-primary);
	}

	.alert-error {
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.3);
		color: #ef4444;
	}

	/* Posts Container */
	.posts-container {
		display: flex;
		gap: var(--space-6);
		min-width: 0;
	}

	.posts-list {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	/* Post Card */
	.post-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		overflow: hidden;
		transition: all 0.15s ease;
	}

	.post-card:hover {
		border-color: var(--color-primary);
	}

	.post-card.selected {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 1px var(--color-primary);
	}

	.post-card-inner {
		display: flex;
		gap: var(--space-4);
		padding: var(--space-4);
		background: none;
		border: none;
		width: 100%;
		text-align: left;
		cursor: pointer;
	}

	.post-image {
		width: 100px;
		height: 100px;
		border-radius: var(--radius-md);
		overflow: hidden;
		flex-shrink: 0;
		background: var(--bg-base);
	}

	.post-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.no-image {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-muted);
		font-size: 0.75rem;
	}

	.post-info {
		flex: 1;
		min-width: 0;
	}

	.post-header {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		margin-bottom: var(--space-2);
	}

	.status-badge {
		font-size: 0.7rem;
		font-weight: 600;
		padding: 2px 8px;
		border-radius: var(--radius-full);
		text-transform: uppercase;
	}

	.status-draft {
		background: rgba(245, 158, 11, 0.15);
		color: #f59e0b;
	}

	.status-approved {
		background: rgba(4, 164, 89, 0.15);
		color: var(--color-primary);
	}

	.status-posted {
		background: rgba(59, 130, 246, 0.15);
		color: #3b82f6;
	}

	.status-failed {
		background: rgba(239, 68, 68, 0.15);
		color: #ef4444;
	}

	.post-date {
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	.post-preview {
		font-size: 0.9rem;
		color: var(--text-secondary);
		line-height: 1.5;
		margin-bottom: var(--space-3);
	}

	.post-meta {
		display: flex;
		gap: var(--space-4);
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	.post-actions {
		padding: 0 var(--space-4) var(--space-4);
		display: flex;
		gap: var(--space-2);
	}

	/* Buttons */
	.btn {
		padding: var(--space-2) var(--space-4);
		border-radius: var(--radius-md);
		font-size: 0.85rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.15s ease;
		border: none;
	}

	.btn-primary {
		background: var(--color-primary);
		color: white;
	}

	.btn-primary:hover {
		background: var(--color-primary-light);
	}

	.btn-secondary {
		background: var(--bg-base);
		color: var(--text-secondary);
		border: 1px solid var(--border-subtle);
	}

	.btn-secondary:hover {
		border-color: var(--text-muted);
	}

	.btn-approve {
		background: rgba(4, 164, 89, 0.15);
		color: var(--color-primary);
	}

	.btn-approve:hover {
		background: rgba(4, 164, 89, 0.25);
	}

	.btn-reject {
		background: rgba(239, 68, 68, 0.1);
		color: #ef4444;
	}

	.btn-reject:hover {
		background: rgba(239, 68, 68, 0.2);
	}

	.btn-full {
		width: 100%;
	}

	/* Preview Panel */
	.preview-panel {
		width: 320px;
		flex-shrink: 0;
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		position: sticky;
		top: var(--space-8);
		max-height: calc(100vh - var(--space-16));
		overflow-y: auto;
	}

	.preview-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-4);
		border-bottom: 1px solid var(--border-subtle);
	}

	.preview-header h2 {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.close-preview {
		background: none;
		border: none;
		color: var(--text-muted);
		cursor: pointer;
		padding: var(--space-1);
	}

	.close-preview:hover {
		color: var(--text-primary);
	}

	.preview-content {
		padding: var(--space-4);
	}

	.preview-image {
		width: 100%;
		border-radius: var(--radius-md);
		margin-bottom: var(--space-4);
	}

	.preview-details {
		margin-bottom: var(--space-6);
	}

	.detail-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-2) 0;
		border-bottom: 1px solid var(--border-subtle);
	}

	.detail-label {
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	.detail-value {
		font-size: 0.85rem;
		color: var(--text-secondary);
	}

	.detail-value.missing {
		color: #f59e0b;
		font-size: 0.75rem;
	}

	.preview-caption {
		margin-bottom: var(--space-6);
	}

	.preview-caption h3 {
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.caption-text {
		font-size: 0.85rem;
		color: var(--text-secondary);
		line-height: 1.6;
		white-space: pre-wrap;
		background: var(--bg-base);
		padding: var(--space-4);
		border-radius: var(--radius-md);
		max-height: 300px;
		overflow-y: auto;
	}

	.caption-stats {
		margin-top: var(--space-2);
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	.preview-actions {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	/* Empty State */
	.empty-state {
		text-align: center;
		padding: var(--space-16);
		color: var(--text-muted);
	}

	.empty-state svg {
		margin-bottom: var(--space-4);
		opacity: 0.5;
	}

	.empty-state h3 {
		font-size: 1.1rem;
		color: var(--text-secondary);
		margin-bottom: var(--space-2);
	}

	.empty-state p {
		font-size: 0.9rem;
	}

	/* Responsive */
	@media (max-width: 1400px) {
		.preview-panel {
			width: 280px;
		}
	}

	@media (max-width: 1200px) {
		.preview-panel {
			display: none;
		}
	}

	@media (max-width: 768px) {
		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
