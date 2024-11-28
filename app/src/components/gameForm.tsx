import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import Loading from "./Loading";
//[] modify to use api to request for possible categories later on

interface GameFormProps {
  show: boolean;
  onShowChange: (newShow: boolean) => void;
  createGame: (category: newGameForms) => void;
}
export interface newGameForms {
  category: string;
  guessTime: number;
  rounds: number;
}
interface Errors {
  [key: string]: string;
}

const GameForm: React.FC<GameFormProps> = ({
  show,
  onShowChange,
  createGame,
}) => {
  const [selectedCategory, SetSelectedCategory] = useState<string>("");
  const [selectedSeconds, setselectedSeconds] = useState<number>(3);
  const [numOfRounds, setnumOfRounds] = useState<number>(3);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleShow = () => {
    onShowChange(false);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    const validationErrors: { [key: string]: string } = {};
    if (selectedCategory.length === 0) {
      validationErrors.selectedCategory = "No category selected";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors((prev) => ({
        ...prev,
        ...validationErrors,
      }));
    } else {
      const categories: newGameForms = {
        category: selectedCategory,
        guessTime: selectedSeconds,
        rounds: numOfRounds,
      };
      setErrors({});
      createGame(categories);
    }
  };

  return (
    <AnimatePresence>
      {/* if we are showing the form*/}
      {show && (
        <>
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#0006] w-screen h-screen absolute"
          ></motion.div>
          <motion.div
            className="w-screen h-screen"
            initial={{ opacity: 0, y: "-50%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "50%" }}
            transition={{ duration: 0.5 }}
          >
            {/* check whether we are loading it after submission*/}
            {loading && Object.keys(errors).length === 0 ? (
              <p className="w-max mx-auto p-5">
                <Loading size={40} />
              </p>
            ) : (
              <div className="center bg-yellow-200 rounded-xl shadow-xl border-yellow-400">
                {/* otherwise show the form for filling*/}
                <div className="flex w-full items-end">
                  <button
                    onClick={handleShow}
                    className="ml-auto text-2xl px-4"
                  >
                    &times;
                  </button>
                </div>
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
                    <option value={"Marvel Heroes"}>Marvel Heroes</option>
                    <option value={"DC Heroes"}>DC Heroes</option>
                  </select>
                  {errors.selectedCategory && (
                    <p className="text-center">{errors.selectedCategory}</p>
                  )}
                  <h3 className="text-center text-lg font-normal mt-3 underline underline-offset-8">
                    Guess time
                  </h3>
                  <div className="flex gap-2 w-max mx-auto">
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
                  <div className="flex gap-2 w-max mx-auto">
                    <label htmlFor="5secs">5 seconds</label>
                    <input
                      type="radio"
                      name="radio-time"
                      className="radio bg-yellow-500"
                      id="5secs"
                      onChange={() => setselectedSeconds(5)}
                    />
                  </div>
                  <h3 className="text-center text-lg font-normal mt-3 underline underline-offset-8">
                    Number of Rounds
                  </h3>
                  <div className="flex">
                    <div className="flex gap-2 w-max mx-auto">
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
                    <div className="flex gap-2 w-max mx-auto">
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
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GameForm;
