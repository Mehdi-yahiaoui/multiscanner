import { Avatar, TSize } from '../avatar';
import 'twin.macro';
import useTranslation from 'next-translate/useTranslation';

interface IAuthor {
  name: string;
  image: string;
  imageSize?: TSize;
  time: string | number | Date;
}

export function Author({ name, image, imageSize, time }: IAuthor) {
  const { t, lang } = useTranslation();
  return (
    <address
      tw="flex items-center space-x-1.5"
      itemProp="author publisher"
      itemScope
      itemType="http://schema.org/Organization"
    >
      <Avatar src={image} itemProp="image" avatarSize={imageSize} contour />
      <span>
        <a rel="author" itemProp="name" title={t('common:author')}>
          {name}
        </a>
        <p tw="text-lowgray text-sm font-light">
          <bdo>{t('common:postedOn')}</bdo>
          <time
            itemProp="dateCreated datePublished"
            dateTime={new Date(time)
              .toISOString()
              .replace(/T.*/, '')
              .split('-')
              .join('-')}
          >
            {new Date(time).toLocaleDateString(
              lang === 'ar' ? 'ar-DZ' : 'en-UK',
              {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              }
            )}
          </time>
        </p>
      </span>
    </address>
  );
}
