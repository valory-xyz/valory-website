import Link from 'next/link';

import { Article } from 'types/Article';

import { News } from '../Content/News';

export const LatestNews = ({ posts }: { posts: Article[] }) => (
  <section id="news">
    <div className="flex flex-col my-12">
      <h2 className="big-heading mx-auto max-md:text-4xl max-lg:text-5xl">
        News
      </h2>
      <Link href="/post" className="mx-auto mb-8 text-lg underline">
        See all
      </Link>
      <News posts={posts} />
    </div>
  </section>
);
