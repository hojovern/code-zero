<script lang="ts">
	// No props needed - this is a pure presentational skeleton
</script>

<div class="course-card skeleton">
	<div class="course-image skeleton-image">
		<div class="skeleton-shimmer"></div>
	</div>

	<div class="course-content">
		<div class="skeleton-title skeleton-shimmer"></div>
		<div class="skeleton-desc skeleton-shimmer"></div>

		<div class="course-meta">
			<div class="skeleton-meta skeleton-shimmer"></div>
			<div class="skeleton-meta skeleton-shimmer"></div>
		</div>

		<div class="course-progress">
			<div class="progress-header">
				<div class="skeleton-label skeleton-shimmer"></div>
				<div class="skeleton-value skeleton-shimmer"></div>
			</div>
			<div class="progress-bar">
				<div class="skeleton-shimmer" style="height: 100%; border-radius: var(--radius-full);"></div>
			</div>
		</div>
	</div>
</div>

<style>
	.course-card.skeleton {
		display: flex;
		flex-direction: column;
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		overflow: hidden;
		pointer-events: none;
	}

	.skeleton-image {
		width: 100%;
		height: 140px;
		background: var(--bg-surface);
		position: relative;
		overflow: hidden;
	}

	.course-content {
		padding: var(--space-5);
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.skeleton-title {
		height: 1.25rem;
		width: 75%;
		border-radius: var(--radius-md);
	}

	.skeleton-desc {
		height: 0.875rem;
		width: 90%;
		border-radius: var(--radius-md);
	}

	.course-meta {
		display: flex;
		gap: var(--space-4);
		margin-top: var(--space-2);
	}

	.skeleton-meta {
		height: 0.875rem;
		width: 60px;
		border-radius: var(--radius-md);
	}

	.course-progress {
		margin-top: auto;
	}

	.progress-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: var(--space-2);
	}

	.skeleton-label {
		height: 0.75rem;
		width: 50px;
		border-radius: var(--radius-sm);
	}

	.skeleton-value {
		height: 0.75rem;
		width: 30px;
		border-radius: var(--radius-sm);
	}

	.progress-bar {
		height: 6px;
		background: var(--bg-surface);
		border-radius: var(--radius-full);
		overflow: hidden;
	}

	/* Shimmer animation */
	.skeleton-shimmer {
		background: linear-gradient(
			90deg,
			var(--bg-surface) 0%,
			var(--bg-hover) 50%,
			var(--bg-surface) 100%
		);
		background-size: 200% 100%;
		animation: shimmer 1.5s ease-in-out infinite;
	}

	@keyframes shimmer {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}
</style>
