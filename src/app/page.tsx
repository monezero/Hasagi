"use client";
import { useForm } from "react-hook-form";
import Searchbar from "./components/searchbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Logo } from "./components/svg";
import { SummonerInfo } from "./components/summonerInfo";

export default function Home() {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [puuid, setPuuid] = useState(null);
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const { register, handleSubmit } = useForm();
  const [searchValue, setSearchValue] = useState("");

  const fetchSummoner = async (gameName: string, tagLine: string) => {
    try {
      const response = await axios.get(
        `/api/posts?gameName=${gameName}&tagLine=${tagLine}`
      );

      const summonerResponse = response.data.summonerData;
      setPuuid(summonerResponse.puuid);
      setGameName(summonerResponse.gameName);
      setTagLine(summonerResponse.tagLine);
      console.log("Summoner response:", summonerResponse);

      const mongoResponse = await axios.post("/api/insertSummonerData", {
        gameName: summonerResponse.gameName,
        tagLine: summonerResponse.tagLine,
        summonerLevel: summonerResponse.summonerLevel,
      });
      console.log("Mongo response:", mongoResponse);
      return summonerResponse;
    } catch (error) {
      console.error("Error fetching summoner data:", error);
      throw new Error("Error fetching summoner data");
    }
  };

  const handleSearch = async (data: any) => {
    console.log("Search data:", data);
    const { gameName, tagLine } = data;
    const summoner = await fetchSummoner(gameName, tagLine);
    setSearchValue(`${summoner.gameName} #${summoner.tagLine}`);
  };

  useEffect(() => {
    const fetchChampionsBackground = async () => {
      try {
        const response = await axios.get(
          "http://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion.json"
        );
        const champions = Object.values(response.data.data);
        const randomChampion = champions[
          Math.floor(Math.random() * champions.length)
        ] as { id: string };
        setBackgroundImage(
          `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${randomChampion.id}_0.jpg`
        );
      } catch (error) {
        console.error("Error fetching champion background:", error);
      }
    };
    fetchChampionsBackground();
  }, []);

  return (
    <header className="relative bg-ugg h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-center opacity-150"></div>
      <div className="relative">
        <title>Hasagi</title>
        <div className="flex flex-col items-center justify-center object-contain">
          <div
            className="pb-5 pl-5 pr-5 pt-5 opacity-80"
            style={{
              backgroundImage: "url(/hasagi_no_bg.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "340px",
              width: "400px",
            }}
          ></div>
          <div className="pt-10 flex flex-col items-center justify-center w-[100%]">
            <Searchbar onSearch={handleSearch} />
            <h2 className="text-2xl mt-20 mx-2 underline">Resultado:</h2>
            <p className="text-2xl m-2">{searchValue}</p>
            {puuid && (
              <SummonerInfo
                puuid={puuid}
                gameName={gameName}
                tagLine={tagLine}
              />
            )}
          </div>
        </div>
        <div className="" style={{ position: "absolute", left: 0, top: -30 }}>
          <Logo className="h-40 w-40 " />
        </div>
      </div>
    </header>
  );
}
