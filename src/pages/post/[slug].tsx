import { GetStaticPaths, GetStaticProps } from 'next';
import { MainLayout } from '@/components/layout/Main';
import { IPost } from '@/typings/schema.types';
import Image from 'next/image';

import { getPostBySlug, getPosts } from 'services';
import { ParsedUrlQuery } from 'querystring';
import { RichText } from '@graphcms/rich-text-react-renderer';

import 'twin.macro';
import { Author } from '@/components/author';

export default function BlogPost({ post }: Props) {
  return (
    <MainLayout>
      <main tw="relative m-1 shadow sm:w-full sm:max-w-3xl rounded-md bg-secondary">
        <Article post={post} />
      </main>
    </MainLayout>
  );
}
function Article({ post }: Props) {
  const {
    title,
    coverImage: { url },
    content: { raw },
    publishedAt,
    author: {
      name,
      picture: { url: authorImage }
    }
  } = post;

  return (
    <article tw="text-white" itemScope itemType="http://schema.org/Article">
      <header tw="overflow-hidden">
        <figure tw="w-full h-72 relative overflow-hidden rounded-t-md ">
          <Image src={url} layout="fill" objectFit="cover" />
          <figcaption>hello world</figcaption>
        </figure>
        <div tw="p-6 mb-6">
          <Author
            name={name}
            image={authorImage}
            imageSize="lg"
            time={publishedAt}
          />
        </div>

        <h1 itemProp="headline" tw="pr-6 pl-6 text-3xl font-bold">
          {title}
        </h1>
      </header>
      <section
        itemProp="articleBody"
        id="blog-content"
        tw="p-5 font-family['-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif']"
      >
        <RichText content={raw} />
      </section>
    </article>
  );
}

type Props = {
  post: IPost;
};

interface IParams extends ParsedUrlQuery {
  slug: string;
}
export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  const { post } = await getPostBySlug(slug);
  return {
    props: {
      post
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = await getPosts();
  const paths = posts.map(({ slug }: IPost) => ({ params: { slug } }));

  return {
    paths: paths,
    fallback: 'blocking'
  };
};
