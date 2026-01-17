<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let showCreateForm = $state(false);
	let showPassword = $state(false);
</script>

<svelte:head>
	<title>Manage Students | {data.user?.role === 'super_admin' ? 'Super Admin' : 'Admin'} | code:zero</title>
</svelte:head>

<div class="admin-students">
	<header class="page-header">
		<div class="header-content">
			<h1>👥 Manage Students</h1>
			<p>{data.students.length} students registered</p>
		</div>
		<button class="btn btn-primary" onclick={() => showCreateForm = !showCreateForm}>
			{showCreateForm ? '✕ Cancel' : '➕ Add Student'}
		</button>
	</header>

	<!-- Success/Error Messages -->
	{#if form?.success && form?.tempPassword}
		<div class="alert alert-success">
			<div class="alert-content">
				<span class="alert-icon">✅</span>
				<div class="alert-text">
					<strong>Student created successfully!</strong>
					{#if form.emailSent}
						<p class="email-sent">📧 Login details sent to <strong>{form.email}</strong></p>
					{:else}
						<p class="email-warning">⚠️ Email could not be sent. Share credentials manually:</p>
					{/if}
					<p>Username: <code>{form.username}</code></p>
					<p>Temporary password (show once):</p>
					<div class="password-reveal">
						{#if showPassword}
							<code class="temp-password">{form.tempPassword}</code>
						{:else}
							<code class="temp-password">••••••••••••</code>
						{/if}
						<button class="btn-toggle" onclick={() => showPassword = !showPassword}>
							{showPassword ? '🙈 Hide' : '👁️ Show'}
						</button>
					</div>
					{#if !form.emailSent}
						<p class="warning">⚠️ Save this password - it will not be shown again!</p>
					{/if}
				</div>
			</div>
		</div>
	{/if}

	{#if form?.enrolled}
		<div class="alert alert-success">
			<span>✅</span> Student enrolled successfully!
		</div>
	{/if}

	{#if form?.deleted}
		<div class="alert alert-success">
			<span>✅</span> Student deleted successfully.
		</div>
	{/if}

	{#if form?.error}
		<div class="alert alert-error">
			<span>⚠️</span> {form.error}
		</div>
	{/if}

	<!-- Create Student Form -->
	{#if showCreateForm}
		<section class="create-section">
			<h2>➕ Create New Student</h2>
			<form method="POST" action="?/create" use:enhance class="create-form">
				<div class="form-row">
					<div class="form-group">
						<label for="name">Full Name</label>
						<input type="text" id="name" name="name" placeholder="John Doe" />
					</div>
					<div class="form-group">
						<label for="email">Email *</label>
						<input type="email" id="email" name="email" placeholder="john@example.com" required />
					</div>
				</div>
				<p class="form-hint">
					Username will be auto-generated from email (e.g., john@example.com → john)
				</p>
				<button type="submit" class="btn btn-primary">🚀 Create Student</button>
			</form>
		</section>
	{/if}

	<!-- Students Table -->
	<section class="students-section">
		{#if data.students.length === 0}
			<div class="empty-state">
				<span class="empty-icon">👥</span>
				<h3>No students yet</h3>
				<p>Create your first student account to get started.</p>
			</div>
		{:else}
			<div class="table-wrapper">
				<table class="students-table">
					<thead>
						<tr>
							<th>Student</th>
							<th>Level</th>
							<th>XP</th>
							<th>Courses</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each data.students as student}
							<tr>
								<td class="student-cell">
									<div class="student-avatar">
										{student.username?.charAt(0).toUpperCase() || '?'}
									</div>
									<div class="student-info">
										<span class="student-name">{student.name || student.username}</span>
										<span class="student-email">{student.email}</span>
									</div>
								</td>
								<td>
									<span class="level-badge">Lv.{student.level}</span>
								</td>
								<td>
									<span class="xp-value">⚡ {student.xpTotal}</span>
								</td>
								<td>
									<span class="course-count">📚 {student.enrollmentCount}</span>
								</td>
								<td class="actions-cell">
					<div class="quick-actions">
						<a href="/admin/students/{student.username}" class="btn btn-sm btn-outline" title="Manage Student">
							⚙️
						</a>
					</div>
									<form method="POST" action="?/enroll" use:enhance class="enroll-form">
										<input type="hidden" name="userId" value={student.id} />
										<select name="courseId" required>
											<option value="">Select course...</option>
											{#each data.courses as course}
												<option value={course.id}>{course.name}</option>
											{/each}
										</select>
										<button type="submit" class="btn btn-sm btn-secondary">Enroll</button>
									</form>
									<form method="POST" action="?/delete" use:enhance class="delete-form">
										<input type="hidden" name="userId" value={student.id} />
										<button
											type="submit"
											class="btn btn-sm btn-danger"
											onclick={(e) => {
												if (!confirm(`Delete ${student.username}? This cannot be undone.`)) {
													e.preventDefault();
												}
											}}
										>
											🗑️
										</button>
									</form>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</section>
</div>

<style>
	.admin-students {
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
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.alert-content {
		display: flex;
		gap: var(--space-4);
	}

	.alert-icon {
		font-size: 1.5rem;
	}

	.alert-text strong {
		display: block;
		margin-bottom: var(--space-2);
	}

	.alert-text p {
		margin-bottom: var(--space-1);
	}

	.password-reveal {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		margin: var(--space-2) 0;
	}

	.temp-password {
		background: var(--bg-base);
		padding: var(--space-2) var(--space-4);
		border-radius: var(--radius-md);
		font-size: 1.125rem;
		font-family: var(--font-mono);
	}

	.btn-toggle {
		background: none;
		border: none;
		color: var(--text-secondary);
		cursor: pointer;
		font-size: 0.875rem;
	}

	.warning {
		font-size: 0.8125rem;
		color: var(--text-muted);
		margin-top: var(--space-2);
	}

	.email-sent {
		background: rgba(4, 164, 89, 0.15);
		padding: var(--space-2) var(--space-3);
		border-radius: var(--radius-md);
		margin-bottom: var(--space-2);
	}

	.email-warning {
		background: rgba(234, 179, 8, 0.15);
		color: #ca8a04;
		padding: var(--space-2) var(--space-3);
		border-radius: var(--radius-md);
		margin-bottom: var(--space-2);
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
		grid-template-columns: 1fr;
		gap: var(--space-4);
	}

	@media (min-width: 480px) {
		.form-row {
			grid-template-columns: repeat(2, 1fr);
		}
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

	.form-group input {
		padding: var(--space-3);
		background: var(--bg-base);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		color: var(--text-primary);
		font-size: 1rem;
	}

	.form-group input:focus {
		outline: none;
		border-color: var(--color-primary);
	}

	.form-hint {
		font-size: 0.8125rem;
		color: var(--text-muted);
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

	.btn-danger {
		background: rgba(239, 68, 68, 0.1);
		color: #ef4444;
		border: 1px solid rgba(239, 68, 68, 0.3);
	}

	.btn-danger:hover {
		background: rgba(239, 68, 68, 0.2);
	}

	.btn-sm {
		padding: var(--space-2) var(--space-3);
		font-size: 0.8125rem;
	}

	/* Table */
	.students-section {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl);
		overflow: hidden;
	}

	.table-wrapper {
		overflow-x: auto;
	}

	.students-table {
		width: 100%;
		border-collapse: collapse;
	}

	.students-table th,
	.students-table td {
		padding: var(--space-4);
		text-align: left;
	}

	.students-table th {
		background: var(--bg-surface);
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: var(--text-muted);
		border-bottom: 1px solid var(--border-subtle);
	}

	.students-table td {
		border-bottom: 1px solid var(--border-subtle);
	}

	.students-table tr:last-child td {
		border-bottom: none;
	}

	.student-cell {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.student-avatar {
		width: 40px;
		height: 40px;
		border-radius: var(--radius-full);
		background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-weight: 600;
		flex-shrink: 0;
	}

	.student-info {
		display: flex;
		flex-direction: column;
	}

	.student-name {
		font-weight: 600;
		color: var(--text-primary);
	}

	.student-email {
		font-size: 0.8125rem;
		color: var(--text-muted);
	}

	.level-badge {
		background: rgba(4, 164, 89, 0.1);
		color: var(--color-primary);
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-md);
		font-size: 0.8125rem;
		font-weight: 600;
	}

	.xp-value, .course-count {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.actions-cell {
		display: flex;
		gap: var(--space-2);
		align-items: center;
	}

	.enroll-form {
		display: flex;
		gap: var(--space-2);
		align-items: center;
	}

	.enroll-form select {
		padding: var(--space-2);
		background: var(--bg-base);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		color: var(--text-primary);
		font-size: 0.8125rem;
		min-width: 150px;
	}

	.delete-form {
		display: flex;
	}

	/* Empty State */
	.empty-state {
		text-align: center;
		padding: var(--space-12);
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

	/* Quick Actions */
	.quick-actions {
		display: flex;
		gap: var(--space-1);
	}

	.btn-outline {
		background: transparent;
		color: var(--text-secondary);
		border: 1px solid var(--border-subtle);
	}

	.btn-outline:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
	}
</style>
