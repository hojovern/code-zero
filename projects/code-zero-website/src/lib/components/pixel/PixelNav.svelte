<script>
  import { page } from "$app/state";
  import { openLoginModal, openApplyModal } from "$lib/stores/auth";

  let mobileMenuOpen = $state(false);
  let learnDropdownOpen = $state(false);

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function handleApply(e) {
    if (e) e.preventDefault();
    mobileMenuOpen = false;
    openApplyModal();
  }

  function handleStudentPortal(e) {
    if (e) e.preventDefault();
    mobileMenuOpen = false;
    if (page.data.isLoggedIn && page.data.user?.username) {
      window.location.href = `/student-portal/${page.data.user.username}`;
    } else {
      openLoginModal();
    }
  }

  function closeDropdowns() {
    learnDropdownOpen = false;
  }
</script>

<svelte:window on:click={closeDropdowns} />

<nav class="pixel-navbar">
  <div class="nav-container">
    <!-- Logo -->
    <a href="/" class="nav-logo">
      <span class="logo-icon">{'<>'}</span>
      <span class="logo-text">code:zero</span>
    </a>

    <!-- Desktop Navigation -->
    <div class="nav-links">
      <!-- Learn Dropdown -->
      <div class="nav-dropdown">
        <button
          class="nav-link dropdown-trigger"
          onclick={(e) => { e.stopPropagation(); learnDropdownOpen = !learnDropdownOpen; }}
        >
          Learn
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>

        {#if learnDropdownOpen}
          <div class="dropdown-menu" onclick={(e) => e.stopPropagation()}>
            <div class="dropdown-section">
              <span class="dropdown-label">Courses</span>
              <a href="/full-stack-web-development" class="dropdown-item">
                <span class="dropdown-icon">🚀</span>
                <div>
                  <strong>Full Stack Web Dev</strong>
                  <span>4-week intensive program</span>
                </div>
              </a>
              <a href="/enterprise" class="dropdown-item">
                <span class="dropdown-icon">🏢</span>
                <div>
                  <strong>Enterprise AI</strong>
                  <span>3-day team training</span>
                </div>
              </a>
            </div>
            <div class="dropdown-section">
              <span class="dropdown-label">Resources</span>
              <a href="/prompts" class="dropdown-item">
                <span class="dropdown-icon">💬</span>
                <div>
                  <strong>Prompts Library</strong>
                  <span>AI prompts for builders</span>
                </div>
              </a>
              <a href="/blog" class="dropdown-item">
                <span class="dropdown-icon">📝</span>
                <div>
                  <strong>Blog</strong>
                  <span>Tips and tutorials</span>
                </div>
              </a>
            </div>
          </div>
        {/if}
      </div>

      <a href="/instructors" class="nav-link">About</a>
      <a href="#pricing" class="nav-link">Pricing</a>
    </div>

    <!-- Right side actions -->
    <div class="nav-actions">
      <button onclick={handleStudentPortal} class="nav-link portal-link">
        Student Portal
      </button>
      <button onclick={handleApply} class="btn-pixel-primary">
        Sign Up
      </button>
    </div>

    <!-- Mobile Menu Button -->
    <button
      class="mobile-menu-btn"
      onclick={toggleMobileMenu}
      aria-label="Toggle menu"
    >
      {#if mobileMenuOpen}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      {:else}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      {/if}
    </button>
  </div>

  <!-- Mobile Menu -->
  {#if mobileMenuOpen}
    <div class="mobile-menu">
      <a href="/full-stack-web-development" class="mobile-link" onclick={() => mobileMenuOpen = false}>
        Full Stack Web Dev
      </a>
      <a href="/enterprise" class="mobile-link" onclick={() => mobileMenuOpen = false}>
        Enterprise AI
      </a>
      <a href="/instructors" class="mobile-link" onclick={() => mobileMenuOpen = false}>
        About
      </a>
      <a href="/prompts" class="mobile-link" onclick={() => mobileMenuOpen = false}>
        Prompts
      </a>
      <a href="/blog" class="mobile-link" onclick={() => mobileMenuOpen = false}>
        Blog
      </a>
      <button onclick={handleStudentPortal} class="mobile-link">
        Student Portal
      </button>
      <button onclick={handleApply} class="btn-pixel-primary btn-full">
        Sign Up
      </button>
    </div>
  {/if}
</nav>

<style>
  .pixel-navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: var(--space-3) 0;
    background: rgba(10, 10, 35, 0.95);
    backdrop-filter: blur(12px);
    border-bottom: 2px solid var(--border-pixel);
  }

  .nav-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 var(--space-4);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* Logo */
  .nav-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
  }

  .logo-icon {
    font-family: var(--font-mono);
    font-size: 1.25rem;
    color: var(--color-primary);
  }

  .logo-text {
    font-family: var(--font-pixel);
    font-size: 0.875rem;
    color: white;
    letter-spacing: 0.05em;
  }

  /* Navigation Links */
  .nav-links {
    display: none;
    align-items: center;
    gap: var(--space-1);
  }

  @media (min-width: 900px) {
    .nav-links {
      display: flex;
    }
  }

  .nav-link {
    color: var(--text-secondary);
    text-decoration: none;
    padding: var(--space-2) var(--space-3);
    font-family: var(--font-body);
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: var(--radius-sm);
    transition: all 0.15s ease;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .nav-link:hover {
    color: white;
    background: rgba(255, 255, 255, 0.05);
  }

  .nav-link svg {
    transition: transform 0.2s ease;
  }

  .dropdown-trigger[aria-expanded="true"] svg {
    transform: rotate(180deg);
  }

  /* Dropdown */
  .nav-dropdown {
    position: relative;
  }

  .dropdown-menu {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 50%;
    transform: translateX(-50%);
    background: var(--bg-elevated);
    border: 2px solid var(--border-pixel);
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    min-width: 320px;
    display: flex;
    gap: var(--space-6);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    animation: dropdownFade 0.2s ease;
  }

  @keyframes dropdownFade {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  .dropdown-section {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .dropdown-label {
    font-family: var(--font-pixel);
    font-size: 0.5rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding-bottom: var(--space-2);
    border-bottom: 1px solid var(--border-subtle);
  }

  .dropdown-item {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    padding: var(--space-2);
    border-radius: var(--radius-sm);
    text-decoration: none;
    transition: background 0.15s ease;
  }

  .dropdown-item:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .dropdown-icon {
    font-size: 1.25rem;
    line-height: 1;
  }

  .dropdown-item div {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .dropdown-item strong {
    color: white;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .dropdown-item span {
    color: var(--text-muted);
    font-size: 0.75rem;
  }

  /* Right actions */
  .nav-actions {
    display: none;
    align-items: center;
    gap: var(--space-3);
  }

  @media (min-width: 900px) {
    .nav-actions {
      display: flex;
    }
  }

  .portal-link {
    color: var(--text-secondary);
    font-size: 0.875rem;
  }

  /* Yellow arcade button */
  .btn-pixel-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.625rem 1.25rem;
    background: var(--color-primary);
    color: #0a0a23;
    font-family: var(--font-pixel);
    font-size: 0.625rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    box-shadow:
      0 3px 0 var(--color-primary-dark),
      0 4px 15px rgba(255, 215, 0, 0.3);
    transition: all 0.1s ease;
  }

  .btn-pixel-primary:hover {
    transform: translateY(-1px);
    box-shadow:
      0 4px 0 var(--color-primary-dark),
      0 6px 20px rgba(255, 215, 0, 0.4);
  }

  .btn-pixel-primary:active {
    transform: translateY(2px);
    box-shadow:
      0 1px 0 var(--color-primary-dark),
      0 2px 10px rgba(255, 215, 0, 0.2);
  }

  /* Mobile Menu Button */
  .mobile-menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
  }

  @media (min-width: 900px) {
    .mobile-menu-btn {
      display: none;
    }
  }

  /* Mobile Menu */
  .mobile-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--bg-elevated);
    border-bottom: 2px solid var(--border-pixel);
    padding: var(--space-4);
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .mobile-link {
    color: var(--text-secondary);
    text-decoration: none;
    padding: var(--space-3) var(--space-4);
    font-size: 1rem;
    font-weight: 500;
    border-radius: var(--radius-md);
    background: transparent;
    border: none;
    text-align: left;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .mobile-link:hover {
    background: rgba(255, 255, 255, 0.05);
    color: white;
  }

  .btn-full {
    width: 100%;
    justify-content: center;
    margin-top: var(--space-2);
  }
</style>
