import { getPosts } from 'components/common-util/api';
import React, { useState, useEffect } from 'react';
import { Post } from './Post';
import { Spinner } from 'components/Spinner';

export type Article = {
  filename: string;
  date: string;
  readtime: number;
  title: string;
  description: string;
  content: string;
};

export const News = ({
  limit = 100,
  isMainPage = false,
  showDescriptions = true,
}: {
  limit?: number;
  isMainPage?: boolean;
  showDescriptions?: boolean;
}) => {
  const [posts, setPosts] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const fetchPosts = async () => {
        const data = await getPosts({ limit });
        setPosts(data);
        setLoading(false);
      };

      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  }, [limit]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className={`h-full max-w-screen-2xl px-8 xl:mx-auto`}>
      {isMainPage && <p className="text-lg my-6 max-sm:ml-4">All Posts</p>}
      <div
        className={`grid gap-8 md:grid-cols-2 ${limit === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}
      >
        {(limit ? posts.slice(0, limit) : posts).map(
          (article: Article, index: number) => (
            <Post
              key={index}
              article={article}
              showDescription={showDescriptions}
            />
          ),
        )}
      </div>
    </section>
  );
};
