import React from "react";

import { useGame } from "@/stores/index";

export const History: React.FC = () => {
  const { history, steps } = useGame();

  return (
    <div className="absolute left-5 top-5 z-10">
      <div className="text-2xl font-bold uppercase text-white">
        Steps: {steps}
      </div>
      <ul className="mt-2 flex flex-col gap-2">
        {history.map((item, index) => (
          <li key={index}>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
