import z from "zod";

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

export type CreateNoteInput = z.TypeOf<typeof createNoteSchema>;
export type NoteInput = z.TypeOf<typeof NotesSchema>;
