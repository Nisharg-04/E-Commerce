import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loadUser = createAsyncThunk("loadUser", async (args) => {
  const { data } = await axios.get(`/api/v1/me`);

  try {
    return data;
  } catch (error) {
    return error;
  }
});

const loadUserSlice = createSlice({
  name: "loadUser",
  initialState: {
    user: {},
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(loadUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.isAuthenticated = false;
    });
  },
});

export default loadUserSlice.reducer;
