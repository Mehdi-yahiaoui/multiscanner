import Link from 'next/link';
import Image from 'next/image';
import { buildImage } from '@/lib/imageBuilder.sanity';

import 'twin.macro';

type CardProps = {
  title?: string;
  mainImage?: any;
  description?: string;
  publishedAt?: string;
  slug?: string;
};

export default function Card({
  title = '',
  mainImage = '',
  description = '',
  publishedAt = String(new Date()),
  slug
}: CardProps): JSX.Element {
  const publicationDate = new Date(publishedAt).toLocaleDateString();
  const image = buildImage(mainImage.asset);
  return (
    <article
      style={{ position: 'relative' }}
      id={slug}
      tabIndex={0}
      tw=" rounded-md  ring-1 ring-divider outline-none  bg-secondary w-full  sm:max-w-xl  relative  focus:(ring-2 ring-purple-400) "
    >
      <header>
        <div
          tw="relative h-60 w-full "
          itemScope
          itemType="https://schema.org/Article"
        >
          <Link href={`/post/${slug}`}>
            <a
              tabIndex={0}
              tw=" rounded-md h-full w-full p-2 outline-none block overflow-hidden  focus:(ring-2  ring-purple-400)  relative"
            >
              <Image
                alt={`image for ${title}`}
                src={image.width(300).height(250).url()}
                layout="fill"
                objectFit="cover"
              />
            </a>
          </Link>
        </div>
        <div tw="flex flex-row p-3 space-x-1">
          <span
            tabIndex={0}
            tw="h-10 w-10 rounded-full inline-block outline-none focus:(ring-2  ring-purple-400)"
          >
            <img
              tw="h-full w-full rounded-full"
              aria-hidden
              src={image.width(40).height(40).url()}
              alt="Yahiaoui A. Mehdi"
            />
          </span>
          <div tw="flex flex-col text-sm">
            <span itemProp="author">
              <h3
                tabIndex={0}
                tw="outline-none text-gray-100 focus:(ring-2  ring-purple-400 rounded-sm)"
              >
                <span tw="sr-only">author:</span>Yahiaoui A. Mehdi
              </h3>
            </span>
            <time
              tabIndex={0}
              dateTime={publishedAt}
              tw="outline-none text-gray-400 focus:(ring-2  ring-purple-400 rounded-sm)"
            >{`${publicationDate}`}</time>
          </div>
        </div>
        <h2 tw="ml-14 mr-14 text-gray-200 font-bold text-xl font-mono capitalize">
          <Link href={`/post/${slug}`}>
            <a
              tabIndex={0}
              tw="outline-none hover:(text-purple-400) focus:(ring-2  ring-purple-400 rounded-sm)"
            >
              {title}
            </a>
          </Link>
        </h2>
      </header>
      <section
        aria-label="description"
        tabIndex={0}
        tw="w-full h-full outline-none focus:(ring-2  ring-purple-400 rounded-md)"
      >
        <p  tabIndex={0} tw="ml-14 mr-14 text-lg text-white line-height[2em]">
          {description}
        </p>
      </section>
    </article>
  );
}

