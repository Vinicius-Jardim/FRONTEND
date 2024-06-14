import React, { useState, useEffect } from 'react';
import Modal from 'antd/lib/modal/Modal'; // Importe o modal do Ant Design ou outra biblioteca de sua escolha
import Header from "../../header/Header";
import Orders from '../../orders/Orders'; 

const Gestao = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newProductData, setNewProductData] = useState({
    titulo: '',
    categoria: '',
    descrição: '',
    preço: '',
    classificação: '',
    stock: '',
    minimumQuantity: '',
    imagem: '',
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch("http://127.0.0.1:3000/store/products", {
      headers: { 
        Accept: "application/json",
        'x-access-token': localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.auth && response.products) {
          setProducts(response.products.products);
        } else {
          console.error('Resposta inválida:', response);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
        setLoading(false);
      });
  };

  const handleInputChange = (event) => {
    setNewProductData({
      ...newProductData,
      [event.target.name]: event.target.value,
    });
  };

  const handleModalOk = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/store/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(newProductData),
      });
      const data = await response.json();
      if (response.ok) {
        setProducts([...products, data]);
        setModalVisible(false);
      } else {
        console.error('Erro ao criar o produto:', data.error);
      }
    } catch (error) {
      console.error('Erro ao comunicar com o servidor:', error);
    }
  };

 //Update product
const handleUpdate = async (product) => {
  try {
    const response = await fetch(`http://127.0.0.1:3000/store/products/` + product._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify(product),
    }); 
    const data = await response.json();
    if (response.ok) {
      setProducts(products.map(p => p._id === product._id ? data : p));
      setModalVisible(false);
    } else {
      console.error('Erro ao atualizar o produto:', data.error);
    }
  } catch (error) {
    console.error('Erro ao comunicar com o servidor:', error);
  }
};

//Delete product
const handleDelete = async (product) => {
  try {
    const response = await fetch(`http://127.0.0.1:3000/store/products/` + product._id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    });
    const data = await response.json();
    if (response.ok) {
      setProducts(products.filter((p) => p._id !== product._id));
    } else {
      console.error('Erro ao excluir o produto:', data.error);
    }
  } catch (error) {
    console.error('Erro ao comunicar com o servidor:', error);
  }
};

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleUpdateClick = (product) => {
    setNewProductData(product);
    setModalVisible(true);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <div>
        <h2>Gestão de Produtos</h2>
        <button onClick={() => setModalVisible(true)}>Adicionar Produto</button>
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              {product.titulo} - R$ {product.preço}
              <button onClick={() => handleUpdateClick(product)}>Atualizar</button>
              <button onClick={() => handleDelete(product)}>Excluir</button>
            </li>
          ))}
        </ul>
      </div>

      <Modal
        title={newProductData._id ? "Atualizar Produto" : "Adicionar Novo Produto"}
        visible={modalVisible}
        onOk={newProductData._id ? () => handleUpdate(newProductData) : handleModalOk}
        onCancel={handleModalCancel}
      >
        <form>
          <label>Titulo:</label>
          <input type="text" name="titulo" value={newProductData.titulo} onChange={handleInputChange} />
          <label>Categoria:</label>
          <input type="text" name="categoria" value={newProductData.categoria} onChange={handleInputChange} />
          <label>Descrição:</label>
          <input type="text" name="descrição" value={newProductData.descrição} onChange={handleInputChange} />
          <label>Preço:</label>
          <input type="number" name="preço" value={newProductData.preço} onChange={handleInputChange} />
          <label>Classificação:</label>
          <input type="text" name="classificação" value={newProductData.classificação} onChange={handleInputChange} />
          <label>Stock:</label>
          <input type="text" name="stock" value={newProductData.stock} onChange={handleInputChange} />
          <label>Quantidade mínima:</label>
          <input type="text" name="minimumQuantity" value={newProductData.minimumQuantity} onChange={handleInputChange} />
          <label>Imagem:</label>
          <input type="text" name="imagem" value={newProductData.imagem} onChange={handleInputChange} />
        </form>
      </Modal>

      <div>
        <h2>Gestão de Pedidos</h2>
        <Orders />
      </div>
    </>
  );
};

export default Gestao;