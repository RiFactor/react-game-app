import MainLayout from "../components/MainLayout";
import GameCard from "../components/GameCard";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import usePlatforms from "../hooks/usePlatforms";
import Dropdown from "../components/Dropdown";

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
    setOrdering,
  } = useGames();

  const { platforms } = usePlatforms();

  const navigate = useNavigate();

  const handleSelectGame = (gameId: string) => {
    navigate(`/${gameId}`);
  };

  const orderingOptions = [
    // Add keys
    { id: "name", name: "name" },
    { id: "released", name: "released" },
    { id: "added", name: "added" },
    { id: "created", name: "created" },
    { id: "updated", name: "updated" },
    { id: "rating", name: "rating" },
    { id: "metacritic", name: "metacritic" },
    { id: "-name", name: "name desc" },
    { id: "-released", name: "released desc" },
    { id: "-added", name: "added desc" },
    { id: "-created", name: "created desc" },
    { id: "-updated", name: "updated desc" },
    { id: "-rating", name: "rating desc" },
    { id: "-metacritic", name: "metacritic desc" },
  ];

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
        <div className="flex gap-2">
          <Dropdown
            setSelectedValue={(platform: string | undefined) => {
              setSelectedPlatform(platform !== "" ? platform : undefined); // can't pass undefined as a value
              setOrdering(undefined);
              setSearchGameName("");
              setSelectedGenre(undefined);
            }}
            defaultOption="Select Platform..."
            options={platforms}
          ></Dropdown>
          <Dropdown
            setSelectedValue={(ordering: string | undefined) => {
              setOrdering(ordering !== "" ? ordering : undefined);
              // ToDo keep selected platform or reset?
              setSearchGameName("");
              // ToDo fix resettting dropdown filter errors
              setSelectedGenre(undefined);
              setSelectedPlatform(undefined);
            }}
            defaultOption="Order by: ..."
            options={orderingOptions}
          />
        </div>

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
