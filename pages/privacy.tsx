import { Layout } from 'components/Layout';
import { Meta } from 'components/Meta';
import { PdfContent } from 'components/pdfContent';

const PrivacyPage = () => (
  <Layout>
    <Meta />
    <section className="max-w-screen-lg mx-auto mb-10 pt-32">
      <PdfContent id="privacy" />
    </section>
  </Layout>
);

export default PrivacyPage;
