import { HStack, List, ListItem, Image, Button } from "@chakra-ui/react";
import useGenres, { Genre } from "../hooks/useGenres";
import GenreListSkeleton from "./GenreListSkeleton";
import getCroppedImageUrl from "../services/imageUrl";
import { skeletons } from "./GameGrid";

interface Props {
  selectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({
  selectGenre,
  selectedGenre,
}: //remember to destructure w/ {braces}
Props) => {
  const { data, isLoading } = useGenres(selectedGenre);

  if (data.length === 0) return null; // If optionally mapping is this needed

  // ToDo - isLoading status not working for genres but working for games
  // if (!isLoading) return <Spinner />; // ToDo spinner only displaying here, not when loading
  // if (isLoading) return <Spinner />;
  return (
    <List>
      {isLoading && skeletons.map((s) => <GenreListSkeleton key={s} />)}
      {data?.map((genre) => {
        return (
          // ToDo redux for this
          <ListItem key={genre.id} paddingY="5px">
            <HStack>
              <Image
                boxSize="32px"
                src={getCroppedImageUrl(genre.image_background)}
                borderRadius={8}
              />
              <Button
                onClick={() => selectGenre(genre)}
                variant="link"
                fontSize="lg"
                fontWeight={selectedGenre?.id === genre.id ? "bold" : "normal"}
              >
                {genre.name}
              </Button>
            </HStack>
            {/* ToDoclip the height of the arcade image */}
          </ListItem>
        );
      })}
    </List>
  );
};

export default GenreList;
