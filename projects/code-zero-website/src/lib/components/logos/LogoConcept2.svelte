<script>
  export let size = 48;
  export let showText = true;
</script>

<!-- Concept 2: "The Terminal Zero" -->
<!-- A zero formed by chevrons/brackets - the essence of code -->
<div class="logo-wrapper" style="--size: {size}px">
  <svg
    viewBox="0 0 {showText ? 200 : 48} 48"
    width={showText ? size * 4.2 : size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Left Bracket forming left side of zero -->
    <path
      d="M18 8 L8 24 L18 40"
      stroke="url(#gradient2)"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
    />

    <!-- Right Bracket forming right side of zero -->
    <path
      d="M30 8 L40 24 L30 40"
      stroke="url(#gradient2)"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
    />

    <!-- Slash through the zero -->
    <line x1="32" y1="12" x2="16" y2="36" stroke="url(#gradient2)" stroke-width="2.5" stroke-linecap="round"/>

    <!-- Top connecting arc (subtle) -->
    <path d="M18 8 Q24 4 30 8" stroke="url(#gradient2)" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.5"/>

    <!-- Bottom connecting arc (subtle) -->
    <path d="M18 40 Q24 44 30 40" stroke="url(#gradient2)" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.5"/>

    {#if showText}
      <!-- Text: code:zero -->
      <text x="56" y="32" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="22" fill="var(--text-primary, #f5f5f7)">
        code<tspan fill="url(#gradient2)">:</tspan>zero
      </text>
    {/if}

    <defs>
      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#04A459"/>
        <stop offset="100%" stop-color="#2ECC71"/>
      </linearGradient>
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

  path, line {
    transition: all 0.3s ease;
  }

  .logo-wrapper:hover path,
  .logo-wrapper:hover line {
    filter: drop-shadow(0 0 6px rgba(4, 164, 89, 0.6));
  }

  .logo-wrapper:hover path:nth-of-type(1) {
    transform: translateX(-2px);
  }

  .logo-wrapper:hover path:nth-of-type(2) {
    transform: translateX(2px);
  }
</style>
