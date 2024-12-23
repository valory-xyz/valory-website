import { Layout } from 'components/Layout';
import { Meta } from 'components/Meta';
import { PdfContent } from 'components/pdfContent';

const PrivacyPage = () => (
  <Layout>
    <Meta
      pageTitle="Privacy Policy"
      pageDesc="Review our Privacy Policy to see how we handle your personal data and ensure your privacy rights are respected."
      pageUrl="privacy"
    />
    <section className="max-w-screen-lg mx-auto mb-10 pt-32">
      <PdfContent id="privacy" />
    </section>
  </Layout>
);

export default PrivacyPage;
