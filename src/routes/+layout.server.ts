import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals, depends, cookies }) => {
  depends('supabase:auth');
  const user = await locals.getUser();
  
  return {
    isLoggedIn: !!user,
    user: user ? {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.full_name || user.user_metadata?.name,
      image: user.user_metadata?.avatar_url || user.user_metadata?.picture
    } : null
  }
}
