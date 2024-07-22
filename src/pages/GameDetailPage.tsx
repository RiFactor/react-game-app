import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl, Game, keyString } from "./HomePage";

const GameDetailPage = () => {
  const [selectedGame, setSelectedGame] = useState<Game>();
  const {
    gameId, // need to destructure
  } = useParams<{ gameId: string }>();

  useEffect(() => {
    axios
      .get(`${baseUrl}/games/${gameId}${keyString}`)
      .then((res) => {
        setSelectedGame(res.data);
      })
      .catch((err) => console.error("Error fetching game detail", err));
  }, [gameId]);

  return <div>{selectedGame?.name}</div>;
};

export default GameDetailPage;
