import Link from "next/link";

const hoverClass: string = 'flex hover:text-neutral-700 cursor-pointer duration-200';

export const Footer = () => (
  <footer className="footer bg-black">
    <div className="grid grid-cols-3 grid-rows-3 max-sm:grid-cols-1 gap-x-8 text-white p-10 max-w-screen-2xl xl:w-[1400px] mx-auto">
    <div className="md:row-start-2">
      <span className="text-5xl">Valory</span>
    </div>

    <div className="md:col-start-2 flex lg:flex-row flex-col gap-x-8">
      <Link className={hoverClass} href="#">Mission Statement</Link>
      <Link className={hoverClass} href="#">Get involved</Link>

      <details className="dropdown">
        <summary className={hoverClass}>More</summary>
        <ul className="dropdown-content p-4 bg-white rounded-md space-y-2 mt-2">
          <li>
            <Link className={`${hoverClass} text-black`} href="#">
              Products
            </Link>
          </li>
          <li>
            <Link className={`${hoverClass} text-black`} href="#">
              News
            </Link>
          </li>
          <li>
            <Link className={`${hoverClass} text-black`} href="#">
              Newsletter
            </Link>
          </li>
          <li>
            <a className={`${hoverClass} text-black`} href="#">
              Research
            </a>
          </li>
          <li>
            <Link className={`${hoverClass} text-black`} href="#">
              Team
            </Link>
          </li>
          <li>
            <Link className={`${hoverClass} text-black`} href="#">
              Investors
            </Link>
          </li>
          <li>
            <a className={`${hoverClass} text-black`} href="#">
              Careers
            </a>
          </li>
        </ul>
      </details>
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
    <div className="md:col-start-3 md:row-start-1 flex flex-cols gap-8">
      <span>X icon</span>
      <span>LinkedIn icon</span>
    </div>
    <div className="md:col-start-3 gap-4">
      <span>© 2021-2024 Valory AG</span>
      <div>
        <Link className="link" href="#">
          Privacy Policy
        </Link>{' '}
        ·{' '}
        <Link className="link" href="#">
          Terms
        </Link>{' '}
        ·{' '}
        <a className="link" href="#">
          Press Kit
        </a>
      </div>
    </div>
    </div>
  </footer>
);
