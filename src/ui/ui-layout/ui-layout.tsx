import clsx from 'clsx';
import { JSX, ReactNode, Ref } from 'react';

interface IUILayoutProps {
  children: ReactNode;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
  ref?: Ref<HTMLElement>;
}
export function UILayout(props: IUILayoutProps): ReactNode {
  const { className, children, tag = 'div', ref, ...rest } = props;
  const Tag = tag;

  return (
    <Tag ref={ref} className={clsx('px-[16px]', className)} {...rest}>
      {children}
    </Tag>
  );
}
