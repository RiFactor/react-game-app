import useGenres from "../hooks/useGenres";
import Button from "./Button";

interface Props {
  handleClick: (slug: string) => void;
}

const SideBar = ({
  handleClick,
}: //remember to destructure w/ {braces}
Props) => {
  const { genres } = useGenres();

  if (genres.length === 0) return null; // If optionally mapping is this needed

  return (
    <div className="flex flex-col gap-2">
      {genres?.map((genre) => (
        // ToDo redux for this
        <button
          className="flex gap-2 pr-0 hover:text-gray-500"
          onClick={() => handleClick(genre.slug)}
          key={genre.id}
        >
          <img width="50" height="50" src={genre.image_background} />
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default SideBar;
