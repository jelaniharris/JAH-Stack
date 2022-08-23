import { createRouter } from "../router";
import { notesRouter } from "./notes.router";
import { helloRouter } from "./hello.router";
import { pokemonRouter } from "./pokemon.router";

export const appRouter = createRouter()
  .merge("notes", notesRouter)
  .merge("hello", helloRouter)
  .merge("pokemon", pokemonRouter);

export type AppRouter = typeof appRouter;
