import { TEXT_MEDIUM_CLASS } from 'styles/globals';
import { SiteLink } from '../SiteLink';
import products from 'data/products.json';

export const Products = () => (
  <section
    id="products"
    className="bg-[radial-gradient(circle_at_75%_100%,green,20%,black)]"
  >
    <div className="flex flex-col place-items-center bg-[url('/images/products-bg.png')]">
      <div className={`${TEXT_MEDIUM_CLASS} mt-16 mb-8`}>PRODUCTS</div>
      <div className="flex flex-col md:flex-row justify-evenly w-full mb-16 max-w-screen-2xl max-lg:px-8">
        {products.map((product) => (
          <div
            key={product.title}
            className="flex flex-col max-sm:mx-auto gap-8 md:max-w-[210px] lg:max-w-[300px] xl:max-w-[380px] max-md:mb-8"
          >
            <h3 className="text-valory-green max-lg:text-3xl">
              {product.title}
            </h3>
            <p className="text-lg text-white leading-7">{product.desc}</p>
            {product.href ? (
              <SiteLink
                text={
                  product.btnText
                    ? product.btnText
                    : `Learn about ${product.title}`
                }
                customClass="w-fit"
                href={product.href}
                isExternal={true}
                type="product"
              />
            ) : (
              <div className="text-neutral-300 bg-neutral-600 px-2 py-3 whitespace-nowrap italic cursor-default w-fit">
                Coming soon...
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);
