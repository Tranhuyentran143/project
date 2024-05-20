import React, { useEffect, useState } from "react";
import ProductList from "./productList";

const ParentComponent = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // Số lượng sản phẩm trên mỗi trang

  useEffect(() => {
    const fetchData = async () => {
      try {
        const offset = (currentPage - 1) * productsPerPage;
        const response = await fetch(`http://localhost:8081/api/v1/products?limit=${productsPerPage}&offset=${offset}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Dữ liệu sản phẩm không phải là một mảng:", data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const paginateNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const paginatePrev = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      <h1>All Products</h1>
      <ProductList
        products={products}
        currentPage={currentPage}
        paginateNext={paginateNext}
        paginatePrev={paginatePrev}
      />
    </div>
  );
};

export default ParentComponent;
