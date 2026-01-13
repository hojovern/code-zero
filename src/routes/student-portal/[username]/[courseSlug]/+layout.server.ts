import { redirect, error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';
import { enrollments, courses, lessons, progress, users } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import { canAccessAdmin, type Role } from '$lib/config/roles';

export const load: LayoutServerLoad = async ({ locals, url, params }) => {
    const authUser = await locals.getUser();

    // Not logged in - redirect to home with login prompt
    if (!authUser) {
        throw redirect(303, '/?login=true');
    }

    const { username, courseSlug } = params;

    // Fetch user, course, and enrollments in parallel
    const [dbUserRes, courseRes, userEnrollments] = await Promise.all([
        db.select({ role: users.role }).from(users).where(eq(users.id, authUser.id)).limit(1),
        db.select().from(courses).where(eq(courses.slug, courseSlug)).limit(1),
        db
            .select({
                courseId: enrollments.courseId,
                courseName: courses.name,
                courseSlug: courses.slug,
                courseWeeks: courses.weeks,
                enrolledAt: enrollments.enrolledAt,
                status: enrollments.status
            })
            .from(enrollments)
            .innerJoin(courses, eq(enrollments.courseId, courses.id))
            .where(eq(enrollments.userId, authUser.id))
    ]);

    const dbUser = dbUserRes[0];
    const course = courseRes[0];
    const isAdmin = canAccessAdmin(dbUser?.role as Role);

    // Course not found
    if (!course) {
        throw error(404, 'Course not found');
    }

    // Check enrollment or admin access
    const isEnrolled = userEnrollments.some(e => e.courseSlug === courseSlug);
    if (!isEnrolled && !isAdmin) {
        throw redirect(303, `/student-portal/${username}?message=not-enrolled`);
    }

    // Get all lessons and progress in parallel
    const [allLessons, userProgress] = await Promise.all([
        db.select().from(lessons).where(eq(lessons.courseId, course.id)),
        db
            .select({ lessonId: progress.lessonId })
            .from(progress)
            .where(eq(progress.userId, authUser.id))
    ]);

    const completedLessonIds = new Set(userProgress.map((p) => p.lessonId));

    // Build lesson tree with completion status
    const lessonsByWeek = new Map<number, any[]>();
    for (const lesson of allLessons) {
        if (!lessonsByWeek.has(lesson.week)) {
            lessonsByWeek.set(lesson.week, []);
        }
        lessonsByWeek.get(lesson.week)!.push({
            ...lesson,
            completed: completedLessonIds.has(lesson.id)
        });
    }

    // Sort lessons within each week by day and prepare tree
    const lessonsTree = Array.from(lessonsByWeek.entries())
        .sort(([a], [b]) => a - b)
        .map(([week, weekLessons]) => ({
            week,
            lessons: weekLessons.sort((a, b) => a.day - b.day)
        }));

    // Calculate progress percentage
    const totalLessons = allLessons.length;
    const completedLessons = Array.from(completedLessonIds).filter(id =>
        allLessons.some(l => l.id === id)
    ).length;
    const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    // Get current lesson from URL
    const pathMatch = url.pathname.match(/\/student-portal\/[^/]+\/[^/]+\/week-(\d+)\/day-(\d+)/);
    let currentLesson = null;
    if (pathMatch) {
        const week = parseInt(pathMatch[1]);
        const day = parseInt(pathMatch[2]);
        currentLesson = allLessons.find((l) => l.week === week && l.day === day) || null;
    }

    return {
        user: {
            id: authUser.id,
            email: authUser.email,
            role: dbUser?.role
        },
        currentCourse: {
            courseId: course.id,
            courseName: course.name,
            courseSlug: course.slug,
            courseWeeks: course.weeks
        },
        isAdmin,
        lessonsTree,
        totalLessons,
        completedLessons,
        progressPercent,
        currentLesson,
        completedLessonIds: Array.from(completedLessonIds)
    };
};
