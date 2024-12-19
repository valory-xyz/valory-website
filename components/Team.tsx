import team from 'data/team.json';
import Image from 'next/image';

export const Team = () => (
  <section id="team" className="bg-[#cddecc]">
    <div className="max-w-screen-2xl mx-auto">
      <h1 className="pt-10 text-center max-sm:text-5xl">Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 overflow-auto flex-wrap gap-x-8 xl:gap-x-16 px-12">
        {team.map((member) => {
          return (
            <div
              key={member.name}
              className="flex flex-col max-w-[280px] md:max-w-[300px] xl:max-w-[380px] my-8 mx-auto"
            >
              <Image
                src={
                  member.imageSrc
                    ? `/images/team/${member.imageSrc}`
                    : `/images/team/no-photo.jpg`
                }
                alt="Valory"
                width={380}
                height={530}
                className="mb-4"
                quality={90}
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
