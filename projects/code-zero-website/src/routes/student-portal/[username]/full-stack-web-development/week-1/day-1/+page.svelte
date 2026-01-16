<script lang="ts">
	import { page } from '$app/state';
	const username = $derived(page.params.username);
</script>

<Day1Lesson
	backUrl={`/student-portal/${username}/full-stack-web-development/week-1`}
	backLabel="Week 1"
	nextUrl={`/student-portal/${username}/full-stack-web-development/week-1/day-2`}
/>
