import Link from 'next/link';
import { useState } from 'react';
import { hoverClass, headerLinks } from 'styles/globals';


export const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
const toggleMobileMenu = () => {
  setShowMobileMenu(!showMobileMenu);
}

return(

  <header className="bg-stone-200">
  <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-24 items-center justify-between">
      <div className="md:flex md:items-center md:gap-12 mr-6 xl:mr-12 p-4 max-xl:p-2">
      <Link className="block" href="/">
        Valory logo
      </Link>
      </div>

      <div className="hidden lg:block">
        <nav aria-label="Global">
          <ul className="flex items-center gap-6 xl:gap-12 text-sm">
            {headerLinks.map((link, index) => (
              <li key={index} className={hoverClass}>
                {link.isExternal ? (
                  <a className={hoverClass} href={link.url} target="_blank">
                    {' '}{link.label}{' '}
                  </a>
                ) : (
                  <Link className={hoverClass} href={link.url}>
                    {' '}{link.label}{' '}
                  </Link>
                ) }
              </li>
            ))}
            </ul>
          </nav>
            </div>
          
      <div className="flex items-center gap-4">
        <div className="sm:flex sm:gap-4">

          <div className="hidden lg:flex ml-6 xl:ml-12 p-4">
          <Link
          className="border-black border py-3 px-12 text-sm max-xl:px-6 max-xl:py-1 font-medium transition duration-300 ease-in-out hover:bg-valory-green hover:border-transparent"
          href="#"
        >
          Get involved
        </Link>
          </div>
        </div>

        <div className="dropdown dropdown-end block lg:hidden">
          <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75" onClick={toggleMobileMenu}>
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
          {showMobileMenu && (
            <div className="dropdown">
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-md z-[1] mt-3 w-52 p-2 shadow">
              {headerLinks.map((link,index) => (
                <li key={index}>
                  {link.isExternal ? (
                    <a className={hoverClass} href={link.url} target="_blank">
                      {link.label}
                    </a>
                  ):(
                    <Link className={hoverClass} href={link.url}>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          )}
        </div>
      </div>
    </div>
  </div>
</header>
)};
