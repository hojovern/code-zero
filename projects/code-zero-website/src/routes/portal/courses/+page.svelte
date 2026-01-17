<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function getCourseEmoji(slug: string): string {
		const emojiMap: Record<string, string> = {
			'full-stack-web-development': '🚀',
			'enterprise-ai-full-stack': '🏢',
			'ceo-ai-command': '👔',
			'ceo-command-centre': '🕹️',
			'full-stack-sprint': '⚡'
		};
		return emojiMap[slug] || '📚';
	}

	const gradients = [
		'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
		'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
		'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
		'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
	];
</script>

<div class="courses-page">
	<header class="page-header">
		<h1>My Courses</h1>
		<p>Track your progress across all enrolled courses.</p>
	</header>

	{#if data.enrollments.length === 0}
		<div class="empty-state">
			<span class="empty-icon">📖</span>
			<h2>No courses yet</h2>
			<p>You haven't been enrolled in any courses. Contact your admin to get started!</p>
			<a href="/" class="btn btn-primary">Browse Courses</a>
		</div>
	{:else}
		<div class="courses-grid">
			{#each data.enrollments as enrollment, i}
				{@const isComplete = enrollment.progress.percent === 100}

				<a href="/portal/courses/{enrollment.course.slug}" class="course-tile" class:completed={isComplete}>
					<div class="tile-header" style="background: {gradients[i % gradients.length]}">
						<span class="tile-emoji">{getCourseEmoji(enrollment.course.slug)}</span>
						{#if isComplete}
							<span class="complete-badge">✓ Complete</span>
						{/if}
					</div>

					<div class="tile-body">
						<h3 class="tile-title">{enrollment.course.name}</h3>
						<p class="tile-meta">{enrollment.course.weeks} weeks • {enrollment.progress.total} lessons</p>

						<div class="tile-progress">
							<div class="progress-track">
								<div class="progress-fill" style="width: {enrollment.progress.percent}%"></div>
							</div>
							<span class="progress-text">{enrollment.progress.percent}% complete</span>
						</div>

						<div class="tile-stats">
							<div class="stat">
								<span class="stat-num">{enrollment.progress.completed}</span>
								<span class="stat-label">Completed</span>
							</div>
							<div class="stat">
								<span class="stat-num">{enrollment.progress.total - enrollment.progress.completed}</span>
								<span class="stat-label">Remaining</span>
							</div>
						</div>
					</div>

					<div class="tile-footer">
						<span class="continue-btn">
							{isComplete ? 'Review Course' : 'Continue Learning'} →
						</span>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>

<style>
	.courses-page {
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
		margin-bottom: var(--space-2);
	}

	.page-header p {
		color: var(--text-secondary);
	}

	/* Courses Grid */
	.courses-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-6);
	}

	@media (max-width: 768px) {
		.courses-grid {
			grid-template-columns: 1fr;
		}
	}

	/* Course Tile */
	.course-tile {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl);
		overflow: hidden;
		text-decoration: none;
		display: flex;
		flex-direction: column;
		transition: transform var(--duration-fast) var(--ease-default),
			border-color var(--duration-fast) var(--ease-default);
	}

	.course-tile:hover {
		transform: translateY(-4px);
		border-color: var(--border-default);
	}

	.course-tile.completed {
		border-color: var(--color-primary);
	}

	/* Tile Header */
	.tile-header {
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.tile-emoji {
		font-size: 2.5rem;
	}

	.complete-badge {
		position: absolute;
		top: var(--space-3);
		right: var(--space-3);
		background: rgba(0, 0, 0, 0.5);
		color: white;
		font-size: 0.75rem;
		font-weight: 600;
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-full);
	}

	/* Tile Body */
	.tile-body {
		padding: var(--space-5);
		flex: 1;
	}

	.tile-title {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-1);
	}

	.tile-meta {
		font-size: 0.8125rem;
		color: var(--text-muted);
		margin-bottom: var(--space-4);
	}

	/* Progress */
	.tile-progress {
		margin-bottom: var(--space-4);
	}

	.progress-track {
		height: 6px;
		background: var(--bg-base);
		border-radius: var(--radius-full);
		overflow: hidden;
		margin-bottom: var(--space-2);
	}

	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%);
		border-radius: var(--radius-full);
	}

	.progress-text {
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	/* Stats */
	.tile-stats {
		display: flex;
		gap: var(--space-6);
	}

	.stat {
		display: flex;
		flex-direction: column;
	}

	.stat-num {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.stat-label {
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	/* Tile Footer */
	.tile-footer {
		padding: var(--space-4) var(--space-5);
		border-top: 1px solid var(--border-subtle);
		background: var(--bg-surface);
	}

	.continue-btn {
		color: var(--color-primary);
		font-size: 0.875rem;
		font-weight: 600;
	}

	/* Empty State */
	.empty-state {
		text-align: center;
		padding: var(--space-12);
		background: var(--bg-elevated);
		border: 1px dashed var(--border-subtle);
		border-radius: var(--radius-xl);
	}

	.empty-icon {
		font-size: 3rem;
		display: block;
		margin-bottom: var(--space-4);
	}

	.empty-state h2 {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.empty-state p {
		color: var(--text-muted);
		margin-bottom: var(--space-6);
		max-width: 320px;
		margin-left: auto;
		margin-right: auto;
	}
</style>
