<script lang="ts">
    import { page } from "$app/state";
    import { Block4Lesson } from "$lib/components/lessons/ceo-ai-command";

    const username = $derived(page.params.username);
    const courseSlug = $derived(page.params.courseSlug);
</script>

<Block4Lesson
    backUrl={`/student-portal/${username}/${courseSlug}`}
    backLabel="Course"
    nextUrl={`/student-portal/${username}/${courseSlug}/week-1/day-5`}
/>
