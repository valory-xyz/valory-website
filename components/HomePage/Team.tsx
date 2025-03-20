import team from 'data/team.json';
import Image from 'next/image';

export const Team = () => {
  const founders = team.slice(0, 3);
  const teamMembers = [...team.slice(3)].sort((a, b) =>
    a.name[0].toLowerCase().localeCompare(b.name[0].toLowerCase()),
  );

  const sortedTeam = [...founders, ...teamMembers];

  return (
    <section id="team" className="bg-[#cddecc]">
      <div className="max-w-screen-2xl mx-auto">
        <h2 className="big-heading pt-10 text-center max-md:text-4xl max-lg:text-5xl">
          Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 overflow-auto flex-wrap gap-x-8 xl:gap-x-16 px-12">
          {sortedTeam.map((member, index) => {
            let finalClass = '';

            if (team.length % 2 !== 0 && index == team.length - 1) {
              finalClass = 'md:row-span-1';
            }

            return (
              <div
                key={member.name}
                className={`flex flex-col max-w-[280px] md:max-w-[300px] xl:max-w-[380px] my-8 mx-auto ${finalClass}`}
              >
                <Image
                  src={
                    member.imageSrc
                      ? `/images/team/${member.imageSrc}`
                      : `/images/team/no-photo.jpg`
                  }
                  alt={`Valory - ${member.name}`}
                  width={380}
                  height={530}
                  className="mb-4"
                />
                <p className="text-2xl font-machina">{member.name}</p>
                <p className={member.desc ? 'mb-4' : ''}>{member.position}</p>
                <p>{member.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
