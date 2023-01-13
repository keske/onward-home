import React from "react";
import { useRefComposer } from "react-ref-composer";

import type { DialogRef } from "@/components/Dialog";

import { Button, Dialog } from "@/components/index";

type Props = React.PropsWithChildren & {
  show: boolean;
  title: string;
};

const AboutDialog = React.forwardRef<DialogRef, Props>(({ ...props }, ref) => {
  const composeRefs = useRefComposer();

  const dialogRef = React.useRef<DialogRef>();

  const handleClose = React.useCallback(() => {
    dialogRef?.current?.close();
  }, []);

  return (
    <Dialog {...props} onClose={handleClose} ref={composeRefs(ref, dialogRef)}>
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
});

export default AboutDialog;
