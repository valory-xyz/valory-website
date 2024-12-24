import { SiteLink } from 'components/SiteLink';
import Image from 'next/image';

export const Paths = () => (
  <section className="bg-slate-100" id="paths">
    <div className="text-center pt-24 pb-16 max-md:mx-6">
      <h4 className="mb-6 max-md:text-3xl max-lg:text-4xl">
        Find the right path for your Builder journey
      </h4>
      <span className="text-lg">
        Answer these quick questions to discover which learning path is right
        for you.
      </span>
    </div>
    <Image
      src="/images/academy/find-paths.png"
      alt="Academy"
      width={1512}
      height={609}
      className="mx-auto"
    />
    <div className=" flex flex-col gap-3 max-w-[728px] mx-auto py-16 text-lg max-md:mx-6 max-lg:mx-12">
      <h4 className="mb-6 max-md:text-3xl max-lg:text-4xl">
        Olas Dev Kickstart
      </h4>

      <span className="text-2xl font-bold">
        Build a Mech Tool for a Chance to Start Earning Dev Rewards
      </span>
      <p className="mb-6">
        Get exposure and hands-on experience to Olas Stack by building Mech
        tools with our Dev Kickstart workshop. Follow our guided tutorials on
        YouTube and start building today. Join the Discord community to connect
        with other developers and get support.
      </p>

      <span className="text-slate-600 font-bold">What you get out of it</span>
      <p className="mb-6">
        By following this workshop, you&apos;ll have a working mech tool and a
        chance to start earning dev rewards in the Olas ecosystem. To learn more
        about dev rewards, check out{' '}
        <a
          className="underline"
          href="https://build.olas.network/paths/prediction-agents-mechs-ai-tool"
          target="_blank"
        >
          this guide ↗
        </a>{' '}
        and{' '}
        <a
          className="underline"
          href="https://x.com/autonolas/status/1787895934451597563"
          target="_blank"
        >
          this thread ↗
        </a>
        .
      </p>
      <span className="text-slate-600 font-bold">Who this is for</span>
      <ul className="list-disc ml-7 gap-y-2 flex flex-col mb-8">
        <li>Builders with Python Knowledge.</li>
        <li>Builders with a basic understanding of blockchain.</li>
        <li>Builders familiar with IPFS.</li>
      </ul>

      <div className="flex max-md:flex-col max-md:text-center gap-6">
        <SiteLink
          text="Start building Mech tools today"
          href="https://www.youtube.com/watch?v=r6oxG4I6IEI&list=PLXztsZv11CTcE0-zbe-SpnhmAl-Od4PaD"
          isExternal={true}
          type="secondary"
          customClass="text-lg max-md:whitespace-normal max-md:w-full text-white bg-black hover:text-black font-medium px-8"
        />
        <SiteLink
          text="Join Discord for support"
          href="https://discord.gg/heKp5j3pk3"
          isExternal={true}
          type="secondary"
          customClass="text-lg max-md:w-full font-medium px-8"
        />
      </div>
    </div>
  </section>
);
