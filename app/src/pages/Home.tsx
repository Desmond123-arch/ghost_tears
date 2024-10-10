const Home = () => {
  return (
    <div data-theme="cyberpunk">
      <div className="card-body border w-[90%] md:w-max center bg-yellow-200 rounded-3xl shadow-lg text-center">
        <h2 className="card-title text-6xl line-clamp-2">
          👻
        </h2>
        <h2 className="card-title text-6xl line-clamp-2">
          Ghost Tears
        </h2>
        <p>A spooky multiplayer experience</p>
        <div className="card-actions justify-center">
          <button className="btn rounded-xl">Play now</button>
        </div>
      </div>
      <div className="mt-8 flex space-x-4 center top-[75%] md:top-[65%]">
        {['😱', '💀', '🎃'].map((emoji, index) => (
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
