import Head from 'next/head';

const SITE_TITLE = 'Architecting Autonomy';
const SITE_DESCRIPTION =
  'A world-class team leading cutting-edge research & development at the intersection of multi-agent systems and distributed ledger technology.';
// const SITE_URL = 'https://www.valory.xyz';

export const Meta = () => {
  return (
    <Head>
      <title>{SITE_TITLE}</title>

      <meta name="title" content={SITE_TITLE} />
      <meta name="description" content={SITE_DESCRIPTION} />

      {/* <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:title" content={SITE_TITLE} />
      <meta
        property="og:description"
        content={SITE_DESCRIPTION}
      />
      <meta property="og:image" content={SITE_DEFAULT_IMAGE_URL} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={SITE_URL} />
      <meta property="twitter:title" content={SITE_TITLE} />
      <meta
        property="twitter:description"
        content={SITE_DESCRIPTION}
      />
      <meta property="twitter:image" content={SITE_DEFAULT_IMAGE_URL} /> */}
    </Head>
  );
};
