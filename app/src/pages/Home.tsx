import { useState } from "react";
import GameForm, { newGameForms } from "../components/gameForm";
import GameLink from "../components/game_link";

const Home = () => {
  const [IsOpen, setIsOpen] = useState(false);
  const [gettingLink, setgettingLink] = useState(false);

  const handleShowChange = (newShow: boolean) => {
    setIsOpen(newShow);
  };
  const createGame = (category: newGameForms) => {
    // console.log("game created")
    console.log(category);
    //maybe change difficulties here or something
    startGame();
  };
  const startGame = async () => {
    //function that gets invite link from api(room id)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setgettingLink(true);
    setIsOpen(false);
    return "/2";
  };

  return (
    <div data-theme="cyberpunk">
      <div className="card-body border w-[90%] md:w-max center bg-yellow-200 rounded-3xl shadow-lg text-center">
        <h2 className="card-title text-6xl line-clamp-2">👻</h2>
        <h2 className="card-title text-6xl line-clamp-2">Ghost Tears</h2>
        <p>A spooky multiplayer experience</p>
        <div className="card-actions justify-center">
          <button
            className="btn rounded-xl"
            onClick={() => {
              setIsOpen(!IsOpen);
            }}
          >
            Play now
          </button>
        </div>
      </div>
      <div className="">
        {/** If GameForm is open hide the Game link and vice versa */}
        {/*   */}

        {gettingLink ? (
          <GameLink gameInviteLink={"http://localhost:5173/game/1"} />
        ) : (
          <GameForm
            show={IsOpen}
            onShowChange={handleShowChange}
            createGame={createGame}
          />
        )}
      </div>
      <div className="mt-8 flex space-x-4 center top-[75%] md:top-[65%]">
        {["😱", "💀", "🎃"].map((emoji, index) => (
          <div
            key={index}
            className="text-4xl animate-pulse"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {emoji}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
