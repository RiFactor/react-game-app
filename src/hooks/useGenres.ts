import useData from "./useData";

type Genre = {
  id: string;
  name: string;
  slug: string;
  image_background: string;
};

const useGenres = () => useData<Genre>("/genres");

export default useGenres;
