import React, { useState, useEffect } from 'react';
import './Gestao.css';
import Header from '../../../header/Header';
import ProductForm from './ProductForm';
import ProductManagementTable from './ProductManagementTable';
import Orders from '../../../orders/Orders';

const Gestao = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/store/products", {
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response && response.auth) {
          if (response.products && Array.isArray(response.products.products)) {
            setProducts(response.products.products);
            setLoading(false);
          } else {
            console.error('Invalid response:', response);
          }
        } else {
          console.error('Not authorized:', response);
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });

    return () => setProducts([]);
  }, []);

  const handleSaveProduct = (product) => {
    const url = selectedProduct ? `http://127.0.0.1:3000/products/${selectedProduct._id}` : 'http://127.0.0.1:3000/products';
    const method = selectedProduct ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(() => {
      setSelectedProduct(null);
      // Atualizar a lista de produtos após salvar
      setLoading(true);
      fetch("http://127.0.0.1:3000/store/products", {
        headers: { Accept: "application/json" },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response && response.auth) {
            if (response.products && Array.isArray(response.products.products)) {
              setProducts(response.products.products);
              setLoading(false);
            } else {
              console.error('Invalid response:', response);
            }
          } else {
            console.error('Not authorized:', response);
          }
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
          setLoading(false);
        });
    });
  };

  const handleDeleteProduct = (id) => {
    fetch(`http://127.0.0.1:3000/products/${id}`, { method: 'DELETE' })
      .then(() => {
        // Atualizar a lista de produtos após excluir
        setProducts(products.filter(product => product._id !== id));
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <div className="gestao-container">
        <h1>Gestão</h1>
        <ProductForm onSave={handleSaveProduct} selectedProduct={selectedProduct} />
        <ProductManagementTable products={products} onEdit={setSelectedProduct} onDelete={handleDeleteProduct} />
        <Orders />
      </div>
    </>
  );
};

export default Gestao;
