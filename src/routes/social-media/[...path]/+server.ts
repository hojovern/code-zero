import { readFile } from 'fs/promises';
import { join } from 'path';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const MIME_TYPES: Record<string, string> = {
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.gif': 'image/gif',
	'.webp': 'image/webp',
	'.svg': 'image/svg+xml'
};

export const GET: RequestHandler = async ({ params }) => {
	const path = params.path;

	// Security: prevent directory traversal
	if (path.includes('..')) {
		throw error(400, 'Invalid path');
	}

	const filePath = join('social-media', path);
	const ext = '.' + path.split('.').pop()?.toLowerCase();
	const mimeType = MIME_TYPES[ext];

	if (!mimeType) {
		throw error(400, 'Unsupported file type');
	}

	try {
		const file = await readFile(filePath);
		return new Response(file, {
			headers: {
				'Content-Type': mimeType,
				'Cache-Control': 'public, max-age=31536000'
			}
		});
	} catch (err) {
		throw error(404, 'File not found');
	}
};
