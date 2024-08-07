import useData from "./useData";

export type Platform = {
  id: number;
  name: string;
  slug: string;
};

// NB: parent_platforms (not platforms)

const usePlatforms = () => useData("/platforms/lists/parents");

export default usePlatforms;
