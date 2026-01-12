<script>
  export let size = 48;
  export let showText = true;
</script>

<!-- Concept 4: "The Minimal Zero" -->
<!-- Ultra-clean, bold, confident - a slashed zero with subtle gradient glow -->
<div class="logo-wrapper" style="--size: {size}px">
  <svg
    viewBox="0 0 {showText ? 200 : 48} 48"
    width={showText ? size * 4.2 : size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Glow layer -->
    <ellipse cx="24" cy="24" rx="16" ry="20" fill="url(#glow4)" filter="url(#blur4)" opacity="0.4"/>

    <!-- Main Zero - bold rounded rectangle/pill shape -->
    <rect x="10" y="6" width="28" height="36" rx="14" stroke="url(#gradient4)" stroke-width="3.5" fill="none"/>

    <!-- The iconic slash -->
    <line x1="34" y1="10" x2="14" y2="38" stroke="var(--bg-base, #1a1d23)" stroke-width="6"/>
    <line x1="34" y1="10" x2="14" y2="38" stroke="url(#gradient4)" stroke-width="3" stroke-linecap="round"/>

    {#if showText}
      <!-- Text: code:zero with unique styling -->
      <text x="54" y="20" font-family="'JetBrains Mono', monospace" font-weight="600" font-size="14" fill="var(--text-secondary, #9ca3af)" letter-spacing="-0.5">
        code
      </text>
      <text x="54" y="38" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="18" fill="var(--text-primary, #f5f5f7)">
        <tspan fill="url(#gradient4)">:</tspan>zero
      </text>
    {/if}

    <defs>
      <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#04A459"/>
        <stop offset="100%" stop-color="#2ECC71"/>
      </linearGradient>
      <radialGradient id="glow4" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#04A459"/>
        <stop offset="100%" stop-color="transparent"/>
      </radialGradient>
      <filter id="blur4" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="4"/>
      </filter>
    </defs>
  </svg>
</div>

<style>
  .logo-wrapper {
    display: inline-flex;
    align-items: center;
  }

  svg {
    display: block;
  }

  rect, line, ellipse {
    transition: all 0.3s ease;
  }

  .logo-wrapper:hover ellipse {
    opacity: 0.6;
  }

  .logo-wrapper:hover rect {
    filter: drop-shadow(0 0 10px rgba(4, 164, 89, 0.4));
  }
</style>
