import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import "./Home.css";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Slices/ProductSlices/ProductSlice";
import Loader from "../layout/Loader/Loader";
function Home() {
 
  const dispatch = useDispatch();
  const { products, loading ,error,productCount} = useSelector((state) => state.product);
  useEffect(() => {
    if (error) {
  }
    dispatch(getProducts());
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Ecommerce" />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>Scroll</button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard product={product} />
              ))}
          </div>
        </>
      )}
    </>
  );
}

export default Home;
