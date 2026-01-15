<script>
  /**
   * PixelCard - Retro game-style card for courses/features
   * Props:
   * - variant: 'default' | 'featured' | 'course'
   * - href: optional link
   */
  let {
    variant = 'default',
    href = '',
    children
  } = $props();
</script>

{#if href}
  <a {href} class="pixel-card {variant}">
    {@render children()}
  </a>
{:else}
  <div class="pixel-card {variant}">
    {@render children()}
  </div>
{/if}

<style>
  .pixel-card {
    background: var(--bg-elevated);
    border: 3px solid var(--border-pixel);
    border-radius: 12px;
    padding: var(--space-6);
    transition: all 0.2s ease;
    text-decoration: none;
    display: block;
    position: relative;
  }

  .pixel-card:hover {
    transform: translateY(-4px);
    border-color: var(--color-primary);
    box-shadow: 0 8px 30px rgba(255, 215, 0, 0.15);
  }

  /* Featured variant - highlighted border */
  .featured {
    border-color: var(--color-accent-purple);
    background: linear-gradient(
      135deg,
      rgba(139, 92, 246, 0.1) 0%,
      rgba(139, 92, 246, 0.05) 100%
    );
  }

  .featured:hover {
    border-color: var(--color-accent-purple);
    box-shadow: 0 8px 30px rgba(139, 92, 246, 0.2);
  }

  /* Course variant - with icon slot */
  .course {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    text-align: center;
    padding: var(--space-8);
  }

  .course::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-purple);
    border-radius: 12px 12px 0 0;
  }
</style>
