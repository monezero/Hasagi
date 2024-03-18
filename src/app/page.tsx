"use client";
import { useForm, FormProvider } from "react-hook-form";
import Searchbar from "./components/searchbar";

export default function Home() {
  const formMethods = useForm();
  return (
    <header className="relative bg-ugg h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/samira.jpg)" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-center opacity-150"></div>
      <div className="relative">
        <title>Projeto Riot</title>
        <div className="flex flex-col items-center justify-center">
          <div className="text-4xl text-center shadow-text-shadow-blue text-white mt-16 pb-5 pl-5 pr-5 pt-5 bg-ugg opacity-80">
            U.GG Pirateado
          </div>
          <div className="pt-10 flex flex-col items-center justify-center w-[100%]">
            <FormProvider {...formMethods}>
              <Searchbar placeholder="Pesquisar" name="Pesquisar"></Searchbar>
            </FormProvider>
          </div>
        </div>
      </div>
    </header>
  );
}
