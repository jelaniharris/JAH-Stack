import type { NextPage } from "next";
import { useEffect } from "react";
import { trpc } from "@/utils/trpc";
import { PanelContainer } from "../common/panelContainer";
import ShowNote from "../notes/showNote";
import Link from "next/link";

const NotesContainer: NextPage = () => {
  const { data: allNotes } = trpc.useQuery(["notes.findAll", { limit: 2 }]);

  useEffect(() => {}, []);

  return (
    <PanelContainer>
      <div className="text-xl text-black mb-4">Notes</div>
      {allNotes &&
        allNotes.map((note) => (
          <ShowNote hideDelete key={note.id} note={note} />
        ))}
      <Link href="/notes">
        <a className="btn btn-primary my-4">Show More Notes</a>
      </Link>
      <div className="grow w-full text-9xl text-black"></div>
    </PanelContainer>
  );
};

export default NotesContainer;
