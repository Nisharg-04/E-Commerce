import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//read actions
export const getUserDetails = createAsyncThunk(
  "getUserDetails",
  async (args) => {
    const { data } = await axios.get(`/api/v1/admin/user/${args}`);
    try {
      return data;
    } catch (error) {
      return error;
    }
  }
);

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {
    user: {},
    error: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getUserDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    
    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
     
    });
  },
});

export default userDetailsSlice.reducer;
