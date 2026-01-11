import { db } from '$lib/server/db';
import { achievements, courses, lessons } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { DEFAULT_ACHIEVEMENTS } from '$lib/config/gamification';

/**
 * Seed default achievements into the database
 */
export async function seedAchievements() {
	console.log('🏆 Seeding achievements...');

	for (const achievement of DEFAULT_ACHIEVEMENTS) {
		try {
			await db
				.insert(achievements)
				.values({
					id: achievement.id,
					name: achievement.name,
					description: achievement.description,
					icon: achievement.icon,
					xpBonus: achievement.xpBonus
				})
				.onConflictDoNothing();
		} catch (error) {
			// Ignore duplicate key errors
			console.log(`  - ${achievement.name} already exists`);
		}
	}

	console.log('✅ Achievements seeded');
}

/**
 * Seed Full Stack Web Development course with lessons
 */
export async function seedShipSprintCourse() {
	console.log('📚 Seeding Full Stack Web Development course...');

	// Create the course
	const [course] = await db
		.insert(courses)
		.values({
			name: 'Full Stack Web Development',
			slug: 'ship-sprint',
			description: 'Build and launch your first product in 4 weeks',
			weeks: 4,
			status: 'active'
		})
		.onConflictDoNothing()
		.returning();

	if (!course) {
		console.log('  - Course already exists, updating name...');
		// Update existing course name
		await db.update(courses).set({ name: 'Full Stack Web Development' }).where(eq(courses.slug, 'ship-sprint'));

		const [existingCourse] = await db.select().from(courses);
		if (!existingCourse) return;

		// Seed lessons for existing course
		await seedShipSprintLessons(existingCourse.id);
		return;
	}

	await seedShipSprintLessons(course.id);
	console.log('✅ Full Stack Web Development course seeded');
}

async function seedShipSprintLessons(courseId: string) {
	const shipSprintLessons = [
		// Week 1: Foundations
		{ week: 1, day: 1, title: 'Your First Lines of Code', xpReward: 100 },
		{ week: 1, day: 2, title: 'Understanding the Terminal', xpReward: 100 },
		{ week: 1, day: 3, title: 'Git Basics: Version Control', xpReward: 150 },
		{ week: 1, day: 4, title: 'HTML & CSS Fundamentals', xpReward: 100 },
		{ week: 1, day: 5, title: 'JavaScript Essentials', xpReward: 150 },

		// Week 2: Building Blocks
		{ week: 2, day: 1, title: 'Introduction to SvelteKit', xpReward: 150 },
		{ week: 2, day: 2, title: 'Components and Props', xpReward: 100 },
		{ week: 2, day: 3, title: 'State Management', xpReward: 150 },
		{ week: 2, day: 4, title: 'Routing and Navigation', xpReward: 100 },
		{ week: 2, day: 5, title: 'Forms and User Input', xpReward: 150 },

		// Week 3: Backend & Data
		{ week: 3, day: 1, title: 'Introduction to Databases', xpReward: 150 },
		{ week: 3, day: 2, title: 'Supabase Setup', xpReward: 100 },
		{ week: 3, day: 3, title: 'CRUD Operations', xpReward: 150 },
		{ week: 3, day: 4, title: 'Authentication', xpReward: 200 },
		{ week: 3, day: 5, title: 'API Integration', xpReward: 150 },

		// Week 4: Ship It!
		{ week: 4, day: 1, title: 'Deployment with Vercel', xpReward: 150 },
		{ week: 4, day: 2, title: 'Domain Setup', xpReward: 100 },
		{ week: 4, day: 3, title: 'Performance Optimization', xpReward: 150 },
		{ week: 4, day: 4, title: 'Analytics & Monitoring', xpReward: 100 },
		{ week: 4, day: 5, title: 'Launch Day! 🚀', xpReward: 300 }
	];

	let order = 0;
	for (const lesson of shipSprintLessons) {
		order++;
		try {
			await db
				.insert(lessons)
				.values({
					courseId,
					week: lesson.week,
					day: lesson.day,
					title: lesson.title,
					xpReward: lesson.xpReward,
					order,
					contentPath: `/student-portal/week-${lesson.week}/day-${lesson.day}`
				})
				.onConflictDoNothing();
		} catch {
			// Ignore duplicates
		}
	}

	console.log(`  - Added ${shipSprintLessons.length} lessons`);
}

/**
 * Run all seed functions
 */
export async function seedAll() {
	console.log('🌱 Starting seed...\n');
	await seedAchievements();
	await seedShipSprintCourse();
	console.log('\n🎉 Seed complete!');
}
