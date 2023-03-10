import React from "react";
import { useRefComposer } from "react-ref-composer";

import type { DialogProps, DialogRef } from "@/components/Dialog";

import { Button, Dialog } from "@/components/index";

export type AboutDialogProps = Pick<DialogProps, "show" | "title"> &
  React.PropsWithChildren;

export const AboutDialog = React.forwardRef<DialogRef, AboutDialogProps>(
  ({ ...props }, ref) => {
    const composeRefs = useRefComposer();

    const dialogRef = React.useRef<DialogRef>();

    const handleClose = React.useCallback(() => {
      dialogRef?.current?.close();
    }, []);

    return (
      <Dialog
        {...props}
        onClose={handleClose}
        ref={composeRefs(ref, dialogRef)}
      >
        <div className="flex flex-col items-center gap-5">
          <span className="text-8xl">💻</span>
          <span>
            By <a href="http://www.andreykeske.com">Andrey Keske</a>
          </span>
          <span>
            <a href="https://github.com/keske/onward-home">GitHub Repo</a>
          </span>
          <Button onClick={handleClose}>Close</Button>
        </div>
      </Dialog>
    );
  },
);
