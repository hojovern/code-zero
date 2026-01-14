import { createServerClient } from '@supabase/ssr';
import type { Cookies } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

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
						// Only apply our 90-day default if Supabase hasn't explicitly set a maxAge (like 0 for deletion)
						const finalOptions = {
							path: '/',
							maxAge: options?.maxAge !== undefined ? options.maxAge : 90 * 24 * 60 * 60,
							sameSite: 'lax' as const,
							secure: process.env.NODE_ENV === 'production',
							...options
						};
						
						cookies.set(name, value, finalOptions);
					});
				}
			}
		}
	);
}