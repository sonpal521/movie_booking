/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import axiosInstance from "../../Config/AxiosInstance";

interface AuthState {
  role: string;
  data: string | undefined;
  token: string;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorage.getItem("data") || "null"),
  token: localStorage.getItem("token") || "",
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn") || "false"),
};

export const login = createAsyncThunk("/auth/login", async (data: any) => {
  try {
    const response = await axiosInstance.post("/mba/api/v1/auth/signin", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const signup = createAsyncThunk("/auth/signup", async (data: any) => {
  try {
    const response = await axiosInstance.post("/mba/api/v1/auth/signup", data);
    return response.data;
  } catch (error) {
    console.error("printing error", error);
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.role = "";
      state.isLoggedIn = false;
      state.data = undefined;
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
      if (!action.payload) return;
      console.log(action.payload);
      state.isLoggedIn = action.payload?.data?.token !== undefined;
      state.data = action.payload?.data;
      state.token = action.payload?.data?.token;
      state.role = action.payload?.data?.role;
      localStorage.setItem("role", action.payload?.data?.role || "");
      localStorage.setItem(
        "isLoggedIn",
        JSON.stringify(action.payload?.data?.token !== undefined)
      );
      localStorage.setItem("data", JSON.stringify(action.payload?.data));
      localStorage.setItem("token", action.payload?.data?.token || "");
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
