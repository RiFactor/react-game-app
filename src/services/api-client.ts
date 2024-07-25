import axios from "axios";
import { baseUrl } from "../constants/api";
import { CanceledError, AxiosError } from "axios";

export default axios.create({
  baseURL: baseUrl, // keep here instead of importing?
  // headers: {
  //   // api key
  //   // key: "eb2ec1af874049fdb938b0a822c82e58",
  //   // "api-key": "eb2ec1af874049fdb938b0a822c82e58",
  // },
});

export { CanceledError, AxiosError };

// import axios from "axios";
// import { baseUrl, keyString } from "../constants/api";

// interface IProps {
//   selectedGenre: any;
//   searchGameName: string;
//   selectedPlatform: string;
// }

// const useFetchGames = async ({
//   selectedGenre,
//   searchGameName,
//   selectedPlatform,
// }: IProps) => {
//   //   setIsLoading(true);
//   try {
//     const {
//       data: { results },
//     } = await axios.get(
//       //extract the api key to .env
//       // `${baseUrl}/games${keyString}&genres=action`
//       `${baseUrl}/games${keyString}`,
//       // `${baseUrl}/games`,
//       {
//         // headers: {
//         //   // Authorization: `bearer${keyString}`,
//         // },
//         params: {
//           genres: selectedGenre,
//           search: searchGameName,
//           parent_platforms: selectedPlatform, // id can be string or number?
//         },
//       }
//     );
//     // setGames(results);
//     // setIsLoading(false);
//   } catch (err) {
//     console.error("Error fetching games", err);
//     // setIsLoading(false);
//   }

//   return {results};
// };

// export default useFetchGames;
