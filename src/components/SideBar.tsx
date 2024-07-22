import { useEffect, useState } from "react";
import { baseUrl, keyString } from "../pages/HomePage";
import axios from "axios";

type Genre = {
  id: string;
  name: string;
  slug: string;
};

const SideBar = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  console.log(genres, "gs");
  useEffect(() => {
    axios
      .get(`${baseUrl}/genres${keyString}`)
      .then((res) => {
        setGenres(res.data.results);
      })
      .catch((err) => console.error("Error fetching Genre", err));
  }, []);

  // if (genres.length === 0) return;

  return (
    <div>
      {genres?.map((genre) => (
        <p key={genre.id}>{genre.name}</p>
      ))}
    </div>
  );
};

export default SideBar;
