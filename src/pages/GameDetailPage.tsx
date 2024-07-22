import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl, Game, keyString } from "./HomePage";

const GameDetailPage = () => {
  const [selectedGame, setSelectedGame] = useState<Game>();
  const { gameId } = useParams();

  useEffect(() => {
    axios
      .get(`${baseUrl}/games/${gameId}${keyString}`)
      .then((res) => {
        setSelectedGame(res.data);
      })
      .catch((err) => console.error("Error fetching game detail", err));
  }, [gameId]);

  // const handleSelectGame = (gameId: string) => {};

  return <div>{selectedGame?.name}</div>;
};

export default GameDetailPage;
