import { useEffect, useState } from "react";
import { baseUrl, keyString } from "../pages/HomePage";
import axios from "axios";
import Button from "./Button";

type Genre = {
  id: string;
  name: string;
  slug: string;
};

interface Props {
  handleClick: (slug: string) => void;
}

const SideBar = ({
  handleClick,
}: //remember to destructure w/ {braces}
Props) => {
  const [genres, setGenres] = useState<Genre[]>([]);

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
        // ToDo redux for this
        <Button onClick={() => handleClick(genre.slug)} key={genre.id}>
          {genre.name}
        </Button>
      ))}
    </div>
  );
};

export default SideBar;
