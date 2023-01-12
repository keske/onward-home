import React from "react";

type Props = {
  progress: number;
};

const ProgressBar: React.FC<Props> = ({ progress }) => (
  <span className="relative inline-block h-full w-1 overflow-hidden rounded-lg bg-white">
    <span
      className="absolute bottom-0 w-full rounded-lg bg-blue-500 transition-all duration-200"
      style={{
        height: progress * 100 + "%",
      }}
    />
  </span>
);

export default ProgressBar;
