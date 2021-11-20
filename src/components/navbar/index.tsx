import { ReactElement, RefObject } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { FiHome } from 'react-icons/fi';
import { BiCategory } from 'react-icons/bi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useMenu } from 'hooks/useMenu';
import * as Button from '@/components/buttons';
import { useDirection } from 'hooks/useDirection';
import { Logo } from '@/components/logo';
import tw from 'twin.macro';

interface Props {
  mainContentRef: RefObject<any>;
  langRef: RefObject<any>;
}
export function NavBar({ mainContentRef, langRef }: Props) {
  const { toggle } = useMenu();
  const { direction } = useDirection();
  return (
    <div
      css={
        direction === 'ltr'
          ? tw`border-r-[0.02px] border-r-divider focus:left-16`
          : tw`border-l-[0.2px] border-l-divider`
      }
      tw="text-gray-200   grid-area[nav] fixed focus:top-2   h-screen z-30   "
    >
      <Button.SkipToLanguageSwitcher langRef={langRef} />
      <Button.SkipNavigation mainContentRef={mainContentRef} />
      <div
        css={direction === 'ltr' ? tw`right-[-4rem]` : tw`left-[-4rem]`}
        tw="h-16 w-16 absolute  flex justify-center items-center"
      >
        <Button.Toggle />
      </div>
      <div
        tw="relative h-full bg-primary"
        css={!toggle ? tw`hidden ` : tw`left-0`}
      >
        <div tw="flex  w-16 sm:w-20 justify-between h-full  flex-col transition-all">
          <Logo />
          <nav>
            <ul tw="flex flex-col h-full justify-evenly relative">
              {links.map(({ route, label, locale, icon }: ILink) => (
                <NavLink
                  key={label}
                  route={route}
                  label={label}
                  locale={locale}
                  icon={icon}
                />
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

const NavLink = ({ route, label, icon }: ILink) => {
  const { pathname } = useRouter();
  const { t } = useTranslation();
  const activeRoute = pathname === route;
  return (
    <li tw="sm:h-20 h-16  w-full flex   text-white p-2 relative">
      <Link href={route}>
        <a
          aria-label={t(`layout:nav.${label}`)}
          aria-current={activeRoute && 'page'}
          tabIndex={0}
          css={[
            tw`flex  cursor-pointer rounded-md items-center justify-center h-full w-full  hover:bg-secondary hover:bg-opacity-60 focus:outline-none  focus:ring  focus:ring-purple-300 `,

            activeRoute && tw`bg-secondary bg-opacity-50`
          ]}
        >
          <div tw="relative" aria-hidden="true">
            {icon}
            {activeRoute && (
              <div tw="absolute inset-x-0 -bottom-3 mr-auto ml-auto rounded-full h-2 w-2  bg-blue-600" />
            )}
          </div>
        </a>
      </Link>
    </li>
  );
};

interface ILink {
  label: string;
  route: string;
  hasChildren?: boolean;
  icon?: ReactElement<any, any>;
  locale?: string;
}
export const links: Array<ILink> = [
  {
    label: 'home',
    route: '/',
    icon: <FiHome />
  },
  {
    label: 'categories',
    route: '/category',
    hasChildren: true,
    icon: <BiCategory />
  },
  {
    label: 'about',
    route: '/about',
    icon: <AiOutlineInfoCircle />
  }
];
