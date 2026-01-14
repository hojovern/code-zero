import * as brevo from '@getbrevo/brevo';
import { env } from '$env/dynamic/private';

if (!env.BREVO_API_KEY) {
	console.warn('BREVO_API_KEY is not set - email sending will be disabled');
}

// Initialize Brevo API client
const apiInstance = new brevo.TransactionalEmailsApi();
if (env.BREVO_API_KEY) {
	apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, env.BREVO_API_KEY);
}

export interface EmailOptions {
	to: string | string[];
	subject: string;
	html: string;
	text?: string;
	replyTo?: string;
	tags?: string[];
}

export interface SendResult {
	success: boolean;
	messageId?: string;
	error?: string;
}

/**
 * Send a single email via Brevo
 */
export async function sendEmail(options: EmailOptions): Promise<SendResult> {
	if (!env.BREVO_API_KEY) {
		console.log('[Email] Brevo not configured, would send:', options.subject);
		return { success: false, error: 'Brevo not configured' };
	}

	try {
		const toArray = Array.isArray(options.to) ? options.to : [options.to];

		const sendSmtpEmail: brevo.SendSmtpEmail = {
			sender: parseSenderAddress(env.EMAIL_FROM || 'code:zero <hello@codezero.my>'),
			to: toArray.map(email => ({ email })),
			subject: options.subject,
			htmlContent: options.html,
			textContent: options.text,
			replyTo: options.replyTo
				? { email: options.replyTo }
				: { email: env.EMAIL_REPLY_TO || 'support@codezero.my' },
			tags: options.tags,
		};

		const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

		return {
			success: true,
			messageId: result.body.messageId
		};
	} catch (error) {
		console.error('[Email] Send exception:', error);
		const errorMessage = error instanceof Error ? error.message : 'Unknown error';
		return { success: false, error: errorMessage };
	}
}

/**
 * Send multiple emails in a batch via Brevo
 * Brevo supports up to 1000 emails per batch request
 */
export async function sendBatchEmails(emails: EmailOptions[]): Promise<SendResult[]> {
	if (!env.BREVO_API_KEY) {
		console.log('[Email] Brevo not configured, would send batch of:', emails.length);
		return emails.map(() => ({ success: false, error: 'Brevo not configured' }));
	}

	// Brevo batch sending - send each email individually for now
	// Their batch API requires a different format with messageVersions
	const results: SendResult[] = [];

	for (const email of emails) {
		const result = await sendEmail(email);
		results.push(result);
	}

	return results;
}

/**
 * Parse sender address from "Name <email>" format
 */
function parseSenderAddress(from: string): { email: string; name?: string } {
	const match = from.match(/^(.+?)\s*<(.+?)>$/);
	if (match) {
		return { name: match[1].trim(), email: match[2].trim() };
	}
	return { email: from };
}

/**
 * Check if Brevo is configured
 */
export function isEmailConfigured(): boolean {
	return !!env.BREVO_API_KEY;
}
