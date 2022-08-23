import { createRouter } from "../router";
import * as trpc from "@trpc/server";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const notesRouter = createRouter().mutation(".create", {
  input: z.object({
    content: z.string(),
    title: z.string(),
  }),
  async resolve({ ctx, input }) {
    const { content, title } = input;
    const userId = "";
    try {
      const note = await ctx.prisma.note.create({
        data: {
          content,
          title,
          userId,
        },
      });
      return note;
    } catch (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  },
});
