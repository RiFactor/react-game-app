import { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import GameCard from "../components/GameCard";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import PlatformDropdown from "../components/PlatformDropdown";
import { Game, Platform } from "../types/apiTypes";
import { AxiosError, CanceledError } from "../services/api-client";
import gameService from "../services/game-service";
import platformService from "../services/platform-service";

//Layout
// ToDo clean up other calls
// Tip: Broswer Components -> see state updating
// NB finally doesn't work on strictMode for setting setIsLoading(false)
// UX decide whether to unselect when clicking again or have reset option
// Tip: Browser -> Network -> Fetch/XHR( XML HTTP Request) to see requests
// get async -> await promise -> res / err
// can use try-catch async-await
// Where to set isLoading(true)
// user-friendly error messages
/* dropdown for order by: */
// * ToDo Pagination */

const HomePage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>();
  const [searchGameName, setSearchGameName] = useState<string>("");
  const [platforms, setPlatforms] = useState<Platform[]>([]); // NB: parent_platforms (not platforms)
  const [selectedPlatform, setSelectedPlatform] = useState<
    string | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const { request, cancel } = gameService.getAllGames({
      searchGameName,
      selectedGenre,
      selectedPlatform,
    });
    request
      .then((res) => {
        setGames(res.data.results);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError((err as AxiosError).message);
        console.error("Error fetching games", err);
        setIsLoading(false);
      });

    const { platformRequest, platformCancel } =
      platformService.getAllPlatforms();
    platformRequest
      .then((res: any) => {
        setPlatforms(res.data.results);
        setIsLoading(false);
      })
      .catch((err: AxiosError) => {
        if (err instanceof CanceledError) return;
        console.error("Error fetching platforms", err);
        setIsLoading(false);
      });

    return () => {
      cancel();
      platformCancel();
    };
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
        {error && <p className="text-red-500">{error}</p>}
        <h1 className="flex font-bold bg-emerald-400">Games</h1>
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

        {isLoading ? (
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
        )}
      </div>
    </MainLayout>
  );
};

export default HomePage;
