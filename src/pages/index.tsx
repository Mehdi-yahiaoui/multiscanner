import 'twin.macro';
import sanity from '@/lib/sanityClient';
import { Post } from '../typings/schema.types';
import { GetServerSideProps } from 'next';
import PostCard from '@/components/post/card';
import { MainLayout } from '@/components/layout/Main';
import 'twin.macro';

interface Props {
  posts: Post[];
}
const Home = ({ posts }: Props) => {
  return (
    <MainLayout>
      <div tw="mt-4 flex items-center  flex-col px-2 sm:px-0.5 space-y-6 ">
        {posts.map(
          ({ _id, title, mainImage, description, publishedAt, slug }) => (
            <PostCard
              key={_id}
              title={title}
              description={description}
              publishedAt={publishedAt}
              mainImage={mainImage}
              slug={slug?.current}
            />
          )
        )}
      </div>
    </MainLayout>
  );
};

export default Home;

const query = `*[_type == "post"] {
  _id,
  title,
  mainImage,
  publishedAt,
  description,
  slug
}`;
export const getServerSideProps: GetServerSideProps = async () => {
  const posts: Post = await sanity.fetch(query);
  return {
    props: { posts }
  };
};
