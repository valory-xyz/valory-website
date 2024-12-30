import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import ReactPlayer from 'react-player';

interface Article {
  fileName: string;
  youtubeId?: string;
  title: string;
  date: string;
  readTime: number;
  description: string;
}

export const Post = ({
  article,
  showDescription,
}: {
  article: Article;
  showDescription?: boolean;
}) => {
  const [imgSrc, setImgSrc] = useState(`/images/news/${article.fileName}.jpg`);

  const handleImageError = () => {
    setImgSrc(`/images/news/${article.fileName}.png`);
  };

  return (
    <Link href={`/post/${article.fileName}`}>
      <article className="overflow-hidden shadow transition hover:shadow-lg h-full">
        <div className="w-full h-[170px] overflow-hidden">
          {article.youtubeId ? (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${article.youtubeId}`}
              width="100%"
              height="100%"
              light={`https://img.youtube.com/vi/${article.youtubeId}/hqdefault.jpg`}
            />
          ) : (
            <Image
              alt={`Valory - ${article.title}`}
              src={imgSrc}
              width={296}
              height={222}
              className="object-cover w-full h-full"
              onError={handleImageError}
            />
          )}
        </div>

        <div className="bg-white p-4 sm:p-6">
          <span className="text-xs font-avenir">
            {article.date} • {article.readTime} min read
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
