import { createRouter } from "../router";
import * as trpc from "@trpc/server";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createNoteSchema } from "@/schema/notes.schema";

export const notesRouter = createRouter()
  .query(".findAll", {
    resolve: async ({ ctx }) => {
      try {
        const notes = await ctx.prisma.note.findMany();
        return notes;
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    },
  })
  .mutation(".create", {
    input: createNoteSchema,
    async resolve({ ctx, input }) {
      const { content, title, userId } = input;
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
