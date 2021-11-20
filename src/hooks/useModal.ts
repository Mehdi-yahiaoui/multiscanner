import { ModalContext } from '@/context/modal.context';
import { useContext } from 'react';

export function useModal() {
  const { open, toggleModal, setOpen } = useContext(ModalContext);

  return {
    open,
    toggleModal,
    setOpen
  };
}
