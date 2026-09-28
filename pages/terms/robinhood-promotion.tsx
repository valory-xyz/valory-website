import { Layout } from 'components/Layout';
import { Meta } from 'components/Meta';
import { PdfContent } from 'components/pdfContent';

const RobinhoodPromotionTermsPage = () => (
  <Layout>
    <Meta
      pageTitle="Robinhood Promotion Terms and Conditions"
      pageDesc="Read the Terms and Conditions governing the Robinhood promotion."
      pageUrl="terms/robinhood-promotion"
    />
    <section className="max-w-screen-lg mx-auto mb-10 pt-32">
      <h2 className="big-heading mb-4 text-xl">
        Robinhood Promotion Terms and Conditions
      </h2>
      <PdfContent id="robinhood-promotion" />
    </section>
  </Layout>
);

export default RobinhoodPromotionTermsPage;
