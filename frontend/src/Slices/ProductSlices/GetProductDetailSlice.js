import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductDetails = createAsyncThunk(
  "getProductDetails",
  async (id) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);
    try {
      return data;
    } catch (error) {

      return error;
    }
  }
);


const getProductDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    product: {},
    loading: true,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getProductDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload.product;
    });
    builder.addCase(getProductDetails.rejected, (state, action) => {
      state.loading = false;
    state.error = action.error.message;
    });
  },
});

export default getProductDetailsSlice.reducer;
