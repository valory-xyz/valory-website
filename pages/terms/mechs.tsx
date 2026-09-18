import { Layout } from 'components/Layout';
import { Meta } from 'components/Meta';
import { PdfContent } from 'components/pdfContent';

const MechsTermsPage = () => (
  <Layout>
    <Meta
      pageTitle="Mech Terms and Conditions"
      pageDesc="Read the Terms and Conditions governing the use of Valory's Mechs."
      pageUrl="terms/mechs"
    />
    <section className="max-w-screen-lg mx-auto mb-10 pt-32">
      <h2 className="big-heading mb-4 text-xl">Mech Terms and Conditions</h2>
      <PdfContent id="mech-terms" />
    </section>
  </Layout>
);

export default MechsTermsPage;
