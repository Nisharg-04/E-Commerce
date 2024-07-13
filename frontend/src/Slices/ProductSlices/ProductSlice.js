import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//read actions
export const getProducts = createAsyncThunk(
  "getProducts",
  async (args = {
    keyword:"",
    currentPage:1,
    price:[0,200000],
    category:"",
    ratings:0,
  }) => {
    let link = `/api/v1/products?keyword=${args.keyword}&page=${args.currentPage}&price[gte]=${args.price[0]}&price[lte]=${args.price[1]}&ratings[gte]=${args.ratings}`;
   if(args.category!=""){
    link=`/api/v1/products?keyword=${args.keyword}&page=${args.currentPage}&price[gte]=${args.price[0]}&price[lte]=${args.price[1]}&category=${args.category}&ratings[gte]=${args.ratings}`;
   }
   
   
   
    const { data } = await axios.get(link);
    try {
      return data;
    } catch (error) {
      return error;
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: true,
    error: null,
    resultPerPage: 0,
    productsCount:0,
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.resultPerPage = action.payload.resultPerPage;
      state.productsCount=action.payload.productsCount;

    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;

      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;
