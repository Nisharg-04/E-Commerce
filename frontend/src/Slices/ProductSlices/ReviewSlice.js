import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "dotenv";
//read actions
export const createNewReview = createAsyncThunk("newReview", async (args) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const { data } = await axios.put("/api/v1/review", args, config);
  try {
    return data.success;
  } catch (error) {
    return error;
  }
});

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    loading: true,
    error: null,
    success: null,
  },
  extraReducers: (builder) => {
    builder.addCase(createNewReview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createNewReview.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.products;
    });
    builder.addCase(createNewReview.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message;
    });
  },
});

export default reviewSlice.reducer;
