<script lang="ts">
	import type { Snippet } from "svelte";
	import type { LayoutData } from "./$types";
	import { page } from "$app/state";
	import { getLevelProgress } from "$lib/config/gamification";
	import LogoConcept1 from "$lib/components/logos/LogoConcept1.svelte";

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	const levelProgress = $derived(
		getLevelProgress(data.user.xpTotal, data.user.level),
	);
	const username = $derived(data.user.username);
	const isViewingAsAdmin = $derived(
		!data.isOwnProfile && data.currentUser.isAdmin,
	);

	// Detect if we're in a course view (full-screen mode)
	// Check if path is /student-portal/username/something where 'something' is not a known portal sub-page
	const knownPortalPages = ["my-courses", "settings"];
	const isInCourse = $derived.by(() => {
		const pathParts = page.url.pathname.split("/").filter(Boolean);
		// Pattern: student-portal / username / courseSlug (+ optional week/day)
		// pathParts[0] = 'student-portal', pathParts[1] = username, pathParts[2] = courseSlug or known page
		if (pathParts.length >= 3 && pathParts[0] === "student-portal") {
			const potentialCourse = pathParts[2];
			return !knownPortalPages.includes(potentialCourse);
		}
		return false;
	});

	// Get first name for greeting
	const firstName = $derived(
		data.user.role === "super_admin"
			? "Super Admin"
			: data.user.name?.split(" ")[0] || data.user.username,
	);

	// Get greeting based on time
	function getGreeting(): string {
		const hour = new Date().getHours();
		if (hour < 12) return "Good morning";
		if (hour < 18) return "Good afternoon";
		return "Good evening";
	}

	function isActive(path: string): boolean {
		return page.url.pathname === path;
	}

	function isActivePrefix(prefix: string): boolean {
		return page.url.pathname.startsWith(prefix);
	}
</script>

