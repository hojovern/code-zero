import { createBrowserClient } from '@supabase/ssr';
import { env } from '$env/dynamic/public';
import { browser } from '$app/environment';

// 90 days in seconds (must match server.ts)
const SESSION_MAX_AGE = 90 * 24 * 60 * 60;

export function createSupabaseBrowserClient() {
	return createBrowserClient(
		env.PUBLIC_SUPABASE_URL,
		env.PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				getAll() {
					if (!browser) return [];
					// Parse cookies from document.cookie
					const cookies: { name: string; value: string }[] = [];
					document.cookie.split(';').forEach((cookie) => {
						const [name, ...rest] = cookie.trim().split('=');
						if (name) {
							cookies.push({ name, value: rest.join('=') });
						}
					});
					return cookies;
				},
				setAll(cookiesToSet) {
					if (!browser) return;
					cookiesToSet.forEach(({ name, value, options }) => {
						const cookieOptions = {
							path: '/',
							maxAge: SESSION_MAX_AGE,
							sameSite: 'Lax',
							...options
						};
						
						let cookieString = `${name}=${value}`;
						if (cookieOptions.path) cookieString += `; Path=${cookieOptions.path}`;
						if (cookieOptions.maxAge) cookieString += `; Max-Age=${cookieOptions.maxAge}`;
						if (cookieOptions.sameSite) cookieString += `; SameSite=${cookieOptions.sameSite}`;
						if (window.location.protocol === 'https:') cookieString += '; Secure';
						
						document.cookie = cookieString;
					});
				}
			}
		}
	);
}
