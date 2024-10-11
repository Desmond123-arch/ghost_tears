import { useEffect, useState } from "react";
import Input from "../components/Input";
import { AnimatePresence, motion } from "framer-motion";

const Game = () => {
  const word: string[] = []
  const LetterEntered = (letter: string) => {
    word.push(letter)
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
  const [time, setTime] = useState<number>(3);

  useEffect(() => {
    if (time === 0)
    {
        return;
    }
    const interval= setInterval(() => setTime((prevTime) => prevTime - 1), 1000);
    return () => clearInterval(interval);
  }, [time])
  return (
    <div>
      <AnimatePresence>
        {time && (
          <motion.div
            className={`mx-auto w-max mt-10 font-bold text-4xl p-3 ${(time > 2) ? 'text-green-500': 'text-red-500'}`}
            key={time}
            variants={variants}
            animate={'show'}
            initial="hide"
          >
            {time}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="center  w-full flex justify-center gap-2">
        <Input letterEntered={LetterEntered}/>
        <Input letterEntered={LetterEntered}/>
        <Input letterEntered={LetterEntered} />
        <Input letterEntered={LetterEntered}/>
        <Input letterEntered={LetterEntered}/>
        <Input letterEntered={LetterEntered}/>
      </div>
    </div>
  );
};

export default Game;
