import { MdComputer } from "react-icons/md";
import { Game } from "../pages/HomePage";
import { FaPlaystation, FaXbox } from "react-icons/fa";

interface Props {
  game: Game;
  onClick: () => void;
}

const GameCard = ({ game, onClick }: Props) => {
  return (
    <div onClick={onClick} className="cursor-pointer w-60">
      <img
        // ToDo increase size
        className="object-fill"
        src={game?.background_image}
        alt="background_image"
      />
      {game.name}
      <div className="flex gap-2">
        {game.parent_platforms?.map(({ platform }: any) => {
          return (
            <p key={platform.id}>
              {platform?.name === "PC" ? (
                <MdComputer />
              ) : platform?.name === "PlayStation" ? (
                <FaPlaystation />
              ) : platform?.name === "Xbox" ? (
                <FaXbox />
              ) : (
                `platforms: ${platform.name}`
              )}
            </p> // lastly - map to icons
          );
        })}
      </div>
    </div>
  );
};

export default GameCard;
