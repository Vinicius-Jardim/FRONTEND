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
import Account from "./users/Account/Account";
import ChangePassword from "./users/ChangePassword";
import { AuthProvider } from "./authcontext/AuthContext";
import Gestao from "./users/Gestao/Gestao";


function App() {

  const [ setProducts] = useState({
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
        <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recover" element={<PasswordRecovery />} />
          <Route path="/reset/:token" element={<PasswordReset />} />
          <Route path="/products/:productId" element={<ProductsDetails />} />
          <Route path="/account" element={<Account />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/gestao" element={<Gestao />} />
        </Routes>
        </AuthProvider>
      </main>
    </div>
  );
}

export default App;
