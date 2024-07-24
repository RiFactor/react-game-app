import { FieldValues } from "react-hook-form";
import SearchFilter from "./SearchFilter";
import SideBar from "./SideBar";

interface Props {
  handleClick: (slug: string) => void;
  handleSearch: (data: FieldValues) => void;
  children: React.ReactNode;
}

const MainLayout = ({ handleClick, handleSearch, children }: Props) => {
  return (
    // ToDo Stop scroll across screen // object-scale-down
    <div className="flex flex-col gap-2 max-w-screen">
      <SearchFilter handleSearch={(data: FieldValues) => handleSearch(data)} />
      <div className="flex gap-2">
        <SideBar handleClick={(slug: string) => handleClick(slug)} />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
