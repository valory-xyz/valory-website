import Link from 'next/link';
import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react';

import { Layout } from 'components/Layout';
import { Meta } from 'components/Meta';
import { getPost } from 'components/common-util/api';
import { Article, News } from 'components/Content/News';
import { Spinner } from 'components/Spinner';
import { formatDate } from 'components/Content/Post';
import { Markdown } from 'components/common-util/Markdown';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Article>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;
    if (typeof id === 'string') {
      const fetchPost = async () => {
        try {
          const data = await getPost({ id });
          setPost(data);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      };

      fetchPost();
    }
  }, [id]);

  if (!post || loading) return <Spinner />;

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
