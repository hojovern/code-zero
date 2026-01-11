<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let showCreateForm = $state(false);
	let showLessonForm = $state<string | null>(null);
</script>

<svelte:head>
	<title>Manage Courses | Admin | code:zero</title>
</svelte:head>

<div class="admin-courses">
	<header class="page-header">
		<div class="header-content">
			<h1>📚 Manage Courses</h1>
			<p>{data.courses.length} courses available</p>
		</div>
		<button class="btn btn-primary" onclick={() => showCreateForm = !showCreateForm}>
			{showCreateForm ? '✕ Cancel' : '➕ Add Course'}
		</button>
	</header>

	<!-- Success/Error Messages -->
	{#if form?.created}
		<div class="alert alert-success">
			<span>✅</span> Course created successfully!
		</div>
	{/if}

	{#if form?.lessonAdded}
		<div class="alert alert-success">
			<span>✅</span> Lesson added successfully!
		</div>
	{/if}

	{#if form?.deleted}
		<div class="alert alert-success">
			<span>✅</span> Course deleted successfully.
		</div>
	{/if}

	{#if form?.error}
		<div class="alert alert-error">
			<span>⚠️</span> {form.error}
		</div>
	{/if}

	<!-- Create Course Form -->
	{#if showCreateForm}
		<section class="create-section">
			<h2>➕ Create New Course</h2>
			<form method="POST" action="?/create" use:enhance class="create-form">
				<div class="form-row">
					<div class="form-group">
						<label for="name">Course Name *</label>
						<input type="text" id="name" name="name" placeholder="Full Stack Web Development" required />
					</div>
					<div class="form-group">
						<label for="slug">Slug *</label>
						<input type="text" id="slug" name="slug" placeholder="full-stack-web-dev" pattern="[a-z0-9-]+" required />
					</div>
				</div>
				<div class="form-row">
					<div class="form-group">
						<label for="description">Description</label>
						<textarea id="description" name="description" placeholder="Learn to build modern web applications..." rows="2"></textarea>
					</div>
					<div class="form-group">
						<label for="weeks">Duration (weeks)</label>
						<input type="number" id="weeks" name="weeks" value="4" min="1" max="52" />
					</div>
				</div>
				<button type="submit" class="btn btn-primary">🚀 Create Course</button>
			</form>
		</section>
	{/if}

	<!-- Courses Grid -->
	<section class="courses-section">
		{#if data.courses.length === 0}
			<div class="empty-state">
				<span class="empty-icon">📚</span>
				<h3>No courses yet</h3>
				<p>Create your first course to get started.</p>
			</div>
		{:else}
			<div class="courses-grid">
				{#each data.courses as course}
					<div class="course-card" class:syllabus={course.isSyllabus}>
						<div class="course-header">
							<div class="course-badges">
								<div class="course-status" class:active={course.status === 'active'}>
									{course.status}
								</div>
								{#if course.isSyllabus}
									<div class="course-source">📁 Syllabus</div>
								{/if}
							</div>
							{#if !course.isSyllabus}
								<form method="POST" action="?/delete" use:enhance>
									<input type="hidden" name="courseId" value={course.id} />
									<button
										type="submit"
										class="btn-delete"
										onclick={(e) => {
											if (!confirm(`Delete ${course.name}? This will remove all lessons and enrollments.`)) {
												e.preventDefault();
											}
										}}
									>
										🗑️
									</button>
								</form>
							{/if}
						</div>

						<h3>{course.name}</h3>
						{#if course.description}
							<p class="course-desc">{course.description}</p>
						{/if}

						<div class="course-meta">
							<span class="meta-item">📅 {course.weeks === 1 ? '1 day' : `${course.weeks} weeks`}</span>
							<span class="meta-item">📖 {course.lessonCount} lessons</span>
							<span class="meta-item">👥 {course.enrollmentCount} students</span>
						</div>

						<div class="course-actions">
							{#if course.isSyllabus}
								<a
									href={course.slug === 'ceo-ai-command' ? '/enterprise/ceo-ai-command' : '/full-stack-web-development'}
									class="btn btn-secondary btn-sm"
									target="_blank"
								>
									👁️ View Page
								</a>
							{/if}
							<button
								class="btn btn-secondary btn-sm"
								onclick={() => showLessonForm = showLessonForm === course.id ? null : course.id}
							>
								{showLessonForm === course.id ? '✕ Cancel' : '➕ Add Lesson'}
							</button>
						</div>

						{#if showLessonForm === course.id}
							<form method="POST" action="?/addLesson" use:enhance class="lesson-form">
								<input type="hidden" name="courseId" value={course.id} />
								<div class="form-row compact">
									<div class="form-group">
										<label>Week</label>
										<input type="number" name="week" min="1" max={course.weeks} value="1" required />
									</div>
									<div class="form-group">
										<label>Day</label>
										<input type="number" name="day" min="1" max="7" value="1" required />
									</div>
								</div>
								<div class="form-group">
									<label>Title *</label>
									<input type="text" name="title" placeholder="Lesson title" required />
								</div>
								<div class="form-group">
									<label>Content Path</label>
									<input type="text" name="contentPath" placeholder="/student-portal/week-1/day-1" />
								</div>
								<button type="submit" class="btn btn-primary btn-sm">Add Lesson</button>
							</form>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</section>
</div>

<style>
	.admin-courses {
		max-width: 1200px;
		margin: 0 auto;
		padding: var(--space-6);
	}

	/* Header */
	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: var(--space-6);
	}

	.page-header h1 {
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-1);
	}

	.page-header p {
		color: var(--text-muted);
		font-size: 0.9375rem;
	}

	/* Alerts */
	.alert {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-4);
		border-radius: var(--radius-lg);
		margin-bottom: var(--space-6);
	}

	.alert-success {
		background: rgba(4, 164, 89, 0.1);
		border: 1px solid rgba(4, 164, 89, 0.3);
		color: var(--color-primary);
	}

	.alert-error {
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.3);
		color: #ef4444;
	}

	/* Create Section */
	.create-section {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl);
		padding: var(--space-6);
		margin-bottom: var(--space-6);
	}

	.create-section h2 {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-5);
	}

	.create-form, .lesson-form {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.form-row {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--space-4);
	}

	.form-row.compact {
		grid-template-columns: repeat(2, 1fr);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.form-group label {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-secondary);
	}

	.form-group input,
	.form-group textarea {
		padding: var(--space-3);
		background: var(--bg-base);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		color: var(--text-primary);
		font-size: 1rem;
		font-family: inherit;
	}

	.form-group input:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: var(--color-primary);
	}

	/* Buttons */
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-5);
		font-size: 0.9375rem;
		font-weight: 600;
		border-radius: var(--radius-md);
		border: none;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.btn-primary {
		background: var(--color-primary);
		color: white;
	}

	.btn-primary:hover {
		background: var(--color-primary-light);
	}

	.btn-secondary {
		background: var(--bg-surface);
		color: var(--text-primary);
		border: 1px solid var(--border-subtle);
	}

	.btn-secondary:hover {
		border-color: var(--color-primary);
	}

	.btn-sm {
		padding: var(--space-2) var(--space-3);
		font-size: 0.8125rem;
	}

	.btn-delete {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 1rem;
		opacity: 0.5;
		transition: opacity 0.15s;
	}

	.btn-delete:hover {
		opacity: 1;
	}

	/* Courses Grid */
	.courses-section {
		margin-bottom: var(--space-6);
	}

	.courses-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: var(--space-5);
	}

	.course-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-5);
	}

	.course-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: var(--space-3);
	}

	.course-badges {
		display: flex;
		gap: var(--space-2);
		flex-wrap: wrap;
	}

	.course-source {
		font-size: 0.6875rem;
		font-weight: 600;
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-sm);
		background: rgba(59, 130, 246, 0.1);
		color: #3b82f6;
	}

	.course-card.syllabus {
		border-left: 3px solid #3b82f6;
	}

	.course-status {
		font-size: 0.6875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-sm);
		background: var(--bg-surface);
		color: var(--text-muted);
	}

	.course-status.active {
		background: rgba(4, 164, 89, 0.1);
		color: var(--color-primary);
	}

	.course-card h3 {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.course-desc {
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.5;
		margin-bottom: var(--space-4);
	}

	.course-meta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
		margin-bottom: var(--space-4);
	}

	.meta-item {
		font-size: 0.8125rem;
		color: var(--text-muted);
	}

	.course-actions {
		margin-bottom: var(--space-4);
	}

	.lesson-form {
		margin-top: var(--space-4);
		padding-top: var(--space-4);
		border-top: 1px solid var(--border-subtle);
	}

	/* Empty State */
	.empty-state {
		text-align: center;
		padding: var(--space-12);
		background: var(--bg-elevated);
		border: 1px dashed var(--border-subtle);
		border-radius: var(--radius-xl);
	}

	.empty-icon {
		font-size: 4rem;
		display: block;
		margin-bottom: var(--space-4);
	}

	.empty-state h3 {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.empty-state p {
		color: var(--text-muted);
	}
</style>
