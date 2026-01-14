import { db } from '$lib/server/db';
import { emailSends, emailEvents, emailCampaigns } from '$lib/server/db/schema';
import { eq, and, gte, sql, desc, count } from 'drizzle-orm';

export interface EmailMetrics {
	sent: number;
	delivered: number;
	opened: number;
	clicked: number;
	bounced: number;
	complained: number;
	openRate: number;
	clickRate: number;
	bounceRate: number;
}

export interface CampaignMetrics extends EmailMetrics {
	campaignId: string;
	campaignName: string;
	subject: string;
	sentAt: Date | null;
}

export interface TimeSeriesPoint {
	date: string;
	opens: number;
	clicks: number;
	sent: number;
}

/**
 * Get overall email metrics for a time period
 */
export async function getOverallMetrics(days: number = 30): Promise<EmailMetrics> {
	const startDate = new Date();
	startDate.setDate(startDate.getDate() - days);

	const sends = await db
		.select({
			total: count(),
			delivered: sql<number>`count(*) filter (where ${emailSends.status} in ('delivered', 'opened', 'clicked'))`,
			opened: sql<number>`count(*) filter (where ${emailSends.openCount} > 0)`,
			clicked: sql<number>`count(*) filter (where ${emailSends.clickCount} > 0)`,
			bounced: sql<number>`count(*) filter (where ${emailSends.status} = 'bounced')`,
			complained: sql<number>`count(*) filter (where ${emailSends.status} = 'complained')`,
		})
		.from(emailSends)
		.where(gte(emailSends.sentAt, startDate));

	const result = sends[0] || { total: 0, delivered: 0, opened: 0, clicked: 0, bounced: 0, complained: 0 };
	const sent = Number(result.total) || 0;
	const delivered = Number(result.delivered) || 0;
	const opened = Number(result.opened) || 0;
	const clicked = Number(result.clicked) || 0;
	const bounced = Number(result.bounced) || 0;
	const complained = Number(result.complained) || 0;

	return {
		sent,
		delivered,
		opened,
		clicked,
		bounced,
		complained,
		openRate: delivered > 0 ? (opened / delivered) * 100 : 0,
		clickRate: delivered > 0 ? (clicked / delivered) * 100 : 0,
		bounceRate: sent > 0 ? (bounced / sent) * 100 : 0,
	};
}

/**
 * Get metrics for a specific campaign
 */
export async function getCampaignMetrics(campaignId: string): Promise<EmailMetrics | null> {
	const sends = await db
		.select({
			total: count(),
			delivered: sql<number>`count(*) filter (where ${emailSends.status} in ('delivered', 'opened', 'clicked'))`,
			opened: sql<number>`count(*) filter (where ${emailSends.openCount} > 0)`,
			clicked: sql<number>`count(*) filter (where ${emailSends.clickCount} > 0)`,
			bounced: sql<number>`count(*) filter (where ${emailSends.status} = 'bounced')`,
			complained: sql<number>`count(*) filter (where ${emailSends.status} = 'complained')`,
		})
		.from(emailSends)
		.where(eq(emailSends.campaignId, campaignId));

	const result = sends[0];
	if (!result) return null;

	const sent = Number(result.total) || 0;
	const delivered = Number(result.delivered) || 0;
	const opened = Number(result.opened) || 0;
	const clicked = Number(result.clicked) || 0;
	const bounced = Number(result.bounced) || 0;
	const complained = Number(result.complained) || 0;

	return {
		sent,
		delivered,
		opened,
		clicked,
		bounced,
		complained,
		openRate: delivered > 0 ? (opened / delivered) * 100 : 0,
		clickRate: delivered > 0 ? (clicked / delivered) * 100 : 0,
		bounceRate: sent > 0 ? (bounced / sent) * 100 : 0,
	};
}

/**
 * Get recent campaigns with their metrics
 */
export async function getRecentCampaignsWithMetrics(limit: number = 10): Promise<CampaignMetrics[]> {
	const campaigns = await db
		.select()
		.from(emailCampaigns)
		.where(eq(emailCampaigns.status, 'sent'))
		.orderBy(desc(emailCampaigns.sentAt))
		.limit(limit);

	const results: CampaignMetrics[] = [];

	for (const campaign of campaigns) {
		const metrics = await getCampaignMetrics(campaign.id);
		if (metrics) {
			results.push({
				campaignId: campaign.id,
				campaignName: campaign.name,
				subject: campaign.subject,
				sentAt: campaign.sentAt,
				...metrics,
			});
		}
	}

	return results;
}

/**
 * Get time series data for charts
 */
