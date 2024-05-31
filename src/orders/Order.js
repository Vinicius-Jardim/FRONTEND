import React from "react";
import "./Order.css";


const Order = (props) => {


  return (
    <li className="order">
      <div className="order_products">
        <label className="order-label">{props._id} </label>
      </div>
      <div className="order_quantity">
        <label className="order-label">{props.quantity} </label>
      </div>
      <div className="order_client">
        <label className="order-label">Em stock: {props.client} </label>
        </div>
        <div className="order_data">
        <label className="order-label">Em stock: {props.date} </label>
        
      </div>
      <div className="order_priceTotal">
        <label className="order-label">Em stock: {props.priceTotal} </label>
        
      </div>
    </li>
  );
};

export default Order;
