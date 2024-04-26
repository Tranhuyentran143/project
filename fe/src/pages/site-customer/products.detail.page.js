import React, { useEffect, useState } from 'react';
import ProductDetail from './products/productDetail';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const { product_id } = useParams(); // hook useParams: get value product_id from url
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/products/${product_id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      }
    };
    fetchData();
  }, [product_id]);

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "#b72f75", fontWeight: "bold", padding: "20px" }}>PRODUCT DETAIL</h2>
      {product ? (
        <ProductDetail product={product} />
      ) : (
        <p>Loading product...</p>
      )}
    </div>
  );
};

export default ProductDetailPage;
