import qs from 'qs';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const apiCall = async ({ params }: { params: Record<string, unknown> }) => {
  const stringifyParams = qs.stringify(params);

  try {
    const url = `${URL}/posts${params ? '?' : ''}${stringifyParams}`;
    // const url = `${URL}/posts`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }

  return null;
};

export const getPosts = async ({ limit }: { limit: number }) => {
  const params = {
    sort: ['date:desc'],
    populate: '*',
    'pagination[limit]': limit,
  };

  const json = await apiCall({ params });
  const data = json && json.data ? json.data : [];
  return data;
};

export const getPost = async ({
  id,
}: {
  id: string | string[] | undefined;
}) => {
  const params = {
    populate: '*',
    filters: {
      filename: { $eq: id },
    },
  };

  const json = await apiCall({ params });
  const data = json && json.data ? json.data : [];
  return data[0];
};
