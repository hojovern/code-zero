<script>
  export let size = 48;
  export let showText = true;
</script>

<!-- Concept 3: "The Hex Zero" -->
<!-- A hexagonal zero with a power symbol slash - code + energy -->
<div class="logo-wrapper" style="--size: {size}px">
  <svg
    viewBox="0 0 {showText ? 200 : 48} 48"
    width={showText ? size * 4.2 : size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Hexagonal Zero -->
    <path
      d="M24 4 L40 14 L40 34 L24 44 L8 34 L8 14 Z"
      stroke="url(#gradient3)"
      stroke-width="2.5"
      fill="none"
    />

    <!-- Inner hexagon (creates depth) -->
    <path
      d="M24 10 L34 17 L34 31 L24 38 L14 31 L14 17 Z"
      stroke="url(#gradient3)"
      stroke-width="1"
      fill="none"
      opacity="0.3"
    />

    <!-- Power/slash symbol -->
    <path
      d="M24 8 L24 20 M20 16 L24 24 L28 16"
      stroke="url(#gradient3)"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
    />

    <!-- Bottom circuit nodes -->
    <circle cx="24" cy="38" r="2" fill="url(#gradient3)"/>
    <circle cx="14" cy="31" r="1.5" fill="url(#gradient3)" opacity="0.6"/>
    <circle cx="34" cy="31" r="1.5" fill="url(#gradient3)" opacity="0.6"/>

    {#if showText}
      <!-- Text: code:zero -->
      <text x="56" y="32" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="22" fill="var(--text-primary, #f5f5f7)">
        code<tspan fill="url(#gradient3)">:</tspan>zero
      </text>
    {/if}

    <defs>
      <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
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

  path, circle {
    transition: all 0.3s ease;
  }

  .logo-wrapper:hover path:first-of-type {
    filter: drop-shadow(0 0 8px rgba(4, 164, 89, 0.5));
  }

  .logo-wrapper:hover circle {
    animation: pulse 1s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; filter: drop-shadow(0 0 4px rgba(4, 164, 89, 0.8)); }
  }
</style>
