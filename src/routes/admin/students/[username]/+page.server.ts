import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users, courses, enrollments, achievements } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params }) => {
	const { username } = params;

	// Get student by username
	const [student] = await db
		.select()
		.from(users)
		.where(eq(users.username, username));

	if (!student) {
		throw error(404, 'Student not found');
	}

	// Get enrollments with course details
	const studentEnrollments = await db
		.select({
			id: enrollments.id,
			courseId: enrollments.courseId,
			status: enrollments.status,
			enrolledAt: enrollments.enrolledAt,
			completedAt: enrollments.completedAt,
			courseName: courses.name,
			courseSlug: courses.slug
		})
		.from(enrollments)
		.innerJoin(courses, eq(enrollments.courseId, courses.id))
		.where(eq(enrollments.userId, student.id));

	// Get achievements
	const studentAchievements = await db
		.select()
		.from(achievements)
		.where(eq(achievements.userId, student.id))
		.orderBy(desc(achievements.earnedAt));

	// Get all courses for enrollment dropdown
	const allCourses = await db.select().from(courses);

	return {
		student,
		enrollments: studentEnrollments,
		achievements: studentAchievements,
		allCourses
	};
};
