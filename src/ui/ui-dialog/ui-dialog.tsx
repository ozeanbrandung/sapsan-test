import { Dialog, DialogPanel } from '@headlessui/react';
import { ReactNode } from 'react';

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
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
          {children}
          <div className="flex gap-4">
            <button onClick={() => handleClose()}>Cancel</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
