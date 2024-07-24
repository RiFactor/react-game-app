import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

// type Input = {
//   searchGameName: string;
// };

interface Props {
  handleSearch: (data: FieldValues) => void;
}

const SearchFilter = ({ handleSearch }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // console.log(watch("searchGameName"));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // ToDo dynamic (controlled?)
    handleSearch(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-3 flex">
      <input
        {...register("searchGameName")}
        type="text"
        placeholder="Search Game..."
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      {errors.searchGameName && <p>Please try again</p>}
      {/* <input type="submit"></input> */}
      <button type="submit">Search Icon</button>
    </form>
  );
};

export default SearchFilter;
