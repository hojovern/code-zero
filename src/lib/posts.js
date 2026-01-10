/**
 * Blog post utilities
 * Loads markdown files from src/content/blog/
 */

/**
 * Get all blog posts sorted by date (newest first)
 * @returns {Promise<Array>} Array of post objects with metadata
 */
export async function getPosts() {
  const posts = [];

  // Import all markdown files from content/blog
  const modules = import.meta.glob('/src/content/blog/*.md', { eager: true });

  for (const path in modules) {
    const module = modules[path];
    const slug = path.split('/').pop()?.replace('.md', '') || '';

    if (module.metadata) {
      posts.push({
        slug,
        ...module.metadata,
        // Calculate reading time if not provided
        readingTime: module.metadata.readingTime || calculateReadingTime(module.default)
      });
    }
  }

  // Sort by date (newest first)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return posts;
}

/**
 * Get a single post by slug
 * @param {string} slug - The post slug
 * @returns {Promise<Object|null>} Post object with content or null if not found
 */
export async function getPost(slug) {
  try {
    const module = await import(`/src/content/blog/${slug}.md`);
    return {
      slug,
      ...module.metadata,
      content: module.default
    };
  } catch {
    return null;
  }
}

/**
 * Get all unique tags from posts
 * @returns {Promise<Array>} Array of unique tags with counts
 */
export async function getTags() {
  const posts = await getPosts();
  const tagCounts = {};

  posts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    }
  });

  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get posts by tag
 * @param {string} tag - The tag to filter by
 * @returns {Promise<Array>} Array of posts with the specified tag
 */
export async function getPostsByTag(tag) {
  const posts = await getPosts();
  return posts.filter(post => post.tags?.includes(tag));
}

/**
 * Rough reading time calculation
 * @param {any} content - The post content
 * @returns {string} Reading time string
 */
function calculateReadingTime(content) {
  // This is a rough estimate - actual implementation would count words from rendered content
  return '5 min read';
}

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
