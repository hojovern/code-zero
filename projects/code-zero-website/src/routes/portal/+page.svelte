<script lang="ts">
	import type { PageData } from './$types';
	import { getLevelProgress } from '$lib/config/gamification';

	let { data }: { data: PageData } = $props();

	const levelProgress = $derived(getLevelProgress(data.user.xpTotal, data.user.level));

	const totalCompleted = $derived(
		data.enrollments.reduce((acc, e) => acc + e.progress.completed, 0)
	);

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

<div class="dashboard">
	<!-- Welcome Header -->
	<header class="welcome-header">
		<h1>Welcome back, {data.user.name || data.user.username}! 👋</h1>
		<p>Keep up the great work. You're making progress!</p>
	</header>

	<!-- Stats Grid - Fixed Height Panels -->
	<section class="stats-grid">
		<div class="stat-panel">
			<span class="stat-icon">⚡</span>
			<div class="stat-content">
				<span class="stat-value">{data.user.xpTotal.toLocaleString()}</span>
				<span class="stat-label">Total XP</span>
			</div>
		</div>
		<div class="stat-panel">
			<span class="stat-icon">🎯</span>
			<div class="stat-content">
				<span class="stat-value">Level {data.user.level}</span>
				<span class="stat-label">Current Level</span>
			</div>
		</div>
		<div class="stat-panel">
			<span class="stat-icon">📚</span>
			<div class="stat-content">
				<span class="stat-value">{data.enrollments.length}</span>
				<span class="stat-label">Enrolled Courses</span>
			</div>
		</div>
		<div class="stat-panel">
			<span class="stat-icon">✅</span>
			<div class="stat-content">
				<span class="stat-value">{totalCompleted}</span>
				<span class="stat-label">Lessons Done</span>
			</div>
		</div>
	</section>

	<!-- Level Progress Panel -->
	<section class="progress-panel">
		<div class="progress-header">
			<div class="level-badges">
				<span class="current-badge">Level {data.user.level}</span>
				<span class="arrow">→</span>
				<span class="next-badge">Level {data.user.level + 1}</span>
			</div>
			<span class="xp-text">{levelProgress.current} / {levelProgress.needed} XP</span>
		</div>
		<div class="progress-bar">
			<div class="progress-fill" style="width: {levelProgress.percentage}%"></div>
		</div>
		<p class="progress-hint">Complete lessons to earn XP and level up!</p>
	</section>

	<!-- Courses Panel -->
	<section class="courses-panel">
		<div class="panel-header">
			<h2>My Courses</h2>
			{#if data.enrollments.length > 0}
				<a href="/portal/courses" class="view-all">View All →</a>
			{/if}
		</div>

		{#if data.enrollments.length === 0}
			<div class="empty-state">
				<span class="empty-icon">📖</span>
				<h3>No courses yet</h3>
				<p>You haven't been enrolled in any courses. Contact your admin to get started!</p>
			</div>
		{:else}
			<div class="courses-list">
				{#each data.enrollments.slice(0, 3) as enrollment, i}
					{@const isComplete = enrollment.progress.percent === 100}

					<a href="/portal/courses/{enrollment.course.slug}" class="course-card" class:completed={isComplete}>
						<div class="course-orb" style="background: {gradients[i % gradients.length]}">
							<span class="orb-emoji">{getCourseEmoji(enrollment.course.slug)}</span>
						</div>

						<div class="course-info">
							<h3 class="course-name">{enrollment.course.name}</h3>
							<p class="course-meta">{enrollment.course.weeks} weeks • {enrollment.progress.total} lessons</p>

							<div class="course-progress">
								<div class="progress-track">
									<div class="progress-fill" style="width: {enrollment.progress.percent}%"></div>
								</div>
								<span class="progress-label">{enrollment.progress.percent}%</span>
							</div>
						</div>

						<div class="course-arrow">
							{#if isComplete}
								<span class="check">✓</span>
							{:else}
								<span class="arrow-icon">→</span>
							{/if}
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</section>

	<!-- Achievements Panel -->
	<section class="achievements-panel">
		<div class="panel-header">
			<h2>Achievements</h2>
			<a href="/portal/achievements" class="view-all">View All →</a>
		</div>

		{#if data.achievements.length === 0}
			<div class="empty-state small">
				<span class="empty-icon">🏆</span>
				<p>Complete lessons to earn achievements!</p>
			</div>
		{:else}
			<div class="badges-row">
				{#each data.achievements.slice(0, 4) as badge}
					<div class="badge-item">
						<span class="badge-icon">{badge.icon}</span>
						<span class="badge-name">{badge.name}</span>
					</div>
				{/each}
			</div>
		{/if}
	</section>
</div>

<style>
	.dashboard {
		max-width: 1000px;
		margin: 0 auto;
	}

	/* Welcome Header */
	.welcome-header {
		margin-bottom: var(--space-8);
	}

	.welcome-header h1 {
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.welcome-header p {
		color: var(--text-secondary);
		font-size: 1rem;
	}

	/* Stats Grid - Fixed Heights */
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--space-4);
		margin-bottom: var(--space-6);
	}

	@media (max-width: 900px) {
		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 480px) {
		.stats-grid {
			grid-template-columns: 1fr;
		}
	}

	.stat-panel {
		height: 80px;
		display: flex;
		align-items: center;
		gap: var(--space-4);
		padding: 0 var(--space-5);
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		contain: strict;
	}

	.stat-icon {
		font-size: 1.75rem;
		flex-shrink: 0;
	}

	.stat-content {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	.stat-value {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text-primary);
		line-height: 1.2;
	}

	.stat-label {
		font-size: 0.8125rem;
		color: var(--text-muted);
	}

	/* Progress Panel - Fixed Height */
	.progress-panel {
		height: 140px;
		padding: var(--space-6);
		background: linear-gradient(135deg, rgba(4, 164, 89, 0.1) 0%, var(--bg-elevated) 100%);
		border: 1px solid var(--color-primary);
		border-radius: var(--radius-xl);
		margin-bottom: var(--space-6);
		contain: layout style;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.progress-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-4);
	}

	.level-badges {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.current-badge {
		font-weight: 700;
		color: var(--color-primary);
		font-size: 1.125rem;
	}

	.level-badges .arrow {
		color: var(--text-muted);
	}

	.next-badge {
		font-weight: 600;
		color: var(--text-secondary);
	}

	.xp-text {
		font-size: 0.875rem;
		color: var(--text-secondary);
		font-weight: 500;
	}

	.progress-bar {
		height: 10px;
		background: var(--bg-base);
		border-radius: var(--radius-full);
		overflow: hidden;
		margin-bottom: var(--space-3);
	}

	.progress-panel .progress-fill {
		height: 100%;
		background: var(--gradient-accent);
		border-radius: var(--radius-full);
	}

	.progress-hint {
		font-size: 0.8125rem;
		color: var(--text-muted);
		text-align: center;
	}

	/* Courses Panel */
	.courses-panel {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl);
		padding: var(--space-6);
		margin-bottom: var(--space-6);
	}

	.panel-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-5);
	}

	.panel-header h2 {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.view-all {
		color: var(--color-primary);
		font-size: 0.875rem;
		font-weight: 500;
		text-decoration: none;
	}

	.view-all:hover {
		text-decoration: underline;
	}

	/* Course Cards */
	.courses-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.course-card {
		display: flex;
		align-items: center;
		gap: var(--space-5);
		padding: var(--space-5);
		background: var(--bg-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		text-decoration: none;
		transition: transform var(--duration-fast) var(--ease-default),
			border-color var(--duration-fast) var(--ease-default);
	}

	.course-card:hover {
		transform: translateY(-2px);
		border-color: var(--border-default);
	}

	.course-card.completed {
		border-color: var(--color-primary);
	}

	.course-orb {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.orb-emoji {
		font-size: 1.5rem;
	}

	.course-info {
		flex: 1;
		min-width: 0;
	}

	.course-name {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-1);
	}

	.course-meta {
		font-size: 0.8125rem;
		color: var(--text-muted);
		margin-bottom: var(--space-3);
	}

	.course-progress {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.progress-track {
		flex: 1;
		height: 6px;
		background: var(--bg-base);
		border-radius: var(--radius-full);
		overflow: hidden;
	}

	.course-progress .progress-fill {
		height: 100%;
		background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%);
		border-radius: var(--radius-full);
	}

	.progress-label {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--text-muted);
		min-width: 32px;
	}

	.course-arrow {
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--bg-base);
		border-radius: var(--radius-md);
		flex-shrink: 0;
	}

	.arrow-icon {
		color: var(--text-muted);
		font-size: 1.125rem;
	}

	.check {
		color: var(--color-primary);
		font-weight: 700;
	}

	.course-card:hover .arrow-icon {
		color: var(--text-primary);
	}

	/* Achievements Panel */
	.achievements-panel {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl);
		padding: var(--space-6);
	}

	.badges-row {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--space-4);
	}

	@media (max-width: 640px) {
		.badges-row {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.badge-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-4);
		background: var(--bg-surface);
		border-radius: var(--radius-lg);
	}

	.badge-icon {
		font-size: 2rem;
	}

	.badge-name {
		font-size: 0.75rem;
		color: var(--text-secondary);
		text-align: center;
		font-weight: 500;
	}

	/* Empty States */
	.empty-state {
		text-align: center;
		padding: var(--space-8);
	}

	.empty-state.small {
		padding: var(--space-6);
	}

	.empty-icon {
		font-size: 2.5rem;
		display: block;
		margin-bottom: var(--space-3);
	}

	.empty-state h3 {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.empty-state p {
		color: var(--text-muted);
		font-size: 0.875rem;
		max-width: 280px;
		margin: 0 auto;
	}

	/* Mobile */
	@media (max-width: 600px) {
		.course-card {
			flex-direction: column;
			text-align: center;
			gap: var(--space-4);
		}

		.course-progress {
			flex-direction: column;
			gap: var(--space-2);
		}

		.course-arrow {
			display: none;
		}
	}
</style>
