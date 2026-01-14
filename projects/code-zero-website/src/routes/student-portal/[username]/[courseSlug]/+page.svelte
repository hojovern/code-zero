<script lang="ts">
    import type { LayoutData } from "./$types";
    import { page } from "$app/stores";

    let { data }: { data: LayoutData } = $props();

    const username = $derived($page.params.username);
    const courseSlug = $derived($page.params.courseSlug);
</script>

<svelte:head>
    <title>{data.currentCourse?.courseName || "Course"} | code:zero</title>
</svelte:head>

<div class="course-overview">
    <header class="course-header">
        <h1>{data.currentCourse?.courseName || "Course"}</h1>
        <p class="course-meta">
            {data.currentCourse?.courseWeeks} weeks • {data.totalLessons} lessons
            • {data.progressPercent}% complete
        </p>
    </header>

    <section class="weeks-section">
        <h2>Your Progress</h2>

        <div class="progress-overview">
            <div class="progress-bar-large">
                <div
                    class="progress-fill"
                    style="width: {data.progressPercent}%"
                ></div>
            </div>
            <span class="progress-label"
                >{data.completedLessons} of {data.totalLessons} lessons completed</span
            >
        </div>

        {#if data.lessonsTree.length > 0}
            <div class="weeks-grid">
                {#each data.lessonsTree as { week, lessons }}
                    {@const weekCompleted = lessons.filter(
                        (l) => l.completed,
                    ).length}
                    {@const weekTotal = lessons.length}
                    {@const weekPercent =
                        weekTotal > 0
                            ? Math.round((weekCompleted / weekTotal) * 100)
                            : 0}

                    <a
                        href="/student-portal/{username}/{courseSlug}/week-{week}/day-1"
                        class="week-card"
                    >
                        <div class="week-number">Week {week}</div>
                        <div class="week-progress">
                            <div class="week-progress-bar">
                                <div
                                    class="week-progress-fill"
                                    style="width: {weekPercent}%"
                                ></div>
                            </div>
                            <span class="week-progress-text"
                                >{weekCompleted}/{weekTotal} lessons</span
                            >
                        </div>
                        <div class="week-lessons">
                            {#each lessons as lesson}
                                <span
                                    class="lesson-dot"
                                    class:completed={lesson.completed}
                                >
                                    {lesson.completed ? "✅" : "⬜"}
                                </span>
                            {/each}
                        </div>
                    </a>
                {/each}
            </div>
        {:else}
            <div class="empty-state">
                <p>No lessons available yet. Check back soon!</p>
            </div>
        {/if}
    </section>
</div>

<style>
    .course-overview {
        max-width: 800px;
    }

    .course-header {
        margin-bottom: var(--space-8);
    }

    .course-header h1 {
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: var(--space-2);
    }

    .course-meta {
        color: var(--text-muted);
        font-size: 0.9375rem;
    }

    .weeks-section h2 {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: var(--space-4);
    }

    .progress-overview {
        background: var(--bg-elevated);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-lg);
        padding: var(--space-6);
        margin-bottom: var(--space-8);
    }

    .progress-bar-large {
        height: 12px;
        background: var(--bg-surface);
        border-radius: var(--radius-full);
        overflow: hidden;
        margin-bottom: var(--space-3);
    }

    .progress-fill {
        height: 100%;
        background: linear-gradient(
            90deg,
            var(--color-primary),
            var(--color-primary-light)
        );
        border-radius: var(--radius-full);
        transition: width 0.5s ease;
    }

    .progress-label {
        font-size: 0.875rem;
        color: var(--text-secondary);
    }

    .weeks-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: var(--space-5);
    }

    .week-card {
        display: block;
        background: var(--bg-elevated);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-xl);
        padding: var(--space-6);
        text-decoration: none;
        transition: all 0.2s ease;
    }

    .week-card:hover {
        border-color: var(--color-primary);
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(4, 164, 89, 0.15);
    }

    .week-number {
        font-size: 1.125rem;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: var(--space-4);
    }

    .week-progress {
        margin-bottom: var(--space-4);
    }

    .week-progress-bar {
        height: 8px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: var(--radius-full);
        overflow: hidden;
        margin-bottom: var(--space-2);
    }

    .week-progress-fill {
        height: 100%;
        background: linear-gradient(
            90deg,
            var(--color-primary),
            var(--color-primary-light)
        );
        border-radius: var(--radius-full);
        transition: width 0.3s ease;
    }

    .week-progress-text {
        font-size: 0.8125rem;
        color: var(--text-secondary);
        font-weight: 500;
    }

    .week-lessons {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        padding-top: var(--space-2);
        border-top: 1px solid var(--border-subtle);
    }

    .lesson-dot {
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.05);
        border-radius: var(--radius-md);
        font-size: 0.8rem;
        transition: all 0.15s ease;
    }

    .lesson-dot.completed {
        background: rgba(4, 164, 89, 0.2);
    }

    .empty-state {
        text-align: center;
        padding: var(--space-10);
        background: var(--bg-elevated);
        border: 1px dashed var(--border-subtle);
        border-radius: var(--radius-lg);
        color: var(--text-muted);
    }
</style>
