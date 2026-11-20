import Image from 'next/image';
import { SiteLink } from '../SiteLink';

export const GetInvolved = () => (
  <section
    id="get-involved"
    className="flex min-h-[558px] items-center justify-center bg-[radial-gradient(circle_at_50%,#014212,black)] text-center text-white max-sm:min-h-[590px]"
  >
    <div className="flex flex-col gap-4 max-w-[900px] mx-auto my-16 place-items-center max-sm:mx-8">
      <Image
        src="/images/onchainbench-logo.svg"
        alt="OnchainBench"
        width={228}
        height={28}
        className="mb-2 h-7 w-auto max-md:h-6"
      />
      <h3 className="text-balance max-sm:text-2xl max-lg:text-3xl">
        Can you trust an agent
        <br /> with your keys?
      </h3>
      <p className="mb-4 text-2xl text-white/85 max-md:text-lg">
        The benchmark for agents in crypto
      </p>
      <SiteLink
        text="See the leaderboard"
        href="https://onchainbench.ai"
        type="dark"
        isExternal={true}
      />
    </div>
  </section>
);
