import { HStack, List, ListItem, Image, Text } from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";
import { skeletons } from "../pages/HomePage";
import GenreListSkeleton from "./GenreListSkeleton";
import getCroppedImageUrl from "../services/imageUrl";

interface Props {
  handleClick: (slug: string) => void;
}

const GenreList = ({
  handleClick,
}: //remember to destructure w/ {braces}
Props) => {
  const { data, isLoading } = useGenres();

  if (data.length === 0) return null; // If optionally mapping is this needed

  // if (!isLoading) return <Spinner />; // ToDo spinner only displaying here, not when loading
  // if (isLoading) return <Spinner />;

  return (
    <List>
      {isLoading && skeletons.map((s) => <GenreListSkeleton key={s} />)}
      {data?.map((genre) => {
        return (
          // ToDo redux for this
          <ListItem key={genre.id} paddingY="5px">
            <button onClick={() => handleClick(genre.slug)}>
              <HStack>
                <Image
                  boxSize="32px"
                  src={getCroppedImageUrl(genre.image_background)}
                  borderRadius={8}
                />
                <Text fontSize="lg">{genre.name}</Text>
              </HStack>
              {/* ToDoclip the height of the arcade image */}
            </button>
          </ListItem>
        );
      })}
    </List>
  );
};

export default GenreList;
