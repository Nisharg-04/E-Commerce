import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const myOrders = createAsyncThunk("myOrder", async (args) => {
  const { data } = await axios.get(`/api/v1/orders/me`);
  try {
    return data.orders ;
  } catch (error) {
    return error;
  }
});

const myordersSlice = createSlice({
  name: "myorder",
  initialState: {
    loading: false,
    error: null,
    orders: [],
  },
  extraReducers: (builder) => {
    builder.addCase(myOrders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(myOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    });
    builder.addCase(myOrders.rejected, (state, action) => {
      state.loading = false, 
      state.error = action.payload;
    });
  },
});

export default myordersSlice.reducer;
