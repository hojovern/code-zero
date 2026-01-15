<script>
  /**
   * PixelSectionTitle - Banner-style section heading
   * Props:
   * - align: 'left' | 'center' (default: 'center')
   */
  let {
    align = 'center',
    children
  } = $props();
</script>

<div class="section-title {align}">
  <div class="title-decoration left">
    <span class="deco-star">★</span>
    <span class="deco-line"></span>
  </div>

  <h2 class="title-text">
    {@render children()}
  </h2>

  <div class="title-decoration right">
    <span class="deco-line"></span>
    <span class="deco-star">★</span>
  </div>
</div>

<style>
  .section-title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-4);
    margin-bottom: var(--space-12);
  }

  .section-title.left {
    justify-content: flex-start;
  }

  .title-text {
    font-family: var(--font-pixel);
    font-size: clamp(0.875rem, 3vw, 1.25rem);
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-align: center;
    white-space: nowrap;
  }

  .title-decoration {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .deco-star {
    color: var(--color-primary);
    font-size: 1rem;
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  }

  .deco-line {
    width: 60px;
    height: 3px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--border-pixel) 50%,
      transparent 100%
    );
  }

  .left .deco-line {
    background: linear-gradient(
      90deg,
      var(--border-pixel) 0%,
      transparent 100%
    );
  }

  .right .deco-line {
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--border-pixel) 100%
    );
  }

  @media (max-width: 640px) {
    .title-decoration {
      display: none;
    }

    .title-text {
      font-size: 0.875rem;
    }
  }
</style>
