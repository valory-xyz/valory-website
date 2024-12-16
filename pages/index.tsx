import { GetInvolved } from 'components/GetInvolved';
import { Hero } from 'components/Hero';
import { Layout } from 'components/Layout';
import { Meta } from 'components/Meta';
import { MissionStatement } from 'components/MissionStatement';
import { Products } from 'components/Products';

export default function Home() {
  return (
    <Layout>
      <Meta />
      <Hero />
      <MissionStatement />
      <GetInvolved />
      <Products />
    </Layout>
  );
}
