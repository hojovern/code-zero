import { db } from '$lib/server/db';
import { emailCampaigns, emailSends, emailSequences, emailSequenceSteps, users, emailPreferences } from '$lib/server/db/schema';
import { eq, and, or, isNull, ne, inArray, lte } from 'drizzle-orm';
import { sendEmail, sendBatchEmails, type EmailOptions } from './brevo';
import { renderTemplate, wrapEmailHtml, htmlToPlainText } from './templates';

export type CampaignStatus = 'draft' | 'review' | 'scheduled' | 'sending' | 'sent' | 'paused';

export interface QueuedEmail {
	id: string;
	type: 'campaign' | 'sequence';
	name: string;
	subject: string;
	status: CampaignStatus;
	recipientCount: number;
	scheduledAt: Date | null;
	createdAt: Date | null;
}

/**
 * Get all emails in the queue (drafts, scheduled, sending)
 */
export async function getEmailQueue(): Promise<{
	drafts: QueuedEmail[];
	scheduled: QueuedEmail[];
	sending: QueuedEmail[];
	sent: QueuedEmail[];
}> {
	const campaigns = await db
		.select()
		.from(emailCampaigns)
		.where(ne(emailCampaigns.status, 'sent'));

	const sentToday = await db
		.select()
		.from(emailCampaigns)
		.where(
			and(
				eq(emailCampaigns.status, 'sent'),
				// Sent in the last 24 hours
				lte(emailCampaigns.sentAt, new Date())
			)
		)
		.limit(10);

	const mapCampaign = (c: typeof campaigns[0]): QueuedEmail => ({
		id: c.id,
		type: 'campaign',
		name: c.name,
		subject: c.subject,
		status: c.status as CampaignStatus,
		recipientCount: c.recipientCount || 0,
		scheduledAt: c.scheduledAt,
		createdAt: c.createdAt,
	});

	return {
		drafts: campaigns.filter((c) => c.status === 'draft' || c.status === 'review').map(mapCampaign),
		scheduled: campaigns.filter((c) => c.status === 'scheduled').map(mapCampaign),
		sending: campaigns.filter((c) => c.status === 'sending').map(mapCampaign),
		sent: sentToday.map(mapCampaign),
	};
}

/**
 * Get recipients for a campaign based on segment rules
 */
export async function getCampaignRecipients(campaignId: string): Promise<{ userId: string; email: string; name: string | null }[]> {
	const campaign = await db
		.select()
		.from(emailCampaigns)
		.where(eq(emailCampaigns.id, campaignId))
		.limit(1);

	if (!campaign[0]) return [];

	// Get all users who haven't unsubscribed
	const recipients = await db
		.select({
			userId: users.id,
			email: users.email,
			name: users.name,
		})
		.from(users)
		.leftJoin(emailPreferences, eq(users.id, emailPreferences.userId))
		.where(
			and(
				// Has email
				ne(users.email, ''),
				// Not unsubscribed (either no preference record, or marketingOptIn is true)
				or(isNull(emailPreferences.userId), eq(emailPreferences.marketingOptIn, true))
			)
		);

	return recipients.filter((r) => r.email).map((r) => ({
		userId: r.userId,
		email: r.email!,
		name: r.name,
	}));
}

/**
 * Update campaign status
 */
export async function updateCampaignStatus(campaignId: string, status: CampaignStatus): Promise<void> {
	await db
		.update(emailCampaigns)
		.set({
			status,
			updatedAt: new Date(),
			...(status === 'sent' ? { sentAt: new Date() } : {}),
		})
		.where(eq(emailCampaigns.id, campaignId));
}

/**
 * Send a campaign to all recipients
 */
export async function sendCampaign(campaignId: string): Promise<{ success: boolean; sent: number; failed: number }> {
	const campaign = await db
		.select()
		.from(emailCampaigns)
		.where(eq(emailCampaigns.id, campaignId))
		.limit(1);

	if (!campaign[0]) {
		return { success: false, sent: 0, failed: 0 };
	}

	const recipients = await getCampaignRecipients(campaignId);
	if (recipients.length === 0) {
		return { success: false, sent: 0, failed: 0 };
	}

	// Update status to sending
	await updateCampaignStatus(campaignId, 'sending');

	// Update recipient count
	await db
		.update(emailCampaigns)
		.set({ recipientCount: recipients.length })
		.where(eq(emailCampaigns.id, campaignId));

	let sent = 0;
	let failed = 0;

	// Send in batches of 100
	const batchSize = 100;
	for (let i = 0; i < recipients.length; i += batchSize) {
		const batch = recipients.slice(i, i + batchSize);

		const emails: EmailOptions[] = batch.map((recipient) => {
			const variables = {
				firstName: recipient.name?.split(' ')[0] || 'there',
				name: recipient.name || 'there',
				email: recipient.email,
			};

			const htmlContent = renderTemplate(
				wrapEmailHtml(campaign[0].htmlContent, campaign[0].previewText || undefined),
				variables
			);
			const textContent = campaign[0].textContent
				? renderTemplate(campaign[0].textContent, variables)
				: htmlToPlainText(htmlContent);

			return {
				to: recipient.email,
				subject: renderTemplate(campaign[0].subject, variables),
				html: htmlContent,
				text: textContent,
				tags: [`campaign:${campaignId}`, 'type:marketing'],
			};
		});

		const results = await sendBatchEmails(emails);

		// Record sends in database
		for (let j = 0; j < batch.length; j++) {
			const recipient = batch[j];
			const result = results[j];

			await db.insert(emailSends).values({
				userId: recipient.userId,
				userEmail: recipient.email,
				campaignId,
				messageId: result.messageId,
				status: result.success ? 'sent' : 'bounced',
				sentAt: result.success ? new Date() : null,
			});

			if (result.success) {
				sent++;
			} else {
				failed++;
			}
		}
	}

	// Update campaign status
	await updateCampaignStatus(campaignId, 'sent');

	return { success: true, sent, failed };
}

/**
 * Schedule a campaign for later
 */
export async function scheduleCampaign(campaignId: string, scheduledAt: Date): Promise<boolean> {
	const result = await db
		.update(emailCampaigns)
		.set({
			status: 'scheduled',
			scheduledAt,
			updatedAt: new Date(),
		})
		.where(eq(emailCampaigns.id, campaignId));

	return true;
}

/**
 * Process scheduled campaigns (called by cron job)
 */
export async function processScheduledCampaigns(): Promise<void> {
	const now = new Date();

	const dueCampaigns = await db
		.select()
		.from(emailCampaigns)
		.where(
			and(
				eq(emailCampaigns.status, 'scheduled'),
				lte(emailCampaigns.scheduledAt, now)
			)
		);

	for (const campaign of dueCampaigns) {
		await sendCampaign(campaign.id);
	}
}
