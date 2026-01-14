import { db } from '$lib/server/db';
import { intakes, userEvents, campaignBriefs, emailSends, users } from '$lib/server/db/schema';
import { eq, and, gte, lte, isNull, notInArray, sql, desc } from 'drizzle-orm';

export type CampaignType = 'intake_promo' | 'abandoned_cart' | 're_engagement';
export type TriggerType = 'scheduled' | 'event' | 'manual';

export interface IntakeEmailSchedule {
	daysBefore: number;
	emailType: string;
	subjectHint: string;
}

// Email schedule for intake promotions
const INTAKE_EMAIL_SCHEDULE: IntakeEmailSchedule[] = [
	{ daysBefore: 30, emailType: 'announcement', subjectHint: 'Build your freedom in 4 weeks' },
	{ daysBefore: 21, emailType: 'social_proof', subjectHint: 'founders shipped in the last intake' },
	{ daysBefore: 14, emailType: 'urgency_start', subjectHint: '2 weeks left' },
	{ daysBefore: 7, emailType: 'deep_dive', subjectHint: 'What you\'ll build in Week 1' },
	{ daysBefore: 3, emailType: 'scarcity', subjectHint: '3 days left' },
	{ daysBefore: 1, emailType: 'last_chance', subjectHint: 'Tomorrow: Applications close' },
	{ daysBefore: 0, emailType: 'final', subjectHint: 'Last call: closes tonight' },
];

// Event trigger configurations
const EVENT_TRIGGERS = {
	pricing_view_no_apply: {
		eventType: 'pricing_view',
		delayHours: 24,
		campaignType: 'abandoned_cart' as CampaignType,
		condition: 'no_application_start',
	},
	application_abandon: {
		eventType: 'application_abandon',
		delayHours: 4,
		campaignType: 'abandoned_cart' as CampaignType,
		condition: 'no_application_complete',
	},
	inactive_7_days: {
		eventType: 'any',
		delayDays: 7,
		campaignType: 're_engagement' as CampaignType,
		condition: 'no_activity',
	},
	inactive_14_days: {
		eventType: 'any',
		delayDays: 14,
		campaignType: 're_engagement' as CampaignType,
		condition: 'no_activity_extended',
	},
};

/**
 * Check for scheduled triggers (intake countdown emails)
 * Called by n8n daily cron at 9am
 */
export async function checkScheduledTriggers(): Promise<{
	briefsCreated: number;
	details: { intakeName: string; emailType: string }[];
}> {
	const now = new Date();
	const briefsCreated: { intakeName: string; emailType: string }[] = [];

	// Get all upcoming/open intakes with application deadlines
	const activeIntakes = await db
		.select()
		.from(intakes)
		.where(
			and(
				eq(intakes.status, 'upcoming'),
				gte(intakes.applicationDeadline, now)
			)
		);

	for (const intake of activeIntakes) {
		if (!intake.applicationDeadline) continue;

		const deadline = new Date(intake.applicationDeadline);
		const daysUntilDeadline = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

		// Check if any scheduled email should be created today
		for (const schedule of INTAKE_EMAIL_SCHEDULE) {
			if (daysUntilDeadline === schedule.daysBefore) {
				// Check if we already created a brief for this intake + email type
				const existingBrief = await db
					.select()
					.from(campaignBriefs)
					.where(
						and(
							eq(campaignBriefs.triggerSource, intake.id),
							eq(campaignBriefs.campaignType, 'intake_promo'),
							sql`${campaignBriefs.targetSegment}->>'emailType' = ${schedule.emailType}`
						)
					)
					.limit(1);

				if (existingBrief.length === 0) {
					// Create a new campaign brief
					await db.insert(campaignBriefs).values({
						triggerType: 'scheduled',
						triggerSource: intake.id,
						campaignType: 'intake_promo',
						targetSegment: {
							intakeId: intake.id,
							intakeName: intake.name,
							emailType: schedule.emailType,
							subjectHint: schedule.subjectHint,
							daysUntilDeadline: schedule.daysBefore,
							spotsRemaining: (intake.maxStudents || 12) - (intake.currentEnrollments || 0),
						},
						suggestedSendAt: getSuggestedSendTime(),
						status: 'pending',
					});

					briefsCreated.push({
						intakeName: intake.name,
						emailType: schedule.emailType,
					});
				}
			}
		}
	}

	return {
		briefsCreated: briefsCreated.length,
		details: briefsCreated,
	};
}

/**
 * Check for event-based triggers (abandoned cart, re-engagement)
 * Called by n8n hourly
 */
