<script lang="ts">
    import { page } from "$app/stores";
    import { Block1Lesson } from "$lib/components/lessons/ceo-ai-command";

    const username = $derived($page.params.username);
    const courseSlug = $derived($page.params.courseSlug);
</script>

<Block1Lesson
    backUrl={`/student-portal/${username}/${courseSlug}`}
    backLabel="Course"
    nextUrl={`/student-portal/${username}/${courseSlug}/week-1/day-2`}
/>
