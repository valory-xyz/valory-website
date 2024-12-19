import { TEXT_MEDIUM_CLASS } from 'styles/globals';
import { SiteLink } from './SiteLink';
import products from 'data/products.json';

export const Products = () => (
  <section id="products" className="bg-custom-gradient">
    <div className="flex flex-col place-items-center bg-[url('/images/products-bg.png')]">
      <div className={`${TEXT_MEDIUM_CLASS} mt-16 mb-8`}>PRODUCTS</div>
      <div className="flex flex-col max-sm:gap-16 md:flex-row justify-evenly w-full mb-16 max-w-screen-2xl max-md:px-8">
        {products.map((product) => (
          <div
            key={product.title}
            className="flex flex-col max-sm:mx-auto gap-8 md:max-w-[210px] xl:max-w-[380px]"
          >
            <h3 className="text-valory-green max-sm:text-3xl">
              {product.title}
            </h3>
            <p className="text-lg text-white leading-7">{product.desc}</p>
            {product.href ? (
              <SiteLink
                text="Learn more"
                customClass="w-fit"
                href={product.href}
                isExternal={true}
                type="product"
              />
            ) : (
              <div className="text-white bg-neutral-600 opacity-60 px-2 py-3 whitespace-nowrap italic cursor-default w-fit">
                Coming soon...
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);
