// Prompts data for the prompts library
export const prompts = [
	{
		id: 'claude-code-setup',
		title: 'Claude Project Setup',
		tool: 'Claude',
		type: 'Instructions',
		icon: '📋',
		tags: ['setup', 'project', 'CLAUDE.md'],
		description: 'Instructions for setting up a new project with Claude, including CLAUDE.md configuration and best practices.',
		slug: 'claude-code-setup'
	},
	{
		id: 'git-commit-agent',
		title: 'Git Commit Agent',
		tool: 'Claude',
		type: 'Agents',
		icon: '🤖',
		tags: ['git', 'automation', 'commits'],
		description: 'An agent that analyzes your changes and generates meaningful commit messages following conventional commits.',
		slug: 'git-commit-agent'
	},
	{
		id: 'code-review-agent',
		title: 'Code Review Agent',
		tool: 'Claude',
		type: 'Agents',
		icon: '🤖',
		tags: ['review', 'quality', 'feedback'],
		description: 'Automated code review agent that checks for bugs, security issues, and suggests improvements.',
		slug: 'code-review-agent'
	},
	{
		id: 'sveltekit-instructions',
		title: 'SvelteKit Development Instructions',
		tool: 'Claude',
		type: 'Instructions',
		icon: '📋',
		tags: ['svelte', 'sveltekit', 'frontend'],
		description: 'Comprehensive instructions for building SvelteKit applications with Claude assistance.',
		slug: 'sveltekit-instructions'
	},
	{
		id: 'api-design-instructions',
		title: 'REST API Design Instructions',
		tool: 'Claude',
		type: 'Instructions',
		icon: '📋',
		tags: ['api', 'rest', 'backend'],
		description: 'Guidelines for designing clean, consistent REST APIs with proper error handling and documentation.',
		slug: 'api-design-instructions'
	},
	{
		id: 'blog-writer-skill',
		title: 'SEO Blog Writer Skill',
		tool: 'Claude',
		type: 'Skills',
		icon: '🎯',
		tags: ['seo', 'content', 'blog'],
		description: 'A skill that researches keywords, analyzes competitors, and writes SEO-optimized blog posts.',
		slug: 'blog-writer-skill'
	},
	{
		id: 'debug-assistant',
		title: 'Debug Assistant Prompt',
		tool: 'Claude',
		type: 'Prompts',
		icon: '💬',
		tags: ['debug', 'troubleshoot', 'errors'],
		description: 'A prompt template for systematic debugging of code issues with step-by-step analysis.',
		slug: 'debug-assistant'
	},
	{
		id: 'refactor-agent',
		title: 'Code Refactoring Agent',
		tool: 'Claude',
		type: 'Agents',
		icon: '🤖',
		tags: ['refactor', 'clean-code', 'patterns'],
		description: 'Agent that identifies code smells and refactors code following clean code principles.',
		slug: 'refactor-agent'
	},
	{
		id: 'typescript-instructions',
		title: 'TypeScript Best Practices',
		tool: 'Claude',
		type: 'Instructions',
		icon: '📋',
		tags: ['typescript', 'types', 'javascript'],
		description: 'Instructions for writing type-safe TypeScript code with proper generics and utility types.',
		slug: 'typescript-instructions'
	},
	{
		id: 'database-schema-instructions',
		title: 'Database Schema Design',
		tool: 'Claude',
		type: 'Instructions',
		icon: '📋',
		tags: ['database', 'sql', 'schema'],
		description: 'Guidelines for designing efficient database schemas with proper indexing and relationships.',
		slug: 'database-schema-instructions'
	},
	{
		id: 'testing-instructions',
		title: 'Testing Strategy Instructions',
		tool: 'Claude',
		type: 'Instructions',
		icon: '📋',
		tags: ['testing', 'jest', 'vitest'],
		description: 'Comprehensive testing instructions covering unit, integration, and e2e testing patterns.',
		slug: 'testing-instructions'
	},
	{
		id: 'copilot-custom-instructions',
		title: 'GitHub Copilot Custom Instructions',
		tool: 'Copilot',
		type: 'Instructions',
		icon: '📋',
		tags: ['copilot', 'github', 'setup'],
		description: 'Custom instructions to make GitHub Copilot more effective for your coding style.',
		slug: 'copilot-custom-instructions'
	}
];

// Get all unique tools
export function getTools() {
	const toolCounts = {};
	prompts.forEach(p => {
		toolCounts[p.tool] = (toolCounts[p.tool] || 0) + 1;
	});
	return Object.entries(toolCounts).map(([tool, count]) => ({ tool, count }));
}

// Get all unique types
export function getTypes() {
	const typeCounts = {};
	prompts.forEach(p => {
		typeCounts[p.type] = (typeCounts[p.type] || 0) + 1;
	});
	return Object.entries(typeCounts).map(([type, count]) => ({ type, count }));
}

// Get icon for type
export function getTypeIcon(type) {
	const icons = {
		'Agents': '🤖',
		'Skills': '🎯',
		'Prompts': '💬',
		'Instructions': '📋'
	};
	return icons[type] || '📄';
}
