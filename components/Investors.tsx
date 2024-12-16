import Image from 'next/image';

const investors = [
  'true ventures logo.png',
  'signature ventures logo.png',
  'semantic logo.png',
  'prime block logo.png',
  'proof logo.png',
  'atka logo.png',
];

export const Investors = () => (
  <section id="investors" className="max-w-screen-xl mx-auto my-24">
    <h1 className="mb-8 md:mb-16 text-center">Investors</h1>
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
