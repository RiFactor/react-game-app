import { MdComputer } from "react-icons/md";
import { FaPlaystation, FaXbox } from "react-icons/fa";
import {
  Heading,
  Stack,
  Image,
  Card,
  CardBody,
  Center,
} from "@chakra-ui/react";
import { Game } from "../types/apiTypes";

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
      <CardBody>
        <Image src={game.background_image} alt="background_game_image"></Image>
        <Stack>
          <Center>
            <Heading>{game.name}</Heading>
          </Center>

          <div className="flex gap-2 overflow-clip">
            {game.parent_platforms?.map(({ platform }: any) => {
              return (
                <p key={platform.id}>
                  {platform?.name === "PC" ? (
                    <MdComputer />
                  ) : platform?.name === "PlayStation" ? (
                    <FaPlaystation />
                  ) : platform?.name === "Xbox" ? (
                    <FaXbox />
                  ) : (
                    `platforms: ${platform.name}`
                  )}
                </p>
              );
            })}
          </div>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default GameCard;
