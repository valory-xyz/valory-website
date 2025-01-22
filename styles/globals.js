import { TwitterTweetEmbed } from 'react-twitter-embed';

export const hoverClass = 'cursor-pointer duration-200 hover:text-valory-green';
export const TEXT_MEDIUM_CLASS = 'capitalise text-xl text-white';
export const labelClass =
  'mx-auto rounded-full border border-white/20 px-5 py-3 text-sm font-medium bg-white/10 w-fit transition duration-300 ease-in-out hover:bg-transparent hover:border-transparent';

export const markdownComponents = {
  a: ({ ...props }) => {
    const url = String(props.children);

    if (url.includes('youtube.com')) {
      const youtubeId = url.split('v=')[1]?.split('&')[0];
      const embedUrl = `https://www.youtube.com/embed/${youtubeId}`;
      return (
        <iframe
          src={embedUrl}
          width={560}
          height={315}
          allowFullScreen
          className="mx-auto max-sm:w-fit"
        />
      );
    }

    if (url.includes('x.com')) {
      const tweetId = url.split('status/')[1]?.split('?')[0];
      return <TwitterTweetEmbed tweetId={tweetId} />;
    }

    return <a className="text-purple-800 hover:text-blue-800" {...props} />;
  },
  p: ({ ...props }) => <span className="mb-4" {...props} />,
  strong: ({ ...props }) => <strong {...props}></strong>,
  ul: ({ ...props }) => (
    <ul className="list-disc list-inside ml-4 mb-4 inline-block" {...props} />
  ),
  ol: ({ ...props }) => (
    <ol className="list-decimal list-inside inline-block" {...props} />
  ),
  li: ({ ...props }) => <li className="mb-2" {...props} />,
  img: ({ ...props }) => {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        {...props}
        className="mx-auto max-w-full"
        alt={`Valory - ${props.alt}`}
      />
    );
  },
  h1: ({ ...props }) => <h1 className="text-3xl font-bold mb-4" {...props} />,
  h2: ({ ...props }) => (
    <h2 className="text-2xl font-semibold mb-3" {...props} />
  ),
  h3: ({ ...props }) => <h3 className="text-xl font-medium mb-2" {...props} />,
  h4: ({ ...props }) => <h4 className="text-lg font-medium mb-2" {...props} />,
  h5: ({ ...props }) => (
    <h5 className="text-[17px] font-medium mb-2" {...props} />
  ),
  h6: ({ ...props }) => <h6 className="text-sm font-medium mb-2" {...props} />,
  pre: ({ ...props }) => (
    <pre
      className="p-4 bg-gray-800 border rounded-md overflow-auto"
      {...props}
    />
  ),
  code: ({ ...props }) => <code className="text-sm" {...props} />,
};
