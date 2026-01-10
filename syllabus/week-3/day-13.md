# Day 13: Get Found

> "Build it and they will come... if they can find it."

## The Challenge

**By end of day, your product is optimized for search engines and fast as lightning.**

SEO brings free traffic forever. Performance keeps visitors from leaving. Today you make your product discoverable and delightful to use.

---

## What You're Building

| Feature | What It Does |
|---------|--------------|
| Meta tags | Tell search engines what you are |
| Sitemap | Help crawlers find all pages |
| Structured data | Rich results in search |
| Performance optimization | Fast load times |
| Core Web Vitals | Google ranking factors |

**The result:** Your product shows up in search and loads in under 2 seconds.

---

## Schedule

### Morning Block (9:00 - 12:00)

| Time | Activity | Outcome |
|------|----------|---------|
| 9:00 - 9:30 | SEO Audit | Find what's missing |
| 9:30 - 10:30 | Meta Tags + Open Graph | Social previews working |
| 10:30 - 10:45 | Break | |
| 10:45 - 12:00 | Sitemap + Robots.txt | Crawler-ready |

### Lunch (12:00 - 13:00)

### Afternoon Block (13:00 - 17:30)

| Time | Activity | Outcome |
|------|----------|---------|
| 13:00 - 13:30 | Standup: Share URLs | Check social previews |
| 13:30 - 14:30 | Performance Audit | Identify bottlenecks |
| 14:30 - 14:45 | Break | |
| 14:45 - 15:45 | Optimize Load Time | Under 2 second load |
| 15:45 - 16:30 | Core Web Vitals | Pass Google's checks |
| 16:30 - 17:00 | Structured Data | Rich search results |
| 17:00 - 17:30 | Ship | SEO-optimized site live |

---

## Morning: SEO Fundamentals

### 1. SEO Audit (30 min)

**Find what's missing:**
```
You: Audit my site's SEO. Check:

1. Technical SEO:
   - Does every page have a unique <title>?
   - Does every page have a <meta description>?
   - Are there any broken links?
   - Is the site crawlable?

2. Content SEO:
   - Are headings structured correctly (h1 → h2 → h3)?
   - Do images have alt text?
   - Is content readable?

3. Mobile SEO:
   - Is the site mobile-friendly?
   - Does it pass mobile usability test?

4. Speed:
   - What's the current Lighthouse score?
   - What's slowing it down?

Give me a prioritized list of issues to fix.
```

**Quick wins to note:**
- Missing titles/descriptions
- Missing alt text
- Broken links
- Slow loading resources

### 2. Meta Tags + Open Graph (60 min)

**Add proper meta tags:**
```
You: Set up comprehensive meta tags for all pages.

Create a reusable SEO component that accepts:
- title
- description
- image (for social sharing)
- url
- type (website, article, product)

Include:
1. Basic meta:
   <title>{title} | [Product Name]</title>
   <meta name="description" content="{description}">

2. Open Graph (Facebook/LinkedIn):
   <meta property="og:title" content="{title}">
   <meta property="og:description" content="{description}">
   <meta property="og:image" content="{image}">
   <meta property="og:url" content="{url}">
   <meta property="og:type" content="{type}">

3. Twitter Cards:
   <meta name="twitter:card" content="summary_large_image">
   <meta name="twitter:title" content="{title}">
   <meta name="twitter:description" content="{description}">
   <meta name="twitter:image" content="{image}">

4. Canonical URL:
   <link rel="canonical" href="{url}">

Apply defaults for pages that don't specify custom values.
```

**Create OG images:**
```
You: Create a default Open Graph image for social sharing.

Size: 1200x630px
Include:
- Product logo/name
- Tagline
- Brand colors

Save to /static/og-default.jpg

For blog posts, we could generate dynamic OG images later.
```

**Test social previews:**
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### 3. Sitemap + Robots.txt (75 min)

**Generate sitemap:**
```
You: Create an automatic sitemap for the site.

1. Create /sitemap.xml that includes:
   - All public pages (/, /pricing, /blog, etc.)
   - All blog posts
   - All public content

2. Format:
   <urlset>
     <url>
       <loc>https://yoursite.com/page</loc>
       <lastmod>2024-01-15</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.8</priority>
     </url>
   </urlset>

3. Generate dynamically from:
   - Static routes
   - Database (blog posts, public content)

4. Update lastmod when content changes
```

**Create robots.txt:**
```
You: Create /robots.txt for the site.

Include:
User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /admin
Disallow: /api
Sitemap: https://yoursite.com/sitemap.xml

Block private routes from crawlers.
Allow public marketing pages.
```

**Submit to Google:**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (verify ownership)
3. Submit your sitemap
4. Check for crawl errors

---

## Afternoon: Performance

### 4. Performance Audit (60 min)

**Measure current performance:**
```
You: Run a comprehensive performance audit.

Use:
1. Lighthouse (in Chrome DevTools)
2. WebPageTest.org
3. Google PageSpeed Insights

Measure:
- Performance score
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Total Blocking Time (TBT)
- Cumulative Layout Shift (CLS)

Identify:
- Large images
- Render-blocking resources
- Slow API calls
- Unnecessary JavaScript
- Missing caching

Give me the top 5 issues to fix.
```

