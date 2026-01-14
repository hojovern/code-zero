import { createSupabaseServerClient } from '$lib/supabase/server';
import { type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient(event.cookies);

	/**
	 * Securely gets the user session, handling token refresh if necessary.
	 */
	event.locals.getSession = async () => {
		const {
			data: { session },
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	/**
	 * Official way to get the user data securely on the server.
	 */
	event.locals.getUser = async () => {
		const {
			data: { user },
		} = await event.locals.supabase.auth.getUser();
		return user;
	};

	// Trigger a session refresh check on every request
	await event.locals.getSession();

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range' || name === 'x-supabase-api-version';
		},
	});
};