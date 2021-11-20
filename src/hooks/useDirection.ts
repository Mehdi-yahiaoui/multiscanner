import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function useDirection() {
  const defaultDirection = 'ltr';
  const [direction, setDirection] = useState(defaultDirection);
  const { locale } = useRouter();
  useEffect(() => {
    function handleDirection() {
      switch (locale) {
        case 'ar':
          return setDirection('rtl');
        case 'en':
          return setDirection('ltr');
        default:
          return setDirection(defaultDirection);
      }
    }
    handleDirection();
    return function cleanUP() {
      setDirection(defaultDirection);
    };
  }, [locale]);
  return { direction };
}
