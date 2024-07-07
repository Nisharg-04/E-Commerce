import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk("register", async (args) => {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  const { data } = await axios.post(`/api/v1/register`, args, config);
  try {
    return data;
  } catch (error) {
    return error;
  }
});

const registerUserSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.isAuthenticated = false;
    });
  },
});

export default registerUserSlice.reducer;
