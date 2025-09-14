/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ name, email, password }) => {
    const response = await axios.post("http://localhost:3000/auth/signup", {
      name,
      email,
      password,
    });
    return response.data;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const response = await axios.post("http://localhost:3000/auth/login", {
      email,
      password,
    });
    return response.data;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const response = await axios.get("http://localhost:3000/auth/logout");
  return response.data;
});

const token = localStorage.getItem("authToken");
const user = token ? JSON.parse(localStorage.getItem("user")) : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user || null,
    isAuth: !!token,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuth = true;
        localStorage.setItem("authToken", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      });
  },
});

export default authSlice.reducer;
