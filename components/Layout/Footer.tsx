import Image from 'next/image';
import Link from 'next/link';
import { hoverClass } from 'styles/globals';
import headerLinks from 'data/headerLinks.json';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer = () => (
  <footer className="footer bg-black">
    <div className="grid grid-cols-3 grid-rows-2 max-sm:grid-cols-1 gap-x-8 text-white my-10 max-w-screen-2xl xl:w-[1400px] mx-auto">
      <div className="md:row-span-2 flex-flex-row ">
        <Image
          src="/images/logo.svg"
          alt="logo"
          width={70}
          height={70}
          className="mb-2"
        />
        <span className="text-5xl font-machina">Valory</span>
      </div>

      <div className="md:col-start-2 flex lg:flex-row flex-col gap-x-8">
        <Link className={hoverClass} href="#mission-statement">
          Mission Statement
        </Link>
        <Link className={hoverClass} href="#get-involved">
          Get involved
        </Link>

        <div className="dropdown">
          <div tabIndex={0} role="button" className={`flex ${hoverClass}`}>
            More
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content bg-base-100 rounded-md mt-3 space-y-1 p-3 shadow"
          >
            {headerLinks.slice(2).map((link, index) => (
              <li key={index}>
                {link.isExternal ? (
                  <a
                    href={link.url}
                    className={`${hoverClass} text-black`}
                    target="_blank"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.url} className={`${hoverClass} text-black`}>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="md:col-start-3 md:row-start-1 flex flex-cols gap-8">
        <a
          href="https://x.com/valoryag"
          className=""
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/footer/x.svg"
            alt="Valory X"
            width={20}
            height={20}
          />
        </a>
        <a
          href="https://www.linkedin.com/company/valoryag/"
          className=""
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/footer/linkedin.svg"
            alt="Valory LinkedIn"
            width={20}
            height={20}
          />
        </a>
      </div>

      <div className="md:col-start-2 flex flex-cols gap-8">
        <span>
          Valory AG
          <br />
          Gubelstrasse 12
          <br />
          6300 Zug
          <br />
          Switzerland
        </span>
      </div>

      <div className="md:col-start-3 gap-4">
        {`© 2021-${CURRENT_YEAR} Valory AG`}
        <div>
          <Link className={`link ${hoverClass}`} href="/privacy">
            Privacy Policy
          </Link>{' '}
          ·{' '}
          <Link className={`link ${hoverClass}`} href="/terms">
            Terms
          </Link>{' '}
          ·{' '}
          <a
            className={`link ${hoverClass}`}
            href="https://github.com/valory-xyz/press-kit-valory"
            target="_blank"
          >
            Press Kit
          </a>
        </div>
      </div>
    </div>
  </footer>
);
