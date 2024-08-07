import {
  FaWindows,
  FaAndroid,
  FaApple,
  FaLinux,
  FaPlaystation,
  FaXbox,
} from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { SiNintendo } from "react-icons/si";
import { BsGlobe } from "react-icons/bs";
import { HStack, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { Platform } from "../hooks/usePlatforms";
// ToDo Review this logic
// build map object https://www.w3schools.com/js/js_maps.asp
// (https://blog.logrocket.com/refactoring-cascading-conditionals-favor-readability/)

interface Props {
  platforms: Platform[];
}

const PlatformIconList = ({ platforms }: Props) => {
  const iconMap: { [key: string]: IconType } = {
    // Tip: use slug rather than name as less likely to change
    pc: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
    android: FaAndroid,
    nintendo: SiNintendo,
    mac: FaApple,
    linux: FaLinux,
    ios: MdPhoneIphone,
    web: BsGlobe,
  };

  return (
    <HStack
      marginY={
        1 // theme.space value
      }
    >
      {platforms?.map(
        (
          platform // before refactoring, had to destructure because of BED code smell
        ) => {
          return (
            <Icon
              key={platform.id}
              as={iconMap[platform.slug]}
              color="gray.500"
            ></Icon>
          );
        }
      )}
    </HStack>
  );
};

export default PlatformIconList;
