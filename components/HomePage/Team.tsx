import team from 'data/team.json';
import Image from 'next/image';

const SLICE_INDEX = 4;

export const Team = () => {
  const founders = team.slice(0, SLICE_INDEX);
  const teamMembers = [...team.slice(SLICE_INDEX)].sort((a, b) =>
    a.name[0].toLowerCase().localeCompare(b.name[0].toLowerCase()),
  );

  const sortedTeam = [...founders, ...teamMembers];

  return (
    <section id="team" className="bg-[#cddecc]">
      <div className="py-8 px-8 md:px-20 max-w-screen-2xl mx-auto">
        <h1 className="max-md:text-4xl max-lg:text-5xl text-center mb-8">
          Team
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {sortedTeam.map((member) => {
            const imageSrc = member.imageSrc
              ? `/images/team/${member.imageSrc}`
              : '/images/team/no-photo.jpg';

            return (
              <div
                key={member.name}
                className="flex flex-col gap-4 mx-auto font-helvetica text-sm w-full max-w-[280px] md:max-w-[300px] xl:max-w-[380px]"
              >
                <Image
                  src={imageSrc}
                  alt={`Valory - ${member.name}`}
                  width={380}
                  height={530}
                  className="object-fill aspect-[38/53] w-full"
                />
                <div>
                  <p className="text-2xl font-machina">{member.name}</p>
                  <p>{member.position}</p>
                </div>
                <p>{member.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
