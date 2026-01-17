<script lang="ts">
	import type { PageData } from './$types';
	import MarkCompleteButton from '$lib/components/MarkCompleteButton.svelte';

	// Import all lesson components statically
	import Block1Lesson from '$lib/components/lessons/ceo-ai-command/Block1Lesson.svelte';
	import Block2Lesson from '$lib/components/lessons/ceo-ai-command/Block2Lesson.svelte';
	import Block3Lesson from '$lib/components/lessons/ceo-ai-command/Block3Lesson.svelte';
	import Block4Lesson from '$lib/components/lessons/ceo-ai-command/Block4Lesson.svelte';
	import Block5Lesson from '$lib/components/lessons/ceo-ai-command/Block5Lesson.svelte';
	import Block6Lesson from '$lib/components/lessons/ceo-ai-command/Block6Lesson.svelte';
	import Day1Lesson from '$lib/components/lessons/Day1Lesson.svelte';
	import Day2Lesson from '$lib/components/lessons/Day2Lesson.svelte';

	let { data }: { data: PageData } = $props();

	// Component mapping
	const lessonComponents: Record<string, Record<number, any>> = {
		'ceo-ai-command': {
			1: Block1Lesson,
			2: Block2Lesson,
			3: Block3Lesson,
			4: Block4Lesson,
			5: Block5Lesson,
			6: Block6Lesson
		},
		'ceo-command-centre': {
			1: Block1Lesson,
			2: Block2Lesson,
			3: Block3Lesson,
			4: Block4Lesson,
			5: Block5Lesson,
			6: Block6Lesson
		},
		'full-stack-web-development': {
			1: Day1Lesson,
			2: Day2Lesson
		}
	};

	// Get the lesson component for current course/day
	const LessonComponent = $derived(() => {
		const courseComponents = lessonComponents[data.courseSlug];
		if (!courseComponents) return null;
		return courseComponents[data.lesson.day] || null;
	});

	// Build URLs for lesson component props
	const backUrl = $derived(`/portal/courses/${data.courseSlug}`);
	const nextUrl = $derived(
		data.navigation.next
			? `/portal/courses/${data.courseSlug}/${data.navigation.next.week}/${data.navigation.next.day}`
			: ''
	);
</script>

<div class="lesson-page">
	<!-- Top Navigation -->
	<nav class="lesson-nav">
		<a href={backUrl} class="back-link">← Back to {data.courseName}</a>

		<div class="lesson-breadcrumb">
			<span class="breadcrumb-item">Week {data.lesson.week}</span>
			<span class="breadcrumb-sep">/</span>
			<span class="breadcrumb-item">Day {data.lesson.day}</span>
		</div>
	</nav>

	<!-- Lesson Content -->
	<div class="lesson-content">
		{#if LessonComponent()}
			<svelte:component
				this={LessonComponent()}
				backUrl={backUrl}
				backLabel={data.courseName}
				nextUrl={nextUrl}
			/>
		{:else}
			<!-- Fallback for lessons without dedicated components -->
			<div class="fallback-content">
				<h1>{data.lesson.title}</h1>
				<p class="lesson-meta">
					Week {data.lesson.week}, Day {data.lesson.day} • {data.lesson.xpReward} XP
				</p>
				<div class="placeholder">
					<span class="placeholder-icon">📝</span>
					<p>Lesson content is being prepared. Check back soon!</p>
				</div>
			</div>
		{/if}
	</div>

	<!-- Bottom Navigation -->
	<footer class="lesson-footer">
		<div class="footer-left">
			{#if data.navigation.prev}
				<a
					href="/portal/courses/{data.courseSlug}/{data.navigation.prev.week}/{data.navigation.prev.day}"
					class="nav-btn prev"
				>
					<span class="nav-arrow">←</span>
					<span class="nav-text">
						<span class="nav-label">Previous</span>
						<span class="nav-title">{data.navigation.prev.title}</span>
					</span>
				</a>
			{/if}
		</div>

		<div class="footer-center">
			<MarkCompleteButton lessonId={data.lesson.id} completed={data.lesson.completed} />
		</div>

		<div class="footer-right">
			{#if data.navigation.next}
				<a
					href="/portal/courses/{data.courseSlug}/{data.navigation.next.week}/{data.navigation.next.day}"
					class="nav-btn next"
				>
					<span class="nav-text">
						<span class="nav-label">Next</span>
						<span class="nav-title">{data.navigation.next.title}</span>
					</span>
					<span class="nav-arrow">→</span>
				</a>
			{/if}
		</div>
	</footer>
</div>

<style>
	.lesson-page {
		max-width: 900px;
		margin: 0 auto;
	}

	/* Top Navigation */
	.lesson-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-6);
		padding-bottom: var(--space-4);
		border-bottom: 1px solid var(--border-subtle);
	}

	.back-link {
		color: var(--text-muted);
		font-size: 0.875rem;
		text-decoration: none;
	}

	.back-link:hover {
		color: var(--color-primary);
	}

	.lesson-breadcrumb {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-size: 0.875rem;
		color: var(--text-muted);
	}

	.breadcrumb-sep {
		opacity: 0.5;
	}

	/* Lesson Content */
	.lesson-content {
		margin-bottom: var(--space-10);
	}

	/* Fallback Content */
	.fallback-content {
		text-align: center;
		padding: var(--space-12);
	}

	.fallback-content h1 {
		font-size: 2rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-3);
	}

	.lesson-meta {
		color: var(--text-muted);
		margin-bottom: var(--space-8);
	}

	.placeholder {
		background: var(--bg-elevated);
		border: 1px dashed var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-10);
	}

	.placeholder-icon {
		font-size: 3rem;
		display: block;
		margin-bottom: var(--space-4);
	}

	.placeholder p {
		color: var(--text-muted);
	}

	/* Footer Navigation */
	.lesson-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--space-4);
		padding: var(--space-6);
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl);
	}

	.footer-left,
	.footer-right {
		flex: 1;
	}

	.footer-right {
		display: flex;
		justify-content: flex-end;
	}

	.footer-center {
		flex-shrink: 0;
	}

	.nav-btn {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3) var(--space-4);
		background: var(--bg-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		text-decoration: none;
		transition: all var(--duration-fast) var(--ease-default);
		max-width: 200px;
	}

	.nav-btn:hover {
		border-color: var(--color-primary);
		background: rgba(4, 164, 89, 0.05);
	}

	.nav-btn.prev .nav-text {
		text-align: left;
	}

	.nav-btn.next .nav-text {
		text-align: right;
	}

	.nav-arrow {
		font-size: 1.25rem;
		color: var(--text-muted);
	}

	.nav-text {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	.nav-label {
		font-size: 0.75rem;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.nav-title {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-primary);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* Mobile */
	@media (max-width: 640px) {
		.lesson-footer {
			flex-direction: column;
			gap: var(--space-4);
		}

		.footer-left,
		.footer-right {
			width: 100%;
		}

		.nav-btn {
			max-width: none;
			width: 100%;
			justify-content: center;
		}

		.footer-center {
			order: -1;
			width: 100%;
		}

		.footer-center :global(button),
		.footer-center :global(.completed-badge) {
			width: 100%;
			justify-content: center;
		}
	}
</style>
