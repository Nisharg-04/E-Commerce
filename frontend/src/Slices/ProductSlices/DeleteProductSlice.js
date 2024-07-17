import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//read actions
export const deleteProduct = createAsyncThunk("deleteProduct", async (args) => {
  const { data } = await axios.delete(`/api/v1/admin/product/${args.id}`);
  try {
    return data;
  } catch (error) {
    return error;
  }
});

const deleteProductSlice = createSlice({
  name: "deleteProduct",
  initialState: {
    isDeleted: null,
    error: null,
  },
  reducers: {
    resetdeleteProduct: (state, action) => {
      state.isDeleted = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteProduct.pending, (state) => {});
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.isDeleted = action.payload.success;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});
export const { resetdeleteProduct } = deleteProductSlice.actions;

export default deleteProductSlice.reducer;
