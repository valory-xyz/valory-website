import { SiteLink } from 'components/SiteLink';
import Image from 'next/image';
import academyMetrics from 'data/academyMetrics.json';
import { GetStaticProps } from 'next';

const academyTotals = academyMetrics.reduce(
  (acc, val) => {
    acc.participants += val.participants;
    acc.graduates += val.graduates;
    acc.placed += val.placed;
    acc.hired += val.hired;
    return acc;
  },
  {
    participants: 0,
    graduates: 0,
    placed: 0,
    hired: 0,
  },
);

const AcademyTable = () => {
  return (
    <div className="mb-8 overflow-x-auto">
      <table className="table-auto mx-auto divide-y divide-white/25 text-sm text-center">
        <tr className="whitespace-nowrap border-b-2 border-white/25">
          <th>Cohort</th>
          <th>Total Participants</th>
          <th>Graduates</th>
          <th>Placed with Projects</th>
          <th>Hired by Valory</th>
        </tr>
        {academyMetrics.map((val, index) => (
          <tr key={index}>
            <td className="font-bold">{index + 1}</td>
            <td>{val.participants}</td>
            <td>{val.graduates}</td>
            <td>{val.placed == 0 ? '-' : val.placed}</td>
            <td>{val.hired}</td>
          </tr>
        ))}
        <tr className="font-bold border-t-2 border-white/25">
          <td>Total</td>
          <td>{academyTotals.participants}</td>
          <td>{academyTotals.graduates}</td>
          <td>{academyTotals.placed}</td>
          <td>{academyTotals.hired}</td>
        </tr>
      </table>

      <p className="caption-bottom text-xs text-left mt-8">
        * Official project placements began with Cohort 7, marking a significant
        milestone in connecting developers with real-world opportunities.
      </p>
    </div>
  );
};

export const IntensiveProgram = () => (
  <section
    id="intensive-program"
    className="bg-[url('/images/academy/intensive-program.png')] bg-no-repeat bg-cover text-white"
  >
    <div className="text-lg max-w-[740px] mx-auto py-20 flex flex-col gap-3 max-md:mx-6 max-lg:mx-12">
      <Image
        src="/images/academy/laptop.png"
        alt="Academy"
        width={160}
        height={100}
        className="mb-6"
      />
      <p className="font-medium text-base text-[#ffffff99]">Olas Dev Academy</p>
      <span className="font-bold text-2xl">Intensive Program</span>
      <p className="mb-6">
        Our invite-only 4-week intensive program is designed for experienced
        Python developers who are ready to learn agent creation on the Olas
        Stack. This full-time program offers hands-on training and direct
        support from the Olas development team, allowing you to gain a
        comprehensive understanding of the Olas Stack.
        <br />
        Participation is by invite only, ensuring a focused and committed group
        of learners. If you meet the requirements and are interested in this
        opportunity, show your interest by filling out the form.
      </p>
      <span className="font-bold text-[#ffffff99]">What you get out of it</span>
      <ul className="list-disc gap-y-2 flex flex-col ml-7 mb-8">
        <li>How to run, build and deploy your own agents.</li>
        <li>
          How to build your own{' '}
          <a
            className="font-bold text-valory-green"
            href="http://olas.network/learn "
            target="_blank"
          >
            autonomous service ↗
          </a>
          .
        </li>
        <li>
          Academy graduates will be matched with external projects looking for
          builders to build agents for them, while receiving personalized,
          expert coaching from the creators of the framework.
        </li>
      </ul>
      <span className="font-bold text-[#ffffff99]">Who this is for</span>
      <ul className="list-disc gap-y-2 flex flex-col ml-7 mb-8">
        <li>Experienced Python developer.</li>
        <li>Able to commit full-time for 4 weeks.</li>
      </ul>
      <span className="font-bold text-[#ffffff99]">
        A Track Record of Success
      </span>
      <p>
        Since its inception, the Academy has consistently delivered impactful
        results. Here&apos;s a snapshot of our accomplishments:
      </p>
      <p>Key Metrics by Cohort</p>
      <AcademyTable />
      <SiteLink
        text="Show your interest"
        href="https://forms.gle/GnPABVfd9t7URFyZ6"
        isExternal={true}
        customClass="text-lg max-md:w-full max-md:text-center font-medium border-valory-green bg-valory-green text-black hover:text-white hover:border-black hover:bg-black px-8 py-2"
      />
    </div>
  </section>
);

export const getStaticProps: GetStaticProps = async () => {
  // The data is already imported above, so no additional fetching is necessary
  return {
    props: {
      academyMetrics, // Pass the imported data as a prop
    },
  };
};
