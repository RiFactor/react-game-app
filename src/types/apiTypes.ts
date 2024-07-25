export type Platform = {
  id: number;
  name: string;
  // slug: string;
};

export type PlatformObject = {
  platform: Platform;
};

export type Game = {
  id: number;
  slug: string;
  name: string;
  background_image: string;
  parent_platforms: any;
};
