import { GetInvolved } from 'components/HomePage/GetInvolved';
import { Hero } from 'components/HomePage/Hero';
import { Investors } from 'components/HomePage/Investors';
import { LatestNews } from 'components/HomePage/LatestNews';
import { MissionStatement } from 'components/HomePage/MissionStatement';
import { Products } from 'components/HomePage/Products';
import { Research } from 'components/HomePage/Research';
import { Team } from 'components/HomePage/Team';
import { Layout } from 'components/Layout';
import { Meta } from 'components/Meta';

export default function Home() {
  return (
    <Layout>
      <Meta />
      <Hero />
      <MissionStatement />
      <GetInvolved />
      <Products />
      <LatestNews />
      <Research />
      <Team />
      <Investors />
    </Layout>
  );
}
