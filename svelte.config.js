import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { createHighlighter } from 'shiki';

// Create highlighter for code blocks
const highlighter = await createHighlighter({
	themes: ['github-dark'],
	langs: ['javascript', 'typescript', 'svelte', 'html', 'css', 'json', 'bash', 'python', 'markdown', 'yaml', 'shell', 'plaintext', 'text']
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			highlight: {
				highlighter: (code, lang) => {
					const html = highlighter.codeToHtml(code, {
						lang: lang || 'text',
						theme: 'github-dark'
					});
					return `{@html \`${html.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`}`;
				}
			},
			rehypePlugins: [
				rehypeSlug,
				[rehypeAutolinkHeadings, { behavior: 'wrap' }]
			]
		})
	],
	kit: {
		adapter: adapter()
	}
};

export default config;
