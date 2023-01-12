import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import type { DialogRef } from "@/components/Dialog";

import { Button, Dialog, Input } from "@/components/index";
import { useBuckets, useGame } from "@/stores/index";

type Props = React.PropsWithChildren & {
  closable?: boolean;
  onStart: () => void;
  show: boolean;
  title: string;
};

const StartDialog = React.forwardRef<DialogRef, Props>(
  ({ onStart, ...props }, ref) => {
    const { buckets, updateBucket } = useBuckets();

    const { handleStart } = useGame();

    const {
      formState: { errors },
      handleSubmit,
      register,
    } = useForm<Record<string, string>>();

    const onSubmit = React.useCallback<SubmitHandler<Record<string, string>>>(
      (data: Record<string, string>) => {
        Object.keys(data).map((key) => {
          updateBucket({ size: +data[key] }, key);
        });

        handleStart();

        ref?.current?.close();
      },
      [handleStart, ref, updateBucket],
    );

    const handleCloseDialog = React.useCallback(() => {
      handleStart();
    }, [handleStart]);

    return (
      <Dialog {...props} onClose={handleCloseDialog} ref={ref}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center gap-5">
            <div className="flex flex-row gap-5">
              {buckets.map((bucket) => (
                <div className="flex flex-col items-center gap-3 uppercase">
                  <div className="flex items-center justify-center duration-200 hover:scale-105">
                    <div className="relative text-6xl">🪣</div>
                    <div className="absolute">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold uppercase text-white backdrop-blur-sm backdrop-brightness-150">
                        {bucket.label}
                      </div>
                    </div>
                  </div>
                  <Input
                    defaultValue={bucket.size}
                    max={100}
                    min={1}
                    type="number"
                    {...register(bucket.label)}
                  />
                </div>
              ))}
            </div>
            {errors.a && <span>This field is required</span>}
            <Button type="submit">Let's go!</Button>
          </div>
        </form>
      </Dialog>
    );
  },
);

export default StartDialog;
