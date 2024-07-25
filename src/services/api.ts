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
