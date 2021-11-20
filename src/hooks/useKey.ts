import { useEffect, useRef } from 'react';

interface Props {
  key: string;
  callback: () => void;
}
export function useKey({ key, callback }: Props) {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  });
  useEffect(() => {
    function handleEvent(event: KeyboardEvent) {
      if (event.code === key) {
        //@ts-ignore
        callbackRef.current(event);
        console.log(key);
      }
      return;
    }
    document.addEventListener('keydown', handleEvent);
    return () => document.removeEventListener('keydown', handleEvent);
  }, [key]);
}
