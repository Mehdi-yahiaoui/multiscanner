import React from 'react';
import type { AppProps } from 'next/app';
import GlobalStyles from '../components/GlobalStyles';


function Blog({ Component, pageProps }: AppProps) {
  return (
    <div>
      <GlobalStyles />
      <Component {...pageProps} />
    </div>
  );
}
export default Blog;
