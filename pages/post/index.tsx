import { Layout } from 'components/Layout';
import { Meta } from 'components/Meta';
import { News } from 'components/Content/News';

const NewsPage = () => (
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

      <News limit={100} isMainPage={true} />
    </section>
  </Layout>
);

export default NewsPage;
