import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface Props {
  handleSearch: (data: string) => void; // FieldValues
  searchGameName: string;
}

const SearchFilter = ({ handleSearch, searchGameName }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { searchGameName: searchGameName } });

  const onSubmit: SubmitHandler<FieldValues> = ({ searchGameName }) => {
    handleSearch(searchGameName);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-3 flex items-center justify-center"
    >
      <input
        // ToDo clear text when reset
        {...register("searchGameName")}
        onChange={(e) => {
          handleSearch(e.target.value);
          setValue("searchGameName", e.target.value);
        }}
        type="text"
        placeholder="Search Game..."
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      {errors.searchGameName && <p>Please try again</p>}
      <button type="submit">Search Icon</button>
    </form>
  );
};

export default SearchFilter;
