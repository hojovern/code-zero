import { db } from '$lib/server/db';
import { emailCampaigns, emailSends, emailPatterns } from '$lib/server/db/schema';
import { eq, gte, sql, and } from 'drizzle-orm';

export interface CampaignPerformance {
	campaignId: string;
	subject: string;
	sentAt: Date;
	sentCount: number;
	openCount: number;
	clickCount: number;
	openRate: number;
	clickRate: number;
}

export interface ExtractedPattern {
	patternType: string;
	patternValue: string;
	avgOpenRate: number;
	avgClickRate: number;
	sampleSize: number;
}

/**
 * Analyze recent campaigns and extract performance patterns
 * Called by daily cron at 2am
 */
export async function learnFromAnalytics(): Promise<{
	campaignsAnalyzed: number;
	patternsUpdated: number;
	details: ExtractedPattern[];
}> {
	// Get campaigns from the last 30 days with performance data
	const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

	const campaignPerformance = await db
		.select({
			campaignId: emailCampaigns.id,
			subject: emailCampaigns.subject,
			sentAt: emailCampaigns.sentAt,
			sentCount: sql<number>`COUNT(${emailSends.id})`.as('sent_count'),
			openCount: sql<number>`SUM(CASE WHEN ${emailSends.openCount} > 0 THEN 1 ELSE 0 END)`.as('open_count'),
			clickCount: sql<number>`SUM(CASE WHEN ${emailSends.clickCount} > 0 THEN 1 ELSE 0 END)`.as('click_count'),
		})
		.from(emailCampaigns)
		.leftJoin(emailSends, eq(emailCampaigns.id, emailSends.campaignId))
		.where(
			and(
				eq(emailCampaigns.status, 'sent'),
				gte(emailCampaigns.sentAt, thirtyDaysAgo)
			)
		)
		.groupBy(emailCampaigns.id)
		.having(sql`COUNT(${emailSends.id}) >= 10`); // Only analyze campaigns with sufficient data

	if (campaignPerformance.length === 0) {
		return {
			campaignsAnalyzed: 0,
			patternsUpdated: 0,
			details: [],
		};
	}

	// Calculate rates
	const performanceData: CampaignPerformance[] = campaignPerformance.map(c => ({
		campaignId: c.campaignId,
		subject: c.subject,
		sentAt: c.sentAt!,
		sentCount: c.sentCount,
		openCount: c.openCount,
		clickCount: c.clickCount,
		openRate: c.sentCount > 0 ? (c.openCount / c.sentCount) * 100 : 0,
		clickRate: c.sentCount > 0 ? (c.clickCount / c.sentCount) * 100 : 0,
	}));

	// Extract patterns
	const extractedPatterns: ExtractedPattern[] = [];

	// 1. Subject line patterns
	extractedPatterns.push(...analyzeSubjectPatterns(performanceData));

	// 2. Send time patterns
	extractedPatterns.push(...analyzeSendTimePatterns(performanceData));

	// 3. Subject length patterns
	extractedPatterns.push(...analyzeSubjectLengthPatterns(performanceData));

	// Upsert patterns to database
	for (const pattern of extractedPatterns) {
		await upsertPattern(pattern);
	}

	return {
		campaignsAnalyzed: performanceData.length,
		patternsUpdated: extractedPatterns.length,
		details: extractedPatterns,
	};
}

/**
 * Analyze subject line patterns
 */
