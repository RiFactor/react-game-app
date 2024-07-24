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
const apiKey = "eb2ec1af874049fdb938b0a822c82e58"; // ToDo
export const keyString = `?key=${apiKey}`;

const HomePage = () => {
  //Layout
  // const apiKey = process.env.API_KEY;
  // console.log({ apiKey });
  // console.log(process.env);

  const [games, setGames] = useState<Game[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>(); // UX decide whether to unselect when clicking again or have reset option
  const [searchGameName, setSearchGameName] = useState<string | undefined>();
  const [platforms, setPlatforms] = useState<Platform[]>();
  const [selectedPlatform, setSelectedPlatform] = useState<
    string | undefined
  >();

  useEffect(() => {
    axios
      .get(
        //extract the api key to .env
        // `${baseUrl}/games${keyString}&genres=action`
        `${baseUrl}/games${keyString}`,
        {
          params: {
            genres: selectedGenre,
            search: searchGameName,
            parent_platforms: selectedPlatform, // requires id? can be string or number?
          },
        }
      )
      .then(({ data }) => {
        console.log(data.results); // ToDo Destructure further?
        setGames(data.results);
      })
      .catch((err) => {
        console.error("Error fetching games", err);
      });
    axios
      .get(`${baseUrl}/platforms/lists/parents${keyString}`) // NB: parent_platforms (not platforms)
      .then((res) => {
        setPlatforms(res.data.results);
      })
      .catch((err) => console.error("Error fetching platforms", err));
  }, [selectedGenre, searchGameName, selectedPlatform]);

  const navigate = useNavigate();

  const handleSelectGame = (gameId: string) => {
    navigate(`/${gameId}`);
  };
  console.log(platforms, "platforms");
  // const handleResetFilters = () => {
  //   // ToDo is this neater to reset everything or will the order matter
  // };

  return (
    <MainLayout
      handleSearch={(data: FieldValues) => {
        setSelectedGenre(undefined);
        setSelectedPlatform(undefined);
        setSearchGameName(data.searchGameName);
      }} // ToDo not pass props here
      handleClick={(slug: string) => {
        setSearchGameName(undefined); // ToDo clear search bar text
        setSelectedPlatform(undefined);
        setSelectedGenre(slug);
      }}
    >
      <div className="flex flex-col gap-2 bg-emerald-500">
        <h1 className="flex flex-row font-bold bg-emerald-400">Games</h1>
        <select
          onChange={(e) => {
            console.log(e.target.value, "selected");
            setSelectedPlatform(e.target.value);
            console.log(selectedPlatform);
          }}
        >
          {platforms?.map((platform) => {
            // console.log(platform, "p");
            return (
              // ToDo filter games by selected platform
              <option value={platform.id}>{platform.name}</option>
            );
          })}
        </select>
        {/* dropdown for platform and order by: */}
        {/* ToDo Pagination */}
        {games.map((game) => {
          return (
            <GameCard
              key={game.id}
              game={game}
              onClick={() => handleSelectGame(game.slug)}
            />
          );
        })}
      </div>
    </MainLayout>
  );
};

export default HomePage;
