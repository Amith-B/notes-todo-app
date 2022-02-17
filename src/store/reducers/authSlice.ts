import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../";
import { LoginDetails, RegisterDetails } from "../../models/Auth";
import { SIGNIN, SIGNUP } from "../../models/Api";
import http from "../../helpers/httpService";
import { AxiosError } from "axios";

export interface LoginData {
  token: string;
  user: {
    email: string;
    name: string;
    _id: string;
  };
}
export interface AuthState {
  login: {
    error: Partial<LoginDetails>;
    isLoggedIn: boolean;
    data: LoginData;
    status: "idle" | "loading" | "failed";
  };
  register: {
    error: Partial<RegisterDetails>;
    status: "idle" | "loading" | "failed";
  };
}

const initialState: AuthState = {
  login: {
    error: {},
    isLoggedIn: false,
    data: {
      token: "",
      user: {
        email: "",
        name: "",
        _id: "",
      },
    },
    status: "idle",
  },
  register: {
    error: {},
    status: "idle",
  },
};

export const signIn = createAsyncThunk(
  "auth/Signin",
  async (loginDetails: LoginDetails, { rejectWithValue }) => {
    try {
      const response = await http.post(SIGNIN, loginDetails);
      return response.data;
    } catch (err: AxiosError | any) {
      let error: AxiosError = err;
      if (!error?.response?.data?.error) {
        throw err;
      }
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/Signup",
  async (signupDetails: RegisterDetails, { rejectWithValue }) => {
    try {
      const response = await http.post(SIGNUP, signupDetails);
      return response.data;
    } catch (err: AxiosError | any) {
      let error: AxiosError = err;
      if (!error?.response?.data?.error) {
        throw err;
      }
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.login.isLoggedIn = false;
      state.login.data = initialState.login.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.login.status = "loading";
        state.login.error = {};
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.login.status = "idle";
        state.login.error = {};
        state.login.isLoggedIn = true;
        state.login.data = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.login.status = "failed";
        state.login.isLoggedIn = false;
        state.login.error = action.payload as Partial<LoginDetails>;
      })
      .addCase(signUp.pending, (state) => {
        state.register.status = "loading";
        state.register.error = {};
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.register.status = "idle";
        state.register.error = {};
      })
      .addCase(signUp.rejected, (state, action) => {
        state.register.status = "failed";
        state.register.error = action.payload as Partial<LoginDetails>;
      });
  },
});

export const { logout } = authSlice.actions;

export const selectProfile = (state: RootState) => state.auth.login.data;
export const selectToken = (state: RootState) => state.auth.login.data.token;
export const selectLoginError = (state: RootState) => state.auth.login.error;
export const selectIsLoggedIn = (state: RootState) =>
  state.auth.login.isLoggedIn;
export const selectLoginStatus = (state: RootState) => state.auth.login.status;

export const selectRegisterError = (state: RootState) =>
  state.auth.register.error;
export const selectRegisterStatus = (state: RootState) =>
  state.auth.register.status;

export default authSlice.reducer;
