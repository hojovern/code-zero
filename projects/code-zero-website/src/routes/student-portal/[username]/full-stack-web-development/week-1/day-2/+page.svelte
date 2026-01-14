<script lang="ts">
	import { page } from '$app/stores';
	import { Day2Lesson } from '$lib/components/lessons';

	const username = $page.params.username;
</script>

<Day2Lesson
	backUrl={`/student-portal/${username}/full-stack-web-development/week-1`}
	backLabel="Week 1"
	nextUrl={`/student-portal/${username}/full-stack-web-development/week-1/day-3`}
/>
