import axios from "axios";
import { baseUrl } from "../constants/api";
import { CanceledError, AxiosError } from "axios";
// `${baseUrl}/games${keyString}&genres=action`

export default axios.create({
  baseURL: baseUrl, // keep here instead of importing?

  // headers: {
  //   // Authorization: `bearer${keyString}`,
  // },
  // headers: {
  //   Authorization: keyString,
  // },

  // headers: {
  //   // api key
  //   // key: "eb2ec1af874049fdb938b0a822c82e58",
  //   // "api-key": "eb2ec1af874049fdb938b0a822c82e58",
  // },
});

export { CanceledError, AxiosError };
