import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllOrders = createAsyncThunk("getAllOrders", async (args) => {
  const { data } = await axios.get(`/api/v1/admin/orders`);
  try {
    return data ;
  } catch (error) {
    return error;
  }
});

const getAllOrdersSlice = createSlice({
  name: "allOrders",
  initialState: {
    loading: false,
    error: null,
    orders: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getAllOrders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
    });
    builder.addCase(getAllOrders.rejected, (state, action) => {
      state.loading = false, 
      state.error = action.payload.error;
    });
  },
});

export default getAllOrdersSlice.reducer;
