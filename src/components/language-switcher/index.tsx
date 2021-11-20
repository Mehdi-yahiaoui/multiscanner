import { useDirection } from '@/hooks/useDirection';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React, {
  ChangeEvent,
  FormEvent,
  ForwardedRef,
  forwardRef,
  memo,
  useEffect,
  useState
} from 'react';
import { RiTranslate2 } from 'react-icons/ri';
import 'twin.macro';
import { withBadge } from '../badge';
import { Beta } from '../badge/beta';

export const LanguageSwitcher = memo(
  forwardRef((_, ref: ForwardedRef<HTMLInputElement>) => {
    const { lang, t } = useTranslation();
    const { direction } = useDirection();
    const defaultLang = {
      label: t(`common:language.${lang}.label`),
      code: lang
    };
    const [selectLanguage, setSelectLanguage] = useState(defaultLang);
    const route = useRouter();
    useEffect(() => {
      setSelectLanguage(defaultLang);
      return () => setSelectLanguage(defaultLang);
    }, [lang]);
    const onChangeLanguage = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.includes('en')) {
        return setSelectLanguage({
          code: 'en',
          label: t(`common:language.en.label`)
        });
      }
      if (e.target.value.includes('ar')) {
        return setSelectLanguage({
          code: 'ar',
          label: t(`common:language.ar.label`)
        });
      } else {
        return setSelectLanguage(defaultLang);
      }
    };
    async function switchLanguage(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      if (selectLanguage.code === lang) {
        return null;
      }
      return await route.replace(route.basePath, route.asPath, {
        locale: selectLanguage.code
      });
    }
    return (
      <div id="language-switcher">
        <form
          tw="h-10 flex items-center space-x-4"
          onSubmit={(e) => switchLanguage(e)}
        >
          <div tw="relative">
            <TransButton />
          </div>
          <label id="language-label" tw="sr-only" htmlFor="language-input">
            {t('common:language-switcher')}
          </label>
          <input
            ref={ref}
            type="text"
            autoComplete="off"
            onChange={(e) => onChangeLanguage(e)}
            aria-labelledby="language-label"
            id="language-input"
            list="languages"
            dir={direction}
            aria-label={t('common:language.current', {
              lang: t(`common:language.${lang}.label`)
            })}
            tw="px-2 rounded-md h-full bg-secondary outline-none w-32"
            spellCheck="false"
            placeholder={`${selectLanguage.label} (${selectLanguage.code})`}
          />
          <datalist id="languages" role="list">
            <option
              value={`${t('common:language.ar.label')} (${t(
                'common:language.ar.code'
              )})`}
              aria-label={t('common:change-arabic')}
              aria-selected={lang === 'ar'}
            />
            <option
              value={`${t('common:language.en.label')} (${t(
                'common:language.en.code'
              )})`}
              aria-label={t('common:change-english')}
              aria-selected={lang === 'en'}
            />
          </datalist>
        </form>
      </div>
    );
  })
);

const TransButton = withBadge(
  { state: true },
  Beta
)(() => (
  <button
    tw="outline-none focus:(ring-2 ring-purple-400) rounded-md"
    type="submit"
  >
    <RiTranslate2
      aria-hidden="true"
      tw="fill-current text-gray-50 h-5 w-5 sm:h-6 sm:w-6 mx-2"
    />
  </button>
));
