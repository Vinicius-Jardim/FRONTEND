import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../authcontext/AuthContext";
import "./Cart.css";

const Cart = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const loadCartFromStorage = () => {
    if (!user) return;
    const savedCart = JSON.parse(localStorage.getItem(`cart-${user.id}`)) || [];
    setCart(savedCart);
  };

  useEffect(() => {
    loadCartFromStorage();
  }, [user]);

  useEffect(() => {
    window.addEventListener("storage", loadCartFromStorage);
    return () => {
      window.removeEventListener("storage", loadCartFromStorage);
    };
  }, []);

  const handleRemoveFromCart = (productId) => {
    if (!user) return;
    const updatedCart = cart.filter((product) => product._id !== productId);
    setCart(updatedCart);
    localStorage.setItem(`cart-${user.id}`, JSON.stringify(updatedCart));
  };

  const handleDecreaseQuantity = (productId) => {
    if (!user) return;
    const updatedCart = cart
      .map((product) => {
        if (product._id === productId) {
          if (product.quantity > 1) {
            return { ...product, quantity: product.quantity - 1 };
          } else {
            return null;
          }
        }
        return product;
      })
      .filter((product) => product !== null);

    setCart(updatedCart);
    localStorage.setItem(`cart-${user.id}`, JSON.stringify(updatedCart));
  };

  const handleIncreaseQuantity = (productId) => {
    if (!user) return;
    const updatedCart = cart.map((product) => {
      if (product._id === productId) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });

    setCart(updatedCart);
    localStorage.setItem(`cart-${user.id}`, JSON.stringify(updatedCart));
  };

  const calculateTotalPrice = () => {
    return cart
      .reduce((total, product) => {
        return total + product.preço * product.quantity;
      }, 0)
      .toFixed(2);
  };

  const renderCartItems = () => {
    if (cart.length === 0) {
      return <p className="center-align">Nenhum produto no carrinho</p>;
    }

    return cart.map((product) => (
      <div className="cart-item col s12 m6 l3" key={product._id}>
        <div className="card">
          <div className="card-image">
            <Link to={`/produtos/${product._id}`} className="card-link">
              <img src={product.imagem} alt={product.titulo} />
            </Link>
          </div>
          <div className="card-content">
            <p className="card-title">{product.titulo}</p>
            <p className="card-description">{product.descricao}</p>
            <p>
              <strong>Preço:</strong> {product.preço}€
            </p>
            <div className="quantity-controls">
              <button
                onClick={() => handleDecreaseQuantity(product._id)}
                className="btn-small yellow"
              >
                -
              </button>
              <span>{product.quantity}</span>
              <button
                onClick={() => handleIncreaseQuantity(product._id)}
                className="btn-small green"
              >
                +
              </button>
            </div>
            <button
              onClick={() => handleRemoveFromCart(product._id)}
              className="btn-small red"
            >
              Remover do Carrinho
            </button>
          </div>
        </div>
      </div>
    ));
  };

  const handlePurchase = () => {
    navigate("/checkout");
  };

  return (
    <div>
      <div className="container">
        <h4 style={{ color: "#346c51" }}>Carrinho de Compras</h4>
        <div className="row">{renderCartItems()}</div>
        {cart.length > 0 && (
          <div className="total">
            <p>Total:</p>
            <p className="total-amount">{calculateTotalPrice()}€</p>
            <button onClick={handlePurchase} className="btn-large">
              Comprar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
