import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const QUEUE_DIR = 'social-media/queue';
const POSTED_DIR = 'social-media/posted';
const FAILED_DIR = 'social-media/failed';

export interface QueuePost {
	id: string;
	platform: string;
	format: string;
	status: 'draft' | 'approved' | 'posting' | 'posted' | 'failed';
	scheduled_date: string;
	image: string | null;
	image_url: string | null;
	caption_length: number;
	hashtag_count: number;
	created_at: string | null;
	posted_at: string | null;
	instagram_media_id: string | null;
	error: string | null;
	caption: string;
	filename: string;
}

function parseFrontmatter(content: string): { frontmatter: Record<string, any>; body: string } {
	const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
	if (!match) {
		return { frontmatter: {}, body: content };
	}

	const frontmatterStr = match[1];
	const body = match[2].trim();
	const frontmatter: Record<string, any> = {};

	for (const line of frontmatterStr.split('\n')) {
		const colonIndex = line.indexOf(':');
		if (colonIndex === -1) continue;

		const key = line.slice(0, colonIndex).trim();
		let value: any = line.slice(colonIndex + 1).trim();

		// Parse values
		if (value === 'null') value = null;
		else if (value === 'true') value = true;
		else if (value === 'false') value = false;
		else if (/^\d+$/.test(value)) value = parseInt(value, 10);

		frontmatter[key] = value;
	}

	return { frontmatter, body };
}

function serializeFrontmatter(frontmatter: Record<string, any>): string {
	const lines: string[] = [];
	for (const [key, value] of Object.entries(frontmatter)) {
		if (value === null) {
			lines.push(`${key}: null`);
		} else if (typeof value === 'boolean') {
			lines.push(`${key}: ${value}`);
		} else {
			lines.push(`${key}: ${value}`);
		}
	}
	return lines.join('\n');
}

export async function getQueuePosts(): Promise<QueuePost[]> {
	const posts: QueuePost[] = [];

	try {
		const files = await readdir(QUEUE_DIR);

		for (const filename of files) {
			if (!filename.endsWith('.md') || filename.startsWith('_')) continue;

			const filepath = join(QUEUE_DIR, filename);
			const content = await readFile(filepath, 'utf-8');
			const { frontmatter, body } = parseFrontmatter(content);

			posts.push({
				id: frontmatter.id || filename.replace('.md', ''),
				platform: frontmatter.platform || 'instagram',
				format: frontmatter.format || 'square',
				status: frontmatter.status || 'draft',
				scheduled_date: frontmatter.scheduled_date || '',
				image: frontmatter.image || null,
				image_url: frontmatter.image_url || null,
				caption_length: frontmatter.caption_length || 0,
				hashtag_count: frontmatter.hashtag_count || 0,
				created_at: frontmatter.created_at || null,
				posted_at: frontmatter.posted_at || null,
				instagram_media_id: frontmatter.instagram_media_id || null,
				error: frontmatter.error || null,
				caption: body,
				filename
			});
		}
	} catch (err) {
		console.error('Error reading queue:', err);
	}

	// Sort by scheduled date
	posts.sort((a, b) => a.scheduled_date.localeCompare(b.scheduled_date));

	return posts;
}

export async function updatePostStatus(id: string, newStatus: 'draft' | 'approved' | 'rejected'): Promise<boolean> {
	try {
		const files = await readdir(QUEUE_DIR);
		const filename = files.find((f: string) => f.includes(id) && f.endsWith('.md'));

		if (!filename) {
			console.error(`Post not found: ${id}`);
			return false;
		}

		const filepath = join(QUEUE_DIR, filename);
		const content = await readFile(filepath, 'utf-8');
		const { frontmatter, body } = parseFrontmatter(content);

		// Update status
		frontmatter.status = newStatus === 'rejected' ? 'draft' : newStatus;

		// Write back
		const newContent = `---\n${serializeFrontmatter(frontmatter)}\n---\n\n${body}\n`;
		await writeFile(filepath, newContent);

		return true;
	} catch (err) {
		console.error('Error updating post:', err);
		return false;
	}
}

export async function getPostById(id: string): Promise<QueuePost | null> {
	try {
		const files = await readdir(QUEUE_DIR);
		const filename = files.find((f: string) => f.includes(id) && f.endsWith('.md'));

		if (!filename) return null;

		const filepath = join(QUEUE_DIR, filename);
		const content = await readFile(filepath, 'utf-8');
		const { frontmatter, body } = parseFrontmatter(content);

		return {
			id: frontmatter.id || filename.replace('.md', ''),
			platform: frontmatter.platform || 'instagram',
			format: frontmatter.format || 'square',
			status: frontmatter.status || 'draft',
			scheduled_date: frontmatter.scheduled_date || '',
			image: frontmatter.image || null,
			image_url: frontmatter.image_url || null,
			caption_length: frontmatter.caption_length || 0,
			hashtag_count: frontmatter.hashtag_count || 0,
			created_at: frontmatter.created_at || null,
			posted_at: frontmatter.posted_at || null,
			instagram_media_id: frontmatter.instagram_media_id || null,
			error: frontmatter.error || null,
			caption: body,
			filename
		};
	} catch (err) {
		console.error('Error getting post:', err);
		return null;
	}
}
