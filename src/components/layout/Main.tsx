import { createRef, forwardRef, HTMLProps, ReactElement, useEffect } from 'react';
import { NavBar } from '../navbar';
import { useDirection } from 'hooks/useDirection';
import { Header } from '@/components/header';
import 'twin.macro';
import tw, { css, styled } from 'twin.macro';

export function MainLayout({
  children
}: HTMLProps<HTMLElement>): ReactElement<any> {
  const { direction } = useDirection();
  useEffect(() => {
    // @ts-ignore
    return ()=> document.querySelector('html').setAttribute("dir", direction)
  }, [direction])
  const mainContentRef = createRef<any>();
  const langRef = createRef<any>();
  return (
    <LayoutContainer id="layout" dir={direction}>
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

interface IContentProps extends React.HTMLProps<HTMLElement> {}
const MainComponent = forwardRef<HTMLElement, IContentProps>(
  ({ children, ...rest }, ref) => {
    return (
      <main ref={ref} tw="grid-area[main] w-full" {...rest}>
        {children}
      </main>
    );
  }
);
