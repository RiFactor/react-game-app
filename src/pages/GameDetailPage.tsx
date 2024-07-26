import useGameDetail from "../hooks/useGameDetail";

const GameDetailPage = () => {
  const { selectedGame } = useGameDetail();

  return (
    <div>
      {selectedGame?.name}
      <img
        width={500}
        height={500}
        src={selectedGame?.background_image}
        alt="background_image"
      />
    </div>
  );
};

export default GameDetailPage;
