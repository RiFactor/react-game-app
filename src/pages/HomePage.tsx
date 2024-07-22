import { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import axios from "axios";
import GameCard from "../components/GameCard";
import { useNavigate } from "react-router-dom";
import { FieldValues } from "react-hook-form";

export type Game = {
  id: number;
  slug: string;
  name: string;
  background_image: string;
};

export const baseUrl = "https://api.rawg.io/api";
const apiKey = "eb2ec1af874049fdb938b0a822c82e58";
export const keyString = `?key=${apiKey}`;

const HomePage = () => {
  //Layout
  // const apiKey = process.env.API_KEY;
  // console.log({ apiKey });
  // console.log(process.env);

  const [games, setGames] = useState<Game[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>(); // UX decide whether to unselect when clicking again or have reset option
  const [searchGameName, setSearchGameName] = useState<string | undefined>();

  useEffect(() => {
    axios
      .get(
        //extract the api key to .env
        // `${baseUrl}/games${keyString}`
        `${baseUrl}/games${keyString}`,
        { params: { genres: selectedGenre, search: searchGameName } }
      )
      .then((res) => {
        setGames(res.data.results);
      })
      .catch((err) => {
        console.error("Error fetching games", err);
      });
    console.log({ searchGameName });
  }, [selectedGenre, searchGameName]);

  const navigate = useNavigate();

  const handleSelectGame = (gameId: string) => {
    navigate(`/${gameId}`);
  };

  return (
    <div>
      <MainLayout
        handleSearch={(data: FieldValues) => {
          setSelectedGenre(undefined);
          setSearchGameName(data.searchGameName);
        }}
        handleClick={(slug: string) => {
          setSearchGameName(undefined); // ToDo clear search bar text
          setSelectedGenre(slug);
          console.log({ genre: selectedGenre });
        }}
      >
        <div className="flex">
          {/* ToDo Pagination */}
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onClick={() => handleSelectGame(game.slug)}
            />
          ))}
        </div>
      </MainLayout>
    </div>
  );
};

export default HomePage;
