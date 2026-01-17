<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.student.name || data.student.username} | Admin | code:zero</title>
</svelte:head>

<div class="admin-student-detail">
	<header class="page-header">
		<a href="/admin/students" class="back-link">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M19 12H5M12 19l-7-7 7-7" />
			</svg>
			Back to Students
		</a>
		<div class="header-content">
			<div class="student-header">
				<div class="student-avatar-large">
					{data.student.username?.charAt(0).toUpperCase() || '?'}
				</div>
				<div class="student-title">
					<h1>{data.student.name || data.student.username}</h1>
					<p class="student-meta">
						@{data.student.username} • {data.student.email}
					</p>
				</div>
			</div>
			<div class="header-actions">
				<a href="/portal" class="btn btn-secondary" title="View your portal (admin impersonation coming soon)">
					👁️ View Portal
				</a>
			</div>
		</div>
	</header>

	<!-- Stats Cards -->
	<section class="stats-grid">
		<div class="stat-card">
			<span class="stat-icon">🏆</span>
			<div class="stat-content">
				<span class="stat-value">Lv.{data.student.level}</span>
				<span class="stat-label">Level</span>
			</div>
		</div>
		<div class="stat-card">
			<span class="stat-icon">⚡</span>
			<div class="stat-content">
				<span class="stat-value">{data.student.xpTotal}</span>
				<span class="stat-label">Total XP</span>
			</div>
		</div>
		<div class="stat-card">
			<span class="stat-icon">📚</span>
			<div class="stat-content">
				<span class="stat-value">{data.enrollments.length}</span>
				<span class="stat-label">Courses</span>
			</div>
		</div>
		<div class="stat-card">
			<span class="stat-icon">✅</span>
			<div class="stat-content">
				<span class="stat-value">{data.progress.length}</span>
				<span class="stat-label">Lessons Completed</span>
			</div>
		</div>
	</section>

	<!-- Enrollments -->
	<section class="section">
		<h2>📚 Course Enrollments</h2>
		{#if data.enrollments.length === 0}
			<div class="empty-state">
				<p>Not enrolled in any courses yet.</p>
			</div>
		{:else}
			<div class="enrollments-list">
				{#each data.enrollments as enrollment}
					<div class="enrollment-card">
						<div class="enrollment-info">
							<h3>{enrollment.courseName}</h3>
							<p class="enrollment-meta">
								Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}
								{#if enrollment.completedAt}
									• Completed: {new Date(enrollment.completedAt).toLocaleDateString()}
								{/if}
							</p>
						</div>
						<span class="status-badge status-{enrollment.status}">
							{enrollment.status}
						</span>
					</div>
				{/each}
			</div>
		{/if}
	</section>

	<!-- Recent Progress -->
	<section class="section">
		<h2>📈 Recent Progress</h2>
		{#if data.progress.length === 0}
			<div class="empty-state">
				<p>No lessons completed yet.</p>
			</div>
		{:else}
			<div class="progress-list">
				{#each data.progress.slice(0, 10) as lesson}
					<div class="progress-item">
						<span class="progress-icon">✅</span>
						<div class="progress-info">
							<span class="lesson-id">Lesson {lesson.lessonId}</span>
							<span class="progress-date">
								{new Date(lesson.completedAt).toLocaleDateString()}
							</span>
						</div>
						<span class="xp-earned">+{lesson.xpEarned} XP</span>
					</div>
				{/each}
			</div>
			{#if data.progress.length > 10}
				<p class="more-count">...and {data.progress.length - 10} more lessons</p>
			{/if}
		{/if}
	</section>

	<!-- Achievements -->
	<section class="section">
		<h2>🏅 Achievements</h2>
		{#if data.achievements.length === 0}
			<div class="empty-state">
				<p>No achievements earned yet.</p>
			</div>
		{:else}
			<div class="achievements-grid">
				{#each data.achievements as achievement}
					<div class="achievement-card">
						<span class="achievement-icon">{achievement.icon || '🏆'}</span>
						<div class="achievement-info">
							<h4>{achievement.name}</h4>
							<p>{achievement.description}</p>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</section>

	<!-- Account Info -->
	<section class="section">
		<h2>⚙️ Account Info</h2>
		<div class="info-grid">
			<div class="info-item">
				<span class="info-label">User ID</span>
				<code class="info-value">{data.student.id}</code>
			</div>
			<div class="info-item">
				<span class="info-label">Role</span>
				<span class="info-value">{data.student.role}</span>
			</div>
			<div class="info-item">
				<span class="info-label">Created</span>
				<span class="info-value">{new Date(data.student.createdAt).toLocaleDateString()}</span>
			</div>
		</div>
	</section>
</div>

<style>
	.admin-student-detail {
		max-width: 1000px;
		margin: 0 auto;
		padding: var(--space-6);
	}

	/* Header */
	.back-link {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		color: var(--text-muted);
		text-decoration: none;
		font-size: 0.875rem;
		margin-bottom: var(--space-4);
	}

	.back-link:hover {
		color: var(--color-primary);
	}

	.page-header {
		margin-bottom: var(--space-6);
	}

	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: var(--space-4);
	}

	.student-header {
		display: flex;
		align-items: center;
		gap: var(--space-4);
	}

	.student-avatar-large {
		width: 64px;
		height: 64px;
		border-radius: var(--radius-full);
		background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-size: 1.5rem;
		font-weight: 700;
		flex-shrink: 0;
	}

	.student-title h1 {
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-1);
	}

	.student-meta {
		color: var(--text-muted);
		font-size: 0.9375rem;
	}

	.header-actions {
		display: flex;
		gap: var(--space-2);
	}

	/* Stats Grid */
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-4);
		margin-bottom: var(--space-8);
	}

	@media (min-width: 768px) {
		.stats-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.stat-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-4);
		display: flex;
		align-items: center;
		gap: var(--space-3);
		contain: layout style;
	}

	.stat-icon {
		font-size: 1.5rem;
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
		font-size: 0.75rem;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	/* Sections */
	.section {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl);
		padding: var(--space-6);
		margin-bottom: var(--space-6);
	}

	.section h2 {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-4);
	}

	.empty-state {
		text-align: center;
		padding: var(--space-6);
		color: var(--text-muted);
	}

	/* Enrollments */
	.enrollments-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.enrollment-card {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-4);
		background: var(--bg-surface);
		border-radius: var(--radius-md);
	}

	.enrollment-info h3 {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-1);
	}

	.enrollment-meta {
		font-size: 0.8125rem;
		color: var(--text-muted);
	}

	.status-badge {
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-md);
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
	}

	.status-active {
		background: rgba(4, 164, 89, 0.1);
		color: var(--color-primary);
	}

	.status-completed {
		background: rgba(59, 130, 246, 0.1);
		color: #3b82f6;
	}

	.status-paused {
		background: rgba(234, 179, 8, 0.1);
		color: #eab308;
	}

	/* Progress */
	.progress-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.progress-item {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3);
		background: var(--bg-surface);
		border-radius: var(--radius-md);
	}

	.progress-icon {
		font-size: 1rem;
	}

	.progress-info {
		flex: 1;
		display: flex;
		justify-content: space-between;
	}

	.lesson-id {
		font-weight: 500;
		color: var(--text-primary);
	}

	.progress-date {
		font-size: 0.8125rem;
		color: var(--text-muted);
	}

	.xp-earned {
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--color-primary);
		background: rgba(4, 164, 89, 0.1);
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-sm);
	}

	.more-count {
		text-align: center;
		color: var(--text-muted);
		font-size: 0.875rem;
		margin-top: var(--space-3);
	}

	/* Achievements */
	.achievements-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-3);
	}

	@media (min-width: 640px) {
		.achievements-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.achievements-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.achievement-card {
		display: flex;
		align-items: flex-start;
		gap: var(--space-3);
		padding: var(--space-4);
		background: var(--bg-surface);
		border-radius: var(--radius-md);
		contain: layout style;
	}

	.achievement-icon {
		font-size: 1.5rem;
	}

	.achievement-info h4 {
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-1);
	}

	.achievement-info p {
		font-size: 0.8125rem;
		color: var(--text-muted);
	}

	/* Account Info */
	.info-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-4);
	}

	@media (min-width: 480px) {
		.info-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 768px) {
		.info-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.info-item {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
		contain: layout style;
	}

	.info-label {
		font-size: 0.75rem;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.info-value {
		font-size: 0.9375rem;
		color: var(--text-primary);
	}

	code.info-value {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		background: var(--bg-surface);
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-sm);
	}

	/* Buttons */
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-5);
		font-size: 0.9375rem;
		font-weight: 600;
		border-radius: var(--radius-md);
		border: none;
		cursor: pointer;
		text-decoration: none;
		transition: all 0.15s ease;
	}

	.btn-secondary {
		background: var(--bg-surface);
		color: var(--text-primary);
		border: 1px solid var(--border-subtle);
	}

	.btn-secondary:hover {
		border-color: var(--color-primary);
	}
</style>
