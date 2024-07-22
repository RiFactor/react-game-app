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
    <div className="flex flex-col gap-2 w-100">
      <SearchFilter handleSearch={(data: FieldValues) => handleSearch(data)} />
      <div className="flex gap-2">
        <SideBar handleClick={(slug: string) => handleClick(slug)} />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
