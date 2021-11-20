import { ForwardedRef, RefObject, useEffect } from 'react';

export function useCloseOnClickOutside(
  show: boolean,
  ref: ForwardedRef<any> | RefObject<any>,
  //   triggerRef: RefObject<HTMLElement> | null,
  callback: (event: any) => void
) {
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        show &&
        (ref as React.MutableRefObject<HTMLElement>).current &&
        !(ref as React.MutableRefObject<HTMLElement>).current.contains(e.target)
      ) {
        callback(e);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [show]);
}
