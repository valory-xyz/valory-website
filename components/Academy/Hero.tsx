import { SiteLink } from 'components/SiteLink';
import { labelClass } from 'styles/globals';

export const Hero = () => (
  <section className="bg-[url('/images/academy/hero.png')] bg-center bg-fixed min-h-[500px] h-[100vh] bg-cover place-content-center">
    <div className="flex flex-col gap-8 mx-auto text-center text-white max-md:mx-6">
      <div className={labelClass}>Olas Dev Academy</div>
      <h3 className="max-md:text-3xl max-lg:text-4xl">
        Become an Olas agent Builder
      </h3>
      <span className="text-lg">Learn to build autonomous AI agents</span>
      <SiteLink
        text="Explore paths"
        href="#paths"
        type="dark"
        customClass="mx-auto"
        isExternal={false}
      />
    </div>
  </section>
);
