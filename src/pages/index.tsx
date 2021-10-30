import tw, { styled, TwStyle } from 'twin.macro';
import Layout from '@/components/Layout';
import sanity from "@/lib/sanityClient";
import { Post } from "../typings/schema.types";
import { GetServerSideProps } from 'next';
import PostCard from "@/components/post/card"

const Container = styled.div`
  ${tw`absolute inset-0 w-full h-screen flex flex-col justify-center items-center`}
`;



interface Props{
  posts: Post[];

}
const IndexPage = ({posts}:Props) => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <Container>

        <article>
        {posts.map(({ _id, title, mainImage, description, publishedAt, slug }) =>
          <PostCard
            key={_id}
            title={title}
            description={description}
            publishedAt={publishedAt}
            mainImage={mainImage}
            slug={slug?.current}
          />
        )}
        </article>
      </Container>
    </Layout>
  );
};

export default IndexPage;
const query = `*[_type == "post"] {
  _id,
  title,
  mainImage,
  publishedAt,
  slug
}`;
export const getServerSideProps:GetServerSideProps= async () => {
  const posts:Post = await sanity.fetch(query)
  return {
    props:{posts}
  }
}




// const linkStyles: Record<string, TwStyle> = {
//   red: tw`text-red-500 hover:text-red-700`,
//   yellow: tw`text-yellow-500 hover:text-yellow-700`,
//   green: tw`text-green-500 hover:text-green-700`,
//   blue: tw`text-blue-500 hover:text-blue-700`,
//   indigo: tw`text-indigo-500 hover:text-indigo-700`,
//   purple: tw`text-purple-500 hover:text-purple-700`
// };
// const LinkStyled = styled.a(({ color }) => [
//   tw`block md:inline font-semibold transition-colors duration-300`,
//   color && linkStyles[color]
// ]);
