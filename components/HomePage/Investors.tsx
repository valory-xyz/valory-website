import Image from 'next/image';
import investors from 'data/investors.json';

export const Investors = () => (
  <section id="investors" className="max-w-screen-xl mx-auto my-24">
    <h1 className="mb-8 md:mb-16 text-center max-md:text-4xl max-lg:text-5xl">
      Investors
    </h1>
    <div className="grid md:grid-cols-3 gap-4 max-md:mx-12">
      {investors.map((logo, index) => (
        <Image
          key={index}
          src={`/images/investors/${logo}`}
          alt="Valory"
          width={300}
          height={100}
          className="mx-auto my-2"
        />
      ))}
    </div>
  </section>
);
