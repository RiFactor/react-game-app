import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Game } from "../types/apiTypes";
import apiClient from "../services/api-client";

const GameDetailPage = () => {
  const [selectedGame, setSelectedGame] = useState<Game>();
  const {
    gameId, // need to destructure
  } = useParams<{ gameId: string }>();

  useEffect(() => {
    apiClient
      .get(`/games/${gameId}`)
      .then((res) => {
        setSelectedGame(res.data);
      })
      .catch((err) => console.error("Error fetching game detail", err));
  }, [gameId]);

  return (
    <div>
      {selectedGame?.name}
      <img
        width={900}
        height={900}
        src={selectedGame?.background_image}
        alt="background_image"
      />
    </div>
  );
};

export default GameDetailPage;
