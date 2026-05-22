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

export const getPost = async ({ id }: { id: string }) => {
  try {
    const params = qs.stringify({
      populate: '*',
      filters: {
        filename: { $eq: id },
      },
    });
    const response = await fetch(`${API_URL}/posts?${params}`);
    const json = await response.json();
    return json?.data?.[0] ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
