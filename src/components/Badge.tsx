interface IProps {
  score: number;
}

const Badge = ({ score }: IProps) => {
  if (score === null) return;
  return (
    <div className="text-green-100 border w-fit bg-green-900 rounded p-1.5">
      {score}
    </div>
  );
};

export default Badge;
