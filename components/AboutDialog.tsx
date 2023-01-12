import React from "react";

import type { DialogRef } from "@/components/Dialog";

import { Button, Dialog } from "@/components/index";

type Props = React.PropsWithChildren & {
  show: boolean;
  title: string;
};

const AboutDialog = React.forwardRef<DialogRef, Props>(({ ...props }, ref) => {
  const handleClose = React.useCallback(() => {
    /**
     * Work in progress
     *
     * @ts-expect-error */
    ref.current?.close();
  }, [ref]);

  return (
    <Dialog {...props} onClose={handleClose} ref={ref}>
      <div className="flex flex-col items-center gap-5">
        <span className="text-8xl">💻</span>
        <span>
          By <a href="http://www.andreykeske.com">Andrey Keske</a>
        </span>
        <span>GitHub Repo</span>
        <Button onClick={handleClose}>Close</Button>
      </div>
    </Dialog>
  );
});

export default AboutDialog;
