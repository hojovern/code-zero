import { createBrowserClient } from '@supabase/ssr';
import { env } from '$env/dynamic/public';

/**
 * Creates a Supabase client for use in the browser.
 * Uses default cookie handling which is robust for most browser scenarios.
 */
export function createSupabaseBrowserClient() {
	return createBrowserClient(
		env.PUBLIC_SUPABASE_URL,
		env.PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				getAll() {
					if (typeof document === 'undefined') return [];
					return document.cookie.split('; ').filter(Boolean).map((cookie) => {
						const [name, ...valueParts] = cookie.split('=');
						return { name, value: valueParts.join('=') };
					});
				},
				setAll(cookiesToSet) {
					if (typeof document === 'undefined') return;
					cookiesToSet.forEach(({ name, value, options }) => {
						let cookieString = `${name}=${value}`;
						const path = options?.path || '/';
						const maxAge = options?.maxAge !== undefined ? options.maxAge : 90 * 24 * 60 * 60;
						const sameSite = options?.sameSite || 'Lax';
						
						cookieString += `; Path=${path}`;
						cookieString += `; Max-Age=${maxAge}`;
						cookieString += `; SameSite=${sameSite}`;
						if (typeof window !== 'undefined' && window.location.protocol === 'https:') cookieString += '; Secure';
						
						document.cookie = cookieString;
					});
				}
			}
		}
	);
}
