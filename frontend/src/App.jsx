import Home from "./components/Home/Home.jsx";
import Footer from "./components/layout/Footer/Footer.jsx";
import Header from "./components/layout/Header/Header.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ProductDetails } from "./components/Product/ProductDetails.jsx";
import Search from "./components/Product/Search.jsx";
import Products from "./components/Product/Products.jsx";
import LoginSignUp from "./components/User/LoginSignup.jsx";
import store from "./Store/Store.js";
import { useEffect, useState } from "react";
import { loadUser } from "./Slices/UserSlices/LoginSlice.js";
import { useSelector } from "react-redux";
import UserOptions from "./components/layout/Header/UserOptions.jsx";
import Profile from "./components/User/Profile.jsx";
import UpdateProfile from "./components/User/UpdateProfile.jsx";
import UpdatePassword from "./components/User/UpdatePassword.jsx";
import ForgotPassword from "./components/User/ForgotPassword.jsx";
import ResetPassword from "./components/User/ResetPassword.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Shipping from "./components/Cart/Shipping.jsx";
import ConfirmOrder from "./components/Cart/ConfrimOrder.jsx";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./components/Cart/Payment.jsx";
import OrderSuccess from "./components/Cart/OrderSuccess.jsx";
import MyOrders from "./components/Order/Myorders.jsx";
import OrderDetails from "./components/Order/OrderDetails.jsx";
import Dashboard from "./components/Admin/Dashboard.jsx";
import ProductList from "./components/Admin/ProductList.jsx";
import NewProduct from "./components/Admin/NewProduct.jsx";
import UpdateProduct from "./components/Admin/UpdateProduct.jsx";
import Orders from "./components/Admin/Orders.jsx";
import UpdateOrder from "./components/Admin/UpdateOrder.jsx";
import UsersList from "./components/Admin/UsersList.jsx";
import UpdateUser from "./components/Admin/UpdateUser.jsx";
import About from "./components/layout/About/AboutUs.jsx";
import Contact from "./components/layout/Contact/Contact.jsx";
import NotFound from "./components/layout/NotFound/NotFound.jsx";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApikey, setStripeApiKey] = useState("");
  let admin = user && user.role === "admin" ? true : false;
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, [stripeApikey]);

  return (
    <>
      <BrowserRouter>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/login" element={<LoginSignUp />} />
          {isAuthenticated && <Route path="/account" element={<Profile />} />}
          {isAuthenticated && (
            <Route path="/me/update" element={<UpdateProfile />} />
          )}
          {isAuthenticated && (
            <Route path="/password/update" element={<UpdatePassword />} />
          )}

          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          {stripeApikey && (
            <Route
              path="/process/payment"
              element={
                <Elements stripe={loadStripe(stripeApikey)}>
                  <Payment />
                </Elements>
              }
            />
          )}
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/orders/me" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          {isAuthenticated && admin && (
            <Route path="/admin/dashboard" element={<Dashboard />} />
          )}
          {isAuthenticated && admin && (
            <Route path="/admin/products" element={<ProductList />} />
          )}
          {isAuthenticated && admin && (
            <Route path="/admin/product" element={<NewProduct />} />
          )}
          {isAuthenticated && admin && (
            <Route path="/admin/product/:id" element={<UpdateProduct />} />
          )}
          {isAuthenticated && admin && (
            <Route path="/admin/orders" element={<Orders />} />
          )}
          {isAuthenticated && admin && (
            <Route path="/admin/order/:id" element={<UpdateOrder />} />
          )}
          {isAuthenticated && admin && (
            <Route path="/admin/users" element={<UsersList />} />
          )}
          {isAuthenticated && admin && (
            <Route path="/admin/user/:id" element={<UpdateUser />} />
          )}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
