import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const update = createAsyncThunk("update", async (args) => {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  const { data } = await axios.put(`/api/v1/me/update`, args, config);
  try {
    return data;
  } catch (error) {
    return error;
  }
});
export const updatePassword = createAsyncThunk(
  "updatePassword",
  async (args) => {
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/api/v1/password/update`, args, config);
    try {
      return data;
    } catch (error) {
      return error;
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    isUpdated: false,
    loading: false,
    error: null,
  },
  reducers: {
    resetUpdate: (state, action) => {
      state.isUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(update.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload.success;
    });
    builder.addCase(update.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updatePassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload.success;
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export const { resetUpdate } = profileSlice.actions;

export default profileSlice.reducer;
