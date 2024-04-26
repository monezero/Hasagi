"use client";

import { ChangeEvent, ReactNode, useState } from "react";
export type SearchProps = {
  onSearch: (value: { gameName: string; tagLine: string }) => void;
};

const Searchbar = (props: SearchProps) => {
  const { onSearch } = props;
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");

  const handleGameNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGameName(event.target.value);
  };

  const handleTagLineChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTagLine(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(gameName, tagLine);
    }
  };

  return (
    <div className="relative bg-ugg items-center text-black text-xl p1-4 w-[50%] py-2 rounded-sm min-h-14 shadow-default flex">
      <input
        className="bg-ugg text-xl text-text-ugg-white pl-3 w-[80%] py-2 outline-none bg-transparent"
        type="search"
        name="gameName"
        placeholder="Insira o invocador"
        onChange={handleGameNameChange}
        onKeyDown={handleKeyDown}
      />
      <input
        className="bg-ugg text-xl text-text-ugg-white pl-3 w-[20%] py-2 outline-none bg-transparent border-l"
        type="search"
        name="tagLine"
        placeholder="Insira a tag"
        onChange={handleTagLineChange}
        onKeyDown={handleKeyDown}
      />
      <img
        src="/searchicon.png"
        alt="Pesquisar"
        className="w-10 h10 cursor-pointer pr-3"
        onClick={() => onSearch({ gameName, tagLine })}
      ></img>
    </div>
  );
};
export default Searchbar;