export async function getTimeSeriesMetrics(days: number = 30): Promise<TimeSeriesPoint[]> {
	const startDate = new Date();
	startDate.setDate(startDate.getDate() - days);

	const events = await db
		.select({
			date: sql<string>`date_trunc('day', ${emailEvents.timestamp})::date::text`,
			eventType: emailEvents.eventType,
			count: count(),
		})
		.from(emailEvents)
		.where(gte(emailEvents.timestamp, startDate))
		.groupBy(sql`date_trunc('day', ${emailEvents.timestamp})`, emailEvents.eventType)
		.orderBy(sql`date_trunc('day', ${emailEvents.timestamp})`);

	// Aggregate by date
	const byDate = new Map<string, TimeSeriesPoint>();

	for (const event of events) {
		if (!byDate.has(event.date)) {
			byDate.set(event.date, { date: event.date, opens: 0, clicks: 0, sent: 0 });
		}
		const point = byDate.get(event.date)!;
		if (event.eventType === 'opened') point.opens += Number(event.count);
		if (event.eventType === 'clicked') point.clicks += Number(event.count);
		if (event.eventType === 'sent') point.sent += Number(event.count);
	}

	return Array.from(byDate.values());
}

/**
 * Get top performing subject line patterns
 */
export async function getTopSubjectPatterns(days: number = 90): Promise<{ pattern: string; avgOpenRate: number; count: number }[]> {
	const startDate = new Date();
	startDate.setDate(startDate.getDate() - days);

	// Get sent campaigns with their metrics
	const campaigns = await db
		.select({
			subject: emailCampaigns.subject,
			id: emailCampaigns.id,
		})
		.from(emailCampaigns)
		.where(and(eq(emailCampaigns.status, 'sent'), gte(emailCampaigns.sentAt, startDate)));

	// Analyze patterns
	const patterns: { [key: string]: { totalOpenRate: number; count: number } } = {
		'Has numbers': { totalOpenRate: 0, count: 0 },
		'Question mark': { totalOpenRate: 0, count: 0 },
		'How to...': { totalOpenRate: 0, count: 0 },
		'Short (<30 chars)': { totalOpenRate: 0, count: 0 },
		'Medium (30-50 chars)': { totalOpenRate: 0, count: 0 },
		'Long (>50 chars)': { totalOpenRate: 0, count: 0 },
	};

	for (const campaign of campaigns) {
		const metrics = await getCampaignMetrics(campaign.id);
		if (!metrics || metrics.sent === 0) continue;

		const subject = campaign.subject;

		if (/\d/.test(subject)) {
			patterns['Has numbers'].totalOpenRate += metrics.openRate;
			patterns['Has numbers'].count++;
		}
		if (subject.includes('?')) {
			patterns['Question mark'].totalOpenRate += metrics.openRate;
			patterns['Question mark'].count++;
		}
		if (/^how to/i.test(subject)) {
			patterns['How to...'].totalOpenRate += metrics.openRate;
			patterns['How to...'].count++;
		}
		if (subject.length < 30) {
			patterns['Short (<30 chars)'].totalOpenRate += metrics.openRate;
			patterns['Short (<30 chars)'].count++;
		} else if (subject.length <= 50) {
			patterns['Medium (30-50 chars)'].totalOpenRate += metrics.openRate;
			patterns['Medium (30-50 chars)'].count++;
		} else {
			patterns['Long (>50 chars)'].totalOpenRate += metrics.openRate;
			patterns['Long (>50 chars)'].count++;
		}
	}

	return Object.entries(patterns)
		.filter(([_, data]) => data.count >= 2) // Only patterns with enough data
		.map(([pattern, data]) => ({
			pattern,
			avgOpenRate: data.count > 0 ? data.totalOpenRate / data.count : 0,
			count: data.count,
		}))
		.sort((a, b) => b.avgOpenRate - a.avgOpenRate);
}

/**
 * Get best send times based on historical data
 */
export async function getBestSendTimes(days: number = 90): Promise<{ dayOfWeek: string; hour: number; avgOpenRate: number }[]> {
	const startDate = new Date();
	startDate.setDate(startDate.getDate() - days);

	const results = await db
		.select({
			dayOfWeek: sql<number>`extract(dow from ${emailSends.sentAt})`,
			hour: sql<number>`extract(hour from ${emailSends.sentAt})`,
			total: count(),
			opened: sql<number>`count(*) filter (where ${emailSends.openCount} > 0)`,
		})
		.from(emailSends)
		.where(and(gte(emailSends.sentAt, startDate), sql`${emailSends.sentAt} is not null`))
		.groupBy(sql`extract(dow from ${emailSends.sentAt})`, sql`extract(hour from ${emailSends.sentAt})`);

	const days_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	return results
		.filter((r) => Number(r.total) >= 10) // Need minimum sample size
		.map((r) => ({
			dayOfWeek: days_names[Number(r.dayOfWeek)],
			hour: Number(r.hour),
			avgOpenRate: (Number(r.opened) / Number(r.total)) * 100,
		}))
		.sort((a, b) => b.avgOpenRate - a.avgOpenRate)
		.slice(0, 5);
}
