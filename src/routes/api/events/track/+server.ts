import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { userEvents } from '$lib/server/db/schema';

export interface TrackEventRequest {
	eventType: 'page_view' | 'pricing_view' | 'application_start' | 'application_abandon' | 'lesson_view' | 'course_view';
	eventData?: Record<string, unknown>;
	sessionId?: string;
}

/**
 * Track user behavioral events for email automation triggers
 *
 * Events tracked:
 * - page_view: General page views
 * - pricing_view: Viewed pricing page
 * - application_start: Started application form
 * - application_abandon: Left application without completing
 * - lesson_view: Viewed a lesson
 * - course_view: Viewed a course page
 */
export const POST: RequestHandler = async ({ request, locals }) => {
	try {
		const body = await request.json() as TrackEventRequest;
		const { eventType, eventData, sessionId } = body;

		if (!eventType) {
			return json({ error: 'eventType is required' }, { status: 400 });
		}

		const validEventTypes = ['page_view', 'pricing_view', 'application_start', 'application_abandon', 'lesson_view', 'course_view'];
		if (!validEventTypes.includes(eventType)) {
			return json({ error: 'Invalid eventType' }, { status: 400 });
		}

		// Get user ID from session if available
		const session = await locals.auth();
		const userId = session?.user?.id || null;

		// Insert the event
		const [event] = await db.insert(userEvents).values({
			userId,
			sessionId: sessionId || null,
			eventType,
			eventData: eventData || null,
		}).returning({ id: userEvents.id });

		return json({ success: true, eventId: event.id });
	} catch (error) {
		console.error('Error tracking event:', error);
		return json({ error: 'Failed to track event' }, { status: 500 });
	}
};
