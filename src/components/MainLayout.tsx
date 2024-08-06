import { Grid, GridItem, Show } from "@chakra-ui/react";
import GenreList from "./GenreList";
import NavBar from "./NavBar";
import useGames from "../hooks/useGames";
import usePlatforms from "../hooks/usePlatforms";
import { useNavigate } from "react-router-dom";
import { Genre } from "../hooks/useGenres";
import { useState } from "react";
import GameGrid from "./GameGrid";

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

const MainLayout = () => {
  const [searchGameName, setSearchGameName] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<
    string | undefined
  >();
  const [ordering, setOrdering] = useState<string | undefined>("");
  const { data, isLoading, error } = useGames(
    searchGameName,
    selectedGenre,
    selectedPlatform,
    ordering
  );

  const handleSearch = (data: string) => {
    setSelectedGenre(null);
    setSelectedPlatform(undefined);
    setSearchGameName(data);
  };

  const handleSelectGenre = (genre: Genre) => {
    setSearchGameName(""); // ToDo clear search bar text
    setSelectedPlatform(undefined);
    setSelectedGenre(genre);
  };

  // const handleResetFilters = () => {
  //   // ToDo is this neater to reset everything or will the order matter
  // };

  const { platforms } = usePlatforms();

  const navigate = useNavigate();

  const handleSelectGame = (gameId: string) => {
    navigate(`/${gameId}`);
  };

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        md: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
      className="gap-2 p-2"
    >
      <GridItem area="nav">
        <NavBar
          searchGameName={searchGameName}
          handleSearch={(data: string) => handleSearch(data)}
        />
      </GridItem>
      <Show above="md">
        <GridItem area="aside" paddingX={5}>
          <GenreList
            selectedGenre={selectedGenre}
            selectGenre={(genre: Genre) => handleSelectGenre(genre)}
          />
        </GridItem>
      </Show>
      <GridItem className="p-2" area="main">
        <GameGrid
          games={data}
          isLoading={isLoading}
          error={error}
          platforms={platforms}
          onSelectPlatform={(platform) => setSelectedPlatform(platform)}
          setOrdering={(order) => setOrdering(order)}
          onSearchGameName={(searchGameName) =>
            setSearchGameName(searchGameName)
          }
          onSelectGenre={(selectedGenre) => setSelectedGenre(selectedGenre)}
          onSelectGame={(selectedGame) => handleSelectGame(selectedGame)}
        />
      </GridItem>
    </Grid>
  );
};

export default MainLayout;
