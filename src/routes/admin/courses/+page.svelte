<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Syllabus structure - hardcoded for now
	const syllabus = [
		{
			course: 'Full Stack Web Development',
			slug: 'full-stack-web-development',
			weeks: [
				{
					week: 1,
					title: 'AI-First Foundation',
					days: [
						{ day: 1, title: 'AI Workspace → Live Website', path: 'week-1/day-1' },
						{ day: 2, title: 'Users Are Real', path: 'week-1/day-2' },
						{ day: 3, title: 'Build the Thing', path: 'week-1/day-3' },
						{ day: 4, title: 'AI Does the Work', path: 'week-1/day-4' },
						{ day: 5, title: 'Your AI Content Engine', path: 'week-1/day-5' }
					]
				},
				{
					week: 2,
					title: 'Production-Ready Features',
					days: [
						{ day: 6, title: 'Advanced Database Patterns', path: 'week-2/day-6' },
						{ day: 7, title: 'Complex UI Patterns', path: 'week-2/day-7' },
						{ day: 8, title: 'File Uploads & Storage', path: 'week-2/day-8' },
						{ day: 9, title: 'Automation with n8n', path: 'week-2/day-9' },
						{ day: 10, title: 'Week Integration & Demo', path: 'week-2/day-10' }
					]
				},
				{
					week: 3,
					title: 'Scale & Polish',
					days: [
						{ day: 11, title: 'Performance & Optimization', path: 'week-3/day-11' },
						{ day: 12, title: 'Testing & Quality', path: 'week-3/day-12' },
						{ day: 13, title: 'SEO & Analytics', path: 'week-3/day-13' },
						{ day: 14, title: 'Security Hardening', path: 'week-3/day-14' },
						{ day: 15, title: 'Production Deploy', path: 'week-3/day-15' }
					]
				},
				{
					week: 4,
					title: 'Launch & Beyond',
					days: [
						{ day: 16, title: 'Launch Prep', path: 'week-4/day-16' },
						{ day: 17, title: 'Marketing & Growth', path: 'week-4/day-17' },
						{ day: 18, title: 'Monetization', path: 'week-4/day-18' },
						{ day: 19, title: 'Final Polish', path: 'week-4/day-19' },
						{ day: 20, title: 'Demo Day', path: 'week-4/day-20' }
					]
				}
			]
		},
		{
			course: 'CEO AI Command',
			slug: 'ceo-ai-command',
			weeks: [
				{
					week: 1,
					title: 'Executive AI Mastery',
					days: [
						{ day: 1, title: 'AI Command Center', path: 'ceo-ai-command/day-1' }
					]
				}
			]
		}
	];

	let expandedCourse = $state<string | null>(syllabus[0]?.slug || null);
</script>

<svelte:head>
	<title>Course Content | Admin | code:zero</title>
</svelte:head>

<div class="courses-page">
	<header class="page-header">
		<h1>Course Content</h1>
		<p>View and edit course lessons exactly as students see them.</p>
	</header>

	<div class="courses-grid">
		{#each syllabus as course}
			<div class="course-card" class:expanded={expandedCourse === course.slug}>
				<button
					class="course-header"
					onclick={() => expandedCourse = expandedCourse === course.slug ? null : course.slug}
				>
					<div class="course-info">
						<h2>{course.course}</h2>
						<span class="lesson-count">{course.weeks.reduce((acc, w) => acc + w.days.length, 0)} lessons</span>
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
					</div>
				{/if}
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
		margin: 0 0 var(--space-1);
	}

	.lesson-count {
		font-size: 0.875rem;
		color: var(--text-muted);
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
</style>
