import React, { useEffect, useState } from 'react';
import './products.css';
import ShoppingCart from '../cart';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../style/all.style.css';
import { useNavigate } from 'react-router-dom';
import ProductDetail from './productDetail';

const ProductList = ({ category }) => {

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/products?category=${category}`);
        const data = await response.json();
        console.log(data);
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Dữ liệu sản phẩm không phải là một mảng:', data);
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      }
    };

    fetchData();
  }, [category]);
  console.log(category);


  const handleProductClick = (product) => {
    setSelectedProduct(product);
    navigate(`/products/${product.product_id}`);
  }

  const handleProductClose = () => {
    setSelectedProduct(null);
  };

  const handleBuyNow = (product) => {
    setCartItems([...cartItems, product]);
  };
  return (
    <div>
      <h2>{`Products in ${category}`}</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.product_id} onClick={() => handleProductClick(product)} style={{ cursor: 'pointer' }}>
            <img src={product.image_url} alt={product.name} />
            <h5>{product.name}</h5>
            <p className="description"></p>
            <p className="price">{product.price}</p>
            <button className="button" onClick={() => handleBuyNow(product)}>
              Buy Now
            </button> <br /><br />
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductDetail product={selectedProduct} onClose={handleProductClose} />
      )}

      <ShoppingCart cartItems={cartItems} />
    </div>
  );
};

export default ProductList;
