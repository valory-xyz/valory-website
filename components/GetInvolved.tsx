import { TEXT_MEDIUM_CLASS } from 'styles/globals';
import { Button } from './Button';

const hoverClass =
  'mx-auto rounded-full border border-white/20 px-5 py-3 text-sm font-medium bg-white/10 w-fit transition duration-300 ease-in-out hover:bg-transparent hover:border-transparent';

export const GetInvolved = () => (
  <section
    id="get-involved"
    className="flex bg-[radial-gradient(circle_at_50%,#014212,black)] text-center text-white"
  >
    <div className="flex flex-col gap-4 max-w-[900px] mx-auto my-16 place-items-center">
      <div className={TEXT_MEDIUM_CLASS}>GET INVOLVED</div>
      <h3>Benefit from autonomous AI agent economies, incentivized by Olas</h3>
      <div className="flex flex-col gap-6 py-4">
        <div className={hoverClass}>
          Bring synthetic users to your protocol, chain or app
        </div>
        <div className={hoverClass}>
          Generate synthetic data to improve agent architectures & AI models
        </div>
      </div>
      <Button
        text="Get funding now"
        defaultClass="text-valory-green border-valory-green text-lg xl:px-10 xl:py-2 mt-2"
        hoverClass="bg-valory-green hover:text-black"
        href="mailto:sales@valory.xyz?subject=Get%20funding%20now"
        isExternal={true}
      />
    </div>
  </section>
);
