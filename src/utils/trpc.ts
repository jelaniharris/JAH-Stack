import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "@/pages/backend/router";

export const trpc = createReactQueryHooks<AppRouter>();
// => { useQuery: ..., useMutation: ...}
