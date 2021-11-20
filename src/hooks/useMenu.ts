import { MenuContext } from 'context/menu.context';
import { useContext } from 'react';

export function useMenu() {
  const { toggle, toggleMenu } = useContext(MenuContext);

  return {
    toggle,
    toggleMenu
  };
}
