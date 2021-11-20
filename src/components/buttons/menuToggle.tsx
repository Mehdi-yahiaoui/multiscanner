import { useMenu } from 'hooks/useMenu';
import { HiMenuAlt1 } from 'react-icons/hi';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { useDirection } from 'hooks/useDirection';
import useTranslation from 'next-translate/useTranslation';
import 'twin.macro';

export function Toggle() {
  const { toggle, toggleMenu } = useMenu();
  const { direction } = useDirection();
  const { t } = useTranslation();
  return (
    <button
      tw="relative h-10 w-10 z-30  focus:(ring ring-purple-400) transition-all transition-delay[10ms]  outline-none  rounded-md flex items-center justify-center"
      onClick={() => toggleMenu()}
      aria-haspopup="true"
      aria-pressed={toggle}
      aria-label={t(`layout:buttons.menu-toggle.${toggle}`)}
    >
      {!toggle ? (
        <HiMenuAlt1 size="24" />
      ) : (
        <span>
          {direction === 'ltr' ? (
            <AiOutlineArrowLeft />
          ) : (
            <AiOutlineArrowRight />
          )}
        </span>
      )}
    </button>
  );
}
