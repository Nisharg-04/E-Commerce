import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//read actions
export const deleteUser = createAsyncThunk("deleteUser", async (args) => {
  const { data } = await axios.delete(`/api/v1/admin/user/${args.id}`);
  try {
    return data;
  } catch (error) {
    return error;
  }
});

const deleteUserSlice = createSlice({
  name: "deleteUser",
  initialState: {
    isDeleted: null,
    error: null,
  },
  reducers: {
    resetdeleteUser: (state, action) => {
      state.isDeleted = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteUser.pending, (state) => {});
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isDeleted = action.payload.success;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});
export const { resetdeleteUser } = deleteUserSlice.actions;

export default deleteUserSlice.reducer;
