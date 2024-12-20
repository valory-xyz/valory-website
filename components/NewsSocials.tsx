import { Link } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

const socials = [
  {
    shareTo: 'Facebook',
    imageUrl: 'fb.svg',
    action: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    shareTo: 'X',
    imageUrl: 'x.svg',
    action: (url: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
  },
  {
    shareTo: 'LinkedIn',
    imageUrl: 'linkedin.svg',
    action: (url: string) =>
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`,
  },
];

export const NewsSocials = () => {
  const { asPath } = useRouter();
  const currentUrl = `${window.location.origin}${asPath}`;
  const [copied, setCopied] = useState(false);

  const getLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Unable to copy to clipboard: ', error);
    }
  };

  return (
    <div className="flex flex-row gap-4 border-t pt-4 lg:pt-8 mt-4 lg:mt-8 mx-4">
      {socials.map((social) => (
        <a
          key={social.shareTo}
          href={social.action(currentUrl)}
          target="_blank"
          rel="noopener noreferrer"
          title={`Share via ${social.shareTo}`}
          className="aspect-square"
        >
          <Image
            src={`/images/${social.imageUrl}`}
            alt={`Share to ${social.shareTo}`}
            width={19}
            height={19}
            className="object-cover max-md:w-4"
          />
        </a>
      ))}
      <button onClick={getLink}>
        <Link size={19} className="max-md:w-4" />
        {copied && (
          <div className="fixed bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 z-50 bg-white shadow-lg text-sm">
            Copied to clipboard
          </div>
        )}
      </button>
    </div>
  );
};
