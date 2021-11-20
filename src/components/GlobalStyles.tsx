import React from 'react';
import { createGlobalStyle } from 'styled-components';
import tw, { GlobalStyles as BaseStyles } from 'twin.macro';

const CustomStyles = createGlobalStyle`

@font-face{
  font-family: Roboto; 
  font-weight:400;
  src: url("https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap");
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
