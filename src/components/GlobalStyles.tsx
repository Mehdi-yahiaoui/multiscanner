import React from 'react';
import { createGlobalStyle } from 'styled-components';
import tw, { GlobalStyles as BaseStyles } from 'twin.macro';

const CustomStyles = createGlobalStyle`

html[lang="en"]{
  font-family:'Roboto', sans-serif;
}
html[lang="ar"]{
font-family: 'Cairo', sans-serif;
  font-weight:normal;
}


*{
::-webkit-scrollbar {
    width: 12px;
}
 
::-webkit-scrollbar-track {
    ${tw`bg-primary border-2 border-divider`}
    
}
 
::-webkit-scrollbar-thumb {
    border-radius: 100px;

  ${tw`bg-blend-saturation bg-divider shadow-md`}
}
  }
`;

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);

export default GlobalStyles;
