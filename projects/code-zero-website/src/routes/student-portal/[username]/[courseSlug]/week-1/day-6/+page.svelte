<script lang="ts">
    import { page } from "$app/state";
    import { Block6Lesson } from "$lib/components/lessons/ceo-ai-command";

    const username = $derived(page.params.username);
    const courseSlug = $derived(page.params.courseSlug);
</script>

<Block6Lesson
    backUrl={`/student-portal/${username}/${courseSlug}`}
    backLabel="Course"
/>
