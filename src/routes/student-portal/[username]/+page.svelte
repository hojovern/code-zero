<script lang="ts">
	import type { PageData } from './$types';
	import { getLevelProgress } from '$lib/config/gamification';

	let { data }: { data: PageData } = $props();

	const levelProgress = $derived(getLevelProgress(data.user.xpTotal, data.user.level));

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

<div class="dashboard">
	<!-- Welcome Header -->
	<header class="dashboard-header">
		<div class="welcome">
			<h1>Welcome back, {data.user.username}! 👋</h1>
			<p>Keep up the great work. You're making progress!</p>
		</div>
	</header>

	<!-- Stats Cards -->
	<section class="stats-grid">
		<div class="stat-card">
			<span class="stat-icon">⚡</span>
			<div class="stat-content">
				<span class="stat-value">{data.user.xpTotal}</span>
				<span class="stat-label">Total XP</span>
			</div>
		</div>
		<div class="stat-card">
			<span class="stat-icon">🎯</span>
			<div class="stat-content">
				<span class="stat-value">Level {data.user.level}</span>
				<span class="stat-label">Current Level</span>
			</div>
		</div>
		<div class="stat-card">
			<span class="stat-icon">📚</span>
			<div class="stat-content">
				<span class="stat-value">{data.enrollments.length}</span>
				<span class="stat-label">Courses Enrolled</span>
			</div>
		</div>
		<div class="stat-card">
			<span class="stat-icon">🏆</span>
			<div class="stat-content">
				<span class="stat-value">{data.achievements.length}</span>
				<span class="stat-label">Achievements</span>
			</div>
		</div>
	</section>

	<!-- Level Progress -->
	<section class="level-section">
		<div class="level-card">
			<div class="level-header">
				<div class="level-info">
					<span class="current-level">Level {data.user.level}</span>
					<span class="level-arrow">→</span>
					<span class="next-level">Level {data.user.level + 1}</span>
				</div>
				<span class="xp-text">{levelProgress.current} / {levelProgress.needed} XP</span>
			</div>
			<div class="level-bar">
				<div class="level-fill" style="width: {levelProgress.percentage}%"></div>
			</div>
			<p class="level-hint">🚀 Complete lessons to earn XP and level up!</p>
		</div>
	</section>

	<!-- Courses -->
	<section class="courses-section">
		<div class="section-header">
			<h2>📚 My Courses</h2>
			{#if data.enrollments.length > 0}
				<a href="/student-portal/{data.user.username}/my-courses" class="btn-link">View All →</a>
			{/if}
		</div>

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
									{enrollment.course.weeks} weeks
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
	</section>

	<!-- Achievements -->
	<section class="achievements-section">
		<div class="section-header">
			<h2>🏆 Achievements</h2>
		</div>

		{#if data.achievements.length === 0}
			<div class="empty-state small">
				<span class="empty-icon">🎖️</span>
				<h3>No badges yet</h3>
				<p>Complete lessons to earn your first achievement!</p>
			</div>
		{:else}
			<div class="badges-grid">
				{#each data.achievements as badge}
					<div class="badge-card">
						<span class="badge-icon">{badge.icon}</span>
						<div class="badge-info">
							<span class="badge-name">{badge.name}</span>
							<span class="badge-desc">{badge.description}</span>
						</div>
						{#if badge.xpBonus && badge.xpBonus > 0}
							<span class="badge-xp">+{badge.xpBonus} XP</span>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</section>
</div>

<style>
	.dashboard {
		max-width: 1200px;
		margin: 0 auto;
	}

	/* Header */
	.dashboard-header {
		margin-bottom: var(--space-8);
	}

	.welcome h1 {
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.welcome p {
		color: var(--text-secondary);
		font-size: 1rem;
	}

	/* Stats Grid */
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--space-4);
		margin-bottom: var(--space-8);
	}

	.stat-card {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		padding: var(--space-5);
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
	}

	.stat-icon {
		font-size: 2rem;
	}

	.stat-content {
		display: flex;
		flex-direction: column;
	}

	.stat-value {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.stat-label {
		font-size: 0.8125rem;
		color: var(--text-muted);
	}

	/* Level Section */
	.level-section {
		margin-bottom: var(--space-8);
	}

	.level-card {
		padding: var(--space-6);
		background: linear-gradient(135deg, rgba(4, 164, 89, 0.1) 0%, var(--bg-elevated) 100%);
		border: 1px solid var(--color-primary);
		border-radius: var(--radius-xl);
	}

	.level-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-4);
	}

	.level-info {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.current-level {
		font-weight: 700;
		color: var(--color-primary);
		font-size: 1.125rem;
	}

	.level-arrow {
		color: var(--text-muted);
	}

	.next-level {
		font-weight: 600;
		color: var(--text-secondary);
	}

	.xp-text {
		font-size: 0.875rem;
		color: var(--text-secondary);
		font-weight: 500;
	}

	.level-bar {
		height: 12px;
		background: var(--bg-base);
		border-radius: var(--radius-full);
		overflow: hidden;
		margin-bottom: var(--space-3);
	}

	.level-fill {
		height: 100%;
		background: linear-gradient(90deg, var(--color-primary), var(--color-primary-light));
		border-radius: var(--radius-full);
		transition: width 0.5s ease;
	}

	.level-hint {
		font-size: 0.8125rem;
		color: var(--text-muted);
		text-align: center;
	}

	/* Section Header */
	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-5);
	}

	.section-header h2 {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.btn-link {
		color: var(--color-primary);
		text-decoration: none;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.btn-link:hover {
		text-decoration: underline;
	}

	/* Courses Section */
	.courses-section {
		margin-bottom: var(--space-8);
	}

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

	/* Achievements Section */
	.achievements-section {
		margin-bottom: var(--space-8);
	}

	.badges-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: var(--space-4);
	}

	.badge-card {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		padding: var(--space-4);
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
	}

	.badge-icon {
		font-size: 2rem;
		flex-shrink: 0;
	}

	.badge-info {
		flex: 1;
		min-width: 0;
	}

	.badge-name {
		display: block;
		font-weight: 600;
		color: var(--text-primary);
		font-size: 0.9375rem;
	}

	.badge-desc {
		display: block;
		font-size: 0.8125rem;
		color: var(--text-muted);
	}

	.badge-xp {
		background: rgba(4, 164, 89, 0.1);
		color: var(--color-primary);
		font-size: 0.75rem;
		font-weight: 600;
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-md);
		flex-shrink: 0;
	}

	/* Empty State */
	.empty-state {
		text-align: center;
		padding: var(--space-10);
		background: var(--bg-elevated);
		border: 1px dashed var(--border-subtle);
		border-radius: var(--radius-lg);
	}

	.empty-state.small {
		padding: var(--space-6);
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
