import { HStack, List, ListItem, Image, Text } from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";
import getCroppedImageUrl from "../services/imageUrl";

interface Props {
  handleClick: (slug: string) => void;
}

const GenreList = ({
  handleClick,
}: //remember to destructure w/ {braces}
Props) => {
  // ToDO Loading
  const { data } = useGenres();

  if (data.length === 0) return null; // If optionally mapping is this needed

  return (
    <List>
      {data?.map((genre) => (
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
      ))}
    </List>
  );
};

export default GenreList;
