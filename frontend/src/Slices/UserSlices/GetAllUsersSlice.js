import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk("getAllUsers", async (args) => {
  const { data } = await axios.get(`/api/v1/admin/users`);
  try {
    return data ;
  } catch (error) {
    return error;
  }
});

const getAllUsersSlice = createSlice({
  name: "allUsers",
  initialState: {
    loading: false,
    error: null,
    users: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false, 
      state.error = action.payload.error;
    });
  },
});

export default getAllUsersSlice.reducer;
