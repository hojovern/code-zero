import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../src/lib/server/db/schema';
import { eq } from 'drizzle-orm';
import fs from 'fs';
import path from 'path';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
    console.error("DATABASE_URL not found in .env");
    process.exit(1);
}

const client = postgres(DATABASE_URL, { prepare: false });
const db = drizzle(client, { schema });

const SYLLABUS_COURSES = [
	{
		slug: 'full-stack-web-development',
		name: 'Full Stack Web Development with AI',
		description: 'Build and launch your first AI-powered product in 4 weeks.',
		weeks: 4,
		status: 'active',
		syllabusPath: 'syllabus',
		type: 'multi-week' as const
	},
	{
		slug: 'ceo-command-centre',
		name: 'CEO Command Centre',
		description: 'Master your business with a custom AI infrastructure in 2 days.',
		weeks: 1,
		status: 'active',
		syllabusPath: 'syllabus/ceo-command-centre',
		type: 'intensive' as const
	}
];

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

async function syncCourse(course: any) {
    console.log(`📡 Syncing course: ${course.name}`);
	const [existing] = await db
		.select()
		.from(schema.courses)
		.where(eq(schema.courses.slug, course.slug));

	let courseId: string;

	if (existing) {
		await db
			.update(schema.courses)
			.set({
				name: course.name,
				description: course.description,
				weeks: course.weeks,
				status: course.status
			})
			.where(eq(schema.courses.slug, course.slug));
		courseId = existing.id;
	} else {
		const [inserted] = await db
			.insert(schema.courses)
			.values({
				name: course.name,
				slug: course.slug,
				description: course.description,
				weeks: course.weeks,
				status: course.status
			})
			.returning({ id: schema.courses.id });
		courseId = inserted.id;
	}

    if (course.type === 'multi-week') {
        for (let week = 1; week <= course.weeks; week++) {
            const weekDir = path.join(process.cwd(), '../../', course.syllabusPath, `week-${week}`);
            if (fs.existsSync(weekDir)) {
                const files = fs.readdirSync(weekDir).filter(f => f.match(/^day-\d+\.md$/)).sort();
                for (const file of files) {
                    const dayNum = parseInt(file.match(/day-(\d+)/)?.[1] || '1');
                    const content = fs.readFileSync(path.join(weekDir, file), 'utf-8');
                    const { title, description } = parseMarkdownTitle(content);

                    const [existingLesson] = await db
                        .select()
                        .from(schema.lessons)
                        .where(eq(schema.lessons.courseId, courseId))
                        .then(rows => rows.filter(r => r.week === week && r.day === dayNum));

                    if (!existingLesson) {
                        await db.insert(schema.lessons).values({
                            courseId,
                            week,
                            day: dayNum,
                            title: title || `Day ${dayNum}`,
                            description,
                            contentPath: `/student-portal/week-${week}/day-${dayNum}`,
                            order: (week - 1) * 5 + dayNum,
                            xpReward: 100
                        });
                        console.log(`✅ Created lesson: ${title}`);
                    } else {
                        await db.update(schema.lessons).set({ title, description }).where(eq(schema.lessons.id, existingLesson.id));
                        console.log(`✅ Updated lesson: ${title}`);
                    }
                }
            }
        }
    } else if (course.type === 'intensive') {
        const indexPath = path.join(process.cwd(), '../../', course.syllabusPath, 'index.md');
        if (fs.existsSync(indexPath)) {
            const content = fs.readFileSync(indexPath, 'utf-8');
            const scheduleMatch = content.match(/\| \*\*(\d+): ([^*]+)\*\* \| ([^|]+) \|/g);
            if (scheduleMatch) {
                for (let i = 0; i < scheduleMatch.length; i++) {
                    const match = scheduleMatch[i].match(/\| \*\*(\d+): ([^*]+)\*\* \| ([^|]+) \|/);
                    if (match) {
                        const blockNum = parseInt(match[1]);
                        const title = match[2].trim();
                        const description = match[3].trim();

                        const [existingLesson] = await db
                            .select()
                            .from(schema.lessons)
                            .where(eq(schema.lessons.courseId, courseId))
                            .then(rows => rows.filter(r => r.week === 1 && r.day === blockNum));

                        if (!existingLesson) {
                            await db.insert(schema.lessons).values({
                                courseId,
                                week: 1,
                                day: blockNum,
                                title,
                                description,
                                contentPath: `/enterprise/ceo-command-centre/block-${blockNum}`,
                                order: i + 1,
                                xpReward: 200
                            });
                            console.log(`✅ Created block: ${title}`);
                        } else {
                            await db.update(schema.lessons).set({ title, description }).where(eq(schema.lessons.id, existingLesson.id));
                            console.log(`✅ Updated block: ${title}`);
                        }
                    }
                }
            }
        }
    }
}

async function main() {
    for (const course of SYLLABUS_COURSES) {
        await syncCourse(course);
    }
    console.log("🎉 Sync complete!");
    process.exit(0);
}

main();