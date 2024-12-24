export const WhatIsOlasDevAcademy = () => (
  <section id="what-is-olas-academy" className="flex bg-black text-white">
    <div className="bg-[url('/images/academy/olas-dev-academy.png')] bg-no-repeat bg-cover w-full bg-right max-lg:bg-left">
      <div className="text-lg max-w-[740px] mx-auto py-20 flex flex-col gap-3 max-md:mx-6 max-lg:mx-12">
        <h4 className="mb-6 max-md:text-3xl max-lg:text-4xl">
          Olas Dev Academy
        </h4>
        <span className="font-bold text-2xl">What is the Olas Dev Academy</span>
        <p>
          The Olas Dev Academy is your gateway to learning how to build with the{' '}
          <a
            className="font-bold text-valory-green"
            href="https://olas.network/stack"
            target="_blank"
          >
            Olas Stack ↗
          </a>
          . Whether you are an experienced Python developer looking for an
          intensive learning experience, or someone who prefers to learn at your
          own pace, we have the right path for you. Choose between our
          invite-only intensive program or self-paced YouTube training, and
          start building autonomous AI agents today.
        </p>
      </div>
    </div>
  </section>
);
