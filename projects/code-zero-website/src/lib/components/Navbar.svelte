<script>
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import { openLoginModal, openApplyModal } from "$lib/stores/auth";
  import LogoConcept1 from "$lib/components/logos/LogoConcept1.svelte";

  // Mobile menu state
  let mobileMenuOpen = false;

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
    // Check if user is logged in from page data
    if (page.data.isLoggedIn && page.data.user?.username) {
      goto(`/student-portal/${page.data.user.username}`);
    } else {
      openLoginModal();
    }
  }
</script>

<nav class="navbar">
  <div class="nav-container">
    <a href="/" class="nav-logo">
      <LogoConcept1 size={48} />
    </a>
    <div class="nav-links">
      <a href="/full-stack-web-development" class="nav-link"
        >Full Stack Web Development</a
      >
      <a href="/enterprise" class="nav-link">Enterprise</a>
      <a href="/student-portal" onclick={handleStudentPortal} class="nav-link"
        >Student Portal</a
      >
      <a href="/instructors" class="nav-link">Instructors</a>
      <a href="/prompts" class="nav-link">Prompts</a>
      <a href="/blog" class="nav-link">Blog</a>
    </div>
    <button onclick={handleApply} class="btn btn-primary btn-nav"
      >Start Learning</button
    >

    <!-- Mobile Menu Button -->
    <button
      class="mobile-menu-btn"
      onclick={toggleMobileMenu}
      aria-label="Toggle menu"
    >
      {#if mobileMenuOpen}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      {:else}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      {/if}
    </button>
  </div>

  <!-- Mobile Menu -->
  {#if mobileMenuOpen}
    <div class="mobile-menu">
      <a
        href="/full-stack-web-development"
        class="mobile-link"
        onclick={() => (mobileMenuOpen = false)}>Full Stack Web Development</a
      >
      <a
        href="/enterprise"
        class="mobile-link"
        onclick={() => (mobileMenuOpen = false)}>Enterprise</a
      >
      <a
        href="/student-portal"
        onclick={handleStudentPortal}
        class="mobile-link">Student Portal</a
      >
      <a
        href="/instructors"
        class="mobile-link"
        onclick={() => (mobileMenuOpen = false)}>Instructors</a
      >
      <a
        href="/prompts"
        class="mobile-link"
        onclick={() => (mobileMenuOpen = false)}>Prompts</a
      >
      <a
        href="/blog"
        class="mobile-link"
        onclick={() => (mobileMenuOpen = false)}>Blog</a
      >
      <button onclick={handleApply} class="btn btn-primary btn-full"
        >Start Learning</button
      >
    </div>
  {/if}
</nav>

<style>
  /* ========================================
     NAVBAR
     ======================================== */
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: var(--space-3) 0;
    background: rgba(26, 29, 35, 0.9);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border-subtle);
  }

  .nav-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 var(--space-4);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-logo {
    text-decoration: none;
    display: flex;
    align-items: center;
  }

  .logo-text {
    font-family: var(--font-heading);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
  }

  .logo-accent {
    color: var(--color-primary);
  }

  .nav-links {
    display: none;
    gap: var(--space-2);
  }

  @media (min-width: 768px) {
    .nav-links {
      display: flex;
    }
  }

  .nav-link {
    color: var(--text-secondary);
    text-decoration: none;
    padding: var(--space-2) var(--space-3);
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: var(--radius-md);
    transition:
      color var(--duration-fast) var(--ease-default),
      background var(--duration-fast) var(--ease-default);
  }

  .nav-link:hover {
    color: var(--text-primary);
    background: var(--bg-hover);
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-6);
    font-family: var(--font-body);
    font-size: 0.875rem;
    font-weight: 600;
    border-radius: var(--radius-md);
    cursor: pointer;
    text-decoration: none;
    transition: all var(--duration-normal) var(--ease-default);
    border: none;
  }

  .btn-primary {
    background: var(--gradient-accent);
    color: white;
    box-shadow: var(--shadow-glow-sm), var(--shadow-md);
  }

  .btn-primary:hover {
    box-shadow: var(--shadow-glow-md), var(--shadow-lg);
    transform: translateY(-2px);
  }

  .btn-nav {
    display: none;
  }

  @media (min-width: 768px) {
    .btn-nav {
      display: inline-flex;
    }
  }

  /* Mobile Menu */
  .mobile-menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: transparent;
    border: none;
    color: var(--text-primary);
    cursor: pointer;
  }

  @media (min-width: 768px) {
    .mobile-menu-btn {
      display: none;
    }
  }

  .mobile-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--bg-elevated);
    border-bottom: 1px solid var(--border-subtle);
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
    transition:
      background var(--duration-fast),
      color var(--duration-fast);
  }

  .mobile-link:hover {
    background: var(--bg-surface);
    color: var(--text-primary);
  }

  .btn-full {
    width: 100%;
    justify-content: center;
  }

  /* Mobile Navbar - Thinner (logo stays same size) */
  @media (max-width: 768px) {
    .navbar {
      padding: var(--space-1) 0;
    }
  }
</style>
