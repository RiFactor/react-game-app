import { Game } from "../types/apiTypes";
import useData from "./useData";

interface IFetchGamesResponse {
  count: number;
  results: Game[];
}

// const [games, setGames] = useState<Game[]>([]);
// const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
// const [selectedPlatform, setSelectedPlatform] = useState<

const useGames = (
  searchGameName?: any,
  selectedGenre?: any,
  selectedPlatform?: any,
  ordering?: any // ToDo datatypes
) =>
  useData<Game>(
    "/games",
    {
      params: {
        search: searchGameName,
        genres: selectedGenre?.id,
        parent_platforms: selectedPlatform,
        ordering,
      },
    },
    [selectedGenre, searchGameName, selectedPlatform, ordering]
  );

// return {
// data
// games,
// searchGameName,
// selectedGenre,
// selectedPlatform,
// isLoading,
// error,
// setSearchGameName,
// setSelectedGenre,
// setSelectedPlatform,
// setOrdering,
// };

export default useGames;
