import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	// Get the referrer or default to home
	const next = url.searchParams.get('next') || '/';

	// Redirect to the target page with ?login=1 to open modal
	throw redirect(303, `${next}?login=1`);
};
