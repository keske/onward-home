import React from "react";

import type { DialogRef } from "@/components/Dialog";

import { AboutDialog, Button } from "@/components/index";

export type AboutButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const AboutButton = React.forwardRef<
  HTMLButtonElement,
  AboutButtonProps
>(({ ...props }, ref) => {
  const aboutDialogRef = React.useRef<DialogRef>(null);

  const handleClick = React.useCallback(() => {
    aboutDialogRef.current?.open();
  }, []);

  return (
    <>
      <Button
        {...props}
        className="fixed bottom-5 right-5 z-50 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold uppercase text-white backdrop-blur-sm backdrop-brightness-150"
        onClick={handleClick}
        ref={ref}
        size="xs"
        variant="secondary"
      >
        ?
      </Button>
      <AboutDialog ref={aboutDialogRef} show={false} title="About" />
    </>
  );
});
