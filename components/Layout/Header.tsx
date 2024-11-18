import Link from 'next/link';

export const Header = () => (
  <header className="bg-stone-200">
  <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-24 items-center justify-between">
      <div className="md:flex md:items-center md:gap-12 mr-6 xl:mr-12 p-4">
      <Link className="block" href="/">
        Valory logo
      </Link>
      </div>

      <div className="hidden lg:block">
        <nav aria-label="Global">
          <ul className="flex items-center gap-8 xl:gap-12 text-sm">
          <li>
            <Link className="transition hover:text-valory-green" href="#">
              {' '}
              Mission Statement{' '}
            </Link>
          </li>

          <li>
            <Link className="transition hover:text-valory-green" href="#">
              {' '}
              Get involved{' '}
            </Link>
          </li>

          <li>
            <Link className="transition hover:text-valory-green" href="#">
              {' '}
              Products{' '}
            </Link>
          </li>

          <li>
            <Link className="transition hover:text-valory-green max-xl:hidden" href="#">
              {' '}
              News{' '}
            </Link>
          </li>

          <li>
            <Link className="transition hover:text-valory-green max-xl:hidden" href="#">
              {' '}
              Newsletter{' '}
            </Link>
          </li>

          <li>
            <Link className="transition hover:text-valory-green max-xl:hidden" href="#">
              {' '}
              Research{' '}
            </Link>
          </li>

          <li>
            <Link className="transition hover:text-valory-green max-xl:hidden" href="#">
              {' '}
              Team{' '}
            </Link>
          </li>

          <li>
            <Link className="transition hover:text-valory-green max-xl:hidden" href="#">
              {' '}
              Investors{' '}
            </Link>
          </li>

          <li>
            <a className="transition hover:text-valory-green max-xl:hidden" href="#">
              {' '}
              Career{' '}
            </a>
          </li>
          
          <details className="dropdown">
            <summary className="flex transition hover:text-valory-green max-md:hidden xl:hidden">
              More
            </summary>

            <ul className="dropdown-content p-4 bg-white rounded-md space-y-2 mt-2">
                <li>
            <Link className="transition hover:text-valory-green" href="#">
              {' '}
              News{' '}
            </Link>
          </li>

          <li>
            <Link className="transition hover:text-valory-green" href="#">
              {' '}
              Newsletter{' '}
            </Link>
          </li>

          <li>
            <Link className="transition hover:text-valory-green" href="#">
              {' '}
              Research{' '}
            </Link>
          </li>

          <li>
            <Link className="transition hover:text-valory-green" href="#">
              {' '}
              Team{' '}
            </Link>
          </li>

          <li>
            <Link className="transition hover:text-valory-green" href="#">
              {' '}
              Investors{' '}
            </Link>
          </li>

          <li>
            <a className="transition hover:text-valory-green" href="#">
              {' '}
              Career{' '}
            </a>
          </li>
              </ul>
          </details>

          </ul>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="sm:flex sm:gap-4">

          <div className="hidden lg:flex ml-6 xl:ml-12 p-4">
          <Link
          className="border-black border py-3 px-12 text-sm font-medium transition duration-300 ease-in-out hover:bg-valory-green hover:border-transparent"
          href="#"
        >
          Get involved
        </Link>
          </div>
        </div>

        <div className="block lg:hidden">
          <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</header>
);
