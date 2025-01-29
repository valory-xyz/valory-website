import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import headerLinks from 'data/headerLinks.json';
import { hoverClass } from 'styles/globals';
import { SiteLink } from 'components/SiteLink';

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <div className="drawer">
      <input
        id="menu-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={toggleDrawer}
      />

      <div className="drawer-content flex flex-col z-0">
        <header className="bg-stone-200 fixed top-0 left-0 w-full z-50">
          <div className="max-w-screen-2xl xl:w-[1400px] flex h-24 items-center justify-between max-xl:max-w-[970px] mx-auto max-lg:mx-8">
            <div className="md:flex md:items-center md:gap-12 xl:mr-12 xl:p-2">
              <Link className="block" href="/">
                <Image
                  src="/images/header-logo.svg"
                  alt="Valory"
                  width={100}
                  height={40}
                />
              </Link>
            </div>
            <div className="hidden lg:flex w-full justify-center">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 xl:gap-12 text-sm">
                  {headerLinks.map((link, index) => (
                    <li
                      key={index}
                      className={`${hoverClass} w-min whitespace-nowrap`}
                    >
                      {link.isExternal ? (
                        <a
                          className={hoverClass}
                          href={link.url}
                          target="_blank"
                        >
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

            <div className="hidden md:flex xl:ml-12 xl:p-2 order-last">
              <SiteLink
                text="Get involved"
                customClass="xl:py-3 xl:px-12 font-medium text-sm"
                href="#get-involved"
                isExternal={false}
                type="secondary"
              />
            </div>

            <div className="lg:hidden max-md:order-2 z-100">
              <label
                htmlFor="menu-drawer"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <Menu className="inline-block h-6 w-6 stroke-current" />
              </label>
            </div>
          </div>
        </header>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="menu-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <ul className="menu bg-black text-white min-h-full w-80 p-4 absolute z-100">
          <X
            className="mb-12 ml-auto text-valory-green"
            onClick={toggleDrawer}
          />
          {headerLinks.map((link, index) => (
            <li key={index} className={`${hoverClass}`}>
              {link.isExternal ? (
                <a href={link.url} target="_blank" className={hoverClass}>
                  {link.label}
                </a>
              ) : (
                <Link href={link.url} className={hoverClass}>
                  {link.label}
                </Link>
              )}
            </li>
          ))}

          <li>
            <Link href="#get-involved" className={`md:hidden ${hoverClass}`}>
              Get involved
            </Link>
          </li>

          <Image
            src="/images/logo.svg"
            alt="Valory logo"
            width={100}
            height={100}
            className="mx-auto mt-12"
          />
        </ul>
      </div>
    </div>
  );
};
