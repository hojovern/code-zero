<script lang="ts">
	import { invalidateAll } from '$app/navigation';

	let { lessonId, completed = false }: { lessonId: string; completed?: boolean } = $props();

	let loading = $state(false);
	let justCompleted = $state(false);
	let xpEarned = $state(0);
	let leveledUp = $state(false);
	let newAchievements = $state<Array<{ name: string; icon: string }>>([]);

	async function markComplete() {
		if (completed || loading) return;

		loading = true;

		try {
			const response = await fetch('/api/progress', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ lessonId })
			});

			const data = await response.json();

			if (data.success) {
				justCompleted = true;
				xpEarned = data.xpEarned;
				leveledUp = data.leveledUp;
				newAchievements = data.newAchievements || [];

				// Refresh page data after a short delay
				setTimeout(() => {
					invalidateAll();
				}, 2000);
			}
		} catch (error) {
			console.error('Failed to mark complete:', error);
		} finally {
			loading = false;
		}
	}
</script>

{#if completed}
	<div class="completed-badge">
		<span class="icon">✅</span>
		<span class="text">Lesson Complete</span>
	</div>
{:else if justCompleted}
	<div class="celebration">
		<div class="celebration-content">
			<span class="celebration-icon">🎉</span>
			<h3>Awesome!</h3>
			<p class="xp-earned">+{xpEarned} XP earned!</p>
			{#if leveledUp}
				<p class="level-up">🆙 Level Up!</p>
			{/if}
			{#if newAchievements.length > 0}
				<div class="new-achievements">
					{#each newAchievements as achievement}
						<div class="achievement-earned">
							<span>{achievement.icon}</span>
							<span>{achievement.name}</span>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{:else}
	<button
		class="mark-complete-btn"
		onclick={markComplete}
		disabled={loading}
	>
		{#if loading}
			<span class="spinner"></span>
			Completing...
		{:else}
			<span class="icon">✓</span>
			Mark as Complete
		{/if}
	</button>
{/if}

<style>
	.completed-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-5);
		background: rgba(4, 164, 89, 0.1);
		border: 1px solid rgba(4, 164, 89, 0.3);
		border-radius: var(--radius-md);
		color: var(--color-primary);
		font-weight: 600;
	}

	.mark-complete-btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-6);
		background: var(--color-primary);
		color: white;
		border: none;
		border-radius: var(--radius-md);
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.mark-complete-btn:hover:not(:disabled) {
		background: var(--color-primary-light);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(4, 164, 89, 0.3);
	}

	.mark-complete-btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.spinner {
		width: 16px;
		height: 16px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.celebration {
		padding: var(--space-6);
		background: linear-gradient(135deg, rgba(4, 164, 89, 0.1), rgba(4, 164, 89, 0.05));
		border: 1px solid rgba(4, 164, 89, 0.3);
		border-radius: var(--radius-lg);
		text-align: center;
		animation: celebrate 0.5s ease;
	}

	@keyframes celebrate {
		0% {
			transform: scale(0.9);
			opacity: 0;
		}
		50% {
			transform: scale(1.02);
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}

	.celebration-icon {
		font-size: 3rem;
		display: block;
		margin-bottom: var(--space-3);
		animation: bounce 0.6s ease infinite;
	}

	@keyframes bounce {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	.celebration h3 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.xp-earned {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-primary);
	}

	.level-up {
		font-size: 1.125rem;
		font-weight: 600;
		color: #f59e0b;
		margin-top: var(--space-2);
	}

	.new-achievements {
		margin-top: var(--space-4);
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		justify-content: center;
	}

	.achievement-earned {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-3);
		background: var(--bg-elevated);
		border-radius: var(--radius-md);
		font-size: 0.875rem;
	}
</style>
