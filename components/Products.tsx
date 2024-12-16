import { TEXT_MEDIUM_CLASS } from 'styles/globals';
import { SiteLink } from './SiteLink';

const products = [
  {
    title: 'Propel',
    desc: 'The fastest way to get a decentralized autonomous agent to market. \n A subscription service blending human and software services, to suit any organization size.',
  },
  {
    title: 'Olas Protocol',
    desc: 'The permissionless blockchain protocol for registering, running and securing open-source, decentralized and ownable autonomous agents.',
    href: 'https://olas.network/protocol',
  },
  {
    title: 'Olas Stack',
    desc: 'Open-source framework for developing decentralized and ownable autonomous agents.',
    href: 'https://olas.network/stack',
  },
];

export const Products = () => (
  <section className="bg-[radial-gradient(circle_at_75%_100%,green,20%,black)]">
    <div className="flex flex-col place-items-center bg-[url('/images/products-bg.png')]">
      <div className={`${TEXT_MEDIUM_CLASS} mt-16 mb-8`}>PRODUCTS</div>
      <div className="flex flex-row justify-evenly w-full mb-16">
        {products.map((product) => (
          <div
            key={product.title}
            className="flex flex-col gap-8 max-w-[380px]"
          >
            <h3 className="text-valory-green">{product.title}</h3>
            <p className="text-lg text-white leading-7">{product.desc}</p>
            {product.href ? (
              <SiteLink
                text="Learn more"
                customClass="mx-0 w-fit"
                href={product.href}
                isExternal={true}
                type="product"
              />
            ) : (
              <div
                className="text-white bg-neutral-600 opacity-60 px-2 py-3 whitespace-nowrap italic cursor-default w-fit"
              >
                Coming soon...
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);
