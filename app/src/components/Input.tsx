import React, { useState } from "react";
interface letterFunc{
  letterEntered: any
  disabled: boolean
  id: string
}

const Input:React.FC<letterFunc> = ({letterEntered, disabled, id}) => {
  const [input, setInput] = useState<string>("");
  function checkInput(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value.replace(/[^a-zA-Z]/g, "").toUpperCase();
    setInput(newValue);
    if (newValue.length > 0)
    {
      letterEntered(newValue);
    }
  }
  return (
    <div>
      <label htmlFor={id} className="hidden"></label>
      <input
        name="letter"
        id={id}
        type="text"
        autoComplete="one-time-code"
        inputMode="text"
        maxLength={1}
        onChange={checkInput}
        value={input}
        className="w-16 h-16 text-4xl font-bold text-center border rounded-xl shadow-lg"
        disabled={disabled}
      ></input>
    </div>
  );
};

export default Input;
