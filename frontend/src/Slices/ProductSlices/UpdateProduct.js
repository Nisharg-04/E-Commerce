import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//read actions
export const updateProduct = createAsyncThunk("updateProduct", async (args) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  let myData = {
    name: args.name,
    price: String(args.price),
    description: args.description,
    category: args.category,
    stock: Number(args.stock),
    images: args.images,
  };
  const { data } = await axios.put(
    `/api/v1/admin/product/${args.productId}`,
    myData,
    config
  );
  try {
    return data;
  } catch (error) {
    return error;
  }
});

const updateProductSlice = createSlice({
  name: "updateProduct",
  initialState: {
    isUpdated: null,
    error: null,
    loading: false,
  },
  reducers: {
    resetupdateProduct: (state, action) => {
      state.isUpdated = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.isUpdated = action.payload.success;
      state.loading = false;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});
export const { resetupdateProduct } = updateProductSlice.actions;

export default updateProductSlice.reducer;
