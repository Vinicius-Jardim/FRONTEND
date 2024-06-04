import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './homePage/HomePage';
import Orders from './orders/Orders';
import Products from './products/Products'; 
import Login from './login/Login';
import Register from './users/Register';
import PasswordRecovery from './users/PasswordRecovery';
import PasswordReset from './users/PasswordReset';

function App() {
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

        </Routes>
      </main>
    </div>
  );
}

export default App;
