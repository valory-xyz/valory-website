import qs from 'qs';

const API_URL = `${process.env.NEXT_PUBLIC_CMS_URL}/api`;

export const getPosts = async ({ limit }: { limit: number }) => {
  try {
    const params = qs.stringify({
      sort: ['date:desc'],
      populate: '*',
      'pagination[limit]': limit,
    });
    const response = await fetch(`${API_URL}/posts?${params}`);
    const json = await response.json();
    return json?.data || [];
  } catch (error) {
    console.error(error);
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
