import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { AlertColor } from "@mui/material/Alert";

export interface CommonState {
  alert: {
    open: boolean;
    type: AlertColor;
    message: string;
  };
}

const initialState: CommonState = {
  alert: {
    open: false,
    type: "success",
    message: "",
  },
};

export const commonSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    closeAlert: (state) => {
      state.alert.open = false;
      state.alert.type = "success";
      state.alert.message = "";
    },
    openAlert: (
      state,
      { payload }: { payload: { type: AlertColor; message: string } }
    ) => {
      state.alert.open = true;
      state.alert.type = payload.type;
      state.alert.message = payload.message;
    },
  },
});

export const selectAlert = (state: RootState) => state.common.alert;

export const { closeAlert, openAlert } = commonSlice.actions;

export default commonSlice.reducer;
