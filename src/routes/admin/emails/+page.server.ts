import type { PageServerLoad } from './$types';
import { getOverallMetrics, getRecentCampaignsWithMetrics, getTimeSeriesMetrics, getTopSubjectPatterns, getBestSendTimes } from '$lib/server/email/analytics';
import { getEmailQueue } from '$lib/server/email/queue';

export const load: PageServerLoad = async () => {
	const [metrics, recentCampaigns, timeSeries, subjectPatterns, bestSendTimes, queue] = await Promise.all([
		getOverallMetrics(30),
		getRecentCampaignsWithMetrics(5),
		getTimeSeriesMetrics(30),
		getTopSubjectPatterns(90),
		getBestSendTimes(90),
		getEmailQueue(),
	]);

	return {
		metrics,
		recentCampaigns,
		timeSeries,
		aiInsights: {
			subjectPatterns,
			bestSendTimes,
		},
		queue,
	};
};
