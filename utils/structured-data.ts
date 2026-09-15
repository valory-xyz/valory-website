/**
 * The JSON-LD blocks valory.xyz publishes. Each is built from the data the page renders —
 * the CMS post record, the site constants — never a hand-typed copy, so a block cannot say
 * something the page does not. Invisible: nothing users read changes.
 */

export const SITE_URL = 'https://www.valory.xyz';

const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: 'Valory',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.svg`,
  description:
    'A world-class team leading cutting-edge research & development at the intersection of multi-agent systems and distributed ledger technology.',
  sameAs: [
    'https://x.com/valoryag',
    'https://www.linkedin.com/company/valoryag/',
    'https://github.com/valory-xyz',
  ],
};

/** ISO 8601 or nothing — an unparseable date is worse than no date. */
const isoDate = (value?: string | null) => {
  if (!value) return undefined;
  const time = Date.parse(value);
  return Number.isFinite(time) ? new Date(time).toISOString() : undefined;
};

export const buildArticle = ({
  filename,
  title,
  description,
  date,
  imageUrl,
}: {
  filename: string;
  title: string;
  description?: string;
  date?: string;
  imageUrl?: string;
}) => {
  const published = isoDate(date);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: `${SITE_URL}/post/${filename}`,
    headline: title,
    ...(description ? { description } : {}),
    ...(published ? { datePublished: published } : {}),
    ...(imageUrl ? { image: imageUrl } : {}),
    // The CMS carries no per-post author; posts are published under the organisation.
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
  };
};

/** `<` is escaped so a `</script>` inside a string cannot close the tag early. */
export const serializeJsonLd = (data: unknown): string =>
  JSON.stringify(data).replace(/</g, '\\u003c');
