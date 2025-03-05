import { Button } from "@headlessui/react";
import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface IUIButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

export function UIButton(props: IUIButtonProps): ReactNode {
  const { className = '', ...rest } = props;
  return (
    <Button
      className={clsx("h-[48px] w-[82px] flex justify-center items-center shrink-0 rounded-xl bg-(--color-red) hover:bg-(--color-dark-red) text-white cursor-pointer transition duration-300 ease", className)}
      {...rest}
    />
  );
}
