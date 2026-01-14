import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const data = await parent();

	// Strict check for super_admin role for financial data
	if (data.user?.role !== 'super_admin') {
		throw error(403, {
			message: 'Unauthorized. Super Admin access required for financial projections.'
		});
	}

	return {};
};
