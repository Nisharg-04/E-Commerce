import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//read actions
export const deleteOrder = createAsyncThunk("deleteOrder", async (args) => {
  const { data } = await axios.delete(`/api/v1/admin/order/${args.id}`);
  try {
    return data;
  } catch (error) {
    return error;
  }
});

const deleteOrderSlice = createSlice({
  name: "deleteOrder",
  initialState: {
    isDeleted: null,
    error: null,
  },
  reducers: {
    resetdeleteOrder: (state, action) => {
      state.isDeleted = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteOrder.pending, (state) => {});
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.isDeleted = action.payload.success;
    });
    builder.addCase(deleteOrder.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});
export const { resetdeleteOrder } = deleteOrderSlice.actions;

export default deleteOrderSlice.reducer;
