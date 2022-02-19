import "./NoteList.css";
import Note from "./Note";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  deleteNotes,
  getNotes,
  selectNoteById,
  selectNotes,
  selectNotesStatus,
  updateNotes,
  selectIsNoteOpen,
  setEditNoteVisiblity,
} from "../../store/reducers/notesSlice";
import Alert from "../Dialog";
import EditNote from "./EditNote";
import { AddNotesPayload, Notes } from "../../models/Note";
import { Fab, LinearProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { openAlert } from "../../store/reducers/commonSlice";

function NoteList() {
  const dispatch = useAppDispatch();
  const notes = useAppSelector(selectNotes);
  const notesStatus = useAppSelector(selectNotesStatus);
  const [notesList, setNotesList] = React.useState<Notes[]>([]);
  const [activeNoteId, setActiveNoteId] = React.useState<string | undefined>();
  const [activeNoteDetails, setActiveNoteDetails] = React.useState<
    Notes | undefined
  >();
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false);
  const isNoteOpen = useAppSelector(selectIsNoteOpen);

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

  const handleNoteClose = () => {
    setActiveNoteDetails(undefined);
    dispatch(setEditNoteVisiblity(false));
  };

  const handleNoteClick = (noteId: string) => {
    setActiveNoteDetails(selectNoteById(notes, noteId));
    dispatch(setEditNoteVisiblity(true));
  };

  const handleSave = (note: AddNotesPayload) => {
    const updateDetails: Partial<AddNotesPayload> = {};
    if (activeNoteDetails) {
      let modified = false;
      if (activeNoteDetails.title !== note.title) {
        updateDetails.title = note.title;
        modified = true;
      }
      if (activeNoteDetails.content !== note.content) {
        updateDetails.content = note.content;
        modified = true;
      }
      if (modified) {
        dispatch(
          updateNotes({ noteId: activeNoteDetails._id, data: updateDetails })
        );
      } else {
        dispatch(
          openAlert({
            type: "warning",
            message: "Saving without modification is not allowed",
          })
        );
        dispatch(setEditNoteVisiblity(false));
      }
    }

    setActiveNoteDetails(undefined);
  };

  const handleAddNote = () => {
    dispatch(setEditNoteVisiblity(true));
  };

  return (
    <>
      {notesStatus === "loading" && <LinearProgress />}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          placeContent: "center",
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
              onClick={handleNoteClick}
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
        <EditNote
          open={isNoteOpen}
          handleClose={handleNoteClose}
          handleSave={handleSave}
          note={activeNoteDetails}
        />
        <Fab
          sx={{
            position: "fixed",
            right: 20,
            bottom: 20,
          }}
          size="medium"
          color="secondary"
          aria-label="add"
          onClick={handleAddNote}
        >
          <AddIcon />
        </Fab>
      </div>{" "}
    </>
  );
}

export default NoteList;
