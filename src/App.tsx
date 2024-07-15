import axios from "axios";
import "./App.css";
import GameCard from "./components/GameCard";
import { useEffect, useState } from "react";
// require("dotenv").config;

type Game = {
  id: number;
  slug: string;
  name: string;
};

function App() {
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
      {games.map((game) => (
        <div>
          <p>{game.name}</p>
          <button onClick={() => handleSelectGame(game.slug)}>More</button>
        </div>
      ))}
      <GameCard />
    </div>
  );
}

export default App;
