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
  ) => void;
  readonly isStarted: boolean;
  resetGame: () => void;
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
  ) => {
    set(({ history }) => {
      const getMessage = (): string => {
        if (from.type === "bucket") {
          return `Transfer from 🪣 ${from.label?.toLocaleUpperCase()} to 🪣 ${to.label?.toLocaleUpperCase()}`;
        }

        if (from.type === "water") {
          return `${action} 🪣 ${to.label?.toLocaleUpperCase()} ${
            action === "dump" ? "to" : "from"
          } 🌊`;
        }

        return "";
      };

      return {
        history: R.append(getMessage(), history),
      };
    });
  },

  isStarted: false,

  resetGame: () => {
    set(() => ({
      history: [],
    }));
  },
}));

export default useGame;
