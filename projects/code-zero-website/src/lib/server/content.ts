/**
 * Unified content aggregation for the admin Content Pipeline
 * Collects social posts, blog posts, and lessons into a single view
 */

import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { getQueuePosts, type QueuePost } from './queue';

export type ContentType = 'social' | 'blog' | 'lesson';
export type ContentStatus = 'draft' | 'review' | 'approved' | 'published' | 'posted';

export interface ContentItem {
	id: string;
	type: ContentType;
	title: string;
	status: ContentStatus;
	createdAt: string | null;
	updatedAt: string | null;
	scheduledAt: string | null;
	publishedAt: string | null;
	excerpt: string;
	path: string;
	metadata: Record<string, unknown>;
}

// Parse frontmatter from markdown
function parseFrontmatter(content: string): { frontmatter: Record<string, unknown>; body: string } {
	const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
	if (!match) {
		return { frontmatter: {}, body: content };
	}

	const frontmatterStr = match[1];
	const body = match[2].trim();
	const frontmatter: Record<string, unknown> = {};

	for (const line of frontmatterStr.split('\n')) {
		const colonIndex = line.indexOf(':');
		if (colonIndex === -1) continue;

		const key = line.slice(0, colonIndex).trim();
		let value: unknown = line.slice(colonIndex + 1).trim();

		// Parse values
		if (value === 'null') value = null;
		else if (value === 'true') value = true;
		else if (value === 'false') value = false;
		else if (/^\d+$/.test(value as string)) value = parseInt(value as string, 10);

		frontmatter[key] = value;
	}

	return { frontmatter, body };
}

