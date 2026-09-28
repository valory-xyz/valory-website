import type { GetStaticProps } from 'next';

import { getPosts } from 'utils/api';
import { Layout } from 'components/Layout';
import { Meta } from 'components/Meta';
import { News } from 'components/Content/News';
import { Article } from 'types/Article';

type NewsPageProps = { posts: Article[] };

/** Above the 60 posts the CMS holds today, and it reports the true total either way. */
const ALL_POSTS = 100;

/**
 * Statically generated and revalidated, not client-fetched: this is the page that links
 * to every post, so the links have to be in the HTML a crawler is served. ISR rather
 * than SSR so a CMS blip leaves the last good list standing instead of emptying it.
 */
export const getStaticProps: GetStaticProps<NewsPageProps> = async () => ({
  props: { posts: await getPosts({ limit: ALL_POSTS }) },
  revalidate: 300,
});

const NewsPage = ({ posts }: NewsPageProps) => (
  <Layout>
    <Meta
      pageTitle="Valory News"
      pageDesc="Read up on the latest articles and news, keep up to date with Valory!"
      pageUrl="post"
    />
    <section className="mb-12">
      <div className="bg-neutral-200 flex h-[60vh] -w-full place-content-center">
        <h2 className="big-heading my-auto text-[90px]">News</h2>
      </div>

      <News posts={posts} isMainPage={true} />
    </section>
  </Layout>
);

export default NewsPage;
