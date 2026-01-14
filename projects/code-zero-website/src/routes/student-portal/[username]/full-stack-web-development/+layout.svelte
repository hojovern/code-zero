<script lang="ts">
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';

	let { data, children }: { data: LayoutData; children: any } = $props();

	let sidebarOpen = $state(true);

	// Get username from route params
	const username = $derived($page.params.username);

	// Check if a lesson is the current one
	function isCurrentLesson(week: number, day: number): boolean {
		return $page.url.pathname === `/student-portal/${$page.params.username}/full-stack-web-development/week-${week}/day-${day}`;
	}
</script>

<svelte:head>
	<title>{data.currentCourse?.courseName || 'Learn'} | code:zero</title>
</svelte:head>

<div class="learn-layout" class:sidebar-closed={!sidebarOpen}>
	<!-- Sidebar -->
	<aside class="learn-sidebar">
		<div class="sidebar-header">
			<a href="/student-portal/{username}" class="back-link">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M19 12H5M12 19l-7-7 7-7" />
				</svg>
				Student Portal
			</a>
			<button class="toggle-btn" onclick={() => sidebarOpen = !sidebarOpen}>
				{#if sidebarOpen}
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M11 19l-7-7 7-7M18 19l-7-7 7-7" />
					</svg>
				{:else}
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M13 5l7 7-7 7M6 5l7 7-7 7" />
					</svg>
				{/if}
			</button>
		</div>

		<div class="course-info">
			<h2>📚 {data.currentCourse?.courseName}</h2>
			<div class="progress-bar-container">
				<div class="progress-bar" style="width: {data.progressPercent}%"></div>
			</div>
			<span class="progress-text">{data.progressPercent}% complete ({data.completedLessons}/{data.totalLessons})</span>
		</div>

		<nav class="lesson-nav">
			{#each data.lessonsTree as { week, lessons }}
				<div class="week-group">
					<h3>Week {week}</h3>
					<ul>
						{#each lessons as lesson}
							<li>
								<a
									href="/student-portal/{username}/full-stack-web-development/week-{lesson.week}/day-{lesson.day}"
									class="lesson-link"
									class:current={isCurrentLesson(lesson.week, lesson.day)}
									class:completed={lesson.completed}
								>
									<span class="lesson-status">
										{#if lesson.completed}
											✅
										{:else if isCurrentLesson(lesson.week, lesson.day)}
											📍
										{:else}
											⬜
										{/if}
									</span>
									<span class="lesson-title">{lesson.title}</span>
									<span class="lesson-xp">+{lesson.xpReward} XP</span>
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</nav>

		<div class="sidebar-footer">
			<div class="user-info">
				{#if data.user?.role === 'super_admin'}
					<span class="level-badge super-admin">Super Admin</span>
				{:else}
					<span class="level-badge">Lv.{data.user?.level || 1}</span>
				{/if}
				<span class="xp-value">⚡ {data.user?.xpTotal || 0} XP</span>
			</div>
		</div>
	</aside>

	<!-- Main Content -->
	<main class="learn-content">
		{@render children()}
	</main>
</div>

<style>
	.learn-layout {
		display: flex;
		min-height: 100vh;
		background: var(--bg-base);
	}

	/* Sidebar */
	.learn-sidebar {
		width: 300px;
		background: var(--bg-elevated);
		border-right: 1px solid var(--border-subtle);
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		z-index: 10;
		transition: transform 0.3s ease;
	}

	.sidebar-closed .learn-sidebar {
		transform: translateX(-300px);
	}

	.sidebar-header {
		padding: var(--space-4);
		border-bottom: 1px solid var(--border-subtle);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.back-link {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		color: var(--text-muted);
		text-decoration: none;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.back-link:hover {
		color: var(--color-primary);
	}

	.toggle-btn {
		background: none;
		border: none;
		color: var(--text-muted);
		cursor: pointer;
		padding: var(--space-2);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.toggle-btn:hover {
		color: var(--text-primary);
	}

	.course-info {
		padding: var(--space-4);
		border-bottom: 1px solid var(--border-subtle);
	}

	.course-info h2 {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-3);
	}

	.progress-bar-container {
		height: 8px;
		background: var(--bg-base);
		border-radius: var(--radius-full);
		overflow: hidden;
		margin-bottom: var(--space-2);
	}

	.progress-bar {
		height: 100%;
		background: linear-gradient(90deg, var(--color-primary), var(--color-primary-light));
		border-radius: var(--radius-full);
		transition: width 0.5s ease;
	}

	.progress-text {
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	.lesson-nav {
		flex: 1;
		overflow-y: auto;
		padding: var(--space-4);
	}

	.week-group {
		margin-bottom: var(--space-5);
	}

	.week-group h3 {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: var(--text-muted);
		margin-bottom: var(--space-2);
		padding: 0 var(--space-2);
	}

	.week-group ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.lesson-link {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-3);
		color: var(--text-secondary);
		text-decoration: none;
		font-size: 0.875rem;
		border-radius: var(--radius-md);
		transition: all 0.15s ease;
	}

	.lesson-link:hover {
		background: rgba(255, 255, 255, 0.05);
		color: var(--text-primary);
	}

	.lesson-link.current {
		background: rgba(4, 164, 89, 0.1);
		color: var(--color-primary);
	}

	.lesson-link.completed .lesson-title {
		color: var(--text-muted);
	}

	.lesson-status {
		flex-shrink: 0;
		font-size: 0.875rem;
	}

	.lesson-title {
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.lesson-xp {
		font-size: 0.7rem;
		color: var(--text-muted);
		background: var(--bg-base);
		padding: 2px 6px;
		border-radius: var(--radius-sm);
	}

	.sidebar-footer {
		padding: var(--space-4);
		border-top: 1px solid var(--border-subtle);
	}

	.user-info {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.level-badge {
		background: rgba(4, 164, 89, 0.1);
		color: var(--color-primary);
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-md);
		font-size: 0.8rem;
		font-weight: 600;
	}

	.level-badge.super-admin {
		background: rgba(59, 130, 246, 0.1);
		color: #3b82f6;
	}

	.xp-value {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	/* Main Content */
	.learn-content {
		flex: 1;
		margin-left: 300px;
		padding: var(--space-8);
		transition: margin-left 0.3s ease;
	}

	.sidebar-closed .learn-content {
		margin-left: 0;
	}

	/* Mobile */
	@media (max-width: 768px) {
		.learn-sidebar {
			transform: translateX(-300px);
		}

		.learn-layout:not(.sidebar-closed) .learn-sidebar {
			transform: translateX(0);
		}

		.learn-content {
			margin-left: 0;
		}
	}
</style>
