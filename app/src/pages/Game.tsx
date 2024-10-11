import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { AnimatePresence, motion } from "framer-motion";

type InputData = {
  disabled: boolean;
};

const Game = () => {
  const [time, setTime] = useState<number>(10);
  const [word, setWord] = useState<string[]>([]); 
  const [inputList, setInputList] = useState<InputData[]>([
    { disabled: false },
  ]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [nextButtonPressed, SetnextButtonPressed] = useState<boolean>(false);

  function addLetterBox(disabled: boolean) {
    setInputList([...inputList, { disabled }]);
    SetnextButtonPressed(true);
  }
  const LetterEntered = (letter: string) => {
    setWord([...word, letter]);
    setDisabled(true);
    setTime(0);
    addLetterBox(disabled);
  };
  function wordComplete() {
    setInputList(inputList.slice(word.length));
    console.log(word.join(''));
  }
  const variants = {
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut",
        duration: 0.5,
      },
    },
    hide: {
      y: -20,
      opacity: 0,
    },
  };

  useEffect(() => {
    if (time === 0) {
      setDisabled(true);
      return;
    }
    const interval = setInterval(
      () => setTime((prevTime) => prevTime - 1),
      1000
    );
    return () => clearInterval(interval);
  }, [time]);
  return (
    <div>
      <AnimatePresence>
        <motion.div
          className={`mx-auto w-max mt-10 font-bold text-4xl p-3 ${
            time > 2 ? "text-green-500" : "text-red-500"
          }`}
          key={time}
          variants={variants}
          animate={"show"}
          initial="hide"
        >
          {time && time >= 0 ? <p>{time}</p> :
          (
            (nextButtonPressed)? <p>Waiting for opponent</p>: <p>Timeout</p>
          )
          }
        </motion.div>
      </AnimatePresence>
      <div className="center  w-full flex justify-center gap-2">
        {inputList.map((inputData, index) => (
          <Input
            key={index} // unique key for each input
            letterEntered={LetterEntered}
            disabled={disabled}
            id={index.toString()}
          />
        ))}
      </div>
      <div className="center top-[55%] w-[30%] flex flex-row gap-5 justify-center">
        <button
          className=" rounded-xl  p-3 bg-yellow-300 hover:bg-yellow-500 shadow-sm disabled:bg-yellow-600"
          onClick={() => {
            addLetterBox(false);
          }}
          disabled={disabled || nextButtonPressed}
        >
          Next
        </button>
        <button
          className=" rounded-xl  p-3 bg-yellow-300 hover:bg-yellow-500 shadow-sm disabled:bg-yellow-600"
          onClick={() => {
            wordComplete();
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
};
export default Game;
