import { Layout } from 'components/Layout';
import { Meta } from 'components/Meta';
import { useRouter } from 'next/router';

import React from 'react';
import { News } from 'components/Content/News';
import Link from 'next/link';
import { PdfContent } from 'components/pdfContent';

import posts from 'data/posts.json';

const getTags = ({ id }: { id: string | string[] | undefined }) => {
  for (const item of posts) {
    if (item.fileName === id) {
      return {
        title: item.title,
        desc: item.description,
        route: item.fileName,
      };
    }
  }
  return { title: '', desc: '' };
};

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  const metadata = getTags({ id: id });

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Meta
        pageTitle={metadata?.title}
        pageDesc={metadata?.desc}
        pageUrl={`post/${metadata?.route}`}
      />
      <section className="max-w-screen-lg mx-auto">
        <div className="pt-32 pb-12 sm:px-8 lg:px-20 flex justify-center w-full">
          <PdfContent id={`news-posts/${id}`} showSocials={true} />
        </div>
        <div className="sm:mx-20 place-content-center mb-8">
          <div className="px-8 mb-4 flex justify-between">
            <span>Recent Posts</span>
            <Link href="/post">See all</Link>
          </div>
          <News limit={3} showDescriptions={false} />
        </div>
      </section>
    </Layout>
  );
};

export default Post;
