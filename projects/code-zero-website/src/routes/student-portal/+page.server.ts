import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// Redirect old student-portal URLs to new /portal
export const load: PageServerLoad = async () => {
	throw redirect(301, '/portal');
};
