<script>
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import { openLoginModal, openApplyModal } from "$lib/stores/auth";
  import LogoConcept1 from "$lib/components/logos/LogoConcept1.svelte";

  // Mobile menu state
  let mobileMenuOpen = false;
  let toolsDropdownOpen = $state(false);
  let mobileToolsOpen = $state(false);

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    mobileToolsOpen = false;
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
    if (page.data.isLoggedIn) {
      goto('/portal');
    } else {
      openLoginModal();
    }
  }

  function closeDropdown() {
    toolsDropdownOpen = false;
  }

  // Tools menu items
  const toolsItems = [
    { href: '/prompts', label: 'Prompts', icon: '💬', description: 'Ready-to-use AI prompts' },
    { href: '/agents', label: 'Agents', icon: '🤖', description: 'Specialized AI agents' },
    { href: '/skills', label: 'Skills', icon: '⚡', description: 'Workflow automations' },
    { href: '/mcp', label: 'MCP', icon: '🔌', description: 'Model Context Protocol' },
    { href: '/environment-setup', label: 'Setup', icon: '🛠️', description: 'Environment setup guide' },
  ];
</script>

<svelte:window onclick={(e) => {
  if (!e.target.closest('.tools-dropdown')) {
    toolsDropdownOpen = false;
  }
}} />

<nav class="navbar">
  <div class="nav-container">
    <a href="/" class="nav-logo">
      <LogoConcept1 size={56} showText={true} />
    </a>
    <div class="nav-links">
      <a href="/full-stack-web-development" class="nav-link">Full Stack</a>
      <a href="/enterprise" class="nav-link">Enterprise</a>
      <a href="/instructors" class="nav-link">Instructors</a>
      <a href="/blog" class="nav-link">Blog</a>

      <!-- Tools Dropdown -->
      <div class="tools-dropdown" class:open={toolsDropdownOpen}>
        <button
          class="nav-link tools-trigger"
          onclick={() => toolsDropdownOpen = !toolsDropdownOpen}
          aria-expanded={toolsDropdownOpen}
        >
          <span class="tools-icon">🧰</span>
          Tools
          <svg class="dropdown-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>

        {#if toolsDropdownOpen}
          <div class="dropdown-menu">
            <div class="dropdown-content">
              {#each toolsItems as item}
                <a href={item.href} class="dropdown-item" onclick={closeDropdown}>
                  <span class="dropdown-item-icon">{item.icon}</span>
                  <div class="dropdown-item-text">
                    <span class="dropdown-item-label">{item.label}</span>
                    <span class="dropdown-item-desc">{item.description}</span>
                  </div>
                </a>
              {/each}
            </div>
          </div>
        {/if}
      </div>

      <a href="/portal" onclick={handleStudentPortal} class="nav-link">Student Portal</a>
    </div>
    <div class="nav-actions">
      <button onclick={handleApply} class="btn btn-primary btn-nav"
        >Start Learning</button
      >
    </div>

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
        href="/portal"
        onclick={handleStudentPortal}
        class="mobile-link">Student Portal</a
      >
      <a
        href="/instructors"
        class="mobile-link"
        onclick={() => (mobileMenuOpen = false)}>Instructors</a
      >
      <a
        href="/blog"
        class="mobile-link"
        onclick={() => (mobileMenuOpen = false)}>Blog</a
      >

      <!-- Mobile Tools Section -->
      <button
        class="mobile-link mobile-tools-trigger"
        onclick={() => mobileToolsOpen = !mobileToolsOpen}
      >
        <span>🧰 Tools</span>
        <svg class="mobile-arrow" class:open={mobileToolsOpen} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {#if mobileToolsOpen}
        <div class="mobile-tools-submenu">
          {#each toolsItems as item}
            <a
              href={item.href}
              class="mobile-link mobile-submenu-item"
              onclick={() => (mobileMenuOpen = false)}
            >
              <span class="mobile-item-icon">{item.icon}</span>
              {item.label}
            </a>
          {/each}
        </div>
      {/if}

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
    max-width: 100%;
    margin: 0;
    padding: 0 var(--space-6);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-logo {
    text-decoration: none;
    display: flex;
    align-items: center;
    flex: 1;
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
    gap: var(--space-1);
    flex: 3;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
  }

  @media (min-width: 768px) {
    .nav-links {
      display: flex;
    }
  }

  .nav-link {
    color: var(--text-secondary);
    text-decoration: none;
    padding: var(--space-2) var(--space-2);
    font-size: 0.8rem;
    font-weight: 500;
    border-radius: var(--radius-md);
    white-space: nowrap;
    transition:
      color var(--duration-fast) var(--ease-default),
      background var(--duration-fast) var(--ease-default);
  }

  .nav-link:hover {
    color: var(--text-primary);
    background: var(--bg-hover);
  }

  /* ========================================
     TOOLS DROPDOWN
     ======================================== */
  .tools-dropdown {
    position: relative;
  }

  .tools-trigger {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    background: none;
    border: none;
    cursor: pointer;
  }

  .tools-icon {
    font-size: 0.9rem;
  }

  .dropdown-arrow {
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    margin-left: 2px;
  }

  .tools-dropdown.open .dropdown-arrow {
    transform: rotate(180deg);
  }

  .tools-dropdown.open .tools-trigger {
    color: var(--text-primary);
    background: var(--bg-hover);
  }

  .dropdown-menu {
    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    min-width: 280px;
    background: var(--bg-elevated);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-xl);
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.05);
    overflow: hidden;
    animation: dropdownIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    transform-origin: top center;
  }

  @keyframes dropdownIn {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-8px) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0) scale(1);
    }
  }

  .dropdown-content {
    padding: var(--space-2);
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-lg);
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .dropdown-item:hover {
    background: rgba(4, 164, 89, 0.1);
    transform: translateX(4px);
  }

  .dropdown-item:hover .dropdown-item-icon {
    transform: scale(1.15);
  }

  .dropdown-item-icon {
    font-size: 1.25rem;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    border-radius: var(--radius-md);
    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .dropdown-item-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .dropdown-item-label {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-primary);
  }

  .dropdown-item-desc {
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .dropdown-item:hover .dropdown-item-label {
    color: var(--color-primary);
  }

  /* ========================================
     BUTTONS
     ======================================== */
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

  .nav-actions {
    display: none;
    flex: 1;
    justify-content: flex-end;
  }

  @media (min-width: 768px) {
    .nav-actions {
      display: flex;
    }
  }

  .btn-nav {
    /* No extra styles needed, inherits from .btn */
  }

  /* ========================================
     MOBILE MENU
     ======================================== */
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
    animation: mobileMenuIn 0.2s ease;
  }

  @keyframes mobileMenuIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
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

  .mobile-tools-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
  }

  .mobile-arrow {
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .mobile-arrow.open {
    transform: rotate(180deg);
  }

  .mobile-tools-submenu {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding-left: var(--space-4);
    margin-top: var(--space-1);
    border-left: 2px solid rgba(4, 164, 89, 0.3);
    animation: submenuIn 0.2s ease;
  }

  @keyframes submenuIn {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .mobile-submenu-item {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-2) var(--space-4);
    font-size: 0.95rem;
  }

  .mobile-item-icon {
    font-size: 1.1rem;
  }

  .btn-full {
    width: 100%;
    justify-content: center;
    margin-top: var(--space-2);
  }

  /* Mobile Navbar - Thinner (logo stays same size) */
  @media (max-width: 768px) {
    .navbar {
      padding: var(--space-1) 0;
    }
  }
</style>
