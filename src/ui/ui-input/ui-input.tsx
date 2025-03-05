import { Input } from "@headlessui/react";
import clsx from "clsx";
import { InputHTMLAttributes, ReactNode } from "react";

interface IUIInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function UIInput(props: IUIInputProps): ReactNode {
  const { className, ...rest } = props;
  return (
   <Input
      className={clsx(
        "h-full w-full rounded-xl bg-(--color-grey)",
        className
      )}
      {...rest}
    />
  );
}
