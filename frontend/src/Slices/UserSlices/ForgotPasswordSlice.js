import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async (args) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`/api/v1/password/forgot`, args, config);
    try {
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const resetPassword = createAsyncThunk("resetPassword", async (args) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const passwords = {
    password: args.password,
    confirmPassword: args.confirmPassword,
  };
  const { data } = await axios.put(
    `/api/v1/password/reset/${args.token}`,
    passwords,
    config
  );
  try {
    return data;
  } catch (error) {
    return error;
  }
});

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    message: null,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default forgotPasswordSlice.reducer;
