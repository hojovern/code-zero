import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { currentUsername } = await parent();
	throw redirect(303, `/student-portal/${currentUsername}`);
};
