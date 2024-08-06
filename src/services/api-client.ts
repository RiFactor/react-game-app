import axios from "axios";
import { CanceledError, AxiosError } from "axios";
// `${baseUrl}/games${keyString}&genres=action`

let apiKey: string;

if (typeof process !== "undefined" && process.env.REACT_APP_API_KEY) {
  apiKey = process.env.REACT_APP_API_KEY;
} else {
  apiKey = "eb2ec1af874049fdb938b0a822c82e58";
}

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: apiKey,
    // ...requestConfig, // params?
  },
});

export { CanceledError, AxiosError };
