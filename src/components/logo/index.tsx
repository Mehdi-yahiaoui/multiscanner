import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import 'twin.macro';

export const Logo = () => {
  const { t } = useTranslation();
  return (
    <div
      id="site-logo"
      tw="h-14 sm:h-16 p-8 w-full flex items-center justify-center "
    >
      <Link href="/">
        <a
          tw="cursor-pointer flex items-center justify-center focus:outline-none  focus:ring  focus:ring-purple-300  rounded-md"
          tabIndex={0}
          // add items-focus-purple to tw
          aria-label={t('layout:nav.home')}
        >
          <div tw="bg-blue-600  rounded-md flex justify-center items-center h-8 w-8 sm:h-10 sm:w-10">
            <span
              aria-label={t('layout:logo-label', {
                siteName: t('common:site-name')
              })}
            >
              🔆
            </span>
          </div>
        </a>
      </Link>
    </div>
  );
};
