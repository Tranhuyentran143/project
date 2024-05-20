import React, { useState } from 'react';
import './product.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../style/all.style.css'
import '../../../components/organisms/header/header.css'

const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1); // default 1

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    let carts = [];
    if (localStorage.getItem('carts')) {
      carts = JSON.parse(localStorage.getItem('carts'));
    }

    const cart = carts.find(cart => cart.product.product_id === product.product_id);

    if (cart) {
      cart.quantity += quantity
      cart.total += cart.quantity * product.price
    } else {
      carts.push({ product: product, quantity: quantity, total: quantity * product.price });
    }
    localStorage.setItem("carts", JSON.stringify(carts));
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
        </div> <br /><br />
        <button className="addtocart-button" onClick={() => handleAddToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;
