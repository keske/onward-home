import * as R from "ramda";
import create from "zustand";

type Action = "dump" | "fill";

type Type = "bucket" | "water";

export type Store = {
  handleStart: () => void;
  readonly history: string[];
  historyAppend: (
    from: {
      label?: string;
      type: Type;
    },
    to: {
      label?: string;
      type: Type;
    },
    action: Action,
    incStep?: boolean,
  ) => void;
  readonly isStarted: boolean;
  resetGame: () => void;
  steps: number;
};

const useGame = create<Store>((set) => ({
  handleStart: () => {
    set(({ isStarted }) => ({
      isStarted: !isStarted,
    }));
  },

  history: [],

  historyAppend: (
    from: {
      label?: string;
      type: Type;
    },
    to: {
      label?: string;
      type: Type;
    },
    action: Action,
    incStep = true,
  ) => {
    set(({ history, steps }) => {
      const getMessage = (): string => {
        if (from.type === "bucket") {
          return `Transfer from 🪣 ${from.label?.toLocaleUpperCase()} to 🪣 ${to.label?.toLocaleUpperCase()}`;
        }

        if (from.type === "water") {
          return `${
            action.charAt(0).toUpperCase() + action.slice(1)
          } 🪣 ${to.label?.toLocaleUpperCase()} ${
            action === "dump" ? "to" : "from"
          } 🌊`;
        }

        return "";
      };

      return {
        history: R.append(getMessage(), history),
        steps: incStep ? steps + 1 : steps,
      };
    });
  },

  isStarted: false,

  resetGame: () => {
    set(() => ({
      history: [],
    }));
  },

  steps: 0,
}));

export default useGame;
