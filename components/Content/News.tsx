import { Post } from './Post';

export const News = ({
  limit,
  isMainPage = false,
}: {
  limit?: number;
  isMainPage?: boolean;
}) => {
  const blogItems = [];

  return (
    <section className="h-full mx-20">
      {isMainPage && <p className="text-lg my-6">All Posts</p>}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* {(limit ? blogItems.slice(0, limit) : blogItems).map((blogItem) => ( */}
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        {/* ))} */}
      </div>
    </section>
  );
};