// Truncate text for excerpt
function truncate(text: string, maxLength: number = 120): string {
	const cleaned = text.replace(/[#*_`]/g, '').trim();
	if (cleaned.length <= maxLength) return cleaned;
	return cleaned.slice(0, maxLength) + '...';
}

/**
 * Get all social posts as ContentItems
 */
async function getSocialContent(): Promise<ContentItem[]> {
	const posts = await getQueuePosts();

	return posts.map((post: QueuePost) => ({
		id: `social-${post.id}`,
		type: 'social' as ContentType,
		title: post.caption.split('\n')[0].slice(0, 60) || 'Untitled Post',
		status: mapSocialStatus(post.status),
		createdAt: post.created_at,
		updatedAt: null,
		scheduledAt: post.scheduled_date || null,
		publishedAt: post.posted_at,
		excerpt: truncate(post.caption),
		path: `/social-media/queue/${post.filename}`,
		metadata: {
			platform: post.platform,
			format: post.format,
			image: post.image,
			hashtags: post.hashtag_count,
			originalStatus: post.status
		}
	}));
}

function mapSocialStatus(status: string): ContentStatus {
	switch (status) {
		case 'draft': return 'draft';
		case 'approved': return 'approved';
		case 'posted': return 'posted';
		case 'posting': return 'approved';
		default: return 'draft';
	}
}

/**
 * Get all blog posts as ContentItems
 */
async function getBlogContent(): Promise<ContentItem[]> {
	const items: ContentItem[] = [];
	const BLOG_DIR = 'src/content/blog';

	try {
		const files = await readdir(BLOG_DIR);

		for (const filename of files) {
			if (!filename.endsWith('.md')) continue;

			const filepath = join(BLOG_DIR, filename);
			const content = await readFile(filepath, 'utf-8');
			const { frontmatter, body } = parseFrontmatter(content);

			const slug = filename.replace('.md', '');
			const status = determineBlogStatus(frontmatter);

			items.push({
				id: `blog-${slug}`,
				type: 'blog',
				title: (frontmatter.title as string) || slug,
				status,
				createdAt: (frontmatter.date as string) || null,
				updatedAt: (frontmatter.updated as string) || null,
				scheduledAt: (frontmatter.scheduledFor as string) || null,
				publishedAt: status === 'published' ? (frontmatter.date as string) : null,
				excerpt: (frontmatter.description as string) || truncate(body),
				path: `/blog/${slug}`,
				metadata: {
					tags: frontmatter.tags || [],
					author: frontmatter.author,
					image: frontmatter.image,
					draft: frontmatter.draft
				}
			});
		}
	} catch (err) {
		// Blog directory might not exist
		console.error('Error reading blog content:', err);
	}

	return items;
}

function determineBlogStatus(frontmatter: Record<string, unknown>): ContentStatus {
	if (frontmatter.draft === true) return 'draft';
	if (frontmatter.status === 'review') return 'review';
	return 'published';
}

/**
 * Get all lessons as ContentItems
 */
async function getLessonContent(): Promise<ContentItem[]> {
	const items: ContentItem[] = [];
	const SYLLABUS_DIR = 'syllabus';

	try {
		// Scan week directories
		const weekDirs = await readdir(SYLLABUS_DIR);

		for (const weekDir of weekDirs) {
			if (!weekDir.startsWith('week-')) continue;

			const weekPath = join(SYLLABUS_DIR, weekDir);
			const files = await readdir(weekPath);

			for (const filename of files) {
				if (!filename.endsWith('.md')) continue;
				if (filename === 'index.md' || filename === 'outcome-map.md') continue;

				const filepath = join(weekPath, filename);
				const content = await readFile(filepath, 'utf-8');
				const { frontmatter, body } = parseFrontmatter(content);

				const lessonId = `${weekDir}-${filename.replace('.md', '')}`;
				const status = determineLessonStatus(frontmatter);

				// Extract title from frontmatter or first heading
				let title = frontmatter.title as string;
				if (!title) {
					const headingMatch = body.match(/^#\s+(.+)$/m);
					title = headingMatch ? headingMatch[1] : filename.replace('.md', '');
				}

				items.push({
					id: `lesson-${lessonId}`,
					type: 'lesson',
					title,
					status,
					createdAt: (frontmatter.created as string) || null,
					updatedAt: (frontmatter.updated as string) || null,
					scheduledAt: null,
					publishedAt: status === 'published' ? (frontmatter.published as string) : null,
					excerpt: (frontmatter.description as string) || truncate(body),
					path: `/syllabus/${weekDir}/${filename}`,
					metadata: {
						week: weekDir,
						day: filename.replace('.md', ''),
						duration: frontmatter.duration,
						draft: frontmatter.draft
					}
				});
			}
		}
	} catch (err) {
		console.error('Error reading lesson content:', err);
	}

	return items;
}

function determineLessonStatus(frontmatter: Record<string, unknown>): ContentStatus {
	if (frontmatter.draft === true) return 'draft';
	if (frontmatter.status === 'review') return 'review';
	return 'published';
}

/**
 * Get all content aggregated
 */
export async function getAllContent(): Promise<ContentItem[]> {
	const [social, blog, lessons] = await Promise.all([
		getSocialContent(),
		getBlogContent(),
		getLessonContent()
	]);

	const all = [...social, ...blog, ...lessons];

	// Sort by most recent first
	all.sort((a, b) => {
		const dateA = a.updatedAt || a.createdAt || a.scheduledAt || '';
		const dateB = b.updatedAt || b.createdAt || b.scheduledAt || '';
		return dateB.localeCompare(dateA);
	});

	return all;
}

/**
 * Get content stats
 */
export async function getContentStats(): Promise<{
	total: number;
	byType: Record<ContentType, number>;
	byStatus: Record<ContentStatus, number>;
}> {
	const content = await getAllContent();

	const byType: Record<ContentType, number> = { social: 0, blog: 0, lesson: 0 };
	const byStatus: Record<ContentStatus, number> = { draft: 0, review: 0, approved: 0, published: 0, posted: 0 };

	for (const item of content) {
		byType[item.type]++;
		byStatus[item.status]++;
	}

	return {
		total: content.length,
		byType,
		byStatus
	};
}
