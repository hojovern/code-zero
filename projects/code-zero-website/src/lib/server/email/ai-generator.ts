import Anthropic from '@anthropic-ai/sdk';
import { db } from '$lib/server/db';
import { emailPatterns, campaignBriefs, emailCampaigns, aiGenerationLogs } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import { env } from '$env/dynamic/private';
import { wrapEmailHtml } from './templates';

const anthropic = new Anthropic({
	apiKey: env.ANTHROPIC_API_KEY,
});

export interface GeneratedEmail {
	subjectVariants: string[];
	previewText: string;
	htmlContent: string;
	textContent: string;
	recommendedSendTime: string;
	confidence: number;
	reasoning: string;
}

interface PatternData {
	subjectPatterns: Array<{ pattern: string; openRate: number; sampleSize: number }>;
	sendTimePatterns: Array<{ pattern: string; openRate: number }>;
	contentInsights: {
		optimalLength: string;
		topCTAs: string[];
	};
}

/**
 * Get learned patterns from the database
 */
async function getLearnedPatterns(): Promise<PatternData> {
	const patterns = await db
		.select()
		.from(emailPatterns)
		.orderBy(desc(emailPatterns.avgOpenRate));

	const subjectPatterns: PatternData['subjectPatterns'] = [];
	const sendTimePatterns: PatternData['sendTimePatterns'] = [];
	let optimalLength = '150-200 words';
	const topCTAs: string[] = [];

	for (const pattern of patterns) {
		const openRate = (pattern.avgOpenRate || 0) / 100; // Convert back from stored format

		if (pattern.patternType.startsWith('subject_')) {
			subjectPatterns.push({
				pattern: pattern.patternValue,
				openRate,
				sampleSize: pattern.sampleSize || 0,
			});
		} else if (pattern.patternType === 'send_day' || pattern.patternType === 'send_hour') {
			sendTimePatterns.push({
				pattern: pattern.patternValue,
				openRate,
			});
		} else if (pattern.patternType === 'content_length') {
			optimalLength = pattern.patternValue;
		} else if (pattern.patternType === 'cta_style') {
			topCTAs.push(pattern.patternValue);
		}
	}

	// Default patterns if none learned yet
	if (subjectPatterns.length === 0) {
		subjectPatterns.push(
			{ pattern: 'Questions (How to...)', openRate: 42, sampleSize: 0 },
			{ pattern: 'Numbers (4 weeks, 47 founders)', openRate: 38, sampleSize: 0 },
			{ pattern: 'Urgency (Last chance, X days left)', openRate: 45, sampleSize: 0 }
		);
	}

	if (sendTimePatterns.length === 0) {
		sendTimePatterns.push(
			{ pattern: 'Tuesday 10am', openRate: 45 },
			{ pattern: 'Thursday 10am', openRate: 42 }
		);
	}

	if (topCTAs.length === 0) {
		    topCTAs.push('Start building', 'Start learning', 'Join the intake');	}

	return {
		subjectPatterns,
		sendTimePatterns,
		contentInsights: {
			optimalLength,
			topCTAs,
		},
	};
}

/**
 * Build the AI prompt based on campaign brief and learned patterns
 */
