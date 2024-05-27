import React, { useEffect, useState } from "react";
import axios from "axios";

interface SummonerData {
  name: string;
  profileIconId: number;
  summonerLevel: number;
}

export const SummonerInfo = ({ puuid, gameName, tagLine }) => {
  const [summonerData, setSummonerData] = useState<SummonerData | null>(null);

  useEffect(() => {
    const fetchSummoner = async () => {
      try {
        console.log("puuid", puuid);
        const response = await axios.get(
          `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`
        );

        console.log("Response", response.data);
        setSummonerData(response.data);
      } catch (error) {
        console.error("Error fetching summoner data", error);
      }
    };

    fetchSummoner();
  }, [puuid]);

  if (!summonerData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>
        {gameName} #{tagLine}
      </h1>
      <img
        src={`http://ddragon.leagueoflegends.com/cdn/14.9.1/img/profileicon/${summonerData.profileIconId}.png`}
        alt="Summoner Icon"
      />
      <p>Summoner Level: {summonerData.summonerLevel} </p>
    </div>
  );
};
