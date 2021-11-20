import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState
} from 'react';

type TModalContext = {
  open: boolean;
  toggleModal: () => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const ModalContext = createContext<TModalContext>({
  open: false,
  toggleModal: () => {},
  setOpen: () => {}
});

const ModalProvider: FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);
  function toggleModal(): void {
    setOpen((prev) => !prev);
  }
  return (
    <ModalContext.Provider value={{ open, toggleModal, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
};
export { ModalContext, ModalProvider };
