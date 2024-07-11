import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../Slices/ProductSlices/ProductSlice";
import getProductDetailsreducer from "../Slices/ProductSlices/GetProductDetailSlice";
import userReducer from "../Slices/UserSlices/LoginSlice";
import profileReducer from "../Slices/UserSlices/ProfileSlice";
import forgotPasswordReducer from "../Slices/UserSlices/ForgotPasswordSlice";
import cartReducer from "../Slices/OrderSlices/CartSlice";
import newOrderReducer from "../Slices/OrderSlices/OrderSlice";
import myordersReducer from "../Slices/OrderSlices/MyOrderSlice";
import orderDetailsReducer from "../Slices/OrderSlices/OrderDetailsSlice";
import newReviewReducer from "../Slices/ProductSlices/ReviewSlice";
import getAdminproductsReducer from "../Slices/ProductSlices/AdminProductsSlice";
import newProductReducer from "../Slices/ProductSlices/NewAdminProductSlice";
import deleteProductReducer from "../Slices/ProductSlices/DeleteProductSlice";
import updateProductReducer from "../Slices/ProductSlices/UpdateProduct";
import allOrdersReducer from "../Slices/OrderSlices/GetOrderSlice";
import deleteOrderReducer from "../Slices/OrderSlices/DeleteOrder";
import updateOrderReducer from "../Slices/OrderSlices/UpdateOrderSlice";
import allUsersReducer from "../Slices/UserSlices/GetAllUsersSlice";
import deleteUserReducer from "../Slices/UserSlices/DeleteUserSlice";
import updateUserReducer from "../Slices/UserSlices/UpdateUser";
import userDetailsReducer from "../Slices/UserSlices/UserDetailsSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    productDetails: getProductDetailsreducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myordersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    products: getAdminproductsReducer,
    newProduct: newProductReducer,
    deleteProduct: deleteProductReducer,
    updateProduct: updateProductReducer,
    allOrders: allOrdersReducer,
    deleteOrder: deleteOrderReducer,
    updateOrder: updateOrderReducer,
    allUsers: allUsersReducer,
    deleteUser: deleteUserReducer,
    updateUser: updateUserReducer,
    userDetails: userDetailsReducer,
  },
});

export default store;
