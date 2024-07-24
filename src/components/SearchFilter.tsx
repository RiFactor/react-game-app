import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface Props {
  handleSearch: (data: string) => void; // FieldValues
  searchGameName: string;
}

const SearchFilter = ({ handleSearch, searchGameName }: Props) => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = ({ searchGameName }) => {
    handleSearch(searchGameName);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-3 flex">
      <input
        // ToDo clear text when reset and hit enter to submit
        {...register("searchGameName")}
        onChange={(e) => {
          console.log(e);
          handleSearch(e.target.value); // ToDo: works but further bugs with hitting enter resets value or deletes last entry, not resetting value
        }}
        value={searchGameName}
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
