import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//read actions
export const updateUser = createAsyncThunk("updateUser", async (args) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  let myData = {
    name: args.status,
    email: args.email,
    role: args.role,
  };
  const { data } = await axios.put(
    `/api/v1/admin/user/${args.userId}`,
    myData,
    config
  );
  try {
    return data;
  } catch (error) {
    return error;
  }
});

const updateUserSlice = createSlice({
  name: "updateUser",
  initialState: {
    isUpdated: null,
    error: null,
    loading: false,
  },
  reducers: {
    resetupdateUser: (state, action) => {
      state.isUpdated = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isUpdated = action.payload.success;
      state.loading = false;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});
export const { resetupdateUser } = updateUserSlice.actions;

export default updateUserSlice.reducer;
