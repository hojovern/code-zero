<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// All possible achievements (from gamification config)
	const allAchievements = [
		{ id: 'first_lesson', name: 'First Steps', icon: '👶', description: 'Complete your first lesson', xpBonus: 50 },
		{ id: 'week_complete', name: 'Week Warrior', icon: '⚔️', description: 'Complete an entire week', xpBonus: 200 },
		{ id: 'course_complete', name: 'Graduate', icon: '🎓', description: 'Complete an entire course', xpBonus: 500 },
		{ id: 'five_lessons', name: 'Getting Serious', icon: '💪', description: 'Complete 5 lessons', xpBonus: 100 },
		{ id: 'ten_lessons', name: 'Dedicated Learner', icon: '📚', description: 'Complete 10 lessons', xpBonus: 150 },
		{ id: 'level_5', name: 'Rising Star', icon: '⭐', description: 'Reach Level 5', xpBonus: 250 },
		{ id: 'level_10', name: 'Master Builder', icon: '🏆', description: 'Reach Level 10', xpBonus: 500 }
	];

	// Mark which achievements are earned
	const earnedIds = $derived(new Set(data.achievements.map(a => a.id)));
</script>

<div class="achievements-page">
	<header class="page-header">
		<h1>Achievements</h1>
		<p>Earn badges by completing lessons and reaching milestones.</p>
	</header>

	<!-- Stats -->
	<section class="stats-row">
		<div class="stat-card">
			<span class="stat-value">{data.achievements.length}</span>
			<span class="stat-label">Earned</span>
		</div>
		<div class="stat-card">
			<span class="stat-value">{allAchievements.length - data.achievements.length}</span>
			<span class="stat-label">Remaining</span>
		</div>
		<div class="stat-card">
			<span class="stat-value">{data.achievements.reduce((acc, a) => acc + (a.xpBonus || 0), 0)}</span>
			<span class="stat-label">Bonus XP</span>
		</div>
	</section>

	<!-- All Achievements Grid -->
	<section class="achievements-grid">
		{#each allAchievements as achievement}
			{@const earned = earnedIds.has(achievement.id)}

			<div class="achievement-card" class:earned>
				<div class="achievement-icon" class:earned>
					{achievement.icon}
				</div>
				<div class="achievement-info">
					<h3 class="achievement-name">{achievement.name}</h3>
					<p class="achievement-desc">{achievement.description}</p>
					<span class="achievement-xp">+{achievement.xpBonus} XP</span>
				</div>
				{#if earned}
					<span class="earned-badge">✓ Earned</span>
				{:else}
					<span class="locked-badge">🔒 Locked</span>
				{/if}
			</div>
		{/each}
	</section>
</div>

<style>
	.achievements-page {
		max-width: 800px;
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

	/* Stats Row */
	.stats-row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-4);
		margin-bottom: var(--space-8);
	}

	.stat-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-5);
		text-align: center;
	}

	.stat-value {
		display: block;
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.stat-label {
		font-size: 0.8125rem;
		color: var(--text-muted);
	}

	/* Achievements Grid */
	.achievements-grid {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.achievement-card {
		display: flex;
		align-items: center;
		gap: var(--space-5);
		padding: var(--space-5);
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		position: relative;
		transition: border-color var(--duration-fast) var(--ease-default);
	}

	.achievement-card:not(.earned) {
		opacity: 0.6;
	}

	.achievement-card.earned {
		border-color: var(--color-primary);
		background: linear-gradient(135deg, rgba(4, 164, 89, 0.05) 0%, var(--bg-elevated) 100%);
	}

	.achievement-icon {
		width: 64px;
		height: 64px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--bg-surface);
		border-radius: var(--radius-lg);
		font-size: 2rem;
		flex-shrink: 0;
	}

	.achievement-icon.earned {
		background: rgba(4, 164, 89, 0.15);
	}

	.achievement-info {
		flex: 1;
		min-width: 0;
	}

	.achievement-name {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-1);
	}

	.achievement-desc {
		font-size: 0.875rem;
		color: var(--text-muted);
		margin-bottom: var(--space-2);
	}

	.achievement-xp {
		display: inline-block;
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-primary);
		background: rgba(4, 164, 89, 0.1);
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-sm);
	}

	.earned-badge,
	.locked-badge {
		position: absolute;
		top: var(--space-4);
		right: var(--space-4);
		font-size: 0.75rem;
		font-weight: 600;
		padding: var(--space-1) var(--space-3);
		border-radius: var(--radius-full);
	}

	.earned-badge {
		background: rgba(4, 164, 89, 0.15);
		color: var(--color-primary);
	}

	.locked-badge {
		background: var(--bg-surface);
		color: var(--text-muted);
	}

	/* Mobile */
	@media (max-width: 480px) {
		.stats-row {
			grid-template-columns: 1fr;
		}

		.achievement-card {
			flex-direction: column;
			text-align: center;
			gap: var(--space-4);
		}

		.earned-badge,
		.locked-badge {
			position: static;
			margin-top: var(--space-2);
		}
	}
</style>
