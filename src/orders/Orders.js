import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Orders.css";
import Order from "./Order";
import Modal from "antd/lib/modal/Modal";

const Orders = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newOrderData, setNewOrderData] = useState({
    products: "",
    quantity: "",
    client: "",
  });

  const handleInputChange = (event) => {
    setNewOrderData({
      ...newOrderData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetch("http://127.0.0.1:3000/orders/order", {
        headers: { Accept: "application/json", "x-access-token": token },
      })
        .then((response) => response.json())
        .then((response) => {
          setLoading(false);
          setOrders(response);
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
    }
    return () => setOrders([]);
  }, [navigate]);

  // create order
  const handleCreate = async (order) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://127.0.0.1:3000/orders/order/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error("Erro na requisição");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro:", error);
      return null;
    }
  };

  // delete order
  const handleDelete = async (orderId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/orders/orderdel/${orderId}`,
        {
          method: "DELETE",
          headers: { "x-access-token": token },
        }
      );
      if (response.ok) {
        setOrders(orders.filter((order) => order._id !== orderId));
      } else {
        console.error("Erro ao excluir a ordem");
      }
    } catch (error) {
      console.error("Erro ao comunicar com o servidor:", error);
    }
  };

  return (
    <div className="orders-container">
      <h1 className="orders-title">Lista de Pedidos</h1>
      <button
        onClick={() => setModalVisible(true)}
        style={{ marginBottom: "16px " }}
      >
        Adicionar Pedido
      </button>
      <Modal
        title="Adicionar Novo Pedido"
        visible={modalVisible}
        onOk={() => {
          handleCreate(newOrderData);
          setModalVisible(false);
        }}
        onCancel={() => setModalVisible(false)}
      >
        <form style={{ display: "grid", gap: "16px" }}>
          <div>
            <label>Produto:</label>
            <input
              type="text"
              name="products"
              value={newOrderData.products}
              onChange={handleInputChange}
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <label>Quantidade:</label>
            <input
              type="number"
              name="quantity"
              value={newOrderData.quantity}
              onChange={handleInputChange}
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <label>Cliente:</label>
            <input
              type="text"
              name="client"
              value={newOrderData.client}
              onChange={handleInputChange}
              style={{ width: "100%" }}
            />
          </div>
        </form>
      </Modal>

      {loading ? (
        <p className="loading">Carregando...</p>
      ) : (
        <div className="orders-list">
          {Array.isArray(orders)
            ? orders.map((order) => (
                <Order key={order._id} order={order} onDelete={handleDelete} />
              ))
            : null}
        </div>
      )}
    </div>
  );
};

export default Orders;
