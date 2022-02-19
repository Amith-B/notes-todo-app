import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NOTES } from "../../models/Api";
import http from "../../helpers/httpService";
import { selectToken } from "./authSlice";
import { RootState } from "..";
import { UpdateNotesPayload } from "../../models/Note";

export interface Notes {
  color: number;
  content: string;
  createdAt: string;
  title: string;
  updatedAt: string;
  user: string;
  _id: string;
}

export interface NotesState {
  data: Notes[];
  status: "idle" | "loading" | "failed";
  page: number;
}

const initialState: NotesState = {
  data: [],
  status: "idle",
  page: 0,
};

export const getNotes = createAsyncThunk(
  "notes/getNotes",
  async (page: number, { getState }) => {
    const authToken = selectToken(getState() as RootState);
    const response = await http.get(`${NOTES}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  }
);

export const updateNotes = createAsyncThunk(
  "notes/updateNotes",
  async (
    payload: { noteId: string; data: UpdateNotesPayload },
    { getState }
  ) => {
    const authToken = selectToken(getState() as RootState);
    const response = await http.patch(
      `${NOTES}/${payload.noteId}`,
      payload.data,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  }
);

export const deleteNotes = createAsyncThunk(
  "notes/deleteNotes",
  async (noteId: string, { getState }) => {
    const authToken = selectToken(getState() as RootState);
    const response = await http.delete(`${NOTES}/${noteId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  }
);

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
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
export const selectNotesStatus = (state: RootState) => state.notes.status;

// export const { getNotes, getNote,updateColor, updateNote, deleteNote, addNote } = notesSlice.actions;

export default notesSlice.reducer;
