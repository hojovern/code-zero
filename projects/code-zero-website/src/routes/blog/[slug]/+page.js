import { error } from '@sveltejs/kit';
import { getPost } from '$lib/posts.js';

export async function load({ params }) {
	const post = await getPost(params.slug);

	if (!post) {
		throw error(404, 'Post not found');
	}

	return { post };
}
