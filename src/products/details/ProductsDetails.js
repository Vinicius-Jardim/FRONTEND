import React, { useState, useEffect } from "react";
import "./ProductsDetails.css";
import { useParams, Navigate } from "react-router-dom";
import Header from "../../header/Header";
import { Button } from "antd";
import { useAuth } from "../../authcontext/AuthContext";
import Footer from "../../footer/Footer";

const ProductsDetails = () => {
  const { user } = useAuth();
  const { productId } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (productId) {
      fetch(`http://127.0.0.1:3000/store/products/${productId}`, {
        headers: { Accept: "application/json" },
      })
        .then((response) => {
          console.log("Response status:", response.status); // Log do status da resposta
          return response.json();
        })
        .then((response) => {
          console.log("Response data:", response); // Log dos dados da resposta

          const product = response;

          if (product) {
            console.log("Product details:", product); // Log dos detalhes do produto
            setProduct(product);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching product details:", error); // Log de erro
          setLoading(false);
        });
    }
  }, [productId]);

  const handleAddToCart = (product) => {
    if (!user) {
      console.log("Usuário não autenticado");
      return;
    }

    const cart = JSON.parse(localStorage.getItem(`cart-${user.id}`)) || [];
    const existingProduct = cart.find((item) => item._id === product._id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem(`cart-${user.id}`, JSON.stringify(cart));
    console.log(`Produto adicionado ao carrinho: ${product.titulo}`);
    console.log(`Carrinho atualizado:`, cart);
    alert(`O produto ${product.titulo} foi adicionado ao carrinho.`);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div style={{ display: "flex", marginTop: "20px" }}>
        <div style={{ flex: "1", paddingRight: "20px" }}>
          <img
            alt={product.image}
            src={product.imagem}
            style={{ width: "50%", height: "auto", objectFit: "cover" }}
          />
        </div>
        <div style={{ flex: "2" }}>
          <h2>{product.titulo}</h2>
          <p>Em Stock: {product.stock}</p>
          <p>{product.preço} €</p>
          <p>{product.descrição}</p>
          <Button onClick={() => handleAddToCart(product)}>
            Adicionar ao Carrinho
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsDetails;