<svelte:head>
	<title>Student Portal | code:zero</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link
		rel="preconnect"
		href="https://fonts.gstatic.com"
		crossorigin="anonymous"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Quicksand:wght@300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<!-- Full-screen mode for course view -->
{#if isInCourse}
	<div class="course-fullscreen">
		{@render children()}
	</div>
{:else}
	<div class="portal">
		<!-- Top Header -->
		<header class="portal-header">
			<div class="header-left">
				<a href="/" class="logo" data-sveltekit-reload>
					<LogoConcept1 size={38} />
				</a>
			</div>

			<nav class="header-nav">
				<a
					href="/student-portal/{username}"
					class="nav-link"
					class:active={isActive(`/student-portal/${username}`)}
				>
					Dashboard
				</a>
				<a
					href="/student-portal/{username}/my-courses"
					class="nav-link"
					class:active={isActivePrefix(
						`/student-portal/${username}/my-courses`,
					)}
				>
					My Courses
				</a>
				<a
					href="/student-portal/{username}/settings"
					class="nav-link"
					class:active={isActive(
						`/student-portal/${username}/settings`,
					)}
				>
					Settings
				</a>
				{#if data.user.canAccessAdmin}
					<a href="/admin" class="nav-link nav-admin">
						{data.user.role === "super_admin"
							? "Super Admin"
							: "Admin"}
					</a>
				{/if}
			</nav>

			<div class="header-right">
				<div class="xp-badge">
					<span class="xp-icon">⚡</span>
					<span class="xp-value">{data.user.xpTotal}</span>
				</div>
				<form action="/auth/signout" method="POST" class="signout-form">
					<button type="submit" class="btn-signout" title="Sign out">
						<svg
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
							<polyline points="16 17 21 12 16 7" />
							<line x1="21" y1="12" x2="9" y2="12" />
						</svg>
					</button>
				</form>
			</div>
		</header>

		<!-- Personal Welcome Section -->
		<div class="welcome-section">
			<div class="welcome-content">
				<div class="user-greeting">
					<div class="avatar-large">
						{#if data.user.avatarUrl}
							<img src={data.user.avatarUrl} alt="" />
						{:else}
							<span>{firstName.charAt(0).toUpperCase()}</span>
						{/if}
						<div class="level-ring">
							<svg viewBox="0 0 36 36">
								<path
									d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
									fill="none"
									stroke="rgba(255,255,255,0.1)"
									stroke-width="2"
								/>
								<path
									d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
									fill="none"
									stroke="var(--color-primary)"
									stroke-width="2"
									stroke-dasharray="{levelProgress.percentage}, 100"
									stroke-linecap="round"
								/>
							</svg>
							<span class="level-num">{data.user.level}</span>
						</div>
					</div>
					<div class="greeting-text">
						<h1>{getGreeting()}, {firstName}!</h1>
						<p>
							{#if data.enrollments?.length > 0}
								You have {data.enrollments.length} active course{data
									.enrollments.length > 1
									? "s"
									: ""}. Keep up the momentum!
							{:else}
								Welcome to your learning dashboard.
							{/if}
						</p>
					</div>
				</div>

				<div class="quick-stats">
					<div class="stat">
						<span class="stat-value"
							>{levelProgress.current}/{levelProgress.needed}</span
						>
						<span class="stat-label"
							>XP to Level {data.user.level + 1}</span
						>
					</div>
					<div class="stat">
						<span class="stat-value"
							>{data.achievements?.length || 0}</span
						>
						<span class="stat-label">Badges Earned</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Admin viewing banner -->
		{#if isViewingAsAdmin}
			<div class="admin-bar">
				<div class="admin-bar-content">
					<span class="admin-bar-icon">👁️</span>
					<span
						>Viewing as {data.currentUser.role === "super_admin"
							? "Super Admin"
							: "Admin"} | Target:
						<strong>{data.user.name || data.user.username}</strong
						></span
					>
				</div>
				<div class="admin-bar-actions">
					<a
						href="/admin/students/{data.user.username}"
						class="admin-btn">Manage</a
					>
					<a
						href="/student-portal/{data.currentUser.username}"
						class="admin-btn secondary">← My Portal</a
					>
				</div>
			</div>
		{/if}

		<!-- Main Content -->
		<main class="portal-main">
			{@render children()}
		</main>
	</div>
{/if}

<style>
	/* Course full-screen mode - no dashboard chrome */
	.course-fullscreen {
		min-height: 100vh;
		background: var(--bg-base);
	}
	.portal {
		min-height: 100vh;
		background: var(--bg-base);
	}

	/* Header */
	.portal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 var(--space-6);
		height: 64px;
		background: var(--bg-elevated);
		border-bottom: 1px solid var(--border-subtle);
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.header-left {
		display: flex;
		align-items: center;
	}

	.logo {
		text-decoration: none;
		display: flex;
		align-items: center;
	}

	.logo-text {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.logo-accent {
		color: var(--color-primary);
	}

	.header-nav {
		display: flex;
		align-items: center;
		gap: var(--space-1);
	}

	.nav-link {
		padding: var(--space-2) var(--space-4);
		color: var(--text-secondary);
		text-decoration: none;
		font-size: 0.9rem;
		font-weight: 500;
		border-radius: var(--radius-md);
		transition: all 0.15s;
	}

	.nav-link:hover {
		color: var(--text-primary);
		background: var(--bg-surface);
	}

	.nav-link.active {
		color: var(--color-primary);
		background: rgba(4, 164, 89, 0.1);
	}

	.nav-admin {
		color: var(--text-muted);
		font-size: 0.8rem;
	}

	.header-right {
		display: flex;
		align-items: center;
		gap: var(--space-4);
	}

	.xp-badge {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		padding: var(--space-2) var(--space-3);
		background: rgba(4, 164, 89, 0.1);
		border-radius: var(--radius-full);
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--color-primary);
	}

	.xp-icon {
		font-size: 0.9rem;
	}

	.signout-form {
		display: flex;
	}

	.btn-signout {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		background: none;
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		color: var(--text-muted);
		cursor: pointer;
		transition: all 0.15s;
	}

	.btn-signout:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
	}

	/* Welcome Section */
	.welcome-section {
		background: linear-gradient(
			135deg,
			var(--bg-elevated) 0%,
			var(--bg-base) 100%
		);
		border-bottom: 1px solid var(--border-subtle);
		padding: var(--space-8) var(--space-6);
	}

	.welcome-content {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-8);
	}

	.user-greeting {
		display: flex;
		align-items: center;
		gap: var(--space-6);
	}

	.avatar-large {
		position: relative;
		width: 80px;
		height: 80px;
	}

	.avatar-large img,
	.avatar-large > span {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		object-fit: cover;
	}

	.avatar-large > span {
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(
			135deg,
			var(--color-primary),
			var(--color-primary-light)
		);
		font-size: 2rem;
		font-weight: 700;
		color: white;
	}

	.level-ring {
		position: absolute;
		inset: -4px;
		pointer-events: none;
	}

	.level-ring svg {
		width: 100%;
		height: 100%;
		transform: rotate(-90deg);
	}

	.level-num {
		position: absolute;
		bottom: -2px;
		right: -2px;
		width: 24px;
		height: 24px;
		background: var(--color-primary);
		border: 2px solid var(--bg-elevated);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.7rem;
		font-weight: 700;
		color: white;
	}

	.greeting-text h1 {
		font-family: var(--font-heading);
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--text-primary);
		margin: 0 0 var(--space-1);
	}

	.greeting-text p {
		color: var(--text-secondary);
		font-size: 1rem;
		margin: 0;
	}

	.quick-stats {
		display: flex;
		gap: var(--space-8);
	}

	.stat {
		text-align: right;
	}

	.stat-value {
		display: block;
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.stat-label {
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	/* Admin Bar */
	.admin-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1200px;
		margin: var(--space-4) auto 0;
		padding: var(--space-3) var(--space-4);
		background: rgba(234, 179, 8, 0.1);
		border: 1px solid rgba(234, 179, 8, 0.3);
		border-radius: var(--radius-lg);
	}

	.admin-bar-content {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-size: 0.9rem;
		color: #eab308;
	}

	.admin-bar-content strong {
		color: var(--text-primary);
	}

	.admin-bar-actions {
		display: flex;
		gap: var(--space-2);
	}

	.admin-btn {
		padding: var(--space-2) var(--space-3);
		background: rgba(234, 179, 8, 0.2);
		border: 1px solid rgba(234, 179, 8, 0.3);
		border-radius: var(--radius-md);
		color: #eab308;
		font-size: 0.8rem;
		font-weight: 500;
		text-decoration: none;
		transition: all 0.15s;
	}

	.admin-btn:hover {
		background: rgba(234, 179, 8, 0.3);
	}

	.admin-btn.secondary {
		background: var(--bg-surface);
		border-color: var(--border-subtle);
		color: var(--text-secondary);
	}

	/* Main Content */
	.portal-main {
		max-width: 1200px;
		margin: 0 auto;
		padding: var(--space-8) var(--space-6);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.portal-header {
			padding: 0 var(--space-4);
		}

		.header-nav {
			display: none;
		}

		.welcome-content {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-6);
		}

		.quick-stats {
			width: 100%;
			justify-content: space-between;
		}

		.stat {
			text-align: left;
		}

		.greeting-text h1 {
			font-size: 1.5rem;
		}

		.portal-main {
			padding: var(--space-6) var(--space-4);
		}
	}
</style>
