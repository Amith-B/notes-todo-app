import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NOTES as NOTESAPI } from "../../models/Api";
import http from "../../helpers/httpService";
import { selectToken } from "./authSlice";
import { RootState } from "..";
import { AddNotesPayload, Notes, UpdateNotesPayload } from "../../models/Note";
import { openAlert } from "./commonSlice";

export interface NotesState {
  data: Notes[];
  status: "idle" | "loading" | "failed";
  page: number;
  isNoteOpen: boolean;
}

const initialState: NotesState = {
  data: [],
  status: "idle",
  page: 0,
  isNoteOpen: false,
};

export const getNotes = createAsyncThunk(
  "notes/getNotes",
  async (page: number, { getState }) => {
    const authToken = selectToken(getState() as RootState);
    const response = await http.get(`${NOTESAPI}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  }
);

export const addNotes = createAsyncThunk(
  "notes/addNotes",
  async (note: AddNotesPayload, { dispatch, getState }) => {
    const authToken = selectToken(getState() as RootState);
    const response = await http.post(`${NOTESAPI}`, note, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    dispatch(
      openAlert({
        type: "success",
        message: "Success in adding the note",
      })
    );
    return response.data;
  }
);

export const updateNotes = createAsyncThunk(
  "notes/updateNotes",
  async (
    payload: { noteId: string; data: UpdateNotesPayload },
    { dispatch, getState }
  ) => {
    const authToken = selectToken(getState() as RootState);
    const response = await http.patch(
      `${NOTESAPI}/${payload.noteId}`,
      payload.data,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const updatedKeys = Object.keys(payload.data);
    dispatch(
      openAlert({
        type: "success",
        message: `Success in updating the  ${
          updatedKeys.length === 1 && updatedKeys[0] === "color"
            ? "color"
            : "note"
        }`,
      })
    );
    return response.data;
  }
);

export const deleteNotes = createAsyncThunk(
  "notes/deleteNotes",
  async (noteId: string, { dispatch, getState }) => {
    const authToken = selectToken(getState() as RootState);
    const response = await http.delete(`${NOTESAPI}/${noteId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    dispatch(
      openAlert({
        type: "success",
        message: "Success in deleting the note",
      })
    );
    return response.data;
  }
);

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setEditNoteVisiblity: (state, { payload }) => {
      state.isNoteOpen = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      })
      .addCase(getNotes.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(addNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNotes.fulfilled, (state, action) => {
        state.status = "idle";
        state.data.push(action.payload);
        state.isNoteOpen = false;
        state.data.sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));
      })
      .addCase(addNotes.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(updateNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateNotes.fulfilled, (state, action) => {
        state.status = "idle";
        state.data.forEach((note) => {
          if (note._id === action.payload._id) {
            note.color = action.payload.color;
            note.content = action.payload.content;
            note.title = action.payload.title;
            note.updatedAt = action.payload.updatedAt;
          }
        });
        state.isNoteOpen = false;
        state.data.sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));
      })
      .addCase(updateNotes.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(deleteNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteNotes.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = state.data.filter(
          (note) => note._id !== action.payload._id
        );
      })
      .addCase(deleteNotes.rejected, (state) => {
        state.status = "idle";
      });
  },
});

export const selectNotes = (state: RootState) => state.notes.data;
export const selectNoteById = (notes: Notes[], noteId: string) =>
  notes.find((note) => note._id === noteId);
export const selectNotesStatus = (state: RootState) => state.notes.status;
export const selectIsNoteOpen = (state: RootState) => state.notes.isNoteOpen;

export const { setEditNoteVisiblity } = notesSlice.actions;

export default notesSlice.reducer;
