import useData from "./useData";

export type Genre = {
  id: string;
  name: string;
  slug: string;
  image_background: string;
};

const useGenres = (selectedGenre: Genre | null) =>
  // Genre array?
  useData<Genre>("/genres", { params: { genres: selectedGenre?.id } });

export default useGenres;
