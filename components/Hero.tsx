import { Button } from './Button';

export const Hero = () => (
  <section className="flex bg-[url('/images/hero-bg.jpg')] bg-center min-h-[500px] h-[calc(100vh-90px)] bg-cover place-items-center">
    <div className="flex flex-col gap-8 mx-auto text-center max-w-[600px]">
      <h1 className="text-7xl font-machina leading-snug">
        Architecting Autonomy
      </h1>
      <h3 className="text-2xl max-w-[400px] mx-auto">
        Creating open-source frameworks for co-owned AI
      </h3>
      <Button
        text="Get involved"
        href="#get-involved"
        defaultClass="bg-black text-valory-green text-xl max-w-[280px] mt-16"
        hoverClass="bg-valory-green hover:text-black"
      />
    </div>
  </section>
);
