export const baseUrl = "https://api.rawg.io/api";
let apiKey: string;

if (typeof process !== "undefined" && process.env.REACT_APP_API_KEY) {
  apiKey = process.env.REACT_APP_API_KEY;
} else {
  apiKey = "eb2ec1af874049fdb938b0a822c82e58";
}

export const keyString = `?key=${apiKey}`;