function buildPrompt(brief: typeof campaignBriefs.$inferSelect, patterns: PatternData): string {
	const targetSegment = brief.targetSegment as Record<string, unknown> || {};

	let contextSection = '';
	if (brief.campaignType === 'intake_promo') {
		contextSection = `
## CONTEXT
- Campaign Type: Intake Promotion
- Intake: ${targetSegment.intakeName || 'Upcoming intake'}
- Days Until Deadline: ${targetSegment.daysUntilDeadline || 'Unknown'}
- Spots Remaining: ${targetSegment.spotsRemaining || 'Limited'}
- Email Type: ${targetSegment.emailType || 'general'}
- Subject Hint: ${targetSegment.subjectHint || ''}

This is part of an automated email sequence counting down to the application deadline.
`;
	} else if (brief.campaignType === 'abandoned_cart') {
		contextSection = `
## CONTEXT
- Campaign Type: Abandoned Cart / Follow-up
- Trigger: User viewed pricing but hasn't applied
- Goal: Gently re-engage and address potential objections

Be helpful, not pushy. Focus on the value proposition and addressing common concerns.
`;
	} else if (brief.campaignType === 're_engagement') {
		contextSection = `
## CONTEXT
- Campaign Type: Re-engagement
- Days Since Last Activity: ${targetSegment.daysSinceActivity || 'Unknown'}
- Goal: Bring inactive students back

Be warm and supportive. Acknowledge they've been away and offer help getting back on track.
`;
	}

	const patternSection = `
## LEARNED PATTERNS (from our data)
Best performing subject line patterns:
${patterns.subjectPatterns.slice(0, 5).map(p => `- "${p.pattern}" → ${p.openRate}% opens (n=${p.sampleSize})`).join('\n')}

Best send times:
${patterns.sendTimePatterns.slice(0, 3).map(p => `- ${p.pattern} → ${p.openRate}% opens`).join('\n')}

Content insights:
- Optimal length: ${patterns.contentInsights.optimalLength}
- Best CTAs: ${patterns.contentInsights.topCTAs.join(', ')}
`;

	return `You are an email marketing AI for code:zero, an AI-first coding academy that helps founders ship products in 4 weeks.

${contextSection}

${patternSection}

## BRAND VOICE
- Direct, slightly edgy but professional
- Builder-to-builder tone (peer communication)
- Focus on outcomes: "ship", "build", "launch", "create"
- No fluff, no hype, no corporate speak
- Tagline: "Build your freedom"

## TASK
Generate an email campaign with:
1. 3 subject line variants (for A/B testing) - under 50 characters each
2. Preview text (under 90 characters)
3. Email body as clean HTML (use inline styles, keep it minimal)
4. Plain text version
5. Recommended send time based on patterns
6. Confidence score (0-100) based on how well this matches winning patterns
7. Brief reasoning for your choices

## OUTPUT FORMAT
Return a JSON object with this exact structure:
{
  "subjectVariants": ["subject1", "subject2", "subject3"],
  "previewText": "preview text here",
  "htmlContent": "<html content>",
  "textContent": "plain text content",
  "recommendedSendTime": "Tuesday 10am",
  "confidence": 85,
  "reasoning": "Brief explanation of choices"
}

Important: Return ONLY the JSON object, no markdown formatting or code blocks.`;
}

/**
 * Generate email content from a campaign brief using Claude
 */
