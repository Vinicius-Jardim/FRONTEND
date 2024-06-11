import React from "react";
import "./Cart.css";
import CartItem from "./CartItem";

function Cart() {
  return (
    <section className="cart">
      <div className="cart-items"><CartItem/></div>
      <div className="cart-total">total</div>
       </section>
  );
}

export default Cart;
