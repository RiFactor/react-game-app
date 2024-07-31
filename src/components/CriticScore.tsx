import { Badge } from "@chakra-ui/react";
interface IProps {
  score: number;
}

const CriticScore = ({ score }: IProps) => {
  if (score === null) return;
  let color = score > 75 ? "green" : score > 60 ? "yellow" : "";
  return (
    <Badge
      colorScheme={color} // Tip: colorScheme - bg, foreground, shadows, borders, text etc.
      fontSize="14px"
      paddingX={1}
      borderRadius="4px"
    >
      {score}
    </Badge>
  );
};

export default CriticScore;
