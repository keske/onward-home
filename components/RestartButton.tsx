import { ArrowPathIcon } from "@heroicons/react/20/solid";
import React from "react";

import { Button } from "@/components/index";

import { useBuckets, useGame } from "@/stores/index";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

const RestartButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ ...props }, ref) => {
    const { resetBuckets } = useBuckets();

    const { resetGame } = useGame();

    const handleOnClick = React.useCallback(() => {
      resetBuckets();
      resetGame();
    }, [resetBuckets, resetGame]);

    return (
      <Button
        {...props}
        className="fixed top-5 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold uppercase text-black backdrop-blur-sm backdrop-brightness-150"
        onClick={handleOnClick}
        ref={ref}
        size="xs"
        variant="secondary"
      >
        <ArrowPathIcon />
      </Button>
    );
  },
);

export default RestartButton;
