export const getPosts = async ({ limit }: { limit: number }) => {
  try {
    const response = await fetch(`/api/posts?limit=${limit}`);
    const json = await response.json();
    return json?.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getPost = async ({ id }: { id: string }) => {
  try {
    const response = await fetch(`/api/posts/${encodeURIComponent(id)}`);
    const json = await response.json();
    return json?.data?.[0] ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
