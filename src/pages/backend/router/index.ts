import * as trpc from "@trpc/server";
const axios = require("axios");
import { z } from "zod";

export const appRouter = trpc
  .router()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("get-pokemon", {
    input: z
      .object({
        id: z.number().nullish(),
      })
      .nullish(),
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

      throw new Error(`Could not get pokemon with id ${currentPokemonId}`);
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
