import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//read actions
export const newProduct = createAsyncThunk("newAdminProduct", async (args) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  let myData = {
    name: args.name,
    price: args.price,
    description: args.description,
    category:  args.category,
    stock: Number(args.stock),
    images:args.images
  };
  const { data } = await axios.post(`/api/v1/admin/product/new`, myData, config);
  try {
    return data;
  } catch (error) {
    return error;
  }
});

const newAdminProductSlice = createSlice({
  name: "newProduct",
  initialState: {
    // product: {},
    success: null,
    error: null,
    loading: false,
  },
  reducers: {
    resetNewProduct: (state, action) => {
      state.product = {};
      state.success = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(newProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(newProduct.fulfilled, (state, action) => {
      // state.product = action.payload.product;
      state.success = action.payload.success;
      state.loading = false;
    });
    builder.addCase(newProduct.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});
export const { resetNewProduct } = newAdminProductSlice.actions;
export default newAdminProductSlice.reducer;
