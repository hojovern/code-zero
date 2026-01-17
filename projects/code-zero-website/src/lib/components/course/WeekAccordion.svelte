<script lang="ts">
	import { slide } from 'svelte/transition';

	interface Lesson {
		id: string;
		week: number;
		day: number;
		title: string;
		xpReward: number;
		completed: boolean;
	}

	interface WeekData {
		week: number;
		lessons: Lesson[];
	}

	let {
		weekData,
		courseSlug,
		defaultOpen = false
	}: {
		weekData: WeekData;
		courseSlug: string;
		defaultOpen?: boolean;
	} = $props();

	let isOpen = $state(defaultOpen);

	const completedCount = $derived(weekData.lessons.filter(l => l.completed).length);
	const totalCount = $derived(weekData.lessons.length);
	const isComplete = $derived(completedCount === totalCount);
	const progressPercent = $derived(totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0);

	function toggle() {
		isOpen = !isOpen;
	}
</script>

<div class="week-accordion" class:open={isOpen} class:complete={isComplete}>
	<button class="week-header" onclick={toggle} aria-expanded={isOpen}>
		<div class="week-info">
			<span class="week-badge" class:complete={isComplete}>
				{#if isComplete}
					✓
				{:else}
					{weekData.week}
				{/if}
			</span>
			<div class="week-text">
				<span class="week-title">Week {weekData.week}</span>
				<span class="week-meta">{completedCount}/{totalCount} lessons</span>
			</div>
		</div>

		<div class="week-right">
			<div class="week-progress">
				<div class="progress-track">
					<div class="progress-fill" style="width: {progressPercent}%"></div>
				</div>
			</div>
			<span class="chevron" class:open={isOpen}>
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
					<path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
				</svg>
			</span>
		</div>
	</button>

	{#if isOpen}
		<div class="week-content" transition:slide={{ duration: 200 }}>
			<ul class="lessons-list">
				{#each weekData.lessons as lesson}
					<li>
						<a
							href="/portal/courses/{courseSlug}/{weekData.week}/{lesson.day}"
							class="lesson-link"
							class:completed={lesson.completed}
						>
							<span class="lesson-status">
								{#if lesson.completed}
									<span class="check">✓</span>
								{:else}
									<span class="day-num">{lesson.day}</span>
								{/if}
							</span>
							<span class="lesson-title">{lesson.title}</span>
							<span class="lesson-xp">+{lesson.xpReward} XP</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<style>
	.week-accordion {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		overflow: hidden;
		contain: layout style;
	}

	.week-accordion.complete {
		border-color: var(--color-primary);
	}

	/* Header */
	.week-header {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-4) var(--space-5);
		background: none;
		border: none;
		cursor: pointer;
		font-family: inherit;
		text-align: left;
		transition: background var(--duration-fast) var(--ease-default);
	}

	.week-header:hover {
		background: var(--bg-surface);
	}

	.week-info {
		display: flex;
		align-items: center;
		gap: var(--space-4);
	}

	.week-badge {
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--bg-surface);
		border-radius: var(--radius-md);
		font-weight: 700;
		color: var(--text-primary);
		font-size: 0.9375rem;
	}

	.week-badge.complete {
		background: var(--color-primary);
		color: white;
	}

	.week-text {
		display: flex;
		flex-direction: column;
	}

	.week-title {
		font-weight: 600;
		color: var(--text-primary);
		font-size: 1rem;
	}

	.week-meta {
		font-size: 0.8125rem;
		color: var(--text-muted);
	}

	.week-right {
		display: flex;
		align-items: center;
		gap: var(--space-4);
	}

	.week-progress {
		width: 80px;
	}

	.progress-track {
		height: 4px;
		background: var(--bg-base);
		border-radius: var(--radius-full);
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: var(--color-primary);
		border-radius: var(--radius-full);
	}

	.chevron {
		color: var(--text-muted);
		transition: transform var(--duration-fast) var(--ease-default);
	}

	.chevron.open {
		transform: rotate(180deg);
	}

	/* Content */
	.week-content {
		border-top: 1px solid var(--border-subtle);
	}

	.lessons-list {
		list-style: none;
		padding: var(--space-2);
		margin: 0;
	}

	.lesson-link {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3) var(--space-4);
		border-radius: var(--radius-md);
		text-decoration: none;
		transition: background var(--duration-fast) var(--ease-default);
	}

	.lesson-link:hover {
		background: var(--bg-surface);
	}

	.lesson-link.completed {
		opacity: 0.7;
	}

	.lesson-status {
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--bg-surface);
		border-radius: var(--radius-full);
		flex-shrink: 0;
	}

	.lesson-link.completed .lesson-status {
		background: rgba(4, 164, 89, 0.2);
	}

	.day-num {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--text-muted);
	}

	.check {
		color: var(--color-primary);
		font-weight: 700;
		font-size: 0.875rem;
	}

	.lesson-title {
		flex: 1;
		font-size: 0.9375rem;
		color: var(--text-primary);
	}

	.lesson-link.completed .lesson-title {
		text-decoration: line-through;
		color: var(--text-muted);
	}

	.lesson-xp {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-primary);
		background: rgba(4, 164, 89, 0.1);
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-sm);
	}

	/* Mobile */
	@media (max-width: 480px) {
		.week-progress {
			display: none;
		}
	}
</style>
