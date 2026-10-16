import React from 'react';

import { Article } from 'types/Article';

import { Post } from './Post';

/**
 * Presentational. The posts used to be fetched here in a `useEffect`, so the served
 * HTML of every page carrying this grid was a spinner with no links in it — which made
 * all 60 posts orphans, reachable only through the sitemap. Same reasoning as the fix
 * to `pages/post/[id].tsx`: the pages now fetch on the server and pass the list in.
 */
export const News = ({
  posts,
  isMainPage = false,
  showDescriptions = true,
  columns = 4,
}: {
  posts: Article[];
  isMainPage?: boolean;
  showDescriptions?: boolean;
  columns?: 3 | 4;
}) => (
  <section className={`h-full max-w-screen-2xl px-8 xl:mx-auto`}>
    {isMainPage && <p className="text-lg my-6 max-sm:ml-4">All Posts</p>}
    <div
      className={`grid gap-8 md:grid-cols-2 ${columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}
    >
      {posts.map((article) => (
        <Post
          key={article.filename}
          article={article}
          showDescription={showDescriptions}
        />
      ))}
    </div>
  </section>
);
