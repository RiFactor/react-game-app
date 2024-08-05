import { HStack, List, ListItem, Image, Text, Button } from "@chakra-ui/react";
import useGenres, { Genre } from "../hooks/useGenres";
import GenreListSkeleton from "./GenreListSkeleton";
import getCroppedImageUrl from "../services/imageUrl";
import { skeletons } from "./MainLayout";

interface Props {
  handleClick: (slug: string) => void;
  selectedGenre: string | undefined;
}

const GenreList = ({
  handleClick,
  selectedGenre,
}: //remember to destructure w/ {braces}
Props) => {
  const { data, isLoading } = useGenres();

  if (data.length === 0) return null; // If optionally mapping is this needed

  // ToDo - isLoading status not working for genres but working for games
  // if (!isLoading) return <Spinner />; // ToDo spinner only displaying here, not when loading
  // if (isLoading) return <Spinner />;
  console.log(selectedGenre, "sg");
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
                onClick={() => handleClick(genre.slug)}
                variant="link"
                fontSize="lg"
                className={
                  // ToDo fix error (ternary ok)
                  selectedGenre === genre.name.toLowerCase() &&
                  "opacity-50 underline"
                }
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
