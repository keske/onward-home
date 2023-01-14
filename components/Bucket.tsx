import { animated, useSpring } from "@react-spring/web";
import { UserGestureConfig, useGesture } from "@use-gesture/react";
import clsx from "clsx";
import * as R from "ramda";
import React from "react";

import { ProgressBar } from "./ProgressBar";

import type { Bucket as TBucket } from "@/stores/useBuckets";
import type { Vector2 } from "@use-gesture/core/dist/declarations/src/types";

import { useBucket } from "@/hooks/index";
import { useBuckets } from "@/stores/index";

export type BucketProps = {
  bucket: TBucket;
  gestureConfig?: UserGestureConfig;
  onDrag?: (xy: Vector2) => void;
  onDragEnd?: (xy: Vector2) => void;
};

export const Bucket = React.forwardRef<HTMLDivElement, BucketProps>(
  (
    { bucket, onDrag = () => {}, onDragEnd = () => {}, gestureConfig = {} },
    ref,
  ) => {
    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

    const { selectedBucket } = useBucket();

    const { updateBucket } = useBuckets();

    const transformStyles = React.useMemo(
      () => ({
        transform: `rotate(${bucket.isDroppable ? "-5" : "0"}deg)`,
      }),
      [bucket.isDroppable],
    );

    const bind = useGesture(
      {
        onDrag: ({ down, xy, movement: [mx, my] }) => {
          const draggable = R.and(down, R.not(R.isNil(selectedBucket)));

          api.start({
            immediate: draggable,
            x: draggable ? mx : 0,
            y: draggable ? my : 0,
          });

          onDrag(xy);
        },
        onDragEnd: ({ xy }) => {
          updateBucket({ isDroppable: false, isSelected: false }, bucket.label);

          onDragEnd(xy);
        },
        onDragStart: () => {
          updateBucket({ isSelected: true }, bucket.label);
        },
      },
      { drag: { ...gestureConfig.drag, preventDefault: true } },
    );

    React.useEffect(() => {
      const handleEsc = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          event.preventDefault();
          updateBucket({ isSelected: true }, bucket.label);
        }
      };

      window.addEventListener("keydown", handleEsc);

      return () => {
        window.removeEventListener("keydown", handleEsc);
      };
    }, [bucket.label, updateBucket]);

    return (
      <animated.div
        {...bind()}
        className={clsx(
          "flex cursor-grab flex-row gap-3",
          bucket.label === selectedBucket?.label && "z-50",
        )}
        ref={ref}
        style={{
          ...transformStyles,
          x,
          y,
        }}
      >
        <div className="flex items-center justify-center duration-200 hover:scale-105">
          <div className="relative text-8xl">🪣</div>
          <div className="absolute">
            <div className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold uppercase text-white backdrop-blur-sm backdrop-brightness-150">
              {bucket.label}
            </div>
          </div>
        </div>
        <ProgressBar progress={bucket.contains / bucket.size} />
        <span className="text-[10px] font-bold text-white">
          {`${bucket.contains} / ${bucket.size}`}
        </span>
      </animated.div>
    );
  },
);
