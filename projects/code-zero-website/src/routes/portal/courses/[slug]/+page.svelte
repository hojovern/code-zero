<script lang="ts">
	import type { PageData } from './$types';
	import WeekAccordion from '$lib/components/course/WeekAccordion.svelte';

	let { data }: { data: PageData } = $props();

	// Find the first incomplete lesson for "Continue" button
	const nextLesson = $derived(() => {
		for (const week of data.lessonsTree) {
			for (const lesson of week.lessons) {
				if (!lesson.completed) {
					return { week: week.week, day: lesson.day, title: lesson.title };
				}
			}
		}
		return null;
	});

	const isComplete = $derived(data.progress.percent === 100);
</script>

<div class="course-page">
	<!-- Course Header -->
	<header class="course-header">
		<a href="/portal/courses" class="back-link">← Back to Courses</a>

		<div class="header-content">
			<div class="header-text">
				<h1>{data.course.name}</h1>
				{#if data.course.description}
					<p class="course-desc">{data.course.description}</p>
				{/if}
			</div>

			<div class="header-actions">
				{#if nextLesson() && !isComplete}
					<a
						href="/portal/courses/{data.course.slug}/{nextLesson()!.week}/{nextLesson()!.day}"
						class="btn btn-primary btn-lg"
					>
						Continue Learning →
					</a>
				{:else if isComplete}
					<span class="complete-badge">🎉 Course Complete!</span>
				{/if}
			</div>
		</div>

		<!-- Progress Bar -->
		<div class="header-progress">
			<div class="progress-info">
				<span class="progress-label">Course Progress</span>
				<span class="progress-value">{data.progress.completed}/{data.progress.total} lessons</span>
			</div>
			<div class="progress-bar">
				<div class="progress-fill" style="width: {data.progress.percent}%"></div>
			</div>
		</div>
	</header>

	<!-- Stats Row -->
	<section class="stats-row">
		<div class="stat-item">
			<span class="stat-value">{data.course.weeks}</span>
			<span class="stat-label">Weeks</span>
		</div>
		<div class="stat-item">
			<span class="stat-value">{data.progress.total}</span>
			<span class="stat-label">Lessons</span>
		</div>
		<div class="stat-item">
			<span class="stat-value">{data.progress.completed}</span>
			<span class="stat-label">Completed</span>
		</div>
		<div class="stat-item">
			<span class="stat-value">{data.progress.percent}%</span>
			<span class="stat-label">Progress</span>
		</div>
	</section>

	<!-- Lessons by Week -->
	<section class="lessons-section">
		<h2>Course Content</h2>

		<div class="weeks-list">
			{#each data.lessonsTree as weekData, i}
				<WeekAccordion
					{weekData}
					courseSlug={data.course.slug}
					defaultOpen={i === 0 || weekData.lessons.some(l => !l.completed && data.lessonsTree.slice(0, i).every(w => w.lessons.every(l => l.completed)))}
				/>
			{/each}
		</div>
	</section>
</div>

<style>
	.course-page {
		max-width: 800px;
		margin: 0 auto;
	}

	/* Header */
	.course-header {
		margin-bottom: var(--space-8);
	}

	.back-link {
		display: inline-block;
		color: var(--text-muted);
		font-size: 0.875rem;
		margin-bottom: var(--space-4);
		text-decoration: none;
	}

	.back-link:hover {
		color: var(--color-primary);
	}

	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: var(--space-6);
		margin-bottom: var(--space-6);
	}

	.header-text h1 {
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.course-desc {
		color: var(--text-secondary);
		font-size: 1rem;
		max-width: 500px;
	}

	.complete-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-5);
		background: rgba(4, 164, 89, 0.15);
		color: var(--color-primary);
		font-weight: 600;
		border-radius: var(--radius-lg);
	}

	/* Progress Bar */
	.header-progress {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-5);
	}

	.progress-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-3);
	}

	.progress-label {
		font-weight: 600;
		color: var(--text-primary);
	}

	.progress-value {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.progress-bar {
		height: 8px;
		background: var(--bg-base);
		border-radius: var(--radius-full);
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: var(--gradient-accent);
		border-radius: var(--radius-full);
	}

	/* Stats Row */
	.stats-row {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--space-4);
		margin-bottom: var(--space-8);
	}

	@media (max-width: 600px) {
		.stats-row {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.stat-item {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-4);
		text-align: center;
	}

	.stat-value {
		display: block;
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.stat-label {
		font-size: 0.75rem;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	/* Lessons Section */
	.lessons-section h2 {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-5);
	}

	.weeks-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	/* Mobile */
	@media (max-width: 600px) {
		.header-content {
			flex-direction: column;
		}

		.header-actions {
			width: 100%;
		}

		.header-actions .btn {
			width: 100%;
		}
	}
</style>
