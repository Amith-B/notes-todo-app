import "./NoteList.css";
import Note from "./Note";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getNotes,
  Notes,
  selectNotes,
  selectNotesStatus,
} from "../../store/reducers/notesSlice";

function NoteList() {
  const dispatch = useAppDispatch();
  const notes = useAppSelector(selectNotes);
  const notesStatus = useAppSelector(selectNotesStatus);
  const [notesList, setNotesList] = React.useState<Notes[]>([]);

  React.useEffect(() => {
    dispatch(getNotes(1));
  }, []);

  React.useEffect(() => {
    setNotesList(notes);
  }, [notes]);

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
            heading={note.title}
            noteId={note._id}
            content={note.content}
            color={"" + note.color}
            dateCreated={new Date(note.createdAt)}
            onColorChange={(color: string) => console.log(color)}
            onClick={(noteId: string) => console.log(note)}
          />
        );
      })}
    </div>
  );
}

export default NoteList;
