import useData from "./useData";

export type Platform = {
  id: number;
  name: string;
  slug: string;
};

// NB: parent_platforms (not platforms)

const usePlatforms = () => useData<Platform>("/platforms/lists/parents"); // QQ why Platform and not Platform[]

export default usePlatforms;
