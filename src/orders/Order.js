import React from "react";
import "./Order.css";

const Order = ({ order, onDelete }) => {
  return (
<div className="order-item">
  <h2 className="order-item-title">Pedido</h2>
  <p><strong>ID:</strong> {order._id}</p>
  <p><strong>Produto ID:</strong> {order.products}</p>
  <p><strong>Quantidade:</strong> {order.quantity}</p>
  <p><strong>Cliente ID:</strong> {order.client}</p>
  <p><strong>Nome:</strong> {order.clientName}</p>
  <p><strong>Data:</strong> {new Date(order.date).toLocaleDateString()}</p>
  <p><strong>Preço Total:</strong> {order.priceTotal} €</p>
  {onDelete && (
    <button onClick={() => onDelete(order._id)} className="order-delete-btn">
      Excluir
    </button>
  )}
</div>

  );
};

export default Order;
