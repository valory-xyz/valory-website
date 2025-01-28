import Link from 'next/link';
import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react';

import { getPost } from 'utils/api';
import { formatDate } from 'utils/formatDate';
import { News } from 'components/Content/News';
import { Spinner } from 'components/Spinner';
import { Layout } from 'components/Layout';
import { Meta } from 'components/Meta';
import { Markdown } from 'components/Markdown';
import { Article } from 'types/Article';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Article>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id || typeof id !== 'string') return;

    const fetchPost = async () => {
      try {
        const data = await getPost({ id });
        setPost(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <Spinner />;

  if (!post)
    return <div className="mx-auto text-center">Post does not exist</div>;

  return (
    <Layout>
      <Meta
        pageTitle={post.title}
        pageDesc={post.description}
        pageUrl={`post/${post.filename}`}
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
