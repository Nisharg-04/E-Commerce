import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addItemsToCart = createAsyncThunk(
  "addItemsToCart",
  async (args) => {
    const { data } = await axios.get(`/api/v1/product/${args.id}`);
    try {
      const payload = {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.stock,
        quantity: args.quantity,
      };
      return payload;
    } catch (error) {
      return error;
    }
  }
);

export const removeItemsToCart = createAsyncThunk(
  "removeItemsToCart",
  async (args) => {
    try {
      return args.id;
    } catch (error) {
      return error;
    }
  }
);
export const saveShippingInfo = createAsyncThunk(
  "saveShippingInfo",
  async (args) => {
    try {
      return args;
    } catch (error) {
      return error;
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    shippingInfo: {},
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );
      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i.product === isItemExist.product ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addItemsToCart.fulfilled, (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );
      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i.product === isItemExist.product ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    });
    builder.addCase(removeItemsToCart.fulfilled, (state, action) => {
      state.cartItems = state.cartItems.filter(
        (i) => i.product !== action.payload
      );
    });
    builder.addCase(saveShippingInfo.fulfilled, (state, action) => {
      state.shippingInfo = action.payload;
    });
  },
});

export default cartSlice.reducer;
