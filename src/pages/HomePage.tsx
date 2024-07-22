import { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import axios from "axios";
import GameCard from "../components/GameCard";

// Layout for games
// Dark Mode - Chakra UI?
// Games list component
// drop down filters
// side bar
// search bar

export type Game = {
  id: number;
  slug: string;
  name: string;
  background_image: string;
};

const HomePage = () => {
  //Layout
  // const apiKey = process.env.API_KEY;
  // console.log({ apiKey });
  // console.log(process.env);

  const [games, setGames] = useState<Game[]>([]);
  const baseUrl = "https://api.rawg.io/api";
  const apiKey = "eb2ec1af874049fdb938b0a822c82e58";
  const keyString = `?key=${apiKey}`;

  useEffect(() => {
    axios
      .get(
        //extract the api key to .env
        `${baseUrl}/games${keyString}`
      )
      .then((res) => {
        // console.log(res.data.results);
        setGames(res.data.results);
      });
  }, []);

  // console.log({ games });

  //navigation
  const handleSelectGame = (gameId: string) => {
    // console.log({ gameId });
    axios
      .get(`${baseUrl}/games/${gameId}${keyString}`)
      .then((res) => console.log(res.data));
  };

  return (
    <div>
      <MainLayout>
        <div className="flex">
          {games.map((game) => (
            <div>
              <GameCard
                game={game}
                onClick={() => handleSelectGame(game.slug)}
              />
            </div>
          ))}
        </div>
      </MainLayout>
    </div>
  );
};

export default HomePage;
