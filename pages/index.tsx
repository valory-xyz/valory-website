import type { GetStaticProps } from 'next';

import { getPosts } from 'utils/api';
import { GetInvolved } from 'components/HomePage/GetInvolved';
import { Hero } from 'components/HomePage/Hero';
import { Investors } from 'components/HomePage/Investors';
import { LatestNews } from 'components/HomePage/LatestNews';
import { MissionStatement } from 'components/HomePage/MissionStatement';
import { Products } from 'components/HomePage/Products';
import { Research } from 'components/HomePage/Research';
import { Team } from 'components/HomePage/Team';
import { Layout } from 'components/Layout';
import { Meta } from 'components/Meta';
import { Article } from 'types/Article';

type HomeProps = { posts: Article[] };

const LATEST_POSTS = 10;

/** See `pages/post/index.tsx`: the news grid has to reach a crawler as real links. */
export const getStaticProps: GetStaticProps<HomeProps> = async () => ({
  props: { posts: await getPosts({ limit: LATEST_POSTS }) },
  revalidate: 300,
});

export default function Home({ posts }: HomeProps) {
  return (
    <Layout>
      <Meta pageTitle="Valory" />
      <Hero />
      <MissionStatement />
      <GetInvolved />
      <Products />
      <LatestNews posts={posts} />
      <Research />
      <Team />
      <Investors />
    </Layout>
  );
}
