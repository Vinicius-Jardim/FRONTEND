import React, { useState, useEffect } from "react";
import "./ProductsDetails.css";
import { useParams, Navigate } from "react-router-dom";
import Header from "../../header/Header";
import { Button } from "antd";
import { useAuth } from "../../authcontext/AuthContext";
import Footer from "../../footer/Footer";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StarIcon from "@mui/icons-material/Star";

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
      <div
        style={{ display: "flex", marginTop: "20px", alignItems: "flex-start" }}
        className="Imagem"
      >
        <div style={{ flex: "1", paddingRight: "20px" }}>
          <img
            alt={product.image}
            src={product.imagem}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </div>
        <div
          style={{
            flex: "2",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginRight: "10px",
          }}
          className="Detalhes"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 style={{}}>{product.titulo}</h2>
            <Button onClick={() => handleAddToCart(product)}>
              <AddShoppingCartIcon />
            </Button>
          </div>
          <p
            style={{ display: "flex", alignItems: "center", textAlign: "left" }}
          >
            {product.classificação}
            <StarIcon
              style={{
                fontSize: "inherit",
                marginLeft: "5px",
              }}
            />
          </p>

          <p style={{ textAlign: "left" }}>
            <strong>Em Stock:</strong> {product.stock}
          </p>
          <p style={{ textAlign: "left" }}>
            <strong>Preço:</strong> {product.preço} €
          </p>
          <p style={{ textAlign: "left" }}>{product.descrição}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsDetails;
