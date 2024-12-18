import Link from 'next/link';

const primaryClass =
  'bg-black text-valory-green text-xl hover:bg-valory-green hover:text-black';

const secondaryClass =
  'border-black text-sm font-bold hover:bg-valory-green hover:border-transparent';

// const productClass =
//   '';

export const SiteLink = ({
  text,
  customClass,
  href,
  isExternal,
  type,
}: {
  text: string;
  customClass: string;
  href: string;
  isExternal: boolean;
  type: string;
}) => {
  const fullClassName = `
        mx-auto 
        px-2 
        py-3 
        border 
        whitespace-nowrap 
        transition 
        duration-300 
        ease-in-out 
        cursor-pointer
        ${type === 'primary' && primaryClass}
        ${type === 'secondary' && secondaryClass}
    `;

  if (isExternal) {
    return (
      <a
        className={`${fullClassName} ${customClass}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </a>
    );
  }

  return (
    <Link className={`${fullClassName} ${customClass}`} href={href}>
      {text}
    </Link>
  );
};
