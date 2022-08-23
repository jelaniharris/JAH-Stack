import { createRouter } from "../router";
import { z } from "zod";

export const helloRouter = createRouter().query(".greet", {
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
});
