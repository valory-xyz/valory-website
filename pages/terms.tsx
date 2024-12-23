import { Layout } from 'components/Layout';
import { Meta } from 'components/Meta';
import { PdfContent } from 'components/pdfContent';

const TermsPage = () => (
  <Layout>
    <Meta
      pageTitle="Terms and Conditions"
      pageDesc="Read our Terms and Conditions to learn about your legal rights, obligations, and the terms of service for using our website and services."
      pageUrl="terms"
    />
    <section className="max-w-screen-lg mx-auto mb-10 pt-32">
      <PdfContent id="terms" />
    </section>
  </Layout>
);

export default TermsPage;
