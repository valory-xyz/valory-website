# CLAUDE.md – Valory Website

Context for AI assistants working in this repo.

## What this project is

- **Valory** marketing/company website: homepage, news/blog, legal pages, and a restricted region page.
- **Stack**: Next.js 15 (Pages Router), React 18, TypeScript, Tailwind CSS, DaisyUI.
- **Content**: Blog posts and assets come from a **backend CMS** (Strapi-compatible API). The site is mostly presentational; editing happens in the CMS.

## Architecture (root level)

- **Router**: Next.js **Pages Router** only (`pages/`). No App Router.
- **CMS**: Backend at `NEXT_PUBLIC_CMS_URL` (e.g. `valory-cms-backend.autonolas.tech`). Staging and prod image domains are in `next.config.ts` under `images.domains`. Post data is fetched client-side via `utils/api` (`getPosts()`, `getPost({ id })`), which calls the local proxy at `pages/api/posts/*` — the proxy attaches `CMS_API_KEY` (server-only) and forwards to the CMS. Posts are identified by `filename`; single post route is `pages/post/[id].tsx`.
- **Middleware**: `middleware.ts` runs on every matching request. It reads `x-vercel-ip-region` and redirects users from specific regions (see `BLOCKED_REGIONS`) to `/restricted`. Static assets and API routes are excluded by the matcher.
- **Config**: `next.config.ts` – i18n (en only), security headers, CSP, redirects (e.g. `/academy` → external), image domains for CMS.

## Key paths

| Path | Purpose |
|------|--------|
| `pages/` | All routes: `index.tsx`, `post/index.tsx`, `post/[id].tsx`, `restricted.tsx`, `terms.tsx`, `privacy.tsx`, `_app.tsx` |
| `components/` | Layout, Meta, HomePage sections, `Content/News.tsx`, `Content/Post.tsx`, Markdown, Spinner, etc. |
| `utils/api/index.tsx` | Client-side wrapper for `getPosts({ limit })`, `getPost({ id })` — calls the local proxy at `/api/posts`. |
| `pages/api/posts/index.ts`, `pages/api/posts/[id].ts` | Server-side proxy to the CMS. Holds `CMS_API_KEY` (never shipped to the client) and forwards requests to `NEXT_PUBLIC_CMS_URL`. |
| `utils/formatDate.ts` | Date formatting for posts. |
| `types/Article.tsx` | `Article` type (filename, date, readtime, title, description, content, images). |
| `styles/globals.css` | Global styles; imported in `_app.tsx`. |

## Business logic

- **Posts**: Listed on `/post` and homepage (LatestNews). Single post at `/post/[id]` where `id` is the post’s `filename`. Content and images are from CMS; image URLs are built with `NEXT_PUBLIC_CMS_URL` (see `Content/Post.tsx` and `Markdown.tsx`).
- **Region blocking**: Middleware redirects requests from certain regions to `/restricted`; no server-side CMS calls are involved in that decision.

## Conventions

- Use existing patterns: client-side fetch in `useEffect` for posts, `Layout` + `Meta` on pages, `Article` type for post data.
- New shared logic → `utils/`; new types → `types/`.
- Env: `NEXT_PUBLIC_CMS_URL` (public — used for client-side image URLs and server-side proxy), `CMS_API_KEY` (server-only — never expose with `NEXT_PUBLIC_`). See `env.example`. Do not commit real keys.

## Commands

- `yarn dev` – dev server
- `yarn build` – build (runs `next-sitemap` postbuild)
- `yarn lint` – lint
