<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	// Type icons
	const typeIcons = {
		social: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="18" cy="6" r="1.5" fill="currentColor"/></svg>`,
		blog: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
		lesson: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`
	};

	// Status colors
	const statusColors = {
		draft: { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' },
		review: { bg: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' },
		approved: { bg: 'rgba(4, 164, 89, 0.15)', color: '#04A459' },
		published: { bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' },
		posted: { bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }
	};

	// Type colors
	const typeColors = {
		social: '#E4405F',
		blog: '#04A459',
		lesson: '#3b82f6'
	};

	function formatDate(dateStr: string | null) {
		if (!dateStr) return '—';
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}

	function applyFilter(type: string, value: string) {
		const url = new URL(window.location.href);
		if (value === 'all') {
			url.searchParams.delete(type);
		} else {
			url.searchParams.set(type, value);
		}
		goto(url.toString(), { replaceState: true });
	}

	// Selected content for preview
	let selectedContent = $state<(typeof data.content)[0] | null>(null);
</script>

<svelte:head>
	<title>Content Pipeline | Admin | code:zero</title>
</svelte:head>

<div class="admin-layout">
	<!-- Sidebar -->
	<aside class="sidebar">
		<div class="sidebar-header">
			<a href="/" class="logo">
				<span class="logo-text">code<span class="logo-accent">:zero</span></span>
			</a>
			<span class="admin-badge">Admin</span>
		</div>

		<nav class="sidebar-nav">
			<a href="/admin" class="nav-item">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<rect x="3" y="3" width="7" height="7" />
					<rect x="14" y="3" width="7" height="7" />
					<rect x="14" y="14" width="7" height="7" />
					<rect x="3" y="14" width="7" height="7" />
				</svg>
				Dashboard
			</a>
			<a href="/admin/content" class="nav-item active">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
					<polyline points="14 2 14 8 20 8"/>
					<line x1="16" y1="13" x2="8" y2="13"/>
					<line x1="16" y1="17" x2="8" y2="17"/>
				</svg>
				Content Pipeline
			</a>
			<a href="/admin/social-media" class="nav-item">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<rect x="2" y="2" width="20" height="20" rx="5" />
					<circle cx="12" cy="12" r="4" />
					<circle cx="18" cy="6" r="1.5" fill="currentColor" />
				</svg>
				Social Media
			</a>
		</nav>

		<div class="sidebar-footer">
			<div class="user-info">
				{#if data.user?.image}
					<img src={data.user.image} alt="" class="user-avatar" />
				{/if}
				<span class="user-name">{data.user?.name || data.user?.email}</span>
			</div>
		</div>
	</aside>

	<!-- Main Content -->
	<main class="main-content">
		<header class="page-header">
			<div class="header-title">
				<h1>Content Pipeline</h1>
				<p class="header-subtitle">Unified view of all content</p>
			</div>
		</header>

		<!-- Stats Row -->
		<div class="stats-grid">
			<div class="stat-card">
				<span class="stat-value">{data.stats.total}</span>
				<span class="stat-label">Total Items</span>
			</div>
			<button class="stat-card stat-clickable" onclick={() => applyFilter('type', 'social')}>
				<span class="stat-value" style="color: {typeColors.social}">{data.stats.byType.social}</span>
				<span class="stat-label">Social Posts</span>
			</button>
			<button class="stat-card stat-clickable" onclick={() => applyFilter('type', 'blog')}>
				<span class="stat-value" style="color: {typeColors.blog}">{data.stats.byType.blog}</span>
				<span class="stat-label">Blog Posts</span>
			</button>
			<button class="stat-card stat-clickable" onclick={() => applyFilter('type', 'lesson')}>
				<span class="stat-value" style="color: {typeColors.lesson}">{data.stats.byType.lesson}</span>
				<span class="stat-label">Lessons</span>
			</button>
		</div>

		<!-- Filter Bar -->
		<div class="filter-bar">
			<div class="filter-group">
				<span class="filter-label">Type:</span>
				<div class="filter-buttons">
					<button
						class="filter-btn"
						class:active={data.filters.type === 'all'}
						onclick={() => applyFilter('type', 'all')}
					>All</button>
					<button
						class="filter-btn"
						class:active={data.filters.type === 'social'}
						onclick={() => applyFilter('type', 'social')}
					>Social</button>
					<button
						class="filter-btn"
						class:active={data.filters.type === 'blog'}
						onclick={() => applyFilter('type', 'blog')}
					>Blog</button>
					<button
						class="filter-btn"
						class:active={data.filters.type === 'lesson'}
						onclick={() => applyFilter('type', 'lesson')}
					>Lessons</button>
				</div>
			</div>

			<div class="filter-group">
				<span class="filter-label">Status:</span>
				<div class="filter-buttons">
					<button
						class="filter-btn"
						class:active={data.filters.status === 'all'}
						onclick={() => applyFilter('status', 'all')}
					>All</button>
					<button
						class="filter-btn"
						class:active={data.filters.status === 'draft'}
						onclick={() => applyFilter('status', 'draft')}
					>Draft ({data.stats.byStatus.draft})</button>
					<button
						class="filter-btn"
						class:active={data.filters.status === 'review'}
						onclick={() => applyFilter('status', 'review')}
					>Review ({data.stats.byStatus.review})</button>
					<button
						class="filter-btn"
						class:active={data.filters.status === 'approved'}
						onclick={() => applyFilter('status', 'approved')}
					>Approved ({data.stats.byStatus.approved})</button>
					<button
						class="filter-btn"
						class:active={data.filters.status === 'published'}
						onclick={() => applyFilter('status', 'published')}
					>Published ({data.stats.byStatus.published + data.stats.byStatus.posted})</button>
				</div>
			</div>
		</div>

		<!-- Feedback -->
		{#if form?.success}
			<div class="alert alert-success">
				Content updated successfully
			</div>
		{/if}

		{#if form?.error}
			<div class="alert alert-error">{form.error}</div>
		{/if}

		<!-- Content Grid -->
		<div class="content-container">
			<div class="content-list">
				{#each data.content as item (item.id)}
					<article class="content-card" class:selected={selectedContent?.id === item.id}>
						<button class="content-card-inner" onclick={() => (selectedContent = item)}>
							<!-- Type Icon -->
							<div class="content-type" style="--type-color: {typeColors[item.type]}">
								{@html typeIcons[item.type]}
							</div>

							<!-- Content Info -->
							<div class="content-info">
								<div class="content-header">
									<span
										class="status-badge"
										style="background: {statusColors[item.status].bg}; color: {statusColors[item.status].color}"
									>
										{item.status}
									</span>
									<span class="content-date">{formatDate(item.scheduledAt || item.createdAt)}</span>
								</div>

								<h3 class="content-title">{item.title}</h3>
								<p class="content-excerpt">{item.excerpt}</p>

								<div class="content-meta">
									<span class="meta-type">{item.type}</span>
									{#if item.metadata.platform}
										<span class="meta-item">{item.metadata.platform}</span>
									{/if}
									{#if item.metadata.week}
										<span class="meta-item">{item.metadata.week}</span>
									{/if}
								</div>
							</div>
						</button>

						<!-- Quick Actions -->
						{#if item.status === 'draft' && item.type === 'social'}
							<div class="content-actions">
								<form method="POST" action="?/approve" use:enhance>
									<input type="hidden" name="id" value={item.id} />
									<input type="hidden" name="type" value={item.type} />
									<button type="submit" class="btn btn-approve">Approve</button>
								</form>
							</div>
						{/if}
					</article>
				{:else}
					<div class="empty-state">
						<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
							<polyline points="14 2 14 8 20 8"/>
						</svg>
						<h3>No content found</h3>
						<p>Try adjusting your filters or create new content.</p>
					</div>
				{/each}
			</div>

			<!-- Preview Panel -->
			{#if selectedContent}
				<aside class="preview-panel">
					<div class="preview-header">
						<h2>Content Details</h2>
						<button class="close-preview" onclick={() => (selectedContent = null)}>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M18 6L6 18M6 6l12 12" />
							</svg>
						</button>
					</div>

					<div class="preview-content">
						<div class="preview-type-badge" style="--type-color: {typeColors[selectedContent.type]}">
							{@html typeIcons[selectedContent.type]}
							<span>{selectedContent.type}</span>
						</div>

						<h3 class="preview-title">{selectedContent.title}</h3>

						<div class="preview-details">
							<div class="detail-row">
								<span class="detail-label">Status</span>
								<span
									class="status-badge"
									style="background: {statusColors[selectedContent.status].bg}; color: {statusColors[selectedContent.status].color}"
								>
									{selectedContent.status}
								</span>
							</div>
							<div class="detail-row">
								<span class="detail-label">Created</span>
								<span class="detail-value">{formatDate(selectedContent.createdAt)}</span>
							</div>
							{#if selectedContent.scheduledAt}
								<div class="detail-row">
									<span class="detail-label">Scheduled</span>
									<span class="detail-value">{formatDate(selectedContent.scheduledAt)}</span>
								</div>
							{/if}
							{#if selectedContent.publishedAt}
								<div class="detail-row">
									<span class="detail-label">Published</span>
									<span class="detail-value">{formatDate(selectedContent.publishedAt)}</span>
								</div>
							{/if}
							<div class="detail-row">
								<span class="detail-label">Path</span>
								<span class="detail-value detail-path">{selectedContent.path}</span>
							</div>
						</div>

						<div class="preview-excerpt">
							<h4>Preview</h4>
							<p>{selectedContent.excerpt}</p>
						</div>

						<!-- Metadata -->
						{#if Object.keys(selectedContent.metadata).length > 0}
							<div class="preview-metadata">
								<h4>Metadata</h4>
								<div class="metadata-grid">
									{#each Object.entries(selectedContent.metadata) as [key, value]}
										{#if value !== null && value !== undefined && value !== ''}
											<div class="metadata-item">
												<span class="metadata-key">{key}</span>
												<span class="metadata-value">
													{Array.isArray(value) ? value.join(', ') : value}
												</span>
											</div>
										{/if}
									{/each}
								</div>
							</div>
						{/if}

						<!-- Actions -->
						<div class="preview-actions">
							{#if selectedContent.type === 'social'}
								<a href="/admin/social-media" class="btn btn-secondary btn-full">
									View in Social Queue
								</a>
							{:else if selectedContent.type === 'blog'}
								<a href={selectedContent.path} class="btn btn-secondary btn-full" target="_blank">
									View Post
								</a>
							{:else if selectedContent.type === 'lesson'}
								<a href="/learn/{selectedContent.metadata.week}/{selectedContent.metadata.day}" class="btn btn-secondary btn-full" target="_blank">
									View Lesson
								</a>
							{/if}

							{#if selectedContent.status === 'draft' && selectedContent.type === 'social'}
								<form method="POST" action="?/approve" use:enhance>
									<input type="hidden" name="id" value={selectedContent.id} />
									<input type="hidden" name="type" value={selectedContent.type} />
									<button type="submit" class="btn btn-primary btn-full">Approve</button>
								</form>
							{/if}
						</div>
					</div>
				</aside>
			{/if}
		</div>
	</main>
</div>

<style>
	/* Layout */
	.admin-layout {
		display: flex;
		min-height: 100vh;
		background: var(--bg-base);
	}

	/* Sidebar */
	.sidebar {
		width: 260px;
		background: var(--bg-elevated);
		border-right: 1px solid var(--border-subtle);
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		z-index: 10;
	}

	.sidebar-header {
		padding: var(--space-6);
		border-bottom: 1px solid var(--border-subtle);
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.logo {
		text-decoration: none;
	}

	.logo-text {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.logo-accent {
		color: var(--color-primary);
	}

	.admin-badge {
		background: var(--color-primary);
		color: white;
		font-size: 0.7rem;
		font-weight: 600;
		padding: 2px 8px;
		border-radius: var(--radius-full);
		text-transform: uppercase;
	}

	.sidebar-nav {
		flex: 1;
		padding: var(--space-4);
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3) var(--space-4);
		color: var(--text-secondary);
		text-decoration: none;
		border-radius: var(--radius-md);
		font-size: 0.9rem;
		font-weight: 500;
		transition: all 0.15s ease;
	}

	.nav-item:hover {
		background: rgba(255, 255, 255, 0.05);
		color: var(--text-primary);
	}

	.nav-item.active {
		background: rgba(4, 164, 89, 0.1);
		color: var(--color-primary);
	}

	.sidebar-footer {
		padding: var(--space-4);
		border-top: 1px solid var(--border-subtle);
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.user-avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
	}

	.user-name {
		font-size: 0.85rem;
		color: var(--text-secondary);
	}

	/* Main Content */
	.main-content {
		flex: 1;
		margin-left: 260px;
		padding: var(--space-8);
	}

	.page-header {
		margin-bottom: var(--space-6);
	}

	.header-title h1 {
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-1);
	}

	.header-subtitle {
		color: var(--text-muted);
		font-size: 0.95rem;
	}

	/* Stats */
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--space-4);
		margin-bottom: var(--space-6);
	}

	.stat-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-5);
		text-align: center;
	}

	.stat-clickable {
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.stat-clickable:hover {
		border-color: var(--color-primary);
		transform: translateY(-1px);
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

	/* Filter Bar */
	.filter-bar {
		display: flex;
		gap: var(--space-8);
		margin-bottom: var(--space-6);
		padding: var(--space-4);
		background: var(--bg-elevated);
		border-radius: var(--radius-lg);
		border: 1px solid var(--border-subtle);
	}

	.filter-group {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.filter-label {
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--text-muted);
	}

	.filter-buttons {
		display: flex;
		gap: var(--space-1);
	}

	.filter-btn {
		padding: var(--space-2) var(--space-3);
		background: transparent;
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		font-size: 0.8rem;
		color: var(--text-secondary);
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.filter-btn:hover {
		border-color: var(--text-muted);
		color: var(--text-primary);
	}

	.filter-btn.active {
		background: var(--color-primary);
		border-color: var(--color-primary);
		color: white;
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

	/* Content Container */
	.content-container {
		display: flex;
		gap: var(--space-6);
	}

	.content-list {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	/* Content Card */
	.content-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		overflow: hidden;
		transition: all 0.15s ease;
	}

	.content-card:hover {
		border-color: var(--color-primary);
	}

	.content-card.selected {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 1px var(--color-primary);
	}

	.content-card-inner {
		display: flex;
		gap: var(--space-4);
		padding: var(--space-4);
		background: none;
		border: none;
		width: 100%;
		text-align: left;
		cursor: pointer;
	}

	.content-type {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: color-mix(in srgb, var(--type-color) 15%, transparent);
		border-radius: var(--radius-md);
		color: var(--type-color);
		flex-shrink: 0;
	}

	.content-info {
		flex: 1;
		min-width: 0;
	}

	.content-header {
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

	.content-date {
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	.content-title {
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-1);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.content-excerpt {
		font-size: 0.85rem;
		color: var(--text-secondary);
		line-height: 1.4;
		margin-bottom: var(--space-2);
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.content-meta {
		display: flex;
		gap: var(--space-3);
	}

	.meta-type {
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		color: var(--text-muted);
		background: var(--bg-base);
		padding: 2px 6px;
		border-radius: var(--radius-sm);
	}

	.meta-item {
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	.content-actions {
		padding: 0 var(--space-4) var(--space-4);
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
		text-decoration: none;
		display: inline-block;
		text-align: center;
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

	.btn-full {
		width: 100%;
	}

	/* Preview Panel */
	.preview-panel {
		width: 380px;
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

	.preview-type-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-3);
		background: color-mix(in srgb, var(--type-color) 15%, transparent);
		border-radius: var(--radius-md);
		color: var(--type-color);
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		margin-bottom: var(--space-3);
	}

	.preview-title {
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-4);
	}

	.preview-details {
		margin-bottom: var(--space-5);
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

	.detail-path {
		font-family: monospace;
		font-size: 0.75rem;
		max-width: 180px;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.preview-excerpt {
		margin-bottom: var(--space-5);
	}

	.preview-excerpt h4,
	.preview-metadata h4 {
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.preview-excerpt p {
		font-size: 0.85rem;
		color: var(--text-secondary);
		line-height: 1.5;
		background: var(--bg-base);
		padding: var(--space-3);
		border-radius: var(--radius-md);
	}

	.preview-metadata {
		margin-bottom: var(--space-5);
	}

	.metadata-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-2);
	}

	.metadata-item {
		background: var(--bg-base);
		padding: var(--space-2);
		border-radius: var(--radius-sm);
	}

	.metadata-key {
		display: block;
		font-size: 0.7rem;
		color: var(--text-muted);
		text-transform: uppercase;
	}

	.metadata-value {
		font-size: 0.8rem;
		color: var(--text-secondary);
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
	@media (max-width: 1200px) {
		.preview-panel {
			display: none;
		}
	}

	@media (max-width: 768px) {
		.sidebar {
			display: none;
		}

		.main-content {
			margin-left: 0;
		}

		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.filter-bar {
			flex-direction: column;
			gap: var(--space-4);
		}
	}
</style>
