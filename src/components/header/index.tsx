import { useDirection } from 'hooks/useDirection';
import { useMenu } from 'hooks/useMenu';

import React, { Ref, useRef } from 'react';
import { SearchBar } from '@/components/input/search';
import tw from 'twin.macro';
import { Logo } from '@/components/logo';
import { SearchModal } from '../modal/search';
import { useModal } from 'hooks/useModal';
import useTranslation from 'next-translate/useTranslation';
import { BiSearch } from 'react-icons/bi';
import { LanguageSwitcher } from '@/components/language-switcher';

export function Header({ langRef }: { langRef: Ref<any> }): JSX.Element {
  const { direction } = useDirection();
  const { toggle } = useMenu();
  const { toggleModal, open } = useModal();
  const { t } = useTranslation();
  const modalRef = useRef<any>(null);

  const openModal = () => {
    toggleModal();
    setTimeout(() => {
      modalRef.current.focus();
    }, 1000);
  };

  return (
    <header
      css={
        toggle && direction === 'ltr' ? tw`sm:pl-20 pl-14` : tw`sm:pr-20 pr-14`
      }
      tw="fixed left-0 right-0 top-0  bg-primary  transition-all transition-delay[10ms] grid-area['header']  shadow-sm h-16  border-b-divider border-b-2 text-white z-20"
    >
      <div
        dir={direction}
        tw=" relative h-16 px-3 py-5  flex items-center  transition-all transition-delay[10ms]"
        css={direction === 'ltr' ? tw`ml-8` : tw`mr-8`}
      >
        <div tw=" mx-2" css={!toggle ? tw`flex` : tw`hidden`}>
          <div tw="w-14">
            <Logo />
          </div>
        </div>
        <div tw="md:max-w-md  sm:max-w-sm flex-1 flex  items-center mx-1">
          <div tw="hidden sm:flex sm:w-72  mx-4">
            <SearchBar />
          </div>
          <button
            onClick={openModal}
            aria-label={t('common:modal.open', {
              target: t('layout:search.label')
            })}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-pressed={open}
            tabIndex={0}
            tw="flex sm:hidden items-center justify-center outline-none p-1 focus:(ring ring-purple-400 rounded-full )"
          >
            <BiSearch size="22" />
          </button>

          <SearchModal ref={modalRef} />
        </div>
        <div tw="flex w-full justify-end ">
          <LanguageSwitcher ref={langRef} />
        </div>
      </div>
    </header>
  );
}
