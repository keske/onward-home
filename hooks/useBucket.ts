import React from "react";

import type { Bucket } from "@/stores/useBuckets";

import { useBuckets } from "@/stores/index";

export type Result = {
  selectedBucket: Bucket;
  solveBucket: Bucket;
  transformWaterToBucket: (toBucket: Bucket) => void;
};

const useBucket = (): Result => {
  const { buckets, updateBucket } = useBuckets();

  const selectedBucket = React.useMemo(
    () => buckets.filter(({ isSelected }) => isSelected)[0],
    [buckets],
  );

  const solveBucket = React.useMemo(
    () => buckets.filter((bucket) => bucket.label === "c")[0],
    [buckets],
  );

  const transformWaterToBucket = React.useCallback(
    (toBucket: Bucket) => {
      const notSelectedBucketRemain = toBucket.size - toBucket.contains;

      const isSelctedBucketGreater =
        selectedBucket.contains >= notSelectedBucketRemain;

      console.log("transfer to bucket: ", toBucket.label);
      console.log("isSelctedBucketGreater: ", isSelctedBucketGreater);

      updateBucket(
        {
          contains: isSelctedBucketGreater
            ? toBucket.size
            : toBucket.contains + selectedBucket.contains,
        },
        toBucket.label,
      );
      updateBucket(
        {
          contains: isSelctedBucketGreater
            ? selectedBucket.contains - notSelectedBucketRemain
            : 0,
        },
        selectedBucket.label,
      );
    },
    [selectedBucket, updateBucket],
  );

  return {
    selectedBucket,
    solveBucket,
    transformWaterToBucket,
  };
};

export default useBucket;
