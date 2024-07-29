// Refactor to reusable component
type Option = {
  id: string | number;
  name: string;
};

interface Props {
  setSelectedValue: (platform: string | undefined) => void;
  defaultOption?: string;
  options: Option[];
}

//ToDo check

const Dropown = ({
  setSelectedValue,
  options,
  defaultOption = "Select...",
}: Props) => {
  if (options?.length === 0) return null; // if optionally chaining is this needed
  return (
    <select
      className="w-fit"
      onChange={(e) => {
        setSelectedValue(
          e.target.value !== "" ? e.target.value : undefined // can't pass undefined as a value in option
        );
      }}
    >
      <option value="">{defaultOption}</option>
      {options?.map((option: Option) => {
        return (
          <option key={option?.id} value={option.id}>
            {option.name}
          </option>
        );
      })}
      {/* // need to be able to reset */}
      {/* <input type="reset" value="reset" /> */}
    </select>
  );
};

export default Dropown;
