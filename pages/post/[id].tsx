import type { GetServerSideProps } from 'next';
import Link from 'next/link';

import React from 'react';

import { getPost } from 'utils/api';
import { formatDate } from 'utils/formatDate';
import { buildArticle, serializeJsonLd } from 'utils/structured-data';
import { News } from 'components/Content/News';
import { Layout } from 'components/Layout';
import { Meta } from 'components/Meta';
import { Markdown } from 'components/Markdown';
import { Article } from 'types/Article';

type PostProps = { post: Article };

/**
 * Server-rendered. The post used to load in a `useEffect`, so the served HTML was a
 * spinner: no title, no description, no body — a crawler saw an empty page for every
 * post, and the Article record below would have been injected after the fact for nobody.
 * Same pattern as the blog on olas.network.
 */
export const getServerSideProps: GetServerSideProps<PostProps> = async ({
  params,
}) => {
  const id = params?.id;
  if (typeof id !== 'string') return { notFound: true };

  const post = await getPost({ id });
  if (!post) return { notFound: true };

  return { props: { post } };
};

const Post = ({ post }: PostProps) => {
  // Same resolution the post card uses, so the record carries the image the page shows.
  const imageFormats = post.images?.[0]?.formats;
  const imagePath = imageFormats?.large?.url || imageFormats?.thumbnail?.url;
  const imageUrl = imagePath
    ? `${process.env.NEXT_PUBLIC_CMS_URL}${imagePath}`
    : undefined;

  const article = buildArticle({
    filename: post.filename,
    title: post.title,
    description: post.description,
    date: post.date,
    imageUrl,
  });

  return (
    <Layout>
      <Meta
        pageTitle={post.title}
        pageDesc={post.description}
        pageUrl={`post/${post.filename}`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(article) }}
      />
      <section className="pt-32 max-w-screen-lg mx-auto">
        <article className="md:py-12 sm:px-8 lg:px-20 md:border mb-12">
          <div className="max-sm:px-8 max-sm:border-b flex flex-col justify-center w-full">
            <div className="mb-4">
              {formatDate(post.date)} • {post.readtime} min read
            </div>
            <Markdown>{post.content}</Markdown>
          </div>
        </article>
        <div className="place-content-center mb-8">
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
