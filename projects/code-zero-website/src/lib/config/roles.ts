// Role definitions
export type Role = 'student' | 'teacher' | 'super_admin';

// Super admin email (you)
export const SUPER_ADMIN_EMAIL = 'hojovern@gmail.com';

// Permissions by role
export const ROLE_PERMISSIONS = {
	student: {
		canAccessAdmin: false,
		canManageStudents: false,
		canManageCourses: false,
		canManageSocialMedia: false,
		canManageContent: false,
		canSeedDatabase: false,
		canViewAnalytics: false,
		canManageEmail: false,
		canSendEmail: false,
		canViewEmailAnalytics: false,
	},
	teacher: {
		canAccessAdmin: true,
		canManageStudents: true,
		canManageCourses: true,
		canManageSocialMedia: false,
		canManageContent: false,
		canSeedDatabase: false,
		canViewAnalytics: false,
		canManageEmail: true,
		canSendEmail: false,
		canViewEmailAnalytics: true,
	},
	super_admin: {
		canAccessAdmin: true,
		canManageStudents: true,
		canManageCourses: true,
		canManageSocialMedia: true,
		canManageContent: true,
		canSeedDatabase: true,
		canViewAnalytics: true,
		canManageEmail: true,
		canSendEmail: true,
		canViewEmailAnalytics: true,
	},
} as const;

// Helper functions
export function hasPermission(role: Role | null | undefined, permission: keyof typeof ROLE_PERMISSIONS.student): boolean {
	if (!role) return false;
	return ROLE_PERMISSIONS[role]?.[permission] ?? false;
}

export function canAccessAdmin(role: Role | null | undefined): boolean {
	return hasPermission(role, 'canAccessAdmin');
}

export function isSuperAdmin(role: Role | null | undefined): boolean {
	return role === 'super_admin';
}

export function isTeacher(role: Role | null | undefined): boolean {
	return role === 'teacher' || role === 'super_admin';
}
