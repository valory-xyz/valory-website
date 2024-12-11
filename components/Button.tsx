import Link from 'next/link';
import PropTypes from 'prop-types';

export const Button = ({
  text,
  defaultClass,
  hoverClass,
  href,
  isExternal,
}: {
  text: string;
  defaultClass: string;
  hoverClass: string;
  href: string;
  isExternal: boolean;
}) => {
  const buttonClass =
    'mx-auto px-2 py-3 border whitespace-nowrap transition duration-300 ease-in-out hover:';

  if (isExternal) {
    return (
      <a
        className={`${buttonClass}${hoverClass} ${defaultClass}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </a>
    );
  }

  return (
    <Link className={`${buttonClass}${hoverClass} ${defaultClass}`} href={href}>
      {text}
    </Link>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  defaultClass: PropTypes.string,
  hoverClass: PropTypes.string,
  href: PropTypes.string,
  isExternal: PropTypes.bool,
};

Button.defaultProps = {
  text: null,
  defaultClass: '',
  hoverClass: '',
  href: '',
  isExternal: false,
};
