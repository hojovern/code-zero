import { createSupabaseServerClient } from '$lib/supabase/server';
import { type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient(event.cookies);

	/**
	 * Securely gets the user session, handling token refresh if necessary.
	 */
	event.locals.getSession = async () => {
		// Mock bypass for E2E tests - only allowed if PLAYWRIGHT_TEST is set
		const mockUser = event.request.headers.get('x-mock-user');
		if (mockUser && process.env.PLAYWRIGHT_TEST === 'true') {
			return {
				user: { id: 'mock-id', email: 'test@example.com' },
				access_token: 'mock-token',
				refresh_token: 'mock-refresh'
			} as any;
		}

		const {
			data: { session },
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	/**
	 * Official way to get the user data securely on the server.
	 */
	event.locals.getUser = async () => {
		// Mock bypass for E2E tests - only allowed if PLAYWRIGHT_TEST is set
		const mockUser = event.request.headers.get('x-mock-user');
		if (mockUser && process.env.PLAYWRIGHT_TEST === 'true') {
			return { 
				id: 'mock-id', 
				email: 'test@example.com',
				user_metadata: { full_name: 'Mock User', username: 'mockuser' }
			} as any;
		}

		const {
			data: { user },
		} = await event.locals.supabase.auth.getUser();
		return user;
	};

	// Trigger a session refresh check on every request
	const session = await event.locals.getSession();
	console.log(`[Hooks] getSession: ${session ? 'Session found' : 'No session'} | Path: ${event.url.pathname}`);

	if (session) {
		const user = await event.locals.getUser();
		console.log(`[Hooks] getUser: ${user ? 'User found' : 'No user'} | ID: ${user?.id}`);
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range' || name === 'x-supabase-api-version';
		},
	});
};