import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Orders.css"; // Importando o arquivo CSS

import config from "../Config";

const Orders = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!config.token) {
            navigate('/login');
        } else {
            fetch('http://127.0.0.1:3000/orders/order', {
                headers: { Accept: 'application/json', 'x-access-token': config.token },
            })
                .then((response) => response.json())
                .then((response) => {
                    setLoading(false);
                    setOrders(response);
                })
                .catch((error) => {
                    console.error('There has been a problem with your fetch operation:', error);
                });
        }
        return () => setOrders([]);
    }, [navigate]);

    return (
        <div className="orders-container">
            <h1 className="orders-title">Lista de Pedidos</h1>
            {loading ? (
                <p className="loading">Carregando...</p>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div key={order._id} className="order-item">
                            <h2 className="order-item-title">Pedido</h2>
                            <p><strong>Produto ID:</strong> {order.products}</p>
                            <p><strong>Quantidade:</strong> {order.quantity}</p>
                            <p><strong>Cliente ID:</strong> {order.client}</p>
                            <p><strong>Data:</strong> {new Date(order.date).toLocaleDateString()}</p>
                            <p><strong>Preço Total:</strong> {order.priceTotal} €</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
