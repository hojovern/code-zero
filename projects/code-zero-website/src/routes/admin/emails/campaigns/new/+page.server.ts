import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { emailCampaigns, emailTemplates } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
	const aiMode = url.searchParams.get('ai') === '1';

	// Get available templates
	const templates = await db.select().from(emailTemplates);

	return {
		templates,
		aiMode,
	};
};

export const actions: Actions = {
	save: async ({ request }) => {
		const formData = await request.formData();

		const name = formData.get('name') as string;
		const subject = formData.get('subject') as string;
		const previewText = formData.get('previewText') as string;
		const htmlContent = formData.get('htmlContent') as string;
		const textContent = formData.get('textContent') as string;
		const status = formData.get('status') as string || 'draft';

		if (!name || !subject || !htmlContent) {
			return fail(400, { error: 'Name, subject, and content are required' });
		}

		const [campaign] = await db
			.insert(emailCampaigns)
			.values({
				name,
				subject,
				previewText,
				htmlContent,
				textContent,
				status: status as 'draft' | 'review',
			})
			.returning();

		throw redirect(303, `/admin/emails/campaigns/${campaign.id}`);
	},
};
