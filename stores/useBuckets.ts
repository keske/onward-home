import * as R from "ramda";
import create from "zustand";

const DEFAULT_COMMON_PROPS = {
  contains: 0,
  isDroppable: false,
  isSelected: false,
};

const DEFAULT_STATE = [
  {
    ...DEFAULT_COMMON_PROPS,
    label: "a",
    size: 3,
  },
  {
    ...DEFAULT_COMMON_PROPS,
    label: "b",
    size: 5,
  },
  {
    ...DEFAULT_COMMON_PROPS,
    label: "c",
    size: 4,
  },
];

export type Bucket = {
  contains: number;
  isDroppable: boolean;
  isSelected: boolean;
  label: string;
  size: number;
};

export type UseBuckets = {
  readonly buckets: Bucket[];
  resetBuckets: () => void;
  updateBucket: (data: Partial<Bucket>, label: string) => void;
};

export const useBuckets = create<UseBuckets>((set) => ({
  buckets: DEFAULT_STATE,

  resetBuckets: () => {
    set(() => ({
      buckets: DEFAULT_STATE,
    }));
  },

  updateBucket: (data: Partial<Bucket>, label: string) => {
    set(({ buckets }) => ({
      buckets: R.map((bucket: Bucket) =>
        bucket.label === label ? R.mergeLeft(data, bucket) : bucket,
      )(buckets),
    }));
  },
}));
