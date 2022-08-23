import type { NextPage } from "next";
import { trpc } from "@/utils/trpc";
import { PanelContainer } from "../common/panelContainer";
import { inferQueryResponse } from "../../pages/api/trpc/[trpc]";

type PokemonServerData = inferQueryResponse<"pokemon.randomOne">;

const LuckyPokemonContainer: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["pokemon.randomOne"]);

  const ShowPokemon: React.FC<{ pokemon: PokemonServerData | undefined }> = (
    props
  ) => {
    if (!props.pokemon) {
      return <></>;
    }

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

  if (isLoading) {
    return <PanelContainer>Loading</PanelContainer>;
  }

  return (
    <PanelContainer>
      <div className="text-xl text-black mb-4">Your lucky pokemon is:</div>
      <div className="text-3xl text-black font-bold text-center">
        {data && <ShowPokemon pokemon={data} />}
      </div>
    </PanelContainer>
  );
};

export default LuckyPokemonContainer;
