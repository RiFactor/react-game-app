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

  useEffect(() => {
    axios
      .get(
        //extract the api key to .env
        `${baseUrl}/games?key=eb2ec1af874049fdb938b0a822c82e58`
      )
      .then((res) => {
        // console.log(res.data.results);
        setGames(res.data.results);
      });
  }, []);

  console.log({ games });
  return (
    <div>
      {games.map((game) => (
        <div>{game.name}</div>
      ))}
      <GameCard />
    </div>
  );
}

export default App;
