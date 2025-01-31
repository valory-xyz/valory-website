import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

import { formatDate } from 'utils/formatDate';
import { Article } from 'types/Article';

export const Post = ({
  article,
  showDescription,
}: {
  article: Article;
  showDescription?: boolean;
}) => {
  const image = useMemo(() => {
    const imageData = article?.images?.[0].formats;

    const largeUrl = imageData?.large?.url;
    const backupUrl = imageData?.thumbnail?.url;

    return imageData
      ? `${process.env.NEXT_PUBLIC_API_URL}${largeUrl || backupUrl}`
      : `/images/default.jpg`;
  }, [article]);

  return (
    <Link href={`/post/${article.filename}`}>
      <article className="overflow-hidden shadow transition hover:shadow-lg h-full">
        <div className="w-full h-[170px] overflow-hidden">
          <Image
            alt={`Valory - ${article.title}`}
            src={image}
            width={296}
            height={222}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="bg-white p-4 sm:p-6">
          <span className="text-xs font-avenir">
            {formatDate(article.date)} • {article.readtime} min read
          </span>

          <h3 className="mt-0.5 text-lg text-gray-900">{article.title}</h3>

          {showDescription && (
            <p className="mt-2 line-clamp-3 text-sm/relaxed">
              {article.description}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
};
