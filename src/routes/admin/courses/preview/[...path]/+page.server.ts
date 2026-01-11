import { error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { hasPermission, type Role } from '$lib/config/roles';
import fs from 'fs/promises';
import path from 'path';

async function checkPermission(locals: App.Locals) {
	const user = await locals.getUser();
	if (!user) return null;
	const [dbUser] = await db.select({ role: users.role }).from(users).where(eq(users.id, user.id));
	if (!hasPermission(dbUser?.role as Role, 'canManageCourses')) return null;
	return user;
}

function getFilePath(urlPath: string): string {
	// urlPath could be: "week-1/day-1", "ceo-ai-command/day-1", etc.
	return path.join(process.cwd(), 'syllabus', urlPath + '.md');
}

function extractTitle(content: string): string {
	const match = content.match(/^#\s+(.+)$/m);
	return match ? match[1] : 'Untitled';
}

function extractBreadcrumbs(urlPath: string): { label: string; href: string }[] {
	const parts = urlPath.split('/');
	const crumbs: { label: string; href: string }[] = [
		{ label: 'Courses', href: '/admin/courses' }
	];

	let currentPath = '';
	for (const part of parts) {
		currentPath += (currentPath ? '/' : '') + part;
		const label = part
			.replace(/-/g, ' ')
			.replace(/\b\w/g, c => c.toUpperCase());
		crumbs.push({
			label,
			href: `/admin/courses/preview/${currentPath}`
		});
	}

	return crumbs;
}

export const load: PageServerLoad = async ({ params, locals }) => {
	const user = await checkPermission(locals);
	if (!user) {
		throw error(403, 'Unauthorized');
	}

	const urlPath = params.path;
	const filePath = getFilePath(urlPath);

	let content = '';
	let fileExists = true;

	try {
		content = await fs.readFile(filePath, 'utf-8');
	} catch (e) {
		fileExists = false;
		content = `# File Not Found\n\nThe file \`${urlPath}.md\` does not exist yet.\n\nClick "Edit" to create it.`;
	}

	return {
		content,
		title: extractTitle(content),
		breadcrumbs: extractBreadcrumbs(urlPath),
		filePath: urlPath,
		fileExists
	};
};

export const actions: Actions = {
	save: async ({ request, params, locals }) => {
		const user = await checkPermission(locals);
		if (!user) {
			return { success: false, error: 'Unauthorized' };
		}

		const formData = await request.formData();
		const content = formData.get('content') as string;
		const urlPath = params.path;
		const filePath = getFilePath(urlPath);

		try {
			// Ensure directory exists
			await fs.mkdir(path.dirname(filePath), { recursive: true });

			// Write content
			await fs.writeFile(filePath, content, 'utf-8');

			return { success: true };
		} catch (e) {
			console.error('Error saving:', e);
			return { success: false, error: 'Failed to save' };
		}
	}
};
