interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

const Button = ({ children, onClick }: Props) => {
  // https://v1.tailwindcss.com/components/buttons
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
