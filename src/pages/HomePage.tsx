import { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import axios from "axios";
import GameCard from "../components/GameCard";
import Button from "../components/Button";

// Layout for games
// Dark Mode - Chakra UI?
// Games list component
// drop down filters
// side bar
// search bar

type Game = {
  id: number;
  slug: string;
  name: string;
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
        <div>
          {games.map((game) => (
            <div>
              <p>{game.name}</p>
              <Button onClick={() => handleSelectGame(game.slug)}>More</Button>
            </div>
          ))}
          <GameCard />
        </div>
      </MainLayout>
    </div>
  );
};

export default HomePage;
