<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let showCreateForm = $state(false);
	let selectedCourse = $state<string | null>(null);

	// Get the selected course data
	let selectedCourseData = $derived(
		selectedCourse ? data.courses.find(c => c.id === selectedCourse) : null
	);

	// Group lessons by week for display
	let lessonsByWeek = $derived(() => {
		if (!selectedCourseData) return {};
		const grouped: Record<number, typeof selectedCourseData.lessons> = {};
		for (const lesson of selectedCourseData.lessons) {
			if (!grouped[lesson.week]) grouped[lesson.week] = [];
			grouped[lesson.week].push(lesson);
		}
		for (const week in grouped) {
			grouped[week].sort((a, b) => a.day - b.day);
		}
		return grouped;
	});
</script>

<svelte:head>
	<title>Manage Courses | Admin | code:zero</title>
</svelte:head>

<div class="admin-courses">
	<header class="page-header">
		<div class="header-content">
			<h1>Manage Courses</h1>
			<p>{data.courses.length} courses available</p>
		</div>
		<button class="btn btn-primary" onclick={() => showCreateForm = !showCreateForm}>
			{showCreateForm ? 'Cancel' : '+ Add Course'}
		</button>
	</header>

	<!-- Success/Error Messages -->
	{#if form?.created}
		<div class="alert alert-success">Course created successfully!</div>
	{/if}
	{#if form?.updated}
		<div class="alert alert-success">Course updated successfully!</div>
	{/if}
	{#if form?.error}
		<div class="alert alert-error">{form.error}</div>
	{/if}

	<!-- Create Course Form -->
	{#if showCreateForm}
		<section class="create-section">
			<h2>Create New Course</h2>
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
				<button type="submit" class="btn btn-primary">Create Course</button>
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
					<div
						class="course-card"
						class:syllabus={course.isSyllabus}
						class:selected={selectedCourse === course.id}
					>
						<div class="course-header">
							<div class="course-badges">
								<div class="course-status" class:active={course.status === 'active'}>
									{course.status}
								</div>
								{#if course.isSyllabus}
									<div class="course-source">Syllabus</div>
								{/if}
							</div>
						</div>

						<h3>{course.name}</h3>
						{#if course.description}
							<p class="course-desc">{course.description}</p>
						{/if}

						<div class="course-meta">
							<span class="meta-item">{course.weeks === 1 ? '1 day' : `${course.weeks} weeks`}</span>
							<span class="meta-item">{course.lessonCount} lessons</span>
							<span class="meta-item">{course.enrollmentCount} students</span>
						</div>

						<div class="course-actions">
							{#if course.isSyllabus}
								<a
									href={course.slug === 'ceo-ai-command' ? '/enterprise/ceo-ai-command' : '/full-stack-web-development'}
									class="btn btn-secondary btn-sm"
									target="_blank"
								>
									View Page
								</a>
							{/if}
							<button
								class="btn btn-sm"
								class:btn-primary={selectedCourse === course.id}
								class:btn-secondary={selectedCourse !== course.id}
								onclick={() => selectedCourse = selectedCourse === course.id ? null : course.id}
							>
								{selectedCourse === course.id ? 'Close' : 'Edit'}
							</button>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</section>

	<!-- Course Editor Panel -->
	{#if selectedCourseData}
		<section class="editor-panel">
			<div class="editor-header">
				<h2>Edit Course</h2>
				<button class="btn btn-secondary btn-sm" onclick={() => selectedCourse = null}>
					Close
				</button>
			</div>

			<form method="POST" action="?/updateCourse" use:enhance class="edit-form">
				<input type="hidden" name="courseId" value={selectedCourseData.id} />

				<div class="form-grid">
					<div class="form-group">
						<label for="edit-name">Course Name</label>
						<input type="text" id="edit-name" name="name" value={selectedCourseData.name} required />
					</div>

					<div class="form-group">
						<label for="edit-slug">Slug</label>
						<input type="text" id="edit-slug" name="slug" value={selectedCourseData.slug} pattern="[a-z0-9-]+" required />
					</div>

					<div class="form-group">
						<label for="edit-weeks">Duration (weeks)</label>
						<input type="number" id="edit-weeks" name="weeks" value={selectedCourseData.weeks} min="1" max="52" />
					</div>

					<div class="form-group">
						<label for="edit-status">Status</label>
						<select id="edit-status" name="status">
							<option value="active" selected={selectedCourseData.status === 'active'}>Active</option>
							<option value="draft" selected={selectedCourseData.status === 'draft'}>Draft</option>
							<option value="archived" selected={selectedCourseData.status === 'archived'}>Archived</option>
						</select>
					</div>

					<div class="form-group full-width">
						<label for="edit-description">Description</label>
						<textarea id="edit-description" name="description" rows="3">{selectedCourseData.description || ''}</textarea>
					</div>
				</div>

				<div class="form-actions">
					<button type="submit" class="btn btn-primary">Save Changes</button>
				</div>
			</form>

			<!-- Lessons Overview (Read-only) -->
			{#if selectedCourseData.lessons.length > 0}
				<div class="lessons-overview">
					<h3>Course Content</h3>
					{#if selectedCourseData.isSyllabus}
						<p class="syllabus-note">Lessons are synced from syllabus files and cannot be edited here.</p>
					{/if}

					<div class="weeks-list">
						{#each Array.from({ length: selectedCourseData.weeks }, (_, i) => i + 1) as weekNum}
							{@const weekLessons = lessonsByWeek()[weekNum] || []}
							{#if weekLessons.length > 0}
								<div class="week-block">
									<h4>Week {weekNum}</h4>
									<ul class="lesson-list">
										{#each weekLessons as lesson}
											<li>
												<span class="day-badge">Day {lesson.day}</span>
												<span class="lesson-title">{lesson.title}</span>
											</li>
										{/each}
									</ul>
								</div>
							{/if}
						{/each}
					</div>
				</div>
			{/if}
		</section>
	{/if}
</div>

<style>
	.admin-courses {
		max-width: 1400px;
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
		padding: var(--space-4);
		border-radius: var(--radius-lg);
		margin-bottom: var(--space-4);
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

	.create-form {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.form-row {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--space-4);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.form-group.full-width {
		grid-column: 1 / -1;
	}

	.form-group label {
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--text-muted);
	}

	.form-group input,
	.form-group textarea,
	.form-group select {
		padding: var(--space-3);
		background: var(--bg-base);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		color: var(--text-primary);
		font-size: 0.9375rem;
		font-family: inherit;
	}

	.form-group input:focus,
	.form-group textarea:focus,
	.form-group select:focus {
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
		text-decoration: none;
		white-space: nowrap;
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

	/* Courses Grid */
	.courses-section {
		margin-bottom: var(--space-6);
	}

	.courses-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.25rem;
	}

	.course-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		transition: all 0.2s ease;
	}

	.course-card.selected {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 1px var(--color-primary);
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
		font-size: 1.0625rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.course-desc {
		font-size: 0.8125rem;
		color: var(--text-secondary);
		line-height: 1.5;
		margin-bottom: var(--space-3);
		flex: 1;
	}

	.course-meta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
		margin-bottom: var(--space-3);
	}

	.meta-item {
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	.course-actions {
		display: flex;
		gap: var(--space-2);
		flex-wrap: wrap;
		margin-top: auto;
	}

	/* Editor Panel */
	.editor-panel {
		background: var(--bg-elevated);
		border: 1px solid var(--color-primary);
		border-radius: var(--radius-xl);
		padding: var(--space-6);
		margin-top: var(--space-4);
	}

	.editor-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-5);
	}

	.editor-header h2 {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.edit-form {
		display: flex;
		flex-direction: column;
		gap: var(--space-5);
	}

	.form-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--space-4);
	}

	.form-actions {
		display: flex;
		gap: var(--space-3);
	}

	/* Lessons Overview */
	.lessons-overview {
		margin-top: var(--space-6);
		padding-top: var(--space-6);
		border-top: 1px solid var(--border-subtle);
	}

	.lessons-overview h3 {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.syllabus-note {
		font-size: 0.8125rem;
		color: var(--text-muted);
		margin-bottom: var(--space-4);
		font-style: italic;
	}

	.weeks-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--space-4);
	}

	.week-block {
		background: var(--bg-base);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		padding: var(--space-4);
	}

	.week-block h4 {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-3);
	}

	.lesson-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.lesson-list li {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-size: 0.8125rem;
		color: var(--text-secondary);
	}

	.day-badge {
		background: var(--bg-surface);
		color: var(--text-muted);
		padding: 2px 8px;
		border-radius: var(--radius-sm);
		font-size: 0.6875rem;
		font-weight: 600;
		flex-shrink: 0;
	}

	.lesson-title {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
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
