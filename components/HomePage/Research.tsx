import research from 'data/research.json';
import Image from 'next/image';
import { SiteLink } from '../SiteLink';

export const Research = () => (
  <section id="research" className="bg-neutral-200">
    <div className="py-8 px-8 md:px-20 max-w-screen-2xl mx-auto">
      <h1 className="max-md:text-4xl max-lg:text-5xl mb-8">Research</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {research.map((paper) => (
          <div
            key={paper.title}
            className="flex flex-col gap-4 mx-auto font-helvetica"
          >
            <Image
              src={`/images/research/${paper.imageSrc}`}
              alt="Valory"
              width={400}
              height={557}
              className="object-fill aspect-[400/557] max-lg:mx-auto"
            />
            <p className="text-xl font-machina">{paper.title}</p>
            <p className="text-sm">{paper.authors}</p>
            {paper.desc && <p className="text-sm">{paper.desc}</p>}
            <SiteLink
              text="Read Paper"
              customClass="px-14 font-bold w-fit"
              href={paper.linkUrl}
              isExternal={true}
              type="secondary"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);
