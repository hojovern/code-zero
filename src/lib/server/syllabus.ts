/**
 * Syllabus Course Sync Utility
 *
 * Reads course metadata from syllabus files and syncs to database.
 * This ensures all syllabus-based courses appear in the admin dashboard.
 */

import fs from 'fs';
import path from 'path';
import { db } from '$lib/server/db';
import { courses, lessons } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

// Define syllabus-based courses
// Maps filesystem structure to course metadata
const SYLLABUS_COURSES = [
	{
		slug: 'enterprise-ai-full-stack',
		name: 'Enterprise AI Full Stack',
		description: 'Build your freedom in 4 weeks. Ship a real product with AI-first development.',
		weeks: 4,
		status: 'active',
		syllabusPath: 'syllabus', // week-1, week-2, week-3, week-4 directories
		type: 'multi-week' as const,
		image: undefined // Will show 🏢 emoji placeholder
	},
	{
		slug: 'ceo-ai-command',
		name: 'CEO AI Command Center',
		description: 'From AI-curious to AI-capable in one day. Build your personal AI infrastructure.',
		weeks: 1,
		status: 'active',
		syllabusPath: 'syllabus/ceo-ai-command',
		type: 'intensive' as const,
		image: undefined // Will show 👔 emoji placeholder
	}
];

export interface SyllabusCourse {
	slug: string;
	name: string;
	description: string;
	weeks: number;
	status: string;
	syllabusPath: string;
	type: 'multi-week' | 'intensive';
	image?: string;
}

export interface SyllabusLesson {
	week: number;
	day: number;
	title: string;
	description?: string;
	contentPath: string;
}

/**
 * Parse a syllabus index.md file to extract course/lesson info
 */
function parseMarkdownTitle(content: string): { title: string; description?: string } {
	const lines = content.split('\n');
	let title = '';
	let description = '';

	for (const line of lines) {
		if (line.startsWith('# ')) {
			title = line.replace('# ', '').trim();
		} else if (line.startsWith('> ') && !description) {
			description = line.replace('> ', '').replace(/"/g, '').trim();
		}
		if (title && description) break;
	}

	return { title, description };
}

/**
 * Get all lessons from syllabus files for a course
 */
export function getSyllabusLessons(course: SyllabusCourse): SyllabusLesson[] {
	const lessons: SyllabusLesson[] = [];
	const projectRoot = process.cwd();

	if (course.type === 'multi-week') {
		// Read week-1, week-2, etc. directories
		for (let week = 1; week <= course.weeks; week++) {
			const weekDir = path.join(projectRoot, 'syllabus', `week-${week}`);
			if (!fs.existsSync(weekDir)) continue;

			// Find day files (day-1.md, day-2.md, etc.)
			const files = fs.readdirSync(weekDir);
			const dayFiles = files.filter(f => f.match(/^day-\d+\.md$/)).sort();

			for (const dayFile of dayFiles) {
				const dayNum = parseInt(dayFile.match(/day-(\d+)/)?.[1] || '0');
				const filePath = path.join(weekDir, dayFile);
				const content = fs.readFileSync(filePath, 'utf-8');
				const { title, description } = parseMarkdownTitle(content);

				lessons.push({
					week,
					day: dayNum,
					title: title || `Day ${dayNum}`,
					description,
					contentPath: `/student-portal/week-${week}/day-${dayNum}`
				});
			}
		}
	} else if (course.type === 'intensive') {
		// Single-day course (blocks instead of days)
		const courseDir = path.join(projectRoot, course.syllabusPath);
		if (fs.existsSync(courseDir)) {
			const indexPath = path.join(courseDir, 'index.md');
			if (fs.existsSync(indexPath)) {
				const content = fs.readFileSync(indexPath, 'utf-8');

				// Parse blocks from schedule section
				const scheduleMatch = content.match(/\| Block \| Duration \| Focus \|[\s\S]*?(?=\n---|\n##|$)/);
				if (scheduleMatch) {
					const rows = scheduleMatch[0].split('\n').filter(line => line.startsWith('| **'));
					rows.forEach((row, index) => {
						const match = row.match(/\| \*\*(\d+): ([^*]+)\*\* \| ([^|]+) \| ([^|]+) \|/);
						if (match) {
							lessons.push({
								week: 1,
								day: parseInt(match[1]),
								title: match[2].trim(),
								description: match[4].trim(),
								contentPath: `/enterprise/ceo-ai-command/block-${match[1]}`
							});
						}
					});
				}
			}
		}
	}

	return lessons;
}

/**
 * Sync a single course to the database
 */
async function syncCourse(course: SyllabusCourse): Promise<string> {
	// Check if course exists
	const [existing] = await db
		.select()
		.from(courses)
		.where(eq(courses.slug, course.slug));

	let courseId: string;

	if (existing) {
		// Update existing course
		await db
			.update(courses)
			.set({
				name: course.name,
				description: course.description,
				weeks: course.weeks,
				status: course.status,
				image: course.image
			})
			.where(eq(courses.slug, course.slug));
		courseId = existing.id;
	} else {
		// Insert new course
		const [inserted] = await db
			.insert(courses)
			.values({
				name: course.name,
				slug: course.slug,
				description: course.description,
				weeks: course.weeks,
				status: course.status,
				image: course.image
			})
			.returning({ id: courses.id });
		courseId = inserted.id;
	}

	// Sync lessons
	const syllabusLessons = getSyllabusLessons(course);

	for (let i = 0; i < syllabusLessons.length; i++) {
		const lesson = syllabusLessons[i];

		// Check if lesson exists (by courseId + week + day)
		const [existingLesson] = await db
			.select()
			.from(lessons)
			.where(eq(lessons.courseId, courseId))
			.then(rows => rows.filter(r => r.week === lesson.week && r.day === lesson.day));

		if (!existingLesson) {
			await db.insert(lessons).values({
				courseId,
				week: lesson.week,
				day: lesson.day,
				title: lesson.title,
				description: lesson.description,
				contentPath: lesson.contentPath,
				order: i + 1,
				xpReward: 100
			});
		} else {
			// Update existing lesson
			await db
				.update(lessons)
				.set({
					title: lesson.title,
					description: lesson.description,
					contentPath: lesson.contentPath
				})
				.where(eq(lessons.id, existingLesson.id));
		}
	}

	return courseId;
}

/**
 * Sync all syllabus courses to the database
 * Call this on server startup or admin page load
 */
export async function syncAllSyllabusCourses(): Promise<void> {
	for (const course of SYLLABUS_COURSES) {
		try {
			await syncCourse(course);
		} catch (error) {
			console.error(`Failed to sync course ${course.slug}:`, error);
		}
	}
}

/**
 * Get all defined syllabus courses (without database sync)
 */
export function getSyllabusCourses(): SyllabusCourse[] {
	return SYLLABUS_COURSES;
}
