import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();
	
	if (!session?.user) {
		throw redirect(303, '/login');
	}

	// In a real scenario, checkPermission would be used here
	// For now we assume if they can access admin and are super_admin they are fine
	if (session.user.role !== 'super_admin') {
		throw redirect(303, '/admin');
	}

	return {
		user: session.user
	};
};
