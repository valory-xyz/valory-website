/**
 * Every post, for the sitemap. `next-sitemap` only sees static routes, so without this the
 * sitemap listed four URLs and not one of the posts — the pages we most want found.
 * Falls back to none on any failure rather than failing the build: a sitemap without
 * posts is the state it was in before, not a broken site.
 */
const fetchPostPaths = async () => {
  const cms = process.env.NEXT_PUBLIC_CMS_URL;
  if (!cms) return [];
  try {
    const url = `${cms}/api/posts?fields[0]=filename&fields[1]=date&pagination[limit]=-1`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${response.status} from ${url}`);
    const json = await response.json();
    return (json?.data ?? [])
      .map((post) => post.attributes ?? post)
      .filter((post) => typeof post.filename === 'string' && post.filename)
      .map((post) => ({
        loc: `/post/${post.filename}`,
        lastmod: post.date ? new Date(post.date).toISOString() : undefined,
      }));
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