export async function checkEventTriggers(): Promise<{
	briefsCreated: number;
	details: { userId: string; triggerType: string }[];
}> {
	const now = new Date();
	const briefsCreated: { userId: string; triggerType: string }[] = [];

	// 1. Check pricing_view with no application (24h delay)
	const pricingViewCutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000);
	const pricingViewEvents = await db
		.select({
			userId: userEvents.userId,
			sessionId: userEvents.sessionId,
			eventId: userEvents.id,
		})
		.from(userEvents)
		.where(
			and(
				eq(userEvents.eventType, 'pricing_view'),
				lte(userEvents.createdAt, pricingViewCutoff),
				gte(userEvents.createdAt, new Date(now.getTime() - 48 * 60 * 60 * 1000)) // Only check last 48h
			)
		);

	for (const event of pricingViewEvents) {
		if (!event.userId) continue;

		// Check if they started an application after viewing pricing
		const hasApplication = await db
			.select()
			.from(userEvents)
			.where(
				and(
					eq(userEvents.userId, event.userId),
					eq(userEvents.eventType, 'application_start'),
					gte(userEvents.createdAt, pricingViewCutoff)
				)
			)
			.limit(1);

		if (hasApplication.length === 0) {
			// Check if we already created a brief for this user
			const existingBrief = await db
				.select()
				.from(campaignBriefs)
				.where(
					and(
						sql`${campaignBriefs.targetSegment}->>'userId' = ${event.userId}`,
						eq(campaignBriefs.campaignType, 'abandoned_cart'),
						gte(campaignBriefs.createdAt, new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)) // Don't re-trigger within 7 days
					)
				)
				.limit(1);

			if (existingBrief.length === 0) {
				await db.insert(campaignBriefs).values({
					triggerType: 'event',
					triggerSource: 'pricing_view_no_apply',
					campaignType: 'abandoned_cart',
					targetSegment: {
						userId: event.userId,
						triggerEvent: 'pricing_view',
						emailType: 'pricing_followup',
					},
					suggestedSendAt: getSuggestedSendTime(),
					status: 'pending',
				});

				briefsCreated.push({
					userId: event.userId,
					triggerType: 'pricing_view_no_apply',
				});
			}
		}
	}

	// 2. Check for inactive students (7+ days)
	const inactiveCutoff7 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
	const inactiveCutoff14 = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

	// Get users who were active but haven't been active in 7+ days
	const inactiveUsers = await db
		.select({
			userId: users.id,
			name: users.name,
			lastActivity: sql<Date>`MAX(${userEvents.createdAt})`.as('last_activity'),
		})
		.from(users)
		.leftJoin(userEvents, eq(users.id, userEvents.userId))
		.where(eq(users.role, 'student'))
		.groupBy(users.id)
		.having(
			and(
				sql`MAX(${userEvents.createdAt}) IS NOT NULL`,
				sql`MAX(${userEvents.createdAt}) < ${inactiveCutoff7}`
			)
		);

	for (const user of inactiveUsers) {
		const daysSinceActivity = Math.floor((now.getTime() - new Date(user.lastActivity).getTime()) / (1000 * 60 * 60 * 24));

		// Determine which re-engagement email to send
		let emailType: string;
		if (daysSinceActivity >= 14) {
			emailType = 'inactive_14_days';
		} else if (daysSinceActivity >= 7) {
			emailType = 'inactive_7_days';
		} else {
			continue;
		}

		// Check if we already sent this type of re-engagement
		const existingBrief = await db
			.select()
			.from(campaignBriefs)
			.where(
				and(
					sql`${campaignBriefs.targetSegment}->>'userId' = ${user.userId}`,
					eq(campaignBriefs.campaignType, 're_engagement'),
					sql`${campaignBriefs.targetSegment}->>'emailType' = ${emailType}`
				)
			)
			.limit(1);

		if (existingBrief.length === 0) {
			await db.insert(campaignBriefs).values({
				triggerType: 'event',
				triggerSource: emailType,
				campaignType: 're_engagement',
				targetSegment: {
					userId: user.userId,
					userName: user.name,
					emailType,
					daysSinceActivity,
				},
				suggestedSendAt: getSuggestedSendTime(),
				status: 'pending',
			});

			briefsCreated.push({
				userId: user.userId,
				triggerType: emailType,
			});
		}
	}

	return {
		briefsCreated: briefsCreated.length,
		details: briefsCreated,
	};
}

/**
 * Create a manual campaign brief
 */
export async function createManualBrief(params: {
	campaignType: CampaignType;
	targetSegment: Record<string, unknown>;
	notes?: string;
}): Promise<string> {
	const [brief] = await db.insert(campaignBriefs).values({
		triggerType: 'manual',
		triggerSource: 'admin',
		campaignType: params.campaignType,
		targetSegment: {
			...params.targetSegment,
			notes: params.notes,
		},
		suggestedSendAt: getSuggestedSendTime(),
		status: 'pending',
	}).returning({ id: campaignBriefs.id });

	return brief.id;
}

/**
 * Get pending briefs that need AI generation
 */
export async function getPendingBriefs() {
	return db
		.select()
		.from(campaignBriefs)
		.where(eq(campaignBriefs.status, 'pending'))
		.orderBy(campaignBriefs.createdAt);
}

/**
 * Get briefs awaiting review (with generated campaigns)
 */
export async function getBriefsForReview() {
	return db
		.select()
		.from(campaignBriefs)
		.where(eq(campaignBriefs.status, 'review'))
		.orderBy(desc(campaignBriefs.createdAt));
}

/**
 * Get suggested send time based on learned patterns
 * Default: Tuesday 10am if no patterns available
 */
function getSuggestedSendTime(): Date {
	const now = new Date();
	const targetHour = 10; // 10am

	// Find next Tuesday
	const daysUntilTuesday = (2 - now.getDay() + 7) % 7 || 7;
	const nextTuesday = new Date(now);
	nextTuesday.setDate(now.getDate() + daysUntilTuesday);
	nextTuesday.setHours(targetHour, 0, 0, 0);

	// If the calculated time is in the past, add a week
	if (nextTuesday <= now) {
		nextTuesday.setDate(nextTuesday.getDate() + 7);
	}

	return nextTuesday;
}
