import { Layout } from 'components/Layout';
import { Meta } from 'components/Meta';
import { News } from 'components/Content/News';

const NewsPage = () => (
  <Layout>
    <Meta />
    <section className="mb-12">
      <div className="bg-neutral-200 flex h-[60vh] -w-full place-content-center">
        <h1 className="my-auto text-[90px]">News</h1>
      </div>

      <News isMainPage={true} />
    </section>
  </Layout>
);

export default NewsPage;
