import { json, type RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { emailCampaigns, emailSends, users } from '$lib/server/db/schema';
import { eq, desc, gte, sql, count, and } from 'drizzle-orm';
import { hasPermission, type Role } from '$lib/config/roles';

interface PerformanceInsights {
	topSubjectPatterns: { pattern: string; avgOpenRate: number; count: number }[];
	bestSendTimes: { dayOfWeek: string; hour: number; avgOpenRate: number }[];
	optimalLength: { subject: string; body: string };
	highPerformingCTAs: string[];
	avoidPatterns: string[];
	segmentInsights: {
		newStudents: { bestContent: string };
		activeStudents: { bestContent: string };
		atRisk: { bestContent: string };
	};
}

interface GeneratedEmail {
	subjectVariants: string[];
	previewText: string;
	htmlContent: string;
	textContent: string;
	recommendedSendTime: string;
	expectedMetrics: { openRate: string; clickRate: string };
}

interface CampaignSuggestion {
	recommendedSequence: { day: number; type: string; subject: string }[];
	targetSegment: string;
	reasoning: string;
}

/**
 * GET /api/email/ai - Get performance insights
 */
export const GET: RequestHandler = async ({ locals, url }) => {
	const user = await locals.getUser();
	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	// Get user role from database
	const [dbUser] = await db.select().from(users).where(eq(users.id, user.id));
	if (!hasPermission(dbUser?.role as Role, 'canManageEmail')) {
		return json({ error: 'Forbidden' }, { status: 403 });
	}

	const days = parseInt(url.searchParams.get('days') || '90');
	const startDate = new Date();
	startDate.setDate(startDate.getDate() - days);

	// Get sent campaigns with their performance
	const campaigns = await db
		.select({
			id: emailCampaigns.id,
			subject: emailCampaigns.subject,
			htmlContent: emailCampaigns.htmlContent,
			sentAt: emailCampaigns.sentAt,
		})
		.from(emailCampaigns)
		.where(and(eq(emailCampaigns.status, 'sent'), gte(emailCampaigns.sentAt, startDate)));

	// Calculate metrics for each campaign
	const campaignMetrics = await Promise.all(
		campaigns.map(async (campaign) => {
			const sends = await db
				.select({
					total: count(),
					opened: sql<number>`count(*) filter (where ${emailSends.openCount} > 0)`,
					clicked: sql<number>`count(*) filter (where ${emailSends.clickCount} > 0)`,
				})
				.from(emailSends)
				.where(eq(emailSends.campaignId, campaign.id));

			const result = sends[0] || { total: 0, opened: 0, clicked: 0 };
			const total = Number(result.total) || 0;
			const opened = Number(result.opened) || 0;

			return {
				...campaign,
				openRate: total > 0 ? (opened / total) * 100 : 0,
				clickRate: total > 0 ? (Number(result.clicked) / total) * 100 : 0,
			};
		})
	);

	// Analyze subject line patterns
	const subjectPatterns = analyzeSubjectPatterns(campaignMetrics);

	// Analyze send times
	const bestSendTimes = analyzeSendTimes(campaignMetrics);

	// Generate insights
	const insights: PerformanceInsights = {
		topSubjectPatterns: subjectPatterns,
		bestSendTimes: bestSendTimes,
		optimalLength: {
			subject: '35-45 characters',
			body: '150-300 words',
		},
		highPerformingCTAs: ['Apply Now', 'Start Building', 'Join Us', 'Get Started'],
		avoidPatterns: ['FREE', 'Act now', 'Limited time', 'ALL CAPS'],
		segmentInsights: {
			newStudents: { bestContent: 'welcome, orientation, getting started' },
			activeStudents: { bestContent: 'tips, advanced topics, community' },
			atRisk: { bestContent: 're-engagement, support, check-in' },
		},
	};

	return json(insights);
};

/**
 * POST /api/email/ai - Generate email content or campaign suggestions
 */
export const POST: RequestHandler = async ({ request, locals }) => {
	const user = await locals.getUser();
	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const [dbUser] = await db.select().from(users).where(eq(users.id, user.id));
	if (!hasPermission(dbUser?.role as Role, 'canManageEmail')) {
		return json({ error: 'Forbidden' }, { status: 403 });
	}

	const body = await request.json();
	const { action, topic, goal, segment, tone } = body;

	if (action === 'generate') {
		// Generate email content
		const email = await generateEmailContent(topic, goal, segment, tone);
		return json(email);
	} else if (action === 'suggest-campaign') {
		// Suggest a full campaign sequence
		const suggestion = await suggestCampaign(goal);
		return json(suggestion);
	} else {
		return json({ error: 'Invalid action' }, { status: 400 });
	}
};

// Helper functions

function analyzeSubjectPatterns(
	campaigns: { subject: string; openRate: number }[]
): { pattern: string; avgOpenRate: number; count: number }[] {
	const patterns: { [key: string]: { totalOpenRate: number; count: number } } = {
		'Has numbers': { totalOpenRate: 0, count: 0 },
		'Question format': { totalOpenRate: 0, count: 0 },
		'How to...': { totalOpenRate: 0, count: 0 },
		'Short (<30 chars)': { totalOpenRate: 0, count: 0 },
		'Medium (30-50 chars)': { totalOpenRate: 0, count: 0 },
		'Personalized': { totalOpenRate: 0, count: 0 },
		'Urgency words': { totalOpenRate: 0, count: 0 },
	};

	for (const campaign of campaigns) {
		const subject = campaign.subject;

		if (/\d/.test(subject)) {
			patterns['Has numbers'].totalOpenRate += campaign.openRate;
			patterns['Has numbers'].count++;
		}
		if (subject.includes('?')) {
			patterns['Question format'].totalOpenRate += campaign.openRate;
			patterns['Question format'].count++;
		}
		if (/^how to/i.test(subject)) {
			patterns['How to...'].totalOpenRate += campaign.openRate;
			patterns['How to...'].count++;
		}
		if (subject.length < 30) {
			patterns['Short (<30 chars)'].totalOpenRate += campaign.openRate;
			patterns['Short (<30 chars)'].count++;
		} else if (subject.length <= 50) {
			patterns['Medium (30-50 chars)'].totalOpenRate += campaign.openRate;
			patterns['Medium (30-50 chars)'].count++;
		}
		if (/\{\{|firstName|name/i.test(subject)) {
			patterns['Personalized'].totalOpenRate += campaign.openRate;
			patterns['Personalized'].count++;
		}
		if (/last|final|ending|hurry|now/i.test(subject)) {
			patterns['Urgency words'].totalOpenRate += campaign.openRate;
			patterns['Urgency words'].count++;
		}
	}

	return Object.entries(patterns)
		.filter(([_, data]) => data.count >= 1)
		.map(([pattern, data]) => ({
			pattern,
			avgOpenRate: data.count > 0 ? data.totalOpenRate / data.count : 0,
			count: data.count,
		}))
		.sort((a, b) => b.avgOpenRate - a.avgOpenRate);
}

function analyzeSendTimes(
	campaigns: { sentAt: Date | null; openRate: number }[]
): { dayOfWeek: string; hour: number; avgOpenRate: number }[] {
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const timeSlots: { [key: string]: { totalOpenRate: number; count: number } } = {};

	for (const campaign of campaigns) {
		if (!campaign.sentAt) continue;
		const date = new Date(campaign.sentAt);
		const dayOfWeek = days[date.getDay()];
		const hour = date.getHours();
		const key = `${dayOfWeek}-${hour}`;

		if (!timeSlots[key]) {
			timeSlots[key] = { totalOpenRate: 0, count: 0 };
		}
		timeSlots[key].totalOpenRate += campaign.openRate;
		timeSlots[key].count++;
	}

	return Object.entries(timeSlots)
		.filter(([_, data]) => data.count >= 1)
		.map(([key, data]) => {
			const [dayOfWeek, hourStr] = key.split('-');
			return {
				dayOfWeek,
				hour: parseInt(hourStr),
				avgOpenRate: data.totalOpenRate / data.count,
			};
		})
		.sort((a, b) => b.avgOpenRate - a.avgOpenRate)
		.slice(0, 5);
}

async function generateEmailContent(
	topic: string,
	goal: string,
	segment: string,
	tone: string
): Promise<GeneratedEmail> {
	// In a real implementation, this would call an LLM API
	// For now, we return template-based content

	const subjectVariants = generateSubjectVariants(topic, goal);
	const previewText = `${topic} - Don't miss this opportunity to ${goal.toLowerCase()}`;

	const htmlContent = `
<h1>Hey {{firstName}},</h1>

<p>Ready to take the next step in your journey?</p>

<p>${topic} is something we've been working on, and we think you'll love it.</p>

<h2>What you'll get:</h2>
<ul>
  <li>Hands-on experience building real products</li>
  <li>Expert guidance from industry practitioners</li>
  <li>A community of builders supporting each other</li>
</ul>

<p style="text-align: center; margin: 32px 0;">
  <a href="https://codezero.my/apply" class="button" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #04A459 0%, #038f4d 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600;">Apply Now</a>
</p>

<p>See you soon,<br>The code:zero team</p>
`.trim();

	const textContent = `
Hey {{firstName}},

Ready to take the next step in your journey?

${topic} is something we've been working on, and we think you'll love it.

What you'll get:
- Hands-on experience building real products
- Expert guidance from industry practitioners
- A community of builders supporting each other

Apply now: https://codezero.my/apply

See you soon,
The code:zero team
`.trim();

	return {
		subjectVariants,
		previewText,
		htmlContent,
		textContent,
		recommendedSendTime: 'Tuesday 10:00 AM',
		expectedMetrics: {
			openRate: '40-45%',
			clickRate: '8-12%',
		},
	};
}

function generateSubjectVariants(topic: string, goal: string): string[] {
	const variants = [
		`${topic} - Your next step`,
		`Ready to ${goal.toLowerCase()}?`,
		`{{firstName}}, ${topic.toLowerCase()} starts now`,
	];

	// Add number-based variant
	const numbers = ['4', '7', '12', '30'];
	const randomNum = numbers[Math.floor(Math.random() * numbers.length)];
	variants.push(`${randomNum} ways to ${goal.toLowerCase()}`);

	return variants;
}

async function suggestCampaign(goal: string): Promise<CampaignSuggestion> {
	// Template-based campaign suggestions
	// In production, this would use an LLM for more intelligent suggestions

	return {
		recommendedSequence: [
			{ day: 0, type: 'announcement', subject: `Exciting news: ${goal}` },
			{ day: 3, type: 'social proof', subject: 'See what others are building' },
			{ day: 7, type: 'value', subject: 'What you\'ll learn with us' },
			{ day: 10, type: 'urgency', subject: 'Last chance to join this intake' },
		],
		targetSegment: 'Users who viewed pricing but didn\'t apply',
		reasoning:
			'Based on past campaigns, 4-email sequences with increasing urgency have the highest conversion rates. Starting with an announcement, building social proof, demonstrating value, and closing with urgency has shown 2.3x better results than single emails.',
	};
}
