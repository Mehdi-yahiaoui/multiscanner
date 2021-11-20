import { createContext, FC, useState } from 'react';

type TMenuContext = {
  toggle: boolean;
  toggleMenu: () => void;
};
const MenuContext = createContext<TMenuContext>({
  toggle: false,
  toggleMenu: () => {}
});

const MenuProvider: FC = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  function toggleMenu(): void {
    setToggle((prev) => !prev);
  }
  return (
    <MenuContext.Provider value={{ toggle, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};
export { MenuContext, MenuProvider };
