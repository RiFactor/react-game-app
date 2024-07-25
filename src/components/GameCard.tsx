import { MdComputer } from "react-icons/md";
import { FaPlaystation, FaXbox } from "react-icons/fa";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Stack,
  Image,
} from "@chakra-ui/react";
import { Game } from "../types/apiTypes";

interface Props {
  game: Game;
  onClick: () => void;
}

const GameCard = ({ game, onClick }: Props) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      {/* Chakra Template: https://chakra-templates.vercel.app/components/cards */}
      <Center py={12}>
        <Box
          role={"group"}
          p={6}
          maxW={"230px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
        >
          <Box
            rounded={"lg"}
            mt={0}
            pos={"relative"}
            height={"120px"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            <Image
              rounded={"lg"}
              height={130}
              width={182}
              objectFit={"cover"}
              src={game?.background_image}
              alt="game_background_image"
            />
          </Box>
          <Stack pt={10} align={"center"}>
            <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
              {game.name}
            </Heading>
            <Stack direction={"row"} align={"center"}>
              <div className="flex gap-2">
                {game.parent_platforms?.map(({ platform }: any) => {
                  return (
                    <p key={platform.id}>
                      {platform?.name === "PC" ? (
                        <MdComputer />
                      ) : platform?.name === "PlayStation" ? (
                        <FaPlaystation />
                      ) : platform?.name === "Xbox" ? (
                        <FaXbox /> // ToDo more icons
                      ) : (
                        `platforms: ${platform.name}`
                      )}
                    </p>
                  );
                })}
              </div>
            </Stack>
          </Stack>
        </Box>
      </Center>
    </div>
  );
};

export default GameCard;
