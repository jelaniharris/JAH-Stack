import { PanelContainer } from "@/components/common/panelContainer";
import { getRandomNumber } from "@/utils/getRandomNumber";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { inferQueryResponse } from "./api/trpc/[trpc]";

type PokemonServerData = inferQueryResponse<"get-pokemon">;

const Home: NextPage = () => {
  const [luckyNumber, setLuckyNumber] = useState(0);
  const { data, isLoading } = trpc.useQuery(["hello", { text: "Human" }]);

  const pokemonData = trpc.useQuery(["get-pokemon"]);

  useEffect(() => {
    setLuckyNumber(getRandomNumber(10));
  });

  if (isLoading || pokemonData.isLoading) {
    return <div>Loading</div>;
  }

  if (!data) {
    return <div>No Data Found</div>;
  }

  const ShowPokemon: React.FC<{ pokemon: PokemonServerData }> = (props) => {
    return (
      <>
        <div className="text-2xl text-black capitalize">
          {props.pokemon.name}
        </div>
        <div className="w-64 h-64">
          <img className="w-full" src={props.pokemon.sprites.front_default} />
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="text-2xl text-white text-center font-medium mb-3">
        {data.greeting}
      </div>
      <div className="flex flex-row">
        <PanelContainer>
          <div className="text-xl text-black mb-4">Your lucky number is:</div>
          <div className="grow w-full text-9xl text-black">
            <div className="flex h-full items-center justify-center">
              {luckyNumber}
            </div>
          </div>
        </PanelContainer>
        <PanelContainer>
          <div className="text-xl text-black mb-4">Your lucky pokemon is:</div>
          <div className="text-3xl text-black font-bold text-center">
            {!pokemonData.isLoading && pokemonData.data && (
              <ShowPokemon pokemon={pokemonData.data} />
            )}
          </div>
        </PanelContainer>
      </div>
    </div>
  );
};

export default Home;
