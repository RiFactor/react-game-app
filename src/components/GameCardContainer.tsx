import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const GameCardContainer = ({ children }: Props) => {
  return (
    // Box = div
    // NB: implicit width 100%
    <Box borderRadius={10} overflow="hidden">
      {children}
    </Box>
  );
};

export default GameCardContainer;
