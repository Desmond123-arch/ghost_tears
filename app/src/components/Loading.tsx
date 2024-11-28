import { jelly } from "ldrs";
import React from "react";
jelly.register();

interface LoadingProps {
  size: number;
}

const Loading: React.FC<LoadingProps> = ({ size }) => {
  return (
    <div className="bg-[#0006] w-screen h-screen absolute top-0 left-0 z-20">
      <div className="center">
        <l-jelly size={size} speed="0.9" color="black" l-jelly></l-jelly>
      </div>
    </div>
  );
};

export default Loading;
