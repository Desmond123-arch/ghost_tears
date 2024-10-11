import React, { useState } from "react";
interface letterFunc{
  letterEntered: any
}

const Input:React.FC<letterFunc> = ({letterEntered}) => {
  const [input, setInput] = useState<string>("");
  function checkInput(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value.replace(/[^a-zA-Z]/g, "").toUpperCase();
    setInput(newValue);
    letterEntered(newValue);
  }
  return (
    <div>
      <label htmlFor="letter" className="hidden"></label>
      <input
        id="letter"
        name="letter"
        type="text"
        autoComplete="one-time-code"
        inputMode="text"
        maxLength={1}
        onChange={checkInput}
        value={input}
        className="w-16 h-16 text-4xl font-bold text-center border rounded-xl shadow-lg"
      ></input>
    </div>
  );
};

export default Input;
