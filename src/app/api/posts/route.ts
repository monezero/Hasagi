import axios, { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";


interface SummonerResponse {
  accountid: string;
  profileIconId: number;
  revisionData: bigint;
  puuid: string;
  summonerLevel: bigint;
  id: string;
  name: string;
  level: number;
}



export async function GET(req: NextRequest) {
  const summonerName = req.nextUrl.searchParams.get("summonerName");
  try {
    const response: AxiosResponse<SummonerResponse> = await axios.get(
      `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
      {
        headers: {
          "X-Riot-Token": process.env.RIOT_API_KEY,
        },
      }
    );

    const puuid = response.data.puuid

    const matchHistoryResponse:AxiosResponse = await axios.get(
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids`,
      {
        headers: {
          "X-Riot-Token": process.env.RIOT_API_KEY,
        },
      }
    );

    const matchId = matchHistoryResponse.data[0];

    const matchResponse: AxiosResponse = await axios.get(
      `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}`,
      {
        headers: {
          "X-Riot-Token": process.env.RIOT_API_KEY,
        },
      }
    );
    console.log(response.data);
    console.log(response.data.puuid);
    return  NextResponse.json({
      summonerData: response.data,
      matchHistory: matchHistoryResponse.data,
      matchDetails: matchResponse.data,
    })
  } catch (error) {
    console.error(error);
    return  NextResponse.json({ error: 'Error fetching summoner data' }, { status: 500 });
  }
}