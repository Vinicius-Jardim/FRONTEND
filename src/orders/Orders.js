import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Orders.css";
import Order from "./Order"; // Importe o componente Order

const Orders = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            fetch('http://127.0.0.1:3000/orders/order', {
                headers: { Accept: 'application/json', 'x-access-token': token },
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

    const handleDelete = async (orderId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://127.0.0.1:3000/orders/order/${orderId}`, {
                method: 'DELETE',
                headers: { 'x-access-token': token },
            });
            if (response.ok) {
                setOrders(orders.filter(order => order._id !== orderId));
            } else {
                console.error('Erro ao excluir a ordem');
            }
        } catch (error) {
            console.error('Erro ao comunicar com o servidor:', error);
        }
    };

    return (
        <div className="orders-container">
            <h1 className="orders-title">Lista de Pedidos</h1>
            {loading ? (
                <p className="loading">Carregando...</p>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <Order key={order._id} order={order} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
