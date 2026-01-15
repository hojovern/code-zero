<script>
  /**
   * PixelButton - Arcade-style yellow CTA button
   * Props:
   * - variant: 'primary' | 'secondary' | 'ghost' (default: 'primary')
   * - size: 'sm' | 'md' | 'lg' (default: 'md')
   * - href: optional link (renders as <a> if provided)
   * - disabled: boolean
   */
  let {
    variant = 'primary',
    size = 'md',
    href = '',
    disabled = false,
    onclick = () => {},
    children
  } = $props();
</script>

{#if href}
  <a
    {href}
    class="pixel-btn {variant} {size}"
    class:disabled
    role="button"
  >
    {@render children()}
  </a>
{:else}
  <button
    class="pixel-btn {variant} {size}"
    {disabled}
    {onclick}
  >
    {@render children()}
  </button>
{/if}

<style>
  .pixel-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-family: var(--font-pixel);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.1s ease;
    position: relative;
    white-space: nowrap;
  }

  /* Sizes */
  .sm {
    padding: 0.625rem 1rem;
    font-size: 0.5rem;
  }

  .md {
    padding: 0.875rem 1.5rem;
    font-size: 0.625rem;
  }

  .lg {
    padding: 1rem 2rem;
    font-size: 0.75rem;
  }

  /* Primary - Yellow arcade style */
  .primary {
    background: var(--color-primary);
    color: #0a0a23;
    box-shadow:
      0 4px 0 var(--color-primary-dark),
      0 6px 20px rgba(255, 215, 0, 0.3);
  }

  .primary:hover:not(.disabled) {
    transform: translateY(-2px);
    box-shadow:
      0 6px 0 var(--color-primary-dark),
      0 8px 25px rgba(255, 215, 0, 0.4);
  }

  .primary:active:not(.disabled) {
    transform: translateY(2px);
    box-shadow:
      0 2px 0 var(--color-primary-dark),
      0 4px 15px rgba(255, 215, 0, 0.2);
  }

  /* Secondary - Purple outline */
  .secondary {
    background: transparent;
    color: var(--color-accent-purple);
    border: 3px solid var(--color-accent-purple);
    box-shadow: 0 4px 0 #5b21b6;
  }

  .secondary:hover:not(.disabled) {
    background: rgba(139, 92, 246, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 6px 0 #5b21b6;
  }

  .secondary:active:not(.disabled) {
    transform: translateY(2px);
    box-shadow: 0 2px 0 #5b21b6;
  }

  /* Ghost - Transparent with border */
  .ghost {
    background: rgba(255, 255, 255, 0.05);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }

  .ghost:hover:not(.disabled) {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.4);
  }

  /* Disabled state */
  .disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
</style>
