import { GetInvolved } from 'components/GetInvolved';
import { Hero } from 'components/Hero';
import { Investors } from 'components/Investors';
import { Layout } from 'components/Layout';
import { Meta } from 'components/Meta';
import { MissionStatement } from 'components/MissionStatement';
import { Products } from 'components/Products';
import { Team } from 'components/Team';

export default function Home() {
  return (
    <Layout>
      <Meta />
      <Hero />
      <MissionStatement />
      <GetInvolved />
      <Products />
      <Team />
      <Investors />
    </Layout>
  );
}
