import React from 'react';

const ShoppingCart = ({ cartItems }) => {
  const items = Array.isArray(cartItems) ? cartItems : [];

  return (
    <div>
      <h2>Your Shopping Cart</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingCart;

