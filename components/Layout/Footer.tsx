const hoverClass: string = 'hover:text-neutral-700 cursor-pointer duration-200';

export const Footer = () => (
  <footer className="footer grid grid-cols-3 grid-rows-3 gap-0 bg-black text-white p-10">
    <div className="row-start-2">
      <p className="text-5xl">Valory</p>
    </div>
    <div className="col-start-2 flex flex-cols gap-8">
      <a className={hoverClass}>Mission Statement</a>
      <a className={hoverClass}>Get involved</a>
      <details className="dropdown">
        <summary className={hoverClass}>More</summary>
        <ul className="dropdown-content p-4 bg-white bg-opacity-20 rounded-md space-y-2 mt-2">
          <li>
            <a className={hoverClass} href="#">
              Products
            </a>
          </li>
          <li>
            <a className={hoverClass} href="#">
              News
            </a>
          </li>
          <li>
            <a className={hoverClass} href="#">
              Newsletter
            </a>
          </li>
          <li>
            <a className={hoverClass} href="#">
              Research
            </a>
          </li>
          <li>
            <a className={hoverClass} href="#">
              Team
            </a>
          </li>
          <li>
            <a className={hoverClass} href="#">
              Investors
            </a>
          </li>
          <li>
            <a className={hoverClass} href="#">
              Careers
            </a>
          </li>
        </ul>
      </details>
    </div>
    <div className="col-start-2 flex flex-cols gap-8">
      <p>
        Valory AG
        <br />
        Gubelstrasse 12
        <br />
        6300 Zug
        <br />
        Switzerland
      </p>
    </div>
    <div className="col-start-3 flex flex-cols gap-8">
      <span>X icon</span>
      <span>LinkedIn icon</span>
    </div>
    <div className="col-start-3 gap-4">
      <p>© 2021-2024 Valory AG</p>
      <p>
        <a className="link" href="#">
          Privacy Policy
        </a>{' '}
        ·{' '}
        <a className="link" href="#">
          Terms
        </a>{' '}
        ·{' '}
        <a className="link" href="#">
          Press Kit
        </a>
      </p>
    </div>
  </footer>
);
