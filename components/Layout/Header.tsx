import Link from 'next/link';

export const Header = () => (
  <header className="bg-stone-200">
    <div className="mx-auto max-w-screen-2xl">
      <div className="flex h-24 items-center justify-between">
        <div className="ml-12 p-4 md:flex md:items-center md:gap-12">
          <Link className="block" href="/">
            <span className="sr-only">Home</span>
            Valory logo
          </Link>
        </div>

        <div className="md:block">
          <nav aria-label="Global">
            <ul className="flex items-center gap-12 text-sm">
              <li>
                <a className="transition hover:text-valory-green" href="#">
                  {' '}
                  Mission Statement{' '}
                </a>
              </li>

              <li>
                <a className="transition hover:text-valory-green" href="#">
                  {' '}
                  Get involved{' '}
                </a>
              </li>

              <li>
                <a className="transition hover:text-valory-green" href="#">
                  {' '}
                  Products{' '}
                </a>
              </li>

              <li>
                <a className="transition hover:text-valory-green" href="#">
                  {' '}
                  News{' '}
                </a>
              </li>

              <li>
                <a className="transition hover:text-valory-green" href="#">
                  {' '}
                  Newsletter{' '}
                </a>
              </li>

              <li>
                <a className="transition hover:text-valory-green" href="#">
                  {' '}
                  Research{' '}
                </a>
              </li>

              <li>
                <a className="transition hover:text-valory-green" href="#">
                  {' '}
                  Team{' '}
                </a>
              </li>

              <li>
                <a className="transition hover:text-valory-green" href="#">
                  {' '}
                  Investors{' '}
                </a>
              </li>

              <li>
                <a className="transition hover:text-valory-green" href="#">
                  {' '}
                  Career{' '}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mr-12 p-4 sm:flex items-center sm:gap-4">
          <div>
            <a
              className="border-black border py-3 px-12 text-sm font-medium transition duration-300 ease-in-out hover:bg-valory-green hover:border-transparent"
              href="#"
            >
              Get involved
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
);
