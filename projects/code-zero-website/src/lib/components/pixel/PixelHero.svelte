<script>
  import { onMount } from "svelte";
  import { openApplyModal } from "$lib/stores/auth";
  import PixelButton from "./PixelButton.svelte";

  let showContent = $state(false);
  let typedText = $state("");
  const fullText = "Adventure";

  function handleApply(e) {
    e.preventDefault();
    openApplyModal();
  }

  onMount(() => {
    // Fade in content after short delay
    setTimeout(() => {
      showContent = true;
    }, 300);

    // Typing effect for "Adventure"
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < fullText.length) {
        typedText = fullText.slice(0, i + 1);
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 150);

    return () => clearInterval(typeInterval);
  });
</script>

<section class="pixel-hero">
  <!-- Sky gradient background -->
  <div class="hero-sky"></div>

  <!-- Animated stars -->
  <div class="hero-stars">
    {#each Array(20) as _, i}
      <div
        class="star"
        style="
          left: {Math.random() * 100}%;
          top: {Math.random() * 60}%;
          animation-delay: {Math.random() * 3}s;
        "
      ></div>
    {/each}
  </div>

  <!-- Pixel landscape - mountains, trees -->
  <div class="hero-landscape">
    <!-- Background mountains (far) -->
    <svg class="mountains-far" viewBox="0 0 1920 400" preserveAspectRatio="xMidYMax slice">
      <polygon fill="#1e1b4b" points="0,400 200,200 400,350 600,150 800,300 1000,100 1200,250 1400,180 1600,280 1920,150 1920,400"/>
    </svg>

    <!-- Midground mountains -->
    <svg class="mountains-mid" viewBox="0 0 1920 400" preserveAspectRatio="xMidYMax slice">
      <polygon fill="#312e81" points="0,400 150,280 350,350 500,220 700,320 900,180 1100,290 1300,220 1500,300 1700,200 1920,350 1920,400"/>
    </svg>

    <!-- Foreground hills with trees -->
    <svg class="hills" viewBox="0 0 1920 300" preserveAspectRatio="xMidYMax slice">
      <polygon fill="#3730a3" points="0,300 100,250 300,280 500,240 700,270 900,230 1100,260 1300,240 1500,270 1700,250 1920,280 1920,300"/>
      <!-- Pixel trees -->
      <rect fill="#166534" x="100" y="220" width="20" height="40"/>
      <polygon fill="#22c55e" points="110,180 90,220 130,220"/>
      <polygon fill="#16a34a" points="110,160 85,200 135,200"/>

      <rect fill="#166534" x="300" y="250" width="16" height="30"/>
      <polygon fill="#22c55e" points="308,220 292,250 324,250"/>
      <polygon fill="#16a34a" points="308,205 288,235 328,235"/>

      <rect fill="#166534" x="550" y="210" width="24" height="50"/>
      <polygon fill="#22c55e" points="562,160 532,210 592,210"/>
      <polygon fill="#16a34a" points="562,135 525,185 599,185"/>

      <rect fill="#166534" x="800" y="200" width="20" height="40"/>
      <polygon fill="#22c55e" points="810,160 790,200 830,200"/>
      <polygon fill="#16a34a" points="810,140 785,180 835,180"/>

      <rect fill="#166534" x="1100" y="230" width="18" height="35"/>
      <polygon fill="#22c55e" points="1109,195 1091,230 1127,230"/>
      <polygon fill="#16a34a" points="1109,175 1088,210 1130,210"/>

      <rect fill="#166534" x="1400" y="215" width="22" height="45"/>
      <polygon fill="#22c55e" points="1411,170 1389,215 1433,215"/>
      <polygon fill="#16a34a" points="1411,150 1383,195 1439,195"/>

      <rect fill="#166534" x="1700" y="220" width="20" height="40"/>
      <polygon fill="#22c55e" points="1710,180 1690,220 1730,220"/>
      <polygon fill="#16a34a" points="1710,160 1685,200 1735,200"/>
    </svg>
  </div>

  <!-- Content -->
  <div class="hero-content" class:visible={showContent}>
    <div class="hero-container">
      <!-- Pixel title banner -->
      <div class="hero-banner">
        <span class="banner-text">Start Your Journey</span>
      </div>

      <!-- Main headline - pixel art style text with typing effect -->
      <h1 class="hero-title">
        <span class="title-line">Coding</span>
        <span class="title-line title-gradient">{typedText}<span class="cursor">_</span></span>
      </h1>

      <!-- Subtitle -->
      <p class="hero-subtitle">
        Build your freedom. Master full-stack development in 4 weeks.
        <br/>
        <span class="subtitle-highlight">Ship real products. No tutorials.</span>
      </p>

      <!-- CTA Button -->
      <div class="hero-cta">
        <PixelButton size="lg" onclick={handleApply}>
          Start Building
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </PixelButton>
      </div>

      <!-- Social proof -->
      <div class="hero-proof">
        <div class="proof-rating">
          <span class="stars">★★★★★</span>
          <span class="rating-text">4.9/5</span>
        </div>
        <div class="proof-divider"></div>
        <div class="proof-stat">
          <span class="stat-value">500+</span>
          <span class="stat-label">Builders Trained</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Floating decorations -->
  <div class="floating-elements">
    <!-- Pixel art code block -->
    <div class="float-code">
      <div class="code-header">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
      </div>
      <div class="code-body">
        <span class="code-line"><span class="c-purple">const</span> <span class="c-blue">builder</span> = <span class="c-yellow">you</span>;</span>
        <span class="code-line"><span class="c-purple">await</span> <span class="c-green">ship</span>();</span>
      </div>
    </div>

    <!-- XP Badge -->
    <div class="float-badge">
      <span class="badge-icon">⚡</span>
      <span class="badge-text">+500 XP</span>
    </div>
  </div>
</section>

<style>
  .pixel-hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding-top: 80px; /* Nav offset */
  }

  /* Sky gradient */
  .hero-sky {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      #0f0a1e 0%,
      #1a1040 25%,
      #2d1b69 50%,
      #4c1d95 75%,
      #7c3aed 100%
    );
  }

  /* Animated stars */
  .hero-stars {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .star {
    position: absolute;
    width: 4px;
    height: 4px;
    background: white;
    border-radius: 50%;
    animation: twinkle 3s infinite ease-in-out;
  }

  @keyframes twinkle {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
  }

  /* Landscape */
  .hero-landscape {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40%;
    pointer-events: none;
  }

  .mountains-far,
  .mountains-mid,
  .hills {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .mountains-far { height: 100%; }
  .mountains-mid { height: 80%; }
  .hills { height: 60%; }

  /* Content */
  .hero-content {
    position: relative;
    z-index: 10;
    text-align: center;
    padding: var(--space-8);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }

  .hero-content.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .hero-container {
    max-width: 800px;
    margin: 0 auto;
  }

  /* Banner */
  .hero-banner {
    display: inline-block;
    margin-bottom: var(--space-6);
  }

  .banner-text {
    display: inline-block;
    background: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%);
    padding: 0.5rem 1.5rem;
    font-family: var(--font-pixel);
    font-size: 0.625rem;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    clip-path: polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
  }

  /* Title */
  .hero-title {
    font-family: var(--font-pixel);
    font-size: clamp(2rem, 8vw, 4.5rem);
    line-height: 1.2;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: var(--space-6);
    text-shadow: 4px 4px 0 rgba(0,0,0,0.3);
  }

  .title-line {
    display: block;
    color: white;
  }

  .title-gradient {
    background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(2px 2px 0 rgba(0,0,0,0.3));
  }

  .cursor {
    animation: blink 1s step-end infinite;
    -webkit-text-fill-color: var(--color-primary);
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  /* Subtitle */
  .hero-subtitle {
    font-family: var(--font-body);
    font-size: 1.125rem;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.7;
    margin-bottom: var(--space-8);
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }

  .subtitle-highlight {
    color: var(--color-primary);
    font-weight: 600;
  }

  /* CTA */
  .hero-cta {
    margin-bottom: var(--space-8);
  }

  /* Social proof */
  .hero-proof {
    display: inline-flex;
    align-items: center;
    gap: var(--space-4);
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    padding: var(--space-3) var(--space-6);
    border-radius: var(--radius-full);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .proof-rating {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .stars {
    color: var(--color-primary);
    font-size: 0.875rem;
    letter-spacing: 2px;
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  }

  .rating-text {
    font-family: var(--font-pixel);
    font-size: 0.5rem;
    color: white;
  }

  .proof-divider {
    width: 1px;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
  }

  .proof-stat {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .stat-value {
    font-family: var(--font-pixel);
    font-size: 0.625rem;
    color: white;
  }

  .stat-label {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.6);
  }

  /* Floating elements */
  .floating-elements {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 5;
  }

  .float-code {
    position: absolute;
    top: 25%;
    left: 5%;
    background: rgba(26, 26, 62, 0.95);
    border: 2px solid var(--border-pixel);
    border-radius: 8px;
    padding: 0;
    width: 200px;
    animation: floatCode 6s ease-in-out infinite;
    display: none;
  }

  @media (min-width: 1024px) {
    .float-code {
      display: block;
    }
  }

  @keyframes floatCode {
    0%, 100% { transform: translateY(0) rotate(-2deg); }
    50% { transform: translateY(-15px) rotate(1deg); }
  }

  .code-header {
    display: flex;
    gap: 6px;
    padding: 8px 12px;
    background: rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid var(--border-subtle);
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .red { background: #ef4444; }
  .yellow { background: #f59e0b; }
  .green { background: #10b981; }

  .code-body {
    padding: 12px;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .code-line {
    white-space: nowrap;
    color: #a1a1a1;
  }

  .c-purple { color: #c792ea; }
  .c-blue { color: #82aaff; }
  .c-yellow { color: #ffcb6b; }
  .c-green { color: #c3e88d; }

  .float-badge {
    position: absolute;
    top: 30%;
    right: 8%;
    background: var(--color-primary);
    color: #0a0a23;
    padding: 8px 16px;
    border-radius: 20px;
    font-family: var(--font-pixel);
    font-size: 0.625rem;
    display: none;
    align-items: center;
    gap: 6px;
    animation: floatBadge 5s ease-in-out infinite;
    box-shadow: 0 4px 20px rgba(255, 215, 0, 0.4);
  }

  @media (min-width: 1024px) {
    .float-badge {
      display: flex;
    }
  }

  @keyframes floatBadge {
    0%, 100% { transform: translateY(0) rotate(3deg); }
    50% { transform: translateY(-20px) rotate(-2deg); }
  }

  .badge-icon {
    font-size: 1rem;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .hero-title {
      font-size: clamp(1.5rem, 10vw, 3rem);
    }

    .hero-subtitle {
      font-size: 1rem;
      padding: 0 var(--space-4);
    }

    .hero-proof {
      flex-direction: column;
      gap: var(--space-2);
      padding: var(--space-4);
    }

    .proof-divider {
      width: 40px;
      height: 1px;
    }
  }
</style>
