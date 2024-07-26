import apiClient from "./api-client";

interface IProps {
  selectedGenre: string | undefined;
  searchGameName: string | undefined;
  selectedPlatform: string | undefined;
}

class GameService {
  getAllGames<T>({ searchGameName, selectedGenre, selectedPlatform }: IProps) {
    const controller = new AbortController();

    const request = apiClient.get<T>("/games", {
      signal: controller.signal,
      params: {
        genres: selectedGenre,
        search: searchGameName,
        parent_platforms: selectedPlatform, // id can be string or number?
      },
    });
    return { request, cancel: () => controller.abort() };
  }
}

export default new GameService();
