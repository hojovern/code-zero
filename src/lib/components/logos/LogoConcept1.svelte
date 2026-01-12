<script>
  export let size = 48;
  export let showText = true;
</script>

<!-- Concept 1: "The Quantum Zero" -->
<!-- A geometric zero with an orbital ring, suggesting infinite potential -->
<!-- The zero icon replaces the "0" in "code:zer0" -->
<div class="logo-wrapper" style="--size: {size}px">
  <svg
    viewBox="0 0 {showText ? 220 : 48} 48"
    width={showText ? size * 4.6 : size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#04A459"/>
        <stop offset="100%" stop-color="#2ECC71"/>
      </linearGradient>
      <!-- Radial gradient for smooth glow that fades to transparent -->
      <radialGradient id="glow1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stop-color="#04A459" stop-opacity="0.6"/>
        <stop offset="50%" stop-color="#04A459" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#04A459" stop-opacity="0"/>
      </radialGradient>
    </defs>

    {#if showText}
      <!-- Text: code:zer -->
      <text x="0" y="32" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="22" fill="var(--text-primary, #f5f5f7)">
        code<tspan fill="url(#gradient1)">:</tspan>zer
      </text>

      <!-- The Quantum Zero icon (replacing the "0") -->
      <g class="zero-icon" transform="translate(127, 4)">
        <!-- Soft glow background - no filter, just radial gradient -->
        <circle class="glow-circle" cx="20" cy="20" r="24" fill="url(#glow1)" opacity="0"/>

        <!-- Main Zero Circle -->
        <circle cx="20" cy="20" r="14" stroke="url(#gradient1)" stroke-width="2.5" fill="none"/>

        <!-- Orbital Ring -->
        <ellipse class="orbital" cx="20" cy="20" rx="18" ry="6" stroke="url(#gradient1)" stroke-width="1.2" fill="none" opacity="0.5" transform="rotate(-30 20 20)"/>

        <!-- Center Dot (the "bit") -->
        <circle cx="20" cy="20" r="2.5" fill="url(#gradient1)"/>

        <!-- Slash through zero -->
        <line x1="27" y1="9" x2="13" y2="31" stroke="var(--bg-base, #1a1d23)" stroke-width="3.5"/>
        <line x1="27" y1="9" x2="13" y2="31" stroke="url(#gradient1)" stroke-width="1.8" stroke-linecap="round"/>
      </g>
    {:else}
      <!-- Icon only mode -->
      <!-- Soft glow background -->
      <circle class="glow-circle" cx="24" cy="24" r="28" fill="url(#glow1)" opacity="0"/>

      <!-- Main Zero Circle -->
      <circle cx="24" cy="24" r="16" stroke="url(#gradient1)" stroke-width="3" fill="none"/>

      <!-- Orbital Ring -->
      <ellipse class="orbital" cx="24" cy="24" rx="22" ry="8" stroke="url(#gradient1)" stroke-width="1.5" fill="none" opacity="0.6" transform="rotate(-30 24 24)"/>

      <!-- Center Dot (the "bit") -->
      <circle cx="24" cy="24" r="3" fill="url(#gradient1)"/>

      <!-- Slash through zero -->
      <line x1="32" y1="10" x2="16" y2="38" stroke="var(--bg-base, #1a1d23)" stroke-width="4"/>
      <line x1="32" y1="10" x2="16" y2="38" stroke="url(#gradient1)" stroke-width="2" stroke-linecap="round"/>
    {/if}
  </svg>
</div>

<style>
  .logo-wrapper {
    display: inline-flex;
    align-items: center;
  }

  svg {
    display: block;
    overflow: visible;
  }

  circle, ellipse, line {
    transition: all 0.3s ease;
  }

  /* Smooth glow on hover - using opacity transition on the radial gradient circle */
  .logo-wrapper:hover .glow-circle {
    opacity: 1;
  }

  .orbital {
    transform-box: fill-box;
    transform-origin: center;
  }

  .logo-wrapper:hover .orbital {
    opacity: 1;
    animation: orbit 3s linear infinite;
  }

  @keyframes orbit {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>
