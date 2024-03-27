
import {getSummoner} from "../getSummoner/route"
import {getMatchHistory} from "../getMatchHistory/route"

export async function getSummonerMatchHistory(summonerName: string) {
  const summonerResponse = await getSummoner(summonerName)
  const puuid = summonerResponse.data.puuid
  const matchHistoryResponse = await getMatchHistory(puuid, summonerName)
  return matchHistoryResponse
}