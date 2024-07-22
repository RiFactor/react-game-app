import { Game } from "../pages/HomePage";
import Button from "./Button";

interface Props {
  game: Game;
  onClick: () => void;
}

const GameCard = ({ game, onClick }: Props) => {
  return (
    <div>
      {game.name}
      <Button onClick={onClick}>More</Button>
    </div>
  );
};

export default GameCard;
