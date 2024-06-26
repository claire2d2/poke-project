import { MouseEvent } from "react";
import useShiny from "../../context/usePoke";

const ShinyButton = () => {
  const { isShiny, makeItShiny } = useShiny();

  const teamShiny = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault;
    makeItShiny(isShiny);
  };

  return (
    <div>
      <button
        onClick={teamShiny}
        className={`rounded-full h-8 w-8 ${
          isShiny
            ? "bg-rose-400 dark:bg-rose-600 hover:bg-gray-300 active:bg-gray-500 transition-all"
            : "bg-gray-100 dark:bg-slate-500 hover:bg-rose-300 dark:hover:bg-rose-500 active:bg-rose-500 transition-all"
        }`}
      >
        ✨
      </button>
    </div>
  );
};

export default ShinyButton;
