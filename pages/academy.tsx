import { Hero } from 'components/Academy/Hero';
import { IntensiveProgram } from 'components/Academy/IntensiveProgram';
import { LearnAtYourOwnPace } from 'components/Academy/LearnAtYourOwnPace';
import { Paths } from 'components/Academy/Paths';
import { WhatIsOlasDevAcademy } from 'components/Academy/WhatIsOlasDevAcademy';
import { Layout } from 'components/Layout';
import { Meta } from 'components/Meta';

const AcademyPage = () => (
  <Layout>
    <Meta
      pageTitle="Academy"
      pageDesc="Learn more about our Dev Academy program and become an Olas agent Builder!"
      pageUrl="academy"
    />
    <Hero />
    <Paths />
    <WhatIsOlasDevAcademy />
    <IntensiveProgram />
    <LearnAtYourOwnPace />
  </Layout>
);

export default AcademyPage;
