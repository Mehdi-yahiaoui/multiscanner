import { useCloseOnClickOutside } from '@/hooks/useClickOutside';
import { useKey } from '@/hooks/useKey';
import * as Portal from '@radix-ui/react-portal';
import { useModal } from 'hooks/useModal';
import { forwardRef } from 'react';
import TrapFocus from 'focus-trap-react';
import 'twin.macro';
import { SearchBar } from '../input/search';

export const SearchModal = forwardRef<HTMLElement>((_, ref) => {
  const { open, setOpen } = useModal();

  const closeModal = () => {
    setOpen(false);
  };

  useKey({
    key: 'Escape',
    callback: () => {
      open && closeModal();
    }
  });
  useCloseOnClickOutside(open, ref, () => closeModal());
  return open ? (
    <Portal.Root tw="relative ">
      <div id="overlay" tw="fixed inset-0 bg-primary bg-opacity-40 z-20">
        <div tw="w-full  py-60 h-full flex justify-center items-center overflow-auto">
          <TrapFocus>
            <div tw="w-full max-w-sm h-80 relative    box-shadow[0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)]">
              <dialog
                ref={ref}
                open={open}
                aria-modal="true"
                tw="outline-none text-white h-full w-full ring-1 ring-divider focus:(ring ring-blue-500) bg-primary  rounded-md"
                tabIndex={0}
              >
                <h2
                  tw="sr-only outline-none focus:(ring-1 rounded-sm)"
                  tabIndex={0}
                  id="search-dialog"
                >
                  Search for what you want
                </h2>
                <div>
                  <SearchBar />
                </div>
              </dialog>
            </div>
          </TrapFocus>
        </div>
      </div>
    </Portal.Root>
  ) : null;
});
