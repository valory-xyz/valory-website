import Head from 'next/head';

const SITE_TITLE = 'Architecting Autonomy';
const SITE_DESCRIPTION =
  'A world-class team leading cutting-edge research & development at the intersection of multi-agent systems and distributed ledger technology.';
const SITE_URL = 'https://www.valory.xyz';
const SITE_DEFAULT_IMAGE_URL = `${SITE_URL}/images/meta-tag.jpg`;

export const Meta = ({
  pageTitle,
  pageDesc,
  pageUrl,
}: {
  pageTitle?: string;
  pageDesc?: string;
  pageUrl?: string | string[];
}) => {
  const title = pageTitle ? `${pageTitle} | ${SITE_TITLE}` : SITE_TITLE;
  let url = SITE_URL;
  if (pageUrl) {
    url = `${SITE_URL}/${pageUrl}`;
  }

  return (
    <Head>
      <title>{title}</title>

      <meta name="title" content={title} />
      <meta name="description" content={pageDesc || SITE_DESCRIPTION} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={pageDesc || SITE_DESCRIPTION} />
      <meta property="og:image" content={SITE_DEFAULT_IMAGE_URL} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={SITE_URL} />
      <meta property="twitter:title" content={title} />
      <meta
        property="twitter:description"
        content={pageDesc || SITE_DESCRIPTION}
      />
      <meta property="twitter:image" content={SITE_DEFAULT_IMAGE_URL} />
    </Head>
  );
};
