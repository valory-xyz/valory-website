import { getPosts } from 'components/api';
import React, { useState, useEffect } from 'react';
import { Post } from './Post';
import { Spinner } from 'components/Spinner';
import { Article } from 'components/Article';

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
    const fetchPosts = async () => {
      try {
        const data = await getPosts({ limit });
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
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
