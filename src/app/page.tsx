import Image from "next/image";
import { Searchbar } from "./components/Searchbar";
export default function Home() {
  return (
    <header>
      <title>Projeto Riot</title>
      <div className="flex items-start justify-center">
        <div className="justify-self-center text-4xl text-red-700 mt-16">
          Op.GG Pirateado
        </div>
        <Searchbar placeholder="Pesquisar"></Searchbar>
      </div>
    </header>
  );
}
