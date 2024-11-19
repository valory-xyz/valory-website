import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { hoverClass } from 'styles/globals';
import headerLinks from 'data/headerLinks.json';
import { useState } from 'react';

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <header className="bg-stone-200">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12 mr-6 xl:mr-12 p-4 max-xl:p-2">
            <Link className="block" href="/">
              <Image
                src="/images/header-logo.svg"
                alt="Valory"
                width={100}
                height={40}
              />
            </Link>
          </div>

          <div className="hidden lg:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 xl:gap-12 text-sm">
                {headerLinks.map((link, index) => (
                  <li key={index} className={hoverClass}>
                    {link.isExternal ? (
                      <a className={hoverClass} href={link.url} target="_blank">
                        {link.label}
                      </a>
                    ) : (
                      <Link className={hoverClass} href={link.url}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="drawer drawer-end w-fit block lg:hidden max-sm:order-last z-10">
            <input
              id="my-drawer-4"
              type="checkbox"
              className="drawer-toggle"
              checked={isDrawerOpen}
              onChange={toggleDrawer}
            />
            <div className="drawer-content">
              <label htmlFor="my-drawer-4" className="drawer-button">
                <Menu />
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay"
              />
              <div className="my-auto w-full pr-6 bg-black min-h-full w-full md:w-1/2 p-4 content-center">
                <X
                  onClick={toggleDrawer}
                  className="fixed top-4 right-4 text-valory-green cursor-pointer"
                  size={32}
                />

                <ul
                  tabIndex={0}
                  className="menu menu-sm w-full text-white place-items-end pr-8 gap-2"
                >
                  {headerLinks.map((link, index) => (
                    <li key={index}>
                      {link.isExternal ? (
                        <a
                          className={`text-lg tracking-wide ${hoverClass}`}
                          href={link.url}
                          target="_blank"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          className={`text-lg tracking-wide ${hoverClass}`}
                          href={link.url}
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>

                <Image
                  src="/images/logo.svg"
                  alt="Valory logo"
                  width={100}
                  height={100}
                  className="mx-auto mb-4"
                />
              </div>
            </div>
          </div>

          <div className="sm:flex sm:gap-4">
            <div className="hidden md:flex ml-6 xl:ml-12 p-4">
              <Link
                className="border-black border text-sm px-2 py-3 xl:py-3 xl:px-12 font-bold font-poppins transition duration-300 ease-in-out hover:bg-valory-green hover:border-transparent"
                href="#"
              >
                Get involved
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
