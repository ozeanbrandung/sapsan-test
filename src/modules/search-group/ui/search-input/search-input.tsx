import { Button } from '@headlessui/react';
import clsx from 'clsx';
import { InputHTMLAttributes, ReactNode } from 'react';
import { SearchIcon } from './SearchIcon';
import { CrossIcon } from './CrossIcon';
import { UIInput } from '../../../../ui';

interface ISearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  clearValue: () => void;
}

export function SearchInput(props: ISearchInputProps): ReactNode {
  const { className, value, clearValue, ...rest } = props;
  return (
    <div className="h-[48px] w-full relative">
      <div className="absolute left-[8px] top-[12px]">
        <SearchIcon />
      </div>

      <UIInput
        className={clsx('py-[15px] pr-[25px] pl-[36px]', className)}
        value={value}
        onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
        {...rest}
      />
      {!!value && (
        <Button className="absolute right-[12px] top-[12px]" onClick={clearValue}>
          <CrossIcon />
        </Button>
      )}
    </div>
  );
}
