import { Grid, GridItem, Show } from "@chakra-ui/react";
import GenreList from "./GenreList";
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
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
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
        <GridItem area="aside" paddingX={5}>
          <GenreList handleClick={(slug: string) => handleClick(slug)} />
        </GridItem>
      </Show>
      <GridItem className="p-2" area="main">
        {/* Should be game grid here */}
        {children}
      </GridItem>
    </Grid>
  );
};

export default MainLayout;
