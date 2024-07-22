// import { Navigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
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
      {/* <Navigate to="/:gameid" replace={true}></Navigate> */}
      <Button onClick={onClick}>More</Button>
    </div>
  );
};

export default GameCard;
