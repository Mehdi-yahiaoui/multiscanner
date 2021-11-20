import { Post } from '@/typings/schema.types';
import sanity from '@/lib/sanityClient';
import { GetServerSideProps, GetStaticPaths } from 'next';
import { postQuery, postSlugsQuery } from '@/lib/queries';
import { buildImage } from '@/lib/imageBuilder.sanity';
import BlockContent from '@sanity/block-content-to-react';
import { MainLayout } from '@/components/layout/Main';
import Link from 'next/link';
import Image from 'next/image';
import I18nProvider from 'next-translate/I18nProvider'
import useTrasnlation from "next-translate/useTranslation"
import "twin.macro"

interface Props {
  post: Post;
}
export default function BlogPost({ post }: Props) {
  const { lang } = useTrasnlation();
  return (
    <MainLayout>
      <I18nProvider lang={lang}>
        <div
        tw="mt-10"
        ></div>
      <Article post={post} />
    </I18nProvider>
    </MainLayout>
  );
}
function Article({ post }:Props) {
  const {body, mainImage, title, } = post

  return (

     <article tw="relative w-96 rounded-md bg-secondary" >
      <header >
        <figure>
          {/* @ts-ignore */}
          <Image
            src={buildImage(mainImage!.asset._ref).width(400).height(300).url()}
            height="300"
            width="400"
          />
        </figure>
        <h1>{title}</h1>
        <div></div>
      </header>
      <section id="blog-content">
        <BlockContent blocks={body} serializers={serializers} />
      </section>
      </article>
  )
}
type serializersLink = {
  mark: any;
  children: any;
};
const serializers = {
  marks: {
    internalLink: ({ mark, children }: serializersLink) => {
      const { slug = {} } = mark;
      const href = `/post/${slug.current}`;
      return (
        <Link href={href}>
          <a>{children}</a>
        </Link>
      );
    },
    link: ({ mark, children }: serializersLink) => {
      const { blank, href } = mark;
      return blank ? (
        <a href={href} target="_blank" rel="noopener">
          {children}
        </a>
      ) : (
        <a href={href}>{children}</a>
      );
    }
  }
};

export const getStaticProps: GetServerSideProps = async ({ params }) => {
  const { post }: Props = await sanity.fetch(postQuery, {
    slug: params?.slug
  });
  return {
    props: { post }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await sanity.fetch(postSlugsQuery);
  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: true
  };
};
