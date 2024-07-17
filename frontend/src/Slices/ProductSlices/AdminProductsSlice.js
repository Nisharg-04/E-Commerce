import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//read actions
export const getAdminProducts = createAsyncThunk(
  "getAdminProducts",
  async (args) => {
    const { data } = await axios.get(`/api/v1/admin/products`);
    try {
      return data.products;
    } catch (error) {
      return error;
    }
  }
);


const adminProductSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getAdminProducts.pending, (state) => {});
    builder.addCase(getAdminProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(getAdminProducts.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default adminProductSlice.reducer;