**Common problems:**

| Issue | Impact | Fix |
|-------|--------|-----|
| Large images | Slow LCP | Compress, use WebP, lazy load |
| Unoptimized fonts | Slow FCP | Subset fonts, use font-display: swap |
| Too much JS | High TBT | Code splitting, tree shaking |
| No caching | Repeat loads slow | Set cache headers |
| Layout shifts | Bad CLS | Set image dimensions, reserve space |

### 5. Optimize Load Time (60 min)

**Fix the big issues:**
```
You: Optimize our site's load performance.

1. Images:
   - Convert to WebP format
   - Add width/height attributes
   - Implement lazy loading for below-fold images
   - Use responsive images (srcset)

2. Fonts:
   - Subset fonts to only characters we use
   - Use font-display: swap
   - Preload critical fonts

3. JavaScript:
   - Enable code splitting in SvelteKit
   - Lazy load non-critical components
   - Remove unused dependencies

4. CSS:
   - Purge unused Tailwind classes
   - Inline critical CSS
   - Defer non-critical styles

5. Caching:
   - Set appropriate cache headers
   - Use immutable for static assets
   - Implement stale-while-revalidate
```

**Measure improvement:**
- Run Lighthouse again
- Compare before/after scores
- Target: 90+ Performance score

### 6. Core Web Vitals (45 min)

**Pass Google's ranking factors:**
```
You: Optimize for Core Web Vitals.

1. Largest Contentful Paint (LCP) < 2.5s:
   - Optimize hero image
   - Preload critical resources
   - Use CDN for static assets

2. First Input Delay (FID) < 100ms:
   - Minimize JavaScript execution
   - Break up long tasks
   - Use web workers for heavy computation

3. Cumulative Layout Shift (CLS) < 0.1:
   - Set explicit dimensions on images
   - Reserve space for dynamic content
   - Avoid inserting content above existing content

4. Add monitoring:
   - Track Web Vitals in production
   - Alert if metrics degrade
```

**Install Web Vitals tracking:**
```
You: Add real-user Web Vitals monitoring.

Use the web-vitals library to:
1. Measure LCP, FID, CLS for real users
2. Send to our analytics
3. Track by page, device, connection

Add a /admin/performance page showing:
- Web Vitals over time
- Breakdown by page
- Breakdown by device
```

### 7. Structured Data (30 min)

**Get rich search results:**
```
You: Add structured data (JSON-LD) to our pages.

1. Organization (site-wide):
   - Name, logo, social links
   - Contact info

2. WebSite:
   - Search action (if we have search)
   - Name, URL

3. Product (if applicable):
   - Name, description, price
   - Availability, reviews

4. Article (for blog posts):
   - Headline, author, date
   - Image, publisher

5. FAQ (for pricing/help pages):
   - Question/answer pairs

Use JSON-LD format in <script type="application/ld+json">.
Test with Google's Rich Results Test.
```

**Test structured data:**
- [Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)

### 8. Ship (30 min)

**Deploy optimized site:**
```
You: Commit everything with message "Day 13: SEO + Performance"
and push to GitHub.
```

**Final checks:**
- [ ] All pages have meta tags
- [ ] Social previews look good
- [ ] Sitemap submitted to Google
- [ ] Lighthouse Performance > 90
- [ ] Core Web Vitals passing
- [ ] Structured data valid
- [ ] Mobile-friendly

---

## What You Built Today

| Feature | Impact |
|---------|--------|
| Meta tags | Better search snippets |
| Open Graph | Beautiful social shares |
| Sitemap | Google finds all pages |
| Performance optimization | Fast load times |
| Core Web Vitals | Better Google ranking |
| Structured data | Rich search results |

**Your product is discoverable now.** Search engines can find it, social shares look professional, and it loads fast.

---

## The SEO Pattern

Save for future projects:
```
You: Create an seo-performance skill from what we built today.
Include:
- Meta tag component
- Sitemap generation
- Performance optimization checklist
- Web Vitals monitoring setup
- Structured data templates
```

---

## SEO Quick Wins Checklist

| Task | Time | Impact |
|------|------|--------|
| Add unique titles | 10 min | High |
| Add meta descriptions | 15 min | High |
| Create OG image | 20 min | Medium |
| Submit sitemap | 5 min | High |
| Compress images | 30 min | High |
| Add lazy loading | 15 min | Medium |
| Fix CLS issues | 30 min | Medium |

---

## Day 13 Troubleshooting

| Problem | Solution |
|---------|----------|
| Social preview not updating | Clear cache in debugger tools |
| Sitemap not found | Check route is correct, no auth required |
| Lighthouse score low | Fix one issue at a time, biggest first |
| Images still slow | Verify WebP conversion, check CDN |
| CLS issues | Add explicit width/height to all images |

---

*Tomorrow: Ship with confidence. Tests and monitoring.*
