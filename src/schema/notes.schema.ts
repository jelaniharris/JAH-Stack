import z from "zod";

export const findNoteSchema = z.object({
  limit: z.number().gt(1, "Has to at least have one").nullable(),
});

export const createNoteSchema = z.object({
  title: z.string().min(1, "A title is required").max(127),
  content: z.string().min(1, "Content is required").max(127),
  userId: z.string(),
});

export const NotesSchema = z.array(
  z.object({
    title: z.string(),
    content: z.string(),
  })
);

export const deleteNoteSchema = z.object({
  ids: z.string().array(),
});

export type CreateNoteInput = z.TypeOf<typeof createNoteSchema>;
export type NoteInput = z.TypeOf<typeof NotesSchema>;
