import { Platform } from "../hooks/usePlatforms";

export type PlatformObject = {
  platform: Platform;
};

export type Game = {
  id: number;
  slug: string;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
};
