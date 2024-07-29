interface IProps {
  score: number;
}

const Badge = ({ score }: IProps) => {
  if (score === null) return;
  return (
    <div className="text-green-300 border w-fit bg-green-600 bg-opacity-50 rounded p-1.5">
      {score}
    </div>
  );
};

export default Badge;
