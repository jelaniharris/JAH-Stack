import React from "react";
import { trpc } from "@/utils/trpc";
import ShowNote from "./showNote";

const NotesList = () => {
  const { data: allNotes } = trpc.useQuery(["notes.findAll", { limit: null }]);

  return (
    <div className="mt-6">
      <h2>All Notes</h2>
      {allNotes &&
        allNotes.map((note) => <ShowNote key={note.id} note={note} />)}
    </div>
  );
};

export default NotesList;
