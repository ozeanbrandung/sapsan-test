import { ReactNode } from 'react';
import clsx from 'clsx';
import { SearchInput } from './ui';

interface ISearchGroupProps {
  searchValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchBtn: ReactNode;
  className?: string;
  clearSearchValue: () => void;
}
export function SearchGroup(props: ISearchGroupProps): ReactNode {
  const { searchValue, handleInputChange, searchBtn, clearSearchValue, className } = props;
  return (
    <form className={clsx('flex justify-center items-center gap-[8px] max-w-[512px] ', className)}>
      {/*TODO: move to json */}
      <SearchInput
        name="search"
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Телефоны, яблоки, груши..."
        clearValue={clearSearchValue}
      />
      {searchBtn}
    </form>
  );
}
