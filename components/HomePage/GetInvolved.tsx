import { labelClass, TEXT_MEDIUM_CLASS } from 'styles/globals';
import { SiteLink } from '../SiteLink';

export const GetInvolved = () => (
  <section
    id="get-involved"
    className="flex bg-[radial-gradient(circle_at_50%,#014212,black)] text-center text-white"
  >
    <div className="flex flex-col gap-4 max-w-[900px] mx-auto my-16 place-items-center max-sm:mx-8">
      <div className={TEXT_MEDIUM_CLASS}>GET INVOLVED</div>
      <h3 className="max-sm:text-2xl max-lg:text-3xl">
        Benefit from autonomous AI agent economies, incentivized by Olas
      </h3>
      <div className="flex flex-col gap-6 py-4">
        <div className={labelClass}>
          Bring synthetic users to your protocol, chain or app
        </div>
        <div className={labelClass}>
          Generate synthetic data to improve agent architectures & AI models
        </div>
      </div>
      <SiteLink
        text="Get funding now"
        href="mailto:sales@valory.xyz?subject=Get%20funding%20now"
        type="dark"
        isExternal={true}
      />
    </div>
  </section>
);
