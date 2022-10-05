import React from "react";

import { trpc } from "@/utils/trpc";
import { Note, User } from "@prisma/client";
import { toast } from "react-toastify";
import { LoadingButton } from "../common/loadingButton";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

type ShowNoteProps = {
  note: Note & { user: User };
  hideDelete?: boolean;
};

const ShowNote: React.FC<ShowNoteProps> = ({ note, hideDelete }) => {
  const utils = trpc.useContext();

  const {
    isLoading: isDeleting,
    mutate: DeleteNote,
    error,
  } = trpc.useMutation(["notes.delete"], {
    onError: (error) => {
      toast.error(error.message, {
        type: "error",
        position: "top-right",
      });
    },
    onSuccess: (data) => {
      toast.success("Notes deleted successfully");
      utils.invalidateQueries(["notes.findAll"]);
    },
  });

  const performDelete = () => {
    console.log("Meep, ", note.id);
    DeleteNote({ ids: [note.id] });
  };

  const DisplayUserInfo = () => {
    if (note.user && note.user.image) {
      return (
        <>
          Posted at:
          {formatDistance(new Date(note.createdAt), new Date(), {
            addSuffix: true,
          })}
          by
          <img className="rounded-full w-4 h-4" src={note.user?.image ?? ""} />
          {note.user.name}
        </>
      );
    }
    return <></>;
  };

  return (
    <div className="p-4 mt-2 bg-gray-100 rounded-md text-black">
      <h2 className="text-xl font-bold">{note.title}</h2>
      <DisplayUserInfo />
      <hr />
      <p className="text-medium">{note.content}</p>

      {!hideDelete && (
        <LoadingButton
          btnColor="primary"
          loading={isDeleting}
          type={"button"}
          onClick={performDelete}
        >
          Delete
        </LoadingButton>
      )}
    </div>
  );
};

export default ShowNote;
