import React, { useState, useEffect } from "react";
import config from "../Config";
import qs from "query-string";
import { Table } from "antd";
import { Link } from "react-router-dom";

const ProductTable = (props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    products: [],
    pagination: {
      current: getCurrentPage(),
      pageSize: getPageSize(),
      total: 0,
    },
  });

  function getCurrentPage() {
    const queryParams = qs.parse(props.url.search);
    const current = queryParams.current;
    return current ? Number(current) : 1;
  }

  function getPageSize() {
    const queryParams = qs.parse(props.url.search);
    const pageSize = queryParams.pageSize;
    return pageSize ? Number(pageSize) : 8;
  }

  const columns = [
    {
      title: "Imagem",
      dataIndex: "imagem",
      key: "imagem",
    },
    {
      title: "Título",
      dataIndex: "titulo",
      key: "titulo",
      render: (text, record) => (
        <Link to={`/products/${record._id}`}>{text}</Link>
      ),
    },
    {
      title: "Preço",
      dataIndex: "preço",
      key: "preço",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
  ];

  const fetchApi = (pageSize, current) => {
    const url =
      "http://127.0.0.1:3000/store/products?" +
      new URLSearchParams({
        limit: pageSize,
        skip: (current - 1) * pageSize,
      });

    fetch(url, {
      headers: { Accept: "application/json", "x-access-token": config.token },
    })
      .then((response) => response.json())
      .then((response) => {
        const { products = [], pagination } = response.products;
        const auth = response.auth;

        if (auth) {
          setData({
            products,
            pagination: {
              current: current || 1,
              pageSize: pagination.pageSize || 8,
              total: pagination.total || 4,
            },
          });
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    fetchApi(data.pagination.pageSize, data.pagination.current);

    return () =>
      setData({
        products: [],
        pagination: {
          current: 1,
          pageSize: 8,
        },
      });
  }, []);

  const handleTableChange = (pagination) => {
    fetchApi(pagination.pageSize, pagination.current);
  };

  const { products, pagination } = data;

  return (
    <Table
      columns={columns}
      rowKey={(record) => record._id}
      dataSource={products}
      pagination={pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};

export default ProductTable;



//CARD
/*import React, { useState, useEffect } from "react";
import config from "../Config";
import qs from "query-string";
import { Card, Row, Col, Pagination } from "antd";
import { Link } from "react-router-dom";

const ProductTable = (props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    products: [],
    pagination: {
      current: getCurrentPage(),
      pageSize: getPageSize(),
      total: 0,
    },
  });

  function getCurrentPage() {
    const queryParams = qs.parse(props.url.search);
    const current = queryParams.current;
    return current ? Number(current) : 1;
  }

  function getPageSize() {
    const queryParams = qs.parse(props.url.search);
    const pageSize = queryParams.pageSize;
    return pageSize ? Number(pageSize) : 8;
  }

  const fetchApi = (pageSize, current) => {
    const url =
      "http://127.0.0.1:3000/store/products?" +
      new URLSearchParams({
        limit: pageSize,
        skip: (current - 1) * pageSize,
      });

    fetch(url, {
      headers: { Accept: "application/json", "x-access-token": config.token },
    })
      .then((response) => response.json())
      .then((response) => {
        const { products = [], pagination } = response.products;
        const auth = response.auth;

        if (auth) {
          setData({
            products,
            pagination: {
              current: current || 1,
              pageSize: pagination.pageSize || 8,
              total: pagination.total || 4,
            },
          });
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    fetchApi(data.pagination.pageSize, data.pagination.current);

    return () =>
      setData({
        products: [],
        pagination: {
          current: 1,
          pageSize: 8,
        },
      });
  }, []);

  const handlePaginationChange = (page, pageSize) => {
    fetchApi(pageSize, page);
  };

  const { products, pagination } = data;

  return (
    <>
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
            <Card
              title={<Link to={`/products/${product._id}`}>{product.titulo}</Link>}
              hoverable
              style={{ width: 240 }}
              cover={<img alt={product.image} src={product.imagem} />}
            >
              <p>Preço: {product.preço}</p>
              <p>Stock: {product.stock}</p>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={pagination.total}
        onChange={handlePaginationChange}
        style={{ marginTop: 16, textAlign: "center" }}
      />
    </>
  );
};

export default ProductTable; */
