import { SimpleGrid } from "@chakra-ui/react";
import Dropdown from "./Dropdown";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCard from "./GameCard";
import { Game } from "../types/apiTypes";
import { Platform } from "../hooks/usePlatforms";

interface IProps {
  games: Game[];
  isLoading: any;
  error: any;
  platforms: Platform[];
  onSelectPlatform: (platform: string | undefined) => void;
  setOrdering: (value: any) => void;
  onSearchGameName: (value: any) => void;
  onSelectGenre: (value: any) => void;
  onSelectGame: (gameSlug: string) => void;
}

export const skeletons = [1, 2, 3, 4, 5, 6]; // arbitrary value
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

const GameGrid = ({
  games,
  isLoading,
  error,
  platforms,
  onSelectPlatform,
  setOrdering,
  onSearchGameName,
  onSelectGenre,
  onSelectGame,
}: IProps) => {
  return (
    <div className="flex flex-col gap-2">
      {error && <p className="text-red-500">{error}</p>}
      <h1 className="flex font-bold text-5xl">Games</h1>
      <div className="flex gap-2">
        <Dropdown
          setSelectedValue={(platform: string | undefined) => {
            onSelectPlatform(platform !== "" ? platform : undefined); // can't pass undefined as a value
            setOrdering(undefined);
            onSearchGameName("");
            onSelectGenre(null);
          }}
          defaultOption="Select Platform..."
          options={platforms}
        ></Dropdown>
        <Dropdown
          setSelectedValue={(ordering: string | undefined) => {
            setOrdering(ordering !== "" ? ordering : undefined);
            // ToDo keep selected platform or reset?
            onSearchGameName("");
            // ToDo fix resettting dropdown filter errors
            onSelectGenre(null);
            onSelectPlatform(undefined);
          }}
          defaultOption="Order by: ..."
          options={orderingOptions}
        />
      </div>

      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        spacing={3}
        padding="0.5rem"
      >
        {isLoading &&
          skeletons.map((s) => (
            <GameCardContainer key={s}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))}
        {games?.map((game) => {
          return (
            <GameCardContainer key={game.id}>
              <GameCard game={game} onClick={() => onSelectGame(game.slug)} />
            </GameCardContainer>
          );
        })}
      </SimpleGrid>
    </div>
  );
};

export default GameGrid;
