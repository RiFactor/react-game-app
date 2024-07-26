import { useEffect, useState } from "react";
import { Game } from "../types/apiTypes";
import gameService from "../services/game-service";
import { AxiosError, CanceledError } from "axios";

interface IFetchGamesResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [searchGameName, setSearchGameName] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>();
  const [selectedPlatform, setSelectedPlatform] = useState<
    string | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const { request, cancel } = gameService.getAllGames<IFetchGamesResponse>({
      searchGameName,
      selectedGenre,
      selectedPlatform,
    });
    request
      .then(({ data: { results } }) => {
        setGames(results);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError((err as AxiosError).message);
        console.error("Error fetching games", err);
        setIsLoading(false);
      });

    return () => {
      cancel();
    };
  }, [selectedGenre, searchGameName, selectedPlatform]);

  return {
    games,
    searchGameName,
    selectedGenre,
    selectedPlatform,
    isLoading,
    error,
    setSearchGameName,
    setSelectedGenre,
    setSelectedPlatform,
  };
};

export default useGames;
