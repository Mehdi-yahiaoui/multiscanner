import {  ReactElement } from 'react';

interface IMetaNameContent {
  name: string;
  content: string;
}
type THeadTag = HTMLMetaElement | HTMLLinkElement | HTMLTitleElement 
export interface defaultMetaProps {
  children: ReactElement<THeadTag> ;
  author: IMetaNameContent;
  keywords: IMetaNameContent;
  description: IMetaNameContent;
}
export interface title {
  title: string;
}


export type HeadProps = defaultMetaProps & title;