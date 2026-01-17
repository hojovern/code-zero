import { GoogleGenerativeAI } from "@google/generative-ai";
import * as cheerio from 'cheerio';
import { parseSitemap, SitemapItemLoose } from 'sitemap';
import { Readable } from 'stream';

// Fallback for standalone scripts
const apiKey = typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : '';
const genAI = new GoogleGenerativeAI(apiKey || "");

export async function getEmbeddings(text: string) {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const result = await model.embedContent(text);
    return result.embedding.values;
}

async function fetchSitemap(baseUrl: string): Promise<string[]> {
    const sitemapUrls = [
        `${baseUrl}/sitemap.xml`,
        `${baseUrl}/sitemap_index.xml`,
        `${baseUrl}/sitemap`,
    ];

    for (const url of sitemapUrls) {
        try {
            console.log(`🗺️ Checking for sitemap at: ${url}`);
            const response = await fetch(url);
            if (response.ok && response.headers.get('content-type')?.includes('xml')) {
                const xml = await response.text();
                // Simple regex fallback if stream parsing fails or for quick extraction
                const urls = (xml.match(/<loc>(.*?)<\/loc>/g) || [])
                    .map(loc => loc.replace(/<\/?loc>/g, ''));
                
                if (urls.length > 0) {
                    console.log(`✅ Found ${urls.length} URLs in sitemap.`);
                    return urls;
                }
            }
        } catch (e) {
            console.log(`⚠️ Failed to fetch sitemap at ${url}`);
        }
    }
    return [];
}

export async function crawlWebsite(baseUrl: string, maxPages = 20) {
    const visited = new Set<string>();
    let queue: string[] = [baseUrl];
    const results: { url: string; title: string; content: string }[] = [];

    console.log(`🚀 Starting Deep Gizmosis for ${baseUrl}...`);

    // 1. Try Sitemap First
    const sitemapUrls = await fetchSitemap(baseUrl);
    if (sitemapUrls.length > 0) {
        console.log(`📦 Hydrating queue from Sitemap...`);
        // Prioritize sitemap, but keep baseUrl at the top
        queue = [baseUrl, ...sitemapUrls.filter(u => u !== baseUrl)];
    }

    while (queue.length > 0 && results.length < maxPages) {
        const url = queue.shift()!;
        if (visited.has(url)) continue;
        visited.add(url);

        try {
            console.log(`📡 Fetching: ${url}`);
            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                }
            });
            const html = await response.text();
            const $ = cheerio.load(html);

            // Extract content
            const title = $('title').text() || url;
            
            // Remove noise
            $('nav, footer, script, style, aside, .ads, .social-links').remove();
            const content = $('body').text().replace(/\s+/g, ' ').trim();

            if (content.length > 200) { // Only save substantial pages
                results.push({ url, title, content });
            }

            // Find more links (Fall back to crawling if we didn't get enough from sitemap)
            if (results.length < maxPages) {
                const domain = new URL(baseUrl).hostname;
                let linkCount = 0;
                $('a').each((_, element) => {
                    const href = $(element).attr('href');
                    if (href) {
                        try {
                            const absoluteUrl = new URL(href, url).toString();
                            const urlObj = new URL(absoluteUrl);
                            
                            // Only follow links from the same domain
                            if (urlObj.hostname === domain && 
                                !visited.has(absoluteUrl) && 
                                !absoluteUrl.match(/\.(png|jpg|jpeg|gif|pdf|zip|css|js|svg|webp|woff|woff2)$/i)) {
                                queue.push(absoluteUrl);
                                linkCount++;
                            }
                        } catch (e) {}
                    }
                });
                if (sitemapUrls.length === 0) {
                    console.log(`🔗 Found ${linkCount} new links on ${url}`);
                }
            }

            // Respect the server
            await new Promise(resolve => setTimeout(resolve, 500));

        } catch (error) {
            console.error(`❌ Failed to fetch ${url}:`, error);
        }
    }

    console.log(`✅ Deep Gizmosis complete. Crawled ${results.length} pages.`);
    return results;
}
