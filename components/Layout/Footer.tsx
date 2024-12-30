import Image from 'next/image';
import Link from 'next/link';
import { hoverClass } from 'styles/globals';
import headerLinks from 'data/headerLinks.json';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer = () => (
  <footer className="footer bg-black">
    <div className="flex flex-col text-white my-10 max-w-screen-2xl xl:w-[1400px] w-full max-xl:px-8 mx-auto">
      <div className="flex flex-row max-sm:flex-col gap-8 justify-between w-full">
        <div className="flex-flex-row xl:max-w-[150px]">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={70}
            height={70}
            className="mb-2 object-contain"
          />
          <span className="text-5xl font-machina">Valory</span>

          <div className="flex flex-cols gap-4 mt-6 max-md:mb-6">
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
        </div>

        <div className="flex lg:flex-row flex-col max-sm:mx-0 lg:gap-6 xl:gap-12 mx-auto">
          {headerLinks.map((link, index) =>
            link.isExternal ? (
              <a
                key={index}
                href={link.url}
                className={`${hoverClass} whitespace-nowrap`}
                target="_blank"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={index}
                href={link.url}
                className={`${hoverClass} xl:whitespace-nowrap`}
              >
                {link.label}
              </Link>
            ),
          )}
        </div>

        <div className="flex flex-col xl:w-[245px] gap-8 max-md:mt-2 md:text-end">
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
      </div>

      <div className=" gap-4 mx-auto text-center mt-12 lg:mt-auto">
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
