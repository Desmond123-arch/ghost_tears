import { jelly } from "ldrs";
jelly.register();

const Loading = () => {
  return (
    <div className="center">
      <l-jelly size="100" speed="0.9" color="black" l-jelly></l-jelly>
    </div>
  );
};

export default Loading;
