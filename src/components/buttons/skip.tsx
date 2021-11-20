import { useMenu } from 'hooks/useMenu';
import useTranslation from 'next-translate/useTranslation';
import {  Component, ComponentType, Ref, RefObject } from 'react';
import 'twin.macro';
import tw, { styled } from 'twin.macro';

interface Props {
  mainContentRef: RefObject<any>;
}


export const SkipNavigation = ({ mainContentRef }: Props) => {
  const { t } = useTranslation();
  const { toggle } = useMenu();
  function handleFocus(e: any) {
    e.preventDefault();
    console.log(mainContentRef);
    mainContentRef.current.firstChild.firstChild.focus();
  }
  return (
    <Button
      css={
        !toggle
          ? tw`hidden`
          : tw` focus:(not-sr-only absolute p-3 w-max top-16 ring ring-purple-400)`
      }
      onClick={(e) => handleFocus(e)}
    >
      {t('layout:buttons.skip-to', { content: t('common:main-content') })}
    </Button>
  );
};

export const SkipToLanguageSwitcher = ({
  langRef
}: {
  langRef: RefObject<any>;
}) => {
  const { t } = useTranslation();
  const { toggle } = useMenu();
  function handleFocus(e: any) {
    e.preventDefault();
    langRef.current.focus();
  }
  return (
    <Button
      css={
        !toggle
          ? tw`hidden`
          : tw` focus:(not-sr-only absolute p-3 w-max top-16 ring ring-purple-400)`
      }
      onClick={(e) => handleFocus(e)}
    >
      {t('layout:buttons.skip-to', { content: t('common:lang-switcher') })}
    </Button>
  );
};

const Button = styled.button(() => [
  tw`
        sr-only
        flex
        text-white
        outline-none
       
        z-10   
        items-center justify-center  bg-opacity-40 ring rounded-md ring-blue-600 
        `
]);
