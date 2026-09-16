/**
 * Every post, for the sitemap. `next-sitemap` only sees static routes, so without this the
 * sitemap listed four URLs and not one of the posts — the pages we most want found.
 * Falls back to none on any failure rather than failing the build: a sitemap without
 * posts is the state it was in before, not a broken site.
 */
const PAGE_SIZE = 100;
const MAX_PAGES = 50;

const fetchPostPaths = async () => {
  const cms = process.env.NEXT_PUBLIC_CMS_URL;
  if (!cms) return [];
  try {
    const paths = [];
    let total = 0;
    let page = 1;
    let pageCount = 1;
    // Paged, not `pagination[limit]=-1`: Strapi 5 reads -1 as 1 and returns a single post
    // while reporting the true total, so the previous version listed 1 of 60.
    do {
      const url =
        `${cms}/api/posts?fields[0]=filename&fields[1]=date` +
        `&pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`${response.status} from ${url}`);
      const json = await response.json();
      for (const entry of json?.data ?? []) {
        const post = entry.attributes ?? entry;
        if (typeof post.filename !== 'string' || !post.filename) continue;
        paths.push({
          loc: `/post/${post.filename}`,
          lastmod: post.date ? new Date(post.date).toISOString() : undefined,
        });
      }
      total = json?.meta?.pagination?.total ?? paths.length;
      pageCount = json?.meta?.pagination?.pageCount ?? 1;
      page += 1;
      // Bounded so a malformed `pageCount` cannot spin.
    } while (page <= pageCount && page <= MAX_PAGES);
    // Logged on success too: a run that silently adds one post looks exactly like a good one.
    console.log(`[next-sitemap] added ${paths.length} of ${total} posts.`);
    return paths;
  } catch (error) {
    console.error('[next-sitemap] could not list posts:', error.message);
    return [];
  }
};

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.valory.xyz/',
  generateRobotsTxt: true,
  additionalPaths: async () => fetchPostPaths(),
  // /restricted is a middleware-redirect destination for blocked regions,
  // not a user-navigable page — don't advertise it to search engines.
  // `exclude` drops it from the sitemap; `robotsTxtOptions` blocks crawlers
  // that might otherwise reach it via link-following.
  exclude: ['/restricted'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/restricted'],
      },
    ],
  },
};
