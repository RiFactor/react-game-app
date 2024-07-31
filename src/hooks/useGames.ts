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
  const [ordering, setOrdering] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);

    const { request, cancel } = gameService.getAllGames<IFetchGamesResponse>({
      searchGameName,
      selectedGenre,
      selectedPlatform,
      ordering,
    });

    request
      .then((res) => {
        setGames(res.data.results);
        setIsLoading(false);
      })
      .catch((err) => {
        // ToDo hook?
        if (err instanceof CanceledError) return;
        setError((err as AxiosError).message);
        console.error("Error fetching games", err);
        setIsLoading(false);
      });

    return () => {
      cancel();
    };
  }, [selectedGenre, searchGameName, selectedPlatform, ordering]);

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
    setOrdering,
  };
};

export default useGames;