function analyzeSubjectPatterns(data: CampaignPerformance[]): ExtractedPattern[] {
	const patterns: ExtractedPattern[] = [];

	// Check for question subjects
	const questionSubjects = data.filter(d => d.subject.includes('?') || d.subject.toLowerCase().startsWith('how'));
	if (questionSubjects.length >= 3) {
		const avgOpen = questionSubjects.reduce((sum, d) => sum + d.openRate, 0) / questionSubjects.length;
		const avgClick = questionSubjects.reduce((sum, d) => sum + d.clickRate, 0) / questionSubjects.length;
		patterns.push({
			patternType: 'subject_question',
			patternValue: 'Questions (How to..., What if...)',
			avgOpenRate: avgOpen,
			avgClickRate: avgClick,
			sampleSize: questionSubjects.length,
		});
	}

	// Check for number subjects
	const numberSubjects = data.filter(d => /\d+/.test(d.subject));
	if (numberSubjects.length >= 3) {
		const avgOpen = numberSubjects.reduce((sum, d) => sum + d.openRate, 0) / numberSubjects.length;
		const avgClick = numberSubjects.reduce((sum, d) => sum + d.clickRate, 0) / numberSubjects.length;
		patterns.push({
			patternType: 'subject_number',
			patternValue: 'Numbers (4 weeks, 47 founders)',
			avgOpenRate: avgOpen,
			avgClickRate: avgClick,
			sampleSize: numberSubjects.length,
		});
	}

	// Check for urgency subjects
	const urgencyKeywords = ['last', 'final', 'deadline', 'today', 'tomorrow', 'left', 'remaining', 'closing'];
	const urgencySubjects = data.filter(d =>
		urgencyKeywords.some(k => d.subject.toLowerCase().includes(k))
	);
	if (urgencySubjects.length >= 2) {
		const avgOpen = urgencySubjects.reduce((sum, d) => sum + d.openRate, 0) / urgencySubjects.length;
		const avgClick = urgencySubjects.reduce((sum, d) => sum + d.clickRate, 0) / urgencySubjects.length;
		patterns.push({
			patternType: 'subject_urgency',
			patternValue: 'Urgency (Last chance, X days left)',
			avgOpenRate: avgOpen,
			avgClickRate: avgClick,
			sampleSize: urgencySubjects.length,
		});
	}

	// Check for action-oriented subjects (ship, build, launch)
	const actionKeywords = ['ship', 'build', 'launch', 'create', 'start'];
	const actionSubjects = data.filter(d =>
		actionKeywords.some(k => d.subject.toLowerCase().includes(k))
	);
	if (actionSubjects.length >= 2) {
		const avgOpen = actionSubjects.reduce((sum, d) => sum + d.openRate, 0) / actionSubjects.length;
		const avgClick = actionSubjects.reduce((sum, d) => sum + d.clickRate, 0) / actionSubjects.length;
		patterns.push({
			patternType: 'subject_action',
			patternValue: 'Action words (Ship, Build, Launch)',
			avgOpenRate: avgOpen,
			avgClickRate: avgClick,
			sampleSize: actionSubjects.length,
		});
	}

	return patterns;
}

/**
 * Analyze send time patterns
 */
function analyzeSendTimePatterns(data: CampaignPerformance[]): ExtractedPattern[] {
	const patterns: ExtractedPattern[] = [];

	// Group by day of week
	const dayGroups: Record<string, CampaignPerformance[]> = {};
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	for (const campaign of data) {
		if (!campaign.sentAt) continue;
		const day = days[new Date(campaign.sentAt).getDay()];
		if (!dayGroups[day]) dayGroups[day] = [];
		dayGroups[day].push(campaign);
	}

	for (const [day, campaigns] of Object.entries(dayGroups)) {
		if (campaigns.length >= 2) {
			const avgOpen = campaigns.reduce((sum, d) => sum + d.openRate, 0) / campaigns.length;
			const avgClick = campaigns.reduce((sum, d) => sum + d.clickRate, 0) / campaigns.length;
			patterns.push({
				patternType: 'send_day',
				patternValue: day,
				avgOpenRate: avgOpen,
				avgClickRate: avgClick,
				sampleSize: campaigns.length,
			});
		}
	}

	// Group by hour
	const hourGroups: Record<string, CampaignPerformance[]> = {};

	for (const campaign of data) {
		if (!campaign.sentAt) continue;
		const hour = new Date(campaign.sentAt).getHours();
		const hourLabel = `${hour}:00`;
		if (!hourGroups[hourLabel]) hourGroups[hourLabel] = [];
		hourGroups[hourLabel].push(campaign);
	}

	for (const [hour, campaigns] of Object.entries(hourGroups)) {
		if (campaigns.length >= 2) {
			const avgOpen = campaigns.reduce((sum, d) => sum + d.openRate, 0) / campaigns.length;
			const avgClick = campaigns.reduce((sum, d) => sum + d.clickRate, 0) / campaigns.length;
			patterns.push({
				patternType: 'send_hour',
				patternValue: hour,
				avgOpenRate: avgOpen,
				avgClickRate: avgClick,
				sampleSize: campaigns.length,
			});
		}
	}

	return patterns;
}

