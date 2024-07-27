import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getOrderDetails = createAsyncThunk("orderDetails", async (args) => {
    const { data } = await axios.get(`/api/v1/order/${args.id}`);
    console.log("asfbnbjhbvk");

  try {
    return data.order;
  } catch (error) {
    return error;
  }
});

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState: {
    loading: false,
    error: null,
    order: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getOrderDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    });
    builder.addCase(getOrderDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default orderDetailsSlice.reducer;