export async function generateEmailFromBrief(briefId: string): Promise<{
	success: boolean;
	campaignId?: string;
	error?: string;
}> {
	const startTime = Date.now();

	// Get the brief
	const [brief] = await db
		.select()
		.from(campaignBriefs)
		.where(eq(campaignBriefs.id, briefId))
		.limit(1);

	if (!brief) {
		return { success: false, error: 'Brief not found' };
	}

	if (brief.status !== 'pending') {
		return { success: false, error: `Brief is not pending (status: ${brief.status})` };
	}

	// Update brief status to generating
	await db
		.update(campaignBriefs)
		.set({ status: 'generating', updatedAt: new Date() })
		.where(eq(campaignBriefs.id, briefId));

	try {
		// Get learned patterns
		const patterns = await getLearnedPatterns();

		// Build prompt
		const prompt = buildPrompt(brief, patterns);

		// Call Claude API
		const message = await anthropic.messages.create({
			model: 'claude-sonnet-4-20250514',
			max_tokens: 2000,
			messages: [
				{
					role: 'user',
					content: prompt,
				},
			],
		});

		const generationTimeMs = Date.now() - startTime;
		const tokensUsed = message.usage.input_tokens + message.usage.output_tokens;

		// Parse the response
		const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
		let generatedEmail: GeneratedEmail;

		try {
			// Try to parse JSON from the response
			const jsonMatch = responseText.match(/\{[\s\S]*\}/);
			if (!jsonMatch) {
				throw new Error('No JSON found in response');
			}
			generatedEmail = JSON.parse(jsonMatch[0]) as GeneratedEmail;
		} catch {
			console.error('Failed to parse AI response:', responseText);
			await db
				.update(campaignBriefs)
				.set({ status: 'pending', updatedAt: new Date() })
				.where(eq(campaignBriefs.id, briefId));
			return { success: false, error: 'Failed to parse AI response' };
		}

		// Validate required fields
		if (!generatedEmail.subjectVariants?.length || !generatedEmail.htmlContent) {
			await db
				.update(campaignBriefs)
				.set({ status: 'pending', updatedAt: new Date() })
				.where(eq(campaignBriefs.id, briefId));
			return { success: false, error: 'AI response missing required fields' };
		}

		// Create the email campaign
		const targetSegment = brief.targetSegment as Record<string, unknown> || {};
		const campaignName = getCampaignName(brief.campaignType, targetSegment);

		const [campaign] = await db.insert(emailCampaigns).values({
			name: campaignName,
			subject: generatedEmail.subjectVariants[0], // Primary subject
			previewText: generatedEmail.previewText,
			htmlContent: wrapEmailHtml(generatedEmail.htmlContent, generatedEmail.previewText),
			textContent: generatedEmail.textContent,
			status: 'review', // Goes to review queue
			scheduledAt: brief.suggestedSendAt,
		}).returning({ id: emailCampaigns.id });

		// Log the generation
		await db.insert(aiGenerationLogs).values({
			briefId,
			promptUsed: prompt,
			patternsApplied: patterns.subjectPatterns.slice(0, 5),
			generatedContent: {
				subjectVariants: generatedEmail.subjectVariants,
				previewText: generatedEmail.previewText,
				htmlContent: generatedEmail.htmlContent.substring(0, 500) + '...', // Truncate for storage
				recommendedSendTime: generatedEmail.recommendedSendTime,
			},
			tokensUsed,
			generationTimeMs,
		});

		// Update the brief
		await db
			.update(campaignBriefs)
			.set({
				status: 'review',
				generatedCampaignId: campaign.id,
				aiConfidence: generatedEmail.confidence,
				aiReasoning: generatedEmail.reasoning,
				updatedAt: new Date(),
			})
			.where(eq(campaignBriefs.id, briefId));

		return { success: true, campaignId: campaign.id };
	} catch (error) {
		console.error('Error generating email:', error);

		// Reset brief status on error
		await db
			.update(campaignBriefs)
			.set({ status: 'pending', updatedAt: new Date() })
			.where(eq(campaignBriefs.id, briefId));

		return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
	}
}

/**
 * Generate a descriptive campaign name
 */
function getCampaignName(campaignType: string, targetSegment: Record<string, unknown>): string {
	const timestamp = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

	switch (campaignType) {
		case 'intake_promo':
			return `${targetSegment.intakeName || 'Intake'} - ${targetSegment.emailType || 'Promo'} (${timestamp})`;
		case 'abandoned_cart':
			return `Cart Recovery - ${targetSegment.emailType || 'Follow-up'} (${timestamp})`;
		case 're_engagement':
			return `Re-engagement - ${targetSegment.emailType || 'Check-in'} (${timestamp})`;
		default:
			return `Campaign (${timestamp})`;
	}
}

/**
 * Process all pending briefs
 */
export async function processAllPendingBriefs(): Promise<{
	processed: number;
	succeeded: number;
	failed: number;
	results: Array<{ briefId: string; success: boolean; error?: string }>;
}> {
	const pendingBriefs = await db
		.select()
		.from(campaignBriefs)
		.where(eq(campaignBriefs.status, 'pending'));

	const results: Array<{ briefId: string; success: boolean; error?: string }> = [];

	for (const brief of pendingBriefs) {
		const result = await generateEmailFromBrief(brief.id);
		results.push({
			briefId: brief.id,
			success: result.success,
			error: result.error,
		});

		// Add a small delay between API calls to avoid rate limiting
		await new Promise(resolve => setTimeout(resolve, 1000));
	}

	return {
		processed: results.length,
		succeeded: results.filter(r => r.success).length,
		failed: results.filter(r => !r.success).length,
		results,
	};
}
