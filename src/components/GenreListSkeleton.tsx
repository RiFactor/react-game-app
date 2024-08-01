import { ListItem, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const GenreListSkeleton = () => {
  return (
    <ListItem>
      {/* ToDo Tweak */}
      <SkeletonCircle />
      <SkeletonText />
    </ListItem>
  );
};

export default GenreListSkeleton;
