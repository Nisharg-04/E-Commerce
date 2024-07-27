import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk(
  "newOrder",
  async (args) => {
    const config={
        hearders:{
            "Content-Type":"application/json",
        }
    }
    const { data } = await axios.post(`/api/v1/order/new`,args,config);
    try {
     
      return data;
    } catch (error) {
      return error;
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading:false,
    order:null,
    error:null
  },
extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state, action) => {
        state.loading=true
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
        state.loading=false;
        state.order=action.payload.order
     
    });
    builder.addCase(createOrder.rejected, (state, action) => {
        state.loading=false,
        state.error=action.payload
      
    });
   
  },
});

export default orderSlice.reducer;
