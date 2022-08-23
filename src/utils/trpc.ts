import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "@/pages/backend/router/app.router";

export const trpc = createReactQueryHooks<AppRouter>();
// => { useQuery: ..., useMutation: ...}
