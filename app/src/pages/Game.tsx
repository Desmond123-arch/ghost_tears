import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "react-router-dom";

type InputData = {
  disabled: boolean;
};
//Game Logic
// send request to get the particular room after page has loaded

//set a get request to be allowed access into room
//don't forget to wait for the opponent

const Game = () => {
  const roomId = useParams().roomId;
  const [time, setTime] = useState<number>(10);
  const [word, setWord] = useState<string[]>([]);
  const [inputList, setInputList] = useState<InputData[]>([
    { disabled: false },
  ]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [nextButtonPressed, SetnextButtonPressed] = useState<boolean>(false);

  //get enter room through api
  //add a letter after a person has entered a word
  function addLetterBox(disabled: boolean) {
    setInputList([...inputList, { disabled }]);
    SetnextButtonPressed(true);
  }
  const LetterEntered = (letter: string) => {
    setWord([...word, letter]); //append words to array
    setDisabled(true);
    setTime(0);
    addLetterBox(disabled);
  };
  //if word box is full submit for checking if word is valid
  function wordComplete() {
    setInputList(inputList.slice(word.length));
    console.log(word.join(''));
  }
  //animation
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
