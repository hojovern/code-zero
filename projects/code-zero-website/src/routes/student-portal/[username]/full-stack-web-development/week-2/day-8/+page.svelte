<script lang="ts">
	import { page } from '$app/state';
	const username = $derived(page.params.username);
	const schedule = {
		morning: [
			{ time: "9:00 - 9:30", activity: "Supabase Storage Setup", outcome: "Bucket configured" },
			{ time: "9:30 - 10:30", activity: "Profile Pictures", outcome: "Avatar upload working" },
			{ time: "10:30 - 10:45", activity: "Break", outcome: "" },
			{ time: "10:45 - 12:00", activity: "File Attachments", outcome: "Attach files to items" }
		],
		afternoon: [
			{ time: "13:00 - 13:30", activity: "Standup: Show uploads", outcome: "Demo file handling" },
			{ time: "13:30 - 14:30", activity: "Drag & Drop UX", outcome: "Modern upload experience" },
			{ time: "14:30 - 14:45", activity: "Break", outcome: "" },
			{ time: "14:45 - 15:45", activity: "Image Optimization", outcome: "Thumbnails + compression" },
			{ time: "15:45 - 16:30", activity: "Gallery Component", outcome: "Display uploaded media" },
			{ time: "16:30 - 17:00", activity: "Security + Cleanup", outcome: "Secure access, remove orphans" },
			{ time: "17:00 - 17:30", activity: "Ship", outcome: "Deploy with file handling" }
		]
	};

	const checklist = [
		"Avatar upload works",
		"File attachments work",
		"Drag & drop works",
		"Images display correctly",
		"Private files require auth",
		"Mobile upload works"
	];
</script>

<svelte:head>
	<title>Day 8: Files & Media | code:zero</title>
	<meta name="description" content="Your app handles more than text now. Profile pictures, attachments, drag & drop uploads." />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
</svelte:head>

<!-- Navigation -->
<nav class="navbar">
	<div class="nav-container">
		<a href="/student-portal/{username}/full-stack-web-development/week-2" class="nav-back">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M19 12H5M12 19l-7-7 7-7"/>
			</svg>
		</a>
		<span class="nav-title">Day 8: Files & Media</span>
		<div class="nav-spacer"></div>
	</div>
</nav>

