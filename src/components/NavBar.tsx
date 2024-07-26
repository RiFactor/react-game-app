import { HStack, Image } from "@chakra-ui/react";
import Logo from "../assets/logo.webp";
import SearchFilter from "./SearchFilter";

interface IProps {
  handleSearch: (data: string) => void; // FieldValues
  searchGameName: string;
}

const NavBar = ({ handleSearch, searchGameName }: IProps) => {
  return (
    <HStack className="p-2">
      <Image src={Logo} boxSize="3rem" />
      <SearchFilter
        searchGameName={searchGameName}
        handleSearch={(data: string) => handleSearch(data)}
      />
    </HStack>
  );
};

export default NavBar;
