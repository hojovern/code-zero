import { createServerClient } from '@supabase/ssr';
import type { Cookies } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

// 90 days in seconds
const SESSION_MAX_AGE = 90 * 24 * 60 * 60;

export function createSupabaseServerClient(cookies: Cookies) {
	return createServerClient(
		env.PUBLIC_SUPABASE_URL,
		env.PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				getAll() {
					return cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) => {
						cookies.set(name, value, {
							...options,
							path: '/',
							maxAge: SESSION_MAX_AGE,
							sameSite: 'lax',
							secure: process.env.NODE_ENV === 'production'
						});
					});
				}
			}
		}
	);
}
