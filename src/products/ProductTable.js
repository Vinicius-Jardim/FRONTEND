import React, { useState, useEffect } from "react";

import qs from "query-string";
import { Card, Row, Col, Pagination } from "antd";
import { Link } from "react-router-dom";
import SearchBar from "./search";

const ProductTable = ({ url }) => {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(''); 
  const [sortBy, setSortBy] = useState('');
  const [data, setData] = useState({
    products: [],
    pagination: {
      current: getCurrentPage(),
      pageSize: getPageSize(),
      total: 0,
    },
  });

  function getCurrentPage() {
    const queryParams = qs.parse(url.search);
    const current = queryParams.current;
    return isNaN(current) ? 1 : Number(current);
  }

  function getPageSize() {
    const queryParams = qs.parse(url.search);
    const pageSize = queryParams.pageSize;
    return isNaN(pageSize) ? 8 : Number(pageSize);
  }

  const fetchApi = (pageSize, current, query, sortBy) => {
    const url =
      "http://127.0.0.1:3000/store/products?" +
      new URLSearchParams({
        limit: pageSize,
        skip: (current - 1), //* pageSize,
        sortBy: sortBy
      });

      fetch(url, {
        headers: {
          Accept: 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
      })
      .then((response) => response.json())
      .then((response) => {
        const { products = [], pagination } = response.products;
        const auth = response.auth;

        if (auth) {
          // Filtrar os produtos para mostrar apenas aqueles que correspondem à consulta
          const filteredProducts = products.filter(product => product.titulo.toLowerCase().includes(query.toLowerCase()));

          setData({
            products: filteredProducts,
            pagination: {
              current: current || 1,
              pageSize: pagination.pageSize || 8,
              total: isNaN(pagination.total) ? 0 : Number(pagination.total),
            },
          });
          console.log(data)
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    fetchApi(data.pagination.pageSize, data.pagination.current, query, sortBy); // estado da consulta aqui

    return () =>
      setData({
        products: [],
        pagination: {
          current: 1,
          pageSize: 8,
        },
      });
  }, [query, sortBy]); // A dependência de consulta aqui

  const handlePaginationChange = (page, pageSize) => {
    fetchApi(pageSize, page, query, sortBy); // estado da consulta aqui
  };

  const { products, pagination } = data;

  //sort by
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    fetchApi(data.pagination.pageSize, data.pagination.current, query, event.target.value);
  };

  return (
    <>
      <SearchBar setData={setData} setQuery={setQuery} /> 
      <div>
      <select value={sortBy} onChange={handleSortChange}>
        <option value="">Ordenar por</option>
        <option value="asc">Preço: Menor para Maior</option>
        <option value="desc">Preço: Maior para Menor</option>
        <option value="classification_asc">Classificação: Menor para Maior</option>
        <option value="classification_desc">Classificação: Maior para Menor</option>
      </select>
    
    </div>

      <Row gutter={[16, 16]}>
        {(products ?? []).map((product) => (
          <Col className="card" key={product._id} xs={24} sm={12} md={8} lg={6}>
            <Link to={`/products/${product._id}`}>
              <Card
                title={product.titulo}
                hoverable
                style={{ width: 240 }}
                cover={<img alt={product.image} src={product.imagem} />}
              >
                <p>Preço: {product.preço}</p>
                <p>Stock: {product.stock}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      <Pagination
        current={pagination?.current}
        pageSize={pagination?.pageSize}
        total={pagination?.total}
        onChange={handlePaginationChange}
        style={{ marginTop: 16, textAlign: "center" }}
      />
    </>
  );
};

export default ProductTable;