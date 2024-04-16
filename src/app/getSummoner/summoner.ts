
import axios, { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { fetchMatchHistory, getMatchHistory } from "../getMatchHistory/matchhistory";
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

export default async function getSummoner(req: NextRequest, res: any){
  console.log("req.query", req.nextUrl.searchParams.get("summonerName"));
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
    console.log
    return NextResponse.json(response.data);

  
  } catch (error) {
    res.status(500).json({ error: "Error fetching data from Riot API." });
  }
}

export async function fetchSummoner(summonerName: string): Promise<SummonerResponse> {
  try {
    const response: AxiosResponse<SummonerResponse> = await axios.get(
      `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
      {
        headers: {
          "X-Riot-Token": process.env.RIOT_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("HTTP status code", error.response?.status)
    console.error("Error message", error.message)
    throw new Error('Error fetching data from Riot API.');
  }
}

export async function getSummonerMatchHistory(summonerName: string) {
  const summonerResponse = await fetchSummoner(summonerName);
  const puuid = summonerResponse.puuid;
  const matchHistoryResponse = await fetchMatchHistory(puuid, summonerName);
  return matchHistoryResponse;
}