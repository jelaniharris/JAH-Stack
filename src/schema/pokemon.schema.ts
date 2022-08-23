import { z } from "zod";

export const randomOnePokemonSchema = z
  .object({
    id: z.number().nullish(),
  })
  .nullish();
