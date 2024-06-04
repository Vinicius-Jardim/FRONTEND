import "./ProductTable.css";
import React, { useState, useEffect } from "react";
import config from "../Config";
import qs from "query-string";
import { Table } from "antd";

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
      title: "title",
      dataIndex: "titulo",
      key: "titulo",
    },
    {
      title: "preço",
      dataIndex: "preço",
      key: "preço",
    },
    {
      title: "stock",
      dataIndex: "stock",
      key: "stock",
    },
  ];

  const fetchApi = (pageSize, current) => {
    const url =
      "http://127.0.0.1:3000/store/products?" +
      new URLSearchParams({
        limit: pageSize,
        skip: current - 1,
      });

    fetch(url, {
      headers: { Accept: "application/json", "x-access-token": config.token },
    })
      .then((response) => response.json())
      .then((response) => {
        const { products = [], pagination } = response.products;
        const auth = response.auth;

        if (auth) {
          console.log("pagination", pagination);
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
      rowKey={(record) => record.id}
      dataSource={products}
      pagination={pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};

export default ProductTable;
