// pages/post/[id].tsx

import { Layout } from 'components/Layout';
import { Meta } from 'components/Meta';
import { useRouter } from 'next/router';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Meta />
      <section className="pt-20">
        <h1>Post {id}</h1>

        <iframe src={`/news-posts/${id}.pdf`} width="100%" height="600px" />
      </section>
    </Layout>
  );
};

export default Post;
