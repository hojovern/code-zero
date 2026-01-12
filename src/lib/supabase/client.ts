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
						const expires = new Date(Date.now() + SESSION_MAX_AGE * 1000).toUTCString();
						const secure = window.location.protocol === 'https:' ? '; Secure' : '';
						document.cookie = `${name}=${value}; Path=/; Max-Age=${SESSION_MAX_AGE}; Expires=${expires}; SameSite=Lax${secure}`;
					});
				}
			}
		}
	);
}
