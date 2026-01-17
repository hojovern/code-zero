<script lang="ts">
	import type { PageData } from "./$types";
	import { getLevelProgress } from "$lib/config/gamification";

	let { data }: { data: PageData } = $props();

	const levelProgress = $derived(
		getLevelProgress(data.user.xpTotal, data.user.level),
	);

	function getCourseEmoji(slug: string): string {
		const emojiMap: Record<string, string> = {
			"full-stack-web-development": "🚀",
			"enterprise-ai-full-stack": "🏢",
			"ceo-ai-command": "👔",
			"ceo-command-centre": "🕹️",
			"full-stack-sprint": "⚡",
		};
		return emojiMap[slug] || "📚";
	}
</script>

<div class="dashboard">
	<!-- Welcome Header -->
	<header class="dashboard-header">
		<div class="welcome">
			<h1>
				Welcome back, {data.user.role === "super_admin"
					? "Super Admin"
					: data.user.username}! 👋
			</h1>
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
				<span class="xp-text"
					>{levelProgress.current} / {levelProgress.needed} XP</span
				>
			</div>
			<div class="level-bar">
				<div
					class="level-fill"
					style="width: {levelProgress.percentage}%"
				></div>
			</div>
			<p class="level-hint">
				🚀 Complete lessons to earn XP and level up!
			</p>
		</div>
	</section>

	<!-- Courses -->
	<section class="courses-section">
		<div class="section-header">
			<h2>📚 My Courses</h2>
			{#if data.enrollments.length > 0}
				<a
					href="/student-portal/{data.user.username}/my-courses"
					class="btn-link">View All →</a
				>
			{/if}
		</div>

		{#if data.enrollments.length === 0}
			<div class="empty-state">
				<span class="empty-icon">📖</span>
				<h3>No courses yet</h3>
				<p>
					You haven't been enrolled in any courses yet. Contact your
					Super Admin to get started!
				</p>
			</div>
		{:else}
			<div class="courses-list">
				{#each data.enrollments as enrollment, i}
					{@const progressPercent =
						enrollment.progress.total > 0
							? Math.round(
									(enrollment.progress.completed /
										enrollment.progress.total) *
										100,
								)
							: 0}
					{@const isComplete = progressPercent === 100}
					{@const gradients = [
						"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
						"linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
						"linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
						"linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
					]}

					<a
						href="/student-portal/{data.user.username}/{enrollment
							.course.slug}"
						class="course-card-new"
						class:completed={isComplete}
					>
						<!-- Gradient Orb -->
						<div
							class="course-orb"
							style="background: {gradients[
								i % gradients.length
							]}"
						>
							<span class="orb-emoji"
								>{getCourseEmoji(enrollment.course.slug)}</span
							>
						</div>

						<!-- Course Info -->
						<div class="course-info">
							<h3 class="course-title">
								{enrollment.course.name}
							</h3>
							<p class="course-subtitle">
								{enrollment.course.weeks} weeks • {enrollment
									.progress.total} lessons
							</p>

							<!-- Progress Bar -->
							<div class="course-progress-bar">
								<div class="progress-track">
									<div
										class="progress-fill"
										style="width: {progressPercent}%"
									></div>
								</div>
								<span class="progress-text"
									>{progressPercent}% Complete</span
								>
							</div>
						</div>

						<!-- Arrow -->
						<div class="course-arrow">
							{#if isComplete}
								<span class="checkmark">✓</span>
							{:else}
								<span class="arrow">→</span>
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
		background: linear-gradient(
			135deg,
			rgba(4, 164, 89, 0.1) 0%,
			var(--bg-elevated) 100%
		);
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
		background: linear-gradient(
			90deg,
			var(--color-primary),
			var(--color-primary-light)
		);
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

	/* NEW Courses List - Horizontal Cards */
	.courses-list {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.course-card-new {
		display: flex;
		align-items: center;
		gap: 24px;
		padding: 20px 24px;
		background: linear-gradient(
			135deg,
			hsl(230, 25%, 16%) 0%,
			hsl(230, 20%, 12%) 100%
		);
		border: 1px solid hsl(230, 15%, 22%);
		border-radius: 16px;
		text-decoration: none;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease,
			border-color 0.2s ease;
	}

	.course-card-new:hover {
		transform: translateY(-3px);
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
		border-color: hsl(230, 20%, 30%);
	}

	.course-card-new.completed {
		border-color: var(--color-primary);
	}

	/* Gradient Orb */
	.course-orb {
		width: 72px;
		height: 72px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
	}

	.orb-emoji {
		font-size: 2rem;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
	}

	/* Course Info */
	.course-info {
		flex: 1;
		min-width: 0;
	}

	.course-title {
		font-size: 1.125rem;
		font-weight: 700;
		color: white;
		margin: 0 0 4px;
	}

	.course-subtitle {
		font-size: 0.875rem;
		color: hsl(230, 10%, 55%);
		margin: 0 0 12px;
	}

	/* Progress Bar - New Style */
	.course-progress-bar {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.progress-track {
		flex: 1;
		height: 8px;
		background: hsl(230, 15%, 25%);
		border-radius: 4px;
		overflow: hidden;
	}

	.course-progress-bar .progress-fill {
		height: 100%;
		background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%);
		border-radius: 4px;
		/* No transition - prevents jank on load */
	}

	.progress-text {
		font-size: 0.75rem;
		font-weight: 600;
		color: hsl(230, 10%, 60%);
		white-space: nowrap;
	}

	/* Arrow */
	.course-arrow {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: hsl(230, 15%, 22%);
		border-radius: 12px;
		flex-shrink: 0;
	}

	.course-arrow .arrow {
		font-size: 1.25rem;
		color: hsl(230, 10%, 50%);
	}

	.course-arrow .checkmark {
		font-size: 1.25rem;
		color: var(--color-primary);
		font-weight: 700;
	}

	.course-card-new:hover .course-arrow .arrow {
		color: white;
	}

	/* Mobile Responsive */
	@media (max-width: 600px) {
		.course-card-new {
			flex-direction: column;
			text-align: center;
			padding: 24px;
			gap: 16px;
		}

		.course-progress-bar {
			flex-direction: column;
			gap: 8px;
		}

		.course-arrow {
			display: none;
		}
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
