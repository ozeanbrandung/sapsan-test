import { ReactNode } from 'react';
import { UIButton } from '../../ui';
import clsx from 'clsx';
import { SearchInput } from './ui';
import { UILayout } from '../../ui/ui-layout/ui-layout';

interface ISearchGroupProps {
  searchValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchBtnClick: () => void;
  className?: string;
  clearSearchValue: () => void;
}
export function SearchGroup(props: ISearchGroupProps): ReactNode {
  const { searchValue, handleInputChange, handleSearchBtnClick, clearSearchValue, className } = props;
  return (
    <UILayout className={clsx('flex justify-center items-center gap-[8px]', className)} tag="form">
      {/*TODO: move to json */}
      <SearchInput
        name="search"
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Телефоны, яблоки, груши..."
        clearValue={clearSearchValue}
      />
      {/*TODO: move to json */}
      <UIButton onClick={handleSearchBtnClick}>Искать</UIButton>
    </UILayout>
  );
}
