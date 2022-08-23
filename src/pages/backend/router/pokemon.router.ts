import { createRouter } from "../router";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { randomOnePokemonSchema } from "@/schema/pokemon.schema";

const axios = require("axios");

export const pokemonRouter = createRouter().query(".randomOne", {
  input: randomOnePokemonSchema,
  async resolve({ input }) {
    const MAX_POKEDEX_ID = 150;
    let currentPokemonId;

    if (input && input.id) {
      currentPokemonId = input.id;
    } else {
      currentPokemonId = Math.floor(Math.random() * (MAX_POKEDEX_ID + 1));
    }

    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${currentPokemonId}/`
    );

    if (response && response.data) {
      return { name: response.data.name, sprites: response.data.sprites };
    }

    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Could not get pokemon with id ${currentPokemonId}`,
    });
  },
});
