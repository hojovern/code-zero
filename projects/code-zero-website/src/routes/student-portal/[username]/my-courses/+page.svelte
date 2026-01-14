<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function getCourseEmoji(slug: string): string {
		const emojiMap: Record<string, string> = {
			'full-stack-web-development': '🚀',
			'enterprise-ai-full-stack': '🏢',
			'ceo-ai-command': '👔',
			'full-stack-sprint': '⚡'
		};
		return emojiMap[slug] || '📚';
	}
</script>

<div class="my-courses">
	<header class="page-header">
		<h1>My Courses</h1>
		<p>Continue learning where you left off</p>
	</header>

	{#if data.enrollments.length === 0}
		<div class="empty-state">
			<span class="empty-icon">📖</span>
			<h3>No courses yet</h3>
			<p>You haven't been enrolled in any courses yet. Contact your admin to get started!</p>
		</div>
	{:else}
		<div class="courses-grid">
			{#each data.enrollments as enrollment}
				{@const progressPercent = enrollment.progress.total > 0
					? (enrollment.progress.completed / enrollment.progress.total) * 100
					: 0}
				{@const isComplete = enrollment.progress.completed === enrollment.progress.total && enrollment.progress.total > 0}

				<a
					href="/student-portal/{data.user.username}/{enrollment.course.slug}"
					class="course-card"
					class:completed={isComplete}
				>
					<div class="course-image placeholder">
						<span>{getCourseEmoji(enrollment.course.slug)}</span>
					</div>

					<div class="course-content">
						<h3>{enrollment.course.name}</h3>
						{#if enrollment.course.description}
							<p class="course-desc">{enrollment.course.description}</p>
						{/if}

						<div class="course-meta">
							<span class="meta-item">
								<span class="meta-icon">📅</span>
								{enrollment.course.weeks === 1 ? '1 day' : `${enrollment.course.weeks} weeks`}
							</span>
							<span class="meta-item">
								<span class="meta-icon">📖</span>
								{enrollment.progress.total} lessons
							</span>
						</div>

						<div class="course-progress">
							<div class="progress-header">
								<span class="progress-label">Progress</span>
								<span class="progress-value">{enrollment.progress.completed}/{enrollment.progress.total}</span>
							</div>
							<div class="progress-bar">
								<div class="progress-fill" style="width: {progressPercent}%"></div>
							</div>
						</div>

						{#if isComplete}
							<div class="complete-badge">
								<span>✅</span> Completed
							</div>
						{/if}
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>

<style>
	.my-courses {
		max-width: 1200px;
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
		font-size: 1rem;
	}

	/* Courses Grid */
	.courses-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: var(--space-5);
		align-items: start;
	}

	.course-card {
		display: flex;
		flex-direction: column;
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		overflow: hidden;
		text-decoration: none;
		transition: border-color 0.2s ease, box-shadow 0.2s ease;
		position: relative;
		z-index: 1;
	}

	.course-card:hover {
		border-color: var(--color-primary);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
		z-index: 2;
	}

	.course-card.completed {
		border-color: var(--color-primary);
		background: linear-gradient(135deg, rgba(4, 164, 89, 0.05) 0%, var(--bg-elevated) 100%);
	}

	.course-image {
		height: 140px;
		background: var(--bg-surface);
		overflow: hidden;
	}

	.course-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.course-image.placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 3rem;
		background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-base) 100%);
	}

	.course-content {
		padding: var(--space-5);
	}

	.course-content h3 {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.course-desc {
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.5;
		margin-bottom: var(--space-3);
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.course-meta {
		display: flex;
		gap: var(--space-4);
		margin-bottom: var(--space-4);
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		font-size: 0.8125rem;
		color: var(--text-muted);
	}

	.course-progress {
		margin-bottom: var(--space-3);
	}

	.progress-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: var(--space-2);
	}

	.progress-label {
		font-size: 0.75rem;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.progress-value {
		font-size: 0.8125rem;
		color: var(--text-secondary);
		font-weight: 500;
	}

	.progress-bar {
		height: 6px;
		background: var(--bg-surface);
		border-radius: var(--radius-full);
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: var(--color-primary);
		border-radius: var(--radius-full);
		transition: width 0.3s ease;
	}

	.complete-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--space-1);
		padding: var(--space-2) var(--space-3);
		background: rgba(4, 164, 89, 0.1);
		color: var(--color-primary);
		font-size: 0.8125rem;
		font-weight: 600;
		border-radius: var(--radius-md);
	}

	/* Empty State */
	.empty-state {
		text-align: center;
		padding: var(--space-10);
		background: var(--bg-elevated);
		border: 1px dashed var(--border-subtle);
		border-radius: var(--radius-lg);
	}

	.empty-icon {
		font-size: 3rem;
		display: block;
		margin-bottom: var(--space-4);
	}

	.empty-state h3 {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.empty-state p {
		color: var(--text-muted);
		font-size: 0.9375rem;
		max-width: 300px;
		margin: 0 auto;
	}
</style>