<article class="lesson">
	<div class="container">
		<!-- Breadcrumb -->
		<nav class="breadcrumb">
			<a href="/student-portal/{username}">Learn</a>
			<span class="sep">/</span>
			<a href="/student-portal/{username}/full-stack-web-development/week-2">Week 2</a>
			<span class="sep">/</span>
			<span class="current">Day 8</span>
		</nav>

		<!-- Lesson Header -->
		<header class="lesson-header">
			<div class="day-badge">Day 8</div>
			<h1 class="lesson-title">Files & Media</h1>
			<p class="lesson-tagline">"Your app handles more than text now."</p>
		</header>

		<!-- Challenge -->
		<section class="content-section">
			<div class="challenge-card">
				<h2>The Challenge</h2>
				<p><strong>By end of day, users can upload files to your product.</strong></p>
				<p>Profile pictures. Attachments. Images. Documents. Whatever your product needs—users can upload it, you can store it, and your app can display it.</p>
			</div>
		</section>

		<!-- What You're Building -->
		<section class="content-section">
			<h2>What You're Building</h2>
			<div class="info-table">
				<div class="info-row header">
					<span>Feature</span>
					<span>What It Does</span>
				</div>
				<div class="info-row">
					<span>Profile pictures</span>
					<span>Users upload and display avatars</span>
				</div>
				<div class="info-row">
					<span>File attachments</span>
					<span>Attach files to your core feature</span>
				</div>
				<div class="info-row">
					<span>Image gallery</span>
					<span>Display and manage uploaded images</span>
				</div>
				<div class="info-row">
					<span>Drag & drop upload</span>
					<span>Modern, intuitive upload UX</span>
				</div>
				<div class="info-row">
					<span>Image optimization</span>
					<span>Resize, compress, generate thumbnails</span>
				</div>
			</div>
			<div class="highlight-box">
				<strong>The Unlock</strong>
				<p>Your product handles real user content, not just text.</p>
			</div>
		</section>

		<!-- Schedule -->
		<section class="content-section">
			<h2>Schedule</h2>

			<h3>Morning Block (9:00 - 12:00)</h3>
			<div class="schedule-table">
				{#each schedule.morning as item}
					<div class="schedule-row" class:break={item.activity === 'Break'}>
						<span class="schedule-time">{item.time}</span>
						<span class="schedule-activity">{item.activity}</span>
						<span class="schedule-outcome">{item.outcome}</span>
					</div>
				{/each}
			</div>

			<h3>Lunch (12:00 - 13:00)</h3>

			<h3>Afternoon Block (13:00 - 17:30)</h3>
			<div class="schedule-table">
				{#each schedule.afternoon as item}
					<div class="schedule-row" class:break={item.activity === 'Break'}>
						<span class="schedule-time">{item.time}</span>
						<span class="schedule-activity">{item.activity}</span>
						<span class="schedule-outcome">{item.outcome}</span>
					</div>
				{/each}
			</div>
		</section>

		<!-- Morning Content -->
		<section class="content-section">
			<h2>Morning: Core Upload System</h2>

			<h3>1. Supabase Storage Setup (30 min)</h3>

			<div class="code-block prompt">
				<pre><code>You: Set up Supabase Storage for my app.

I need buckets for:
- avatars: User profile pictures (public)
- attachments: Files attached to [my feature] (private per user)

Create:
- The bucket configuration
- RLS policies so users only access their own files
- A storage utility file with upload/download/delete functions

Explain the difference between public and private buckets.</code></pre>
			</div>

			<p><strong>Key concepts:</strong></p>
			<div class="info-table">
				<div class="info-row">
					<span>Bucket</span>
					<span>Container for files (like a folder)</span>
				</div>
				<div class="info-row">
					<span>Public bucket</span>
					<span>Anyone with URL can view</span>
				</div>
				<div class="info-row">
					<span>Private bucket</span>
					<span>Requires authentication</span>
				</div>
				<div class="info-row">
					<span>Signed URL</span>
					<span>Temporary access URL with expiration</span>
				</div>
				<div class="info-row">
					<span>RLS on Storage</span>
					<span>Same security as database tables</span>
				</div>
			</div>

			<h3>2. Profile Pictures (60 min)</h3>

			<div class="code-block prompt">
				<pre><code>You: Add profile picture upload to the user profile/student-portal.

Create:
1. Avatar display component:
   - Show current avatar (or placeholder if none)
   - Circular crop display
   - Click to change

2. Avatar upload flow:
   - Click avatar opens file picker
   - Only allow images (jpg, png, webp)
   - Max file size: 2MB
   - Show preview before upload
   - Upload to avatars bucket
   - Update profile table with avatar URL
   - Show loading state during upload

3. Store avatar URL in profiles table:
   - Add avatar_url column if not exists
   - Update when new avatar uploaded

Make the experience smooth—preview, upload, done.</code></pre>
			</div>

			<p><strong>Test the flow:</strong></p>
			<ol>
				<li>Click your avatar placeholder</li>
				<li>Select an image</li>
				<li>See preview</li>
				<li>Confirm upload</li>
				<li>Avatar updates everywhere it's displayed</li>
			</ol>

			<h3>3. File Attachments (75 min)</h3>

			<div class="code-block prompt">
				<pre><code>You: Add file attachments to [my feature - e.g., notes, tasks].

1. Update database:
   - Add attachments column (array of file objects)
   - Each attachment: { name, url, type, size, uploaded_at }

2. Create attachment component:
   - Show list of attached files
   - Display file icon based on type (image, pdf, doc, etc.)
   - Click to download/view
   - Delete button for each

3. Create upload button:
   - "Add attachment" button
   - Multiple file select
   - Show upload progress per file
   - Max 5 files, 10MB each

4. Handle different file types:
   - Images: Show thumbnail preview
   - PDFs: Show PDF icon
   - Documents: Show doc icon
   - Other: Generic file icon

Integrate this into the [feature] create/edit form.</code></pre>
			</div>
		</section>

		<!-- Afternoon Content -->
		<section class="content-section">
			<h2>Afternoon: Polish & Advanced Features</h2>

			<h3>4. Drag & Drop UX (60 min)</h3>

			<div class="code-block prompt">
				<pre><code>You: Add drag-and-drop upload support.

1. Create a DropZone component:
   - Visual drop area with dashed border
   - "Drag files here or click to browse"
   - Highlight when dragging over (change border color)
   - Support multiple files
   - Show file previews after drop

2. Add global drop support:
   - Drag file anywhere on the page
   - Full-page overlay appears
   - Drop to upload to current context

3. Paste support:
   - Ctrl+V to paste images from clipboard
   - Auto-upload pasted images

4. Progress UI:
   - Show each file with progress bar
   - Cancel button per file
   - Success/error state per file
   - "Upload complete" summary

Make it feel modern and intuitive.</code></pre>
			</div>

			<h3>5. Image Optimization (60 min)</h3>

			<div class="code-block prompt">
				<pre><code>You: Add image optimization before upload.

1. Client-side resize:
   - Before uploading, resize images to max 1920px width
   - Maintain aspect ratio
   - Use canvas API for resize
   - Compress to 80% quality

2. Generate thumbnails:
   - Create 200px thumbnail version
   - Upload both original and thumbnail
   - Store both URLs

3. Progressive loading:
   - Show thumbnail first (blur)
   - Load full image in background
   - Fade to full when loaded

4. Format optimization:
   - Convert to WebP if browser supports
   - Fall back to JPEG

This keeps storage costs down and improves load times.</code></pre>
			</div>

			<h3>6. Gallery Component (45 min)</h3>

			<div class="code-block prompt">
				<pre><code>You: Create a reusable image gallery component.

Features:
1. Grid layout:
   - Responsive grid of thumbnails
   - Masonry-style or uniform grid
   - Lazy load images as user scrolls

2. Lightbox:
   - Click image to open full-size
   - Navigate between images (arrows/swipe)
   - Close on backdrop click or Escape
   - Zoom support

3. Actions:
   - Download button
   - Delete button (with confirmation)
   - Share/copy link button

4. Empty state:
   - "No images yet" with upload CTA

Use this for displaying attachments and any image collections.</code></pre>
			</div>

			<h3>7. Security + Cleanup (30 min)</h3>

			<div class="code-block prompt">
				<pre><code>You: Add security and cleanup for file storage.

1. Validate uploads:
   - Check file type on server (not just extension)
   - Enforce size limits
   - Scan for malicious files (or reject executables)

2. Secure access:
   - Private files: Use signed URLs with expiration
   - Validate user owns file before generating URL
   - Log file access for audit

3. Cleanup orphaned files:
   - When item deleted, delete its attachments
   - Function to find orphaned files (no DB reference)
   - Scheduled cleanup job (or manual)

4. Storage limits:
   - Track storage per user
   - Warn when approaching limit
   - Enforce limit on upload

Make sure no one can access files they shouldn't.</code></pre>
			</div>
		</section>

		<!-- End-of-Day Checklist -->
		<section class="content-section">
			<h2>End-of-Day Checklist</h2>
			<div class="checklist">
				{#each checklist as item}
					<label class="checklist-item">
						<input type="checkbox" />
						<span>{item}</span>
					</label>
				{/each}
			</div>
		</section>

		<!-- What You Built -->
		<section class="content-section">
			<h2>What You Built Today</h2>
			<div class="summary-table">
				<div class="summary-row">
					<span class="summary-asset">Profile pictures</span>
					<span class="summary-method">Avatar upload to public bucket</span>
				</div>
				<div class="summary-row">
					<span class="summary-asset">File attachments</span>
					<span class="summary-method">Multi-file upload to private bucket</span>
				</div>
				<div class="summary-row">
					<span class="summary-asset">Drag & drop</span>
					<span class="summary-method">Modern upload UX</span>
				</div>
				<div class="summary-row">
					<span class="summary-asset">Image optimization</span>
					<span class="summary-method">Client-side resize + thumbnails</span>
				</div>
				<div class="summary-row">
					<span class="summary-asset">Gallery</span>
					<span class="summary-method">Lightbox + grid display</span>
				</div>
				<div class="summary-row">
					<span class="summary-asset">Security</span>
					<span class="summary-method">RLS + signed URLs + validation</span>
				</div>
			</div>
			<p class="emphasis">Your app handles real content now. Users can upload their stuff, and your product stores and displays it properly.</p>
		</section>

		<!-- Why This Matters -->
		<section class="content-section">
			<div class="callout highlight">
				<h2>Why Files Matter</h2>
				<div class="info-table" style="margin-top: 1rem;">
					<div class="info-row">
						<span>Before</span>
						<span>After</span>
					</div>
					<div class="info-row">
						<span>Text-only profiles</span>
						<span>Rich profiles with photos</span>
					</div>
					<div class="info-row">
						<span>Links to external files</span>
						<span>Native file management</span>
					</div>
					<div class="info-row">
						<span>"Upload to Dropbox first"</span>
						<span>Upload directly in your app</span>
					</div>
					<div class="info-row">
						<span>Basic product</span>
						<span>Full-featured platform</span>
					</div>
				</div>
				<p style="margin-top: 1rem;">File handling is table stakes for real products. Now you have it.</p>
			</div>
		</section>

		<!-- Troubleshooting -->
		<section class="content-section">
			<h2>Troubleshooting</h2>
			<div class="info-table">
				<div class="info-row header">
					<span>Problem</span>
					<span>Solution</span>
				</div>
				<div class="info-row">
					<span>Upload fails silently</span>
					<span>Check bucket RLS policies</span>
				</div>
				<div class="info-row">
					<span>"File too large"</span>
					<span>Implement client-side resize first</span>
				</div>
				<div class="info-row">
					<span>Images not displaying</span>
					<span>Check if bucket is public or use signed URLs</span>
				</div>
				<div class="info-row">
					<span>CORS error on upload</span>
					<span>Verify Supabase project CORS settings</span>
				</div>
				<div class="info-row">
					<span>Slow uploads</span>
					<span>Add compression before upload</span>
				</div>
			</div>
		</section>

		<!-- Practice Exercise -->
		<section class="content-section">
			<h2>Practice Exercise</h2>
			<p>Complete this exercise to solidify today's skills:</p>
			<div class="exercises-grid">
				<a href="/syllabus/week-2/exercises/08-file-uploads.md" class="exercise-card" target="_blank">
					<div class="exercise-header">
						<span class="exercise-type">Solo</span>
						<span class="exercise-duration">75 min</span>
					</div>
					<h3>File Upload System</h3>
					<ul>
						<li>Configure Supabase Storage buckets with RLS</li>
						<li>Build drag-and-drop file upload UX</li>
						<li>Implement client-side image optimization</li>
						<li>Create secure file access with signed URLs</li>
					</ul>
				</a>
			</div>
		</section>

		<!-- Navigation -->
		<nav class="lesson-nav">
			<a href="/student-portal/{username}/full-stack-web-development/week-2/day-7" class="nav-prev">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M19 12H5M12 19l-7-7 7-7"/>
				</svg>
				Day 7: Polish Like a Pro
			</a>
			<a href="/student-portal/{username}/full-stack-web-development/week-2/day-9" class="nav-next">
				Day 9: Automate Everything
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
		</nav>
	</div>
</article>

<style>
	:global(:root) {
		--color-primary: #04A459;
		--color-primary-light: #2ECC71;
		--gradient-accent: linear-gradient(135deg, #04A459 0%, #2ECC71 100%);
		--bg-base: #1a1d23;
		--bg-elevated: #242933;
		--bg-surface: #2e3440;
		--bg-hover: #3b4252;
		--text-primary: #ffffff;
		--text-secondary: #a1a1a1;
		--text-muted: #6b7280;
		--border-subtle: #2e3440;
		--border-default: #3b4252;
		--font-heading: 'Quicksand', system-ui, sans-serif;
		--font-body: 'Quicksand', system-ui, sans-serif;
		--font-mono: 'JetBrains Mono', monospace;
		--radius-sm: 4px;
		--radius-md: 8px;
		--radius-lg: 12px;
		--radius-xl: 16px;
		--space-1: 0.25rem;
		--space-2: 0.5rem;
		--space-3: 0.75rem;
		--space-4: 1rem;
		--space-5: 1.25rem;
		--space-6: 1.5rem;
		--space-8: 2rem;
		--space-10: 2.5rem;
		--space-12: 3rem;
		--space-16: 4rem;
		--space-20: 5rem;
	}

	:global(*, *::before, *::after) { box-sizing: border-box; }

	:global(body) {
		margin: 0;
		font-family: var(--font-body);
		background: var(--bg-base);
		color: var(--text-secondary);
		line-height: 1.7;
	}

	.container {
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
		padding: 0 var(--space-4);
	}

	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		padding: var(--space-4) 0;
		background: rgba(26, 29, 35, 0.95);
		backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--border-subtle);
	}

	.nav-container {
		position: relative;
		max-width: 1280px;
		margin: 0 auto;
		padding: 0 var(--space-4);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.nav-back {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		color: var(--text-secondary);
		text-decoration: none;
		border-radius: var(--radius-md);
		transition: color 150ms, background 150ms;
	}

	.nav-back:hover {
		color: var(--text-primary);
		background: var(--bg-hover);
	}

	.nav-title {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		font-family: var(--font-heading);
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-secondary);
		letter-spacing: 0.02em;
		white-space: nowrap;
	}

	.nav-spacer { width: 40px; }

	.lesson {
		padding: calc(var(--space-20) + 60px) 0 var(--space-20);
	}

	.breadcrumb {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-size: 0.875rem;
		margin-bottom: var(--space-8);
	}

	.breadcrumb a {
		color: var(--text-muted);
		text-decoration: none;
	}

	.breadcrumb a:hover { color: var(--color-primary); }
	.breadcrumb .sep { color: var(--text-muted); }
	.breadcrumb .current { color: var(--text-secondary); }

	.lesson-header {
		margin-bottom: var(--space-12);
		padding-bottom: var(--space-8);
		border-bottom: 1px solid var(--border-subtle);
	}

	.day-badge {
		display: inline-block;
		padding: var(--space-2) var(--space-4);
		background: var(--gradient-accent);
		border-radius: var(--radius-md);
		font-size: 0.875rem;
		font-weight: 700;
		color: white;
		margin-bottom: var(--space-4);
	}

	.lesson-title {
		font-family: var(--font-heading);
		font-size: clamp(1.75rem, 5vw, 2.5rem);
		font-weight: 800;
		color: var(--text-primary);
		margin: 0 0 var(--space-3);
		letter-spacing: -0.02em;
		line-height: 1.2;
	}

	.lesson-tagline {
		font-size: 1.125rem;
		font-style: italic;
		color: var(--text-secondary);
		margin: 0;
	}

	.content-section {
		margin-bottom: var(--space-12);
	}

	.content-section h2 {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin: 0 0 var(--space-4);
		padding-top: var(--space-4);
		border-top: 1px solid var(--border-subtle);
	}

	.content-section h3 {
		font-family: var(--font-heading);
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: var(--space-8) 0 var(--space-3);
	}

	.content-section p { margin: 0 0 var(--space-4); }

	.content-section ul, .content-section ol {
		margin: 0 0 var(--space-4);
		padding-left: var(--space-6);
	}

	.content-section li { margin-bottom: var(--space-2); }
	.content-section a { color: var(--color-primary); }

	.content-section code {
		font-family: var(--font-mono);
		font-size: 0.875em;
		padding: var(--space-1) var(--space-2);
		background: var(--bg-surface);
		border-radius: var(--radius-sm);
		color: var(--color-primary-light);
	}

	.emphasis {
		font-weight: 600;
		color: var(--text-primary);
	}

	.challenge-card {
		background: linear-gradient(135deg, rgba(4, 164, 89, 0.1) 0%, rgba(4, 164, 89, 0.05) 100%);
		border: 1px solid rgba(4, 164, 89, 0.3);
		border-radius: var(--radius-lg);
		padding: var(--space-6);
	}

	.challenge-card h2 {
		border: none;
		padding-top: 0;
		margin-top: 0;
	}

	.code-block {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		margin: var(--space-4) 0;
		overflow: hidden;
	}

	.code-block pre {
		margin: 0;
		padding: var(--space-4);
		overflow-x: auto;
	}

	.code-block code {
		font-family: var(--font-mono);
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--text-secondary);
		background: none;
		padding: 0;
	}

	.code-block.prompt {
		border-left: 3px solid var(--color-primary);
	}

	.code-block.prompt code {
		color: var(--text-primary);
	}

	.info-table {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		overflow: hidden;
		margin: var(--space-4) 0;
	}

	.info-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		border-bottom: 1px solid var(--border-subtle);
	}

	.info-row:last-child { border-bottom: none; }

	.info-row.header span {
		font-weight: 600;
		color: var(--text-primary);
		background: var(--bg-surface);
	}

	.info-row span {
		padding: var(--space-3) var(--space-4);
		font-size: 0.875rem;
	}

	.info-row span:first-child {
		border-right: 1px solid var(--border-subtle);
		color: var(--text-muted);
	}

	.info-row span:last-child { color: var(--text-secondary); }

	.schedule-table {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		overflow: hidden;
		margin: var(--space-4) 0;
	}

	.schedule-row {
		display: grid;
		grid-template-columns: 120px 1fr 1fr;
		border-bottom: 1px solid var(--border-subtle);
	}

	.schedule-row:last-child { border-bottom: none; }

	.schedule-row.break {
		background: var(--bg-surface);
		opacity: 0.6;
	}

	.schedule-time, .schedule-activity, .schedule-outcome {
		padding: var(--space-3) var(--space-4);
		font-size: 0.875rem;
	}

	.schedule-time {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		color: var(--text-muted);
		border-right: 1px solid var(--border-subtle);
	}

	.schedule-activity {
		font-weight: 500;
		color: var(--text-primary);
		border-right: 1px solid var(--border-subtle);
	}

	.schedule-outcome {
		color: var(--color-primary);
		font-size: 0.8125rem;
	}

	.callout {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-left: 3px solid var(--color-primary);
		border-radius: var(--radius-md);
		padding: var(--space-4);
		margin: var(--space-4) 0;
	}

	.callout.highlight {
		background: linear-gradient(135deg, rgba(4, 164, 89, 0.1) 0%, rgba(4, 164, 89, 0.05) 100%);
		border: 1px solid rgba(4, 164, 89, 0.3);
		border-left: 3px solid var(--color-primary);
	}

	.callout h2 {
		border: none;
		padding-top: 0;
		margin-top: 0;
		font-size: 1.25rem;
	}

	.highlight-box {
		background: var(--gradient-accent);
		border-radius: var(--radius-lg);
		padding: var(--space-6);
		text-align: center;
		margin: var(--space-6) 0;
	}

	.highlight-box strong {
		display: block;
		font-family: var(--font-heading);
		font-size: 1.25rem;
		color: white;
		margin-bottom: var(--space-2);
	}

	.highlight-box p {
		color: rgba(255, 255, 255, 0.9);
		margin: 0;
	}

	.checklist {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-4);
	}

	.checklist-item {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3);
		cursor: pointer;
		border-radius: var(--radius-md);
		transition: background 150ms;
	}

	.checklist-item:hover { background: var(--bg-surface); }

	.checklist-item input {
		width: 20px;
		height: 20px;
		accent-color: var(--color-primary);
	}

	.checklist-item span {
		font-size: 0.9375rem;
		color: var(--text-secondary);
	}

	.summary-table {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		overflow: hidden;
		margin: var(--space-4) 0;
	}

	.summary-row {
		display: grid;
		grid-template-columns: 160px 1fr;
		border-bottom: 1px solid var(--border-subtle);
	}

	.summary-row:last-child { border-bottom: none; }

	.summary-asset, .summary-method {
		padding: var(--space-3) var(--space-4);
		font-size: 0.9375rem;
	}

	.summary-asset {
		font-weight: 600;
		color: var(--text-primary);
		background: var(--bg-surface);
		border-right: 1px solid var(--border-subtle);
	}

	.summary-method { color: var(--text-secondary); }

	.lesson-nav {
		display: flex;
		justify-content: space-between;
		gap: var(--space-4);
		padding-top: var(--space-8);
		border-top: 1px solid var(--border-subtle);
		margin-top: var(--space-12);
	}

	.lesson-nav a {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-4);
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		text-decoration: none;
		color: var(--text-secondary);
		font-weight: 500;
		transition: all 150ms;
	}

	.lesson-nav a:hover {
		border-color: var(--color-primary);
		color: var(--text-primary);
	}

	.nav-next { margin-left: auto; }

	.exercises-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-4);
		margin-top: var(--space-4);
	}

	.exercise-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-5);
		text-decoration: none;
		transition: all 200ms;
	}

	.exercise-card:hover {
		border-color: var(--color-primary);
		transform: translateY(-2px);
	}

	.exercise-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-3);
	}

	.exercise-type {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-primary);
		background: rgba(4, 164, 89, 0.15);
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-sm);
	}

	.exercise-duration {
		font-size: 0.8125rem;
		color: var(--text-muted);
	}

	.exercise-card h3 {
		font-family: var(--font-heading);
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 var(--space-3);
	}

	.exercise-card ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.exercise-card li {
		font-size: 0.875rem;
		color: var(--text-secondary);
		padding: var(--space-1) 0;
		padding-left: var(--space-4);
		position: relative;
	}

	.exercise-card li::before {
		content: "→";
		position: absolute;
		left: 0;
		color: var(--text-muted);
	}
</style>
