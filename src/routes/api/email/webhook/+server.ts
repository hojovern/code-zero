import { json, type RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { emailSends, emailEvents, emailPreferences } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

/**
 * Brevo webhook payload structure
 * Events: request, delivered, opened, click, hardBounce, softBounce, blocked, spam, invalid, deferred, unsubscribed
 */
interface BrevoWebhookPayload {
	event: string;
	email: string;
	id: number;
	date: string;
	ts: number;
	'message-id': string;
	ts_event: number;
	subject: string;
	tag?: string;
	sending_ip?: string;
	ts_epoch?: number;
	// For click events
	link?: string;
	// For bounce events
	reason?: string;
}

/**
 * POST /api/email/webhook
 * Handle Brevo webhook events
 */
export const POST: RequestHandler = async ({ request }) => {
	let payload: BrevoWebhookPayload;

	try {
		payload = await request.json();
	} catch (e) {
		return json({ error: 'Invalid JSON' }, { status: 400 });
	}

	const { event, email } = payload;
	const messageId = payload['message-id'];

	console.log(`[Webhook] Received ${event} event for email ${email}, messageId: ${messageId}`);

	// Find the send record by Brevo message ID
	const sends = await db
		.select()
		.from(emailSends)
		.where(eq(emailSends.messageId, messageId))
		.limit(1);

	const send = sends[0];

	if (!send) {
		// Not all emails are tracked (e.g., transactional emails sent directly)
		console.log(`[Webhook] No send record found for messageId ${messageId}`);
		return json({ received: true });
	}

	const now = new Date();

	// Create event record
	await db.insert(emailEvents).values({
		sendId: send.id,
		eventType: mapBrevoEventType(event),
		timestamp: now,
		metadata: {
			link: payload.link,
			reason: payload.reason,
			sending_ip: payload.sending_ip,
		},
	});

	// Update send record based on event type
	switch (event) {
		case 'delivered':
			await db
				.update(emailSends)
				.set({
					status: 'delivered',
					deliveredAt: now,
				})
				.where(eq(emailSends.id, send.id));
			break;

		case 'opened':
		case 'uniqueOpened':
			await db
				.update(emailSends)
				.set({
					status: 'opened',
					openedAt: send.openedAt || now,
					openCount: (send.openCount || 0) + 1,
				})
				.where(eq(emailSends.id, send.id));
			break;

		case 'click':
			const currentMetadata = (send.metadata as { linksClicked?: string[] } | null) || {};
			const linksClicked = [...(currentMetadata.linksClicked || [])];
			if (payload.link) {
				linksClicked.push(payload.link);
			}

			await db
				.update(emailSends)
				.set({
					status: 'clicked',
					clickedAt: send.clickedAt || now,
					clickCount: (send.clickCount || 0) + 1,
					metadata: { ...currentMetadata, linksClicked },
				})
				.where(eq(emailSends.id, send.id));
			break;

		case 'hardBounce':
		case 'softBounce':
			await db
				.update(emailSends)
				.set({
					status: 'bounced',
					metadata: { bounceType: event, reason: payload.reason },
				})
				.where(eq(emailSends.id, send.id));
			break;

		case 'spam':
			await db
				.update(emailSends)
				.set({
					status: 'complained',
				})
				.where(eq(emailSends.id, send.id));

			// Also mark user as unsubscribed
			if (send.userId) {
				await upsertUnsubscribe(send.userId, 'spam_complaint');
			}
			break;

		case 'unsubscribed':
			if (send.userId) {
				await upsertUnsubscribe(send.userId, 'manual_unsubscribe');
			}
			break;

		case 'blocked':
		case 'invalid':
			await db
				.update(emailSends)
				.set({
					status: 'bounced',
					metadata: { reason: event },
				})
				.where(eq(emailSends.id, send.id));
			break;
	}

	return json({ received: true });
};

/**
 * Map Brevo event type to our internal event type
 */
function mapBrevoEventType(event: string): string {
	const mapping: Record<string, string> = {
		request: 'sent',
		delivered: 'delivered',
		opened: 'opened',
		uniqueOpened: 'opened',
		click: 'clicked',
		hardBounce: 'bounced',
		softBounce: 'bounced',
		spam: 'complained',
		unsubscribed: 'unsubscribed',
		blocked: 'bounced',
		invalid: 'bounced',
		deferred: 'deferred',
	};
	return mapping[event] || event;
}

/**
 * Upsert unsubscribe preference for a user
 */
async function upsertUnsubscribe(userId: string, reason: string) {
	const now = new Date();

	const existingPref = await db
		.select()
		.from(emailPreferences)
		.where(eq(emailPreferences.userId, userId))
		.limit(1);

	if (existingPref[0]) {
		await db
			.update(emailPreferences)
			.set({
				marketingOptIn: false,
				unsubscribedAt: now,
				unsubscribeReason: reason,
			})
			.where(eq(emailPreferences.userId, userId));
	} else {
		await db.insert(emailPreferences).values({
			userId: userId,
			marketingOptIn: false,
			unsubscribedAt: now,
			unsubscribeReason: reason,
		});
	}
}
