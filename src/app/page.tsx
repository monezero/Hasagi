"use client";
import { useForm, FormProvider } from "react-hook-form";
import Searchbar from "./components/searchbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchTopChampionMastery } from "./api/posts/route";

export default function Home() {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [input, setInput] = useState("");

  const fetchChampions = async () => {
    const topChampionMastery = await fetchTopChampionMastery(puuid);
    console.log(topChampionMastery);
  };
  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const response = await axios.get(
          "http://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion.json"
        );
        const champions = Object.values(response.data.data);
        const randomChampion =
          champions[Math.floor(Math.random() * champions.length)];
        setBackgroundImage(
          `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${randomChampion.id}_0.jpg`
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchChampions();
  }, []);

  const formMethods = useForm();
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
            className="    pb-5 pl-5 pr-5 pt-5  opacity-80"
            style={{
              backgroundImage: "url(/hasagi_no_bg.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "340px",
              width: "400px",
            }}
          ></div>
          <div className="pt-10 flex flex-col items-center justify-center w-[100%]">
            <FormProvider {...formMethods}>
              <Searchbar
                placeholder="Pesquisar"
                name="Pesquisar"
                value={input}
                onChange={(event) => setInput(event.target.value)}
              ></Searchbar>
            </FormProvider>
          </div>
        </div>
      </div>
    </header>
  );
}
