import {
  Heading,
  Stack,
  Image,
  Card,
  CardBody,
  Center,
  HStack,
} from "@chakra-ui/react";
import { Game } from "../types/apiTypes";
import PlatformIconList from "./PlatformIconList";
import CriticScore from "./CriticScore";
import getCroppedImageUrl from "../services/imageUrl";

// ToDo
// Classname "box" on  Card won't remove padding
// remaining icons
// Overflow- scroll or wrap? text-ellipsis

interface Props {
  game: Game;
  onClick: () => void;
}

const GameCard = ({ game, onClick }: Props) => {
  return (
    <Card
      onClick={onClick}
      maxW="sm"
      px={0}
      pl="0"
      className="box cursor-pointer !p-0 rounded"
      // rounded="md"
    >
      <Image
        src={getCroppedImageUrl(game.background_image)}
        alt="background_game_image"
      ></Image>
      <CardBody>
        <Stack>
          <Center>
            {/* Adjust game name size */}
            <Heading fontSize="2xl" className="text-md">
              {game.name}
            </Heading>
          </Center>
          <HStack justifyContent="space-between">
            <PlatformIconList
              platforms={game.parent_platforms.map(
                (p) => p.platform
                // mapping because of BED code smell
              )}
            />
            <CriticScore score={game.metacritic}></CriticScore>
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default GameCard;
