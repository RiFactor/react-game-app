import { Platform } from "../types/apiTypes";

// Refactor to reusable component
interface Props {
  setSelectedPlatform: (platform: string | undefined) => void;
  platforms: Platform[];
}

//ToDo check

const PlatformDropdown = ({ setSelectedPlatform, platforms }: Props) => {
  if (platforms?.length === 0) return null; // if optionally chaining is this needed
  return (
    <select
      className="w-fit"
      onChange={(e) => {
        setSelectedPlatform(
          e.target.value !== "" ? e.target.value : undefined // can't pass undefined as a value in option
        );
      }}
    >
      <option value="">Select Platform...</option>
      {platforms?.map((platform: Platform) => {
        return (
          <option key={platform.id} value={platform.id}>
            {platform.name}
          </option>
        );
      })}
      {/* // need to be able to reset */}
      {/* <input type="reset" value="reset" /> */}
    </select>
  );
};

export default PlatformDropdown;
