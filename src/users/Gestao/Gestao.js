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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProductData({ ...newProductData, [name]: value });
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

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <>
    <Header />
    <div>
      <h2>Gestão de Produtos</h2>
      <div>
        <h3>Lista de Produtos:</h3>
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              {product.titulo} - R$ {product.preço}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={() => setModalVisible(true)}>Adicionar Produto</button>

      <Modal
        title="Adicionar Novo Produto"
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
      <form>
        <label>Título:</label>
        <input type="text" name="titulo" value={newProductData.titulo} onChange={handleInputChange} />
        <label>Descrição</label>
        <input type="text" name="descrição" value={newProductData.descrição} onChange={handleInputChange} />
        <label>Categoria:</label>
        <input type="text" name="categoria" value={newProductData.categoria} onChange={handleInputChange} />
        <label>Stock:</label>
        <input type="text" name="stock" value={newProductData.stock} onChange={handleInputChange} />
        <label>classificação:</label>
        <input type="text" name="classificação" value={newProductData.classificação} onChange={handleInputChange} />
        <label>minimumQuantity:</label>
        <input type="text" name="minimumQuantity" value={newProductData.minimumQuantity} onChange={handleInputChange} />
        <label>Preço:</label>
        <input type="number" name="preço" value={newProductData.preço} onChange={handleInputChange} />
        <label>imagem:</label>
        <input type="text" name="imagem" value={newProductData.imagem} onChange={handleInputChange} />
      </form>
      </Modal>
      
      <div>
        <h2>Gestão de Pedidos</h2>
        <Orders />
      </div>
    </div>
    </>
  );
};

export default Gestao;
