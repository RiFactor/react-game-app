import SearchFilter from "./SearchFilter";
import SideBar from "./SideBar";

interface Props {
  handleClick: (slug: string) => void;
  searchGameName: string;
  handleSearch: (data: string) => void;
  children: React.ReactNode;
}

const MainLayout = ({
  handleClick,
  searchGameName,
  handleSearch,
  children,
}: Props) => {
  return (
    // ToDo Stop scroll across screen // object-scale-down
    <div className="flex flex-col gap-2 w-screen bg-blue-200 px-5 py-5">
      <SearchFilter
        searchGameName={searchGameName}
        handleSearch={(data: string) => handleSearch(data)}
      />
      <div className="flex gap-2">
        <SideBar handleClick={(slug: string) => handleClick(slug)} />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
