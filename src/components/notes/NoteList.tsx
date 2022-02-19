import "./NoteList.css";
import Note from "./Note";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  deleteNotes,
  getNotes,
  Notes,
  selectNotes,
  selectNotesStatus,
  updateNotes,
} from "../../store/reducers/notesSlice";
import Alert from "../Alert";

function NoteList() {
  const dispatch = useAppDispatch();
  const notes = useAppSelector(selectNotes);
  const notesStatus = useAppSelector(selectNotesStatus);
  const [notesList, setNotesList] = React.useState<Notes[]>([]);
  const [activeNoteId, setActiveNoteId] = React.useState<string | undefined>();
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch(getNotes(1));
  }, []);

  React.useEffect(() => {
    setNotesList(notes);
  }, [notes]);

  const handleDelete = (noteId: string) => {
    setActiveNoteId(noteId);
    setAlertOpen(true);
  };

  const handleAgree = () => {
    activeNoteId && dispatch(deleteNotes(activeNoteId));
    setActiveNoteId(undefined);
    handleAlertClose();
  };

  const handleDisAgree = () => {
    setActiveNoteId(undefined);
    handleAlertClose();
  };

  const handleAlertClose = () => {
    setActiveNoteId(undefined);
    setAlertOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        placeContent: "center space-around",
      }}
    >
      {notesList.map((note) => {
        return (
          <Note
            key={note._id}
            title={note.title}
            noteId={note._id}
            content={note.content}
            color={note.color}
            dateUpdated={new Date(note.updatedAt)}
            onColorChange={(noteId: string, color: string) => {
              dispatch(updateNotes({ noteId, data: { color: +color } }));
            }}
            onClick={(noteId: string) => console.log(noteId)}
            onDelete={(noteId: string) => {
              handleDelete(noteId);
            }}
          />
        );
      })}
      <Alert
        open={alertOpen}
        title={"Are you sure you want to delete this note?"}
        description={
          "Deleting this note cannot be undone. So please be sure of this action."
        }
        handleClose={handleAlertClose}
        onAgree={handleAgree}
        onDisagree={handleDisAgree}
        actionText={{ agree: "Delete", disAgree: "Cancel" }}
      />
    </div>
  );
}

export default NoteList;
