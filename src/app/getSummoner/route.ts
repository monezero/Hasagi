
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

export async function GET(req: NextRequest, res: any){
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
    return NextResponse.json(response.data);

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data from Riot API." });
  }
}