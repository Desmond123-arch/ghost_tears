import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
//[] modify to use api to request for possible categories later on

interface GameFormProps {
  show: boolean;
  onShowChange: (newShow: boolean) => void;
}
interface newGameForms {
  category: string;
  guessTime: number;
  rounds: number;
}
interface Errors {
  [key: string]:string;
}


const GameForm: React.FC<GameFormProps> = ({ show, onShowChange }) => {
  const [selectedCategory, SetSelectedCategory] = useState<string>("");
  const [selectedSeconds, setselectedSeconds] = useState<number>(3);
  const [numOfRounds, setnumOfRounds] = useState<number>(3);
  const [errors, setErrors] = useState<Errors>({});

  const handleShow = () => {
    onShowChange(false);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let validationErrors: { [key: string]: string } = {};
    if (selectedCategory.length === 0) {
      validationErrors.selectedCategory = "No category selected"
    }
    if (Object.keys(validationErrors).length > 0)
    {
      setErrors(prev => ({
        ...prev,
        ...validationErrors
      }))
      console.log(errors);
    }
    else{
      const categories: newGameForms = {
        category: selectedCategory,
        guessTime: selectedSeconds,
        rounds: numOfRounds,
      };

    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="bg-yellow-200 card rounded-xl shadow-xl border-yellow-400"
          initial={{ opacity: 0, y: "-50%" }}
          animate={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 0, y: "50%" }}
          transition={{ duration: 0.5 }}
        >
          <button onClick={handleShow} className="ml-auto text-2xl px-4">
            &times;
          </button>
          <div className="mx-auto underline underline-offset-8 text-2xl md:w-max text-center">
            Settings
          </div>
          <form className="card-body pt-3" onSubmit={handleSubmit}>
            <select
              className="select w-full bg-yellow-200 border rounded-md shadow-md"
              onChange={(e) => SetSelectedCategory(e.target.value)}
              value={selectedCategory}
              name="categories"
            >
              <option disabled value="">
                Pick your Category
              </option>
              <option value={"Marvel Heros"}>Marvel Heros</option>
              <option value={"DC Heros"}>DC Heros</option>
            </select>
            {errors.selectedCategory && <p className="text-center">{errors.selectedCategory}</p>}
            <h3 className="text-center text-lg font-normal mt-3  underline underline-offset-8">
              Guess time
            </h3>
            <div className="flex  gap-2 w-max mx-auto">
              <label htmlFor="3secs">3 seconds</label>
              <input
                type="radio"
                name="radio-time"
                className="radio bg-yellow-500"
                id="3secs"
                defaultChecked
                onChange={() => setselectedSeconds(3)}
              />
            </div>
            <div className="flex  gap-2 w-max mx-auto">
              <label htmlFor="5secs">5 seconds</label>
              <input
                type="radio"
                name="radio-time"
                className="radio bg-yellow-500"
                id="5secs"
                onChange={() => setselectedSeconds(5)}
              />
            </div>
            <h3 className="text-center text-lg font-normal mt-3  underline underline-offset-8">
              Number of Rounds
            </h3>
            <div className="flex">
              <div className="flex  gap-2 w-max mx-auto">
                <label htmlFor="3rounds">3</label>
                <input
                  type="radio"
                  name="radio-rounds"
                  className="radio bg-yellow-500"
                  id="3rounds"
                  defaultChecked
                  onChange={() => setnumOfRounds(3)}
                />
              </div>
              <div className="flex  gap-2 w-max mx-auto">
                <label htmlFor="5rounds">5</label>
                <input
                  type="radio"
                  name="radio-rounds"
                  className="radio bg-yellow-500"
                  id="5rounds"
                  onChange={() => setnumOfRounds(5)}
                />
              </div>
            </div>
            <button className="btn rounded-md" type="submit">
              Start
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameForm;
