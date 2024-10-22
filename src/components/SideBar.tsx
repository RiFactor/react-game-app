import { useEffect, useState } from "react";
import axios from "axios";
import Button from "./Button";
import { baseUrl, keyString } from "../constants/api";

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

  if (genres.length === 0) return null; // If optionally mapping is this needed

  return (
    <div className="flex flex-col gap-2">
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
