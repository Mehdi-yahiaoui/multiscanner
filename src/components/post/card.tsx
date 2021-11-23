import Link from 'next/link';
import Image from 'next/image';
import 'twin.macro';
import { TPosts, TTag } from '@/typings/schema.types';
import { Author } from '../author';
import Skeleton from 'react-loading-skeleton';
import tw from 'twin.macro';
export default function Card(post: TPosts): JSX.Element {
  return <Article {...post} />;
}

function Article(post: TPosts) {
  const {
    title,
    slug,
    author: {
      name,
      picture: { url: authorImage }
    },
    coverImage: { url: coverImage },
    publishedAt,
    excerpt,
    tag
  } = post;

  console.log(post.tag[0]);
  return (
    <article
      itemScope
      itemType="http://schema.org/Article"
      id={slug}
      tabIndex={0}
      tw=" rounded-md  ring-1 ring-divider outline-none  bg-secondary w-full  sm:max-w-xl  relative  focus:(ring-2 ring-purple-400) text-white"
    >
      <section>
        <div tw="relative h-60 w-full ">
          <span tw=" rounded-t-md block h-full w-full p-2   overflow-hidden    relative">
            <Image
              alt={`image for ${title}`}
              src={coverImage}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </span>
        </div>
        <header tw="mb-4">
          <div tw="flex flex-row p-3 space-x-1">
            <Author
              name={name}
              image={authorImage}
              imageSize="sm"
              time={publishedAt}
            />
          </div>
          <h2 tw="ml-14 mr-14 text-gray-200 font-bold text-xl  capitalize outline-none hover:(text-purple-400) focus:(text-purple-400)  ">
            <Link href={`/post/${slug}`}>
              <a>{title || <Skeleton />}</a>
            </Link>
          </h2>
        </header>
      </section>
      <section
        aria-labelledby="description"
        tw="w-full h-full mb-4 outline-none focus:(ring-2  ring-purple-400 rounded-md)"
      >
        <p
          aria-label="description"
          id="description"
          itemProp="abstract"
          tw="ml-14 mr-14 text-lg font-light text-white line-height[1.5em] "
        >
          {excerpt}
        </p>
      </section>
      <section id="tags" tw="flex h-16 items-center px-5">
        <span aria-hidden tw="sr-only">
          List of tags
        </span>
        <ul>
          <Tag tag={tag} />
        </ul>
      </section>
    </article>
  );
}

const Tag = ({ tag }: { tag: TTag[] }) => (
  <>
    {tag.map(({ name, colour }) => (
      <li
        itemProp="keywords"
        key={name}
        css={[
          `background-color:rgba(${colour.rgba?.r}, ${colour.rgba?.g}, ${colour.rgba?.b}, var(--tw-bg-opacity)); border:1px solid rgba(${colour.rgba?.r}, ${colour.rgba?.g}, ${colour.rgba?.b}, var(--tw-border-opacity)); `,
          tw`bg-opacity-5 border-opacity-10  p-0.5 rounded-md shadow   hover:(bg-opacity-10 border-opacity-40) `
        ]}
      >
        <span
          style={{
            color: `rgb(${colour.rgba?.r}, ${colour.rgba?.g}, ${colour.rgba?.b})`
          }}
        >
          #
        </span>
        {name}
      </li>
    ))}{' '}
  </>
);
