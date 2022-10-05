import { createRouter } from "../router";
import * as trpc from "@trpc/server";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  createNoteSchema,
  deleteNoteSchema,
  findNoteSchema,
} from "@/schema/notes.schema";

export const notesRouter = createRouter()
  .query(".findAll", {
    input: findNoteSchema,
    resolve: async ({ ctx, input }) => {
      const { limit } = input;
      try {
        const notes = await ctx.prisma.note.findMany({
          take: limit || undefined,
          orderBy: {
            createdAt: "desc",
          },
          include: {
            user: true,
          },
        });
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
  })
  .mutation(".delete", {
    input: deleteNoteSchema,
    async resolve({ ctx, input }) {
      const { ids } = input;
      try {
        await ctx.prisma.note.deleteMany({
          where: {
            id: { in: ids },
          },
        });
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    },
  });
