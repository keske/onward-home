import React from "react";

import type { DialogRef } from "@/components/Dialog";
import type { Vector2 } from "@use-gesture/core/dist/declarations/src/types";
import type { NextPage } from "next";

import {
  AboutButton,
  Bucket,
  History,
  RestartButton,
  Scene,
  StartDialog,
  WinDialog,
} from "@/components/index";
import { useBucket } from "@/hooks/index";
import { useBuckets, useGame } from "@/stores/index";
import { isIntersected } from "@/utils/index";

const Home: NextPage = () => {
  const { selectedBucket, solveBucket, transformWaterToBucket } = useBucket();

  const { buckets, updateBucket } = useBuckets();

  const { handleStart, historyAppend, isStarted } = useGame();

  const bucketARef = React.useRef<React.ExoticComponent<HTMLDivElement>>(null);

  const bucketBRef = React.useRef<React.ExoticComponent<HTMLDivElement>>(null);

  const bucketCRef = React.useRef<React.ExoticComponent<HTMLDivElement>>(null);

  const sceneRef = React.useRef(null);

  const winDialogRef = React.useRef<DialogRef>(null);

  const handleDragBucket = React.useCallback(
    (xy: Vector2) => {
      if (selectedBucket) {
        if (
          // water intersected by bucket
          isIntersected(sceneRef, xy) ||
          // bucket `a` intersected by bucket `b`
          (isIntersected(bucketARef, xy) && selectedBucket.label === "b") ||
          // bucket `b` intersected by bucket `a`
          (isIntersected(bucketBRef, xy) && selectedBucket.label === "a") ||
          // bucket `c` intersected by bucket `b`
          (isIntersected(bucketCRef, xy) && selectedBucket.label === "b")
        ) {
          updateBucket({ isDroppable: true }, selectedBucket.label);
        }
      }
    },
    [selectedBucket, updateBucket],
  );

  const handleDragEndBucket = React.useCallback(
    (xy: Vector2) => {
      if (selectedBucket) {
        // water intersected by bucket
        if (isIntersected(sceneRef, xy)) {
          const action = selectedBucket.contains === 0 ? "fill" : "dump";

          updateBucket(
            {
              contains: action === "fill" ? selectedBucket.size : 0,
            },
            selectedBucket.label,
          );

          historyAppend(
            { type: "water" },
            { label: selectedBucket.label, type: "bucket" },
            action,
          );
        }

        if (
          selectedBucket.contains !== 0 &&
          // bucket `a` intersected by bucket `b`
          ((isIntersected(bucketARef, xy) && selectedBucket.label === "b") ||
            // bucket `b` intersected by bucket `a`
            (isIntersected(bucketBRef, xy) && selectedBucket.label === "a"))
        ) {
          const toBucket = buckets.filter(
            (bucket) =>
              bucket.label !== solveBucket.label &&
              bucket.label !== selectedBucket.label,
          )[0];

          transformWaterToBucket(toBucket);

          historyAppend(
            { label: selectedBucket.label, type: "bucket" },
            { label: toBucket.label, type: "bucket" },
            "dump",
          );
        }

        if (
          selectedBucket.contains !== 0 &&
          selectedBucket.contains === solveBucket.size &&
          // bucket `c` intersected by bucket `a`
          ((isIntersected(bucketCRef, xy) && selectedBucket.label === "a") ||
            // bucket `c` intersected by bucket `b`
            (isIntersected(bucketCRef, xy) && selectedBucket.label === "b"))
        ) {
          transformWaterToBucket(solveBucket);

          historyAppend(
            { label: selectedBucket.label, type: "bucket" },
            { label: solveBucket.label, type: "bucket" },
            "dump",
          );
        }
      }
    },
    [
      buckets,
      historyAppend,
      selectedBucket,
      solveBucket,
      transformWaterToBucket,
      updateBucket,
    ],
  );

  const renderWater = React.useMemo(
    () =>
      isStarted ? (
        <div className="absolute h-screen w-1/2">
          <Scene ref={sceneRef} />
        </div>
      ) : (
        <div className="absolute h-screen w-screen">
          <Scene />
        </div>
      ),
    [isStarted],
  );

  React.useEffect(() => {
    if (solveBucket.contains === solveBucket.size) {
      winDialogRef.current?.open();
    }
  }, [buckets, solveBucket.contains, solveBucket.size]);

  return (
    <>
      <StartDialog
        closable={isStarted}
        onStart={handleStart}
        show={!isStarted}
        title="Input buckets size"
      />
      <WinDialog ref={winDialogRef} show={false} title="You're win!" />
      {renderWater}
      {isStarted && (
        <>
          <History />
          <RestartButton />
          <AboutButton />
          <div className="absolute left-1/2 z-10 h-screen w-1/2 bg-stone-900">
            <div className="flex h-screen flex-col items-center justify-center gap-14">
              <Bucket
                bucket={buckets[0]}
                onDrag={handleDragBucket}
                onDragEnd={handleDragEndBucket}
                ref={bucketARef}
              />
              <Bucket
                bucket={buckets[1]}
                onDrag={handleDragBucket}
                onDragEnd={handleDragEndBucket}
                ref={bucketBRef}
              />
              <Bucket
                bucket={buckets[2]}
                gestureConfig={{
                  drag: {
                    bounds: { bottom: 0, left: 0, right: 0, top: 0 },
                    rubberband: 0.05,
                  },
                }}
                ref={bucketCRef}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
