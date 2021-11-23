import { HtmlProps } from 'next/dist/shared/lib/utils';
import { HTMLProps, ReactNode, useEffect, useState } from 'react';
import tw from 'twin.macro';

export interface IAvatarDetails {
  children: { details: ReactNode };
  imageProps: IAvatar;
}
export interface IAvatar {
  src: string;
  srcSet?: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  itemProp?: string;
  itemType?: string;

  avatarSize?: TSize;
  contour?: boolean;
}

export function Avatar({ avatarSize, contour, ...rest }: IAvatar) {
  return (
    <span
      tw="mr-1 ml-1 inline-block outline-none focus:(ring-2  ring-purple-400) rounded-full"
      css={[
        getSize(avatarSize),
        contour &&
          tw`bg-gradient-to-br from-purple-500 via-purple-300 to-blue-500 p-0.5`
      ]}
    >
      <img {...rest} tw="h-full w-full rounded-full" />
    </span>
  );
}
export type TSize = 'sm' | 'lg' | undefined;
function getSize(size: TSize) {
  switch (size) {
    case 'sm':
      return tw`h-10 w-10`;
    case 'lg':
      return tw`h-12 w-12`;
    default:
      return tw`h-8 w-8`;
  }
}
