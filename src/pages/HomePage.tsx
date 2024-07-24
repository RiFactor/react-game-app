import { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import axios from "axios";
import GameCard from "../components/GameCard";
import { useNavigate } from "react-router-dom";
import { FieldValues } from "react-hook-form";

export type Platform = {
  id: number;
  name: string;
  // slug: string;
};

export type PlatformObject = {
  platform: Platform;
};

export type Game = {
  id: number;
  slug: string;
  name: string;
  background_image: string;
  parent_platforms: any;
};

export const baseUrl = "https://api.rawg.io/api";
let apiKey: string;

if (typeof process !== "undefined" && process.env.REACT_APP_API_KEY) {
  apiKey = process.env.REACT_APP_API_KEY;
} else {
  apiKey = "eb2ec1af874049fdb938b0a822c82e58";
}

export const keyString = `?key=${apiKey}`;

const HomePage = () => {
  //Layout

  const [games, setGames] = useState<Game[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>(); // UX decide whether to unselect when clicking again or have reset option
  const [searchGameName, setSearchGameName] = useState<string>("");
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<
    string | undefined
  >();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const { data } = await axios.get(
          //extract the api key to .env
          // `${baseUrl}/games${keyString}&genres=action`
          `${baseUrl}/games${keyString}`,
          {
            params: {
              genres: selectedGenre,
              search: searchGameName,
              parent_platforms: selectedPlatform, // id can be string or number?
            },
          }
        );
        console.log(data.results, "games"); // ToDo Destructure further?
        setGames(data.results);
      } catch (err) {
        console.error("Error fetching games", err);
      }
    };

    const fetchPlatforms = async () => {
      try {
        const { data } = await axios.get(
          `${baseUrl}/platforms/lists/parents${keyString}`
        ); // NB: parent_platforms (not platforms)
        setPlatforms(data.results);
      } catch (err) {
        console.error("Error fetching platforms", err);
      }
    };

    fetchGames();
    fetchPlatforms();
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
      <div className="flex flex-col gap-2 bg-emerald-500">
        <h1 className="flex flex-row font-bold bg-emerald-400">Games</h1>
        {/* Extract Select */}
        <select
          onChange={(e) => {
            // ToDo reset genre and gamename here?
            setSelectedPlatform(e.target.value);
          }}
        >
          {/* <option value={undefined}>Select Platform...</option> // need to be able to reset */}
          {platforms?.map((platform) => {
            return (
              <option key={platform.id} value={platform.id}>
                {platform.name}
              </option>
            );
          })}
        </select>
        {/* dropdown for order by: */}
        {/* ToDo Pagination */}

        {games === undefined || games.length === 0 ? (
          <p className="font-bold">No Games Found</p>
        ) : (
          games?.map((game) => {
            return (
              <GameCard
                key={game.id}
                game={game}
                onClick={() => handleSelectGame(game.slug)}
              />
            );
          })
        )}
      </div>
    </MainLayout>
  );
};

export default HomePage;
