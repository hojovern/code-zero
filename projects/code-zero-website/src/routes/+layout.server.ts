import type { LayoutServerLoad } from "./$types"
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: LayoutServerLoad = async ({ locals, depends, cookies }) => {
  depends('supabase:auth');
  const user = await locals.getUser();

  let profile = null;
  if (user) {
    const [p] = await db.select({ username: users.username }).from(users).where(eq(users.id, user.id));
    profile = p;
  }
  
  return {
    isLoggedIn: !!user,
    user: user ? {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.full_name || user.user_metadata?.name,
      image: user.user_metadata?.avatar_url || user.user_metadata?.picture,
      username: profile?.username || user.email?.split('@')[0] || user.id // Fallback
    } : null
  }
}
