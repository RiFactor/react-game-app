import { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import axios from "axios";
import GameCard from "../components/GameCard";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    axios
      .get(
        //extract the api key to .env
        // `${baseUrl}/games${keyString}`
        `${baseUrl}/games${keyString}`,
        { params: { genres: selectedGenre } }
      )
      .then((res) => {
        setGames(res.data.results);
      })
      .catch((err) => {
        console.error("Error fetching games", err);
      });
  }, [selectedGenre]);

  const navigate = useNavigate();

  const handleSelectGame = (gameId: string) => {
    navigate(`/${gameId}`);
  };

  return (
    <div>
      <MainLayout
        handleClick={(slug: string) => {
          setSelectedGenre(slug);
          console.log({ genre: selectedGenre });
        }}
      >
        <div className="flex">
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
