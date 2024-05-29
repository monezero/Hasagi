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
  const gameName = req.nextUrl.searchParams.get("gameName");
  const tagLine = req.nextUrl.searchParams.get("tagLine");
  try {
    const response: AxiosResponse<SummonerResponse> = await axios.get(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
      {
        headers: {
          "X-Riot-Token": process.env.NEXT_PUBLIC_RIOT_API_KEY,
        },
      }
    );

    const puuid = response.data.puuid

    const topChampionMasteryResponse: AxiosResponse = await axios.get(
      `https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top`,
      {
        headers: {
          "X-Riot-Token": process.env.NEXT_PUBLIC_RIOT_API_KEY,
        }
      }
    );

    const matchHistoryResponse:AxiosResponse = await axios.get(
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids`,
      {
        headers: {
          "X-Riot-Token": process.env.NEXT_PUBLIC_RIOT_API_KEY,
        },
      }
    );

    const matchId = matchHistoryResponse.data[0];

    const matchResponse: AxiosResponse = await axios.get(
      `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}`,
      {
        headers: {
          "X-Riot-Token": process.env.NEXT_PUBLIC_RIOT_API_KEY,
        },
      }
    );
    console.log(response.data);
    console.log(response.data.puuid);
    return  NextResponse.json({
      summonerData: response.data,
      topChampionMastery: topChampionMasteryResponse.data,
      matchHistory: matchHistoryResponse.data,
      matchDetails: matchResponse.data,
    })
  } catch (error) {
    console.error(error);
    return  NextResponse.json({ error: 'Error fetching summoner data' }, { status: 500 });
  }
}