import { Grid, GridItem, Show } from "@chakra-ui/react";
import SideBar from "./SideBar";
import NavBar from "./NavBar";

interface Props {
  handleClick: (slug: string) => void;
  searchGameName: string;
  handleSearch: (data: string) => void;
  children: React.ReactNode;
}

const MainLayout = ({
  searchGameName,
  handleSearch,
  handleClick,
  children,
}: Props) => {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        md: `"nav nav" "aside main"`,
      }}
      className="gap-2 p-2"
    >
      <GridItem area="nav">
        <NavBar
          searchGameName={searchGameName}
          handleSearch={(data: string) => handleSearch(data)}
        />
      </GridItem>
      <Show above="md">
        <GridItem area="aside">
          <SideBar handleClick={(slug: string) => handleClick(slug)} />
        </GridItem>
      </Show>
      <GridItem className="p-2" area="main">
        {children}
      </GridItem>
    </Grid>
  );
};

export default MainLayout;
