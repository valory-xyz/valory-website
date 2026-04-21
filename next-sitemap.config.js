/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.valory.xyz/',
  generateRobotsTxt: true,
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
