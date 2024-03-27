import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosResponse } from 'axios';

interface MatchHistoryResponse {
  matches: Array<{
    platformId: string;
    gameId: number;
    champion: number;
    queue: number;
    season: number;
    timestamp: number;
    role: string;
    lane: string;
  }>;
}

export async function getMatchHistory(req: NextRequest, res: any) {
  console.log("req.query", req.nextUrl.searchParams.get("accountId"));
  const puuid = req.nextUrl.searchParams.get("puuid")
  console.log("puuid", puuid)
  
  try {
    const response: AxiosResponse<MatchHistoryResponse> = await axios.get(
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids`,
      {
        headers: {
          "X-Riot-Token": process.env.RIOT_API_KEY,
        },
      }
    );
    console.log("response", response.data)
    return NextResponse.json(response.data);

 
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error fetching data from Riot API' });
  }
}