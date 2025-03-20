import { SiteLink } from '../SiteLink';

export const Hero = () => (
  <section className="flex bg-[url('/images/hero-bg.jpg')] bg-center bg-fixed min-h-[500px] h-[100vh] bg-cover place-items-center">
    <div className="flex flex-col gap-8 mx-auto text-center md:max-w-[600px]">
      <h2 className="big-heading max-md:text-4xl max-lg:text-5xl">
        Architecting Autonomy
      </h2>
      <span className="text-lg md:text-2xl max-w-[400px] mx-auto">
        Creating open-source frameworks for co-owned AI
      </span>
      <SiteLink
        text="Get involved"
        href="#get-involved"
        customClass="max-w-[280px] px-20 py-5 mt-16 mx-auto"
        isExternal={false}
        type="primary"
      />
    </div>
  </section>
);
