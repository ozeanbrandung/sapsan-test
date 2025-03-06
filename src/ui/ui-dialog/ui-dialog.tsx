import { Button, Dialog, DialogPanel } from '@headlessui/react';
import { ReactNode } from 'react';
import { CloseIcon } from './CloseIcon';

interface IUIDialogProps {
  className?: string;
  isOpen: boolean;
  handleClose(): void;
  children: ReactNode;
}

export function UIDialog(props: IUIDialogProps): ReactNode {
  const { isOpen, handleClose, children } = props;
  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-start lg:items-center justify-center bg-[#0000004D]">
        <DialogPanel>{children}</DialogPanel>

        <Button
          className="absolute top-[20px] right-[20px] lg:top-[24px] lg:right-[24px] cursor-pointer"
          onClick={() => handleClose()}
        >
          <CloseIcon />
        </Button>
      </div>
    </Dialog>
  );
}
