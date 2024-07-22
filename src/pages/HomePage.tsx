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

  useEffect(() => {
    axios
      .get(
        //extract the api key to .env
        `${baseUrl}/games${keyString}`
      )
      .then((res) => {
        // console.log(res.data.results);
        setGames(res.data.results);
      })
      .catch((err) => {
        console.error("Error fetching games", err);
      });
  }, []);

  // console.log({ games });

  const navigate = useNavigate();

  //navigation
  const handleSelectGame = (gameId: string) => {
    navigate(`/${gameId}`);
  };

  // const handleSelectGame = (gameId: string) => {
  //   axios.get(`${baseUrl}/games/${gameId}${keyString}`).then((res) => {
  //     setSelectedGame(res.data);
  //     navigate(`/${gameId}`);
  //     console.log(res.data);
  //   });
  // };

  return (
    <div>
      <MainLayout>
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
