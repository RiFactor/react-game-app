import { Game } from "../pages/HomePage";

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
      {game.parent_platforms?.map((p: any) => {
        return (
          <p key={p.platform.id}>platforms: {p.platform.name}</p> // lastly - map to icons
        );
      })}
    </div>
  );
};

export default GameCard;
