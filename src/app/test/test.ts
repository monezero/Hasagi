import { getSummonerMatchHistory } from "../getSummoner/route"; // replace './route' with the path to your route.ts file

(async () => {
  try {
    const summonerName = 'O Ceifa Fimose'; // replace with a real summoner name
    const matchHistory = await getSummonerMatchHistory(summonerName);
    console.log(matchHistory);
  } catch (error) {
    console.error(error);
  }
})();