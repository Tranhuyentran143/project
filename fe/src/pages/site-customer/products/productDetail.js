import React, { useState } from 'react';
import './products.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../style/all.style.css'
import { addToCart } from '../../../api/cart.api';

const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1); // default 1

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="product-container" id="product-detail">
      <div className="product-image">
        <img src={product.image_url} alt={product.name} />
      </div>
      <div className="product-info" id="product-detail-info">
        <h3 className="name">{product.name}</h3>
        <p className="description">Description: {product.description}</p>
        <p className="price">Price: ¥{product.price}</p>
        <div className="quantity-container">
          <p className="quantity-label">Quantity:</p>
          <div className="quantity-control">
            <button className="quantity-button" onClick={handleDecreaseQuantity}>-</button>
            <input type="text" className="quantity-input" value={quantity} readOnly />
            <button className="quantity-button" onClick={handleIncreaseQuantity}>+</button>
          </div>
        </div> <br/><br/>
        {/* <p className="category">Category: {product.category_id}</p> */}
        <button className="addtocart-button" onClick={handleAddToCart}>Add to cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;
