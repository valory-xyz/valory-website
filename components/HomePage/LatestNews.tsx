import Link from 'next/link';
import { News } from '../Content/News';

export const LatestNews = () => (
  <section id="news">
    <div className="flex flex-col my-12">
      <h1 className="mx-auto">News</h1>
      <Link href="/post" className="mx-auto mb-8 text-lg underline">
        See all
      </Link>
      <News limit={10} />
    </div>
  </section>
);
