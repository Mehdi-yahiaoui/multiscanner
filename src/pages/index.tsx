import { GetStaticProps } from 'next';
import PostCard from '@/components/post/card';
import { MainLayout } from '@/components/layout/Main';
import { getPosts } from 'services';
import { TPosts } from '@/typings/schema.types';
import 'twin.macro';

const Home = ({ posts }: Props) => {
  return (
    <MainLayout>
      <div tw="mt-4 flex items-center  flex-col px-2 sm:px-0.5 space-y-6 ">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </MainLayout>
  );
};

export default Home;

type Props = {
  posts: TPosts[];
};

export const getStaticProps: GetStaticProps = async () => {
  const { posts } = (await getPosts()) || [];
  return {
    props: { posts }
  };
};
