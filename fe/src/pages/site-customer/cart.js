import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [carts, setCartItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      const initialCarts = await localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts')) : [];
      setCartItems(initialCarts);
    };
    fetchCartItems();
  }, []);

  const handleRemoveFromCart = (productId) => {
    const updatedCarts = carts.filter(cartItem => cartItem.product.product_id !== productId);
    setCartItems(updatedCarts);
    localStorage.setItem('carts', JSON.stringify(updatedCarts));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      newQuantity = 1;
    } else if (newQuantity > 10) {
      newQuantity = 10;
    }
    const updatedCarts = carts.map(cartItem => {
      if (cartItem.product.product_id === productId) {
        return { ...cartItem, quantity: newQuantity };
      }
      return cartItem;
    });
    setCartItems(updatedCarts);
  };

  const calculateTotal = () => {
    return carts.reduce((total, cartItem) => {
      if (cartItem.isChecked) {
        return total + (cartItem.product.price * cartItem.quantity);
      }
      return total;
    }, 0);
  };

  const handleCheckboxChange = (productId) => {
    const updatedCarts = carts.map(cartItem => {
      if (cartItem.product.product_id === productId) {
        return { ...cartItem, isChecked: !cartItem.isChecked };
      }
      return cartItem;
    });
    setCartItems(updatedCarts);
  };

  const handleSelectAllChange = () => {
    const updatedCarts = carts.map(cartItem => {
      return { ...cartItem, isChecked: !selectAll };
    });
    setCartItems(updatedCarts);
    setSelectAll(!selectAll);
  };

  const handlePurchase = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const totalPrice = carts.reduce((total, cartItem) => {
        if (cartItem.isChecked) {
          return total + (cartItem.product.price * cartItem.quantity);
        }
        return total;
      }, 0);

      const totalQuantity = carts.reduce((total, cartItem) => {
        if (cartItem.isChecked) {
          return total + cartItem.quantity;
        }
        return total;
      }, 0);

      const orderData = {
        phone: "0123345567",
        totalPrice: totalPrice,
        totalQuantity: totalQuantity,
        items: carts.filter(cartItem => cartItem.isChecked).map(cartItem => ({
          product_id: cartItem.product.product_id,
          quantity: cartItem.quantity,
          price: cartItem.product.price
        }))
      };
      fetch('http://localhost:8081/api/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      })
        .then(response => {
          if (response.ok) {
            alert('Purchase successful');
            setCartItems([]);
            navigate('/order-success');
          } else {
            alert('Purchase failed');
          }
        })
        .catch(error => {
          alert('Error:', error);
        });
    } else {
      alert(`Please login and buy something ^_^`)
      navigate(`/login`)
    }
  }

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h4 style={{ color: "black", fontSize: "25px", backgroundColor: "#ecc9d3", width: "800px", margin: "20px auto" }}>
          SHOPPING CART
        </h4>
      </div>
      <div style={{ margin: "0 auto", width: "1000px" }}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ padding: '10px', textAlign: 'left' }}>
                <input type="checkbox" style={{ marginLeft: '10px' }} onChange={handleSelectAllChange} checked={selectAll} />
              </th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Image</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Name</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Price</th>
              <th style={{ padding: '10px', textAlign: 'center', width: "170px" }}>Quantity</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((cartItem, index) => (
              <tr key={index}>
                <td style={{ padding: '10px' }}>
                  <input
                    type="checkbox"
                    checked={cartItem.isChecked}
                    onChange={() => handleCheckboxChange(cartItem.product.product_id)}
                  />
                </td>
                <td style={{ padding: '10px' }}>
                  <img src={cartItem.product.image_url} alt={cartItem.product.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                </td>
                <td style={{ padding: '10px' }}>{cartItem.product.name}</td>
                <td style={{ padding: '10px' }}>¥{cartItem.product.price}</td>
                <td style={{ padding: '10px' }}>
                  <button style={{ backgroundColor: "#edcaca", width: "30px", color: "#983232" }} onClick={() => handleQuantityChange(cartItem.product.product_id, cartItem.quantity - 1)}>-</button>
                  {cartItem.quantity}
                  {cartItem.quantity < 10 && (
                    <button style={{ backgroundColor: "#edcaca", width: "30px", color: "#983232" }} onClick={() => handleQuantityChange(cartItem.product.product_id, cartItem.quantity + 1)}>+</button>
                  )}
                </td>
                <td style={{ padding: '10px' }}>
                  <button style={{ backgroundColor: "yellow", marginRight: "15px" }} onClick={() => handleRemoveFromCart(cartItem.product.product_id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ color: "black", textAlign: "center", fontSize: "25px", backgroundColor: "#ecc9d3" }}>
              <td colSpan="4" style={{ textAlign: "center" }}>Total:</td>
              <td colSpan="2" style={{ textAlign: "left" }}>¥{calculateTotal()}</td>
            </tr>
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                <button style={{ backgroundColor: "#ecc9d3", color: "black", fontSize: "20px", padding: "10px", marginTop: "20px", borderRadius: "5px" }} onClick={handlePurchase}>Payment</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default CartPage;
