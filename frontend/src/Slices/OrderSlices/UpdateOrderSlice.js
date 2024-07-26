import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//read actions
export const updateOrder = createAsyncThunk("updateOrder", async (args) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  let myData = {
    status: args.status,
  };
  const { data } = await axios.put(
    `/api/v1/admin/order/${args.id}`,
    myData,
    config
  );
  try {
    return data;
  } catch (error) {
    return error;
  }
});

const updateOrderSlice = createSlice({
  name: "updateOrder",
  initialState: {
    isUpdated: null,
    error: null,
    loading: false,
  },
  reducers: {
    resetupdateOrder: (state, action) => {
      state.isUpdated = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      state.isUpdated = action.payload.success;
      state.loading = false;
    });
    builder.addCase(updateOrder.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});
export const { resetupdateOrder } = updateOrderSlice.actions;

export default updateOrderSlice.reducer;
