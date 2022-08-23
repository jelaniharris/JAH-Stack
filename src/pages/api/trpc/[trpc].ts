import { AppRouter, appRouter } from "@/pages/backend/router/app.router";
import { inferProcedureOutput } from "@trpc/server";
import { createContext } from "@/pages/backend/context";
import * as trpcNext from "@trpc/server/adapters/next";

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  onError({ error }) {
    if (error.code === "INTERNAL_SERVER_ERROR") {
      console.error("Something went wrong", error);
    } else {
      console.log(error);
    }
  },
});

// Helper for infering type from query
export type inferQueryResponse<
  TRouteKey extends keyof AppRouter["_def"]["queries"]
> = inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;
