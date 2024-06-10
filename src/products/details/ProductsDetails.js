import React, { useState, useEffect } from "react";
import "./ProductsDetails.css";
import config from "../../Config";
import { useParams, Navigate } from "react-router-dom";
import HeaderCopy from "../../header/Header copy";

const ProductsDetails = () => {
  const { productId } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (productId) {
      fetch(`http://127.0.0.1:3000/store/products/${productId}`, {
        headers: { Accept: "application/json", "x-access-token": config.token },
      })
        .then((response) => {
          console.log("Response status:", response.status); // Log do status da resposta
          return response.json();
        })
        .then((response) => {
          console.log("Response data:", response); // Log dos dados da resposta

          const { auth, product } = response;

          if (auth) {
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

  console.log("Product ID:", productId); // Log do ID do produto

  if (!config.token) {
    return <Navigate to="/" />;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <HeaderCopy />
      <h2>{product.titulo}</h2>
      <p>Em Stock: {product.stock}</p>
      {product.preço} €<p>{productId.descrição} </p>
    </div>
  );
};

export default ProductsDetails;
