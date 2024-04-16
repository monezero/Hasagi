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

export default async function getSummonerTest(req: NextRequest) {
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
    console.log(response.data);
    console.log(response.data.puuid);
    return  NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return  NextResponse.json({ error: 'Error fetching summoner data' }, { status: 500 });
  }
}