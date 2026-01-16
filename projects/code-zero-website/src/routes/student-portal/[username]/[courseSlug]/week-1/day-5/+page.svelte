<script lang="ts">
    import { page } from "$app/state";
    import { Block5Lesson } from "$lib/components/lessons/ceo-ai-command";

    const username = $derived(page.params.username);
    const courseSlug = $derived(page.params.courseSlug);
</script>

<Block5Lesson
    backUrl={`/student-portal/${username}/${courseSlug}`}
    backLabel="Course"
    nextUrl={`/student-portal/${username}/${courseSlug}/week-1/day-6`}
/>
