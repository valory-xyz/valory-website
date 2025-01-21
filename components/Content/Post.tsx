import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { Article } from './News';

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const currentYear = new Date().getFullYear();

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  };

  const newDate = new Intl.DateTimeFormat('en-US', options).format(date);

  return date.getFullYear() === currentYear ? newDate.slice(0, -5) : newDate;
};

export const Post = ({
  article,
  showDescription,
}: {
  article: Article;
  showDescription?: boolean;
}) => {
  const image = useMemo(() => {
    const imageData = article?.images?.[0];

    if (imageData) {
      return `${process.env.NEXT_PUBLIC_API_URL}${imageData.formats.large.url}`;
    }

    return `/images/news/default.jpg`;
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