/**
 * Analyze subject length patterns
 */
function analyzeSubjectLengthPatterns(data: CampaignPerformance[]): ExtractedPattern[] {
	const patterns: ExtractedPattern[] = [];

	// Group by length buckets
	const lengthBuckets: Record<string, CampaignPerformance[]> = {
		'20-30 chars': [],
		'30-40 chars': [],
		'40-50 chars': [],
		'50+ chars': [],
	};

	for (const campaign of data) {
		const len = campaign.subject.length;
		if (len < 30) {
			lengthBuckets['20-30 chars'].push(campaign);
		} else if (len < 40) {
			lengthBuckets['30-40 chars'].push(campaign);
		} else if (len < 50) {
			lengthBuckets['40-50 chars'].push(campaign);
		} else {
			lengthBuckets['50+ chars'].push(campaign);
		}
	}

	for (const [bucket, campaigns] of Object.entries(lengthBuckets)) {
		if (campaigns.length >= 2) {
			const avgOpen = campaigns.reduce((sum, d) => sum + d.openRate, 0) / campaigns.length;
			const avgClick = campaigns.reduce((sum, d) => sum + d.clickRate, 0) / campaigns.length;
			patterns.push({
				patternType: 'subject_length',
				patternValue: bucket,
				avgOpenRate: avgOpen,
				avgClickRate: avgClick,
				sampleSize: campaigns.length,
			});
		}
	}

	return patterns;
}

/**
 * Upsert a pattern to the database
 */
async function upsertPattern(pattern: ExtractedPattern): Promise<void> {
	// Check if pattern exists
	const existing = await db
		.select()
		.from(emailPatterns)
		.where(
			and(
				eq(emailPatterns.patternType, pattern.patternType),
				eq(emailPatterns.patternValue, pattern.patternValue)
			)
		)
		.limit(1);

	// Store rates as integers (multiply by 100)
	const openRateStored = Math.round(pattern.avgOpenRate * 100);
	const clickRateStored = Math.round(pattern.avgClickRate * 100);

	// Calculate confidence based on sample size
	const confidenceScore = Math.min(100, pattern.sampleSize * 10);

	if (existing.length > 0) {
		// Update existing pattern
		await db
			.update(emailPatterns)
			.set({
				avgOpenRate: openRateStored,
				avgClickRate: clickRateStored,
				sampleSize: pattern.sampleSize,
				confidenceScore,
				lastUpdated: new Date(),
			})
			.where(eq(emailPatterns.id, existing[0].id));
	} else {
		// Insert new pattern
		await db.insert(emailPatterns).values({
			patternType: pattern.patternType,
			patternValue: pattern.patternValue,
			avgOpenRate: openRateStored,
			avgClickRate: clickRateStored,
			sampleSize: pattern.sampleSize,
			confidenceScore,
		});
	}
}

/**
 * Get current patterns for display
 */
export async function getCurrentPatterns(): Promise<ExtractedPattern[]> {
	const patterns = await db
		.select()
		.from(emailPatterns)
		.orderBy(sql`${emailPatterns.avgOpenRate} DESC`);

	return patterns.map(p => ({
		patternType: p.patternType,
		patternValue: p.patternValue,
		avgOpenRate: (p.avgOpenRate || 0) / 100,
		avgClickRate: (p.avgClickRate || 0) / 100,
		sampleSize: p.sampleSize || 0,
	}));
}
