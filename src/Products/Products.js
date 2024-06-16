import React from "react";
import "./Products.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../header/Header";
import ProductTable from "./ProductTable";
import Footer from "../footer/Footer";

const getToken = () => localStorage.getItem('token');

const Products = () => {
  let Navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  let location = useLocation();

  useEffect(() => {
    fetch("http://127.0.0.1:3000/store/products", {
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response && response.auth) {
          if (response.products) {
            setProducts(response.products);
            setLoading(false);
          } else {
            console.error('Invalid response:', response);
          }
        } else {
          console.error('Not authorized:', response);
          Navigate('/');
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });

    return () => setProducts([]);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <div className="player-container">
        <ProductTable url={location} products={products} />
      </div>
      <Footer />
    </>
  );
};

export default Products;
