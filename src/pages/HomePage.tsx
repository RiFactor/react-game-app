import { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import GameCard from "../components/GameCard";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import PlatformDropdown from "../components/PlatformDropdown";
import { Game, Platform } from "../types/apiTypes";
import { keyString } from "../constants/api";
import apiClient, { AxiosError, CanceledError } from "../services/api-client";

const HomePage = () => {
  //Layout
  // ToDo clean up other calls
  // Tip: Broswer Components -> see state updating

  const [games, setGames] = useState<Game[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>(); // UX decide whether to unselect when clicking again or have reset option
  const [searchGameName, setSearchGameName] = useState<string>("");
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<
    string | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Tip: Browser -> Network -> Fetch/XHR( XML HTTP Request) to see requests
    // get async -> await promise -> res / err
    const controller = new AbortController();

    const fetchGames = async () => {
      setIsLoading(true);
      try {
        const {
          data: { results },
        } = await apiClient.get(
          //extract the api key to .env
          // `${baseUrl}/games${keyString}&genres=action`
          `/games${keyString}`,
          // `/games`,
          {
            // headers: {
            //   // Authorization: `bearer${keyString}`,
            // },
            // headers: {
            //   Authorization: keyString,
            // },
            signal: controller.signal,
            params: {
              genres: selectedGenre,
              search: searchGameName,
              parent_platforms: selectedPlatform, // id can be string or number?
            },
          }
        );
        setGames(results);
        setIsLoading(false);
      } catch (err) {
        // type
        if (err instanceof CanceledError) return;
        setError((err as AxiosError).message);
        console.error("Error fetching games", err);
        setIsLoading(false);
      }
      // NB finally doesn't work on strictMode for setting setIsLoading(false)
    };

    const fetchPlatforms = async () => {
      setIsLoading(true);
      try {
        const {
          data: { results },
        } = await apiClient.get(`/platforms/lists/parents${keyString}`, {
          signal: controller.signal,
        }); // NB: parent_platforms (not platforms)
        setPlatforms(results);
        setIsLoading(false);
      } catch (err) {
        if (err instanceof CanceledError) return;
        console.error("Error fetching platforms", err);
        setIsLoading(false);
      }
    };

    fetchGames();
    fetchPlatforms();
    return () => controller.abort();
  }, [selectedGenre, searchGameName, selectedPlatform]);

  const navigate = useNavigate();

  const handleSelectGame = (gameId: string) => {
    navigate(`/${gameId}`);
  };
  // const handleResetFilters = () => {
  //   // ToDo is this neater to reset everything or will the order matter
  // };

  return (
    <MainLayout
      searchGameName={searchGameName}
      handleSearch={(data: string) => {
        setSelectedGenre(undefined);
        setSelectedPlatform(undefined);
        setSearchGameName(data);
      }} // ToDo not pass props here
      handleClick={(slug: string) => {
        setSearchGameName(""); // ToDo clear search bar text
        setSelectedPlatform(undefined);
        setSelectedGenre(slug);
      }}
    >
      <div className="flex flex-col gap-2 bg-emerald-500 w-screen">
        {/* ToDo user-friendly error messages */}
        {error && <p className="text-red-500">{error}</p>}
        <h1 className="flex font-bold bg-emerald-400">Games</h1>
        {/* Extract Select */}
        <PlatformDropdown
          setSelectedPlatform={(platform: string | undefined) => {
            setSelectedPlatform(
              platform !== "" ? platform : undefined // can't pass undefined as a value
            );
            setSearchGameName("");
            setSelectedGenre(undefined);
          }}
          platforms={platforms}
        />

        {/* dropdown for order by: */}
        {/* ToDo Pagination */}
        {
          isLoading ? (
            <Spinner />
          ) : (
            // {games === undefined || games.length === 0 ? (
            //   <p className="font-bold">No Games Found</p>
            // ) : (
            <div className="flex flex-wrap gap-5">
              {games?.map((game) => {
                return (
                  <GameCard
                    key={game.id}
                    game={game}
                    onClick={() => handleSelectGame(game.slug)}
                  />
                );
              })}
            </div>
          )
          // )
        }
      </div>
    </MainLayout>
  );
};

export default HomePage;
