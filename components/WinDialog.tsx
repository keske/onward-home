import React from "react";
import { useRefComposer } from "react-ref-composer";

import type { DialogRef } from "@/components/Dialog";

import { Button, Dialog } from "@/components/index";
import { useBuckets, useGame } from "@/stores/index";

export type WinDialogProps = React.PropsWithChildren & {
  show: boolean;
  title: string;
};

export const WinDialog = React.forwardRef<DialogRef, WinDialogProps>(
  ({ ...props }, ref) => {
    const composeRefs = useRefComposer();

    const dialogRef = React.useRef<DialogRef>();

    const { resetBuckets } = useBuckets();

    const { resetGame } = useGame();

    const handleClose = React.useCallback(() => {
      resetBuckets();
      resetGame();

      dialogRef?.current?.close();
    }, [resetBuckets, resetGame]);

    return (
      <Dialog
        {...props}
        onClose={handleClose}
        ref={composeRefs(ref, dialogRef)}
      >
        <div className="flex flex-col items-center gap-5">
          <span className="text-8xl">🎉 🎉 🎉</span>
          <Button onClick={handleClose}>Play again</Button>
        </div>
      </Dialog>
    );
  },
);
