import * as R from "ramda";

import type { Vector2 } from "@use-gesture/core/dist/declarations/src/types";

export const isIntersected = (
  ref: React.MutableRefObject<any>,
  [x, y]: Vector2,
) => {
  if (ref.current) {
    const { height, left, top, width } = ref.current.getBoundingClientRect();

    return R.and(
      // intersected by Y
      R.and(R.gt(y, top), R.lt(y, R.sum([height, top]))),
      // intersected by X
      R.and(R.gt(x, left), R.lt(x, R.sum([left, width]))),
    );
  }
};
