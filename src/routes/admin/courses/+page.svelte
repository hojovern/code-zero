<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let selectedCourse = $state<string | null>(null);
	let selectedLesson = $state<string | null>(null);
	let editingContent = $state('');

	// Get the selected course data
	let selectedCourseData = $derived(
		selectedCourse ? data.courses.find(c => c.id === selectedCourse) : null
	);

	// Get the selected lesson data
	let selectedLessonData = $derived(
		selectedLesson && selectedCourseData
			? selectedCourseData.lessons.find(l => l.id === selectedLesson)
			: null
	);

	// Group lessons by week
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

	function selectLesson(lesson: typeof selectedCourseData.lessons[0]) {
		selectedLesson = lesson.id;
		// Load content will happen via form action
	}

	function closeLessonEditor() {
		selectedLesson = null;
		editingContent = '';
	}
</script>

<svelte:head>
	<title>Manage Courses | Admin | code:zero</title>
</svelte:head>

<div class="admin-courses">
	<header class="page-header">
		<h1>Course Content Editor</h1>
		<p>Edit lesson content for your courses</p>
	</header>

	<!-- Success/Error Messages -->
	{#if form?.saved}
		<div class="alert alert-success">Content saved successfully!</div>
	{/if}
	{#if form?.error}
		<div class="alert alert-error">{form.error}</div>
	{/if}

	<div class="editor-layout">
		<!-- Sidebar: Course & Lesson Selection -->
		<aside class="sidebar">
			<div class="sidebar-section">
				<h2>Courses</h2>
				<div class="course-list">
					{#each data.courses as course}
						<button
							class="course-item"
							class:active={selectedCourse === course.id}
							onclick={() => {
								selectedCourse = selectedCourse === course.id ? null : course.id;
								selectedLesson = null;
								editingContent = '';
							}}
						>
							<span class="course-name">{course.name}</span>
							<span class="course-meta">{course.lessonCount} lessons</span>
						</button>
					{/each}
				</div>
			</div>

			{#if selectedCourseData}
				<div class="sidebar-section">
					<h2>Lessons</h2>
					<div class="lessons-nav">
						{#each Array.from({ length: selectedCourseData.weeks }, (_, i) => i + 1) as weekNum}
							{@const weekLessons = lessonsByWeek()[weekNum] || []}
							{#if weekLessons.length > 0}
								<div class="week-group">
									<h3>Week {weekNum}</h3>
									{#each weekLessons as lesson}
										<button
											class="lesson-item"
											class:active={selectedLesson === lesson.id}
											onclick={() => selectLesson(lesson)}
										>
											<span class="day">D{lesson.day}</span>
											<span class="title">{lesson.title}</span>
										</button>
									{/each}
								</div>
							{/if}
						{/each}
					</div>
				</div>
			{/if}
		</aside>

		<!-- Main: Content Editor -->
		<main class="content-area">
			{#if !selectedCourse}
				<div class="empty-state">
					<div class="empty-icon">📚</div>
					<h3>Select a course</h3>
					<p>Choose a course from the sidebar to view and edit its lessons.</p>
				</div>
			{:else if !selectedLesson}
				<div class="empty-state">
					<div class="empty-icon">📝</div>
					<h3>Select a lesson</h3>
					<p>Choose a lesson from the sidebar to edit its content.</p>
				</div>
			{:else if selectedLessonData}
				<div class="lesson-editor">
					<div class="editor-header">
						<div class="lesson-info">
							<h2>{selectedLessonData.title}</h2>
							<p>Week {selectedLessonData.week}, Day {selectedLessonData.day}</p>
						</div>
						<button class="btn btn-secondary btn-sm" onclick={closeLessonEditor}>
							Close
						</button>
					</div>

					<!-- Load content form (hidden, auto-submits) -->
					<form method="POST" action="?/loadContent" use:enhance={() => {
						return async ({ result }) => {
							if (result.type === 'success' && result.data?.content) {
								editingContent = result.data.content;
							}
						};
					}}>
						<input type="hidden" name="lessonId" value={selectedLessonData.id} />
						<input type="hidden" name="contentPath" value={selectedLessonData.contentPath || ''} />
						<button type="submit" class="btn btn-secondary btn-sm load-btn">
							Load Content
						</button>
					</form>

					{#if editingContent || form?.content}
						<form method="POST" action="?/saveContent" use:enhance class="editor-form">
							<input type="hidden" name="lessonId" value={selectedLessonData.id} />
							<input type="hidden" name="contentPath" value={selectedLessonData.contentPath || ''} />

							<div class="editor-wrapper">
								<textarea
									name="content"
									class="markdown-editor"
									placeholder="Enter lesson content in Markdown..."
									bind:value={editingContent}
								>{form?.content || editingContent}</textarea>
							</div>

							<div class="editor-actions">
								<button type="submit" class="btn btn-primary">
									Save Content
								</button>
							</div>
						</form>
					{:else}
						<div class="load-prompt">
							<p>Click "Load Content" to load the lesson markdown file for editing.</p>
						</div>
					{/if}
				</div>
			{/if}
		</main>
	</div>
</div>

<style>
	.admin-courses {
		height: calc(100vh - 80px);
		display: flex;
		flex-direction: column;
		padding: var(--space-4);
	}

	.page-header {
		margin-bottom: var(--space-4);
	}

	.page-header h1 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-1);
	}

	.page-header p {
		color: var(--text-muted);
		font-size: 0.875rem;
	}

	/* Alerts */
	.alert {
		padding: var(--space-3);
		border-radius: var(--radius-md);
		margin-bottom: var(--space-4);
		font-size: 0.875rem;
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

	/* Layout */
	.editor-layout {
		display: flex;
		gap: var(--space-4);
		flex: 1;
		min-height: 0;
	}

	/* Sidebar */
	.sidebar {
		width: 280px;
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		overflow-y: auto;
	}

	.sidebar-section {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-4);
	}

	.sidebar-section h2 {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: var(--text-muted);
		margin-bottom: var(--space-3);
	}

	.course-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.course-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 2px;
		padding: var(--space-3);
		background: var(--bg-base);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all 0.15s ease;
		text-align: left;
		width: 100%;
	}

	.course-item:hover {
		border-color: var(--color-primary);
	}

	.course-item.active {
		background: rgba(4, 164, 89, 0.1);
		border-color: var(--color-primary);
	}

	.course-name {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-primary);
	}

	.course-meta {
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	/* Lessons Nav */
	.lessons-nav {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		max-height: 400px;
		overflow-y: auto;
	}

	.week-group h3 {
		font-size: 0.6875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: var(--text-muted);
		margin-bottom: var(--space-2);
	}

	.lesson-item {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-3);
		background: var(--bg-base);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: all 0.15s ease;
		text-align: left;
		width: 100%;
	}

	.lesson-item:hover {
		border-color: var(--color-primary);
	}

	.lesson-item.active {
		background: rgba(4, 164, 89, 0.1);
		border-color: var(--color-primary);
	}

	.lesson-item .day {
		font-size: 0.6875rem;
		font-weight: 600;
		color: var(--text-muted);
		background: var(--bg-surface);
		padding: 2px 6px;
		border-radius: var(--radius-sm);
	}

	.lesson-item .title {
		font-size: 0.8125rem;
		color: var(--text-primary);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	/* Content Area */
	.content-area {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
	}

	.empty-state {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: var(--bg-elevated);
		border: 1px dashed var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-8);
		text-align: center;
	}

	.empty-icon {
		font-size: 3rem;
		margin-bottom: var(--space-4);
	}

	.empty-state h3 {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.empty-state p {
		color: var(--text-muted);
		font-size: 0.875rem;
	}

	/* Lesson Editor */
	.lesson-editor {
		flex: 1;
		display: flex;
		flex-direction: column;
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.editor-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: var(--space-4);
		border-bottom: 1px solid var(--border-subtle);
	}

	.lesson-info h2 {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-1);
	}

	.lesson-info p {
		font-size: 0.8125rem;
		color: var(--text-muted);
	}

	.load-btn {
		margin: var(--space-3) var(--space-4);
	}

	.load-prompt {
		padding: var(--space-6);
		text-align: center;
		color: var(--text-muted);
	}

	.editor-form {
		flex: 1;
		display: flex;
		flex-direction: column;
		min-height: 0;
	}

	.editor-wrapper {
		flex: 1;
		padding: var(--space-4);
		padding-top: 0;
		min-height: 0;
	}

	.markdown-editor {
		width: 100%;
		height: 100%;
		min-height: 400px;
		padding: var(--space-4);
		background: var(--bg-base);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		color: var(--text-primary);
		font-family: 'JetBrains Mono', 'Fira Code', monospace;
		font-size: 0.875rem;
		line-height: 1.6;
		resize: none;
	}

	.markdown-editor:focus {
		outline: none;
		border-color: var(--color-primary);
	}

	.editor-actions {
		padding: var(--space-4);
		border-top: 1px solid var(--border-subtle);
		display: flex;
		justify-content: flex-end;
		gap: var(--space-3);
	}

	/* Buttons */
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-5);
		font-size: 0.875rem;
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
</style>
