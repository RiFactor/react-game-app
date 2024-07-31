import { MdComputer } from "react-icons/md";
import {
  FaApple,
  FaInternetExplorer,
  FaLinux,
  FaPlaystation,
  FaXbox,
} from "react-icons/fa";
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
import { IoLogoAndroid } from "react-icons/io";
import { BsNintendoSwitch } from "react-icons/bs";
import { SiAtari, SiCommodore, SiSega } from "react-icons/si";
import { RiAppleLine } from "react-icons/ri";

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
              {game.parent_platforms?.map(({ platform }: any) => {
                return (
                  // ToDo build map object https://www.w3schools.com/js/js_maps.asp
                  // (https://blog.logrocket.com/refactoring-cascading-conditionals-favor-readability/)
                  <p key={platform.id}>
                    {platform?.name === "PC" ? (
                      <MdComputer />
                    ) : platform?.name === "PlayStation" ? (
                      <FaPlaystation />
                    ) : platform?.name === "Apple Macintosh" ? (
                      <FaApple />
                    ) : platform?.name === "Web" ? (
                      <FaInternetExplorer />
                    ) : platform?.name === "Linux" ? (
                      <FaLinux />
                    ) : platform?.name === "Android" ? (
                      <IoLogoAndroid />
                    ) : platform?.name === "Nintendo" ? (
                      <BsNintendoSwitch />
                    ) : platform?.name === "Atari" ? (
                      <SiAtari />
                    ) : platform?.name === "SEGA" ? (
                      <SiSega />
                    ) : platform?.name === "iOS" ? (
                      <RiAppleLine />
                    ) : platform?.name === "Commodore / Amiga" ? (
                      <SiCommodore />
                    ) : platform?.name === "Xbox" ? (
                      <FaXbox />
                    ) : (
                      <div className="flex">{platform.name}</div>
                    )}
                  </p>
                );
              })}
            </div>
            <Badge score={game.metacritic}></Badge>
          </div>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default GameCard;
