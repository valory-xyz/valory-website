import { TEXT_MEDIUM_CLASS } from 'styles/globals';
import { SiteLink } from '../SiteLink';

const hoverClass =
  'mx-auto rounded-full border border-white/20 px-5 py-3 text-sm font-medium bg-white/10 w-fit transition duration-300 ease-in-out hover:bg-transparent hover:border-transparent';

export const GetInvolved = () => (
  <section
    id="get-involved"
    className="flex bg-[radial-gradient(circle_at_50%,#014212,black)] text-center text-white"
  >
    <div className="flex flex-col gap-4 max-w-[900px] mx-auto my-16 place-items-center max-sm:mx-8">
      <div className={TEXT_MEDIUM_CLASS}>GET INVOLVED</div>
      <h3 className="max-sm:text-2xl">
        Benefit from autonomous AI agent economies, incentivized by Olas
      </h3>
      <div className="flex flex-col gap-6 py-4">
        <div className={hoverClass}>
          Bring synthetic users to your protocol, chain or app
        </div>
        <div className={hoverClass}>
          Generate synthetic data to improve agent architectures & AI models
        </div>
      </div>
      <SiteLink
        text="Get funding now"
        customClass="text-valory-green bg-valory-green/5 border-valory-green text-lg lg:px-8 lg:py-2 mt-2"
        href="mailto:sales@valory.xyz?subject=Get%20funding%20now"
        type="primary"
        isExternal={true}
      />
    </div>
  </section>
);