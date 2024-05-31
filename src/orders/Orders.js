import React from "react";
import "./Orders.css";

import config from "../Config";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

const Orders = () => {
    let navigate = useNavigate();
    const [loading , setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    // eslint-disable-next-line
    useEffect(() => {
        if (!config.token) {
            navigate('/login');
        } else {
            fetch('http://127.0.0.1:3000/orders/order', {
                headers: {Accept: 'application/json', 'x-access-token': config.token},
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
        <div className="orders">
            {loading ? (
                <p>Loading...</p>
            ) : (
                orders.map((order) => (
                    <div key={order._id}>
                        <h2>Produto ID: {order.products}</h2>
                        <p>Quantidade: {order.quantity}</p>
                        <p>Cliente ID: {order.client}</p>
                        <p>Data: {new Date(order.date).toLocaleDateString()}</p>
                        <p>Preço Total: {order.priceTotal} €</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Orders;