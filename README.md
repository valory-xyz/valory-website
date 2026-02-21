# Valory Website

Marketing and company site for [Valory](https://valory.io): homepage, news/blog, legal pages. Built with Next.js and content from a backend CMS.

## Architecture

- **Next.js 15** (Pages Router), React, TypeScript, Tailwind CSS.
- **CMS**: Blog posts and images are served from a Strapi-compatible backend. The site fetches content via `utils/api` (`getPosts`, `getPost`) using `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_API_KEY`. Image domains for the CMS are configured in `next.config.ts`.
- **Dynamic posts**: List at `/post`, single post at `/post/[id]` where `id` is the post’s `filename`. All post data is loaded client-side from the CMS.
- **Middleware**: Redirects users from certain regions (by `x-vercel-ip-region`) to `/restricted`; static and API paths are excluded.

For more detail (paths, types, conventions), see [CLAUDE.md](CLAUDE.md).

## Getting started

```bash
# Install
yarn install

# Copy env and set CMS URL + API key
cp env.example .env
# Edit .env: NEXT_PUBLIC_API_URL, NEXT_PUBLIC_API_KEY

# Run dev server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command       | Description        |
|---------------|--------------------|
| `yarn dev`    | Development server |
| `yarn build`  | Production build (includes next-sitemap) |
| `yarn start`  | Run production server |
| `yarn lint`   | Run ESLint         |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for workflow, branch naming, and PR process.

## Deploy

The app is deployable to [Vercel](https://vercel.com). Set `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_API_KEY` in the project environment.
