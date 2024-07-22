import SideBar from "./SideBar";

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col gap-2 w-100">
      <div>Search bar</div>
      <div className="flex gap-2">
        <SideBar />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
