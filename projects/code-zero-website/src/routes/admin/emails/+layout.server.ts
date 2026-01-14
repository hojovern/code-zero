import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { hasPermission, type Role } from '$lib/config/roles';

export const load: LayoutServerLoad = async ({ parent }) => {
	const parentData = await parent();

	// Check email permission
	if (!hasPermission(parentData.user?.role as Role, 'canManageEmail')) {
		throw redirect(303, '/admin');
	}

	return {};
};
