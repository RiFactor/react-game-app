import { useEffect, useState } from "react";
import { Game } from "../types/apiTypes";
import { useParams } from "react-router-dom";
import apiClient, { CanceledError } from "../services/api-client";

const useGameDetail = () => {
  const [selectedGame, setSelectedGame] = useState<Game>();
  const {
    gameId, // need to destructure
  } = useParams<{ gameId: string }>();
  // error

  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .get(`/games/${gameId}`, { signal: controller.signal })
      .then((res) => {
        setSelectedGame(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.error("Error fetching game detail", err);
      });

    return () => controller.abort();
  }, [gameId]);

  return { selectedGame };
};

export default useGameDetail;
