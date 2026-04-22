import type { NextApiRequest, NextApiResponse } from 'next';
import qs from 'qs';

import { isBlockedRegion } from '../../../utils/regionBlock';

const MAX_LIMIT = 100;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (isBlockedRegion(req.headers['x-vercel-ip-region'])) {
    return res.status(451).json({ error: 'Unavailable in your region' });
  }

  const limitParam = Array.isArray(req.query.limit)
    ? req.query.limit[0]
    : req.query.limit;
  const parsedLimit = Number(limitParam);
  if (!Number.isInteger(parsedLimit) || parsedLimit <= 0) {
    return res.status(400).json({ error: 'Invalid limit' });
  }
  const limit = Math.min(parsedLimit, MAX_LIMIT);

  const params = qs.stringify({
    sort: ['date:desc'],
    populate: '*',
    'pagination[limit]': limit,
  });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/posts?${params}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.CMS_API_KEY}`,
        },
      },
    );
    if (!response.ok) {
      console.error(`CMS responded with ${response.status}`);
      return res.status(502).json({ error: 'CMS request failed' });
    }
    const json = await response.json();
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=300',
    );
    res.setHeader('Vary', 'x-vercel-ip-region');
    return res.status(200).json(json);
  } catch (error) {
    console.error(error);
    return res.status(502).json({ error: 'CMS request failed' });
  }
}
