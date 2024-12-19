import { Layout } from 'components/Layout';
import { Meta } from 'components/Meta';
import { News } from 'components/Content/News';

const NewsPage = () => (
  <Layout>
    <Meta />
    <section className="h-[60vh]">
      <div className="bg-neutral-200 flex h-full -w-full place-content-center">
        <h1 className="my-auto text-[90px]">News</h1>
      </div>
    </section>
    <News isMainPage={true} />
  </Layout>
);

export default NewsPage;
