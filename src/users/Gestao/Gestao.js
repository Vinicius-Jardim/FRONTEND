import React, { useState, useEffect } from 'react';
import Modal from 'antd/lib/modal/Modal';
import Header from '../../header/Header';
import Orders from '../../orders/Orders';
import './Gestao.css';
import { Card, Row, Col, Pagination } from "antd";
import qs from 'query-string';
import { useLocation } from 'react-router-dom';
import AdminUsers from '../AdminUsers';


const Gestao = () => {
  const location = useLocation();
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
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    current: getCurrentPage(),
    pageSize: getPageSize(),
    total: 0,
  });

  function getCurrentPage() {
    const queryParams = qs.parse(location?.search || '');
    const current = queryParams.current;
    return isNaN(current) ? 1 : Number(current);
  }

  function getPageSize() {
    const queryParams = qs.parse(location?.search || '');
    const pageSize = queryParams.pageSize;
    return isNaN(pageSize) ? 8 : Number(pageSize);
  }

  const handlePageChange = (page, pageSize) => {
    fetchProducts(pageSize, page, searchTerm);
  };

  const fetchProducts = (pageSize, current, query) => {
    const url =
      'http://127.0.0.1:3000/store/products?' +
      new URLSearchParams({
        limit: pageSize,
        skip: (current - 1),
        q: query,
      });

    fetch(url, {
      headers: {
        Accept: 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.products) {
          const { products, pagination } = data.products;

          // Filtrar os produtos para mostrar apenas aqueles que correspondem à consulta
          const filteredProducts = products.filter(product =>
            product.titulo.toLowerCase().includes(query.toLowerCase())
          );

          setProducts(filteredProducts);
          setPagination({
            current: current || 1,
            pageSize: pagination.pageSize || 8,
            total: isNaN(pagination.total) ? 0 : Number(pagination.total),
          });
        } else {
          console.error('Resposta inválida:', data);
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts(pagination.pageSize, pagination.current, searchTerm);
  }, [pagination.pageSize, pagination.current, searchTerm]);


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

  const handleUpdate = async (product) => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/store/products/${product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      if (response.ok) {
        setProducts(products.map((p) => (p._id === product._id ? data : p)));
        setModalVisible(false);
      } else {
        console.error('Erro ao atualizar o produto:', data.error);
      }
    } catch (error) {
      console.error('Erro ao comunicar com o servidor:', error);
    }
  };

  const handleDelete = async (product) => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/store/products/${product._id}`, {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProductData({ ...newProductData, [name]: value });
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <Header />
      <div className="gestao-container">
        <h2 className="gestao-title">Gestão de Produtos</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Pesquisar por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
         
        </div>
        <button onClick={() => setModalVisible(true)}>Adicionar Produto</button>
        <table className="gestao-table">
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Preço</th>
              <th>Categoria</th>
              <th>Stock</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.titulo}</td>
                <td>R$ {product.preço}</td>
                <td>{product.categoria}</td>
                <td>{product.stock}</td>
                <td className="gestao-actions">
                  <button className="gestao-edit-btn" onClick={() => handleUpdateClick(product)}>
                    Editar
                  </button>
                  <button className="gestao-delete-btn" onClick={() => handleDelete(product)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onChange={handlePageChange}
            style={{ marginTop: 16, textAlign: "center" }}
          />
        </div>
      </div>

      <Modal
        title={newProductData._id ? 'Atualizar Produto' : 'Adicionar Novo Produto'}
        visible={modalVisible}
        onOk={newProductData._id ? () => handleUpdate(newProductData) : handleModalOk}
        onCancel={handleModalCancel}
      >
        <form>
          <label>Título:</label>
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
        <AdminUsers />
      </div>
    </>
  );
};

export default Gestao;
