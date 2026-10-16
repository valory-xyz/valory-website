import qs from 'qs';

const API_URL = `${process.env.NEXT_PUBLIC_CMS_URL}/api`;

/**
 * Posts for a listing, newest first.
 *
 * Only the fields a card renders — `populate: '*'` also returned every post's full
 * markdown, and now that the listings render on the server that body would ship inside
 * the HTML: 340 kB of `__NEXT_DATA__` on /post for text no card shows.
 *
 * Failures are swallowed and logged, unlike `getPost` below: an empty news grid is a
 * worse page, but a missing list should not take down the page that carries it.
 */
export const getPosts = async ({ limit }: { limit: number }) => {
  try {
    const params = qs.stringify({
      sort: ['date:desc'],
      fields: ['filename', 'title', 'description', 'date', 'readtime'],
      // `formats` is one JSON column, so this is as narrow as the image gets.
      populate: { images: { fields: ['formats'] } },
      'pagination[limit]': limit,
    });
    const response = await fetch(`${API_URL}/posts?${params}`);
    if (!response.ok) throw new Error(`CMS responded ${response.status}`);
    const json = await response.json();
    return json?.data || [];
  } catch (error) {
    console.error('could not list posts:', error);
    return [];
  }
};

/**
 * One post by filename, or `null` when there is no such post.
 *
 * Fetch and HTTP failures are thrown rather than swallowed: the post page renders this
 * on the server, and a CMS outage must surface as a 500, not as a 404 for every post —
 * a 404 is what a crawler remembers.
 */
export const getPost = async ({ id }: { id: string }) => {
  const params = qs.stringify({
    populate: '*',
    filters: {
      filename: { $eq: id },
    },
  });
  const response = await fetch(`${API_URL}/posts?${params}`);
  if (!response.ok)
    throw new Error(`CMS responded ${response.status} for post ${id}`);
  const json = await response.json();
  return json?.data?.[0] ?? null;
};
