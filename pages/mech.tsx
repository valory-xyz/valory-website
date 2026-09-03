import { Layout } from 'components/Layout';
import { Meta } from 'components/Meta';

const MechPage = () => (
  <Layout>
    <Meta
      pageTitle="Mech Page"
      pageDesc="Learn more about our available mechs and how they work."
      pageUrl="mech"
    />
    <section className="max-w-screen-lg mx-auto mb-10 pt-32">Mech page</section>
  </Layout>
);

export default MechPage;
