import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../authcontext/AuthContext';
import './Checkout.css';

const Checkout = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [orderComplete, setOrderComplete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      const savedCart = JSON.parse(localStorage.getItem(`cart-${user.id}`)) || [];
      setCart(savedCart);
    }
  }, [user, navigate]);

  const handlePlaceOrder = async () => {
    try {
      for (const product of cart) {
        const response = await fetch('http://127.0.0.1:3000/orders/order/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token'), // Obtendo o token do localStorage
          },
          body: JSON.stringify({
            products: product._id,
            quantity: product.quantity,
            client: user.id,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erro ao criar a encomenda');
        }

        const data = await response.json();
        console.log('Encomenda criada:', data);
      }

      setOrderComplete(true);
      localStorage.removeItem(`cart-${user.id}`);
      setCart([]);
    } catch (error) {
      console.error('Erro ao realizar a encomenda:', error);
    }
  };

  if (orderComplete) {
    return (
      <div className="checkout-container">
        <h4>Encomenda realizada com sucesso!</h4>
        <button className="btn-large" onClick={() => navigate('/')}>Voltar para a Home</button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h4>Finalizar Encomenda</h4>
      {cart.length === 0 ? (
        <p>Nenhum produto no carrinho</p>
      ) : (
        <div>
          <ul className="checkout-list">
            {cart.map(product => (
              <li key={product._id}>
                <p>{product.titulo} x {product.quantity}</p>
                <p>Preço: {product.preço}€</p>
              </li>
            ))}
          </ul>
          <button className="btn-large" onClick={handlePlaceOrder}>Confirmar Encomenda</button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
