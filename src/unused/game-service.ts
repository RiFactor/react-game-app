import { Genre } from "../hooks/useGenres";
import apiClient from "../services/api-client";

interface IProps {
  selectedGenre: Genre | null;
  searchGameName: string | undefined;
  selectedPlatform: string | undefined;
  ordering: string | undefined;
}

class GameService {
  getAllGames<T>({
    searchGameName,
    selectedGenre,
    selectedPlatform,
    ordering,
  }: IProps) {
    const controller = new AbortController();

    const request = apiClient.get<T>("/games", {
      params: {
        genres: selectedGenre,
        search: searchGameName,
        parent_platforms: selectedPlatform, // id can be string or number?
        ordering: ordering,
      },
    });
    return { request, cancel: () => controller.abort() };
  }
}

export default new GameService();
