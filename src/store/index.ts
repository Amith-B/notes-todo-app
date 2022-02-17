import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import reducers from "./reducers";

const { authReducer, notesReducer, todoReducer } = reducers;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer,
    // todo: todoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
