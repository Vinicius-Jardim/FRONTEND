import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./homePage/HomePage";
import Orders from "./orders/Orders";
import Products from "./products/Products";
import Login from "./login/Login";
import Register from "./users/Register";
import PasswordRecovery from "./users/PasswordRecovery";
import PasswordReset from "./users/PasswordReset";
import ProductsDetails from "./products/details/ProductsDetails";
import { useState } from "react";

function App() {

  const [products, setProducts] = useState({
    products: [],
    pagination: {
      current: 1,
      pageSize: 8,
      total: 0,
    },
  });

  const handleSearch = (results) => {
    setProducts({
      products: results,
      pagination: {
        current: 1,
        pageSize: results.length,
        total: results.length
      }
    });
  };


  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recover" element={<PasswordRecovery />} />
          <Route path="/reset/:token" element={<PasswordReset />} />
          <Route path="/products/:productId" element={<ProductsDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
