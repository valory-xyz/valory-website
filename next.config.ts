import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  images: {
    domains: [
      'valory-cms-backend.staging.autonolas.tech',
      'valory-cms-backend.autonolas.tech',
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'none';",
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|css|js|mov|mp4)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, must-revalidate',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/academy',
        destination: 'https://olas.network/academy',
        permanent: true,
      },
      // Wix-era vanity URLs. Search Console still crawls both and gets a 404 —
      // they have been dead since the migration, so point them at what they meant.
      // The casing alternatives are spelled out because Next matches `source`
      // case-sensitively, and the link that is still out there is `/LinkedIn`.
      {
        source: '/:slug(LinkedIn|Linkedin|linkedin|LINKEDIN)',
        destination: 'https://www.linkedin.com/company/valoryag/',
        permanent: true,
      },
      {
        source: '/propel-genie',
        destination: '/post/propel-genie',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
