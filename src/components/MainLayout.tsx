interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex">
      <div className="flex flex-row">
        <p className="font-bold">this</p>
        <p>that</p>
      </div>
      {children}
    </div>
  );
};

export default MainLayout;
