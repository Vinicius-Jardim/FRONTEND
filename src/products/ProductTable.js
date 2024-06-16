import React, { useState, useEffect } from "react";
import qs from "query-string";
import { Card, Row, Col, Pagination, Button } from "antd";
import { Link } from "react-router-dom";
import SearchBar from "./search";
import { useAuth } from "../authcontext/AuthContext";
import { FilterOutlined } from "@ant-design/icons";


const ProductTable = ({ url }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
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
        skip: current - 1,
        sortBy: sortBy,
      });

    fetch(url, {
      headers: {
        Accept: "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((response) => {
        const { products = [], pagination } = response.products;
        const auth = response.auth;

        if (auth) {
          const filteredProducts = products.filter((product) =>
            product.titulo.toLowerCase().includes(query.toLowerCase())
          );

          setData({
            products: filteredProducts,
            pagination: {
              current: current || 1,
              pageSize: pagination.pageSize || 8,
              total: isNaN(pagination.total) ? 0 : Number(pagination.total),
            },
          });
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    fetchApi(data.pagination.pageSize, data.pagination.current, query, sortBy);
    return () =>
      setData({
        products: [],
        pagination: {
          current: 1,
          pageSize: 8,
        },
      });
  }, [query, sortBy]);

  const handlePaginationChange = (page, pageSize) => {
    fetchApi(pageSize, page, query, sortBy);
  };

  const { products, pagination } = data;

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    fetchApi(
      data.pagination.pageSize,
      data.pagination.current,
      query,
      event.target.value
    );
  };

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

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SearchBar setData={setData} setQuery={setQuery} />
        <select
          value={sortBy}
          onChange={handleSortChange}
          style={{
            width: "250px",
            height: "35px",
            marginTop: "10px",
            borderStyle: "solid",
          }}
        >
          <option value="">Ordenar por</option>
          <option value="asc">Preço: Menor para Maior</option>
          <option value="desc">Preço: Maior para Menor</option>
          <option value="classification_asc">
            Classificação: Menor para Maior
          </option>
          <option value="classification_desc">
            Classificação: Maior para Menor
          </option>
        </select>
      </div>

      <Row
        gutter={[16, 16]}
        style={{
          marginLeft: 100,
          marginRight: 100,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        }}
      >
        {(products ?? []).map((product) => (
          <Col className="card" key={product._id}>
            <Card
              hoverable
              style={{ width: "100%", height: "100%", borderRadius: "5px" }}
              cover={
                <img
                  alt={product.image}
                  src={product.imagem}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              }
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h4>{product.titulo}</h4>
                <p>{product.preço}</p>
              </div>
              <Link to={`/products/${product._id}`}>
                <Button
                  style={{
                    width: "100%",
                    borderRadius: 0,
                    backgroundColor: "#346C51",
                  }}
                  type="primary"
                >
                  Ver Detalhes
                </Button>
              </Link>
              <Button
                style={{
                  width: "100%",
                  borderRadius: 0,
                  color: "#346c51",
                  fontWeight: "bold",
                }}
                onClick={() => handleAddToCart(product)}
              >
                Adicionar ao Carrinho
              </Button>
            </Card>
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
