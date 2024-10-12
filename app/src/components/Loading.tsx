import { jelly } from "ldrs";
import React from "react";
jelly.register();

interface LoadingProps{
  size: number
}

const Loading: React.FC<LoadingProps> = ({size}) => {
  return (
    <div className="center">
      <l-jelly size={size} speed="0.9" color="black" l-jelly></l-jelly>
    </div>
  );
};

export default Loading;
