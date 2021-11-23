import {
  createRef,
  forwardRef,
  HTMLProps,
  ReactElement,
  useEffect
} from 'react';
import { NavBar } from '../navbar';
import { useDirection } from 'hooks/useDirection';
import { Header } from '@/components/header';
import 'twin.macro';
import tw, { css, styled } from 'twin.macro';
import Head from 'next/head';

export function MainLayout({
  children
}: HTMLProps<HTMLElement>): ReactElement<any> {
  const { direction } = useDirection();
  useEffect(() => {
    // @ts-ignore
    return () => document.querySelector('html').setAttribute('dir', direction);
  }, [direction]);
  const mainContentRef = createRef<any>();
  const langRef = createRef<any>();
  return (
    <LayoutContainer id="layout" dir={direction}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300&family=Open+Sans:wght@300&family=Roboto:wght@300&family=Tajawal&display=swap"
          rel="stylesheet"
        />
      </Head>
      <NavBar langRef={langRef} mainContentRef={mainContentRef} />
      <Header langRef={langRef} />
      <MainComponent ref={mainContentRef} tw="grid-area[main] w-full mt-16 ">
        {children}
      </MainComponent>
    </LayoutContainer>
  );
}
const LayoutContainer = styled.div(() => [
  tw`grid grid-template-areas['header' 'main' 'footer']
  sm:grid-template-areas['nav header ' '. main ' '. footer  ']
    grid-template-columns[auto]
    sm:grid-template-columns[80px 1fr]

    min-h-screen min-w-full
    bg-primary`,
  css`
    &::-webkit-scrollbar {
      width: 12px;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    }
  `
]);

interface IContentProps extends React.HTMLProps<HTMLDivElement> {}
const MainComponent = forwardRef<HTMLDivElement, IContentProps>(
  ({ children, ...rest }, ref) => {
    return (
      <div id="page-content" ref={ref} tw="grid-area[main] w-full" {...rest}>
        {children}
      </div>
    );
  }
);
