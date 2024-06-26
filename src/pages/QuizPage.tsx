import React, { useState } from "react";

import whoIsThatPokemonSound from "../../public/who-s-that-pokemon.mp3";
import backgroundImage from "../../public/who-s-that-pokemon-bg.jpeg";
import TrainQuiz from "../components/QuizPage/TrainQuiz";
import ScoreQuiz from "../components/QuizPage/ScoreQuiz";

import useMute from "../context/usePoke";
import MuteButton from "../components/QuizPage/MuteButton";

function playWhoIsThatPokemonSound(isMuted: boolean) {
  if (!isMuted) {
    new Audio(whoIsThatPokemonSound).play();
  }
}

const QuizPage: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(true);
  const [mode, setMode] = useState<string>("score");
  const { isMuted } = useMute();

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(e.target.value);
  };

  const handlePlayClick = () => {
    setShowModal(false);
    playWhoIsThatPokemonSound(isMuted);
  };

  return (
    <div className="parent-div-QuizPage-includes-modal h-full">
      {showModal && (
        <div
          style={{ backgroundImage: `url(${backgroundImage})` }}
          className="z-10 h-full w-full bg-cover"
        >
          <div className="flex items-center justify-center h-full pt-4 px-4 pb-20 text-center">
            <div className="align-bottom bg-white dark:bg-slate-700 rounded-lg text-left overflow-hidden transform p-10 flex flex-col gap-5">
              <div>
                <div className="text-center text-black">
                  <h3 className="text-lg font-press-start font-medium text-black dark:text-white mb-5">
                    Who's that Pokémon?!
                  </h3>
                  <div className="flex flex-col gap-3 text-center text-white">
                    <p className="text-sm">
                      Chose your play mode and click the play button below to
                      start the quiz!
                    </p>
                    <p className="text-sm">
                      (Don't forget to click the mute button if you're not in
                      the mood for sound)
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-row justify-center text-black dark:bg-slate-700">
                <select
                  className="rounded-full dark:bg-slate-700 dark:text-white"
                  onChange={handleModeChange}
                  value={mode}
                >
                  <option value="score">Score Quiz</option>
                  <option value="train">Train Quiz</option>
                </select>
                <button
                  onClick={handlePlayClick}
                  type="button"
                  className="w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-slate-800 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Play
                </button>
                <MuteButton />
              </div>
            </div>
          </div>
        </div>
      )}

      {!showModal && (
        <div className="div-from-QuizPage-containing components h-full">
          {mode === "score" ? <ScoreQuiz /> : <TrainQuiz />}
        </div>
      )}
    </div>
  );
};

export default QuizPage;
