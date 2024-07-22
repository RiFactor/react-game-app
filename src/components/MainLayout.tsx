import SideBar from "./SideBar";

interface Props {
  handleClick: (slug: string) => void;
  children: React.ReactNode;
}

const MainLayout = ({ handleClick, children }: Props) => {
  return (
    <div className="flex flex-col gap-2 w-100">
      <div>Search bar</div>
      <div className="flex gap-2">
        <SideBar handleClick={(slug: string) => handleClick(slug)} />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
