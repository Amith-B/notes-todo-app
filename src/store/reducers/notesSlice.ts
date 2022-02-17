import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GETNOTES } from "../../models/Api";
import http from "../../helpers/httpService";
import { selectToken } from "./authSlice";
import { RootState } from "..";

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
    const response = await http.get(`${GETNOTES}`, {
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
      });
  },
});

export const selectNotes = (state: RootState) => state.notes.data;
export const selectNotesStatus = (state: RootState) => state.notes.status;

// export const { getNotes, getNote,updateColor, updateNote, deleteNote, addNote } = notesSlice.actions;

export default notesSlice.reducer;
