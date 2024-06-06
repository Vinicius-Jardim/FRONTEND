import React from "react";
import "./Products.css";
import config from "../Config";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderCopy from "../header/Header copy";
import ProductTable from "./ProductTable";

const Products = () => {
  let Navigate = useNavigate();
  const [isSubmited, setIsSubmited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  let location = useLocation();

  useEffect(() => {
    fetch("http://127.0.0.1:3000/store/products", {
      headers: { Accept: "application/json", "x-access-token": config.token },
    })
      .then((response) => response.json())
      .then((response) => {
        const { auth, products } = response;
        if (auth) {
          setProducts(products);
          setLoading(false);
        }
      });
    return () => setProducts([]);
  }, [isSubmited]);

  if (!config.token) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <HeaderCopy />
      <div className="player-container">
        <ProductTable url={location} />
      </div>
    </>
  );
};

export default Products;
