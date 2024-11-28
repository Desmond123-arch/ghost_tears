import React, { useEffect, useState, useParams } from "react";
import io from "socket.io-client";
import { AnimatePresence, motion } from "framer-motion";

const socket = io("http://localhost:3000");

const Game = () => {
  const [text, setText] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [myTurn, setMyTurn] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    console.log(e.target.value);
    socket.emit("letterEntered", e.target.value);
    setDisabled(true);
  };
  //Entering a room with id
  async function EnterRoom(roomId: string) {
    console.log("entering room: ", roomId);
    await new Promise((resolve) => setTimeout(resolve, 10000)); // simulating request, replace later
  }

  useEffect(() => {
    socket.on("beginGame", () => {
      setText("");
      setMyTurn(false);
      setDisabled(true);
    });
    socket.on("letterReceived", (letter: string) => {
      setText(letter);
      setDisabled(false);
      setMyTurn(true);
      setTime(10);
    });
    socket.on("roundEnded", () => {
      setDisabled(true);
      setMyTurn(false);
      setTime(-1);
    });
    return () => {
      socket.off("letterReceived");
      socket.off("beginGame");
    };
  }, []);
  useEffect(() => {
    if (time > 0) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    }

    if (time === 0) {
      setDisabled(true);
      socket.emit("letterEntered", text);
    }

    // Explicitly stop any further updates if time is -1
    if (time === -1) {
      setDisabled(true);
    }
  }, [text, time]);

  const handleSubmit = () => {
    setMyTurn(false);
    setDisabled(true);
    socket.emit("submit", text);
    socket.off("submit");
  };

  return (
    <div>
      {time > 0 && (
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
            {!disabled && <p> {time} </p>}
          </motion.div>
        </AnimatePresence>
      )}
      {disabled && (
        <p
          className={`mx-auto w-max mt-10 font-bold text-4xl p-3 ${
            time > 2 ? "text-green-500" : "text-red-500"
          }`}
        >
          Waiting for opponent
        </p>
      )}
      <div className="center w-full flex justify-center gap-2">
        <input
          type="text"
          name="text"
          value={text}
          onChange={handleInput}
          disabled={disabled}
          className="disabled:bg-yellow-900 text-4xl font-bold text-center border rounded-xl shadow-lg py-2"
        />
      </div>
      <button
        className="center top-[50%] border border-yellow-800 text-xl p-3 rounded-md"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default Game;
