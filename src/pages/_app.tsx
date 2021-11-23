import React from 'react';
import type { AppProps } from 'next/app';
import '@/styles/index.css';
import GlobalStyles from '../components/GlobalStyles';
import { MenuProvider } from 'context/menu.context';
import { ModalProvider } from '@/context/modal.context';

function Blog({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <ModalProvider>
        <MenuProvider>
          <Component {...pageProps} />
        </MenuProvider>
      </ModalProvider>
    </>
  );
}

export default Blog;
