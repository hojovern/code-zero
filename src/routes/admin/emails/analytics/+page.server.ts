import type { PageServerLoad } from './$types';
import { getOverallMetrics, getTopSubjectPatterns, getBestSendTimes } from '$lib/server/email/analytics';

export const load: PageServerLoad = async () => {
	const [metrics, subjectPatterns, bestSendTimes] = await Promise.all([
		getOverallMetrics(30),
		getTopSubjectPatterns(90),
		getBestSendTimes(90),
	]);

	return {
		metrics,
		aiInsights: {
			subjectPatterns,
			bestSendTimes,
		},
	};
};
