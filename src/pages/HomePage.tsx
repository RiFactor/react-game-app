import MainLayout from "../components/MainLayout";
import GameCard from "../components/GameCard";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import PlatformDropdown from "../components/PlatformDropdown";
import useGames from "../hooks/useGames";
import usePlatforms from "../hooks/usePlatforms";

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
  const {
    games,
    searchGameName,
    // selectedGenre,
    // selectedPlatform,
    isLoading,
    error,
    setSearchGameName,
    setSelectedGenre,
    setSelectedPlatform,
  } = useGames();

  const { platforms } = usePlatforms();

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
      <div className="flex flex-col gap-2">
        {error && <p className="text-red-500">{error}</p>}
        <h1 className="flex font-bold text-5xl">Games</h1>
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

        {/* ToDo sort title shifting when loading */}
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
