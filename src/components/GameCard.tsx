import {
  Heading,
  Stack,
  Image,
  Card,
  CardBody,
  Center,
} from "@chakra-ui/react";
import { Game } from "../types/apiTypes";
import Badge from "./Badge";
import PlatformIconList from "./PlatformIconList";

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
      borderRadius={10}
      overflow="hidden"
      maxW="sm"
      px={0}
      pl="0"
      className="box cursor-pointer !p-0 rounded"
      // rounded="md"
    >
      <Image src={game.background_image} alt="background_game_image"></Image>
      <CardBody>
        <Stack>
          <Center>
            {/* Adjust game name size */}
            <Heading fontSize="2xl" className="text-md">
              {game.name}
            </Heading>
          </Center>

          <div className="flex justify-between items-center">
            <div className="flex gap-2 overflow-clip">
              <PlatformIconList
                platforms={game.parent_platforms.map(
                  (p) => p.platform
                  // mapping because of BED code smell
                )}
              />
            </div>
            <Badge score={game.metacritic}></Badge>
          </div>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default GameCard;
