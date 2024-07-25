import { Platform } from "../pages/HomePage";

// Refactor to reusable component
interface Props {
  setSelectedPlatform: (platform: string | undefined) => void;
  platforms: Platform[];
}

//ToDo check
// if (platforms)

const PlatformDropdown = ({ setSelectedPlatform, platforms }: Props) => {
  return (
    <select
      onChange={(e) => {
        setSelectedPlatform(
          e.target.value !== "" ? e.target.value : undefined // can't pass undefined as a value in option
        );
      }}
    >
      <option value="">Select Platform...</option>
      {/* // need to be able to reset */}
      {platforms?.map((platform: Platform) => {
        return (
          <option key={platform.id} value={platform.id}>
            {platform.name}
          </option>
        );
      })}
    </select>
  );
};

export default PlatformDropdown;
