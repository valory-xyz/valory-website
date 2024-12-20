import { Post } from './Post';
import posts from 'data/posts.json';

const normalizeDate = (dateString: string): Date => {
  const today = new Date();
  const hasYear = dateString.includes(',');

  if (!hasYear) {
    const currentYear = today.getFullYear();
    return new Date(`${dateString}, ${currentYear}`);
  }

  return new Date(dateString);
};

export const News = ({
  limit,
  isMainPage = false,
  showDescriptions = true,
}: {
  limit?: number;
  isMainPage?: boolean;
  showDescriptions?: boolean;
}) => {
  const sortedPosts = posts
  .map((post) => ({
    ...post,
    readTime: parseInt(post.readTime, 10),
  }))
  .sort((a, b) => {
    const dateA = normalizeDate(a.date);
    const dateB = normalizeDate(b.date);

    return dateB.getTime() - dateA.getTime();
  });

  return (
    <section className={`h-full max-w-screen-2xl px-8 xl:mx-auto`}>
      {isMainPage && <p className="text-lg my-6 max-sm:ml-4">All Posts</p>}
      <div
        className={`grid gap-8 md:grid-cols-2 ${limit == 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}
      >
        {(limit ? sortedPosts.slice(0, limit) : sortedPosts).map(
          (article, index) => (
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
