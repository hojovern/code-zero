<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Use data from server instead of hardcoded syllabus
	const courses = $derived(data.courses || []);
	let expandedCourse = $state<string | null>(null);

	// Set initial expanded course once data is available
	$effect(() => {
		if (!expandedCourse && courses.length > 0) {
			expandedCourse = courses[0].slug;
		}
	});
</script>

<svelte:head>
	<title>Course Content | code:zero</title>
</svelte:head>

<div class="courses-page">
	<header class="page-header">
		<h1>Course Content</h1>
		<p>View and edit course lessons exactly as students see them.</p>
	</header>

	{#if data.error}
		<div class="error-banner">
			<span>⚠️</span> {data.error}
		</div>
	{/if}

	<div class="courses-grid">
		{#each courses as course}
			<div class="course-card" class:expanded={expandedCourse === course.slug}>
				<button
					class="course-header"
					onclick={() => expandedCourse = expandedCourse === course.slug ? null : course.slug}
				>
					<div class="course-info">
						<h2>{course.name}</h2>
						<div class="course-meta-pills">
							<span class="meta-pill">{course.lessonCount} lessons</span>
							<span class="meta-pill">{course.enrollmentCount} students</span>
							{#if course.isSyllabus}
								<span class="meta-pill syllabus">File System Sync</span>
							{/if}
						</div>
					</div>
					<svg
						class="expand-icon"
						class:rotated={expandedCourse === course.slug}
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<polyline points="6 9 12 15 18 9"/>
					</svg>
				</button>

				{#if expandedCourse === course.slug}
					<div class="weeks-list">
						{#if course.weeks && course.weeks.length > 0}
							{#each course.weeks as week}
								<div class="week-section">
									<h3 class="week-title">
										<span class="week-badge">Week {week.week}</span>
										{week.title}
									</h3>
									<ul class="days-list">
										{#each week.days as day}
											<li>
												<a href="/admin/courses/preview/{day.path}" class="day-link">
													<span class="day-number">Day {day.day}</span>
													<span class="day-title">{day.title}</span>
													<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
														<path d="M5 12h14M12 5l7 7-7 7"/>
													</svg>
												</a>
											</li>
										{/each}
									</ul>
								</div>
							{/each}
						{:else}
							<div class="empty-lessons">
								<p>No lessons found for this course in the database.</p>
								<p class="hint">Ensure you have run the "Seed Database" tool or sync syllabus files.</p>
							</div>
						{/if}
					</div>
				{/if}
			</div>
		{:else}
			<div class="empty-state">
				<p>No courses found.</p>
			</div>
		{/each}
	</div>
</div>

<style>
	.courses-page {
		padding: var(--space-6);
		max-width: 1000px;
		margin: 0 auto;
	}

	.page-header {
		margin-bottom: var(--space-8);
	}

	.page-header h1 {
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--text-primary);
		margin: 0 0 var(--space-2);
	}

	.page-header p {
		color: var(--text-muted);
		margin: 0;
	}

	.error-banner {
		padding: var(--space-4);
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.2);
		border-radius: var(--radius-md);
		color: #ef4444;
		margin-bottom: var(--space-6);
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.courses-grid {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.course-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		overflow: hidden;
		transition: border-color 200ms;
	}

	.course-card:hover {
		border-color: var(--border-default);
	}

	.course-card.expanded {
		border-color: var(--color-primary);
	}

	.course-header {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-5);
		background: none;
		border: none;
		cursor: pointer;
		text-align: left;
	}

	.course-info h2 {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 var(--space-2);
	}

	.course-meta-pills {
		display: flex;
		gap: var(--space-2);
		flex-wrap: wrap;
	}

	.meta-pill {
		font-size: 0.7rem;
		padding: 2px 8px;
		background: var(--bg-surface);
		border-radius: var(--radius-sm);
		color: var(--text-muted);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.meta-pill.syllabus {
		color: var(--color-primary-light);
		background: rgba(4, 164, 89, 0.1);
	}

	.expand-icon {
		color: var(--text-muted);
		transition: transform 200ms;
	}

	.expand-icon.rotated {
		transform: rotate(180deg);
	}

	.weeks-list {
		padding: 0 var(--space-5) var(--space-5);
	}

	.week-section {
		margin-bottom: var(--space-5);
	}

	.week-section:last-child {
		margin-bottom: 0;
	}

	.week-title {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--text-secondary);
		margin: 0 0 var(--space-3);
	}

	.week-badge {
		padding: var(--space-1) var(--space-2);
		background: var(--color-primary);
		color: white;
		font-size: 0.6875rem;
		font-weight: 700;
		text-transform: uppercase;
		border-radius: var(--radius-sm);
	}

	.days-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.day-link {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3) var(--space-4);
		margin-bottom: var(--space-1);
		background: var(--bg-surface);
		border-radius: var(--radius-md);
		text-decoration: none;
		transition: all 150ms;
	}

	.day-link:hover {
		background: var(--bg-hover);
		transform: translateX(4px);
	}

	.day-link:hover svg {
		color: var(--color-primary);
	}

	.day-number {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--text-muted);
		min-width: 50px;
	}

	.day-title {
		flex: 1;
		font-size: 0.9375rem;
		color: var(--text-primary);
	}

	.day-link svg {
		color: var(--text-muted);
		opacity: 0;
		transition: all 150ms;
	}

	.day-link:hover svg {
		opacity: 1;
	}

	.empty-lessons, .empty-state {
		padding: var(--space-8);
		text-align: center;
		background: var(--bg-surface);
		border-radius: var(--radius-lg);
		border: 1px dashed var(--border-subtle);
	}

	.empty-lessons p, .empty-state p {
		color: var(--text-muted);
		font-size: 0.875rem;
		margin: 0 0 var(--space-2);
	}

	.hint {
		font-style: italic;
		font-size: 0.75rem !important;
	}
</style>