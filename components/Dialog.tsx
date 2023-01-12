import { Dialog as HUIDialog, Transition } from "@headlessui/react";
import React from "react";

type Props = React.PropsWithChildren & {
  closable?: boolean;
  onClose?: () => void;
  show: boolean;
  title?: string;
};

export type DialogRef = {
  close: () => Promise<void>;
  open: (props?: React.PropsWithChildren<Props>) => void;
};

const Dialog = React.forwardRef<DialogRef, Props>(
  ({ children, closable = true, onClose, show, title }, ref) => {
    const onUnmount = React.useRef<() => void>();

    const [isOpen, setIsOpen] = React.useState(show);

    const handleClose = React.useCallback(() => {
      if (closable) {
        setIsOpen(false);
        onClose?.();
      }
    }, [closable, onClose]);

    React.useImperativeHandle(ref, () => ({
      close: () =>
        new Promise<void>((resolve) => {
          setIsOpen(false);
          onUnmount.current = resolve;
        }),
      open: () => {
        setIsOpen(true);
      },
    }));

    React.useEffect(() => {
      setIsOpen(show);
    }, [show]);

    return (
      <Transition
        afterLeave={() => onUnmount.current?.()}
        appear
        as={React.Fragment}
        show={isOpen}
      >
        <HUIDialog
          as="div"
          className="fixed inset-0 z-50"
          onClose={handleClose}
          unmount
        >
          <div className="h-screen">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <HUIDialog.Overlay className="fixed inset-0 bg-black/50" />
            </Transition.Child>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-150"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="flex h-full items-center justify-center p-10">
                <div
                  className={
                    "relative flex max-h-full w-full flex-col overflow-y-scroll rounded-2xl bg-white py-5"
                  }
                >
                  {title && (
                    <div className="relative flex items-center justify-center px-8 pb-5">
                      <div className="text-center">
                        <HUIDialog.Title
                          as="h3"
                          className="text-xl font-bold leading-6"
                        >
                          {title}
                        </HUIDialog.Title>
                      </div>
                    </div>
                  )}
                  <div className="h-full px-8">{children}</div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </HUIDialog>
      </Transition>
    );
  },
);

export default Dialog;
