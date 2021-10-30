import sanity from './sanityClient';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanity);

export function buildImage(source: string) {
  return builder.image(source);
}
