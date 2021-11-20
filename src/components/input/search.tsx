import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import useTranslation from 'next-translate/useTranslation';

import 'twin.macro';
import tw, { css, styled } from 'twin.macro';
import { useDirection } from '@/hooks/useDirection';

export const SearchBar = () => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState('');
  const { direction } = useDirection();
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchValue(e.target.value);

  const subnitSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const router = useRouter();
    router.replace(router.basePath, `/search/${searchValue}`);
  };
  return (
    <div tw=" w-full ">
      <form onSubmit={subnitSearch}>
        <div tw="flex flex-grow  items-center">
          <div tw="relative w-full  flex justify-end h-10 pr-2" dir="auto">
            <SearchContainer dir={direction}>
              <Input
                id="search"
                type="search"
                role="searchbox"
                autoComplete="off"
                placeholder={t('layout:search.placeholder', {
                  value: 'something'
                })}
                onChange={onInputChange}
              />
              <span tw=" m-auto h-full flex items-center justify-center  w-10">
                <Button type="submit" aria-label={t('layout:buttons.search')}>
                  <BiSearch size="18" aria-hidden="true" />
                </Button>
              </span>
              <span
                css={[
                  searchValue ? tw`flex` : tw`hidden`,
                  tw`absolute ml-1 mr-1  top-0 bottom-0  items-center justify-center  w-10`,
                  direction === 'rtl' ? tw`left-1` : tw`right-1`
                ]}
              >
                <Button
                  tabIndex={0}
                  type="reset"
                  onClick={() => setSearchValue('')}
                  aria-label={t('layout:buttons.clear-search')}
                >
                  <IoMdClose size="18" aria-hidden="true" />
                </Button>
              </span>
            </SearchContainer>
          </div>
        </div>
      </form>
    </div>
  );
};

const SearchContainer = styled.div(() => [
  tw`relative w-full shadow-lg flex flex-row-reverse justify-between  focus-within:( ring-2 ring-purple-500 )  border-2 border-solid bg-secondary  border-secondary     text-sm rounded-l-md rounded-r-md  px-3 `
]);
const Input = styled.input(() => [
  tw`bg-transparent outline-none w-full  `,
  css`
    &::-webkit-search-cancel-button {
      -webkit-appearance: none;
    }
  `
]);
const Button = styled.button(() => [
  tw`  flex items-center justify-center border-none     text-white text-sm  h-7 w-7   rounded-full outline-none focus:(border-purple-200 ring-2 ring-purple-400 )`
]);
